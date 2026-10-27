import React from "react";
import { Sparkles, Heart, Award, Gem, Check } from "lucide-react";
import { BRAND_STORIES } from "@/data/products";

export default function BrandStorySection() {
  return (
    <section className="py-16 sm:py-24 bg-cream-100/70 border-b border-gold-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-200/60 text-gold-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-700" />
            <span>Heritage &amp; Craftsmanship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
            The Three Pillars of Auspicious24
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            A collaborative festive celebration bringing together time-honored Indian traditions, gourmet indulgence, and sartorial excellence under one roof.
          </p>
        </div>

        {/* 3 Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand 1: Auspicious Dry Fruits */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-luxury transition-all space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-gold-300 flex items-center justify-center text-2xl shadow-emerald">
                🌰
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-gold-600 block">
                  Purity &amp; Taste
                </span>
                <h3 className="font-serif text-2xl font-bold text-emerald-950 mt-1">
                  Auspicious Dry Fruits
                </h3>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                Directly sourcing single-origin Kashmiri Mamra almonds, jumbo cashews from coastal groves, and sun-dried Afghan figs. Every box is crafted to signify abundance, vitality, and heartfelt festive blessings.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero adulteration or chemical bleaching</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Nitrogen-flushed seal for crisp crunch</span>
              </div>
            </div>
          </div>

          {/* Brand 2: Sifti Creations */}
          <div className="bg-white rounded-3xl p-8 border border-gold-300/80 shadow-gold hover:shadow-gold-lg transition-all space-y-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-400 text-emerald-950 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl tracking-wider">
              Exhibition Highlight
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-850 text-gold-300 flex items-center justify-center text-2xl shadow-emerald">
                🪡
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-gold-600 block">
                  Artisanal Couture
                </span>
                <h3 className="font-serif text-2xl font-bold text-emerald-950 mt-1">
                  Sifti Creations
                </h3>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                Celebrating authentic Indian textiles: Pure Chanderi silks, opulent Kashmiri tilla work velvets, Banarasi weaves, and delicate sheer organzas designed for memorable puja ceremonies and festive soirees.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Unstitched 3-piece luxury sets</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Custom tailoring consultation available</span>
              </div>
            </div>
          </div>

          {/* Brand 3: Güzel Jewellery */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-luxury transition-all space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-gold-300 flex items-center justify-center text-2xl shadow-emerald">
                💎
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-gold-600 block">
                  Heirloom Accents
                </span>
                <h3 className="font-serif text-2xl font-bold text-emerald-950 mt-1">
                  Güzel Jewellery
                </h3>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                Handcrafted Jadau Kundan, reverse Meenakari enamelling, and uncut polki sets with semi-precious emerald bead accents. Thoughtfully plated in 22K gold with hypoallergenic comfort for timeless grace.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>22K micron gold polish with anti-tarnish coat</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Presented in plush velvet keepsake boxes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
