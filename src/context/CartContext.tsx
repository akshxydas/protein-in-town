import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, ProductVariant } from '../types';
import { useStore } from './StoreContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  discountCode: string | null;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'pit_cart_items_v1';
const COUPON_STORAGE_KEY = 'pit_coupon_v1';

const VALID_COUPONS: Record<string, { percent: number; description: string }> = {
  'PROTEIN10': { percent: 10, description: '10% Welcome Discount' },
  'TOWN5': { percent: 5, description: '5% Kakkanad Store Discount' },
  'RED15': { percent: 15, description: '15% Fitness Community Offer' },
  'LIME15': { percent: 15, description: '15% Fitness Community Offer' },
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useStore();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string | null>(() => {
    return localStorage.getItem(COUPON_STORAGE_KEY) || null;
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (discountCode) {
      localStorage.setItem(COUPON_STORAGE_KEY, discountCode);
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [discountCode]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.selectedVariant.price * item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!discountCode || !VALID_COUPONS[discountCode.toUpperCase()]) return 0;
    const rate = VALID_COUPONS[discountCode.toUpperCase()].percent / 100;
    return Math.round(subtotal * rate);
  }, [subtotal, discountCode]);

  const freeShippingThreshold = settings.freeShippingThreshold || 1999;

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    const postDiscount = subtotal - discount;
    if (postDiscount >= freeShippingThreshold) {
      return 0;
    }
    return settings.defaultShippingFee || 99;
  }, [subtotal, discount, freeShippingThreshold, settings.defaultShippingFee, items.length]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + shippingFee);
  }, [subtotal, discount, shippingFee]);

  const amountNeededForFreeShipping = useMemo(() => {
    const postDiscount = subtotal - discount;
    return Math.max(0, freeShippingThreshold - postDiscount);
  }, [subtotal, discount, freeShippingThreshold]);

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    const cartItemId = `${product.id}__${variant.id}`;
    setItems(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, variant.stockCount || 99);
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedVariant: variant,
          quantity: Math.min(quantity, variant.stockCount || 99),
        },
      ];
    });
    setDrawerOpen(true);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const max = item.selectedVariant.stockCount || 99;
          return { ...item, quantity: Math.min(quantity, max) };
        }
        return item;
      })
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (VALID_COUPONS[clean]) {
      setDiscountCode(clean);
      return {
        success: true,
        message: `Applied code ${clean}: ${VALID_COUPONS[clean].description}`,
      };
    }
    return {
      success: false,
      message: 'Invalid discount code. Try "PROTEIN10" or "TOWN5".',
    };
  };

  const removeCoupon = () => {
    setDiscountCode(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        discountCode,
        shippingFee,
        total,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        isDrawerOpen,
        setDrawerOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
