import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Provider, PriceMode } from '@prisma/client';
import { requireAdmin } from '@/lib/adminAuth';
import crypto from 'crypto';
import { ProxyAgent, request } from 'undici';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

const DIGIFLAZZ_BASE_URL = 'https://api.digiflazz.com/v1';
const DIGIFLAZZ_USERNAME = process.env.DIGIFLAZZ_USERNAME;
const DIGIFLAZZ_API_KEY = process.env.DIGIFLAZZ_API_KEY;
const FIXIE_URL = process.env.FIXIE_URL;

// Create proxy agent for Digiflazz requests
const getProxyAgent = () => {
  if (!FIXIE_URL) {
    return undefined;
  }
  return new ProxyAgent(FIXIE_URL);
};

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

interface DigiflazzResponse {
  rc?: string | number;
  data?: unknown;
  [key: string]: unknown;
}

// Calculate price in RUB from IDR
function calculatePriceRub(priceIdr: number): number {
  const idrToRub = parseFloat(process.env.DIGIFLAZZ_IDR_TO_RUB || '1');
  const markupPct = parseFloat(process.env.DIGIFLAZZ_MARKUP_PCT || '0');
  const markupRub = parseInt(process.env.DIGIFLAZZ_MARKUP_RUB || '0', 10);

  const priceRub = Math.ceil(priceIdr * idrToRub * (1 + markupPct)) + markupRub;
  return Math.max(1, priceRub); // Ensure at least 1 rub
}


// Fetch Mobile Legends products from Digiflazz
async function fetchMobileLegendsProducts(): Promise<DigiflazzProduct[]> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }

  // Signature: md5(username + apiKey + "pricelist")
  const signatureData = `${DIGIFLAZZ_USERNAME}${DIGIFLAZZ_API_KEY}pricelist`;
  const signature = crypto.createHash('md5').update(signatureData).digest('hex');

  const url = `${DIGIFLAZZ_BASE_URL}/price-list`;
  const proxyAgent = getProxyAgent();

  // Request all prepaid products (Digiflazz may not support category/brand filters in request)
  const body = {
    cmd: 'prepaid',
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
  };

  const response = await request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    dispatcher: proxyAgent,
  });

  const data = await response.body.json() as unknown;
  
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid response format from Digiflazz: response is not an object');
  }

  const responseData = data as DigiflazzResponse;

  // Log diagnostics (safe, no secrets)
  const hasRc = 'rc' in responseData;
  const hasData = 'data' in responseData;
  const dataIsArray = Array.isArray(responseData.data);
  const dataLength = dataIsArray ? (responseData.data as unknown[]).length : 0;
  
  console.log('[admin/digiflazz/sync/mobile-legends] response diagnostics', {
    status: response.statusCode,
    responseType: typeof responseData,
    hasRc,
    rc: hasRc ? responseData.rc : undefined,
    hasData,
    dataIsArray,
    dataLength,
    responseKeys: Object.keys(responseData).filter(k => k !== 'data' && k !== 'rc'),
  });

  // Validate rc only if it exists
  if (hasRc && responseData.rc !== undefined && responseData.rc !== null) {
    const rc = responseData.rc;
    // rc can be '0', 0, or '00' for success
    if (rc !== '0' && rc !== 0 && rc !== '00') {
      const errorMessage = typeof responseData === 'object' && 'message' in responseData 
        ? String(responseData.message) 
        : undefined;
      const errorDetails = errorMessage 
        ? `Digiflazz API error: rc=${rc}, message=${errorMessage}`
        : `Digiflazz API error: rc=${rc}`;
      throw new Error(errorDetails);
    }
  }

  // Extract products from response
  // Success is determined by presence of data array, not just rc
  let allProducts: DigiflazzProduct[] = [];

  if (Array.isArray(responseData.data)) {
    allProducts = responseData.data as DigiflazzProduct[];
  } else if (responseData.data && typeof responseData.data === 'object') {
    const dataObj = responseData.data as Record<string, unknown>;
    if (Array.isArray(dataObj.items)) {
      allProducts = dataObj.items as DigiflazzProduct[];
    } else if (Array.isArray(dataObj.data)) {
      allProducts = dataObj.data as DigiflazzProduct[];
    }
  }

  // If no products found and data exists but is not an array, it's an error
  if (allProducts.length === 0 && responseData.data && !Array.isArray(responseData.data)) {
    const responseKeys = Object.keys(responseData).filter(k => k !== 'data' && k !== 'rc');
    const errorDetails = [
      'Digiflazz response has data but it is not an array',
      `Response keys: ${responseKeys.join(', ')}`,
      responseData.message ? `Message: ${responseData.message}` : null,
      responseData.error ? `Error: ${responseData.error}` : null,
    ].filter(Boolean).join('. ');
    throw new Error(errorDetails);
  }

  // Filter for Mobile Legends products: category === 'Games' and brand === 'MOBILE LEGENDS'
  const mobileLegendsProducts = allProducts.filter((item) => {
    const category = item.category;
    const brand = item.brand;
    
    // Check if category is 'Games' (case-insensitive)
    const categoryMatch = category && typeof category === 'string' && 
      category.toLowerCase().trim() === 'games';
    
    // Check if brand is 'MOBILE LEGENDS' (case-insensitive)
    const brandMatch = brand && typeof brand === 'string' && 
      brand.toUpperCase().trim() === 'MOBILE LEGENDS';
    
    return categoryMatch && brandMatch;
  });

  return mobileLegendsProducts;
}

