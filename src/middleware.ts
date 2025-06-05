import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import axiosServer from "./lib/axios.server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const isAuthPage =
        request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup";
    // Skip middleware for auth pages
    if (isAuthPage) {
        return NextResponse.next();
    }

    try {
        // Using axiosServer instead of direct fetch
        console.log("Checking authentication...");
        
        // Use axiosServer to make the API call
        const response = await axiosServer.get("/api/v1/auth/me");
        
        // With axios, the data is already parsed as JSON
        const data = response.data;
        
        // If not authenticated (status not 200), redirect to signin
        if (!data.success) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Create NextResponse and only forward cookies header from API response
        const nextResponse = NextResponse.next();
        
        // Only forward cookies header from API response to client
        const cookies = response.headers?.['set-cookie'];
        if (cookies) {
            // Handle cookies correctly whether it's a string or array
            if (Array.isArray(cookies)) {
                cookies.forEach(cookie => {
                    nextResponse.headers.append('set-cookie', cookie);
                });
            } else {
                nextResponse.headers.set('set-cookie', cookies);
            }
        }
        
        return nextResponse;
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
