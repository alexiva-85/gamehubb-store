import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Provider, PriceMode } from '@prisma/client';
import { digiflazzPriceList, digiflazzPriceListPasca } from '@/lib/digiflazz';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

// Check authorization
function checkAuth(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  
  // If CRON_SECRET not set, allow (dev mode)
  if (!secret) {
    return true;
  }

  // Check Authorization Bearer token
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match && match[1] === secret) {
      return true;
    }
  }

  return false;
}

interface DigiflazzProduct {
  buyer_sku_code?: string | unknown;
  sku_code?: string | unknown;
  product_name?: string | unknown;
  name?: string | unknown;
  description?: string | unknown;
  desc?: string | unknown;
  category?: string | unknown;
  brand?: string | unknown;
  type?: string | unknown;
  price?: number | unknown;
  buyer_price?: number | unknown;
  buyer_product_status?: unknown;
  seller_product_status?: unknown;
  [key: string]: unknown;
}

// Normalize boolean value from various formats
function normalizeBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'true' || lower === '1' || lower === 'active' || lower === 'yes';
  }
  return false;
}

// Calculate price in RUB from IDR
function calculatePriceRub(priceIdr: number): number {
  const idrToRub = parseFloat(process.env.DIGIFLAZZ_IDR_TO_RUB || '1');
  const markupPct = parseFloat(process.env.DIGIFLAZZ_MARKUP_PCT || '0');
  const markupRub = parseInt(process.env.DIGIFLAZZ_MARKUP_RUB || '0', 10);

  const priceRub = Math.ceil(priceIdr * idrToRub * (1 + markupPct)) + markupRub;
  return Math.max(1, priceRub); // Ensure at least 1 rub
}

// Get all price list items from Digiflazz
async function getAllDigiflazzProducts(): Promise<DigiflazzProduct[]> {
  const [prepaidResult, pascaResult] = await Promise.all([
    digiflazzPriceList().catch((error) => {
      console.error('[admin/digiflazz/sync-products] prepaid price list error', error);
      return { data: [] };
    }),
    digiflazzPriceListPasca().catch((error) => {
      console.error('[admin/digiflazz/sync-products] pasca price list error', error);
      return { data: [] };
    }),
  ]);

  const items: DigiflazzProduct[] = [];

  // Extract items from prepaid response
  if (prepaidResult?.data && Array.isArray(prepaidResult.data)) {
    items.push(...prepaidResult.data);
  } else if (prepaidResult?.data && typeof prepaidResult.data === 'object') {
    // Handle case where data might be an object with items array
    const dataObj = prepaidResult.data as Record<string, unknown>;
    const dataItems = (Array.isArray(dataObj.items) ? dataObj.items : Array.isArray(dataObj.data) ? dataObj.data : []) as DigiflazzProduct[];
    if (Array.isArray(dataItems)) {
      items.push(...dataItems);
    }
  }

  // Extract items from pasca response
  if (pascaResult?.data && Array.isArray(pascaResult.data)) {
    items.push(...pascaResult.data);
  } else if (pascaResult?.data && typeof pascaResult.data === 'object') {
    // Handle case where data might be an object with items array
    const dataObj = pascaResult.data as Record<string, unknown>;
    const dataItems = (Array.isArray(dataObj.items) ? dataObj.items : Array.isArray(dataObj.data) ? dataObj.data : []) as DigiflazzProduct[];
    if (Array.isArray(dataItems)) {
      items.push(...dataItems);
    }
  }

  return items;
}

// Map Digiflazz product to Product model
function mapDigiflazzToProduct(item: DigiflazzProduct): {
  sku: string;
  title: string;
  description: string | null;
  category: string | null;
  provider: Provider;
  isActive: boolean;
  imageUrl: null;
  basePriceIdr: number;
  priceRub: number | null; // null means "don't update" (for MANUAL mode)
} {
  const skuRaw = item.buyer_sku_code || item.sku_code || '';
  if (!skuRaw || typeof skuRaw !== 'string') {
    throw new Error('Missing or invalid buyer_sku_code in Digiflazz product');
  }
  const sku: string = skuRaw;
  
  const titleRaw = item.product_name || item.name || item.buyer_sku_code || 'Unknown Product';
  const title: string = typeof titleRaw === 'string' ? titleRaw : 'Unknown Product';
  
  // Build description from available fields
  const descParts: string[] = [];
  if (item.description && typeof item.description === 'string') descParts.push(item.description);
  if (item.desc && typeof item.desc === 'string') descParts.push(item.desc);
  if (item.brand && typeof item.brand === 'string') descParts.push(`Brand: ${item.brand}`);
  if (item.type && typeof item.type === 'string') descParts.push(`Type: ${item.type}`);
  const description = descParts.length > 0 ? descParts.join('. ') : null;

  // Category: use category, or brand, or null
  const categoryRaw = item.category || item.brand;
  const category = (categoryRaw && typeof categoryRaw === 'string') ? categoryRaw : null;

  // Determine isActive
  let isActive = true;
  if (item.buyer_product_status !== undefined) {
    isActive = normalizeBoolean(item.buyer_product_status);
  }
  if (item.seller_product_status !== undefined) {
    isActive = isActive && normalizeBoolean(item.seller_product_status);
  }

  // Extract base price in IDR
  const priceIdrRaw = item.price || item.buyer_price || 0;
  const basePriceIdr = typeof priceIdrRaw === 'string' ? parseFloat(priceIdrRaw) : Number(priceIdrRaw) || 0;

  // Calculate price in RUB (will be used only for AUTO mode)
  const priceRub = calculatePriceRub(basePriceIdr);

  return {
    sku,
    title,
    description,
    category,
    provider: Provider.DIGIFLAZZ,
    isActive,
    imageUrl: null,
    basePriceIdr: Math.round(basePriceIdr),
    priceRub, // Will be conditionally updated based on priceMode
  };
}

