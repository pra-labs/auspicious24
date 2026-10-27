import React from "react";
import { Gift, Building2, Ribbon, CheckCircle2, MessageCircle, FileText } from "lucide-react";
import { getWhatsAppInquiryUrl, FORMATTED_PHONE_NUMBER } from "@/lib/whatsapp";

export default function CorporateGiftingSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cream-100 via-cream-50 to-gold-50/50 rounded-3xl p-8 sm:p-12 border border-gold-300/60 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 cols: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Corporate &amp; Bespoke Gifting</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 leading-tight">
                Distinguished Diwali Hampers for Your Valued Clients &amp; Teams
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Elevate your brand with bespoke festive hampers. Auspicious24 specializes in turnkey corporate gifting — from custom foil-stamped greeting cards and branded satin ribbons to multi-destination pan-India express dispatch.
              </p>

              {/* Value Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Custom Brand Sleeves &amp; Ribbons</h4>
                    <p className="text-[11px] text-stone-500">Your logo embossed on ribbons &amp; cards</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Multi-Destination Logistics</h4>
                    <p className="text-[11px] text-stone-500">Direct courier dispatch to individual addresses</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Flexible Volume Pricing</h4>
                    <p className="text-[11px] text-stone-500">Special institutional tiers from 25 to 1,000+ units</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">GST Invoice &amp; Strict Compliance</h4>
                    <p className="text-[11px] text-stone-500">100% tax compliant B2B corporate billing</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getWhatsAppInquiryUrl("corporate")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Request Corporate Catalog &amp; Quote</span>
                </a>

                <a
                  href={`tel:+919899875665`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:text-emerald-950 hover:border-emerald-950 font-semibold text-xs transition-all text-center"
                >
                  Direct Desk: {FORMATTED_PHONE_NUMBER}
                </a>
              </div>
            </div>

            {/* Right 5 cols: Corporate Sample Box Featurette */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-gold-300/80 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Corporate Sample Pack
                  </span>
                  <span className="text-[11px] bg-gold-100 text-gold-800 px-2.5 py-0.5 rounded-full font-bold">
                    Fast Courier Sample
                  </span>
                </div>

                <div className="space-y-2 text-xs text-stone-600">
                  <p className="font-semibold text-stone-800">
                    Evaluating hampers for your board or enterprise?
                  </p>
                  <p>
                    We can courier a preview sample box directly to your Gurgaon / Delhi NCR corporate office within 24 hours.
                  </p>
                </div>

                <div className="p-3 bg-cream-50 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-emerald-950">Popular Corporate Ranges:</div>
                  <ul className="list-disc list-inside text-stone-600 space-y-0.5 text-[11px]">
                    <li>Executive 4-Jar Gold Filigree Box (₹1,200 – ₹1,850)</li>
                    <li>The Emerald Velvet Royal Keepsake Trunk (₹2,500 – ₹3,500)</li>
                    <li>Silver Peacock &amp; Brass Serveware Gift Hampers (₹1,199 – ₹2,499)</li>
                  </ul>
                </div>

                <a
                  href={getWhatsAppInquiryUrl("corporate")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-gold-300 text-xs font-bold transition-colors"
                >
                  Inquire on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
