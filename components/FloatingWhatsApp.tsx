"use client";

import React, { useState } from "react";
import { MessageCircle, X, Gift, MapPin, Sparkles, Building2, ChevronRight } from "lucide-react";
import { getWhatsAppInquiryUrl, FORMATTED_PHONE_NUMBER } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-76 sm:w-80 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D4AF37]/60 overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A1F17] via-[#0F2E22] to-[#0A1F17] p-3.5 sm:p-4 text-white flex items-center justify-between border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#D4AF37]">
                  Auspicious24 Concierge
                </h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-emerald-800 transition-colors"
              aria-label="Close WhatsApp menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Options */}
          <div className="p-2.5 sm:p-3 bg-[#FAF7F2] space-y-1 sm:space-y-1.5 text-xs">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 px-2 py-0.5 tracking-wider">
              How can we assist you today?
            </p>

            <a
              href={getWhatsAppInquiryUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-[#D4AF37] text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-[#0F2E22]" />
                <span className="font-medium text-xs">Order Festive Gift Hampers</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={getWhatsAppInquiryUrl("bespoke")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-[#D4AF37] text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0F2E22]" />
                <span className="font-medium text-xs">Sifti Creations Suits &amp; Fabrics</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={getWhatsAppInquiryUrl("exhibition")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-[#D4AF37] text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0F2E22]" />
                <span className="font-medium text-xs">Studio Visit / B21 Directions</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={getWhatsAppInquiryUrl("corporate")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-[#D4AF37] text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#0F2E22]" />
                <span className="font-medium text-xs">Corporate &amp; Bulk Orders</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Footer note */}
          <div className="px-3 py-2 bg-stone-100/70 border-t border-stone-200 text-center">
            <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium">
              Direct Phone: <strong className="text-emerald-950">{FORMATTED_PHONE_NUMBER}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button with min 48px hit area and pulsing indicator */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 sm:px-4 sm:py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 min-h-[48px] min-w-[48px]"
        aria-label="Open WhatsApp live chat options"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Chat on WhatsApp
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 animate-ping absolute top-1 right-1" />
      </button>
    </div>
  );
}
