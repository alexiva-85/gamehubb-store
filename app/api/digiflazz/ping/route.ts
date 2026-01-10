import { NextResponse } from 'next/server';
import { digiflazzBalance } from '@/lib/digiflazz';

// Use Node.js runtime for undici
export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await digiflazzBalance();

    // Check if request was successful (rc: 0 or success flag)
    if (result.rc !== '0' && result.rc !== 0 && !result.success) {
      return NextResponse.json(
        result,
        { status: 502 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[digiflazz/ping] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Failed to connect to Digiflazz',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    );
  }
}

