import { Metadata } from 'next';

// SEO Configuration
export const SEO_CONFIG = {
  brand: {
    name: 'OMGsystems',
    tagline: 'Build Once. Profit Forever.',
    description: 'OMGsystems unifies CRM, document management & automation across industries helping teams launch in 1–3 weeks, cut admin time, and scale faster.',
  },
  defaults: {
    titleTemplate: '%s | OMGsystems',
    description: 'OMGsystems helps businesses in property, real estate, healthcare, accounting, contracting, and cleaning automate workflows, get leads, manage projects, and more.',
    canonicalBase: 'https://www.omgsystems.com',
    locale: 'en-CA',
    themeColor: '#B7F000', // Electric Lime
  },
  openGraph: {
    type: 'website' as const,
    siteName: 'OMGsystems',
    image: {
      width: 1200,
      height: 630,
      alt: 'OMGsystems unified automation platform overview',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    site: '@omgsystems',
    creator: '@omgsystems',
  },
};

// Homepage SEO
export const seoHome: Metadata = {
  title: 'Build Once. Profit Forever | OMGsystems',
  description: 'OMGsystems unifies CRM, document management & automation across industries — helping teams launch in 1–3 weeks, cut admin time, and scale faster.',
  keywords: [
    'automation platform',
    'business workflow automation',
    'Ontario business tools',
    'CRM platform Ontario',
    'document management',
    'lead generation automation',
    'property management software',
    'contractor CRM',
    'healthcare automation',
    'accounting software',
    'real estate CRM',
    'cleaning business software',
  ],
  openGraph: {
    title: 'Build Once. Profit Forever | OMGsystems',
    description: 'Unify CRM, docs & automation across industries with OMGsystems',
    url: 'https://www.omgsystems.com/',
    siteName: 'OMGsystems',
    images: [
      {
        url: '/og-images/home-hero.png',
        width: 1200,
        height: 630,
        alt: 'OMGsystems unified automation platform overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Once. Profit Forever | OMGsystems',
    description: 'Unify CRM, docs & automation across industries with OMGsystems',
    images: ['/og-images/home-hero.png'],
  },
  alternates: {
    canonical: 'https://www.omgsystems.com/',
  },
  other: {
    'theme-color': '#B7F000',
    'msapplication-TileColor': '#B7F000',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

// Generate Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OMGsystems',
    url: 'https://www.omgsystems.com',
    logo: 'https://www.omgsystems.com/logo.png',
    description: 'OMGsystems unifies CRM, document management & automation across industries',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'ON',
      addressLocality: 'Toronto',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-416-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'CA',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/omgsystems',
      'https://linkedin.com/company/omgsystems',
    ],
  };
}

// Generate Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.omgsystems.com',
    name: 'OMGsystems',
    description: 'OMGsystems unifies CRM, document management & automation across industries',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.omgsystems.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OMGsystems',
    },
  };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string; category?: string }>) {
  if (!faqs || !Array.isArray(faqs)) {
    return null;
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate Product Schema
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    applicationCategory: product.category,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
    },
  };
}

// Preload critical fonts
// Note: Next.js automatically handles font preloading when using next/font/google
// This function is kept for potential future use with custom fonts
export function preloadFonts() {
  // Next.js handles Inter font preloading automatically via next/font/google
  // Return empty array to avoid 404 errors from missing font files
  return [];
}

// Generate OG Image URL
export function generateOGImage(type: string, title?: string): string {
  const baseUrl = 'https://www.omgsystems.com';
  switch (type) {
    case 'home':
      return `${baseUrl}/og-images/home-hero.png`;
    case 'blog':
      return `${baseUrl}/og-images/blog-default.png`;
    case 'industry':
      return `${baseUrl}/og-images/industry-${title?.toLowerCase().replace(/\s+/g, '-') || 'default'}.png`;
    default:
      return `${baseUrl}/og-images/default.png`;
  }
}

// Generate canonical URL
export function generateCanonical(path: string): string {
  return `${SEO_CONFIG.defaults.canonicalBase}${path}`;
}

// Get robots directive
export function getRobotsDirective(path: string): string {
  // Admin and portal pages should not be indexed
  if (path.startsWith('/admin') || path.startsWith('/portal')) {
    return 'noindex, nofollow';
  }
  return 'index, follow';
}

// Industry SEO configurations
export const INDUSTRY_SEO = {
  'property-management': {
    title: 'Property Management Automation | OMGsystems',
    description: 'Streamline property management with automated workflows, tenant communication, and maintenance tracking. Built for Ontario property managers.',
  },
  'real-estate': {
    title: 'Real Estate CRM & Automation | OMGsystems',
    description: 'Boost real estate sales with automated lead nurturing, document management, and client communication tools. Perfect for Ontario realtors.',
  },
  'contractors': {
    title: 'Contractor Business Automation | OMGsystems',
    description: 'Scale your contracting business with automated quoting, project management, and client communication. Built for Ontario contractors.',
  },
  'accounting': {
    title: 'Accounting Practice Automation | OMGsystems',
    description: 'Streamline accounting workflows with automated document processing, client communication, and compliance tracking. For Ontario accountants.',
  },
  'healthcare': {
    title: 'Healthcare Practice Automation | OMGsystems',
    description: 'Improve patient care with automated scheduling, documentation, and compliance workflows. PHIPA-compliant for Ontario healthcare providers.',
  },
  'cleaning': {
    title: 'Cleaning Business Automation | OMGsystems',
    description: 'Grow your cleaning business with automated scheduling, billing, and client management. Perfect for Ontario cleaning services.',
  },
};

// App SEO configurations
export const APP_SEO = {
  'securevault-docs': {
    title: 'SecureVault Docs - Document Management | OMGsystems',
    description: 'Secure document management with OCR, auto-filing, and compliance tracking. Built for Canadian businesses with PHIPA/PIPEDA compliance.',
  },
  'industryiq': {
    title: 'IndustryIQ - Business Intelligence | OMGsystems',
    description: 'Get industry insights and trends to stay ahead of the competition. Real-time data and analytics for your business sector.',
  },
  'crm': {
    title: 'OMG CRM - Customer Relationship Management | OMGsystems',
    description: 'Comprehensive CRM with automated workflows, lead scoring, and industry-specific pipelines. Built for Canadian businesses.',
  },
  'leadflow': {
    title: 'LeadFlow Engine™ - Lead Generation | OMGsystems',
    description: 'Automated lead generation and nurturing system. Turn your ad spend into qualified leads with intelligent automation.',
  },
};

// Demo SEO configurations
export const DEMO_SEO = {
  'crm': {
    title: '{Industry} CRM Demo | OMGsystems',
    description: 'See how our {industry} CRM can streamline your business operations. Book a personalized demo today.',
  },
  'securevault-docs': {
    title: 'SecureVault Docs Demo | OMGsystems',
    description: 'Experience secure document management with OCR and auto-filing. See how it can transform your document workflows.',
  },
  'leadflow': {
    title: 'LeadFlow Engine Demo | OMGsystems',
    description: 'Discover how automated lead generation can boost your business. See the LeadFlow Engine in action.',
  },
};