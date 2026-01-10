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

  const body = {
    cmd: 'prepaid',
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
    category: 'Games',
    brand: 'MOBILE LEGENDS',
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
    throw new Error('Invalid response format from Digiflazz');
  }

  const responseData = data as DigiflazzResponse;

  // Extract products from response
  if (responseData.rc !== '0' && responseData.rc !== 0) {
    throw new Error(`Digiflazz API error: rc=${responseData.rc}`);
  }

  if (!responseData.data) {
    return [];
  }

  if (Array.isArray(responseData.data)) {
    return responseData.data as DigiflazzProduct[];
  }

  if (typeof responseData.data === 'object') {
    const dataObj = responseData.data as Record<string, unknown>;
    if (Array.isArray(dataObj.items)) {
      return dataObj.items as DigiflazzProduct[];
    }
    if (Array.isArray(dataObj.data)) {
      return dataObj.data as DigiflazzProduct[];
    }
  }

  return [];
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
    console.error('[admin/digiflazz/sync/mobile-legends] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Internal error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
