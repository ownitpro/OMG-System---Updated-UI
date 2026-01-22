const withSerwist = require('@serwist/next').default({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  reloadOnOnline: true,
  cacheOnNavigation: true,
  disable: process.env.NODE_ENV !== 'production' || !!process.env.TURBOPACK, // Disable in dev or if Turbopack is active
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},
  // Skip TypeScript errors during build (library type issues)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Increase body size limit for file uploads (50MB)
  serverExternalPackages: ['sharp'],
  // Force Next.js to bundle pg
  transpilePackages: ['pg'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Security & SEO headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // Allow camera for profile selfie feature
        { key: 'Permissions-Policy', value: 'camera=(self), microphone=(), geolocation=(), interest-cohort=()' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ]
    },
    // Cache static assets
    {
      source: '/icons/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    },
    // Service worker headers
    {
      source: '/sw.js',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        { key: 'Service-Worker-Allowed', value: '/' }
      ]
    }
  ]
}

module.exports = withSerwist(nextConfig)

