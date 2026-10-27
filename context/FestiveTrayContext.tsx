'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, ProductVariant, formatINR } from '@/lib/catalog';
import { AUSPICIOUS_PHONE_NUMBER, getWhatsAppMultiItemOrderUrl } from '@/lib/whatsapp';

export interface TrayItem {
  id: string; // unique item id: `${productId}-${variantId}`
  productId: string | number;
  productHandle: string;
  title: string;
  brand: string;
  category: string;
  variantId: string | number;
  variantTitle: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  quantity: number;
}

interface FestiveTrayContextType {
  items: TrayItem[];
  isOpen: boolean;
  totalCount: number;
  totalAmount: number;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearTray: () => void;
  openTray: () => void;
  closeTray: () => void;
  toggleTray: () => void;
  generateWhatsAppUrl: () => string;
}

const FestiveTrayContext = createContext<FestiveTrayContextType | undefined>(undefined);

const STORAGE_KEY = 'auspicious24_festive_tray_v1';

export function FestiveTrayProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TrayItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load initial cart from localStorage safely on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load festive tray from localStorage:', e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // Sync to localStorage on update
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save festive tray to localStorage:', e);
    }
  }, [items, hasLoaded]);

  const addItem = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    const variantId = selectedVariant ? selectedVariant.id : 'default';
    const variantTitle = selectedVariant?.title && selectedVariant.title !== 'Default Title' ? selectedVariant.title : '';
    const activePrice = selectedVariant ? selectedVariant.price : product.price;
    const activeOriginalPrice = selectedVariant?.compare_at_price || product.compare_at_price;
    const itemId = `${product.id}-${variantId}`;
    const image = product.featured_image || (product.images && product.images[0]) || '/images/placeholder.jpg';

    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex((i) => i.id === itemId);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: itemId,
          productId: product.id,
          productHandle: product.handle,
          title: product.title,
          brand: product.brand,
          category: product.category,
          variantId,
          variantTitle,
          price: activePrice,
          originalPrice: activeOriginalPrice,
          image,
          quantity,
        },
      ];
    });

    // Auto-open drawer for delightful UX feedback
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearTray = () => {
    setItems([]);
  };

  const openTray = () => setIsOpen(true);
  const closeTray = () => setIsOpen(false);
  const toggleTray = () => setIsOpen((prev) => !prev);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const generateWhatsAppUrl = (): string => {
    return getWhatsAppMultiItemOrderUrl(
      items.map((i) => ({
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        variant: i.variantTitle && i.variantTitle !== 'Default Title' ? i.variantTitle : undefined,
        handle: i.productHandle,
      })),
      'Fulfillment: Express Gurgaon Delivery / Pan-India Shipping'
    );
  };

  return (
    <FestiveTrayContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        totalAmount,
        addItem,
        removeItem,
        updateQuantity,
        clearTray,
        openTray,
        closeTray,
        toggleTray,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </FestiveTrayContext.Provider>
  );
}

export function useFestiveTray() {
  const context = useContext(FestiveTrayContext);
  if (!context) {
    throw new Error('useFestiveTray must be used within a FestiveTrayProvider');
  }
  return context;
}
