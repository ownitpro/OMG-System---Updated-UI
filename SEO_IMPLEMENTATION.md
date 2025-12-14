# Global SEO & Discoverability Package - Implementation Guide

This document outlines the comprehensive SEO implementation for the OMGsystems website, including all the features and optimizations that have been implemented.

## 🎯 Overview

The Global SEO & Discoverability Package includes:
- Sitewide meta defaults and layout-level SEO configuration
- Per-page metadata with titles, descriptions, and canonical URLs
- JSON-LD structured data for enhanced search visibility
- Dynamic robots.txt and sitemap.xml generation
- Server-side OG image generation
- Analytics consent management
- Performance monitoring and Core Web Vitals tracking
- UTM handling and campaign landing pages
- Custom error pages and accessibility improvements

## 📁 File Structure

```
src/
├── lib/
│   ├── seo.ts                    # Core SEO configuration and constants
│   ├── metadata.ts               # Page-specific metadata generators
│   └── utm.ts                    # UTM parameter handling
├── components/
│   ├── analytics/
│   │   └── consent-banner.tsx    # Analytics consent management
│   ├── performance/
│   │   └── performance-monitor.tsx # Core Web Vitals monitoring
│   └── campaign/
│       └── campaign-landing.tsx  # Campaign landing page template
├── app/
│   ├── layout.tsx                # Root layout with global SEO
│   ├── page.tsx                  # Homepage with FAQ structured data
│   ├── not-found.tsx             # Custom 404 page
│   ├── error.tsx                 # Custom 500 page
│   ├── status/page.tsx           # System status page
│   ├── thank-you/page.tsx        # Campaign conversion thank you page
│   ├── campaign/
│   │   └── property-automation/page.tsx # Example campaign landing
│   ├── robots.txt/route.ts       # Dynamic robots.txt generation
│   ├── sitemap.xml/route.ts      # Dynamic sitemap.xml generation
│   └── og/[slug]/route.tsx       # Dynamic OG image generation
└── scripts/
    └── test-seo.js               # Comprehensive SEO testing script
```

## 🔧 Core Components

### 1. SEO Configuration (`src/lib/seo.ts`)

Central configuration for all SEO-related settings:

```typescript
export const SEO_CONFIG = {
  brand: {
    name: "OMGsystems",
    logoUrl: "https://www.omgsystems.com/logo.png",
    linkedin: "https://www.linkedin.com/company/omgsystems",
    contactEmail: "support@omgsystems.com",
  },
  defaults: {
    titleTemplate: "%s | OMGsystems",
    description: "Automation and CRM for property management, real estate, contractors, healthcare, accounting, and cleaning...",
    locale: "en-CA",
    canonicalBase: "https://www.omgsystems.com",
    themeColor: "#0B1220",
  },
  // ... more configuration
};
```

### 2. Metadata Generators (`src/lib/metadata.ts`)

Page-specific metadata generation functions:

- `generatePageMetadata()` - Generic page metadata
- `generateIndustryMetadata()` - Industry page metadata
- `generateAppMetadata()` - App page metadata
- `generateDemoMetadata()` - Demo page metadata
- `generateStaticPageMetadata()` - Static page metadata

Structured data generators:

- `generateServiceSchema()` - Service schema for industry pages
- `generateProductSchema()` - Product schema for app pages
- `generateFAQSchema()` - FAQ schema for pages with FAQs
- `generateBreadcrumbSchema()` - Breadcrumb schema for navigation

### 3. Root Layout (`src/app/layout.tsx`)

Global SEO implementation including:

- Sitewide meta defaults
- JSON-LD for Organization and WebSite
- Font preloading for performance
- Skip-to-content link for accessibility
- Consent banner integration
- Performance monitoring

### 4. Dynamic Routes

