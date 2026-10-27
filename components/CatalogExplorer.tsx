"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, CATEGORIES, formatINR } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { Search, ArrowUpDown, X, Sparkles, Filter, ChevronDown, Check, Eye } from "lucide-react";

interface CatalogExplorerProps {
  initialProducts?: Product[];
  products?: Product[];
  initialCategory?: string;
}

const PAGE_SIZE = 16;

export default function CatalogExplorer({
  initialProducts,
  products: propProducts,
  initialCategory = "All",
}: CatalogExplorerProps) {
  const allProducts = propProducts || initialProducts || [];
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "bestseller">("featured");
  const [quickPill, setQuickPill] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with window custom event (triggered by header nav links, hero collage, etc.)
  useEffect(() => {
    const handleCustomFilter = (e: any) => {
      const { category, brand } = e.detail || {};
      if (category !== undefined) {
        setSelectedCategory(category);
      }
      if (brand !== undefined) {
        setSelectedBrand(brand);
      }
      setQuickPill("all");
      setVisibleCount(PAGE_SIZE);
    };

    window.addEventListener("catalog-filter", handleCustomFilter);
    return () => window.removeEventListener("catalog-filter", handleCustomFilter);
  }, []);

  // Sync with URL hash / params on initial load and hashchange
  useEffect(() => {
    if (typeof window === "undefined") return;

    const parseHashOrSearch = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const combined = `${hash}&${search}`;

      if (combined.includes("category=") || combined.includes("cat=")) {
        const match = combined.match(/(?:category|cat)=([^&]+)/);
        if (match) {
          const cat = decodeURIComponent(match[1]);
          if (CATEGORIES.includes(cat as any) || cat === "All") {
            setSelectedCategory(cat);
          }
        }
      }

      if (combined.includes("brand=")) {
        const match = combined.match(/brand=([^&]+)/);
        if (match) {
          const b = decodeURIComponent(match[1]);
          setSelectedBrand(b);
        }
      }
    };

    parseHashOrSearch();
    window.addEventListener("hashchange", parseHashOrSearch);
    return () => window.removeEventListener("hashchange", parseHashOrSearch);
  }, []);

  // Guarantee all authentic exhibition brands are always present and selectable
  const brandList = useMemo(() => {
    const list = Array.from(new Set(allProducts.map((p) => p.brand).filter(Boolean)));
    const core = ["Auspicious Dry Fruits", "Sifti Creations", "Güzel Jewellery"];
    const merged = Array.from(new Set([...core, ...list]));
    return ["All", ...merged];
  }, [allProducts]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "All") {
          if (selectedCategory === "Festive Jewellery") {
            if (p.category !== "Festive Jewellery" && p.brand !== "Güzel Jewellery") {
              return false;
            }
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

        // Brand filter
        if (selectedBrand !== "All" && p.brand !== selectedBrand) {
          return false;
        }

        // Quick curated pills
        if (quickPill === "bestseller" && p.badge !== "Best Seller") {
          return false;
        }
        if (quickPill === "under1500" && p.price > 1500) {
          return false;
        }
        if (quickPill === "suits" && p.brand !== "Sifti Creations") {
          return false;
        }
        if (quickPill === "decor" && p.brand !== "Güzel Jewellery") {
          return false;
        }
        if (quickPill === "dryfruits" && p.category !== "Premium Dry Fruits") {
          return false;
        }
        if (quickPill === "hampers" && p.category !== "Festive Hampers & Serveware") {
          return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = (p.description || "").toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchBrand && !matchCat && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.price - b.price;
        }
        if (sortBy === "price-desc") {
          return b.price - a.price;
        }
        if (sortBy === "bestseller") {
          const aRank = a.badge === "Best Seller" ? 2 : a.badge === "Festive Special" ? 1 : 0;
          const bRank = b.badge === "Best Seller" ? 2 : b.badge === "Festive Special" ? 1 : 0;
          return bRank - aRank;
        }
        // Default: featured
        return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
      });
  }, [allProducts, selectedCategory, selectedBrand, quickPill, searchQuery, sortBy]);

  // Reset pagination when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleBrandChange = (b: string) => {
    setSelectedBrand(b);
    setVisibleCount(PAGE_SIZE);
  };

  const handleQuickPillChange = (pill: string) => {
    setQuickPill(pill);
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setQuickPill("all");
    setSearchQuery("");
    setSortBy("featured");
    setVisibleCount(PAGE_SIZE);
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedBrand !== "All" ? 1 : 0) +
    (quickPill !== "all" ? 1 : 0) +
    (searchQuery.trim().length > 0 ? 1 : 0);

  // Visible sliced products for mobile scroll relief
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredProducts.length - visibleCount);

  // 4 Featured Spotlight highlights (displayed when viewing All and no search)
  const spotlightProducts = useMemo(() => {
    if (selectedCategory !== "All" || selectedBrand !== "All" || searchQuery.trim()) {
      return [];
    }
    const suit = allProducts.find((p) => p.brand === "Sifti Creations" && p.featured_image);
    const hamper = allProducts.find(
      (p) => p.category === "Festive Hampers & Serveware" && p.brand === "Auspicious Dry Fruits"
    );
    const decor = allProducts.find((p) => p.brand === "Güzel Jewellery" && p.featured_image);
    const nuts = allProducts.find(
      (p) => p.category === "Premium Dry Fruits" && p.badge === "Festive Special"
    );
    return [hamper, suit, decor, nuts].filter(Boolean) as Product[];
  }, [allProducts, selectedCategory, selectedBrand, searchQuery]);

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8DEC9] pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] text-[#0A1F17] text-xs font-bold uppercase tracking-wider border border-[#E8DEC9]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Full Festive Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1F17] tracking-tight">
              Curated Festive Treasures
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
              Select items to order individually on WhatsApp or add them to your multi-item Festive Tray for a single consolidated checkout.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs font-medium text-stone-600 bg-white px-3.5 py-1.5 rounded-full border border-[#E8DEC9] shadow-2xs">
              Showing <strong className="text-[#0F2E22]">{filteredProducts.length}</strong> creations
            </div>
          </div>
        </div>

        {/* Curated Spotlight Row (Only shown when browsing All to inspire discovery) */}
        {spotlightProducts.length > 0 && (
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]/80">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0A1F17] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Editorial Spotlights</span>
              </span>
              <span className="text-[11px] text-stone-500">Standout pieces from our exhibition collections</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {spotlightProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setQuickViewProduct(p)}
                  className="group cursor-pointer rounded-lg overflow-hidden bg-white border border-[#E8DEC9] hover:border-[#D4AF37] hover:shadow-md transition-all p-2.5 flex items-center gap-3"
                >
                  <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-stone-100">
                    <Image
                      src={p.featured_image || "/images/placeholder.jpg"}
                      alt={p.title}
                      fill
                      sizes="60px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold truncate">
                      {p.brand}
                    </div>
                    <div className="font-serif text-xs font-medium text-stone-900 truncate group-hover:text-[#0F2E22] transition-colors">
                      {p.title}
                    </div>
                    <div className="font-serif text-xs font-bold text-[#0F2E22]">
                      {formatINR(p.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Filter & Category Bar on Scroll */}
        <div className="sticky top-16 sm:top-20 z-30 bg-[#FDFBF7]/95 backdrop-blur-md py-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-y border-[#E8DEC9]/80 shadow-2xs space-y-3">
          {/* Primary Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#0A1F17] text-[#D4AF37] shadow-md border border-[#D4AF37]/50 scale-[1.02]"
                      : "bg-white text-stone-700 hover:text-[#0A1F17] hover:bg-[#FAF7F2] border border-[#E8DEC9]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick-Filter Pills & Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Quick Pills (Desktop & Mobile horizontal scroll) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold shrink-0 hidden sm:inline">
                Quick:
              </span>
              {[
                { id: "all", label: "All Items" },
                { id: "bestseller", label: "⭐ Best Sellers" },
                { id: "under1500", label: "🎁 Under ₹1,500" },
                { id: "suits", label: "👑 Sifti Suits" },
                { id: "decor", label: "🏺 Ornate Decor" },
                { id: "hampers", label: "✨ Hampers" },
                { id: "dryfruits", label: "🥜 Dry Fruits" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => handleQuickPillChange(pill.id)}
                  className={`text-[11px] px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                    quickPill === pill.id
                      ? "bg-[#0F2E22] text-[#FAF7F2] font-semibold shadow-xs"
                      : "bg-white/90 text-stone-600 hover:text-stone-900 border border-[#E8DEC9]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Right: Search, Brand Filter & Sorting Controls */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 sm:w-56 md:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search fabric, nuts, boxes..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-[#E8DEC9] focus:border-[#D4AF37] rounded-lg focus:outline-none transition-all placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Brand Selector Dropdown */}
              <div className="flex items-center gap-1 text-xs text-stone-600">
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="bg-white border border-[#E8DEC9] rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:border-[#D4AF37]"
                >
                  {brandList.map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All Brands (Sifti, Auspicious, Güzel)" : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 text-xs text-stone-600">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#E8DEC9] rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="featured">Featured First</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Reset active filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-700 hover:underline flex items-center gap-1 font-semibold px-2 py-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {visibleProducts.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>

            {/* Load More & Pagination Bar (Scroll Relief) */}
            {remainingCount > 0 && (
              <div className="pt-4 pb-2 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0A1F17] hover:bg-[#0F2E22] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold rounded-sm border border-[#D4AF37]/50 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Show More Treasures ({remainingCount} remaining)</span>
                  <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredProducts.length)}
                  className="text-xs text-stone-600 hover:text-[#0A1F17] underline underline-offset-4 py-2 px-3 font-medium transition-colors"
                >
                  View All ({filteredProducts.length})
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#0A1F17] flex items-center justify-center mx-auto text-2xl border border-[#E8DEC9]">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">
              No matching items found
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              We couldn&apos;t find any products matching your current filters in {selectedCategory}. Try clearing filters or searching with a different keyword.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#0A1F17] text-[#D4AF37] text-xs font-bold tracking-wide hover:bg-[#0F2E22] transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
