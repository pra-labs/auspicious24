'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, Clock, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { EXHIBITION_INFO } from '@/data/products';
import { getWhatsAppInquiryUrl, FORMATTED_PHONE_NUMBER } from '@/lib/whatsapp';

export default function CollapsibleSections() {
  const [exhibitionOpen, setExhibitionOpen] = useState(false);
  const [corporateOpen, setCorporateOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:hidden space-y-3">
      {/* 1. Mobile Accordion: Exhibition Venue & Private Appointments */}
      <div className="rounded-xl border border-[#E8DEC9] bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setExhibitionOpen(!exhibitionOpen)}
          className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-[#0A1F17] text-base active:bg-[#FAF7F2] transition-colors min-h-[48px]"
          aria-expanded={exhibitionOpen}
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Exhibition Venue &amp; Studio Hours</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
              exhibitionOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {exhibitionOpen && (
          <div className="px-4 pb-4 pt-1 space-y-3 text-xs text-stone-600 border-t border-[#E8DEC9]/50 animate-in fade-in duration-200">
            <div className="space-y-1">
              <div className="font-semibold text-stone-900">{EXHIBITION_INFO.venue}</div>
              <div>{EXHIBITION_INFO.city} • Daily 11:00 AM – 8:30 PM</div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Exhibition Highlights:
              </div>
              <ul className="space-y-1 text-stone-700">
                {EXHIBITION_INFO.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F2E22] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppInquiryUrl('exhibition')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-md bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Get Directions / Book on WhatsApp</span>
              </a>

              <a
                href="tel:+919899875665"
                className="w-full py-2.5 px-3 rounded-md border border-stone-300 text-stone-700 text-xs font-semibold text-center min-h-[44px] flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                <span>Call Concierge: {FORMATTED_PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 2. Mobile Accordion: Corporate & Bulk Gifting Catalog */}
      <div className="rounded-xl border border-[#E8DEC9] bg-white overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setCorporateOpen(!corporateOpen)}
          className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-[#0A1F17] text-base active:bg-[#FAF7F2] transition-colors min-h-[48px]"
          aria-expanded={corporateOpen}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">🎁</span>
            <span>Corporate &amp; Bulk Festive Gifting</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
              corporateOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {corporateOpen && (
          <div className="px-4 pb-4 pt-1 space-y-3 text-xs text-stone-600 border-t border-[#E8DEC9]/50 animate-in fade-in duration-200">
            <p className="leading-relaxed">
              Elevate your corporate brand with bespoke hampers, custom foil-stamped ribbons, and pan-India doorstep dispatch to client addresses.
            </p>

            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DEC9] space-y-1">
              <div className="font-bold text-[#0A1F17]">Popular Institutional Ranges:</div>
              <ul className="space-y-0.5 text-stone-600 text-[11px]">
                <li>• Executive 4-Jar Gold Box (₹1,200 – ₹1,850)</li>
                <li>• Emerald Keepsake Trunks (₹2,500 – ₹3,500)</li>
                <li>• Silver Peacock Decorative Bowls (₹1,199 – ₹2,499)</li>
              </ul>
            </div>

            <a
              href={getWhatsAppInquiryUrl('corporate')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-md bg-[#0F2E22] text-[#D4AF37] font-bold text-xs flex items-center justify-center gap-2 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
              <span>Request Corporate Catalog on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