#### Robots.txt (`src/app/robots.txt/route.ts`)
```typescript
export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

Disallow: /admin/*
Disallow: /portal/*
Disallow: /api/*

Sitemap: https://www.omgsystems.com/sitemap.xml
`;
  return new Response(robotsTxt.trim(), {
    headers: { "Content-Type": "text/plain" },
  });
}
```

#### Sitemap.xml (`src/app/sitemap.xml/route.ts`)
Dynamic sitemap generation with:
- All important pages included
- Appropriate priority values
- Last modified dates
- Proper XML structure

#### OG Images (`src/app/og/[slug]/route.tsx`)
Server-side OG image generation with:
- Custom layouts for different page types
- Brand colors and styling
- Dynamic content based on page data
- Industry icons and app glyphs

## 🎨 OG Image System

The OG image system generates custom social media images for each page:

### Features:
- **Dark gradient background** with brand colors
- **Logo and brand name** prominently displayed
- **Dynamic titles and subtitles** based on page content
- **Accent lines** for visual appeal
- **Industry icons** for industry pages
- **App glyphs** for app pages
- **Consistent branding** across all images

### Usage:
```typescript
// Generate OG image URL
const ogImageUrl = generateOGImage("property-management", "industry");

// In metadata
openGraph: {
  images: [{ url: ogImageUrl, width: 1200, height: 630 }]
}
```

## 📊 Analytics & Consent

### Consent Banner (`src/components/analytics/consent-banner.tsx`)

Features:
- **Two-tier consent**: Analytics (default off) and Functional (always on)
- **Do-Not-Track respect**: Automatically disables analytics if DNT is enabled
- **Local storage**: Remembers user preferences
- **Event tracking**: Fires `page_view` and `cta_click` events when consent is granted

### Performance Monitoring (`src/components/performance/performance-monitor.tsx`)

Tracks Core Web Vitals:
- **LCP** (Largest Contentful Paint) - Budget: 2.5s
- **FID** (First Input Delay) - Budget: 100ms
- **CLS** (Cumulative Layout Shift) - Budget: 0.1
- **FCP** (First Contentful Paint) - Budget: 1.8s
- **TTFB** (Time to First Byte) - Budget: 600ms
- **INP** (Interaction to Next Paint) - Budget: 200ms

## 🚀 Campaign Landing Pages

### Campaign Landing Component (`src/components/campaign/campaign-landing.tsx`)

Features:
- **Minimal header** with logo and demo CTA
- **Hero section** with compelling headline and CTA
- **Pain points** section highlighting problems
- **Solution** section with benefits
- **Lead capture form** with UTM tracking
- **Thank you page** with next steps

### UTM Handling (`src/lib/utm.ts`)

Automatic UTM parameter capture and formatting:
- Extracts UTM parameters from URL
- Formats for lead tracking
- Includes in form submissions
- Tracks campaign performance

## 🧪 Testing & Quality Assurance

### SEO Testing Script (`scripts/test-seo.js`)

Comprehensive testing including:

#### Meta Tags Testing:
- Title length and content validation
- Description length and content validation
- Canonical URL verification
- OpenGraph tag validation
- Twitter Card validation

#### Structured Data Testing:
- JSON-LD schema validation
- Required schema types per page
- Schema.org compliance

#### Performance Testing:
- Core Web Vitals measurement
- Performance budget compliance
- Resource loading optimization

#### Accessibility Testing:
- Skip links presence
- Alt text validation
- Heading structure
- Color contrast
- Keyboard navigation

#### Global SEO Testing:
- robots.txt validation
- sitemap.xml validation
- OG image generation
- Canonical URL structure

### Running Tests:

```bash
# Run SEO tests
npm run test:seo

# Run system tests
npm run test:system

# Run API tests
npm run test:api

