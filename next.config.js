/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // This ensures the Next.js app can be built in environments 
  // without the specific platform binaries
  swcMinify: true,
};

module.exports = nextConfig;
