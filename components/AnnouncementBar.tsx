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
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center min-w-0 overflow-hidden">
          {current.link ? (
            <Link
              href={current.link}
              className="hover:text-[#D4AF37] transition-colors font-medium truncate flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0 hidden sm:inline" />
              <span className="truncate">{current.text}</span>
              <span className="text-[#D4AF37] shrink-0 font-bold">→</span>
            </Link>
          ) : (
            <span className="font-medium truncate">{current.text}</span>
          )}
        </div>

        {/* Minimalist Dismiss Button with 44px tap buffer */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-stone-400 hover:text-white p-1 -mr-1 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
