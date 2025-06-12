import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import axiosServer from "./lib/axios.server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const isAuthPage =
        request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup" ||
        request.nextUrl.pathname === "/about-us";
    // Skip middleware for auth pages
    if (isAuthPage) {
        return NextResponse.next();
    }

    try {
        // Use only the refresh endpoint for both authentication and cookie refresh
        console.log("Using refresh endpoint for authentication...");
        let response;
        try {
            response = await axiosServer.get("/api/v1/auth/refresh");
            console.log("Auth refresh status:", response.status);
            
            // If refresh is successful, we're authenticated
            if (response.data && response.data.success) {
                console.log("Authentication successful via refresh endpoint");
            } else {
                console.log("Refresh endpoint indicated auth failure");
                return NextResponse.redirect(new URL("/signin", request.url));
            }
        } catch (authError) {
            console.error("Authentication error:", authError);
            // If auth fails, redirect to signin
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Create NextResponse and forward cookies header from API response
        const nextResponse = NextResponse.next();
        
        // Get cookies directly from the refresh response
        const cookies = response.headers?.['set-cookie'];
        console.log("Response headers: ", response.headers);
        console.log("Cookies exists:", !!cookies);
        
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
