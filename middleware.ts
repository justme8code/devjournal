import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'tech-tide-auth-cookie';
export function middleware(request: NextRequest) {
   /* console.log('Running middleware');
    console.log('Cookies:', request.cookies);

    const jwt = request.cookies.get(COOKIE_NAME)?.value;  // Access the cookie

    const path = request.nextUrl.pathname;  // Current page path

    // If no JWT is found and user is not on the login page, redirect to login
    if (!jwt && path === '/tech-tider/create-new-content') {
        return NextResponse.redirect(new URL('/tech-tider', request.url));
    }

    if(jwt && path === '/tech-tider') {
        return NextResponse.redirect(new URL('/tech-tider/create-new-content', request.url));
    }*/

    // Allow the request to continue if no redirects are needed
    return NextResponse.next();
}

// Adjusted config to apply middleware to both the root and project routes
export const config = {
    matcher: [''], // The correct matcher pattern
};
