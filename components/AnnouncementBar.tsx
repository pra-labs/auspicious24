'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const announcements = [
  { text: 'Diwali Shopping Exhibition 2026 • B21, South City 1, Gurgaon • 11 AM – 9 PM', link: '#exhibition' },
  { text: 'Handpicked Grade-A California Almonds, Afghan Anjeer & Medjool Dates', link: null },
  { text: 'Bespoke Corporate Hampers & Pan-India Gifting with Monogrammed Packaging', link: '#corporate' },
  {
    text: 'Direct Inquiries & Custom Assembly on WhatsApp (+91 98998 75665)',
    link: 'https://wa.me/919899875665?text=Hello%20Auspicious24%2C%20I%20have%20an%20inquiry%20regarding%20festive%20gifting.',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];

  return (
    <div className="bg-[#0A1F17] text-[#FAF7F2] text-[11px] sm:text-xs tracking-wider py-2.5 px-4 text-center border-b border-[#D4AF37]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto h-5 flex items-center justify-center transition-all duration-500">
        {current.link ? (
          <Link
            href={current.link}
            target={current.link.startsWith('http') ? '_blank' : '_self'}
            rel={current.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="hover:text-[#D4AF37] transition-colors underline font-medium truncate flex items-center gap-1.5"
          >
            <span>{current.text}</span>
            <span className="text-[#D4AF37]">→</span>
          </Link>
        ) : (
          <span className="font-medium truncate">{current.text}</span>
        )}
      </div>
    </div>
  );
}
