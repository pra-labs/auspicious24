'use client';

import React from 'react';
import { useFestiveTray } from '@/context/FestiveTrayContext';
import { formatINR } from '@/lib/catalog';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function FloatingFestiveTrayBadge() {
  const { totalCount, totalAmount, openTray } = useFestiveTray();

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={openTray}
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#0A1F17] hover:bg-[#0F2E22] text-[#FAF7F2] rounded-full border border-[#D4AF37]/70 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]"
        aria-label={`View Festive Tray with ${totalCount} items`}
      >
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center text-[#D4AF37]">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#0A1F17] text-[10px] font-extrabold flex items-center justify-center shadow-xs">
            {totalCount}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#D4AF37] flex items-center gap-1">
            <span>Festive Tray</span>
            <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
          </span>
          <span className="text-xs font-semibold text-white">
            {formatINR(totalAmount)}
          </span>
        </div>
      </button>
    </div>
  );
}
