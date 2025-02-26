import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const jwtCookie = (await cookies()).get('jwt_token');
    const path = request.nextUrl.pathname;

    // Define protected routes that require authentication
    const protectedRoutes = [
        /^\/contents\/\d+\/edit$/, // Protects /contents/{id}/edit
        /^\/contents\/create$/,    // Protects /contents/create
    ];

    const isProtectedRoute = protectedRoutes.some(route => route.test(path));

    if (isProtectedRoute && !jwtCookie) {
        console.warn(`Unauthorized access attempt to ${path}. Redirecting to login.`);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Apply middleware to relevant routes
export const config = {
    matcher: ['/contents/:path*'],
};
