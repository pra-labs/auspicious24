#!/usr/bin/env python3
"""
Auspicious24 Product & Asset Scraper
Fetches full catalog from Shopify JSON endpoint, parses and cleans descriptions into Markdown,
downloads high-res product images locally to public/images/products/<handle>,
and compiles a clean, structured JSON catalog at data/products.json.
"""

import os
import sys
import json
import re
import html
import posixpath
import urllib.request
import urllib.error
from urllib.parse import urlparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://auspicious24.myshopify.com/products.json"
REPO_ROOT = Path("/Users/abhipro/Developer/Github/auspicious24")
DATA_DIR = REPO_ROOT / "data"
PUBLIC_PRODUCTS_DIR = REPO_ROOT / "public" / "images" / "products"
OUTPUT_JSON = DATA_DIR / "products.json"

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


def clean_html_to_markdown(html_text: str) -> str:
    """Converts Shopify HTML description to clean, readable markdown."""
    if not html_text:
        return ""
    
    text = html.unescape(html_text)
    # Normalize non-breaking spaces
    text = text.replace("\u00a0", " ").replace("&nbsp;", " ")
    
    # Headers
    text = re.sub(r"<h[1-3][^>]*>(.*?)</h[1-3]>", r"\n\n## \1\n\n", text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r"<h[4-6][^>]*>(.*?)</h[4-6]>", r"\n\n### \1\n\n", text, flags=re.IGNORECASE | re.DOTALL)
    
    # Bold / Italic
    text = re.sub(r"<(?:strong|b)[^>]*>(.*?)</(?:strong|b)>", r"**\1**", text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r"<(?:em|i)[^>]*>(.*?)</(?:em|i)>", r"*\1*", text, flags=re.IGNORECASE | re.DOTALL)
    
    # List items
    text = re.sub(r"<li[^>]*>(.*?)</li>", r"* \1\n", text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r"</?ul[^>]*>", r"\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</?ol[^>]*>", r"\n", text, flags=re.IGNORECASE)
    
    # Line breaks and paragraphs
    text = re.sub(r"<br\s*/?>", r"\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<p[^>]*>(.*?)</p>", r"\1\n\n", text, flags=re.IGNORECASE | re.DOTALL)
    
    # Strip any remaining tags (e.g. span, div)
    text = re.sub(r"<[^>]+>", "", text)
    
    # Clean up whitespace on each line
    lines = [line.strip() for line in text.splitlines()]
    text = "\n".join(lines)
    # Collapse multiple consecutive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text


def extract_weight_or_size(title: str, grams: int) -> str:
    """Extract human-readable weight or packaging size."""
    if grams and grams > 0:
        if grams >= 1000:
            return f"{grams / 1000:.1f} kg".replace(".0 kg", " kg")
        return f"{grams}g"
    
    # Check title for weights like 500gm, 250 g, 500g
    match = re.search(r"(\d+(?:\.\d+)?)\s*(gm|gms|g|kg)", title, re.IGNORECASE)
    if match:
        val = match.group(1)
        unit = match.group(2).lower()
        if unit in ["gm", "gms", "g"]:
            return f"{val}g"
        elif unit == "kg":
            return f"{val}kg"
    
    # Check title for set/jars count
    jar_match = re.search(r"(\d+)\s*(?:compartments|jars|section|bowls|set of \d+)", title, re.IGNORECASE)
    if jar_match:
        return jar_match.group(0).strip()
        
    return ""


def categorize_product(p: dict) -> tuple:
    """
    Returns (category, product_type).
    Normalizes category for frontend filtering into:
    - 'Festive Hampers & Serveware'
    - 'Premium Dry Fruits'
    - 'Ladies Suits & Ethnic Wear'
    - 'Test'
    """
    pt = (p.get("product_type") or "").strip()
    title = (p.get("title") or "").strip()
    handle = (p.get("handle") or "").strip().lower()
    tags = [t.lower() for t in p.get("tags", [])]
    
    if handle == "test-product":
        return "Test", "Test"
    
    is_suit = (
        pt in ["Ladies Suits & Clothing", "Ethnic Suit"] or
        "suit" in title.lower() or
        "suit" in handle or
        "kurta" in title.lower() or
        any("suit" in t or "ethnic" in t for t in tags)
    )
    if is_suit:
        return "Ladies Suits & Ethnic Wear", "Ladies Suits & Clothing"
    
    # Dry fruits: differentiate Hampers & Serveware vs Packaged Dry Fruits
    serveware_keywords = ["box", "tray", "bowl", "thaal", "potli", "jar", "basket", "platter", "stand", "hamper", "knob"]
    is_serveware = any(k in title.lower() for k in serveware_keywords)
    
    if is_serveware:
        return "Festive Hampers & Serveware", "Festive Hampers & Serveware"
    else:
        return "Premium Dry Fruits", "Dry Fruits"