export async function POST(req: NextRequest) {
  try {
    // Check admin authorization
    const authError = requireAdmin(req);
    if (authError) {
      return authError;
    }

    // Fetch Mobile Legends products from Digiflazz
    const digiflazzProducts = await fetchMobileLegendsProducts();

    console.log('[admin/digiflazz/sync/mobile-legends] fetched', {
      count: digiflazzProducts.length,
    });

    let imported = 0;
    let updated = 0;
    let skipped = 0;

    // Get existing Mobile Legends SKUs to preserve their isActive status and priceMode
    const existingProducts = await prisma.product.findMany({
      where: {
        category: 'Games',
        provider: Provider.DIGIFLAZZ,
      },
      select: {
        sku: true,
        isActive: true,
        priceMode: true,
      },
    });

    const existingSkuMap = new Map<string, { isActive: boolean; priceMode: PriceMode | null }>();
    for (const product of existingProducts) {
      existingSkuMap.set(product.sku, {
        isActive: product.isActive,
        priceMode: product.priceMode,
      });
    }

    // Process each product
    for (const item of digiflazzProducts) {
      const skuRaw = item.buyer_sku_code || item.sku_code || '';
      if (!skuRaw || typeof skuRaw !== 'string') {
        skipped++;
        continue;
      }

      const sku = skuRaw;
      const titleRaw = item.product_name || item.name || sku;
      const title = typeof titleRaw === 'string' ? titleRaw : sku;

      // Build description
      const descParts: string[] = [];
      if (item.description && typeof item.description === 'string') descParts.push(item.description);
      if (item.desc && typeof item.desc === 'string') descParts.push(item.desc);
      if (item.brand && typeof item.brand === 'string') descParts.push(`Brand: ${item.brand}`);
      if (item.type && typeof item.type === 'string') descParts.push(`Type: ${item.type}`);
      const description = descParts.length > 0 ? descParts.join('. ') : null;

      // Extract base price in IDR
      const priceIdrRaw = item.price || item.buyer_price || 0;
      const basePriceIdr = typeof priceIdrRaw === 'string' ? parseFloat(priceIdrRaw) : Number(priceIdrRaw) || 0;

      // Calculate price in RUB
      const priceRub = calculatePriceRub(basePriceIdr);

      // Preserve isActive for existing products, new ones are inactive
      const existing = existingSkuMap.get(sku);
      const isActive = existing ? existing.isActive : false;
      const shouldUpdatePrice = !existing || existing.priceMode === PriceMode.AUTO || existing.priceMode === null;

      // Upsert product
      const updateData: {
        title: string;
        description: string | null;
        category: string;
        provider: Provider;
        basePriceIdr: number;
        updatedAt: Date;
        priceRub?: number;
      } = {
        title,
        description,
        category: 'Games',
        provider: Provider.DIGIFLAZZ,
        basePriceIdr: Math.round(basePriceIdr),
        updatedAt: new Date(),
      };

      // Only update priceRub if mode is AUTO (or null for old records)
      if (shouldUpdatePrice) {
        updateData.priceRub = priceRub;
      }

      await prisma.product.upsert({
        where: { sku },
        create: {
          sku,
          title,
          description,
          category: 'Games',
          provider: Provider.DIGIFLAZZ,
          isActive,
          imageUrl: null,
          basePriceIdr: Math.round(basePriceIdr),
          priceRub,
          priceMode: PriceMode.AUTO,
        },
        update: updateData,
      });

      if (existingSkuMap.has(sku)) {
        updated++;
      } else {
        imported++;
      }
    }

    return NextResponse.json({
      imported,
      updated,
      skipped,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorName = error instanceof Error ? error.name : 'Unknown';
    
    console.error('[admin/digiflazz/sync/mobile-legends] error', {
      message: errorMessage,
      name: errorName,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Always return JSON with error and details
    return NextResponse.json(
      {
        error: 'Internal error',
        details: errorMessage,
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
