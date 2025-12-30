'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    setCart(getCartFromStorage());
  }, []);

  // Sync with localStorage changes (for cross-tab sync)
  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gamehubb_cart') {
        setCart(getCartFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

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

