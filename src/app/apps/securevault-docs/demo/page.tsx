import { Metadata } from "next";
import HeroSection from "@/components/securevault-demo/HeroSection";
import BenefitsSection from "@/components/securevault-demo/BenefitsSection";
import InteractiveDemoSection from "@/components/securevault-demo/InteractiveDemoSection";
import TrustPanel from "@/components/securevault-demo/TrustPanel";
import FinalCTASection from "@/components/securevault-demo/FinalCTASection";
import SecureVaultDemoPageTracker from "@/components/securevault-demo/SecureVaultDemoPageTracker";

export const metadata: Metadata = {
  title: "Try SecureVault Docs Demo | Document Management Simplified | OMGsystems",
  description: "Experience how SecureVault Docs can transform your document management. Choose your industry to see tailored workflows and features—no registration required.",
  keywords: [
    "document management demo",
    "secure vault demo",
    "document workflow demo",
    "industry-specific demo",
    "no registration demo",
    "interactive demo",
    "document automation demo",
    "compliance demo",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/apps/securevault-docs/demo",
  },
  openGraph: {
    title: "Try SecureVault Docs Demo | Document Management Simplified | OMGsystems",
    description: "Experience how SecureVault Docs can transform your document management. Choose your industry to see tailored workflows and features—no registration required.",
    url: "https://www.omgsystems.com/apps/securevault-docs/demo",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/securevault-demo/demo-preview.png",
        width: 1200,
        height: 630,
        alt: "SecureVault Docs live demo – choose your industry and explore document workflows",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Try SecureVault Docs Demo | Document Management Simplified | OMGsystems",
    description: "Experience how SecureVault Docs can transform your document management. Choose your industry to see tailored workflows and features—no registration required.",
    images: ["https://www.omgsystems.com/images/securevault-demo/demo-preview.png"],
  },
};

export default function SecureVaultDocsDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      <SecureVaultDemoPageTracker />
      <HeroSection />
      <BenefitsSection />
      <InteractiveDemoSection />
      <TrustPanel />
      <FinalCTASection />
    </div>
  );
}
