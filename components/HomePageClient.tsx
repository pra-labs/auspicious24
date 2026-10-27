import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Hero from "./Hero";
import BrandPillars from "./BrandPillars";
import CatalogExplorer from "./CatalogExplorer";
import CollapsibleSections from "./CollapsibleSections";
import ExhibitionBanner from "./ExhibitionBanner";
import CorporateGiftingSection from "./CorporateGiftingSection";
import BrandStorySection from "./BrandStorySection";
import MobileStickyBottomBar from "./MobileStickyBottomBar";
import { Product } from "@/lib/catalog";

interface HomePageClientProps {
  products: Product[];
}

export default function HomePageClient({ products }: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] selection:bg-[#D4AF37]/30 selection:text-[#0A1F17] pb-20 sm:pb-0">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <BrandPillars />
        <CatalogExplorer products={products} />
        {/* Mobile Accordion Drawer for venue & corporate gifting info */}
        <CollapsibleSections />
        {/* Desktop Detailed Venue & Corporate Sections */}
        <div className="hidden sm:block">
          <ExhibitionBanner />
          <CorporateGiftingSection />
        </div>
        <BrandStorySection />
      </main>
      {/* Mobile Sticky Quick Navigation & Inquiry Bar */}
      <MobileStickyBottomBar />
    </div>
  );
}
