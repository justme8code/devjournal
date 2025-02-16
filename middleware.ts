import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'tech-tide-auth-cookie';

export function middleware(request: NextRequest) {
    // Retrieve the JWT cookie
    const jwt = request.cookies.get(COOKIE_NAME)?.value;
    const path = request.nextUrl.pathname;
    console.log('Cookies:', request.cookies.getAll());

    // Define protected routes
    const protectedRoutes = ['/tech-tider/create-new-content','/contents'];

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // If it's a protected route and no JWT is present
    if (isProtectedRoute && !jwt) {
        console.log('No JWT token found. Redirecting to login.');
        return NextResponse.redirect(new URL('/tech-tider', request.url));
    }

    // Additional logging for debugging...
    if (isProtectedRoute && jwt) {
        console.log('JWT token present for protected route. Allowing access.');
    }

    // Allow the request to continue
    return NextResponse.next();
}

// Configure middleware to run on specific routes
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};