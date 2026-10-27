'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFestiveTray } from '@/context/FestiveTrayContext';
import { formatINR } from '@/lib/catalog';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function FestiveTrayDrawer() {
  const {
    items,
    isOpen,
    closeTray,
    removeItem,
    updateQuantity,
    clearTray,
    totalCount,
    totalAmount,
    generateWhatsAppUrl,
  } = useFestiveTray();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTray();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeTray]);

  if (!isOpen) return null;

  const checkoutUrl = generateWhatsAppUrl();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#0A1F17]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeTray}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#FDFBF7] text-stone-900 h-full shadow-2xl flex flex-col z-10 border-l border-[#E8DEC9] animate-in slide-in-from-right duration-300 ease-out">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#E8DEC9] flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0A1F17] flex items-center justify-center text-[#D4AF37]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-[#0A1F17]">Festive Inquiry Tray</h2>
                <span className="text-[11px] font-semibold bg-[#0A1F17] text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider">Multi-Item WhatsApp Concierge</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeTray}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-[#FAF7F2] transition-colors"
            aria-label="Close tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/40 flex items-center justify-center text-[#0F2E22]">
                <Sparkles className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-medium text-[#0A1F17]">Your Festive Tray is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Browse our artisanal hampers, royal dry fruits, or Sifti Creations designer suits and add items to order them together.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeTray();
                  const catalogEl = document.getElementById('catalog');
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2E22] hover:bg-[#1B4736] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold rounded-sm border border-[#D4AF37]/50 shadow-md transition-all"
              >
                <span>Explore Curated Treasures</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item) => {
                const lineTotal = item.price * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-lg bg-white border border-[#E8DEC9] shadow-2xs hover:border-[#D4AF37]/50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 shrink-0 rounded-md overflow-hidden bg-[#FAF7F2] border border-[#E8DEC9]/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.productHandle}`}
                            onClick={closeTray}
                            className="font-serif text-xs sm:text-sm font-semibold text-stone-900 hover:text-[#0F2E22] line-clamp-2 leading-tight"
                          >
                            {item.title}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 p-1 transition-colors shrink-0"
                            title="Remove item"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                          <span className="text-stone-500 font-medium px-1.5 py-0.5 rounded bg-stone-100">
                            {item.brand}
                          </span>
                          {item.variantTitle && (
                            <span className="text-[#0F2E22] font-semibold px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-[#E8DEC9]">
                              {item.variantTitle}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-stone-200 rounded-sm bg-[#FAF7F2]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-stone-800 select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-serif text-sm font-bold text-[#0F2E22]">
                            {formatINR(lineTotal)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-stone-400">
                              {formatINR(item.price)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={clearTray}
                  className="text-[11px] text-stone-500 hover:text-rose-700 underline underline-offset-2 transition-colors font-medium"
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8DEC9] bg-white/95 backdrop-blur-md space-y-3.5 shadow-lg">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Total Items</span>
                <span className="font-semibold text-stone-900">{totalCount}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                <span className="font-serif text-base font-semibold text-[#0A1F17]">Estimated Total</span>
                <span className="font-serif text-xl font-bold text-[#0F2E22]">
                  {formatINR(totalAmount)}
                </span>
              </div>
            </div>

            {/* Delivery & Reassurance Pill */}
            <div className="flex items-center gap-2 p-2.5 rounded bg-[#FAF7F2] border border-[#E8DEC9] text-[11px] text-stone-600">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Express Same-Day Gurgaon Delivery • Pan-India Courier</span>
            </div>

            {/* Big WhatsApp Checkout Button */}
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 text-center group"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>
                Checkout on WhatsApp ({totalCount} {totalCount === 1 ? 'item' : 'items'} • {formatINR(totalAmount)})
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F2E22]" />
              <span>Direct concierge check • Instant price confirmation • No advance payment lock</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