def fetch_all_products(base_url: str) -> list:
    """Fetches all products handling pagination."""
    all_products = []
    page = 1
    limit = 250
    
    print(f"Fetching products from {base_url}...")
    while True:
        url = f"{base_url}?limit={limit}&page={page}"
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                products = data.get("products", [])
                if not products:
                    break
                print(f"  Page {page}: received {len(products)} products")
                all_products.extend(products)
                page += 1
                if len(products) < limit:
                    break
        except urllib.error.URLError as e:
            print(f"Error fetching page {page}: {e}", file=sys.stderr)
            raise
            
    print(f"Total products retrieved: {len(all_products)}")
    return all_products


def download_single_image(img_info: dict) -> dict:
    """Worker task to download an individual image."""
    remote_url = img_info["remote_url"]
    dest_path = img_info["dest_path"]
    
    if dest_path.exists() and dest_path.stat().st_size > 0:
        return {"status": "skipped", "path": str(dest_path), "url": remote_url}
    
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    req = urllib.request.Request(remote_url, headers={"User-Agent": USER_AGENT})
    for attempt in range(1, 4):
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                content = resp.read()
                if len(content) > 0:
                    with open(dest_path, "wb") as f:
                        f.write(content)
                    return {"status": "downloaded", "path": str(dest_path), "url": remote_url, "size": len(content)}
        except Exception as e:
            if attempt == 3:
                return {"status": "failed", "path": str(dest_path), "url": remote_url, "error": str(e)}
    return {"status": "failed", "path": str(dest_path), "url": remote_url, "error": "unknown"}


