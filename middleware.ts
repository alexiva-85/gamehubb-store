import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /cart to /cart/
  if (pathname === '/cart') {
    return NextResponse.redirect(new URL('/cart/', request.url));
  }

  // Redirect /checkout to /checkout/
  if (pathname === '/checkout') {
    return NextResponse.redirect(new URL('/checkout/', request.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/checkout'],
};

