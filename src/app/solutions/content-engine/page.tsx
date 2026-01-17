import { Metadata } from "next";
import HeroSection from "@/components/content-engine/HeroSection";
import FeaturesSection from "@/components/content-engine/FeaturesSection";
import ContentTypesSection from "@/components/content-engine/ContentTypesSection";
import IndustryTemplatesSection from "@/components/content-engine/IndustryTemplatesSection";
import HowItWorksSection from "@/components/content-engine/HowItWorksSection";
import ResultsSection from "@/components/content-engine/ResultsSection";
import PricingSection from "@/components/content-engine/PricingSection";
import ContentEnginePageTracker from "@/components/content-engine/ContentEnginePageTracker";
import { ContentEngineLeadForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Content Engine – Effortless AI-Powered Content Creation | OMGsystems",
  description: "Scale your content with intelligent tools that know your brand, speak your audience's language, and adapt to any industry. Try the Content Engine Demo today.",
  keywords: [
    "AI content creation",
    "content generation",
    "AI writing tools",
    "content marketing automation",
    "AI copywriting",
    "content creation platform",
    "AI content writer",
    "automated content",
    "content scaling",
    "AI content marketing",
    "content generation tools",
    "AI-powered content",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/content-engine",
  },
  openGraph: {
    title: "Content Engine – Effortless AI-Powered Content Creation | OMGsystems",
    description: "Scale your content with intelligent tools that know your brand, speak your audience's language, and adapt to any industry. Try the Content Engine Demo today.",
    url: "https://www.omgsystems.com/solutions/content-engine",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/content-engine/hero-preview.png",
        width: 1200,
        height: 630,
        alt: "AI-powered content creation platform - Content Engine",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Engine – Effortless AI-Powered Content Creation | OMGsystems",
    description: "Scale your content with intelligent tools that know your brand, speak your audience's language, and adapt to any industry. Try the Content Engine Demo today.",
    images: ["https://www.omgsystems.com/images/content-engine/hero-preview.png"],
  },
};

export default function ContentEnginePage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <ContentEnginePageTracker />
      <HeroSection />
      <FeaturesSection />
      <ContentTypesSection />
      <IndustryTemplatesSection />
      <HowItWorksSection />
      <ResultsSection />
      <PricingSection />

      {/* Lead Form Section */}
      <ContentEngineLeadForm />
    </div>
  );
}
