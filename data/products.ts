export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  inStock?: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  brand: "Auspicious Dry Fruits" | "Sifti Creations" | "Güzel Jewellery";
  category: "Dry Fruits & Nuts" | "Luxury Hampers" | "Designer Suits & Fabrics" | "Festive Jewelry";
  price: number;
  originalPrice: number;
  badge?: "Festive Special" | "Best Seller" | "Royal Selection" | "Limited Edition" | "Artisanal";
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  inStock: boolean;
  featured?: boolean;
}

export const CATEGORIES = [
  "All",
  "Dry Fruits & Nuts",
  "Luxury Hampers",
  "Designer Suits & Fabrics",
  "Festive Jewelry",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PRODUCTS: Product[] = [
  // 1. Luxury Hampers
  {
    id: "hamper-swarna-utsav",
    handle: "swarna-utsav-royal-gifting-trunk",
    title: "The Swarna Utsav Royal Gifting Trunk",
    brand: "Auspicious Dry Fruits",
    category: "Luxury Hampers",
    price: 3499,
    originalPrice: 4200,
    badge: "Royal Selection",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Handcrafted velvet & brass-accented festive trunk packed with Jumbo California Almonds, Afghan Anjeer, Royal Pistachios & W240 Cashews.",
    description:
      "The pinnacle of Diwali gifting. The Swarna Utsav Trunk features an artisanal velvet-lined keepsake chest adorned with gold foil detailing. Inside rests 1kg of hand-selected imperial-grade dry fruits in brass-finished jars, accompanied by two artisanal terracotta brass diyas and a personalized gold-embossed message card.",
    highlights: [
      "Includes 4 Airtight Keepsake Jars (250g each): Almonds, Cashews, Pistachios, Anjeer",
      "Luxury Velvet Hardbound Trunk with Golden Lock & Leather Straps",
      "Includes 2 Handcrafted Scented Brass Diyas & Gourmet Roestel card",
      "Complimentary personalized festive greeting card",
      "Ideal for premium corporate gifting and family celebrations",
    ],
    specs: {
      "Total Net Weight": "1000g (1.0 kg)",
      "Box Dimensions": "32cm x 24cm x 11cm",
      "Jar Material": "Airtight Golden Brass-Finished Glass Containers",
      Packaging: "Custom Embossed Rigid Trunk with Velvet Lining",
      "Shelf Life": "6 Months from packing",
      Origin: "Imported & Processed in India",
    },
    variants: [
      { id: "su-1000", label: "Grand Trunk (1000g Total)", price: 3499, originalPrice: 4200 },
      { id: "su-1500", label: "Imperial Trunk (1500g Total + Saffron)", price: 4999, originalPrice: 5900 },
    ],
  },
  {
    id: "hamper-kesariya-heritage",
    handle: "kesariya-heritage-gift-box",
    title: "Kesariya Heritage 4-Jar Festive Box",
    brand: "Auspicious Dry Fruits",
    category: "Luxury Hampers",
    price: 2199,
    originalPrice: 2699,
    badge: "Best Seller",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Saffron & emerald festive hamper with gold foil filigree containing roasted salted pistachios, mamra almonds, whole walnuts, and seedless dates.",
    description:
      "Curated to commemorate auspicious beginnings. Our Kesariya Heritage Box is enveloped in traditional festive art with intricate golden filigree. Designed for discerning hosts who appreciate purity, elegance, and unforgettable flavor.",
    highlights: [
      "4 Elegant reusable octagon acrylic jars (200g each)",
      "Roasted Salted Pistachios, Premium California Almonds, Kashmiri Walnuts & Medjool Dates",
      "Golden ribbon bow and Diwali festive sleeve included",
      "Zero preservatives, fresh crop guarantee",
    ],
    specs: {
      "Total Weight": "800g",
      "Box Dimensions": "28cm x 22cm x 8cm",
      "Packaging Type": "Rigid Gold-foiled Magnetic Box",
      "Shelf Life": "6 Months",
    },
    variants: [
      { id: "kh-800", label: "Standard Gift Box (800g)", price: 2199, originalPrice: 2699 },
    ],
  },
  {
    id: "hamper-corporate-connoisseur",
    handle: "the-connoisseur-corporate-hamper",
    title: "The Connoisseur Corporate Hamper",
    brand: "Auspicious Dry Fruits",
    category: "Luxury Hampers",
    price: 1850,
    originalPrice: 2300,
    badge: "Festive Special",
    featured: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Sleek emerald green & gold corporate gift box featuring California Almonds, King Cashews, Seedless Raisins, and Turkish Apricots.",
    description:
      "Designed specifically for corporate clients, business executives, and family gifting. Compact yet grand, this hamper leaves a memorable impression. Custom company logo ribbons and personalized inserts available for orders above 25 units.",
    highlights: [
      "4 Compartment premium magnetic flap presentation box",
      "Includes 200g each of Almonds, Cashews, Kishmish & Turkish Apricots",
      "Custom corporate ribbon & co-branding available on WhatsApp inquiry",
      "Pan-India doorstep dispatch available",
    ],
    specs: {
      "Total Weight": "800g",
      "Box Style": "Emerald Book-fold Magnetic Box",
      "Shelf Life": "6 Months",
      "Customization Minimum": "25 boxes",
    },
  },

  // 2. Dry Fruits & Nuts
  {
    id: "dryfruit-mamra-badam",
    handle: "kashmiri-mamra-almonds-grade-a",
    title: "Imperial Kashmiri Mamra Almonds (Grade A+)",
    brand: "Auspicious Dry Fruits",
    category: "Dry Fruits & Nuts",
    price: 1350,
    originalPrice: 1600,
    badge: "Royal Selection",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Original organic Kashmiri Mamra almonds known for their high oil content, natural sweetness, and superior brain-boosting nutrition.",
    description:
      "Our authentic Mamra badam comes directly from high-altitude orchards in Kashmir. Unlike commercially farmed California almonds, Mamra is 100% natural, pesticide-free, and rich in natural almond oil (nearly 50% oil content). Perfect for daily vitality, students, seniors, and royal festive delicacies.",
    highlights: [
      "Authentic 100% Single-origin Kashmiri Mamra",
      "Natural high-oil yield with concave traditional shape",
      "No chemical polishing or bleaching",
      "Packed in nitrogen-flushed resealable zip pouch",
    ],
    specs: {
      Origin: "Kashmir Valley, India",
      Form: "Whole raw untreated kernels",
      OilContent: "Approx 48-52%",
      "Shelf Life": "9 Months",
    },
    variants: [
      { id: "mb-250", label: "250g Zip Pouch", price: 720, originalPrice: 850 },
      { id: "mb-500", label: "500g Premium Pack", price: 1350, originalPrice: 1600 },
      { id: "mb-1000", label: "1kg Master Pack", price: 2590, originalPrice: 3100 },
    ],
  },
  {
    id: "dryfruit-jumbo-cashews-w240",
    handle: "jumbo-king-cashews-w240",
    title: "Jumbo King Cashews W240 (Whole White)",
    brand: "Auspicious Dry Fruits",
    category: "Dry Fruits & Nuts",
    price: 580,
    originalPrice: 700,
    badge: "Best Seller",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1536591375315-1b8368903277?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Crisp, sweet, jumbo W240 grade whole cashews selected for uniform ivory color and buttery crunch.",
    description:
      "Handpicked W240 whole cashew nuts representing the gold standard of Indian cashew processing. Each nut is carefully sorted to ensure zero blemishes, uniform ivory appearance, and a rich, creamy crunch. Excellent for roasting, festive sweets, and royal hospitality.",
    highlights: [
      "Grade W-240 Premium Whole Cashews",
      "Zero split nuts, vacuum packed for peak freshness",
      "Naturally sweet, buttery texture",
      "Rich in heart-healthy monounsaturated fats",
    ],
    specs: {
      Grade: "W-240 (Whole White)",
      Origin: "Mangalore / Goa, India",
      Processing: "Slow-roasted steam peeled",
      "Shelf Life": "6 Months",
    },
    variants: [
      { id: "cw-250", label: "250g Pouch", price: 320, originalPrice: 380 },
      { id: "cw-500", label: "500g Pouch", price: 580, originalPrice: 700 },
      { id: "cw-1000", label: "1kg Airtight Jar", price: 1120, originalPrice: 1350 },
    ],
  },
  {
    id: "dryfruit-afghan-anjeer",
    handle: "afghan-jumbo-anjeer-figs",
    title: "Supreme Afghan Jumbo Anjeer (Dried Figs)",
    brand: "Auspicious Dry Fruits",
    category: "Dry Fruits & Nuts",
    price: 780,
    originalPrice: 950,
    badge: "Artisanal",
    featured: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Sun-dried, garland-threaded golden jumbo figs with soft chewy texture and natural honey sweetness.",
    description:
      "Imported directly from the dry highlands of Afghanistan, these garland-threaded figs are naturally sun-dried without sulphur or artificial sweetening. Packed with dietary fiber, iron, calcium, and potassium.",
    highlights: [
      "100% Naturally sun-dried on garland threads",
      "High fiber and iron content, zero added sugar",
      "Soft chewy bite with rich seeds crunch",
      "Hygienically cleaned and vacuum packed",
    ],
    specs: {
      Origin: "Kandahar, Afghanistan",
      Type: "Ring Anjeer (Large Size)",
      "Sugar Content": "Zero added sugar",
      "Shelf Life": "6 Months",
    },
    variants: [
      { id: "anj-250", label: "250g Pack", price: 420, originalPrice: 500 },
      { id: "anj-500", label: "500g Pack", price: 780, originalPrice: 950 },
      { id: "anj-1000", label: "1kg Pack", price: 1490, originalPrice: 1800 },
    ],
  },
  {
    id: "dryfruit-kashmiri-walnuts",
    handle: "kashmiri-snow-white-walnut-kernels",
    title: "Kashmiri Snow White Walnut Kernels (Akhrot Giri)",
    brand: "Auspicious Dry Fruits",
    category: "Dry Fruits & Nuts",
    price: 690,
    originalPrice: 850,
    badge: "Best Seller",
    featured: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1568271679468-8850b88f3a8a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1536591375315-1b8368903277?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Hand-cracked 100% extra light halves and quarters from Kashmir orchards, rich in plant-based Omega-3.",
    description:
      "Our Kashmiri Walnut kernels are known for their golden-light color and sweet, buttery flavor without the bitter aftertaste often found in stale commercial walnuts. Sourced fresh from the latest autumn harvest.",
    highlights: [
      "Extra light quarters and halves",
      "High in Alpha-Linolenic Acid (Omega-3 fatty acids)",
      "No chemical bleaching — natural ivory hue",
      "Vacuum-sealed to preserve natural oils",
    ],
    specs: {
      Origin: "Shopian / Kupwara, Kashmir",
      Grade: "Extra Light Halves & Quarters",
      "Shelf Life": "6 Months refrigerated",
    },
    variants: [
      { id: "wn-250", label: "250g Vacuum Pack", price: 370, originalPrice: 450 },
      { id: "wn-500", label: "500g Vacuum Pack", price: 690, originalPrice: 850 },
      { id: "wn-1000", label: "1kg Vacuum Pack", price: 1320, originalPrice: 1650 },
    ],
  },

  // 3. Designer Suits & Fabrics (Sifti Creations)
  {
    id: "suit-chanderi-zari-royal",
    handle: "chanderi-silk-handcrafted-zari-suit-set",
    title: "Chanderi Silk Handcrafted Zari Suit Set",
    brand: "Sifti Creations",
    category: "Designer Suits & Fabrics",
    price: 4850,
    originalPrice: 6200,
    badge: "Limited Edition",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733975-00c73292ca97?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Signature deep bottle emerald Chanderi silk kurta fabric with antique gold gota-patti and threadwork, paired with scalloped organza dupatta.",
    description:
      "From the atelier of Sifti Creations. This regal 3-piece unstitched ensemble is rendered in pure handwoven Chanderi silk in a breathtaking emerald green hue. Intricate hand-embroidered neckline with antique tilla and sequins is complemented by a gossamer organza dupatta with scalloped borders and pure silk bottom fabric.",
    highlights: [
      "Top: 2.5m Pure Handloom Chanderi Silk with Intricate Handwork Neckline",
      "Bottom: 2.5m Premium Shantoon Silk / Cotton Silk",
      "Dupatta: 2.5m Organza with Handcrafted Scalloped Borders & Buta Work",
      "Ideal for Diwali Puja, festive soirees, and wedding guest styling",
      "Custom stitching assistance available upon WhatsApp request",
    ],
    specs: {
      "Fabric - Kurta": "Pure Chanderi Silk Handloom",
      "Fabric - Bottom": "Pure Shantoon Silk",
      "Fabric - Dupatta": "Organza with Floral Boota & Cutwork",
      Craft: "Hand Embroidery, Zari & Sequins Detailing",
      WashCare: "Dry Clean Only",
      Occasion: "Festive, Wedding, Reception",
    },
    variants: [
      { id: "sc-unstitched", label: "Unstitched 3-Piece Fabric Set", price: 4850, originalPrice: 6200 },
      { id: "sc-stitched", label: "Custom Stitched (Standard S-XL)", price: 6250, originalPrice: 7800 },
    ],
  },
  {
    id: "suit-banarasi-tilla-velvet",
    handle: "kashmiri-tilla-work-festive-velvet-suit",
    title: "Kashmiri Tilla Work Festive Velvet Kurta Set",
    brand: "Sifti Creations",
    category: "Designer Suits & Fabrics",
    price: 5900,
    originalPrice: 7500,
    badge: "Royal Selection",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Plush micro-velvet kurta in deep jewel wine with traditional Kashmiri silver & gold tilla embroidery on neckline, sleeves, and hem.",
    description:
      "An heirloom masterpiece crafted for winter festivities. Cut from ultra-soft micro velvet in rich imperial maroon, this suit features authentic needle-tilla embroidery passed down through generations of Kashmiri artisans. Paired with a tissue organza dupatta.",
    highlights: [
      "Top: 2.5m Pure Premium Micro Velvet with Full Front Tilla Embroidery",
      "Bottom: 2.5m Heavy Pashmina Blend Silk",
      "Dupatta: 2.5m Banarasi Tissue Silk Dupatta with Zari Borders",
      "Sumptuous winter warmth and peerless royal sheen",
    ],
    specs: {
      "Kurta Fabric": "Premium Micro-Velvet 9000",
      Embroidery: "Silver & Gold Tilla Needle Work",
      Dupatta: "Banarasi Tissue Zari",
      Care: "Strictly Dry Clean",
    },
    variants: [
      { id: "vel-unstitched", label: "Unstitched Fabric Set (3 Pcs)", price: 5900, originalPrice: 7500 },
    ],
  },
  {
    id: "suit-organza-pastel-embroidered",
    handle: "pastel-sage-embroidered-organza-suit",
    title: "Pastel Sage Hand-Embroidered Organza Suit",
    brand: "Sifti Creations",
    category: "Designer Suits & Fabrics",
    price: 4200,
    originalPrice: 5400,
    badge: "Festive Special",
    featured: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1583391733975-00c73292ca97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Breezy, ethereal sage green organza kurta with delicate thread floral embroidery and pearl highlights, paired with silk pants fabric.",
    description:
      "Delicate, contemporary, and effortlessly chic. Crafted in airy organza with tone-on-tone pastel floral embroidery and scattered mirror-work. Perfect for day festive parties, card parties, and family luncheons.",
    highlights: [
      "Top: 2.5m Soft Organza with Thread & Pearl Motifs",
      "Inner Lining: 2.0m Soft Malmal Cotton included",
      "Bottom: 2.5m Pure Crepe Silk",
      "Dupatta: Embroidered Sheer Organza with Tassel Finish",
    ],
    specs: {
      Color: "Sage Green / Mint",
      Fabric: "Soft Organza with Cotton Lining",
      Work: "Resham Thread & Pearl Handwork",
      Care: "Dry Clean Only",
    },
  },

  // 4. Festive Jewelry (Güzel Jewellery)
  {
    id: "jewel-kundan-polki-choker",
    handle: "royal-kundan-polki-choker-set",
    title: "The Rajwada Kundan Polki Choker & Earring Set",
    brand: "Güzel Jewellery",
    category: "Festive Jewelry",
    price: 3200,
    originalPrice: 4500,
    badge: "Royal Selection",
    featured: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Handcrafted 22K gold-plated Jadau Kundan choker with emerald green drop beads, freshwater pearls, and matching chandelier earrings.",
    description:
      "Created by master craftsmen at Güzel Jewellery for the festive woman. Featuring uncut Kundan polki stones set in sterling silver base with 22K gold plating, complemented by back meenakari work and luscious emerald-hued drop beads. An exquisite centerpiece for any festive attire.",
    highlights: [
      "Includes Choker Necklace with Adjustable Zari Dori + Matching Earrings",
      "High-grade uncut Kundan stones with hand-painted reverse Meenakari",
      "22K Micron Gold Plated with Anti-tarnish protective coating",
      "Comes in luxury cushioned velvet jewelry box",
    ],
    specs: {
      Metal: "High-Grade Brass & Silver Alloy with 22K Gold Plating",
      Stones: "Hydro Emerald Drops, Uncut Kundan Polki & Faux Pearls",
      Closure: "Adjustable Thread Tassel (Dori)",
      EarringType: "Post with Screw Back",
    },
  },
  {
    id: "jewel-chandbali-pearls",
    handle: "meenakari-festive-chandbali-earrings",
    title: "Kashmiri Meenakari Pearl Chandbali Earrings",
    brand: "Güzel Jewellery",
    category: "Festive Jewelry",
    price: 1650,
    originalPrice: 2200,
    badge: "Best Seller",
    featured: false,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription:
      "Crescent moon Chandbalis hand-enamelled in blush ruby and gold, fringed with delicate seed pearls.",
    description:
      "Statement Chandbali earrings designed to frame the face with romantic radiance. Featuring traditional crescent curves, hand-painted meenakari lacquer, and clusters of seed pearls that dance gracefully with every turn.",
    highlights: [
      "Lightweight ergonomic design for all-night comfort",
      "Hand-applied enamel work by Jaipur artisans",
      "Nickel and lead free hypoallergenic metal",
      "Signature festive gifting packaging",
    ],
    specs: {
      Length: "7.5 cm",
      Weight: "32 grams (pair)",
      Plating: "24K Yellow Gold Polish",
      Care: "Keep away from perfumes, store in airtight pouch",
    },
  },
];

export const BRAND_STORIES = [
  {
    name: "Auspicious Dry Fruits",
    role: "Imperial Nuts & Festive Gifting",
    description:
      "Founded on the principle of unadulterated purity, Auspicious Dry Fruits sources the finest Mamra almonds from Kashmir, royal cashews from Mangalore, and sun-cured figs from Afghanistan. Our festive hampers blend traditional royal hospitality with contemporary design.",
  },
  {
    name: "Sifti Creations",
    role: "Artisanal Festive Suits & Fabrics",
    description:
      "Sifti Creations brings timeless Indian textiles to life — specializing in pure Chanderi silk, Kashmiri tilla embroidery, hand-painted organza, and winter velvets designed for graceful celebrations.",
  },
  {
    name: "Güzel Jewellery",
    role: "Handcrafted Festive Accents",
    description:
      "Güzel Jewellery creates statement festive ornaments, featuring Jadau Kundan, hand-painted meenakari, and uncut polki inspired by the royal courts of Rajasthan and Kashmir.",
  },
];

export const EXHIBITION_INFO = {
  title: "The Grand Diwali Exhibition 2026",
  tagline: "A Curated Festive Experience for Connoisseurs of Taste & Elegance",
  venue: "B21, South City 1",
  city: "Gurgaon, Haryana 122001",
  dates: "Festive Season Exhibition (Daily 11:00 AM – 8:30 PM)",
  phone: "+91 98998 75665",
  whatsappNumber: "919899875665",
  highlights: [
    "Exclusive live preview of Festive Hampers & Custom Ribbon Monogramming",
    "Trial of Sifti Creations designer suit fabrics with bespoke tailor consultations",
    "Güzel Jewellery trial lounge & bridal festive styling",
    "Complimentary festive saffron kehwa & dry fruit tasting",
  ],
};
