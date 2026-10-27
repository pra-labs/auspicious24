'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';

const announcements = [
  {
    text: 'Missed our South City 1 Exhibition? Order online for Same-Day Gurgaon Delivery or book a studio visit at B21.',
    link: '#exhibition',
  },
  {
    text: 'Grade-A California Almonds, Afghan Anjeer & Medjool Dates Freshly Packed',
    link: '#catalog',
  },
  {
    text: 'Bespoke Corporate Hampers & Pan-India Dispatch with Custom Branding',
    link: '#corporate',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (isDismissed) return null;

  const current = announcements[currentIndex];

  return (
    <aside
      aria-label="Festive Announcement"
      className="bg-[#0A1F17] text-[#FAF7F2] text-[10px] sm:text-xs tracking-wider py-2 px-3 sm:px-4 text-center border-b border-[#D4AF37]/30 relative overflow-hidden transition-all"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1 sm:gap-2">
        {/* Left balance spacer on desktop so marquee announcement remains optically centered */}
        <div className="w-[40px] shrink-0 hidden sm:block pointer-events-none" aria-hidden="true" />

        <div className="flex-1 flex items-center justify-center min-w-0 overflow-hidden px-2 sm:px-4">
          {current.link ? (
            <Link
              href={current.link}
              className="hover:text-[#D4AF37] transition-colors font-medium truncate flex items-center gap-1.5 max-w-full"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0 hidden sm:inline" />
              <span className="truncate">{current.text}</span>
              <span className="text-[#D4AF37] shrink-0 font-bold ml-0.5">→</span>
            </Link>
          ) : (
            <span className="font-medium truncate">{current.text}</span>
          )}
        </div>

        {/* Minimalist Dismiss Button with generous 40px touch hit area pushed far right */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="ml-auto text-stone-400 hover:text-white p-2 min-h-[40px] min-w-[40px] -mr-1 flex items-center justify-center shrink-0 transition-colors rounded-sm"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
