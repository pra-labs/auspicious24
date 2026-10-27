"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Share2,
  ChevronLeft,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  Calendar,
  Gift,
  Phone,
} from "lucide-react";
import { Product, ProductVariant } from "@/lib/catalog";
import { getWhatsAppOrderUrl, getWhatsAppShareUrl, FORMATTED_PHONE_NUMBER } from "@/lib/whatsapp";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "orderInfo">("description");
  const [copiedShare, setCopiedShare] = useState(false);

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

  const shareUrl = getWhatsAppShareUrl(product.title);

  const handleShareClick = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: product.title,
          text: `Check out ${product.title} on Auspicious24!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-cream-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-950 transition-colors bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Festive Catalog</span>
          </Link>

          <button
            onClick={handleShareClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white hover:bg-gold-50 px-3.5 py-1.5 rounded-full border border-gold-300 shadow-sm transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-gold-600" />
            <span>Share on WhatsApp</span>
          </button>
        </div>

        {/* Product Hero Grid */}
        <div className="bg-white rounded-3xl border border-gold-200/80 shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Image Gallery & Thumbnails (7 Cols on desktop) */}
          <div className="lg:col-span-6 p-6 sm:p-10 bg-cream-100/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm">
              <Image
                src={currentImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.badge && (
                  <span className="text-xs uppercase font-bold tracking-wider px-3.5 py-1 rounded-full bg-emerald-950 text-gold-300 border border-gold-400 shadow">
                    {product.badge}
                  </span>
                )}
                {discountPercent && discountPercent > 0 && (
                  <span className="text-xs font-bold tracking-tight bg-cream-50 text-emerald-950 px-2.5 py-1 rounded-full border border-gold-300 shadow w-fit">
                    {discountPercent}% SAVINGS
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail switcher */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-gold-500 scale-105 shadow-md"
                        : "border-stone-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Details, WhatsApp Checkout (6 Cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              {/* Brand, Category, Code */}
              <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="text-gold-700 tracking-wider uppercase font-bold">
                    {product.brand}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span>{product.category}</span>
                </div>
                <span className="text-[11px] text-stone-400 uppercase">
                  SKU: {String(product.id).slice(0, 10)}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                {product.title}
              </h1>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-cream-50 border border-gold-200/80 flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
                    ₹{activePrice.toLocaleString("en-IN")}
                  </span>
                  {activeOriginalPrice && activeOriginalPrice > activePrice && (
                    <span className="text-base text-stone-400 line-through">
                      ₹{activeOriginalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
                  All Taxes Included
                </span>
              </div>

              {/* Short Bio */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-2.5 pt-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-stone-800 block">
                    Select Packaging / Weight Option:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-emerald-950 text-gold-300 border-gold-400 shadow-sm"
                              : "bg-stone-50 text-stone-700 border-stone-200 hover:border-gold-300"
                          }`}
                        >
                          <div className="text-xs font-bold">{v.title}</div>
                          <div className={`text-xs mt-0.5 ${isSelected ? "text-gold-200" : "text-stone-500"}`}>
                            ₹{v.price.toLocaleString("en-IN")}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% Guaranteed Purity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fast Pan-India Delivery</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Gift className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Custom Festive Gifting</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button: Order on WhatsApp */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-6 h-6 fill-white shrink-0" />
                <span>Order Now on WhatsApp (+91 98998 75665)</span>
              </a>

              <p className="text-center text-xs text-stone-500">
                ⚡ Instant WhatsApp Chat. Our team verifies immediate availability and arranges express courier or Gurgaon pick-up.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Highlights, Exhibition Details */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm space-y-6">
          {/* Tab Navigation */}
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-2 text-sm font-bold tracking-wide transition-colors ${
                activeTab === "description"
                  ? "text-emerald-950 border-b-2 border-emerald-950"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              Key Highlights
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-2 text-sm font-bold tracking-wide transition-colors ${
                activeTab === "specs"
                  ? "text-emerald-950 border-b-2 border-emerald-950"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              Specifications &amp; Details
            </button>
            <button
              onClick={() => setActiveTab("orderInfo")}
              className={`pb-2 text-sm font-bold tracking-wide transition-colors ${
                activeTab === "orderInfo"
                  ? "text-emerald-950 border-b-2 border-emerald-950"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              Ordering &amp; Exhibition Visit
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Curator&apos;s Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700">
                {product.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-50 border border-stone-200/60">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Technical &amp; Material Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-sm">
                    <span className="font-semibold text-stone-600">{key}</span>
                    <span className="text-stone-900 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orderInfo" && (
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Direct WhatsApp Ordering &amp; In-Person Trial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-cream-50 border border-gold-200 space-y-2">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-whatsapp" />
                    <span>1. Direct WhatsApp Order</span>
                  </h4>
                  <p className="text-xs text-stone-600">
                    Clicking &ldquo;Order on WhatsApp&rdquo; opens our verified business chat with the exact product title and price pre-loaded. We confirm your delivery address and send UPI/Bank payment links.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-gold-200 space-y-2">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>2. In-Person Exhibition</span>
                  </h4>
                  <p className="text-xs text-stone-600">
                    Visit our Diwali Exhibition at <strong>B21, South City 1, Gurgaon</strong> to inspect dry fruits in person or try Sifti Creations designer fabrics with tailored guidance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-gold-200 space-y-2">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-gold-600" />
                    <span>3. Corporate &amp; Bulk</span>
                  </h4>
                  <p className="text-xs text-stone-600">
                    Need 25 to 500+ festive hampers? We offer custom logo ribbons, wooden gift boxes, and doorstep pan-India delivery. Message us for wholesale quotation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-gold-200 pb-4">
              <div>
                <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
                  Pair with this selection
                </span>
                <h3 className="font-serif text-2xl font-bold text-emerald-950">
                  More in {product.category}
                </h3>
              </div>
              <Link
                href="/#catalog"
                className="text-xs font-bold text-emerald-900 hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
