import {
  products,
  realProducts,
  Product,
  ProductVariant,
  CATEGORIES,
  CategoryType,
  BrandType,
  BRANDS,
} from '@/data/products';

export { products, realProducts, CATEGORIES, BRANDS };
export type { Product, ProductVariant, CategoryType, BrandType };
export type Category = CategoryType;

/**
 * Strips raw markdown formatting (*, #, _, `, bullet lists), HTML tags,
 * and introductory bullet labels ("Key Features:"), returning a clean,
 * elegant 1-line luxury sentence suitable for product card previews.
 */
export function cleanCardDescription(text: string, maxLength: number = 90): string {
  if (!text) return '';

  // 1. Decode common HTML entities
  let clean = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');

  // 2. Strip HTML tags
  clean = clean.replace(/<[^>]*>/g, ' ');

  // 3. Remove "Key Features" or "Features:" section if introductory narrative exists
  const keyFeaturesIdx = clean.search(/(?:key\s+features|product\s+highlights|specifications)[:\s]/i);
  if (keyFeaturesIdx > 20) {
    clean = clean.slice(0, keyFeaturesIdx);
  }

  // 4. Strip markdown syntax: headers, bold/italic, bullet symbols, backticks
  clean = clean
    .replace(/^#+\s+/gm, '')
    .replace(/[*_~`]/g, ' ')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s*[-•]\s+/g, ' ');

  // 5. Remove leading "Key Features:" if left at the very start
  clean = clean.replace(/^(?:key\s+features|features)[:\s]*/i, '');

  // 6. Normalize whitespace
  clean = clean.replace(/\s+/g, ' ').trim();

  if (!clean) return '';

  // 7. If clean text is within maxLength, return as is
  if (clean.length <= maxLength) {
    return clean;
  }

  // 8. If the first sentence ends cleanly before or near maxLength, prefer the complete sentence
  const firstSentenceMatch = clean.match(/^([^.!?]+[.!?])/);
  if (firstSentenceMatch) {
    const firstSentence = firstSentenceMatch[1].trim();
    if (firstSentence.length >= 25 && firstSentence.length <= maxLength) {
      return firstSentence;
    }
  }

  // 9. Truncate at word boundary
  const truncated = clean.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 30) {
    return `${truncated.slice(0, lastSpace).trim()}...`;
  }

  return `${truncated.trim()}...`;
}

/**
 * Returns a compact metadata specification badge text (e.g., "4 Compartments • Handcrafted Gift Box",
 * "Set of 2 • Silver Finish", "3-Piece Unstitched Fabric", "500g Vacuum Pack", "Artisanal Kundan & Polki")
 * based on product category, title, weight, and brand.
 */
export function getSpecsSummary(product: {
  title?: string;
  weight?: string;
  category?: string;
  brand?: string;
  specs?: Record<string, string>;
}): string {
  const title = (product.title || '').toLowerCase();
  const weight = (product.weight || '').trim();
  const category = (product.category || '').toLowerCase();
  const brand = (product.brand || '').toLowerCase();

  // 1. Dry Fruits Category
  if (category.includes('dry fruit') || brand.includes('dry fruits') || brand.includes('dryfruits')) {
    const weightMatch = (product.weight || product.title || '').match(/(\d+\s*(?:gm|gms|g|kg))/i);
    const packWeight = weightMatch ? weightMatch[1].replace(/\s+/g, '') : weight || '500g';
    return `${packWeight} Vacuum Pack • Grade-A Harvest`;
  }

  // 2. Ladies Suits & Ethnic Wear
  if (category.includes('suit') || category.includes('ethnic') || brand.includes('sifti')) {
    if (title.includes('organza')) {
      return '3-Piece Unstitched Fabric • Organza & Zari';
    }
    if (title.includes('crape') || title.includes('crepe')) {
      return '3-Piece Unstitched Fabric • Pure Crepe';
    }
    if (title.includes('silk') || title.includes('tusser')) {
      return '3-Piece Unstitched Fabric • Pure Silk';
    }
    if (title.includes('parsi')) {
      return '3-Piece Unstitched Fabric • Parsi Needlework';
    }
    if (title.includes('phulkari')) {
      return '3-Piece Unstitched Fabric • Folk Phulkari';
    }
    return '3-Piece Unstitched Fabric • Handcrafted Dupatta';
  }

  // 3. Jewellery (Güzel)
  if (
    category.includes('jewel') ||
    brand.includes('güzel') ||
    brand.includes('guzel') ||
    title.includes('kundan') ||
    title.includes('necklace') ||
    title.includes('bangle')
  ) {
    if (title.includes('kundan') || title.includes('polki')) {
      return 'Artisanal Kundan & Polki • 22K Gold Finish';
    }
    if (title.includes('temple')) {
      return 'Heritage Temple Design • Antique Matte Gold';
    }
    if (title.includes('bangle') || title.includes('kada')) {
      return 'Set of 2 • Handcrafted Meenakari';
    }
    return 'Festive Statement Piece • Handcrafted';
  }

  // 4. Festive Hampers & Serveware
  if (category.includes('hamper') || category.includes('serveware') || category.includes('thaal') || category.includes('tray')) {
    const compMatch = (product.weight || product.title || '').match(/(\d+)\s*(?:compartment|section)/i);
    if (compMatch) {
      const type = title.includes('thaal') ? 'Gift Thaal' : 'Gift Box';
      return `${compMatch[1]} Compartments • Handcrafted ${type}`;
    }
    const jarMatch = (product.title || '').match(/(\d+|two|three|four|six)\s*jar/i);
    if (jarMatch) {
      const numMap: Record<string, string> = { two: '2', three: '3', four: '4', six: '6' };
      const rawNum = jarMatch[1].toLowerCase();
      const jarNum = numMap[rawNum] || rawNum;
      return `${jarNum}-Jar Hamper • Artisanal Presentation`;
    }
    if (title.includes('set of 2') || title.includes('pair')) {
      const finish = title.includes('silver') ? 'Silver Finish' : title.includes('brass') ? 'Brass Finish' : 'Gold Finish';
      return `Set of 2 • ${finish}`;
    }
    if (title.includes('potli')) {
      return 'Embroidered Potli • Dry Fruit Filled';
    }
    if (title.includes('basket')) {
      return 'Artisanal Basket • Antique Gold Finish';
    }
    if (title.includes('silver') || title.includes('peacock')) {
      return 'Artisanal Keepsake • Silver Finish';
    }
    if (title.includes('gold') || title.includes('brass')) {
      return 'Artisanal Keepsake • Antique Gold Finish';
    }
    if (title.includes('wood') || title.includes('platter')) {
      return 'Artisanal Keepsake • Solid Wood Finish';
    }
    return 'Festive Keepsake • Handcrafted';
  }

  return weight ? `${weight} • Handcrafted` : 'Curated Luxury • Handcrafted';
}

/**
 * Compact pill label for card displays, aliases to getSpecsSummary or product.specsSummary
 */
export function getProductMetadataPill(product: {
  title?: string;
  weight?: string;
  category?: string;
  brand?: string;
  specsSummary?: string;
  specs?: Record<string, string>;
}): string {
  return product.specsSummary || getSpecsSummary(product);
}

export function getAllProducts(): Product[] {
  return realProducts;
}

export function getProductByHandle(handle: string): Product | undefined {
  return realProducts.find((p) => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All' || !category) return realProducts;
  return realProducts.filter((p) => p.category === category);
}

export function getProductsByBrand(brand: string): Product[] {
  if (brand === 'All' || !brand) return realProducts;
  return realProducts.filter((p) => p.brand === brand);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return realProducts
    .filter((p) => p.category === product.category && p.handle !== product.handle)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return realProducts;
  const q = query.toLowerCase().trim();
  return realProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
