'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { Cart, CartItem } from '@/lib/cart';
import {
  getCart as getCartFromStorage,
  addToCart as addToCartStorage,
  updateCartItemQuantity as updateCartItemQuantityStorage,
  removeFromCart as removeFromCartStorage,
  clearCart as clearCartStorage,
  getCartTotal,
  getCartItemsCount,
} from '@/lib/cart';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  total: number;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Safe localStorage access helper
function getCartFromStorageSafely(): Cart {
  if (typeof window === 'undefined') {
    return { items: [] };
  }
  try {
    return getCartFromStorage();
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initializer to load cart on first render (client-side only)
  const [cart, setCart] = useState<Cart>(getCartFromStorageSafely);
  const mountedRef = useRef(false);

  // Mark as mounted after first render (not setState, just ref)
  useEffect(() => {
    mountedRef.current = true;
  }, []);

  // Sync with localStorage changes (for cross-tab sync)
  useEffect(() => {
    if (!mountedRef.current) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gamehubb_cart') {
        setCart(getCartFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const newCart = addToCartStorage(item);
    setCart(newCart);
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const newCart = updateCartItemQuantityStorage(itemId, quantity);
    setCart(newCart);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    const newCart = removeFromCartStorage(itemId);
    setCart(newCart);
  }, []);

  const clearCart = useCallback(() => {
    const newCart = clearCartStorage();
    setCart(newCart);
  }, []);

  const total = getCartTotal(cart);
  const itemsCount = getCartItemsCount(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        total,
        itemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

