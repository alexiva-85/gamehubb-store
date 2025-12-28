import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    sku: 'GAME-TOPUP-100',
    title: 'Пополнение счета 100₽',
    description: 'Пополнение игрового счета на 100 рублей',
    priceRub: 100,
    currency: 'RUB',
    category: 'Top-up',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'GAME-TOPUP-500',
    title: 'Пополнение счета 500₽',
    description: 'Пополнение игрового счета на 500 рублей',
    priceRub: 500,
    currency: 'RUB',
    category: 'Top-up',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'GAME-TOPUP-1000',
    title: 'Пополнение счета 1000₽',
    description: 'Пополнение игрового счета на 1000 рублей',
    priceRub: 1000,
    currency: 'RUB',
    category: 'Top-up',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'GAME-TOPUP-2000',
    title: 'Пополнение счета 2000₽',
    description: 'Пополнение игрового счета на 2000 рублей',
    priceRub: 2000,
    currency: 'RUB',
    category: 'Top-up',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'GAME-TOPUP-5000',
    title: 'Пополнение счета 5000₽',
    description: 'Пополнение игрового счета на 5000 рублей',
    priceRub: 5000,
    currency: 'RUB',
    category: 'Top-up',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'RESOURCE-GOLD-100',
    title: 'Золото 100 единиц',
    description: 'Игровая валюта - золото',
    priceRub: 150,
    currency: 'RUB',
    category: 'Resources',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'RESOURCE-GEMS-50',
    title: 'Кристаллы 50 единиц',
    description: 'Премиум валюта - кристаллы',
    priceRub: 200,
    currency: 'RUB',
    category: 'Resources',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'RESOURCE-ENERGY-100',
    title: 'Энергия 100 единиц',
    description: 'Игровая энергия для действий',
    priceRub: 120,
    currency: 'RUB',
    category: 'Resources',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'ITEM-PREMIUM-PASS',
    title: 'Премиум пропуск',
    description: 'Месячный премиум пропуск',
    priceRub: 299,
    currency: 'RUB',
    category: 'Items',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'ITEM-SKIN-LEGENDARY',
    title: 'Легендарная скин',
    description: 'Эксклюзивный скин персонажа',
    priceRub: 499,
    currency: 'RUB',
    category: 'Items',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'RESOURCE-XP-BOOST',
    title: 'Буст опыта x2',
    description: 'Удвоение опыта на 7 дней',
    priceRub: 179,
    currency: 'RUB',
    category: 'Boosts',
    provider: 'MANUAL',
    isActive: true,
  },
  {
    sku: 'ITEM-PREMIUM-BOX',
    title: 'Премиум бокс',
    description: 'Случайные редкие предметы',
    priceRub: 349,
    currency: 'RUB',
    category: 'Items',
    provider: 'MANUAL',
    isActive: true,
  },
];

async function main() {
  console.log('Seeding products...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product,
    });
    console.log(`✓ Upserted product: ${product.sku}`);
  }

  console.log(`✅ Seed completed! Upserted ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

