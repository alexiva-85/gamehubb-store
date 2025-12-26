import { describe, expect, it, beforeEach } from 'vitest';

import {
  type CartItem,
  addToCart,
  clear,
  getCart,
  remove,
  updateQty,
} from './cart';

declare global {
  // eslint-disable-next-line no-var
  var localStorageMock: Storage | undefined;
}

function createLocalStorageMock(): Storage {
  const store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  } as Storage;
}

beforeEach(() => {
  (global as any).window = {
    localStorage: createLocalStorageMock(),
    dispatchEvent: () => true,
  };
});

describe('cart persistence', () => {
  it('returns [] when storage is empty', () => {
    const cart = getCart();
    expect(cart).toEqual([]);
  });

  it('returns [] when JSON is corrupted', () => {
    (window as any).localStorage.setItem('cart:v1', '{not-json');
    const cart = getCart();
    expect(cart).toEqual([]);
  });

  it('persists items and restores them', () => {
    addToCart(1, 2);
    addToCart(2, 1);

    const saved = getCart();
    expect(saved).toHaveLength(2);

    const raw = (window as any).localStorage.getItem('cart:v1') as string;
    expect(raw).toBeTruthy();

    const parsed = JSON.parse(raw) as CartItem[];
    expect(parsed).toEqual(saved);
  });
});

describe('qty rules', () => {
  it('removes item when qty <= 0', () => {
    addToCart(1, 2);
    let cart = getCart();
    expect(cart).toHaveLength(1);

    cart = updateQty(1, 0);
    expect(cart).toHaveLength(0);

    const raw = (window as any).localStorage.getItem('cart:v1');
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[];
      expect(parsed.find((i) => i.productId === 1)).toBeUndefined();
    }
  });

  it('never stores qty <= 0 or negative', () => {
    addToCart(1, -5);
    let cart = getCart();
    expect(cart.length === 0 || cart[0].qty >= 1).toBeTruthy();

    addToCart(2, 1);
    cart = updateQty(2, -3);
    expect(cart.find((i) => i.productId === 2)).toBeUndefined();
  });
});