def main():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_PRODUCTS_DIR.mkdir(parents=True, exist_ok=True)
    
    raw_products = fetch_all_products(BASE_URL)
    
    parsed_products = []
    download_tasks = []
    
    print("\nParsing and structuring catalog...")
    for p in raw_products:
        pid = p["id"]
        title = p["title"]
        handle = p["handle"]
        raw_body = p.get("body_html") or ""
        clean_desc = clean_html_to_markdown(raw_body)
        
        category, product_type = categorize_product(p)
        tags = p.get("tags") or []
        vendor = p.get("vendor") or "Auspicious Enterprises"
        
        # Variants & Pricing
        raw_variants = p.get("variants") or []
        variants = []
        prices = []
        compare_prices = []
        is_available = False
        primary_grams = 0
        
        for v in raw_variants:
            v_price = float(v.get("price") or 0.0)
            prices.append(v_price)
            
            v_comp = v.get("compare_at_price")
            v_comp_float = float(v_comp) if v_comp else None
            if v_comp_float:
                compare_prices.append(v_comp_float)
                
            v_avail = bool(v.get("available", True))
            if v_avail:
                is_available = True
                
            v_grams = int(v.get("grams") or 0)
            if v_grams > 0 and primary_grams == 0:
                primary_grams = v_grams
                
            opt_dict = {}
            for opt_idx, opt_val in enumerate([v.get("option1"), v.get("option2"), v.get("option3")], start=1):
                if opt_val:
                    # Match with options definition if present
                    opt_name = f"Option {opt_idx}"
                    if p.get("options") and len(p["options"]) >= opt_idx:
                        opt_name = p["options"][opt_idx - 1].get("name", opt_name)
                    opt_dict[opt_name] = opt_val
                    
            variants.append({
                "id": v["id"],
                "title": v.get("title") or "Default Title",
                "price": v_price,
                "compare_at_price": v_comp_float,
                "available": v_avail,
                "sku": v.get("sku"),
                "grams": v_grams,
                "weight_unit": "g",
                "position": v.get("position", 1),
                "options": opt_dict
            })
            
        min_price = min(prices) if prices else 0.0
        max_price = max(prices) if prices else 0.0
        price = min_price
        compare_at = compare_prices[0] if compare_prices else None
        
        weight_label = extract_weight_or_size(title, primary_grams)
        
        # Images processing & scheduling downloads
        raw_images = p.get("images") or []
        images = []
        product_img_dir = PUBLIC_PRODUCTS_DIR / handle
        
        for idx, img in enumerate(raw_images):
            img_id = img["id"]
            remote_src = img["src"]
            parsed_url = urlparse(remote_src)
            orig_filename = posixpath.basename(parsed_url.path)
            # Clean filename to safe chars
            safe_filename = re.sub(r"[^a-zA-Z0-9._-]", "_", orig_filename)
            
            local_rel_path = f"/images/products/{handle}/{safe_filename}"
            dest_file = product_img_dir / safe_filename
            
            img_entry = {
                "id": img_id,
                "position": img.get("position", idx + 1),
                "filename": safe_filename,
                "local_path": local_rel_path,
                "src": local_rel_path,
                "remote_url": remote_src,
                "width": img.get("width"),
                "height": img.get("height"),
                "alt": title
            }
            images.append(img_entry)
            
            download_tasks.append({
                "remote_url": remote_src,
                "dest_path": dest_file,
                "handle": handle,
                "filename": safe_filename
            })
            
        featured_image = images[0]["local_path"] if images else None
        
        parsed_products.append({
            "id": pid,
            "title": title,
            "handle": handle,
            "category": category,
            "product_type": product_type,
            "vendor": vendor,
            "tags": tags,
            "description": clean_desc,
            "description_html": raw_body,
            "available": is_available,
            "is_test": (category == "Test"),
            "price": price,
            "min_price": min_price,
            "max_price": max_price,
            "formatted_price": f"₹{int(price):,}" if price.is_integer() else f"₹{price:,.2f}",
            "compare_at_price": compare_at,
            "currency": "INR",
            "weight": weight_label,
            "featured_image": featured_image,
            "images": images,
            "variants": variants,
            "options": p.get("options") or [],
            "created_at": p.get("created_at"),
            "published_at": p.get("published_at"),
            "updated_at": p.get("updated_at")
        })
        
    print(f"Total structured products: {len(parsed_products)}")
    print(f"Total image download tasks queued: {len(download_tasks)}")
    
    # Download images with ThreadPoolExecutor
    print("\nDownloading product images (concurrency = 8)...")
    downloaded_cnt = 0
    skipped_cnt = 0
    failed_cnt = 0
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(download_single_image, task): task for task in download_tasks}
        for future in as_completed(futures):
            res = future.result()
            if res["status"] == "downloaded":
                downloaded_cnt += 1
            elif res["status"] == "skipped":
                skipped_cnt += 1
            elif res["status"] == "failed":
                failed_cnt += 1
                print(f"  [FAILED] {res['url']} -> {res.get('error')}", file=sys.stderr)
                
    print(f"Image download complete: {downloaded_cnt} downloaded, {skipped_cnt} skipped (already present), {failed_cnt} failed.")
    
    # Write structured JSON catalog
    print(f"\nWriting catalog to {OUTPUT_JSON}...")
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(parsed_products, f, indent=2, ensure_ascii=False)
        
    print(f"Catalog successfully written! File size: {OUTPUT_JSON.stat().st_size:,} bytes")
    
    # Generate and print detailed summary
    from collections import Counter
    categories = Counter(p["category"] for p in parsed_products)
    types = Counter(p["product_type"] for p in parsed_products)
    total_imgs = sum(len(p["images"]) for p in parsed_products)
    active_products = [p for p in parsed_products if not p["is_test"]]
    
    print("\n" + "=" * 60)
    print("AUSPICIOUS24 CATALOG SCRAPING SUMMARY")
    print("=" * 60)
    print(f"Total Products:           {len(parsed_products)}")
    print(f"Active Products:          {len(active_products)}")
    print(f"Total Images:             {total_imgs}")
    print(f"Images On Disk:           {downloaded_cnt + skipped_cnt}")
    print("\nCategories Breakdown:")
    for cat, count in categories.most_common():
        print(f"  - {cat:<30}: {count} products")
    print("\nProduct Types Breakdown:")
    for pt, count in types.most_common():
        print(f"  - {pt:<30}: {count} products")
        
    price_values = [p["price"] for p in active_products]
    if price_values:
        print(f"\nPrice Range:              ₹{min(price_values):,.0f} - ₹{max(price_values):,.0f}")
    print("=" * 60)


if __name__ == "__main__":
    main()
