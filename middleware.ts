import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {cookies} from "next/headers";


export async function middleware(request: NextRequest) {


    const jwt = ((await cookies()).get('jwt_token'));
    const path = request.nextUrl.pathname;

    const protectedRoutes = ['/tech-tider/create-new-content'];
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    if (isProtectedRoute && !jwt) {
        console.log('No JWT token found. Redirecting to login.');
        return NextResponse.redirect(new URL('/tech-tider', request.url));
    }

    if (isProtectedRoute && jwt) {
        console.log('JWT token present for protected route. Allowing access.');
    }

    return NextResponse.next();
}

// Configure middleware to run on specific routes
export const config = {
    matcher: ['/tech-tider/create-new-content'],
};