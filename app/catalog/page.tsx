import { prisma } from '@/lib/prisma';
import { fallbackProducts } from '@/lib/fallbackProducts';
import CatalogProducts from './CatalogProducts';

async function getProducts() {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { category: 'asc' },
        { title: 'asc' },
      ],
    });

    if (dbProducts.length > 0) {
      return { source: 'db' as const, items: dbProducts };
    }

    return { source: 'fallback' as const, items: fallbackProducts };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { source: 'fallback' as const, items: fallbackProducts };
  }
}

export default async function CatalogPage() {
  const { source, items } = await getProducts();

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>
      {source === 'fallback' && (
        <div className="mb-4 text-sm text-gray-500">
          Используются резервные товары (БД пуста)
        </div>
      )}
      <CatalogProducts products={items} />
    </div>
  );
}
