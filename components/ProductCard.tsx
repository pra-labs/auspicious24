'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, formatINR, cleanCardDescription, getProductMetadataPill } from '@/lib/catalog';
import { getWhatsAppOrderUrl, getWhatsAppShareUrl } from '@/lib/whatsapp';
import { useFestiveTray } from '@/context/FestiveTrayContext';
import { MessageCircle, Eye, Share2, ShoppingBag, Check } from 'lucide-react';

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
  const cleanedDesc = cleanCardDescription(product.description, 80);

  return (
    <div className="group flex flex-col relative bg-white border border-[#E8DEC9]/70 rounded-lg overflow-hidden hover:shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300">
      {/* Product Image Frame (3/4 or 4/5 Aspect Ratio for high-density mobile grid) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
        <Link href={`/product/${product.handle}`} className="block w-full h-full">
          <Image
            src={product.featured_image || (product.images[0] ?? '/images/placeholder.jpg')}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </Link>

        {/* Brand / Collection Pill Top-Left */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start max-w-[75%]">
          <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#0A1F17]/90 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-xs truncate max-w-full">
            {product.brand}
          </span>
          {product.badge && (
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2]/95 text-[#0F2E22] border border-[#E8DEC9] shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Tactile Floating Action Buttons Top-Right */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1.5">
          {/* Elegant Floating Tray Button (Touch target min 44x44px) */}
          <button
            type="button"
            onClick={handleAddToTray}
            className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-90 ${
              justAdded
                ? 'bg-[#0F2E22] text-[#D4AF37] ring-2 ring-[#D4AF37]'
                : 'bg-white/95 hover:bg-white text-stone-800 hover:text-[#0F2E22] hover:shadow-lg'
            }`}
            title={justAdded ? 'Added to Festive Tray' : 'Add to Festive Tray'}
            aria-label={`Add ${product.title} to Festive Tray`}
          >
            {justAdded ? (
              <Check className="w-4 h-4 text-[#D4AF37]" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-[#0F2E22]" />
            )}
          </button>

          {/* Quick Share on WhatsApp (Desktop & Mobile) */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-[#0F2E22] hover:bg-white transition-all shadow-xs min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center opacity-85 hover:opacity-100"
            title="Share on WhatsApp"
            aria-label="Share product"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover Quick View Button bar (Desktop only) */}
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
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2">
        <div className="space-y-1">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-600 font-semibold truncate">
            {product.category}
          </div>
          <Link
            href={`/product/${product.handle}`}
            className="block group/title"
          >
            <h3 className="font-serif text-xs sm:text-base font-semibold text-stone-900 line-clamp-2 group-hover/title:text-[#0F2E22] transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>
          {/* Darkened description to #4B5563 for WCAG AAA contrast */}
          <p className="hidden sm:block text-[11px] text-[#4B5563] line-clamp-1 leading-relaxed">
            {cleanedDesc || product.title}
          </p>
        </div>

        {/* Compact Metadata Pill right above Price */}
        <div className="pt-1.5 border-t border-[#E8DEC9]/60 space-y-2">
          {metadataPill && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8DEC9] text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0F2E22] font-semibold truncate max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
              <span className="truncate">{metadataPill}</span>
            </div>
          )}

          {/* Pricing Row */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-serif text-sm sm:text-lg font-bold text-[#0F2E22]">
              {formatINR(activePrice)}
            </span>
            {activeOriginalPrice && activeOriginalPrice > activePrice && (
              <span className="text-[10px] sm:text-xs text-stone-500 line-through">
                {formatINR(activeOriginalPrice)}
              </span>
            )}
            {discountPercent && (
              <span className="text-[9px] sm:text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                {discountPercent}% Off
              </span>
            )}
          </div>

          {/* Undeniably Primary Full-Width WhatsApp CTA with min 44px touch target */}
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold rounded-md flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            title="Order on WhatsApp"
            aria-label={`Order ${product.title} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span className="whitespace-nowrap font-bold tracking-wide">Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
