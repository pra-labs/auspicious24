'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/catalog';
import { formatINR } from '@/lib/catalog';
import { getWhatsAppOrderUrl, getWhatsAppShareUrl } from '@/lib/whatsapp';
import { MessageCircle, Eye, Share2, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const selectedVariant = product.variants && product.variants.length > 0
    ? product.variants[selectedVariantIdx]
    : undefined;

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeOriginalPrice = selectedVariant?.compare_at_price || product.compare_at_price;
  const discountPercent =
    activeOriginalPrice && activeOriginalPrice > activePrice
      ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
      : null;

  const orderUrl = getWhatsAppOrderUrl({
    productTitle: product.title,
    price: activePrice,
    variantLabel: selectedVariant && selectedVariant.title !== 'Default Title' ? selectedVariant.title : undefined,
    productHandle: product.handle,
  });

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/product/${product.handle}`
      : `https://auspicious24.vercel.app/product/${product.handle}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} at Auspicious24!`,
          url: productUrl,
        });
        return;
      } catch (err) {
        // Fallback
      }
    }

    const shareUrl = getWhatsAppShareUrl(product.title, productUrl);
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group flex flex-col relative bg-white border border-[#E8DEC9]/70 rounded-md overflow-hidden hover:shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300">
      {/* Product Image Frame (3/4 Aspect Ratio like Savah) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
        <Link href={`/product/${product.handle}`} className="block w-full h-full">
          <Image
            src={product.featured_image || (product.images[0] ?? '/images/placeholder.jpg')}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Brand / Collection Pill Top-Left */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-xs">
            {product.brand}
          </span>
          {product.badge && (
            <span className="text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2]/95 text-[#0F2E22] border border-[#E8DEC9] shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Floating Quick Action Icons Top-Right */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-[#0F2E22] hover:bg-white transition-all shadow-xs"
            title="Share on WhatsApp"
            aria-label="Share product"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-[#0F2E22] hover:bg-white transition-all shadow-xs"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Hover Quick View Button bar */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0A1F17]/90 hover:bg-[#0A1F17] text-[#FAF7F2] text-xs uppercase tracking-wider rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium truncate">
            {product.category}
          </div>
          <Link
            href={`/product/${product.handle}`}
            className="block group/title"
          >
            <h3 className="font-serif text-sm sm:text-base font-medium text-stone-900 line-clamp-2 group-hover/title:text-[#0F2E22] transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>
          <p className="text-[11px] text-stone-500 line-clamp-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Variants pills if multiple */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantIdx(idx)}
                className={`text-[10px] px-2 py-0.5 rounded-sm border transition-colors ${
                  selectedVariantIdx === idx
                    ? 'border-[#0F2E22] bg-[#0F2E22] text-[#FAF7F2] font-semibold'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400 bg-stone-50'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        {/* Pricing & WhatsApp Direct Action */}
        <div className="pt-2 border-t border-[#E8DEC9]/50 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold text-[#0F2E22]">
                {formatINR(activePrice)}
              </span>
              {activeOriginalPrice && activeOriginalPrice > activePrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatINR(activeOriginalPrice)}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                {discountPercent}% Off
              </span>
            )}
          </div>

          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs hover:shadow-md shrink-0"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span className="hidden xs:inline">Order</span>
          </a>
        </div>
      </div>
    </div>
  );
}
