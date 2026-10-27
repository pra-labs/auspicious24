import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function RefundPolicyPage() {
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
            <span>Customer Delight Guarantee</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0A1F17] font-bold">
            Returns, Replacements & Quality Assurance
          </h1>
          <p className="text-sm text-stone-500">
            Our commitment to artisanal quality, freshness, and heirloom standards.
          </p>
        </div>

        <div className="space-y-6 text-sm text-stone-700 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">1. Gourmet Dry Fruit Freshness Guarantee</h2>
            <p>
              Given that dry fruits and edible hampers are consumable gourmet goods, we cannot accept general returns once unsealed. However, if you receive damaged outer serveware or notice any quality defects upon opening, we offer an immediate complimentary replacement or full refund upon photo verification on WhatsApp (+91 98998 75665).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">2. Designer Suit Fabrics (Sifti Creations)</h2>
            <p>
              Unstitched fabrics and dress materials may be exchanged or returned within 5 days of delivery, provided the fabric remains uncut, unaltered, and with all original tags attached.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">3. Instant Concierge Support</h2>
            <p>
              We believe in direct relationships. If anything doesn’t meet your expectations, message us directly on WhatsApp at +91 98998 75665 and our team in Gurgaon will resolve it within 2 business hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
