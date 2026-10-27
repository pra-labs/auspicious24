import { Metadata } from 'next';
import { Product } from '@/data/products';

export const siteConfig = {
  name: 'Auspicious24',
  legalName: 'Auspicious Enterprises',
  title: 'Auspicious24 • Luxury Dry Fruits, Festive Hampers, Designer Apparel & Fine Jewellery',
  tagline: 'Artisanal Festive Treasures, Gourmet Dry Fruits, Heirloom Fashion & Royal Jewellery',
  description:
    'Curated festive marketplace for luxury dry fruits, handcrafted silver & brass serveware hampers, designer suit fabrics by Sifti Creations, and royal Kundan & temple jewellery by Güzel in Gurgaon & pan-India.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://auspicious24.vercel.app',
  ogImage: 'https://auspicious24.vercel.app/images/og-cover.jpg',
  contact: {
    phone: '9899875665',
    phoneDisplay: '+91 98998 75665',
    email: 'contact@auspicious24.com',
    venue: 'B21, South City 1, Gurgaon, Haryana 122001',
    hours: '11:00 AM – 9:00 PM IST',
    whatsappUrl:
      'https://wa.me/919899875665?text=Hello%20Auspicious24%2C%20I%20am%20exploring%20your%20festive%20collection.',
  },
  brands: [
    {
      name: 'Auspicious Dry Fruits',
      role: 'Hand-sorted Californian & Afghan harvest, walnut kernels, mamra, cashews & stuffed medjool dates.',
    },
    {
      name: 'Sifti Creations',
      role: 'Heirloom Parsi gara, organza zari, pure crepe, and bespoke bridal suit fabrics.',
    },
    {
      name: 'Güzel Jewellery',
      role: 'Artisanal Kundan, uncut Polki, antique 22K temple ornaments & Rajasthani meenakari bangles.',
    },
    {
      name: 'Auspicious Enterprises',
      role: 'Curated corporate gifting, silver & brass serveware centerpieces, and exhibition host.',
    },
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Auspicious24',
    'Auspicious Enterprises',
    'Diwali Gifting Gurgaon',
    'Luxury Dry Fruit Hampers',
    'South City 1 Gurgaon Exhibition',
    'Sifti Creations Designer Suits',
    'Parsi Work on Steel Grey Suit',
    'Parsi Work Suits Gurgaon',
    'Güzel Jewellery',
    'Güzel Jewellery Gurgaon',
    'Royal Kundan & Polki Choker Set',
    'Heritage Temple Gold Finish Bridal Necklace',
    'Handcrafted Meenakari Bangles',
    'Premium California Almonds Badam',
    'Afghan Anjeer Figs',
    'Mamra Badam',
    'Luxury Silver Peacock Serving Bowl',
    'Corporate Diwali Hampers Pan India',
    'Wedding Gifting Hampers Gurgaon',
    'Diwali Shopping Exhibition 2026',
  ],
  authors: [{ name: 'Auspicious Enterprises' }, { name: 'PraLabs' }],
  creator: 'PraLabs',
  publisher: 'Auspicious Enterprises',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Auspicious24 Luxury Festive Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

/**
 * Generates Schema.org JSON-LD structured data for a product
 */
export function generateProductJsonLd(product: Product) {
  const images = product.images.map((img) =>
    img.startsWith('http') ? img : `${siteConfig.url}${img}`
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: images.length > 0 ? images : [`${siteConfig.url}/images/og-cover.jpg`],
    description: product.description,
    sku: String(product.id),
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/product/${product.handle}`,
      priceCurrency: product.currency || 'INR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };
}
