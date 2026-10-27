'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, ChevronUp } from 'lucide-react';
import { useFestiveTray } from '@/context/FestiveTrayContext';
import { getWhatsAppInquiryUrl } from '@/lib/whatsapp';

export default function MobileStickyBottomBar() {
  const [showBar, setShowBar] = useState(false);
  const { totalCount, openTray } = useFestiveTray();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger once user scrolls past 350px (past hero)
      if (window.scrollY > 350) {
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

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8DEC9] py-2 px-3 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Quick Catalog Anchor */}
        <button
          type="button"
          onClick={scrollToCatalog}
          className="flex-1 py-2.5 px-3 rounded-lg bg-white border border-[#E8DEC9] text-[#0A1F17] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs min-h-[44px] active:bg-stone-50"
        >
          <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Browse Catalog</span>
        </button>

        {/* Festive Tray Trigger with Count */}
        <button
          type="button"
          onClick={openTray}
          className="relative py-2.5 px-3 rounded-lg bg-[#0A1F17] text-[#FAF7F2] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs min-h-[44px] active:bg-[#0F2E22]"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Tray</span>
          {totalCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-[#0A1F17] text-[10px] font-extrabold">
              {totalCount}
            </span>
          )}
        </button>

        {/* Instant WhatsApp Inquiry Button */}
        <a
          href={getWhatsAppInquiryUrl('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3.5 rounded-lg bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs min-h-[44px] active:bg-[#20BA5A]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
          <span>Inquire</span>
        </a>
      </div>
    </div>
  );
}
