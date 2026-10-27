'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Clock, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { EXHIBITION_INFO } from '@/data/products';

export default function Hero() {
  const handleCollageClick = (category?: string, brand?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('catalog-filter', {
          detail: { category: category || 'All', brand: brand || 'All' },
        })
      );
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E8] to-[#FDFBF7] border-b border-[#E8DEC9] pt-10 pb-16 sm:py-20">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0F2E22]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography, Post-Event Value Props & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Post-Event Hook Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1F17] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="font-semibold tracking-wide">
                Exhibition Update: Now Accepting Online Orders &amp; Studio Appointments
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A1F17] leading-[1.12]">
                Festive Treasures <br />
                <span className="italic font-light text-[#A88234]">&amp; Artisanal Gifting</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] text-[#6E655F] font-semibold">
                Curated Dry Fruits • Designer Ethnic Fabrics • Heirloom Decor
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light max-w-xl">
              Missed our South City 1 Exhibition? You can still order our full collection online for{' '}
              <strong className="text-[#0A1F17] font-semibold">Express Same-Day Gurgaon Delivery</strong>, or book a private appointment at our{' '}
              <strong className="text-[#0A1F17] font-semibold">B21 South City 1 Studio</strong>. Featuring hand-sorted California &amp; Afghan dry fruits, heirloom fabrics by{' '}
              <strong className="text-[#A88234] font-semibold">Sifti Creations</strong>, and royal keepsakes by{' '}
              <strong className="text-[#A88234] font-semibold">Güzel</strong>.
            </p>

            {/* Studio Visit & Delivery Information Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DEC9] shadow-sm max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Studio Visits at B21</div>
                  <div className="text-stone-500 text-[11px]">South City 1, Gurgaon • 11 AM – 9 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#0F2E22] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Express Fulfillment</div>
                  <div className="text-stone-500 text-[11px]">Same-Day NCR / Pan-India Air Courier</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#catalog"
                className="px-7 py-3.5 bg-[#0F2E22] hover:bg-[#1B4736] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold transition-all border border-[#D4AF37]/60 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 rounded-sm text-center"
              >
                <span>Explore 68+ Treasures</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </a>

              <a
                href={`https://wa.me/919899875665?text=${encodeURIComponent(
                  'Hello Auspicious24, I would like to book a private studio visit at B21, South City 1 or place an express online order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#0A1F17] text-xs uppercase tracking-[0.15em] font-bold transition-all border border-[#E8DEC9] hover:border-[#D4AF37] shadow-xs inline-flex items-center justify-center gap-2 rounded-sm text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>Book Studio Visit / Order Online</span>
              </a>
            </div>
          </div>

          {/* Right Column: Luxury 3-Card Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
              {/* Card 1: Sifti Creations Designer Suit (Spans 2 rows on left) */}
              <div
                onClick={() => handleCollageClick('Ladies Suits & Ethnic Wear', 'Sifti Creations')}
                className="col-span-1 row-span-2 relative group cursor-pointer overflow-hidden rounded-xl border border-[#E8DEC9] bg-white shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4.6] w-full overflow-hidden bg-stone-100">
                  <Image
                    src="/images/products/parsi-work-on-steel-grey-suit/IMG_2942.jpg"
                    alt="Sifti Creations Handcrafted Designer Suit"
                    fill
                    priority
                    sizes="(max-width: 640px) 50vw, 30vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F17]/90 via-transparent to-black/20" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Sifti Creations
                    </span>
                  </div>
                  <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                      Designer Ethnic Wear
                    </div>
                    <div className="font-serif text-xs sm:text-sm font-semibold line-clamp-2 leading-snug">
                      Parsi Gara on Steel Grey
                    </div>
                    <div className="text-[10px] text-stone-300">
                      ₹4,999 • 3-Pc Unstitched
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Luxury Dry Fruit Hamper (Top Right) */}
              <div
                onClick={() => handleCollageClick('Festive Hampers & Serveware', 'Auspicious Dry Fruits')}
                className="col-span-1 relative group cursor-pointer overflow-hidden rounded-xl border border-[#E8DEC9] bg-white shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src="/images/products/luxury-silver-peacock-decorative-serving-bowl-dryfruit-filled/30.jpg"
                    alt="Silver Peacock Decorative Dry Fruit Hamper"
                    fill
                    priority
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F17]/85 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Auspicious Dry Fruits
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                    <div className="font-serif text-[11px] sm:text-xs font-medium truncate">
                      Silver Peacock Hamper
                    </div>
                    <div className="text-[9px] text-[#D4AF37] font-semibold">
                      ₹1,299 • Nut Filled
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Güzel Jewellery & Ornate Serveware (Bottom Right) */}
              <div
                onClick={() => handleCollageClick('All', 'Güzel Jewellery')}
                className="col-span-1 relative group cursor-pointer overflow-hidden rounded-xl border border-[#E8DEC9] bg-white shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src="/images/products/golden-bird-decorative-glass-bowl-with-ornate-metal-stand-premium-festive-serve-ware/27.jpg"
                    alt="Golden Bird Ornate Stand Bowl by Güzel"
                    fill
                    priority
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F17]/85 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Güzel Decor &amp; Jewellery
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                    <div className="font-serif text-[11px] sm:text-xs font-medium truncate">
                      Golden Bird Ornate Bowl
                    </div>
                    <div className="text-[9px] text-[#D4AF37] font-semibold">
                      ₹1,850 • Scalloped Glass
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-label under collage */}
            <div className="text-center pt-3 text-[11px] text-stone-500">
              <span>Click any piece to filter that brand in the catalog below ↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
