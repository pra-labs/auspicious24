'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, MapPin, ShoppingBag, ChevronDown } from 'lucide-react';
import { useFestiveTray } from '@/context/FestiveTrayContext';

interface NavItem {
  label: string;
  category?: string;
  brand?: string;
  href: string;
  targetId?: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalCount, openTray } = useFestiveTray();

  const collectionLinks: NavItem[] = [
    { label: 'All Treasures', category: 'All', brand: 'All', targetId: 'catalog', href: '/#catalog' },
    { label: 'Luxe Hampers', category: 'Festive Hampers & Serveware', brand: 'All', targetId: 'catalog', href: '/#catalog' },
    { label: 'Gourmet Dry Fruits', category: 'Premium Dry Fruits', brand: 'All', targetId: 'catalog', href: '/#catalog' },
    { label: 'Sifti Creations Suits', category: 'Ladies Suits & Ethnic Wear', brand: 'Sifti Creations', targetId: 'catalog', href: '/#catalog' },
    { label: 'Festive Jewellery', category: 'Festive Jewellery', brand: 'Güzel Jewellery', targetId: 'catalog', href: '/#catalog' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.category || item.brand) {
      if (typeof window !== 'undefined') {
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
        if (isHomePage) {
          e.preventDefault();
          window.dispatchEvent(
            new CustomEvent('catalog-filter', {
              detail: {
                category: item.category,
                brand: item.brand,
              },
            })
          );
          const target = document.getElementById(item.targetId || 'catalog');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          const hashParam = item.brand && item.brand !== 'All'
            ? `#catalog?brand=${encodeURIComponent(item.brand)}`
            : item.category && item.category !== 'All'
            ? `#catalog?category=${encodeURIComponent(item.category)}`
            : '#catalog';
          window.history.pushState(null, '', hashParam);
        }
      }
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8DEC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-800 hover:text-[#0F2E22] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Monogram */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0A1F17] flex items-center justify-center border border-[#D4AF37]/50 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-2xl font-bold tracking-tight text-[#0A1F17] group-hover:text-[#0F2E22] transition-colors leading-tight">
                  AUSPICIOUS<span className="text-[#D4AF37]">24</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#6E655F] font-medium">
                  Luxury Marketplace
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Consolidated Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {/* Collections Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-medium text-stone-700 hover:text-[#0F2E22] transition-colors py-2 focus:outline-hidden"
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#0F2E22]' : ''
                  }`}
                />
              </button>

              {/* Collections Dropdown Menu */}
              <div
                className={`absolute left-0 top-full pt-1.5 w-64 z-50 transition-all duration-200 ${
                  dropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible pointer-events-none -translate-y-1'
                }`}
              >
                <div className="bg-[#FDFBF7] border border-[#E8DEC9] rounded-lg shadow-xl py-2 px-1.5 backdrop-blur-md">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#855F1B] border-b border-[#E8DEC9]/50 mb-1">
                    Curated Categories
                  </div>
                  {collectionLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-700 hover:text-[#0A1F17] hover:bg-[#FAF7F2] rounded-md transition-colors group cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Top-Level Links */}
            <a
              href="/#exhibition"
              onClick={(e) =>
                handleNavClick(e, {
                  label: 'Diwali Exhibition',
                  targetId: 'exhibition',
                  href: '/#exhibition',
                })
              }
              className="text-xs uppercase tracking-[0.15em] font-medium text-stone-700 hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors cursor-pointer"
            >
              Diwali Exhibition
            </a>

            <a
              href="/#corporate"
              onClick={(e) =>
                handleNavClick(e, {
                  label: 'Corporate Gifting',
                  targetId: 'corporate',
                  href: '/#corporate',
                })
              }
              className="text-xs uppercase tracking-[0.15em] font-medium text-stone-700 hover:text-[#0F2E22] hover:underline underline-offset-8 transition-colors cursor-pointer"
            >
              Corporate Gifting
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Exhibition venue quick pill on desktop */}
            <div className="hidden 2xl:flex items-center gap-1.5 text-[11px] text-stone-600 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#E8DEC9]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>South City 1, Gurgaon</span>
            </div>

            {/* Festive Inquiry Tray Trigger Button */}
            <button
              type="button"
              onClick={openTray}
              className="relative p-2 rounded-full text-stone-700 hover:text-[#0F2E22] hover:bg-[#FAF7F2] border border-transparent hover:border-[#E8DEC9] transition-all flex items-center gap-1.5 min-h-[44px] min-w-[44px] justify-center"
              aria-label={`View Festive Tray with ${totalCount} items`}
              title="View Festive Tray"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#0F2E22]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0A1F17] text-[#D4AF37] border border-[#D4AF37]/50 text-[9px] font-extrabold flex items-center justify-center animate-in zoom-in">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-stone-700">Tray</span>
            </button>

            {/* Desktop-only WhatsApp hotline button */}
            <a
              href="https://wa.me/919899875665?text=Hello%20Auspicious24,%20I%20would%20like%20to%20inquire%20about%20your%20festive%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 bg-[#0F2E22] hover:bg-[#1B4736] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold rounded-sm border border-[#D4AF37]/50 shadow-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
              <span>+91 98998 75665</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC9] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <div className="px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#855F1B]">
              Collections
            </div>
            {collectionLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="block px-3 py-2 text-xs uppercase tracking-wider font-semibold text-stone-800 hover:bg-[#FAF7F2] hover:text-[#0F2E22] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 pb-1 border-t border-[#E8DEC9]/50 mt-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#855F1B]">
              Experiences
            </div>
            <a
              href="/#exhibition"
              onClick={(e) =>
                handleNavClick(e, {
                  label: 'Diwali Exhibition',
                  targetId: 'exhibition',
                  href: '/#exhibition',
                })
              }
              className="block px-3 py-2 text-xs uppercase tracking-wider font-semibold text-stone-800 hover:bg-[#FAF7F2] hover:text-[#0F2E22] rounded-md transition-colors"
            >
              Diwali Exhibition
            </a>
            <a
              href="/#corporate"
              onClick={(e) =>
                handleNavClick(e, {
                  label: 'Corporate Gifting',
                  targetId: 'corporate',
                  href: '/#corporate',
                })
              }
              className="block px-3 py-2 text-xs uppercase tracking-wider font-semibold text-stone-800 hover:bg-[#FAF7F2] hover:text-[#0F2E22] rounded-md transition-colors"
            >
              Corporate Gifting
            </a>
          </div>

          <div className="pt-3 border-t border-[#E8DEC9] space-y-2.5">
            {/* Mobile Tray Quick Action */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTray();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md bg-[#FAF7F2] border border-[#E8DEC9] text-xs font-bold text-[#0F2E22]"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>View Festive Tray</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#0F2E22] text-[#D4AF37] text-[10px]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </button>

            {/* Mobile WhatsApp Quick Call in Menu */}
            <a
              href="https://wa.me/919899875665?text=Hello%20Auspicious24,%20I%20would%20like%20to%20inquire%20about%20your%20festive%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-[#0F2E22] text-[#D4AF37] text-xs font-bold uppercase tracking-wider"
            >
              <span>Chat with Concierge (+91 98998 75665)</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-stone-600 px-1 pt-1">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>B21, South City 1, Gurgaon • 11 AM – 9 PM</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
