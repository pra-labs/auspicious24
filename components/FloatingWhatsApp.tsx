"use client";

import React, { useState } from "react";
import { MessageCircle, X, Gift, MapPin, Sparkles, Building2, ChevronRight } from "lucide-react";
import { getWhatsAppInquiryUrl, FORMATTED_PHONE_NUMBER } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-gold-300/80 overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-4 text-white flex items-center justify-between border-b border-gold-400/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow">
                <MessageCircle className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-gold-200">
                  Auspicious24 Concierge
                </h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
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
          <div className="p-3 bg-cream-50 space-y-1.5 text-xs">
            <p className="text-[10px] uppercase font-bold text-stone-400 px-2 py-0.5 tracking-wider">
              How can we assist you today?
            </p>

            <a
              href={getWhatsAppInquiryUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-gold-300 text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-gold-600" />
                <span className="font-medium">Order Festive Gift Hampers</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={getWhatsAppInquiryUrl("bespoke")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-gold-300 text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span className="font-medium">Sifti Creations Suits &amp; Fabrics</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={getWhatsAppInquiryUrl("exhibition")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-gold-300 text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold-600" />
                <span className="font-medium">Gurgaon Exhibition RSVP (B21)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={getWhatsAppInquiryUrl("corporate")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200/80 hover:border-gold-300 text-stone-800 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-gold-600" />
                <span className="font-medium">Corporate &amp; Bulk Orders</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-stone-100/70 border-t border-stone-200 text-center">
            <span className="text-[11px] text-stone-500 font-medium">
              Direct Phone: <strong className="text-emerald-950">{FORMATTED_PHONE_NUMBER}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
        aria-label="Open WhatsApp live chat options"
      >
        <MessageCircle className="w-6 h-6 fill-white shrink-0 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Chat on WhatsApp
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 animate-ping absolute top-1 right-1" />
      </button>
    </div>
  );
}
