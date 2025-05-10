import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './actions/authService'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup')
  
  // Skip middleware for auth pages
  if (isAuthPage) {
    return NextResponse.next()
  }

  try {
    // Create headers object from request
    const headers = new Headers()
    request.headers.forEach((value, key) => {
      headers.set(key, value)
    })

    // Check if user is authenticated
    const userData = await getCurrentUser(headers)
    
    // If not authenticated, redirect to signin
    if (!userData.success) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    // If authenticated, allow access
    return NextResponse.next()
  } catch (error) {
    // If there's an error checking auth, redirect to signin
    console.error('Auth check error:', error)
    return NextResponse.redirect(new URL('/signin', request.url))
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
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
