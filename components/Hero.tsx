'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, MapPin, MessageCircle, Truck } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E8] to-[#FDFBF7] border-b border-[#E8DEC9] pt-6 sm:pt-10 pb-16 sm:pb-20 lg:py-20">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0F2E22]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography, Post-Event Value Props & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Post-Event Hook Badge with top margin for sticky header separation */}
            <div className="mt-3 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#0A1F17] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs text-[10px] sm:text-xs font-medium max-w-full">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
              <span className="font-semibold tracking-wide truncate">
                Online Orders &amp; Studio Appointments Open
              </span>
            </div>

            {/* Main Headline - Mobile viewport optimized line height & clamp */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A1F17] leading-[1.15]">
                Festive Treasures <br />
                <span className="italic font-medium sm:font-semibold text-[#7A5413] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">&amp; Artisanal Gifting</span>
              </h1>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#6E655F] font-semibold">
                Curated Dry Fruits • Designer Ethnic Fabrics • Heirloom Decor
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-base text-stone-700 leading-relaxed font-light max-w-xl">
              Missed our South City 1 Exhibition? Order our collection online for{' '}
              <strong className="text-[#0A1F17] font-semibold">Express Same-Day Gurgaon Delivery</strong>, or book a private appointment at our{' '}
              <strong className="text-[#0A1F17] font-semibold">B21 South City 1 Studio</strong>.
            </p>

            {/* Studio Visit & Delivery Information - Balanced 2-column card with clean divider */}
            <div className="p-2.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[#E8DEC9] shadow-xs max-w-xl grid grid-cols-2 divide-x divide-[#E8DEC9] text-xs">
              <div className="flex items-start gap-1.5 sm:gap-2.5 pr-2 sm:pr-3 min-w-0">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-stone-900 text-[11px] sm:text-xs truncate">Studio Visits at B21</div>
                  <div className="text-stone-500 text-[10px] sm:text-[11px] truncate">South City 1, Gurgaon</div>
                </div>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2.5 pl-2 sm:pl-3 min-w-0">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F2E22] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-stone-900 text-[11px] sm:text-xs truncate">Express Fulfillment</div>
                  <div className="text-stone-500 text-[10px] sm:text-[11px] truncate">Same-Day NCR / Pan-India</div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Full-width touch friendly targets on mobile (min 48px height) */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <a
                href="#catalog"
                className="px-6 py-3.5 bg-[#0A1F17] hover:bg-[#0F2E22] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-semibold transition-all border border-[#D4AF37]/60 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 rounded-sm text-center min-h-[48px] active:scale-[0.98]"
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
                className="px-6 py-3.5 bg-transparent hover:bg-[#0A1F17]/5 text-[#0A1F17] text-xs uppercase tracking-[0.14em] font-medium sm:font-semibold transition-all border border-[#0A1F17]/30 hover:border-[#0A1F17] inline-flex items-center justify-center gap-2 rounded-sm text-center min-h-[48px] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#128C7E] shrink-0" />
                <span>Book Studio Visit / Order Online</span>
              </a>
            </div>
          </div>

          {/* Right Column: Luxury 3-Card Collage (5 cols) */}
          <div className="lg:col-span-5 relative pb-6 sm:pb-0">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-lg mx-auto">
              {/* Card 1: Sifti Creations Designer Suit */}
              <div
                onClick={() => handleCollageClick('Ladies Suits & Ethnic Wear', 'Sifti Creations')}
                className="col-span-1 row-span-2 relative group cursor-pointer overflow-hidden rounded-xl border border-[#E8DEC9] bg-white shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
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
                  <div className="absolute top-2 left-2">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Sifti Creations
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 inset-x-2.5 text-white space-y-0.5">
                    <div className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                      Designer Ethnic
                    </div>
                    <div className="font-serif text-[11px] sm:text-sm font-semibold line-clamp-2 leading-tight">
                      Parsi Gara on Steel Grey
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-stone-300">
                      ₹4,999 • 3-Pc
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Luxury Dry Fruit Hamper */}
              <div
                onClick={() => handleCollageClick('Festive Hampers & Serveware', 'Auspicious Dry Fruits')}
                className="col-span-1 relative group cursor-pointer overflow-hidden rounded-xl border border-[#E8DEC9] bg-white shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
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
                  <div className="absolute top-1.5 left-1.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Auspicious
                    </span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 text-white">
                    <div className="font-serif text-[10px] sm:text-xs font-medium truncate">
                      Silver Peacock Hamper
                    </div>
                    <div className="text-[9px] text-[#D4AF37] font-semibold">
                      ₹1,299 • Nut Filled
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Güzel Jewellery & Ornate Serveware */}
              <div
                onClick={() => handleCollageClick('All', 'Güzel Jewellery')}
                className="col-span-1 relative group cursor-pointer overflow-hidden rounded-xl border border-[#E8DEC9] bg-white shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col"
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
                  <div className="absolute top-1.5 left-1.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Güzel Decor
                    </span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 text-white">
                    <div className="font-serif text-[10px] sm:text-xs font-medium truncate">
                      Golden Bird Bowl
                    </div>
                    <div className="text-[9px] text-[#D4AF37] font-semibold">
                      ₹1,850 • Glass Stand
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-label under collage */}
            <div className="text-center pt-2.5 text-[10px] sm:text-[11px] text-stone-500">
              <span>Tap any piece to filter that brand in catalog below ↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
