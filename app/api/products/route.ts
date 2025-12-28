import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fallbackProducts } from '@/lib/fallbackProducts';

export async function GET() {
  try {
    // Try to fetch products from database
    const dbProducts = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { category: 'asc' },
        { title: 'asc' },
      ],
    });

    // If database has products, return them
    if (dbProducts.length > 0) {
      return NextResponse.json({
        source: 'db',
        items: dbProducts,
      });
    }

    // Fallback: return hardcoded products if database is empty
    return NextResponse.json({
      source: 'fallback',
      items: fallbackProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // On error, return fallback products to ensure catalog is never empty
    return NextResponse.json({
      source: 'fallback',
      items: fallbackProducts,
    });
  }
}

