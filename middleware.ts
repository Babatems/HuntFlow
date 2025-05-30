// middleware.ts - Protects HuntFlow routes using Supabase Auth

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Check if the user has a Supabase session token cookie
  const accessToken = req.cookies.get('sb-access-token')?.value;

  // If no access token and the user is trying to access protected routes
  if (!accessToken && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/applications/:path*', '/jobs/:path*'],
};
