import { siteConfig } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-600 hover:text-[#0F2E22] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="space-y-3 border-b border-[#E8DEC9] pb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auspicious Enterprises Logistics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0A1F17] font-bold">
            Shipping & Dispatch Policy
          </h1>
          <p className="text-sm text-stone-500">
            Carefully packaged, food-grade protected & insured dispatch from Gurgaon.
          </p>
        </div>

        <div className="space-y-6 text-sm text-stone-700 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">1. Delhi NCR Delivery</h2>
            <p>
              Same-day or next-day express hand-delivery is available across Gurgaon, Delhi, Noida, and Faridabad. Delicate decorative silver/glass bowls and dry fruit thaals are delivered via personal courier to ensure zero transit damage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">2. Pan-India Express Shipping</h2>
            <p>
              We ship across all pin codes in India via premium air couriers (Blue Dart, Delhivery Express). Standard transit time is 2 to 4 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">3. Food-Grade Vacuum Packaging</h2>
            <p>
              All almonds, cashews, pistachios, anjeer, and walnuts are packaged in vacuum-sealed food-grade pouches to preserve fresh crunch, natural oils, and aroma before placement in decorative boxes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">4. Corporate & Multi-Destination Logistics</h2>
            <p>
              For corporate gifting orders, we manage bulk address spreadsheets and deliver individual hampers directly to employee or client doorsteps across 50+ Indian cities with personalized greeting notes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
