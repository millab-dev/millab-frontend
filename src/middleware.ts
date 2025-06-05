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
        // First, explicitly try to refresh the token if there's a refresh_token cookie
        // This is more reliable than relying on backend silent refresh
        const refreshToken = request.cookies.get('refresh_token');
        let refreshResponse;
        
        if (refreshToken) {
            try {
                console.log("Found refresh token, explicitly refreshing...");
                refreshResponse = await axiosServer.get("/api/v1/auth/refresh");
                console.log("Refresh response status:", refreshResponse.status);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                // Continue even if refresh fails - we'll check auth next
            }
        }
        
        // Now check authentication with the /me endpoint
        console.log("Checking authentication...");
        const response = await axiosServer.get("/api/v1/auth/me");
        
        // With axios, the data is already parsed as JSON
        const data = response.data;
        
        // If not authenticated (status not 200), redirect to signin
        if (!data.success) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Create NextResponse and forward cookies header from API response
        const nextResponse = NextResponse.next();
        
        // Try to get cookies from refresh response first, then from me response
        const responseWithCookies = refreshResponse?.headers?.['set-cookie'] ? 
            refreshResponse : response;
            
        const cookies = responseWithCookies.headers?.['set-cookie'];
        console.log("Response headers: ", responseWithCookies.headers);
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