# Check system status
npm run check:status
```

## 🌍 Localization & Regional Optimization

### Canadian Focus:
- **Language**: `lang="en-CA"` for Canadian English
- **Currency**: CAD pricing for public prices
- **Regional mentions**: "Canada" and "Ontario" in industry descriptions
- **Area served**: CA-ON in structured data

### Industry-Specific Optimization:
- **Property Management**: Ontario landlord focus
- **Real Estate**: Canadian market emphasis
- **Healthcare**: Canadian compliance requirements
- **Accounting**: Canadian tax and business regulations

## 📈 Performance Optimization

### Core Web Vitals Budget:
- **LCP**: ≤ 2.5s (Largest Contentful Paint)
- **FID**: ≤ 100ms (First Input Delay)
- **CLS**: ≤ 0.1 (Cumulative Layout Shift)
- **FCP**: ≤ 1.8s (First Contentful Paint)
- **TTFB**: ≤ 600ms (Time to First Byte)
- **INP**: ≤ 200ms (Interaction to Next Paint)

### Optimization Strategies:
- **Font preloading**: Critical fonts loaded early
- **Image optimization**: AVIF/WebP with lazy loading
- **Code splitting**: Dynamic imports for non-critical code
- **Third-party deferral**: Analytics and tracking scripts deferred
- **GPU-friendly animations**: Hardware acceleration for smooth animations

## 🔗 Internal Link Architecture

### Industry Pages:
- Link to related demo
- Link to relevant app
- Link to 2 sibling industries
- Cross-industry recommendations

### App Pages:
- Link to 2-3 strongest industries
- Link to relevant demos
- Feature integration examples

### Demo Pages:
- Link to parent industry
- Link to related app
- Link to pricing information

## 🎯 CTA Density & Placement

### Above the Fold:
- **Primary CTA**: Hero section
- **Secondary CTA**: Navigation header
- **Tertiary CTA**: Trust indicators

### Within First Scroll:
- **Mid-page CTA**: After value proposition
- **Sticky header**: Persistent demo booking
- **Footer CTA**: Contact information

### CTA Hierarchy:
1. **Primary**: "Book a Demo" (main conversion)
2. **Secondary**: "Contact Sales" (high-intent)
3. **Tertiary**: "Learn More" (educational)

## 🚨 Error Handling

### Custom Error Pages:
- **404 Not Found**: Helpful navigation and search
- **500 Internal Server Error**: Recovery options and support
- **Status Page**: System health monitoring

### Error Page Features:
- **Helpful messaging**: Clear explanation of what happened
- **Recovery options**: Try again, go home, contact support
- **Navigation aids**: Links to popular pages
- **Support contact**: Direct access to help

## 📋 Launch Checklist

### Pre-Launch Testing:
- [ ] Run `npm run test:seo` - All tests pass
- [ ] Run `npm run build` - No build errors
- [ ] Test OG images - All generate correctly
- [ ] Verify robots.txt and sitemap.xml
- [ ] Check consent banner functionality
- [ ] Test campaign landing pages
- [ ] Verify UTM parameter handling
- [ ] Test error pages
- [ ] Check accessibility compliance

### Post-Launch Monitoring:
- [ ] Google Search Console setup
- [ ] Google Analytics 4 configuration
- [ ] Core Web Vitals monitoring
- [ ] Search ranking tracking
- [ ] Conversion rate monitoring
- [ ] Error rate monitoring

## 🔧 Maintenance

### Regular Tasks:
- **Weekly**: Check Core Web Vitals performance
- **Monthly**: Review search console for issues
- **Quarterly**: Update structured data as needed
- **Annually**: Review and update SEO strategy

### Monitoring Tools:
- Google Search Console
- Google Analytics 4
- Core Web Vitals reports
- Custom performance monitoring
- SEO testing script results

## 📚 Resources

### Documentation:
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Core Web Vitals](https://web.dev/vitals/)

### Tools:
- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)

---

This implementation provides a comprehensive SEO foundation that will help the OMGsystems website achieve better search visibility, user experience, and conversion rates. The modular approach makes it easy to maintain and extend as the business grows.
