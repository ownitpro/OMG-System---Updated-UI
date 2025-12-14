import { Metadata } from "next";
import HeroSection from "@/components/crm-demo/HeroSection";
import WhyChooseSection from "@/components/crm-demo/WhyChooseSection";
import ProblemsSolutionsSection from "@/components/crm-demo/ProblemsSolutionsSection";
import FeaturesGridSection from "@/components/crm-demo/FeaturesGridSection";
import IndustriesSection from "@/components/crm-demo/IndustriesSection";
import FAQSection from "@/components/crm-demo/FAQSection";
import FinalCTASection from "@/components/crm-demo/FinalCTASection";
import CRMDemoPageTracker from "@/components/crm-demo/CRMDemoPageTracker";

export const metadata: Metadata = {
  title: "CRM for Business Growth & Efficiency | OMGsystems",
  description: "Unify your leads, clients & documents with a CRM built for real industries. Drive growth, streamline workflows, and stay connected—wherever you work.",
  keywords: [
    "CRM software",
    "customer relationship management",
    "lead management",
    "sales pipeline",
    "business automation",
    "industry CRM",
    "document management CRM",
    "mobile CRM",
    "sales tracking",
    "client management",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/apps/crm-demo",
  },
  openGraph: {
    title: "CRM for Business Growth & Efficiency | OMGsystems",
    description: "Unify your leads, clients & documents with a CRM built for real industries. Drive growth, streamline workflows, and stay connected—wherever you work.",
    url: "https://www.omgsystems.com/apps/crm-demo",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/crm-demo/dashboard-preview.png",
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
    images: ["https://www.omgsystems.com/images/crm-demo/dashboard-preview.png"],
  },
};

export default function CRMDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <CRMDemoPageTracker />
      <HeroSection />
      <WhyChooseSection />
      <ProblemsSolutionsSection />
      <FeaturesGridSection />
      <IndustriesSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
