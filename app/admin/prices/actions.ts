'use server';

import { prisma } from '@/lib/prisma';
import { PriceMode } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface UpdatePriceResult {
  success: boolean;
  updated?: number;
  error?: string;
}

// Update single product price
export async function updateProductPrice(
  sku: string,
  priceMode: PriceMode,
  priceRub?: number
): Promise<UpdatePriceResult> {
  try {
    // Validate priceRub for MANUAL mode
    if (priceMode === PriceMode.MANUAL) {
      if (!priceRub || priceRub <= 0) {
        return {
          success: false,
          error: 'priceRub is required and must be > 0 for MANUAL mode',
        };
      }
    }

    const updateData: any = {
      priceMode,
    };

    // Only update priceRub if MANUAL mode
    if (priceMode === PriceMode.MANUAL && priceRub) {
      updateData.priceRub = priceRub;
    }

    await prisma.product.update({
      where: { sku },
      data: updateData,
    });

    revalidatePath('/admin/prices');
    return { success: true, updated: 1 };
  } catch (error) {
    console.error('[admin/prices] update error', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Bulk update products prices
export async function bulkUpdateProductPrices(
  skus: string[],
  priceMode: PriceMode,
  priceRub?: number
): Promise<UpdatePriceResult> {
  try {
    // Validate priceRub for MANUAL mode
    if (priceMode === PriceMode.MANUAL) {
      if (!priceRub || priceRub <= 0) {
        return {
          success: false,
          error: 'priceRub is required and must be > 0 for MANUAL mode',
        };
      }
    }

    const updateData: any = {
      priceMode,
    };

    // Only update priceRub if MANUAL mode
    if (priceMode === PriceMode.MANUAL && priceRub) {
      updateData.priceRub = priceRub;
    }

    const result = await prisma.product.updateMany({
      where: {
        sku: { in: skus },
      },
      data: updateData,
    });

    revalidatePath('/admin/prices');
    return { success: true, updated: result.count };
  } catch (error) {
    console.error('[admin/prices] bulk update error', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
