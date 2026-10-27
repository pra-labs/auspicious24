import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function TermsPage() {
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
            <span>Auspicious Enterprises</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0A1F17] font-bold">
            Terms of Service
          </h1>
          <p className="text-sm text-stone-500">
            Operating as Auspicious Enterprises, B21 South City 1, Gurgaon, Haryana.
          </p>
        </div>

        <div className="space-y-6 text-sm text-stone-700 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">1. Marketplace Overview</h2>
            <p>
              Auspicious24 operates as a curated catalog and order facilitation platform for gourmet dry fruits, festive gifting hampers, and artisanal collections by partner labels including Sifti Creations and Güzel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">2. Orders & Payments</h2>
            <p>
              Orders initiated via WhatsApp or at our physical exhibition are confirmed with an official GST invoice and payment request (via UPI, Bank Transfer, or Payment Link). No order is dispatched prior to payment confirmation unless pre-agreed in writing for corporate credit accounts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#0A1F17]">3. Contact & Grievance</h2>
            <p>
              For any queries, please contact Auspicious Enterprises at contact@auspicious24.com or via telephone/WhatsApp at +91 98998 75665.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
