"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, MessageCircle, ExternalLink, Check, Sparkles, ShieldCheck } from "lucide-react";
import { Product, ProductVariant } from "@/lib/catalog";
import { getWhatsAppOrderUrl, getWhatsAppShareUrl } from "@/lib/whatsapp";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [imageError, setImageError] = useState(false);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeOriginalPrice = selectedVariant?.compare_at_price || product.compare_at_price;
  const discountPercent =
    activeOriginalPrice && activeOriginalPrice > activePrice
      ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
      : null;

  const images = product.images && product.images.length > 0 ? product.images : [
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"
  ];

  const currentImage = images[selectedImageIndex] || images[0];

  const orderUrl = getWhatsAppOrderUrl({
    productTitle: product.title,
    price: activePrice,
    variantLabel: selectedVariant?.title !== "Default Title" ? selectedVariant?.title : undefined,
    productHandle: product.handle,
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-gold-300/60 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery & Thumbnails */}
        <div className="md:w-1/2 p-6 bg-cream-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              onError={() => setImageError(true)}
            />
            {product.badge && (
              <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-950 text-gold-300 border border-gold-400/40 shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-gold-500 scale-105 shadow-sm"
                      : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Order CTA */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-700">
              <span>{product.brand}</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">{product.category}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-emerald-950">
                ₹{activePrice.toLocaleString("en-IN")}
              </span>
              {activeOriginalPrice && activeOriginalPrice > activePrice && (
                <span className="text-base text-stone-400 line-through">
                  ₹{activeOriginalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {discountPercent && discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {discountPercent}% SAVING
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Variant selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="pt-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Select Size / Weight Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          isSelected
                            ? "bg-emerald-950 text-gold-300 border-gold-400 font-bold shadow-sm"
                            : "bg-white text-stone-700 border-stone-200 hover:border-gold-300"
                        }`}
                      >
                        {v.title} — ₹{v.price.toLocaleString("en-IN")}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Product Highlights
                </h4>
                <ul className="space-y-1 text-xs text-stone-600">
                  {product.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 rounded-2xl text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Order Now on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <Link
                href={`/product/${product.handle}`}
                onClick={onClose}
                className="text-emerald-900 hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Full Product Page &amp; Specs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <span className="flex items-center gap-1 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified Fresh</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
