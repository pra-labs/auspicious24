import rawProducts from "@/data/products.json";
import { PRODUCTS as CURATED_SPECIALTY_PRODUCTS, Product, ProductVariant, Category, CATEGORIES } from "@/data/products";

export type { Product, ProductVariant, Category };
export { CATEGORIES };

interface RawImage {
  id?: number | string;
  local_path?: string;
  src?: string;
  remote_url?: string;
  alt?: string;
}

interface RawVariant {
  id: string | number;
  title: string;
  price: number;
  compare_at_price?: number | null;
  available?: boolean;
}

interface RawProduct {
  id: string | number;
  title: string;
  handle: string;
  category: string;
  product_type: string;
  vendor: string;
  tags?: string[];
  description?: string;
  description_html?: string;
  available?: boolean;
  is_test?: boolean;
  price: number;
  compare_at_price?: number | null;
  featured_image?: string | null;
  images?: (RawImage | string)[];
  variants?: RawVariant[];
}

function mapCategory(rawCat: string, rawType: string): "Dry Fruits & Nuts" | "Luxury Hampers" | "Designer Suits & Fabrics" | "Festive Jewelry" {
  const combined = `${rawCat} ${rawType}`.toLowerCase();
  if (combined.includes("suit") || combined.includes("clothing") || combined.includes("ethnic") || combined.includes("wear")) {
    return "Designer Suits & Fabrics";
  }
  if (combined.includes("hamper") || combined.includes("serveware") || combined.includes("bowl") || combined.includes("tray") || combined.includes("box") || combined.includes("thaal")) {
    return "Luxury Hampers";
  }
  if (combined.includes("dry fruit") || combined.includes("nut") || combined.includes("almond") || combined.includes("cashew")) {
    return "Dry Fruits & Nuts";
  }
  return "Luxury Hampers";
}

function assignBrand(category: string): "Auspicious Dry Fruits" | "Sifti Creations" | "Güzel Jewellery" {
  if (category === "Designer Suits & Fabrics") {
    return "Sifti Creations";
  }
  if (category === "Festive Jewelry") {
    return "Güzel Jewellery";
  }
  return "Auspicious Dry Fruits";
}

function assignBadge(product: RawProduct, index: number): "Festive Special" | "Best Seller" | "Royal Selection" | "Limited Edition" | "Artisanal" | undefined {
  if (product.tags && product.tags.length > 0) {
    if (product.tags.includes("bestseller") || product.tags.includes("best-seller")) return "Best Seller";
    if (product.tags.includes("royal") || product.tags.includes("luxury")) return "Royal Selection";
  }
  if (index % 5 === 0) return "Festive Special";
  if (index % 5 === 1) return "Best Seller";
  if (index % 5 === 3) return "Royal Selection";
  if (index % 5 === 4) return "Artisanal";
  return undefined;
}

function cleanDescription(rawDesc?: string, title?: string, category?: string): string {
  if (rawDesc && rawDesc.trim().length > 15) {
    return rawDesc.trim();
  }
  if (category === "Designer Suits & Fabrics") {
    return `Exclusively designed by Sifti Creations for the festive season. This piece features refined handloom textiles, delicate embroidery, and unmatched festive elegance.`;
  }
  if (category === "Luxury Hampers") {
    return `An artisanal festive hamper by Auspicious Dry Fruits, presented with ornate craftsmanship, royal gold accents, and filled with freshly packed handpicked dry fruits.`;
  }
  return `Hand-selected premium dry fruits packed under stringent hygienic standards by Auspicious Enterprises to preserve crunch, natural richness, and festive sweetness.`;
}

function buildHighlights(category: string, title: string): string[] {
  if (category === "Designer Suits & Fabrics") {
    return [
      "Authentic artisanal craftsmanship from Sifti Creations",
      "Premium breathable handloom fabric with rich festive drape",
      "Intricate hand embroidery and fine zari detailing",
      "Available for custom stitching consultation via WhatsApp",
    ];
  }
  if (category === "Luxury Hampers") {
    return [
      "Ornate keepsake presentation box / artisanal serveware",
      "Filled with premium fresh-crop nuts and dry fruits",
      "Diwali festive greeting ribbon & personalized note included",
      "Available for single orders and corporate bulk delivery",
    ];
  }
  return [
    "100% natural, unadulterated grade-A dry fruits",
    "Nitrogen-packed / vacuum-sealed for peak crunch & aroma",
    "Direct source from authentic regional orchards",
    "Zero added preservatives or artificial colors",
  ];
}

