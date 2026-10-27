import rawProducts from './products.json';

export interface ProductVariant {
  id: string | number;
  title: string;
  price: number;
  compare_at_price?: number | null;
  available: boolean;
  grams?: number;
  weight_unit?: string;
  sku?: string | null;
}

export interface ProductImage {
  id: number;
  src: string;
  local_path: string;
  remote_url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string | number;
  title: string;
  handle: string;
  category: string;
  product_type: string;
  vendor: string;
  brand: 'Auspicious Dry Fruits' | 'Sifti Creations' | 'Auspicious Enterprises';
  tags: string[];
  description: string;
  description_html: string;
  available: boolean;
  price: number;
  min_price: number;
  max_price: number;
  formatted_price: string;
  compare_at_price?: number | null;
  currency: string;
  weight?: string;
  featured_image: string;
  images: string[];
  image_objects: ProductImage[];
  variants: ProductVariant[];
  badge?: 'Festive Special' | 'Best Seller' | 'Artisanal' | 'Premium Gift' | 'Handcrafted';
  inStock: boolean;
  highlights: string[];
  specs: Record<string, string>;
}

export const CATEGORIES = [
  'All',
  'Festive Hampers & Serveware',
  'Premium Dry Fruits',
  'Ladies Suits & Ethnic Wear',
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

// Process raw scraped Shopify products into clean typed products (ignoring draft/test products)
export const realProducts: Product[] = (rawProducts as any[])
  .filter((p) => !p.is_test && p.handle !== 'test-product')
  .map((p) => {
    // Brand detection based on category / vendor
    let brand: Product['brand'] = 'Auspicious Enterprises';
    if (p.category === 'Ladies Suits & Ethnic Wear' || (p.tags && p.tags.includes('women'))) {
      brand = 'Sifti Creations';
    } else if (p.category === 'Premium Dry Fruits') {
      brand = 'Auspicious Dry Fruits';
    }

    // Determine luxury badge
    let badge: Product['badge'] = undefined;
    if (p.price >= 2000) {
      badge = 'Festive Special';
    } else if (p.price <= 999 && p.price > 400) {
      badge = 'Best Seller';
    } else if (p.category === 'Ladies Suits & Ethnic Wear') {
      badge = 'Handcrafted';
    } else {
      badge = 'Premium Gift';
    }

    const imageList: string[] = Array.isArray(p.images) && p.images.length > 0
      ? p.images.map((img: any) => img.local_path || img.src || img.remote_url)
      : [p.featured_image || '/images/placeholder.jpg'];

    // Extract quick highlights
    const highlights: string[] = [];
    if (brand === 'Sifti Creations') {
      highlights.push('Curated by Sifti Creations designer line');
      highlights.push('Pure handcrafted festive fabric & needlework');
      highlights.push('Unstitched dress material with dupatta');
    } else if (p.category === 'Premium Dry Fruits') {
      highlights.push('Grade-A naturally harvested & vacuum packed');
      highlights.push('Rich in natural antioxidants & heart-healthy fats');
      highlights.push('Zero artificial preservatives or polish');
    } else {
      highlights.push('Artisanal Diwali & celebration serveware hamper');
      highlights.push('Includes decorative reusable centerpiece');
      highlights.push('Ideal for personal, wedding & corporate gifting');
    }

    const specs: Record<string, string> = {
      Category: p.category,
      Brand: brand,
      'Dispatch Time': 'Same-day dispatch in NCR / 48 hrs Pan-India',
      Availability: p.available ? 'Ready in Stock' : 'On Request',
    };

    if (p.weight) {
      specs['Pack Size'] = p.weight;
    }

    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      category: p.category,
      product_type: p.product_type || p.category,
      vendor: p.vendor || 'Auspicious Enterprises',
      brand,
      tags: p.tags || [],
      description: p.description || p.title,
      description_html: p.description_html || `<p>${p.description}</p>`,
      available: p.available !== false,
      price: Number(p.price) || 0,
      min_price: Number(p.min_price) || Number(p.price) || 0,
      max_price: Number(p.max_price) || Number(p.price) || 0,
      formatted_price: p.formatted_price || `₹${Number(p.price).toLocaleString('en-IN')}`,
      compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : null,
      currency: 'INR',
      weight: p.weight,
      featured_image: p.featured_image || imageList[0],
      images: imageList,
      image_objects: p.images || [],
      variants: (p.variants || []).map((v: any) => ({
        id: v.id,
        title: v.title,
        price: Number(v.price),
        compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : null,
        available: v.available !== false,
        grams: v.grams,
        weight_unit: v.weight_unit,
        sku: v.sku,
      })),
      badge,
      inStock: p.available !== false,
      highlights,
      specs,
    };
  });

export const products = realProducts;


export const EXHIBITION_INFO = {
  title: 'Diwali Shopping Exhibition 2026',
  subtitle: 'Shop • Celebrate • Gift',
  tagline: 'Festive finds, beautiful treasures & gifting delights',
  dates: '23 • 24 • 25 October',
  time: '11:00 AM – 9:00 PM',
  venue: 'B21, South City 1',
  city: 'Gurgaon, Haryana',
  highlights: ['Exclusive Festive Pricing', 'Complimentary Gift Wrapping', 'Live Sampling & Tasting', 'Custom Hamper Assembly'],
  phone: '9899875665',
  brands: [
    {
      name: 'Auspicious Dry Fruits',
      category: 'Premium Dry Fruits & Hampers',
      description: 'Handpicked Californian almonds, Afghan anjeer, stuffed medjool dates & artisanal festive hampers.',
      image: '/images/products/luxury-silver-peacock-decorative-serving-bowl-dryfruit-filled/30.jpg',
    },
    {
      name: 'Sifti Creations',
      category: 'Designer Suit Fabrics',
      description: 'Exclusive unstitched festive fabrics with Parsi work, Banarasi borders & handcrafted Lucknowi embroidery.',
      image: '/images/products/parsi-work-on-steel-grey-suit/6.jpg',
    },
    {
      name: 'Güzel',
      category: 'Fashion Destination Jewellery',
      description: 'Curated royal kundan necklaces, polki chokers, heritage temple jewelry & festive statement ornaments.',
      image: '/images/products/golden-bird-decorative-glass-bowl-with-ornate-metal-stand-premium-festive-serve-ware/37.jpg',
    },
  ],
};


export const BRAND_STORIES = [
  {
    name: 'Auspicious Dry Fruits',
    role: 'Gourmet Dry Fruits & Festive Hampers',
    description: 'Directly sourced grade-A harvests of California almonds, Afghan anjeer, Chilean walnuts, and stuffed medjool dates. Curated in handcrafted royal metal and wooden serveware.',
    values: ['Grade-A Nut Sourcing', 'Zero Artificial Polish', 'Handcrafted Keepsake Gift Boxes'],
  },
  {
    name: 'Sifti Creations',
    role: 'Artisanal Ethnic Wear & Fabrics',
    description: 'Heirloom needlework and bespoke designer fabrics celebrating royal Indian craftsmanship, featuring intricate Parsi gara hand embroidery, organza zari, and festive bridal ensembles.',
    values: ['Heirloom Needlework', 'Pure Breathable Fabrics', 'Exclusive Unstitched Designer Sets'],
  },
  {
    name: 'Güzel',
    role: 'Destination Fashion Jewellery',
    description: 'Regal bridal and festive jewelry pieces inspired by royal Rajasthani and Mughal heritage, featuring uncut polki, kundan chokers, and handcrafted temple statement pieces.',
    values: ['Artisanal Kundan & Polki', 'Festive Statement Sets', 'Crafted for Celebrations'],
  },
];
