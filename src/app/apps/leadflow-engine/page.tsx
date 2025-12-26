import { Metadata } from "next";
import HeroSection from "@/components/leadflow/HeroSection";
import WhyLeadFlowMatters from "@/components/leadflow/WhyLeadFlowMatters";
import FrustrationsFixes from "@/components/leadflow/FrustrationsFixes";
import IntroducingLeadFlow from "@/components/leadflow/IntroducingLeadFlow";
import HowItWorks from "@/components/leadflow/HowItWorks";
import BeforeAfter from "@/components/leadflow/BeforeAfter";
import Deliverables from "@/components/leadflow/Deliverables";
import Testimonials from "@/components/leadflow/Testimonials";
import FAQSection from "@/components/leadflow/FAQSection";
import FinalCTASection from "@/components/leadflow/FinalCTASection";
import LeadFlowPageTracker from "@/components/leadflow/LeadFlowPageTracker";

export const metadata: Metadata = {
  title: "LeadFlow Engine – Build a Predictable Lead Machine | OMGsystems",
  description: "Turn your digital campaigns into a consistent stream of qualified clients—from first click to final sale with LeadFlow Engine.",
  keywords: "lead generation, digital marketing, Facebook ads, Instagram ads, CRM integration, marketing automation, lead nurturing, ROI optimization",
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.omgsystems.com/apps/leadflow-engine",
  },
  other: {
    "theme-color": "#B7F000",
    "msapplication-TileColor": "#B7F000",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  openGraph: {
    title: "LeadFlow Engine – Build a Predictable Lead Machine | OMGsystems",
    description: "Turn your digital campaigns into a consistent stream of qualified clients—from first click to final sale with LeadFlow Engine.",
    url: "https://www.omgsystems.com/apps/leadflow-engine",
    siteName: "OMGsystems",
    locale: "en_CA",
    images: [
      {
        url: "https://www.omgsystems.com/images/leadflow/leadflow-engine-preview.png",
        width: 1200,
        height: 630,
        alt: "LeadFlow Engine – reliable lead machine from ad to client"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadFlow Engine – Build a Predictable Lead Machine | OMGsystems",
    description: "Turn your digital campaigns into a consistent stream of qualified clients—from first click to final sale with LeadFlow Engine.",
    images: ["https://www.omgsystems.com/images/leadflow/leadflow-engine-preview.png"]
  }
};

export default function LeadFlowEnginePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      <LeadFlowPageTracker />
      <HeroSection />
      <WhyLeadFlowMatters />
      <FrustrationsFixes />
      <IntroducingLeadFlow />
      <HowItWorks />
      <BeforeAfter />
      <Deliverables />
      <Testimonials />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}