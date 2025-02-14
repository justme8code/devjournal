import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getCookie} from "@/app/axios";


const COOKIE_NAME = 'tech-tide-auth-cookie';

export function middleware(request: NextRequest) {
    const jwt = getCookie(COOKIE_NAME);  // Get the cookie using utility function

    if (request.nextUrl.pathname === '/tech-tider/create-new-content' && !jwt) {
        // If no JWT token or invalid JWT, redirect to the login page
        return NextResponse.redirect(new URL('/tech-tider', request.url));
    }

    // Allow the request to continue if authorized
    return NextResponse.next();
}

export const config = {
    matcher: '/tech-tider/create-new-content',  // Only apply this middleware to this route
};
