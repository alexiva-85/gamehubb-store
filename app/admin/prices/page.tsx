import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Provider, PriceMode } from '@prisma/client';
import PricesTable from './PricesTable';

export const runtime = 'nodejs';

interface SearchParams {
  q?: string;
  category?: string;
  isActive?: string;
  priceMode?: string;
  provider?: string;
  page?: string;
  pageSize?: string;
  sort?: string;
  key?: string; // Admin key for access control
}

async function getProducts(searchParams: SearchParams) {
  const {
    q,
    category,
    isActive,
    priceMode,
    provider = 'DIGIFLAZZ',
    page = '1',
    pageSize = '50',
    sort = 'updatedAt_desc',
  } = searchParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const pageSizeNum = Math.min(200, Math.max(1, parseInt(pageSize, 10)));
  const skip = (pageNum - 1) * pageSizeNum;

  // Build where clause
  const where: any = {
    provider: provider as Provider,
  };

  // Search filter
  if (q) {
    where.OR = [
      { sku: { contains: q, mode: 'insensitive' } },
      { title: { contains: q, mode: 'insensitive' } },
    ];
  }

  // Category filter
  if (category) {
    where.category = category;
  }

  // isActive filter
  if (isActive === 'true') {
    where.isActive = true;
  } else if (isActive === 'false') {
    where.isActive = false;
  }

  // priceMode filter
  if (priceMode && (priceMode === 'AUTO' || priceMode === 'MANUAL')) {
    where.priceMode = priceMode as PriceMode;
  }

  // Sort
  const [sortField, sortOrder] = sort.split('_');
  const orderBy: any = {};
  if (sortField && sortOrder) {
    orderBy[sortField] = sortOrder === 'desc' ? 'desc' : 'asc';
  } else {
    orderBy.updatedAt = 'desc';
  }

  // Get products and total count
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: pageSizeNum,
      orderBy,
      select: {
        sku: true,
        title: true,
        category: true,
        isActive: true,
        basePriceIdr: true,
        priceMode: true,
        priceRub: true,
        updatedAt: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  // Get unique categories for filter
  const categories = await prisma.product.findMany({
    where: { provider: provider as Provider },
    select: { category: true },
    distinct: ['category'],
  });

  return {
    products,
    total,
    page: pageNum,
    pageSize: pageSizeNum,
    categories: categories
      .map((c) => c.category)
      .filter((c): c is string => c !== null),
  };
}

function checkAdminKey(searchParams: SearchParams): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    // If ADMIN_KEY not set, allow (dev mode)
    return true;
  }

  const keyFromQuery = searchParams.key;
  return keyFromQuery === adminKey;
}

export default async function AdminPricesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Check admin key
  if (!checkAdminKey(params)) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">
            Доступ запрещен. Добавьте ?key=... к URL (используйте ADMIN_KEY из .env.local)
          </p>
        </div>
      </div>
    );
  }

  const data = await getProducts(params);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
      <Suspense fallback={<div className="text-zinc-400">Загрузка...</div>}>
        <PricesTable initialData={data} searchParams={params} />
      </Suspense>
    </div>
  );
}
