"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExhibitionBanner from "@/components/ExhibitionBanner";
import CatalogExplorer from "@/components/CatalogExplorer";
import CorporateGiftingSection from "@/components/CorporateGiftingSection";
import BrandStorySection from "@/components/BrandStorySection";
import { Product } from "@/lib/catalog";

interface HomePageClientProps {
  products: Product[];
}

export default function HomePageClient({ products }: HomePageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const catalogElement = document.getElementById("catalog");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term.trim().length > 0) {
      const catalogElement = document.getElementById("catalog");
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Header
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onSelectCategory={handleSelectCategory}
        onSearchChange={handleSearchChange}
      />
      <Hero />
      <ExhibitionBanner />
      <CatalogExplorer
        key={`${selectedCategory}-${searchTerm}`}
        initialProducts={products}
        initialCategory={selectedCategory}
      />
      <CorporateGiftingSection />
      <BrandStorySection />
    </>
  );
}
