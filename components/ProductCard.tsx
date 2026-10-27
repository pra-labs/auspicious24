'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, formatINR, cleanCardDescription, getProductMetadataPill } from '@/lib/catalog';
import { getWhatsAppOrderUrl, getWhatsAppShareUrl } from '@/lib/whatsapp';
import { useFestiveTray } from '@/context/FestiveTrayContext';
import { MessageCircle, Eye, Share2, Plus, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useFestiveTray();

  const selectedVariant =
    product.variants && product.variants.length > 0
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

  const handleAddToTray = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productUrl =
      typeof window !== 'undefined'
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

  const metadataPill = (product as any).specsSummary || getProductMetadataPill(product);
  const cleanedDesc = cleanCardDescription(product.description);

  return (
    <div className="group flex flex-col relative bg-white border border-[#E8DEC9]/70 rounded-md overflow-hidden hover:shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300">
      {/* Product Image Frame (3/4 Aspect Ratio) */}
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
            {cleanedDesc || product.title}
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

        {/* Compact Metadata Pill right above Price */}
        <div className="pt-2 border-t border-[#E8DEC9]/50 space-y-2">
          {metadataPill && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8DEC9] text-[10px] uppercase tracking-wider text-[#0F2E22] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>{metadataPill}</span>
            </div>
          )}

          {/* Pricing & Split Dual CTAs: Add to Tray + Order on WhatsApp */}
          <div className="flex items-center justify-between gap-2">
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

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Add to Festive Tray Button */}
              <button
                type="button"
                onClick={handleAddToTray}
                className={`p-2 rounded-sm border transition-all text-xs font-semibold flex items-center gap-1 ${
                  justAdded
                    ? 'bg-[#0F2E22] text-[#D4AF37] border-[#0F2E22]'
                    : 'bg-white hover:bg-[#FAF7F2] text-stone-700 hover:text-[#0F2E22] border-[#E8DEC9] hover:border-[#D4AF37]'
                }`}
                title="Add to Festive Tray"
                aria-label={`Add ${product.title} to Festive Tray`}
              >
                {justAdded ? (
                  <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <ShoppingBag className="w-3.5 h-3.5 hidden xl:inline" />
                <span className="hidden xl:inline text-[11px]">Tray</span>
              </button>

              {/* Order on WhatsApp Primary CTA */}
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-[11px] sm:text-xs font-bold rounded-sm transition-all shadow-xs hover:shadow-md shrink-0"
                title="Order on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                <span className="whitespace-nowrap">Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
