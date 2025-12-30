export interface CartItem {
  id: string;
  title: string;
  priceRub: number;
  gameSlug: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'gamehubb_cart';

/**
 * Get cart from localStorage
 */
export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [] };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Cart;
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
  }

  return { items: [] };
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Add item to cart or increase quantity if exists
 */
export function addToCart(item: Omit<CartItem, 'quantity'>): Cart {
  const cart = getCart();
  const existingItem = cart.items.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

/**
 * Update item quantity in cart
 */
export function updateCartItemQuantity(itemId: string, quantity: number): Cart {
  const cart = getCart();
  const item = cart.items.find((i) => i.id === itemId);

  if (item) {
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.id !== itemId);
    } else {
      item.quantity = quantity;
    }
  }

  saveCart(cart);
  return cart;
}

/**
 * Remove item from cart
 */
export function removeFromCart(itemId: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter((i) => i.id !== itemId);
  saveCart(cart);
  return cart;
}

/**
 * Clear cart
 */
export function clearCart(): Cart {
  const cart = { items: [] };
  saveCart(cart);
  return cart;
}

/**
 * Calculate total price
 */
export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => total + item.priceRub * item.quantity, 0);
}

/**
 * Get total items count
 */
export function getCartItemsCount(cart: Cart): number {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
}

