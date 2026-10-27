"use client";

import React, { useState, useMemo } from "react";
import { Product, CATEGORIES, Category } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles, Filter } from "lucide-react";

interface CatalogExplorerProps {
  initialProducts?: Product[];
  products?: Product[];
  initialCategory?: string;
}

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
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const brands = useMemo(() => {
    const list = Array.from(new Set(allProducts.map((p) => p.brand)));
    return ["All", ...list];
  }, [allProducts]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "All" && p.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrand !== "All" && p.brand !== selectedBrand) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = (p.description || '').toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchBrand && !matchCat) {
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
        // Default
        return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedBrand !== "All" ? 1 : 0) +
    (searchQuery.trim().length > 0 ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <section id="catalog" className="py-16 bg-cream-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gold-200/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Full Festive Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 tracking-tight">
              Curated Festive Treasures
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Select any item to order instantly via WhatsApp with pre-filled message, variant choice, and guaranteed availability check.
            </p>
          </div>

          <div className="text-xs font-medium text-stone-500 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm w-fit">
            Showing <strong className="text-emerald-950">{filteredProducts.length}</strong> creations
          </div>
        </div>

        {/* Filter Bar: Category Tabs + Search + Sort */}
        <div className="space-y-4">
          {/* Category Tabs (Desktop & Mobile horizontal scroll) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-950 text-gold-300 shadow-md border border-gold-400/50 scale-[1.02]"
                      : "bg-white text-stone-700 hover:text-emerald-950 hover:bg-gold-50 border border-stone-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Search, Brand Filter & Sorting */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by name, fabric, or nut..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 focus:border-gold-400 rounded-xl focus:outline-none focus:bg-white transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter by Brand Pills & Sort Dropdown */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 w-full md:w-auto">
              {/* Brand Selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <span className="hidden sm:inline font-medium text-stone-400">Brand:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-gold-400"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All Brands (Sifti, Auspicious, Güzel)" : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-gold-400"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="bestseller">Best Sellers First</option>
                </select>
              </div>

              {/* Reset active filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-festive-ruby hover:underline flex items-center gap-1 font-semibold px-2 py-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">
              No matching items found
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              We couldn't find any products matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try searching for something else or clearing filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-emerald-950 text-gold-300 text-xs font-bold tracking-wide hover:bg-emerald-900 transition-colors shadow-sm"
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
