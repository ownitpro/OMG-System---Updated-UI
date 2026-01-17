import { Metadata } from "next";
import HeroSection from "@/components/ai-agents/HeroSection";
import BenefitsSection from "@/components/ai-agents/BenefitsSection";
import ProcessSection from "@/components/ai-agents/ProcessSection";
import CaseStudiesSection from "@/components/ai-agents/CaseStudiesSection";
import QuoteFormSection from "@/components/ai-agents/QuoteFormSection";
import FAQSection from "@/components/ai-agents/FAQSection";
import FounderOfferSection from "@/components/ai-agents/FounderOfferSection";
import FinalCTASection from "@/components/ai-agents/FinalCTASection";
import AIAgentsPageTracker from "@/components/ai-agents/AIAgentsPageTracker";

export const metadata: Metadata = {
  title: "Meet Your 24/7 Digital Teammate | AI Agents | OMGsystems",
  description: "AI Agents That Work While You Sleep. Our team will co-design and launch your custom AI Agent—so you can capture leads, automate tasks, make decisions at scale, and support your business around the clock.",
  keywords: [
    "AI agents",
    "artificial intelligence agents",
    "business automation",
    "AI automation",
    "digital teammates",
    "AI assistants",
    "business AI",
    "automated workflows",
    "AI integration",
    "custom AI solutions",
    "AI agent development",
    "business process automation",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/ai-agents",
  },
  openGraph: {
    title: "Meet Your 24/7 Digital Teammate | AI Agents | OMGsystems",
    description: "AI Agents That Work While You Sleep. Our team will co-design and launch your custom AI Agent—so you can capture leads, automate tasks, make decisions at scale, and support your business around the clock.",
    url: "https://www.omgsystems.com/solutions/ai-agents",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/ai-agents/hero-preview.png",
        width: 1200,
        height: 630,
        alt: "AI Agents - 24/7 Digital Teammate",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Your 24/7 Digital Teammate | AI Agents | OMGsystems",
    description: "AI Agents That Work While You Sleep. Our team will co-design and launch your custom AI Agent—so you can capture leads, automate tasks, make decisions at scale, and support your business around the clock.",
    images: ["https://www.omgsystems.com/images/ai-agents/hero-preview.png"],
  },
};

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <AIAgentsPageTracker />
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <CaseStudiesSection />
      <QuoteFormSection />
      <FAQSection />
      <FounderOfferSection />
      <FinalCTASection />
    </div>
  );
}