function buildSpecs(category: string, raw: RawProduct): Record<string, string> {
  if (category === "Designer Suits & Fabrics") {
    return {
      Brand: "Sifti Creations",
      Occasion: "Diwali, Karwa Chauth, Weddings & Festive Parties",
      Craft: "Handloom Weaving & Festive Embroidery",
      "Care Instructions": "Dry Clean Only",
      Shipping: "Dispatch in 24-48 hours via express courier",
    };
  }
  if (category === "Luxury Hampers") {
    return {
      Brand: "Auspicious Dry Fruits",
      "Hamper Type": "Luxury Festive Presentation",
      "Shelf Life": "6 Months from packaging",
      Packaging: "Rigid Gold / Velvet Finish Keepsake Box",
      "Bulk Orders": "Available with custom corporate logo ribbons",
    };
  }
  return {
    Brand: "Auspicious Dry Fruits",
    Origin: "Hand-curated & Packed in India",
    Quality: "Imperial Grade",
    "Shelf Life": "6 to 9 Months",
    Storage: "Store in a cool, dry place in an airtight container",
  };
}

let cachedProducts: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cachedProducts) {
    return cachedProducts;
  }

  const rawList = (rawProducts as RawProduct[]).filter((p) => !p.is_test);

  const mappedScraped: Product[] = rawList.map((raw, idx) => {
    const category = mapCategory(raw.category, raw.product_type);
    const brand = assignBrand(category);
    const badge = assignBadge(raw, idx);

    // Extract image URLs
    const images: string[] = [];
    if (raw.images && Array.isArray(raw.images)) {
      for (const img of raw.images) {
        if (typeof img === "string") {
          images.push(img);
        } else if (img.local_path) {
          images.push(img.local_path);
        } else if (img.src) {
          images.push(img.src);
        } else if (img.remote_url) {
          images.push(img.remote_url);
        }
      }
    }
    if (images.length === 0 && raw.featured_image) {
      images.push(raw.featured_image);
    }
    if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80");
    }

    const price = raw.price || 999;
    const compareAt = raw.compare_at_price && raw.compare_at_price > price
      ? raw.compare_at_price
      : Math.round(price * 1.25);

    const description = cleanDescription(raw.description, raw.title, category);
    const shortDesc = description.slice(0, 140) + (description.length > 140 ? "..." : "");

    const variants = raw.variants && raw.variants.length > 0
      ? raw.variants.map((v) => ({
          id: String(v.id),
          label: v.title,
          price: v.price || price,
          originalPrice: v.compare_at_price || Math.round((v.price || price) * 1.25),
          inStock: v.available !== false,
        }))
      : undefined;

    return {
      id: String(raw.id),
      handle: raw.handle,
      title: raw.title,
      brand,
      category,
      price,
      originalPrice: compareAt,
      badge,
      images,
      shortDescription: shortDesc,
      description,
      highlights: buildHighlights(category, raw.title),
      specs: buildSpecs(category, raw),
      variants,
      inStock: raw.available !== false,
      featured: idx < 8,
    };
  });

  // Merge curated specialty products (e.g. Jewellery & signature trunk boxes)
  // Ensure no handle collisions
  const existingHandles = new Set(mappedScraped.map((p) => p.handle));
  const specialtyToAdd = CURATED_SPECIALTY_PRODUCTS.filter(
    (p) => !existingHandles.has(p.handle)
  );

  cachedProducts = [...specialtyToAdd, ...mappedScraped];
  return cachedProducts;
}

export function getProductByHandle(handle: string): Product | undefined {
  const all = getAllProducts();
  return all.find((p) => p.handle === handle);
}

export function getFeaturedProducts(): Product[] {
  const all = getAllProducts();
  return all.filter((p) => p.featured || p.badge === "Royal Selection" || p.badge === "Best Seller").slice(0, 8);
}

export function getProductsByCategory(category: string): Product[] {
  const all = getAllProducts();
  if (category === "All") return all;
  return all.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const all = getAllProducts();
  return all
    .filter((p) => p.handle !== product.handle && p.category === product.category)
    .slice(0, limit);
}
