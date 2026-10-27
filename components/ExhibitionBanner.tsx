import React from "react";
import { MapPin, Calendar, Clock, MessageCircle, Sparkles, Navigation, CheckCircle2 } from "lucide-react";
import { EXHIBITION_INFO } from "@/data/products";
import { getWhatsAppInquiryUrl, FORMATTED_PHONE_NUMBER } from "@/lib/whatsapp";

export default function ExhibitionBanner() {
  return (
    <section id="exhibition" className="relative py-16 sm:py-20 bg-cream-100 border-b border-gold-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-100 border border-gold-300 text-gold-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Official Exhibition &amp; Pop-up</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 tracking-tight">
            The Grand Festive Exhibition
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Experience our curated collections in person. Touch the pure handloom fabrics, taste our
            freshly roasted dry fruits, and explore heirloom jewelry designed for royal festive celebrations.
          </p>
        </div>

        {/* Spotlight Showcase Box */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-emerald border border-gold-400/40 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 7 cols: Event Info & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-serif italic text-gold-300 tracking-wider">
                  South City 1 • Festive Exclusive
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
                  A Curated Trio: Auspicious Dry Fruits × Sifti Creations × Güzel Jewellery
                </h3>
              </div>

              {/* Key Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-emerald-900/60 border border-gold-400/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    <span>Exhibition Venue</span>
                  </div>
                  <p className="text-base font-bold text-cream-50">{EXHIBITION_INFO.venue}</p>
                  <p className="text-xs text-cream-200/80">{EXHIBITION_INFO.city}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-900/60 border border-gold-400/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-gold-400" />
                    <span>Dates &amp; Timings</span>
                  </div>
                  <p className="text-base font-bold text-cream-50">Festive Season Exhibition</p>
                  <p className="text-xs text-cream-200/80">Daily 11:00 AM – 8:30 PM</p>
                </div>
              </div>

              {/* Experience Highlights */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs uppercase font-bold text-gold-300 tracking-wider">
                  What you’ll experience at the venue:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-cream-100">
                  {EXHIBITION_INFO.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp RSVP Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getWhatsAppInquiryUrl("exhibition")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>RSVP / Get Directions on WhatsApp</span>
                </a>

                <a
                  href={`tel:+919899875665`}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-gold-400/40 text-gold-200 hover:text-white hover:bg-gold-400/10 text-xs font-semibold transition-all text-center"
                >
                  Call Host: {FORMATTED_PHONE_NUMBER}
                </a>
              </div>
            </div>

            {/* Right 5 cols: Brand Showcase Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              {/* Brand 1: Auspicious Dry Fruits */}
              <div className="p-4 rounded-2xl bg-cream-50/10 backdrop-blur-md border border-gold-400/30 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-gold-300">
                    Auspicious Dry Fruits
                  </h4>
                  <span className="text-[10px] bg-gold-400/20 text-gold-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Festive Gifting
                  </span>
                </div>
                <p className="text-xs text-cream-200/90 leading-relaxed">
                  Gourmet nuts, organic Kashmiri Mamra, Afghan Anjeer, and ornate brass / silver-finish serveware bowls.
                </p>
              </div>

              {/* Brand 2: Sifti Creations */}
              <div className="p-4 rounded-2xl bg-cream-50/10 backdrop-blur-md border border-gold-400/30 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-gold-300">
                    Sifti Creations
                  </h4>
                  <span className="text-[10px] bg-gold-400/20 text-gold-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Ethnic Couture
                  </span>
                </div>
                <p className="text-xs text-cream-200/90 leading-relaxed">
                  Hand-embroidered pure Chanderi silk suit sets, winter velvets with Kashmiri tilla, and organza dupattas.
                </p>
              </div>

              {/* Brand 3: Güzel Jewellery */}
              <div className="p-4 rounded-2xl bg-cream-50/10 backdrop-blur-md border border-gold-400/30 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-gold-300">
                    Güzel Jewellery
                  </h4>
                  <span className="text-[10px] bg-gold-400/20 text-gold-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Royal Jewels
                  </span>
                </div>
                <p className="text-xs text-cream-200/90 leading-relaxed">
                  22K gold-plated Jadau Kundan polki chokers, reverse meenakari work, and lightweight festive chandbalis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
