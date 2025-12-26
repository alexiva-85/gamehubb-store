export type CartItem = {
  productId: number;
  qty: number;
};

const STORAGE_KEY = 'cart:v1';

const CART_EVENT_NAME = 'cart:changed';

function assertValidCart(items: CartItem[]): void {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const invalid = items.find((i) => !Number.isFinite(i.qty) || i.qty <= 0);
  if (invalid) {
    // Dev-only assertion to ensure we never keep zero/negative qty in cart.
    // eslint-disable-next-line no-console
    console.error('Invalid cart state detected (qty must be >= 1):', items);
    throw new Error('Invalid cart state: qty must be >= 1');
  }
}

function dispatchCartChanged(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const event = new CustomEvent<CartItem[]>(CART_EVENT_NAME, { detail: items });
    window.dispatchEvent(event);
  } catch {
    // Ignore event dispatch errors.
  }
}

function readStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        productId: Number((item as any).productId),
        qty: Number((item as any).qty),
      }))
      .filter((i) => Number.isFinite(i.productId) && i.productId > 0 && i.qty > 0);
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    assertValidCart(items);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors.
  }
}

export function getCart(): CartItem[] {
  return readStorage();
}

export function setCart(items: CartItem[]): void {
  writeStorage(items);
  dispatchCartChanged(items);
}

export function addToCart(productId: number, qty: number = 1): CartItem[] {
  const items = readStorage();
  const existing = items.find((i) => i.productId === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    const safeQty = Math.max(1, Math.floor(qty));
    items.push({ productId, qty: safeQty });
  }

  writeStorage(items);
  dispatchCartChanged(items);
  return items;
}

export function updateQty(productId: number, qty: number): CartItem[] {
  let items = readStorage();

  if (qty <= 0) {
    items = items.filter((i) => i.productId !== productId);
  } else {
    const safeQty = Math.max(1, Math.floor(qty));
    items = items.map((i) => (i.productId === productId ? { ...i, qty: safeQty } : i));
  }

  writeStorage(items);
  dispatchCartChanged(items);
  return items;
}

export function remove(productId: number): CartItem[] {
  const items = readStorage().filter((i) => i.productId !== productId);
  writeStorage(items);
  dispatchCartChanged(items);
  return items;
}

export function clear(): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    dispatchCartChanged([]);
  } catch {
    // Ignore.
  }
}


