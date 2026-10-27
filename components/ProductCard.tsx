"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye, Sparkles, Check, Share2 } from "lucide-react";
import { Product, ProductVariant } from "@/lib/catalog";
import { getWhatsAppOrderUrl, getWhatsAppShareUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [imageError, setImageError] = useState(false);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const discountPercent =
    activeOriginalPrice && activeOriginalPrice > activePrice
      ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
      : null;

  const primaryImage =
    !imageError && product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80";

  const whatsappUrl = getWhatsAppOrderUrl({
    productTitle: product.title,
    price: activePrice,
    variantLabel: selectedVariant?.label,
    productHandle: product.handle,
  });

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "Royal Selection":
        return "bg-gradient-to-r from-gold-500 to-gold-600 text-emerald-950 font-bold border-gold-300";
      case "Best Seller":
        return "bg-emerald-900 text-gold-300 border-gold-400/40 font-semibold";
      case "Festive Special":
        return "bg-festive-ruby text-white border-pink-300/40 font-semibold";
      case "Limited Edition":
        return "bg-stone-900 text-gold-200 border-gold-400/40 font-medium";
      default:
        return "bg-emerald-800 text-cream-50 border-emerald-600 font-medium";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-stone-200/80 hover:border-gold-400/70 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-cream-100 overflow-hidden">
        <Link href={`/product/${product.handle}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="text-[10px] font-bold tracking-tight bg-cream-50 text-emerald-950 px-2 py-0.5 rounded-full border border-gold-300 shadow-sm w-fit">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button (hover desktop) */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-emerald-950 hover:text-gold-300 text-stone-700 rounded-full shadow-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            title="Quick preview"
            aria-label="Quick view product"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-medium text-stone-500">
            <span className="text-gold-700 font-semibold tracking-wide uppercase">
              {product.brand}
            </span>
            <span className="text-stone-400">•</span>
            <span className="truncate">{product.category}</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.handle}`} className="block group-hover:text-emerald-900 transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Variant Selector (if available) */}
          {product.variants && product.variants.length > 1 && (
            <div className="pt-2">
              <label className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-1">
                Select Option:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                        isSelected
                          ? "bg-emerald-950 text-gold-300 border-gold-400 font-semibold shadow-sm"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:border-gold-300"
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="pt-4 mt-4 border-t border-stone-100 space-y-3">
          {/* Price display */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-950">
              ₹{activePrice.toLocaleString("en-IN")}
            </span>
            {activeOriginalPrice && activeOriginalPrice > activePrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹{activeOriginalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-[10px] text-emerald-700 font-semibold ml-auto">
              ✓ Festive Stock
            </span>
          </div>

          {/* Action Buttons: WhatsApp Order (Primary) & View Details (Secondary) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-8 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Order on WhatsApp</span>
            </a>

            <Link
              href={`/product/${product.handle}`}
              className="sm:col-span-4 flex items-center justify-center py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-900 text-stone-800 hover:text-emerald-950 text-xs font-semibold hover:bg-stone-50 transition-all text-center"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
