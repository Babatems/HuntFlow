import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // HuntFlow custom login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAccessingDashboard = nextUrl.pathname.startsWith('/dashboard');

      // Protect all /dashboard routes
      if (isAccessingDashboard && !isLoggedIn) {
        return false; // Will redirect to /login
      }

      // If logged in and visiting a non-protected route (like /login), redirect to dashboard
      if (!isAccessingDashboard && isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Providers are defined in auth.ts
} satisfies NextAuthConfig;
