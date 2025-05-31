import type { NextConfig } from "next";

// Access environment variables at build time
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  // Add rewrites for API proxying
  async rewrites() {
    return [
      {
        // Handle direct API calls to our own domain
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
