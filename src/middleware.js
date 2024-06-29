import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard'];

// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
    console.log('-----------inside middleware---------')
    const sessionCookie = request.cookies.get("test-user");
    // console.log(sessionCookie);

    // console.log(request.nextUrl);

    // Not authenticated, redirect to home page
    if (!sessionCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    }

    // // authenticated, redirect to dashboard page
    // if (sessionCookie && protectedRoutes.includes(request.nextUrl.pathname)) {
    //     return NextResponse.redirect(new URL('/', request.nextUrl.origin))
    // }
    return;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};