import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Mail,
  Heart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { FORMATTED_PHONE_NUMBER, AUSPICIOUS_PHONE_NUMBER, getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { CATEGORIES } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-cream-200 border-t border-gold-400/30">
      {/* Upper Footer: Main Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1 (5 cols): Brand Bio & WhatsApp Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-gold-400 flex items-center justify-center shadow-gold">
                <span className="text-gold-300 font-serif font-bold text-lg">A</span>
                <span className="text-gold-400 font-serif font-semibold text-xs">24</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-cream-50">
                  Auspicious<span className="text-gold-400">24</span>
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-gold-300/70 font-semibold">
                  Luxury Festive Gifting &amp; Couture
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-300/80 leading-relaxed max-w-sm">
              Your destination for handpicked imperial dry fruits, royal hampers, Sifti Creations designer suits, and handcrafted jewelry. Celebrating the warmth and splendour of Indian festivities.
            </p>

            {/* Quick WhatsApp order badge */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${AUSPICIOUS_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2 (3 cols): Categories & Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-300">
              Festive Collections
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/#catalog`}
                    className="text-cream-300/80 hover:text-gold-200 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gold-400/50">›</span>
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={getWhatsAppInquiryUrl("corporate")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-300 hover:text-gold-100 transition-colors font-semibold flex items-center gap-1.5"
                >
                  <span className="text-gold-400/80">›</span>
                  <span>Corporate Hampers &amp; Bulk Orders</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 (4 cols): Exhibition Venue & Contact Information */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-300">
              Exhibition &amp; Concierge
            </h4>

            <div className="space-y-3 text-xs text-cream-300/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream-100 block">Exhibition Venue:</strong>
                  <span>B21, South City 1, Gurgaon, Haryana 122001</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream-100 block">Exhibition Timings:</strong>
                  <span>Daily 11:00 AM – 8:30 PM (Festive Season)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream-100 block">Direct Assistance / WhatsApp:</strong>
                  <a
                    href={`tel:+919899875665`}
                    className="text-gold-300 hover:underline"
                  >
                    {FORMATTED_PHONE_NUMBER}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & PraLabs Branding */}
      <div className="bg-emerald-900/60 border-t border-emerald-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-300/70 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Auspicious Enterprises (Auspicious24). All rights reserved.
          </p>

          <p className="flex items-center gap-1 justify-center">
            <span>Crafted with festive elegance by</span>
            <strong className="text-gold-300 font-semibold tracking-wide">PraLabs</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
