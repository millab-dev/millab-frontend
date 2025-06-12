import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const isAuthPage =
        request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup";
    
    const isCompleteProfilePage = request.nextUrl.pathname === "/complete-profile";
    
    // Skip middleware for auth pages
    if (isAuthPage) {
        return NextResponse.next();
    }

    try {
        // Create headers object from request
        const headers = new Headers();
        request.headers.forEach((value, key) => {
            headers.set(key, value);
        });

        // Direct fetch to check authentication
        const response = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
            }/api/v1/auth/me`,
            {
                headers,
                credentials: "include",
                cache: "no-store",
            }
        );

        const data = await response.json();

        // If not authenticated (status not 200), redirect to signin
        if (!data.success) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Check if user profile is incomplete
        const user = data.data;
        const needsProfile = !user.username || !user.gender || !user.birthplace || 
                            !user.birthdate || !user.socializationLocation || !user.phoneNumber;

        // If user needs to complete profile and not on complete-profile page
        if (needsProfile && !isCompleteProfilePage) {
            return NextResponse.redirect(new URL("/complete-profile", request.url));
        }

        // If user doesn't need profile completion but is on complete-profile page
        if (!needsProfile && isCompleteProfilePage) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // If authenticated and profile is complete (or on complete-profile page), allow access
        return NextResponse.next();
    } catch (error) {
        // If there's an error checking auth, redirect to signin
        console.error("Auth check error:", error);
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};
