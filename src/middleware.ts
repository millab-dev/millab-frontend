import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import axiosServer from "./lib/axios.server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    console.log("middleware")
    
    const isAuthPage =
        request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup" ||
        request.nextUrl.pathname === "/about-us" ||
        request.nextUrl.pathname === "/";
    
    const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
    
    // Skip middleware for auth pages
    if (isAuthPage) {
        return NextResponse.next();
    }

    try {
        // Use the /me endpoint to check if user is authenticated
        console.log("Checking authentication via /me endpoint...");
        let response;
        try {
            response = await axiosServer.get("/api/v1/auth/me");
            console.log("Auth check status:", response.status);
            
            // If /me is successful, we're authenticated
            if (response.data && response.data.success) {
                console.log("Authentication successful via /me endpoint");
                
                // Additional check for admin pages
                if (isAdminPage) {
                    const user = response.data.data;
                    if (!user.isAdmin) {
                        console.log("Non-admin user trying to access admin page");
                        return NextResponse.redirect(new URL("/app", request.url));
                    }
                    console.log("Admin access granted");
                }
            } else {
                console.log("/me endpoint indicated auth failure");
                return NextResponse.redirect(new URL("/signin", request.url));
            }
        } catch (authError) {
            console.error("Authentication error:", authError);
            // If auth fails, redirect to signin
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        // Create NextResponse and forward cookies header from API response
        const nextResponse = NextResponse.next();
        
        // Get cookies directly from the /me response (in case backend refreshes tokens)
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
         * Match root path explicitly
         */
        
        /*
         * Match all other request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - member/ (team member images)
         * - Any files with image extensions
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|member|.*\.png|.*\.jpg|.*\.jpeg|.*\.gif|.*\.svg|public).*)",
    ],
};
