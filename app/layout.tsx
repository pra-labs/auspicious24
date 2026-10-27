import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auspicious24.com"),
  title: "Auspicious24 • Luxury Dry Fruits, Festive Hampers & Designer Apparel",
  description:
    "Curated festive gifting by Auspicious24: Imperial dry fruits, royal hampers, Sifti Creations designer suits & fabrics, and Güzel Jewellery. Direct WhatsApp ordering & Gurgaon exhibition.",
  keywords: [
    "Auspicious24",
    "Diwali hampers Gurgaon",
    "Luxury dry fruits",
    "Sifti Creations",
    "Designer festive suits",
    "Kashmiri Mamra almonds",
    "Festive gifting South City 1",
  ],
  authors: [{ name: "Auspicious24 & PraLabs" }],
  openGraph: {
    title: "Auspicious24 • Luxury Dry Fruits, Festive Hampers & Designer Apparel",
    description:
      "Curated festive gifting by Auspicious24: Imperial dry fruits, royal hampers, Sifti Creations designer suits, and Güzel Jewellery.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-cream-50 text-stone-900 font-sans antialiased min-h-screen flex flex-col justify-between">
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
