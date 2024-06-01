import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('email');

  // Redirect to sign-in if user is not signed in
  if (!request.nextUrl.pathname.startsWith('/sign-in') && !user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Redirect to dashboard if user is signed in
  if (request.nextUrl.pathname.startsWith('/sign-in') && user) {
    return NextResponse.redirect(new URL('/listen-now', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
