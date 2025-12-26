// Simple Prisma seed script for tests and local development.
// Creates a few demo products for the shop.
// Uses unified prisma client from src/lib/prismaClient.ts via relative path.

import { prisma } from '../src/lib/prismaClient';

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Create test products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Small Coin Pack',
        description: '100 coins',
        priceCents: 990,
        currency: 'RUB',
        isActive: true,
      },
      {
        name: 'Medium Coin Pack',
        description: '550 coins',
        priceCents: 3990,
        currency: 'RUB',
        isActive: true,
      },
      {
        name: 'Large Coin Pack',
        description: '1200 coins',
        priceCents: 7990,
        currency: 'RUB',
        isActive: true,
      },
    ],
  });

  // Fetch created products to get their IDs
  const createdProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { id: 'asc' },
    select: { id: true },
  });

  const productIds = createdProducts.map((p: { id: number }) => p.id);

  console.log(`✅ Seeded ${products.count} products`);
  console.log(`Product IDs: ${productIds.join(', ')}`);

  // Save product IDs for E2E tests (optional, can be read from DB in tests)
  if (typeof process !== 'undefined' && process.env) {
    process.env.SEEDED_PRODUCT_IDS = productIds.join(',');
  }

  return { productIds, count: products.count };
}

main()
  .then((result) => {
    console.log('Seed completed successfully:', result);
    process.exit(0);
  })
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

