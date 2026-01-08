import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

/**
 * Debug endpoint to create test order (DEV/PREVIEW only)
 * POST /api/debug/create-order
 * Body: { userId, productSku, customerNo, totalAmount }
 */
export async function POST(request: NextRequest) {
  // Only allow in development or preview environments
  const isDev = process.env.NODE_ENV === 'development';
  const isPreview = process.env.VERCEL_ENV === 'preview';
  
  if (!isDev && !isPreview) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development or preview environments' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { userId, productSku, customerNo, totalAmount } = body;

    // Validate required fields
    if (!userId || !productSku || !customerNo || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, productSku, customerNo, totalAmount' },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        productSku,
        customerNo,
        totalAmount: parseInt(String(totalAmount), 10),
        status: 'PAID', // Assume paid for testing
      },
    });

    return NextResponse.json(
      {
        success: true,
        order: {
          id: order.id,
          userId: order.userId,
          productSku: order.productSku,
          customerNo: order.customerNo,
          totalAmount: order.totalAmount,
          status: order.status,
          digiflazzRefId: order.digiflazzRefId,
          createdAt: order.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[debug/create-order] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