export async function POST(request: Request) {
  try {
    // Check authorization
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const warnings: string[] = [];

    // Check env vars and add warnings if defaults are used
    if (!process.env.DIGIFLAZZ_IDR_TO_RUB) {
      warnings.push('DIGIFLAZZ_IDR_TO_RUB not set, using default: 1');
    }
    if (!process.env.DIGIFLAZZ_MARKUP_PCT) {
      warnings.push('DIGIFLAZZ_MARKUP_PCT not set, using default: 0');
    }
    if (!process.env.DIGIFLAZZ_MARKUP_RUB) {
      warnings.push('DIGIFLAZZ_MARKUP_RUB not set, using default: 0');
    }

    // Get all products from Digiflazz
    const digiflazzItems = await getAllDigiflazzProducts();
    const digiflazzTotal = digiflazzItems.length;

    console.log('[admin/digiflazz/sync-products] fetched', {
      total: digiflazzTotal,
    });

    // Map and upsert products
    let upserted = 0;
    let manualPreserved = 0;
    let autoRepriced = 0;
    const skuSet = new Set<string>();

    for (const item of digiflazzItems) {
      const productData = mapDigiflazzToProduct(item);
      
      if (!productData.sku) {
        console.warn('[admin/digiflazz/sync-products] skipping item without sku', item);
        continue;
      }

      skuSet.add(productData.sku);

      // Check existing product to determine priceMode
      const existingProduct = await prisma.product.findUnique({
        where: { sku: productData.sku },
        select: { priceMode: true, priceRub: true },
      });

      // Determine if we should update priceRub
      const shouldUpdatePrice = !existingProduct || existingProduct.priceMode === PriceMode.AUTO || existingProduct.priceMode === null;
      
      // Build update data
      const updateData: {
        title: string;
        description: string | null;
        category: string | null;
        provider: Provider;
        isActive: boolean;
        basePriceIdr: number | null;
        updatedAt: Date;
        priceRub?: number;
        priceMode?: PriceMode;
      } = {
        title: productData.title,
        description: productData.description,
        category: productData.category,
        provider: productData.provider,
        isActive: productData.isActive,
        basePriceIdr: productData.basePriceIdr,
        updatedAt: new Date(),
      };

      // Update priceRub only for AUTO mode (or null for old records)
      if (shouldUpdatePrice && productData.priceRub !== null) {
        updateData.priceRub = productData.priceRub;
        if (existingProduct) {
          autoRepriced++;
        }
      } else {
        // MANUAL mode - preserve existing priceRub
        manualPreserved++;
      }

      // Create data (always use calculated price for new products)
      const createData: {
        sku: string;
        title: string;
        description: string | null;
        category: string | null;
        provider: Provider;
        isActive: boolean;
        imageUrl: string | null;
        basePriceIdr: number | null;
        priceRub: number;
        priceMode: PriceMode;
      } = {
        sku: productData.sku,
        title: productData.title,
        description: productData.description,
        category: productData.category,
        provider: productData.provider,
        isActive: productData.isActive,
        imageUrl: productData.imageUrl,
        basePriceIdr: productData.basePriceIdr,
        priceRub: productData.priceRub ?? calculatePriceRub(productData.basePriceIdr ?? 0),
        priceMode: PriceMode.AUTO, // New products default to AUTO
      };

      await prisma.product.upsert({
        where: { sku: productData.sku },
        update: updateData,
        create: createData,
      });

      upserted++;
    }

    // Deactivate products that are no longer in Digiflazz price list
    const skuArray = Array.from(skuSet);
    const deactivatedResult = await prisma.product.updateMany({
      where: {
        provider: Provider.DIGIFLAZZ,
        sku: {
          notIn: skuArray,
        },
      },
      data: {
        isActive: false,
      },
    });

    const deactivated = deactivatedResult.count;

    // Get current counts from DB
    const dbTotalDigiflazz = await prisma.product.count({
      where: { provider: Provider.DIGIFLAZZ },
    });

    const dbActiveDigiflazz = await prisma.product.count({
      where: { provider: Provider.DIGIFLAZZ, isActive: true },
    });

    // Check for mismatch
    const mismatch = dbTotalDigiflazz !== digiflazzTotal;

    console.log('[admin/digiflazz/sync-products] completed', {
      digiflazz_total: digiflazzTotal,
      db_total: dbTotalDigiflazz,
      db_active: dbActiveDigiflazz,
      upserted,
      deactivated,
      manual_preserved: manualPreserved,
      auto_repriced: autoRepriced,
      mismatch,
    });

    const response = {
      digiflazz_total: digiflazzTotal,
      db_total_digiflazz: dbTotalDigiflazz,
      db_active_digiflazz: dbActiveDigiflazz,
      upserted,
      deactivated,
      manual_preserved: manualPreserved,
      auto_repriced: autoRepriced,
      warnings,
      ...(mismatch ? { mismatch: true } : {}),
    };

    if (mismatch) {
      return NextResponse.json(response, { status: 500 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[admin/digiflazz/sync-products] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
