import { Metadata } from "next";
import HeroSection from "@/components/industry-iq/HeroSection";
import BenefitsSection from "@/components/industry-iq/BenefitsSection";
import ProblemsSolutions from "@/components/industry-iq/ProblemsSolutions";
import FeaturesGrid from "@/components/industry-iq/FeaturesGrid";
import UseCases from "@/components/industry-iq/UseCases";
import PricingCTA from "@/components/industry-iq/PricingCTA";
import FAQSection from "@/components/industry-iq/FAQSection";
import FinalCTASection from "@/components/industry-iq/FinalCTASection";
import IndustryIQPageTracker from "@/components/industry-iq/IndustryIQPageTracker";

export const metadata: Metadata = {
  title: "Industry IQ – AI-Powered Business Intelligence for Every Vertical | OMGsystems",
  description: "Unlock actionable insights, benchmarks, and predictive analytics across your industry with Industry IQ. Make data-driven decisions that scale.",
  keywords: [
    "business intelligence",
    "industry benchmarks",
    "vertical analytics",
    "predictive insights",
    "AI dashboards",
    "data analytics",
    "business metrics",
    "industry comparison",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/apps/industry-iq",
  },
  openGraph: {
    title: "Industry IQ – AI-Powered Business Intelligence for Every Vertical | OMGsystems",
    description: "Unlock actionable insights, benchmarks, and predictive analytics across your industry with Industry IQ. Make data-driven decisions that scale.",
    url: "https://www.omgsystems.com/apps/industry-iq",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/industry-iq/industry-iq-dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "Interactive business intelligence dashboard – Industry IQ",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry IQ – AI-Powered Business Intelligence for Every Vertical | OMGsystems",
    description: "Unlock actionable insights, benchmarks, and predictive analytics across your industry with Industry IQ. Make data-driven decisions that scale.",
    images: ["https://www.omgsystems.com/images/industry-iq/industry-iq-dashboard-preview.png"],
  },
};

export default function IndustryIQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
      <IndustryIQPageTracker />
      <HeroSection />
      <BenefitsSection />
      <ProblemsSolutions />
      <FeaturesGrid />
      <UseCases />
      <PricingCTA />
      <FAQSection />
      <FinalCTASection />
      </div>
    </div>
  );
}