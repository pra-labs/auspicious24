'use client';

import { useState, useEffect } from 'react';
import { Compass, Search, ShoppingBag, MessageCircle } from 'lucide-react';
import { useFestiveTray } from '@/context/FestiveTrayContext';
import { getWhatsAppInquiryUrl } from '@/lib/whatsapp';

export default function MobileStickyBottomBar() {
  const [showBar, setShowBar] = useState(false);
  const { totalCount, openTray } = useFestiveTray();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger once user scrolls past 300px
      if (window.scrollY > 300) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBar) return null;

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchFocus = () => {
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        searchInput.focus();
      }, 350);
    } else {
      scrollToCatalog();
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DEC9] py-1.5 px-3 shadow-2xl animate-in slide-in-from-bottom-2 duration-200"
    >
      <div className="grid grid-cols-4 items-center gap-1 max-w-md mx-auto">
        {/* 1. Browse / Home */}
        <button
          type="button"
          onClick={scrollToCatalog}
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-lg text-stone-700 hover:text-[#0A1F17] active:bg-stone-100 min-h-[48px] transition-colors"
          aria-label="Browse Catalog"
        >
          <Compass className="w-5 h-5 text-[#0A1F17]" />
          <span className="text-[10px] font-semibold tracking-tight">Browse</span>
        </button>

        {/* 2. Search */}
        <button
          type="button"
          onClick={handleSearchFocus}
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-lg text-stone-700 hover:text-[#0A1F17] active:bg-stone-100 min-h-[48px] transition-colors"
          aria-label="Search Catalog"
        >
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-semibold tracking-tight">Search</span>
        </button>

        {/* 3. View Tray (count) */}
        <button
          type="button"
          onClick={openTray}
          className="relative flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-lg text-stone-700 hover:text-[#0A1F17] active:bg-stone-100 min-h-[48px] transition-colors"
          aria-label={`View Festive Tray with ${totalCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#0F2E22]" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-[#0A1F17] text-[9px] font-extrabold shadow-2xs animate-in zoom-in-75">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">
            {totalCount > 0 ? `Tray (${totalCount})` : 'Tray'}
          </span>
        </button>

        {/* 4. WhatsApp Chat */}
        <a
          href={getWhatsAppInquiryUrl('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-lg text-white bg-[#25D366] hover:bg-[#20BA5A] active:scale-95 min-h-[48px] shadow-xs transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white shrink-0" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
