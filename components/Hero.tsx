import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Calendar, Clock } from "lucide-react";
import { EXHIBITION_INFO } from "@/data/products";

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] sm:min-h-[88vh] flex items-end sm:items-center justify-start overflow-hidden border-b border-[#E8DEC9]">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/products/luxury-silver-peacock-decorative-serving-bowl-dryfruit-filled/30.jpg"
          alt="Auspicious24 Luxury Festive Marketplace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Editorial Double Vignette for Typography Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F17]/95 via-[#0A1F17]/65 to-transparent sm:bg-gradient-to-r sm:from-[#0A1F17]/95 sm:via-[#0A1F17]/60 sm:to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl px-6 sm:px-12 py-12 sm:py-20 space-y-6 text-[#FAF7F2]">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Curated Festive Marketplace • Gurgaon & Pan-India</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.12]">
          Festive Treasures <br />
          <span className="italic font-light text-[#D4AF37]">& Artisanal Gifting</span>
        </h1>

        <p className="text-sm sm:text-base text-[#FAF7F2]/90 font-light leading-relaxed max-w-xl">
          Discover hand-sorted California & Afghan dry fruits, heirloom designer suit fabrics by{' '}
          <strong className="text-[#D4AF37] font-medium">Sifti Creations</strong>, royal jewellery by{' '}
          <strong className="text-[#D4AF37] font-medium">Güzel</strong>, and bespoke celebration hampers.
        </p>

        {/* Exhibition Badge */}
        <div className="p-3.5 rounded-lg bg-[#0F2E22]/80 backdrop-blur-sm border border-[#D4AF37]/30 max-w-md space-y-1 text-xs">
          <div className="flex items-center gap-2 text-[#D4AF37] font-medium">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Diwali Exhibition: {EXHIBITION_INFO.dates}</span>
            <span className="text-white/40">•</span>
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{EXHIBITION_INFO.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>{EXHIBITION_INFO.venue}, {EXHIBITION_INFO.city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href="#catalog"
            className="px-8 py-4 bg-[#0F2E22] hover:bg-[#1B4736] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold transition-colors border border-[#D4AF37]/60 shadow-xl inline-flex items-center justify-center gap-2 rounded-sm text-center"
          >
            <span>Explore 65+ Treasures</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </a>

          <a
            href="#exhibition"
            className="text-xs uppercase tracking-[0.2em] text-[#FAF7F2] hover:text-[#D4AF37] transition-colors py-2 text-center underline underline-offset-8 font-medium"
          >
            Exhibition Details & RSVP →
          </a>
        </div>
      </div>
    </section>
  );
}
