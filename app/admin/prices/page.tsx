import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Provider, PriceMode } from '@prisma/client';
import PricesTable from './PricesTable';
import { toNumberSafe } from '@/lib/utils';

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
  type WhereClause = {
    provider: Provider;
    OR?: Array<{ sku: { contains: string; mode: 'insensitive' } } | { title: { contains: string; mode: 'insensitive' } }>;
    category?: string;
    isActive?: boolean;
    priceMode?: PriceMode;
  };
  const where: WhereClause = {
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
  const orderBy: Record<string, 'asc' | 'desc'> = {};
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
    basePriceIdr: toNumberSafe(p.basePriceIdr),
    priceRub: toNumberSafe(p.priceRub) ?? 0,
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

function ErrorMessage({ message, detail }: { message: string; detail?: string }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
        <p className="text-red-400">{message}</p>
        {detail && (
          <p className="text-sm text-red-400/80 mt-2 font-mono">{detail}</p>
        )}
      </div>
    </>
  );
}

function SuccessContent({ data, searchParams }: { data: Awaited<ReturnType<typeof getProducts>>; searchParams: Record<string, string | undefined> }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Цены товаров</h1>
      <Suspense fallback={<div className="text-zinc-400">Загрузка...</div>}>
        <PricesTable initialData={data} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default async function AdminPricesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let rawParams;
  try {
    rawParams = await searchParams;
  } catch (error) {
    console.error('[admin/prices] Error resolving searchParams:', error);
    return <ErrorMessage 
      message="Ошибка при обработке параметров запроса" 
      detail={error instanceof Error ? error.message : undefined}
    />;
  }

  // Normalize searchParams: convert arrays to single strings
  let params: SearchParams;
  try {
    params = Object.fromEntries(
      Object.entries(rawParams ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ) as SearchParams;
  } catch (error) {
    console.error('[admin/prices] Error normalizing params:', error);
    return <ErrorMessage 
      message="Ошибка при обработке параметров запроса" 
      detail={error instanceof Error ? error.message : undefined}
    />;
  }

  // Check admin key - return UI error, never throw
  if (!checkAdminKey(params)) {
    return <ErrorMessage message="Неверный admin key. Добавьте ?key=... к URL (используйте ADMIN_KEY из .env.local)" />;
  }

  // Fetch data with error handling
  let data;
  try {
    data = await getProducts(params);
  } catch (error) {
    console.error('[admin/prices] Error fetching products:', error);
    return <ErrorMessage 
      message="Ошибка загрузки данных. Проверьте подключение к базе данных." 
      detail={error instanceof Error ? error.message : undefined}
    />;
  }

  // Normalize for PricesTable component
  const normalizedSearchParams = Object.fromEntries(
    Object.entries(rawParams ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  ) as Record<string, string | undefined>;

  return <SuccessContent data={data} searchParams={normalizedSearchParams} />;
}
