import { Metadata } from "next";
import { SEO_CONFIG, INDUSTRY_SEO, APP_SEO, DEMO_SEO, generateCanonical, generateOGImage, getRobotsDirective } from "./seo";

export interface PageMetadataOptions {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  structuredData?: any[];
}

// Alias for backward compatibility
export const generateMetadata = generatePageMetadata;

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description = SEO_CONFIG.defaults.description,
    path,
    noindex = false,
    ogImage,
    structuredData = [],
  } = options;

  const canonical = generateCanonical(path);
  const robots = noindex ? "noindex, nofollow" : getRobotsDirective(path);

  return {
    title,
    description,
    robots,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: ogImage || generateOGImage(path.replace(/^\//, "").replace(/\//g, "-") || "home"),
          width: SEO_CONFIG.openGraph.image.width,
          height: SEO_CONFIG.openGraph.image.height,
          alt: `${title} - ${SEO_CONFIG.brand.name}`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage || generateOGImage(path.replace(/^\//, "").replace(/\//g, "-") || "home")],
    },
  };
}

// Industry page metadata
export function generateIndustryMetadata(industry: keyof typeof INDUSTRY_SEO): Metadata {
  const industryData = INDUSTRY_SEO[industry];
  const path = `/industries/${industry}`;

  return generatePageMetadata({
    title: industryData.title,
    description: industryData.description,
    path,
    ogImage: generateOGImage(industry),
  });
}

// App page metadata
export function generateAppMetadata(app: keyof typeof APP_SEO): Metadata {
  const appData = APP_SEO[app];
  const path = `/apps/${app}`;

  return generatePageMetadata({
    title: appData.title,
    description: appData.description,
    path,
    ogImage: generateOGImage(app),
  });
}

// Demo page metadata
export function generateDemoMetadata(demo: keyof typeof DEMO_SEO, industry?: string): Metadata {
  const demoData = DEMO_SEO[demo];
  const path = `/demo/${demo}`;
  
  let title: string = demoData.title;
  let description: string = demoData.description;
  
  if (industry && demo === "crm") {
    title = title.replace("{Industry}", industry.charAt(0).toUpperCase() + industry.slice(1));
    description = description.replace("{industry}", industry);
  }

  return generatePageMetadata({
    title,
    description,
    path,
    ogImage: generateOGImage(`${demo}${industry ? `-${industry}` : ""}`),
  });
}

// Static page metadata
export function generateStaticPageMetadata(
  page: "about" | "contact" | "pricing" | "integrations" | "resources"
): Metadata {
  const pageData = {
    about: {
      title: "About OMGsystems - Canadian Business Automation",
      description: "Learn about OMGsystems, the Canadian business automation platform helping companies across Ontario streamline operations and grow faster.",
    },
    contact: {
      title: "Contact OMGsystems - Get in Touch",
      description: "Contact OMGsystems for demos, support, or questions about our business automation solutions. We're here to help Canadian businesses grow.",
    },
    pricing: {
      title: "OMGsystems Pricing - Transparent Plans",
      description: "View OMGsystems pricing plans for CRM, document management, and automation tools. Built for Canadian businesses with transparent pricing.",
    },
    integrations: {
      title: "OMGsystems Integrations - Connect Your Tools",
      description: "Discover OMGsystems integrations with popular business tools. Connect your existing software to our automation platform.",
    },
    resources: {
      title: "OMGsystems Resources - Guides & Documentation",
      description: "Access OMGsystems resources, guides, and documentation. Learn how to maximize your business automation potential.",
    },
  };

  const data = pageData[page];
  const path = `/${page}`;

  return generatePageMetadata({
    title: data.title,
    description: data.description,
    path,
    ogImage: generateOGImage(page),
  });
}

// Structured Data Generators
export function generateServiceSchema(industrySlug: string) {
  const industryMap: Record<string, string> = {
    "property-management": "Property Management",
    "real-estate": "Real Estate",
    "contractors": "Contractors",
    "accounting": "Accounting",
    "cleaning": "Cleaning",
    "healthcare": "Healthcare",
  };
  const serviceType = `${industryMap[industrySlug] || industrySlug.replace(/-/g, " ")} automation platform`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceType,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "CA-ON", // Ontario, Canada
    },
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.brand.name,
    },
    offers: {
      "@type": "Offer",
      name: "Get a demo",
      url: `${SEO_CONFIG.defaults.canonicalBase}/demo/crm?industry=${industrySlug}`,
    },
  };
}

export function generateProductSchema(appSlug: string) {
  const productMap: Record<string, { name: string; category: string }> = {
    "securevault-docs": { name: "SecureVault Docs", category: "Document Management Software" },
    "industryiq": { name: "IndustryIQ", category: "Business Intelligence Software" },
    "crm": { name: "OMG CRM", category: "CRM Software" },
    "leadflow": { name: "LeadFlow Engine™", category: "Lead Generation Software" },
  };
  const productInfo = productMap[appSlug] || { name: appSlug.replace(/-/g, " "), category: "Business Software" };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productInfo.name,
    description: APP_SEO[appSlug as keyof typeof APP_SEO]?.description || SEO_CONFIG.defaults.description,
    brand: {
      "@type": "Brand",
      name: SEO_CONFIG.brand.name,
    },
    category: productInfo.category,
    isFamilyFriendly: true,
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, 8).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
