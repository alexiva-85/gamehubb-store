import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

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
  } catch (error) {
    console.error('GET /api/products error', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}



