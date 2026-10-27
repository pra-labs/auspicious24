import React from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, MapPin, ChevronRight, Award, Truck, ShieldCheck, Heart } from "lucide-react";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 sm:py-24 border-b border-gold-400/30">
      {/* Background Decorative Festive Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#D4AF37 1px, #0A1F17 1px)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
        />
      </div>

      {/* Decorative Gold Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-200 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-spin-slow" />
              <span>Diwali &amp; Festive Collection 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-cream-50 leading-[1.15]">
              Festive Shopping &amp; Gifting{" "}
              <span className="block mt-2 font-serif italic text-gold-300 font-normal">
                Curated by Auspicious24
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Celebrate the auspicious season with hand-curated imperial dry fruit hampers,
              hand-embroidered festive couture by <strong className="text-gold-200 font-semibold">Sifti Creations</strong>,
              and statement jewelry by <strong className="text-gold-200 font-semibold">Güzel Jewellery</strong>.
              Order directly via WhatsApp for swift personalized service.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 text-emerald-950 font-bold text-sm tracking-wide shadow-gold hover:shadow-gold-lg hover:brightness-105 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore Catalog</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getWhatsAppInquiryUrl("general")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href="#exhibition"
                className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-gold-400/40 text-gold-200 hover:text-white hover:bg-gold-400/10 font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Visit Gurgaon Exhibition</span>
              </a>
            </div>

            {/* Value Pillars */}
            <div className="pt-8 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-50">Imperial Grade</h4>
                  <p className="text-[11px] text-cream-300/70">100% Handpicked nuts</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-50">Sifti Creations</h4>
                  <p className="text-[11px] text-cream-300/70">Pure Chanderi &amp; Velvets</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-50">Pan-India Dispatch</h4>
                  <p className="text-[11px] text-cream-300/70">Express doorstep delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-cream-50">Direct WhatsApp</h4>
                  <p className="text-[11px] text-cream-300/70">Zero hassle ordering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Trio Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Glow Border Frame */}
              <div className="rounded-2xl p-1 bg-gradient-to-tr from-gold-500/60 via-gold-200/30 to-gold-400/80 shadow-2xl">
                <div className="rounded-[14px] bg-emerald-900/90 p-5 backdrop-blur-md space-y-4">
                  {/* Spotlight Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gold-400/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-ping" />
                      <span className="text-xs uppercase tracking-wider font-semibold text-gold-300">
                        Featured Festive Trio
                      </span>
                    </div>
                    <span className="text-[11px] text-cream-300/80">South City 1 • Gurgaon</span>
                  </div>

                  {/* 3 Brand Mini Highlights */}
                  <div className="space-y-3">
                    {/* Item 1: Royal Hampers */}
                    <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-emerald-950/60 border border-gold-400/20 hover:border-gold-400/50 transition-colors">
                      <div className="w-14 h-14 rounded-lg bg-emerald-800 overflow-hidden shrink-0 border border-gold-400/30 flex items-center justify-center text-2xl">
                        🎁
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                          Auspicious Dry Fruits
                        </span>
                        <h4 className="text-sm font-semibold text-cream-50 truncate">
                          Luxury Royal Gifting Trunks &amp; Boxes
                        </h4>
                        <p className="text-xs text-cream-300/80">
                          Jumbo Cashews, Kashmiri Mamra &amp; Anjeer
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Sifti Creations */}
                    <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-emerald-950/60 border border-gold-400/20 hover:border-gold-400/50 transition-colors">
                      <div className="w-14 h-14 rounded-lg bg-emerald-800 overflow-hidden shrink-0 border border-gold-400/30 flex items-center justify-center text-2xl">
                        ✨
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                          Sifti Creations
                        </span>
                        <h4 className="text-sm font-semibold text-cream-50 truncate">
                          Handcrafted Suits &amp; Chanderi Ensembles
                        </h4>
                        <p className="text-xs text-cream-300/80">
                          Parsi thread work, Velvet tilla &amp; Organza
                        </p>
                      </div>
                    </div>

                    {/* Item 3: Güzel Jewellery */}
                    <div className="flex items-center gap-3.5 p-2.5 rounded-xl bg-emerald-950/60 border border-gold-400/20 hover:border-gold-400/50 transition-colors">
                      <div className="w-14 h-14 rounded-lg bg-emerald-800 overflow-hidden shrink-0 border border-gold-400/30 flex items-center justify-center text-2xl">
                        💎
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                          Güzel Jewellery
                        </span>
                        <h4 className="text-sm font-semibold text-cream-50 truncate">
                          Jadau Kundan &amp; Festive Chokers
                        </h4>
                        <p className="text-xs text-cream-300/80">
                          22K Gold-plated statement pieces
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Exhibition Location Card footer */}
                  <div className="pt-3 border-t border-gold-400/20 flex items-center justify-between text-xs">
                    <span className="text-gold-200/90 font-medium">Exhibition Venue:</span>
                    <a
                      href="#exhibition"
                      className="text-gold-300 hover:text-white font-semibold underline underline-offset-4 flex items-center gap-1"
                    >
                      B21, South City 1, Gurgaon →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
