import { NextRequest, NextResponse } from 'next/server';
import { digiflazzPriceList } from '@/lib/digiflazz';

// Use Node.js runtime for undici
export const runtime = 'nodejs';

// Simple in-memory cache (60 seconds TTL)
let cachedPriceList: any = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function GET(request: NextRequest) {
  try {
    // Check cache
    const now = Date.now();
    if (cachedPriceList && (now - cacheTimestamp) < CACHE_TTL_MS) {
      return NextResponse.json({
        ...cachedPriceList,
        _cached: true,
      }, { status: 200 });
    }

    // Fetch fresh data
    const result = await digiflazzPriceList();

    // Update cache
    cachedPriceList = result;
    cacheTimestamp = now;

    // Check if request was successful (rc: 0 or success flag)
    if (result.rc !== '0' && result.rc !== 0 && !result.success) {
      return NextResponse.json(
        result,
        { status: 502 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[digiflazz/pricelist] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Failed to fetch Digiflazz price list',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    );
  }
}

