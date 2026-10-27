import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Hero from "./Hero";
import BrandPillars from "./BrandPillars";
import CatalogExplorer from "./CatalogExplorer";
import ExhibitionBanner from "./ExhibitionBanner";
import CorporateGiftingSection from "./CorporateGiftingSection";
import BrandStorySection from "./BrandStorySection";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Footer from "./Footer";
import { Product } from "@/lib/catalog";

interface HomePageClientProps {
  products: Product[];
}

export default function HomePageClient({ products }: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] selection:bg-[#D4AF37]/30 selection:text-[#0A1F17]">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <BrandPillars />
        <CatalogExplorer products={products} />
        <ExhibitionBanner />
        <CorporateGiftingSection />
        <BrandStorySection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
