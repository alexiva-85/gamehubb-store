import { prisma } from './prisma';
import { getDemoProductsByGame, type DemoProduct } from './demo-products';
import type { Product } from '@prisma/client';

export type ProductWithGame = (Product | DemoProduct) & {
  gameSlug?: string;
};

/**
 * Get products for a specific game
 * Returns products from DB if available, otherwise demo products
 */
export async function getProductsByGame(gameSlug: string): Promise<ProductWithGame[]> {
  try {
    // Try to get products from database
    const dbProducts = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        priceRub: 'asc',
      },
    });

    // If DB has products, return them (filter by gameSlug if we have that field in future)
    if (dbProducts.length > 0) {
      // For now, return all products (we can add gameSlug filtering later in schema)
      return dbProducts.map((p) => ({
        ...p,
        gameSlug: gameSlug, // Add gameSlug for consistency
      }));
    }

    // If DB is empty, return demo products for this game
    return getDemoProductsByGame(gameSlug);
  } catch (error) {
    // On error, fallback to demo products
    console.error('Error fetching products:', error);
    return getDemoProductsByGame(gameSlug);
  }
}

/**
 * Get all products (for admin or general catalog)
 */
export async function getAllProducts(): Promise<ProductWithGame[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        priceRub: 'asc',
      },
    });

    if (dbProducts.length > 0) {
      return dbProducts;
    }

    // Return all demo products if DB is empty
    const { DEMO_PRODUCTS } = await import('./demo-products');
    return DEMO_PRODUCTS;
  } catch (error) {
    console.error('Error fetching all products:', error);
    const { DEMO_PRODUCTS } = await import('./demo-products');
    return DEMO_PRODUCTS;
  }
}

