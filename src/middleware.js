import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/moods', '/family', '/profile'];

export default async function middleware(request) {
    const sessionCookie = request.cookies.get("session");

    // Not authenticated, redirect to home page
    if (!sessionCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    return;
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};