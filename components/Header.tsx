'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MessageCircle, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/seo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'All Treasures', href: '#catalog' },
    { label: 'Luxe Hampers', href: '#catalog' },
    { label: 'Gourmet Dry Fruits', href: '#catalog' },
    { label: 'Sifti Creations Suits', href: '#catalog' },
    { label: 'Diwali Exhibition', href: '#exhibition' },
    { label: 'Corporate Gifting', href: '#corporate' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DEC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-[#0F2E22] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Monogram */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A1F17] flex items-center justify-center border border-[#D4AF37]/50 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#0A1F17] group-hover:text-[#0F2E22] transition-colors">
                  AUSPICIOUS<span className="text-[#D4AF37]">24</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#6E655F] -mt-1 font-medium">
                  Luxury Marketplace
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.15em] font-medium text-stone-700 hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Exhibition venue quick pill on desktop */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-stone-600 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#E8DEC9]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>South City 1, Gurgaon</span>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href={`https://wa.me/919899875665?text=Hello%20Auspicious24,%20I%20would%20like%20to%20inquire%20about%20your%20festive%20collection.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#0F2E22] hover:bg-[#1B4736] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold rounded-sm border border-[#D4AF37]/50 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
              <span className="hidden sm:inline">+91 98998 75665</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC9] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm uppercase tracking-wider font-medium text-stone-800 hover:bg-[#FAF7F2] hover:text-[#0F2E22] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8DEC9] space-y-2">
            <div className="flex items-center gap-2 text-xs text-stone-600 px-3">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>B21, South City 1, Gurgaon (11 AM – 9 PM)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
