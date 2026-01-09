import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Provider, PriceMode } from '@prisma/client';
import PricesTable from './PricesTable';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Required because we use searchParams

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

const toNumberSafe = (v: any): number | null => {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'bigint') return Number(v);
  if (typeof v === 'object' && typeof (v as any).toNumber === 'function') return (v as any).toNumber(); // Prisma Decimal
  return Number(v);
};

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

  // Serialize products for Client Component (convert Date to string, Decimal/BigInt to number)
  const serializedProducts = products.map((p) => ({
    ...p,
    basePriceIdr: toNumberSafe((p as any).basePriceIdr),
    priceRub: toNumberSafe((p as any).priceRub) ?? 0,
    updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt),
  }));

  // Get unique categories for filter
  const categories = await prisma.product.findMany({
    where: { provider: provider as Provider },
    select: { category: true },
    distinct: ['category'],
  });

  return {
    products: serializedProducts,
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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Wrap entire function in try-catch to prevent any 500 errors
  try {
    const rawParams = await searchParams;

    // Normalize searchParams: convert arrays to single strings
    const params = Object.fromEntries(
      Object.entries(rawParams ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ) as SearchParams;

    // Check admin key - return UI error, never throw
    if (!checkAdminKey(params)) {
      return (
        <>
          <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">
              Неверный admin key. Добавьте ?key=... к URL (используйте ADMIN_KEY из .env.local)
            </p>
          </div>
        </>
      );
    }

    // Fetch data with error handling
    let data;
    try {
      data = await getProducts(params);
    } catch (error) {
      console.error('[admin/prices] Error fetching products:', error);
      return (
        <>
          <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">
              Ошибка загрузки данных. Проверьте подключение к базе данных.
            </p>
            {error instanceof Error && (
              <p className="text-sm text-red-400/80 mt-2 font-mono">{error.message}</p>
            )}
          </div>
        </>
      );
    }

    // Normalize for PricesTable component
    const normalizedSearchParams = Object.fromEntries(
      Object.entries(rawParams ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ) as Record<string, string | undefined>;

    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
        <Suspense fallback={<div className="text-zinc-400">Загрузка...</div>}>
          <PricesTable initialData={data} searchParams={normalizedSearchParams} />
        </Suspense>
      </>
    );
  } catch (error) {
    // Catch any unexpected errors (e.g., in searchParams normalization)
    console.error('[admin/prices] Unexpected error:', error);
    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">
            Произошла ошибка при загрузке страницы. Попробуйте перезагрузить страницу.
          </p>
          {error instanceof Error && (
            <p className="text-sm text-red-400/80 mt-2 font-mono">{error.message}</p>
          )}
        </div>
      </>
    );
  }
}
