import { Metadata } from 'next';

export const siteConfig = {
  name: 'Auspicious24',
  legalName: 'Auspicious Enterprises',
  title: 'Auspicious24 • Luxury Dry Fruits, Festive Hampers & Designer Apparel',
  tagline: 'Artisanal Festive Treasures, Gourmet Dry Fruits & Heirloom Fashion',
  description:
    'Curated festive marketplace for luxury dry fruits, handcrafted silver & brass serveware hampers, designer suit fabrics by Sifti Creations, and celebratory gifting in Gurgaon & pan-India.',
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
      name: 'Auspicious Dryfruits',
      role: 'Hand-sorted Californian & Afghan harvest, walnut kernels, mamra, cashews & stuffed dates.',
    },
    {
      name: 'Sifti Creations',
      role: 'Heirloom Parsi gara, organza zari, pure crape, and bespoke bridal suit fabrics.',
    },
    {
      name: 'Güzel Fashion Jewellery',
      role: 'Kundan, polki, antique temple ornaments & festive jewellery curation.',
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
    'Güzel Jewellery',
    'Premium California Almonds Badam',
    'Afghan Anjeer Figs',
    'Mamra Badam',
    'Silver Peacock Dry Fruit Bowls',
    'Corporate Diwali Hampers Pan India',
    'Wedding Gifting Hampers',
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
