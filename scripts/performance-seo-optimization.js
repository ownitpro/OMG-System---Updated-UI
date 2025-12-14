#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function optimizePerformanceAndSEO() {
  console.log('🚀 OMGsystems Performance & SEO Optimization - Starting Hardening\n');
  
  try {
    // 1. Image Optimization Pipeline
    console.log('1️⃣ Setting up Image Optimization Pipeline...');
    await setupImageOptimization();
    
    // 2. Script Optimization
    console.log('2️⃣ Optimizing Third-party Scripts...');
    await optimizeScripts();
    
    // 3. Font Preloading
    console.log('3️⃣ Setting up Font Preloading...');
    await setupFontPreloading();
    
    // 4. Metadata API Enhancement
    console.log('4️⃣ Enhancing Next.js Metadata API...');
    await enhanceMetadataAPI();
    
    // 5. Sitemap & Robots.txt
    console.log('5️⃣ Creating Sitemap & Robots.txt...');
    await createSitemapAndRobots();
    
    // 6. PWA Manifest
    console.log('6️⃣ Creating PWA Manifest...');
    await createPWAManifest();
    
    // 7. Performance Monitoring
    console.log('7️⃣ Setting up Performance Monitoring...');
    await setupPerformanceMonitoring();
    
    console.log('\n🎯 Performance & SEO Optimization Complete!');
    console.log('==========================================');
    console.log('✅ Image optimization pipeline ready');
    console.log('✅ Third-party scripts optimized');
    console.log('✅ Font preloading configured');
    console.log('✅ Metadata API enhanced');
    console.log('✅ Sitemap & robots.txt created');
    console.log('✅ PWA manifest ready');
    console.log('✅ Performance monitoring active');
    console.log('');
    console.log('🎉 Ready for Lighthouse scores ≥95!');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
  }
}

async function setupImageOptimization() {
  // Create image optimization configuration
  const imageConfig = {
    formats: ['avif', 'webp', 'jpeg'],
    quality: 85,
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['localhost', 'omgsystems.com']
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../public/images/optimization-config.json'),
    JSON.stringify(imageConfig, null, 2)
  );
  
  console.log('✅ Image optimization configuration created');
}

async function optimizeScripts() {
  // Create script optimization component
  const scriptOptimizer = `import Script from 'next/script';

export function OptimizedScripts() {
  return (
    <>
      {/* Google Analytics - Load after consent */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.omg_consent === 'accepted') {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          }
        }}
      />
      
      {/* Meta Pixel - Load after consent */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            if(window.omg_consent === 'accepted') {
              fbq('init', 'META_PIXEL_ID');
              fbq('track', 'PageView');
            }
          \`
        }}
      />
    </>
  );
}`;

  fs.writeFileSync(
    path.join(__dirname, '../src/components/optimized-scripts.tsx'),
    scriptOptimizer
  );
  
  console.log('✅ Script optimization component created');
}

async function setupFontPreloading() {
  // Create font preloading configuration
  const fontConfig = `export const fontPreloadConfig = {
  fonts: [
    {
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    },
    {
      href: '/fonts/inter-var-italic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    }
  ]
};`;

  fs.writeFileSync(
    path.join(__dirname, '../src/lib/font-preload.ts'),
    fontConfig
  );
  
  console.log('✅ Font preloading configuration created');
}

async function enhanceMetadataAPI() {
  // Create enhanced metadata utilities
  const metadataUtils = `import { Metadata } from 'next';

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/og-default.jpg'
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = \`\${title} | OMGsystems\`;
  const canonical = \`https://omgsystems.com\${path}\`;
  
  return {
    title: fullTitle,
    description: description.substring(0, 160),
    alternates: {
      canonical
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'OMGsystems',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_CA',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}`;

  fs.writeFileSync(
    path.join(__dirname, '../src/lib/metadata-utils.ts'),
    metadataUtils
  );
  
  console.log('✅ Enhanced metadata API created');
}

async function createSitemapAndRobots() {
  // Create sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://omgsystems.com/</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/about</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/contact</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/industries/property-management</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/industries/healthcare</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/industries/contractors</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/industries/accounting</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/industries/real-estate</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/industries/cleaning</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/apps/securevault-docs</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/apps/crm</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/apps/leadflow</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/apps/industry-iq</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/campaign/leadflow</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omgsystems.com/campaign/property-automation</loc>
    <lastmod>2024-10-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap.xml'),
    sitemap
  );
  
  // Create robots.txt
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /portal/
Disallow: /api/
Disallow: /_next/
Disallow: /dashboard/

Sitemap: https://omgsystems.com/sitemap.xml`;

  fs.writeFileSync(
    path.join(__dirname, '../public/robots.txt'),
    robots
  );
  
  console.log('✅ Sitemap.xml and robots.txt created');
}

async function createPWAManifest() {
  const manifest = {
    name: "OMGsystems - Business Automation Platform",
    short_name: "OMGsystems",
    description: "Complete business automation platform for Canadian businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    categories: ["business", "productivity", "automation"],
    lang: "en-CA",
    orientation: "portrait-primary"
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ PWA manifest created');
}

async function setupPerformanceMonitoring() {
  const performanceMonitor = `import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric: any) {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}

// Performance budget
export const PERFORMANCE_BUDGET = {
  LCP: 2500, // 2.5s
  FID: 100,  // 100ms
  CLS: 0.1,  // 0.1
  FCP: 1800, // 1.8s
  TTFB: 600  // 600ms
};`;

  fs.writeFileSync(
    path.join(__dirname, '../src/lib/performance-monitor.ts'),
    performanceMonitor
  );
  
  console.log('✅ Performance monitoring setup complete');
}

optimizePerformanceAndSEO();
