import { NextRequest, NextResponse } from 'next/server';

/**
 * Get admin key from request (query parameter or header)
 * @param req NextRequest
 * @returns admin key string or null
 */
export function getAdminKey(req: NextRequest): string | null {
  return req.nextUrl.searchParams.get('key') ?? req.headers.get('x-admin-key');
}

/**
 * Require admin authentication
 * @param req NextRequest
 * @returns NextResponse with 401 error if unauthorized, null if authorized
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const adminKey = process.env.ADMIN_KEY;
  
  // If ADMIN_KEY not set, allow (dev mode)
  if (!adminKey) {
    return null;
  }

  const keyFromRequest = getAdminKey(req);
  
  if (keyFromRequest !== adminKey) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return null;
}
