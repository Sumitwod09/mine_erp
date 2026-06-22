import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/_next', '/api', '/favicon.ico', '/robots.txt'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public assets
  if (publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check login cookie
  const token = request.cookies.get('verp_token')?.value;
  const isLoggedIn = !!token;

  // Redirect logged-in users from homepage to dashboard
  if (pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect guests away from protected app routes
  if (pathname.startsWith('/(app)') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|api).*)',
  ],
];