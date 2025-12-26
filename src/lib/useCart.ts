'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  type CartItem,
  addToCart as addToCartLib,
  clear as clearLib,
  getCart,
  remove as removeLib,
  updateQty as updateQtyLib,
} from './cart';

const CART_EVENT_NAME = 'cart:changed';

export type UseCartResult = {
  cart: CartItem[];
  totalQty: number;
  addToCart: (productId: number, qty?: number) => void;
  updateQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export function useCart(): UseCartResult {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Initial load from localStorage.
    setCart(getCart());

    const handleChange = (event: Event) => {
      const custom = event as CustomEvent<CartItem[]>;
      if (Array.isArray(custom.detail)) {
        setCart(custom.detail);
      } else {
        // Fallback in case detail is missing.
        setCart(getCart());
      }
    };

    window.addEventListener(CART_EVENT_NAME, handleChange);

    return () => {
      window.removeEventListener(CART_EVENT_NAME, handleChange);
    };
  }, []);

  const totalQty = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );

  const addToCart = (productId: number, qty: number = 1) => {
    addToCartLib(productId, qty);
  };

  const updateQty = (productId: number, qty: number) => {
    updateQtyLib(productId, qty);
  };

  const remove = (productId: number) => {
    removeLib(productId);
  };

  const clear = () => {
    clearLib();
  };

  return {
    cart,
    totalQty,
    addToCart,
    updateQty,
    remove,
    clear,
  };
}



