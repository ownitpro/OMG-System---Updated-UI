import { Metadata } from "next";
import HeroSection from "@/components/crm-demo/HeroSection";
import WhyChooseSection from "@/components/crm-demo/WhyChooseSection";
import ProblemsSolutions from "@/components/crm-demo/ProblemsSolutionsSection";
import FeaturesGrid from "@/components/crm-demo/FeaturesGridSection";
import IndustryCards from "@/components/crm-demo/IndustriesSection";
import FAQSection from "@/components/crm-demo/FAQSection";
import FinalCTASection from "@/components/crm-demo/FinalCTASection";
import CRMDemoPageTracker from "@/components/crm-demo/CRMDemoPageTracker";

export const metadata: Metadata = {
  title: "CRM for Business Growth & Efficiency | OMGsystems",
  description: "Unify your leads, clients & documents with a CRM built for real industries. Drive growth, streamline workflows, and stay connected—wherever you work.",
  keywords: [
    "CRM for business growth",
    "CRM for efficiency",
    "unified CRM",
    "lead management",
    "client management",
    "document management CRM",
    "industry-specific CRM",
    "automated workflows CRM",
    "mobile CRM access",
    "CRM reporting",
    "CRM analytics",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/apps/demo/crm",
  },
  openGraph: {
    title: "CRM for Business Growth & Efficiency | OMGsystems",
    description: "Unify your leads, clients & documents with a CRM built for real industries. Drive growth, streamline workflows, and stay connected—wherever you work.",
    url: "https://www.omgsystems.com/apps/demo/crm",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/crm-demo/dashboard-preview.png", // Placeholder image
        width: 1200,
        height: 630,
        alt: "Unified CRM dashboard – leads, clients, documents",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM for Business Growth & Efficiency | OMGsystems",
    description: "Unify your leads, clients & documents with a CRM built for real industries. Drive growth, streamline workflows, and stay connected—wherever you work.",
    images: ["https://www.omgsystems.com/images/crm-demo/dashboard-preview.png"], // Placeholder image
  },
};

export default function CRMDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <CRMDemoPageTracker />
      <HeroSection />
      <WhyChooseSection />
      <ProblemsSolutions />
      <FeaturesGrid />
      <IndustryCards />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}