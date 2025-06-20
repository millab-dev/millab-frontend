import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('=== OAuth Redirect Handler ===');
    
    // Get parameters from query
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') || '/app';
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    console.log('🔄 Redirect destination:', destination);
    console.log('🔑 Received tokens:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken
    });

    // Create the response with redirect
    const response = NextResponse.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}${destination}`,
      { status: 302 }
    );

    // Set tokens as cookies if they are present
    if (accessToken) {
      response.cookies.set({
        name: 'access_token',
        value: accessToken,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 // 1 hours in seconds (same as backend)
      });
      console.log('🍪 Set access_token cookie');
    }

    if (refreshToken) {
      response.cookies.set({
        name: 'refresh_token',
        value: refreshToken,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 // 7 days in seconds (same as backend)
      });
      console.log('🍪 Set refresh_token cookie');
    }

    // Transfer any other cookies from the request
    const requestCookies = request.cookies;
    console.log('📝 Transferring other cookies to client');
    console.log('Cookies received:', requestCookies.getAll().map((cookie) => cookie.name));
    
    requestCookies.getAll().forEach((cookie) => {
      // Skip access_token and refresh_token since we've already set them
      if (cookie.name !== 'access_token' && cookie.name !== 'refresh_token') {
        response.cookies.set({
          name: cookie.name,
          value: cookie.value,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
      }
    });

    console.log('✅ Redirect with cookies setup successfully');
    return response;
  } catch (error) {
    console.error('💥 OAuth redirect error:', error);
    
    // Redirect to sign-in page with error if something goes wrong
    return NextResponse.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/signin?error=redirect_error`,
      { status: 302 }
    );
  }
}
