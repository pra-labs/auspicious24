"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Menu,
  X,
  Search,
  Sparkles,
  MapPin,
  Phone,
  Gift,
  ShoppingBag,
} from "lucide-react";
import { FORMATTED_PHONE_NUMBER, getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { CATEGORIES } from "@/data/products";

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
  selectedCategory?: string;
}

export default function Header({
  onSelectCategory,
  onSearchChange,
  searchTerm = "",
  selectedCategory = "All",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-gold-200/50 shadow-sm transition-all">
      {/* Top Festive Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-gold-200 text-xs py-2 px-4 border-b border-gold-500/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-block animate-pulse text-gold-300">🪔</span>
            <span className="font-medium tracking-wide">
              Festive Season Gifting &amp; Exhibition at{" "}
              <strong className="text-gold-300">B21, South City 1, Gurgaon</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gold-300/90 font-medium">
            <a
              href="tel:+919899875665"
              className="hover:text-gold-100 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>+91 98998 75665</span>
            </a>
            <span className="text-gold-500/40">•</span>
            <a
              href={getWhatsAppInquiryUrl("corporate")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-100 flex items-center gap-1 transition-colors text-gold-300"
            >
              <Gift className="w-3 h-3 text-gold-400" />
              <span>Corporate / Bulk Orders</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-900 via-emerald-850 to-emerald-950 border border-gold-400/80 flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <span className="text-gold-300 text-lg font-serif font-bold tracking-tighter">
                A
              </span>
              <span className="text-gold-400 text-xs font-serif font-semibold">24</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
                Auspicious<span className="text-gold-600">24</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-500 font-medium -mt-1">
                Luxury Festive Catalog
              </span>
            </div>
          </Link>

          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-emerald-900 text-gold-300 shadow-sm border border-gold-400/40"
                      : "text-stone-700 hover:text-emerald-900 hover:bg-gold-100/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & WhatsApp Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input (Desktop) */}
            <div className="hidden md:flex items-center relative">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search dry fruits, suits, hampers..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-xs bg-stone-100/80 focus:bg-white border border-stone-200 focus:border-gold-400 rounded-full w-56 xl:w-64 focus:outline-none transition-all placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 md:hidden text-stone-600 hover:text-emerald-900 rounded-full hover:bg-gold-100/50"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Exhibition Link */}
            <a
              href="#exhibition"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-emerald-900 px-3 py-1.5 rounded-full hover:bg-gold-100/50 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span>Exhibition</span>
            </a>

            {/* Direct WhatsApp Order CTA */}
            <a
              href={getWhatsAppInquiryUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">WhatsApp Order</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-stone-700 hover:text-emerald-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="py-2 pb-3 md:hidden border-t border-stone-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search products, fabrics, nuts, hampers..."
                value={searchTerm}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 focus:bg-white border border-stone-200 focus:border-gold-400 rounded-lg focus:outline-none placeholder:text-stone-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 border-b border-gold-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            <p className="text-[11px] uppercase font-bold tracking-wider text-stone-400 px-3 py-1">
              Categories
            </p>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-900 text-gold-300 font-semibold"
                      : "text-stone-800 hover:bg-gold-100/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            <div className="pt-4 border-t border-stone-200/60 mt-2 space-y-2">
              <a
                href="#exhibition"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:text-emerald-900"
              >
                <MapPin className="w-4 h-4 text-gold-600" />
                <span>Diwali Exhibition (B21, South City 1, Gurgaon)</span>
              </a>

              <a
                href={getWhatsAppInquiryUrl("corporate")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-900 font-medium"
              >
                <Gift className="w-4 h-4 text-emerald-700" />
                <span>Corporate &amp; Bulk Gifting Inquiries</span>
              </a>

              <a
                href={`https://wa.me/919899875665`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg text-sm font-bold shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+91 98998 75665)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
