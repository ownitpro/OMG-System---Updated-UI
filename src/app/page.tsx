import React from 'react';
import { Metadata } from 'next';
import { SEO_CONFIG, generateOrganizationSchema, generateWebsiteSchema, generateFAQSchema } from '@/lib/seo';
import { HeroWithGalaxy } from '@/components/homepage/hero-with-galaxy';
import { defaultMetrics } from '@/components/homepage/metrics-bar';
import HomepageBenefitsSection from '@/components/homepage/BenefitsSection';
import HomepageProcessSection from '@/components/homepage/ProcessSection';
import StrategySessionSection from '@/components/homepage/StrategySessionSection';
import HomepageCaseStudiesSection from '@/components/homepage/CaseStudiesSection';
import HomepageQuoteFormSection from '@/components/homepage/QuoteFormSection';
import HomepageFAQSection from '@/components/homepage/FAQSection';
import HomepageFounderOfferSection from '@/components/homepage/FounderOfferSection';
import { FinalCTASection, defaultFinalCTAData } from '@/components/homepage/final-cta-section';
import { GracefulExitPopup } from '@/components/exit-intent/graceful-exit-popup';
import { HomeAutomationAndWorkflowsSection } from '@/components/home/HomeAutomationAndWorkflowsSection';
import { ProductsRowSection } from '@/components/homepage/products-row-section';
import { HomeRecommendedStackByIndustry } from '@/components/home/HomeRecommendedStackByIndustry';

export const metadata: Metadata = {
  title: SEO_CONFIG.brand.tagline,
  description: SEO_CONFIG.brand.description,
  keywords: 'business automation, CRM, document management, secure vault, industry solutions, property management, real estate, accounting, contractors, healthcare, cleaning, Canada, Ontario',
  openGraph: {
    title: SEO_CONFIG.brand.tagline,
    description: SEO_CONFIG.brand.description,
    url: SEO_CONFIG.defaults.canonicalBase,
    siteName: SEO_CONFIG.openGraph.siteName,
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
    title: SEO_CONFIG.brand.tagline,
    description: SEO_CONFIG.brand.description,
    images: ['/og-images/home-hero.png'],
  },
  alternates: {
    canonical: SEO_CONFIG.defaults.canonicalBase,
  },
};

export default function HomePage() {
  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQSchema([]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="min-h-screen bg-black">
        {/* Hero with Galaxy - Client component that wraps hero and metrics with galaxy background */}
        <HeroWithGalaxy
          heroProps={{
            headline: SEO_CONFIG.brand.tagline,
            subhead: SEO_CONFIG.brand.description,
            primaryCTA: { label: "Try a Live Demo", href: "/demos/live" },
            secondaryCTA: { label: "See How It Works", href: "#benefits" }
          }}
          metrics={defaultMetrics}
        />

        {/* Benefits Section - AI Agent style */}
        <HomepageBenefitsSection />

        {/* Strategy Session Section - Replaces "How we transform your business" */}
        <StrategySessionSection />

        {/* Products Row - SecureVault, CRM, OMGIQ */}
        <ProductsRowSection />

        {/* Case Studies Section - AI Agent style */}
        <HomepageCaseStudiesSection />

        {/* Recommended Stack by Industry */}
        <HomeRecommendedStackByIndustry />

        {/* Automation & Workflows Section */}
        <HomeAutomationAndWorkflowsSection />

        {/* Quote Form Section - AI Agent style */}
        <HomepageQuoteFormSection />

        {/* FAQ Section - AI Agent style */}
        <HomepageFAQSection />

        {/* Founder Offer Section - AI Agent style */}
        <HomepageFounderOfferSection />

        {/* Final Call to Action - Keep original bottom banner */}
        <FinalCTASection {...defaultFinalCTAData} />
      </div>

      {/* Graceful Exit Intent Popup */}
      <GracefulExitPopup />
    </>
  );
}