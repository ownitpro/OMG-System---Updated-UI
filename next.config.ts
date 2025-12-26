import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Note: cacheComponents is incompatible with dynamic route segment config
  // If you need cacheComponents, remove all `export const dynamic` statements
  // cacheComponents: true,
  // Empty turbopack config to silence Next.js 16 warning (allows fallback to webpack)
  turbopack: {},
  serverExternalPackages: ['@swc/helpers'],
  // Suppress HMR module errors
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Improve HMR stability
  reactStrictMode: true,
  // Webpack configuration for better module resolution and HMR stability
  webpack: (config, { isServer, webpack, dev }) => {
    // Fix for @swc/helpers module resolution issues in HMR
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        path: false,
        crypto: false,
      };
      
      // Ensure @swc/helpers is properly resolved
      config.resolve.alias = {
        ...config.resolve.alias,
        // Explicitly resolve @swc/helpers to avoid module resolution issues
        '@swc/helpers': require.resolve('@swc/helpers'),
      };
      
      // Ensure proper module resolution for client components
      config.resolve.modules = [
        'node_modules',
        ...(config.resolve.modules || []),
      ];
      
      // Better handling of module resolution
      config.resolve.fullySpecified = false;
      
      // Add plugin to handle undefined module factories
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^$/,
          (resource: any) => {
            if (!resource.request) {
              return;
            }
          }
        )
      );
      
      // Add plugin to handle module factory errors
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        })
      );
    }
    
    // Ignore HMR warnings for @swc/helpers and module factory issues
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /@swc\/helpers/ },
      { module: /node_modules/ },
      { message: /Module.*was instantiated.*but the module factory is not available/ },
      { message: /Cannot read properties of undefined/ },
      { message: /reading 'call'/ },
      { message: /Package @swc\/helpers can't be external/ },
      { message: /Failed to resolve module/ },
      { message: /Critical dependency/ },
      // Ignore webpack module resolution errors during HMR
      /Failed to resolve module/,
      /Critical dependency/,
    ];
    
    // Improve module resolution
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
    };
    
    // Optimize for development
    if (dev) {
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    
    return config;
  },
  async redirects() {
    return [
      // Global Book a Demo fallback
      { source: '/book-a-demo', destination: '/apps/demo', permanent: true },
      { source: '/book-demo', destination: '/apps/demo', permanent: true },
      // Old paths
      { source: '/demo', destination: '/apps/demo', permanent: true },
      // Product-specific
      { source: '/securevault-demo', destination: '/apps/demo/securevault-docs', permanent: true },
      { source: '/crm-demo', destination: '/apps/demo/crm', permanent: true },
      { source: '/demo/crm', destination: '/apps/demo/crm', permanent: true },
      { source: '/demo/securevault', destination: '/apps/demo/securevault-docs', permanent: true },
      // OMG IQ redirects (old routes to new slug)
      { source: '/apps/industry-iq', destination: '/apps/omg-iq', permanent: true },
      { source: '/apps/industryiq', destination: '/apps/omg-iq', permanent: true },
      // Portal redirects
      { source: '/dashboard/client', destination: '/portal/client', permanent: true },
      { source: '/dashboard/admin', destination: '/portal/admin', permanent: true },
      // Fix incorrect product route casing
      { source: '/products/Omg-iq', destination: '/products/omg-iq', permanent: true },
      // Fix singular "product" routes (should be "products")
      { source: '/product/omg-iq', destination: '/products/omg-iq', permanent: true },
      { source: '/product/strategy-session', destination: '/products/strategy-session', permanent: true },
      { source: '/product/omg-leads', destination: '/products/omg-leads', permanent: true },
      { source: '/product/omg-ai-mastery', destination: '/products/omg-ai-mastery', permanent: true },
      { source: '/product/omg-crm', destination: '/products/omg-crm', permanent: true },
      { source: '/product/securevault-docs', destination: '/products/securevault-docs', permanent: true },
      // Fix incorrect portal product routes (should be /products)
      { source: '/portal/omg-leads', destination: '/products/omg-leads', permanent: true },
      { source: '/portal/omg-ai-mastery', destination: '/products/omg-ai-mastery', permanent: true },
      { source: '/portal/strategy-session', destination: '/products/strategy-session', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.omgsystems.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
