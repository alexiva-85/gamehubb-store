import { NextRequest, NextResponse } from 'next/server';
import { digiflazzStatus } from '@/lib/digiflazz';

// Use Node.js runtime for undici
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refId = searchParams.get('ref_id');

    // Validate ref_id
    if (!refId || refId.trim().length < 3) {
      return NextResponse.json(
        { error: 'ref_id is required and must be at least 3 characters' },
        { status: 400 }
      );
    }

    const result = await digiflazzStatus(refId.trim());

    // Check if request was successful (rc: 0 or success flag)
    if (result.rc !== '0' && result.rc !== 0 && !result.success) {
      // Log error without secrets
      console.error('[digiflazz/status] error', {
        ref_id: refId,
        rc: result.rc,
        message: result.data || result.message || 'Unknown error',
      });
      
      return NextResponse.json(
        result,
        { status: 502 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[digiflazz/status] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Failed to fetch Digiflazz transaction status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    );
  }
}

