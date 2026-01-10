import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Provider, PriceMode } from '@prisma/client';

export const runtime = 'nodejs';

// Check authorization
function checkAuth(request: NextRequest): boolean {
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

export async function GET(request: NextRequest) {
  try {
    // Check authorization
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const isActiveParam = searchParams.get('isActive');
    const priceModeParam = searchParams.get('priceMode');
    const providerParam = searchParams.get('provider') || 'DIGIFLAZZ';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(200, Math.max(1, parseInt(searchParams.get('pageSize') || '50', 10)));
    const sortParam = searchParams.get('sort') || 'updatedAt_desc';

    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: {
      provider: Provider;
      OR?: Array<{ sku: { contains: string; mode: 'insensitive' } } | { title: { contains: string; mode: 'insensitive' } }>;
      category?: string;
      isActive?: boolean;
      priceMode?: PriceMode;
    } = {
      provider: providerParam as Provider,
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
    if (isActiveParam === 'true') {
      where.isActive = true;
    } else if (isActiveParam === 'false') {
      where.isActive = false;
    }

    // priceMode filter
    if (priceModeParam && (priceModeParam === 'AUTO' || priceModeParam === 'MANUAL')) {
      where.priceMode = priceModeParam as PriceMode;
    }

    // Sort
    const [sortField, sortOrder] = sortParam.split('_');
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
        take: pageSize,
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

    return NextResponse.json({
      items: products,
      page,
      pageSize,
      total,
    });
  } catch (error) {
    console.error('[admin/products/prices] GET error', error);
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authorization
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { mode, sku, skus, priceMode, priceRub } = body;

    if (!mode || (mode !== 'single' && mode !== 'bulk')) {
      return NextResponse.json(
        { error: 'mode must be "single" or "bulk"' },
        { status: 400 }
      );
    }

    if (!priceMode || (priceMode !== 'AUTO' && priceMode !== 'MANUAL')) {
      return NextResponse.json(
        { error: 'priceMode must be "AUTO" or "MANUAL"' },
        { status: 400 }
      );
    }

    // Validate priceRub for MANUAL mode
    if (priceMode === 'MANUAL') {
      if (!priceRub || typeof priceRub !== 'number' || priceRub <= 0) {
        return NextResponse.json(
          { error: 'priceRub is required and must be > 0 for MANUAL mode' },
          { status: 400 }
        );
      }
    }

    let updated = 0;

    if (mode === 'single') {
      if (!sku) {
        return NextResponse.json(
          { error: 'sku is required for single mode' },
          { status: 400 }
        );
      }

      const updateData: {
        priceMode: PriceMode;
        priceRub?: number;
      } = {
        priceMode: priceMode as PriceMode,
      };

      // Only update priceRub if MANUAL mode
      if (priceMode === 'MANUAL' && priceRub) {
        updateData.priceRub = priceRub;
      }

      await prisma.product.update({
        where: { sku },
        data: updateData,
      });

      updated = 1;
    } else {
      // bulk mode
      if (!skus || !Array.isArray(skus) || skus.length === 0) {
        return NextResponse.json(
          { error: 'skus array is required for bulk mode' },
          { status: 400 }
        );
      }

      const updateData: {
        priceMode: PriceMode;
        priceRub?: number;
      } = {
        priceMode: priceMode as PriceMode,
      };

      // Only update priceRub if MANUAL mode
      if (priceMode === 'MANUAL' && priceRub) {
        updateData.priceRub = priceRub;
      }

      const result = await prisma.product.updateMany({
        where: {
          sku: { in: skus },
        },
        data: updateData,
      });

      updated = result.count;
    }

    return NextResponse.json({ updated });
  } catch (error) {
    console.error('[admin/products/prices] PATCH error', error);
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
