import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

/**
 * GET /api/products
 * Публичный endpoint для получения списка товаров.
 * Не требует авторизации - каталог можно отдавать без initData.
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(
      products.map((p: { id: number; name: string; description: string | null; priceCents: number; currency: string; isActive: boolean; imageUrl: string | null }) => ({
        id: p.id,
        title: p.name,
        description: p.description,
        priceKopeks: p.priceCents,
        currency: p.currency,
        available: p.isActive,
        imageUrl: p.imageUrl,
      })),
    );
  } catch (error: unknown) {
    // Логируем реальную причину в server logs (без initData)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('GET /api/products error:', {
      message: errorMessage,
      stack: errorStack,
      // Не логируем initData или другие секреты
    });

    // Возвращаем JSON с code + message (без секретов)
    return NextResponse.json(
      {
        code: 'PRODUCTS_FETCH_ERROR',
        message: 'Failed to load products',
        // Не возвращаем детали ошибки в production для безопасности
        ...(process.env.NODE_ENV === 'development' ? { detail: errorMessage } : {}),
      },
      { status: 500 }
    );
  }
}



