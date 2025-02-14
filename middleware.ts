import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'tech-tide-auth-cookie';

export function middleware(request: NextRequest) {
    const jwt = request.cookies.get(COOKIE_NAME)?.value;  // Access the cookie
    const path = request.nextUrl.pathname;  // Current page path

    // Only secure the /tech-tider/create-new-content route
    if (path === '/tech-tider/create-new-content' && !jwt) {
        // If no JWT token and trying to access create-new-content, redirect to login
        return NextResponse.redirect(new URL('/tech-tider', request.url));
    }

    // Allow the request to continue if the user is authorized or if it's any other route
    return NextResponse.next();
}

// Adjusted config to apply middleware only to the create-new-content route
export const config = {
    matcher: '/tech-tider/create-new-content',  // Only apply to this route
};
