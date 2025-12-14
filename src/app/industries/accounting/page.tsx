import { Metadata } from "next";
import HeroSection from "@/components/accounting/HeroSection";
import RealOutcomes from "@/components/accounting/RealOutcomes";
import ProblemsSolutionsSection from "@/components/accounting/ProblemsSolutionsSection";
import AccountingModules from "@/components/accounting/AccountingModules";
import HowItWorks from "@/components/accounting/HowItWorks";
import SecureVaultIntegration from "@/components/accounting/SecureVaultIntegration";
import AccountingSegments from "@/components/accounting/AccountingSegments";
import SecurityCompliance from "@/components/accounting/SecurityCompliance";
import ImplementationTimeline from "@/components/accounting/ImplementationTimeline";
import FAQSection from "@/components/accounting/FAQSection";
import FinalCTASection from "@/components/accounting/FinalCTASection";
import AccountingPageTracker from "@/components/accounting/AccountingPageTracker";

export const metadata: Metadata = {
  title: "Financial Workflow Engine | Accounting Automation | OMGsystems",
  description: "Automate 80% of your accounting firm's grind — secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
  keywords: "accounting automation, CPA firm software, document management, client onboarding, Canadian accounting, tax preparation, financial workflow, accounting CRM",
  openGraph: {
    title: "Financial Workflow Engine | Accounting Automation | OMGsystems",
    description: "Automate 80% of your accounting firm's grind — secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
    type: "website",
    images: [
      {
        url: "/images/accounting/accounting-workflow-preview.gif",
        width: 1200,
        height: 630,
        alt: "Accounting firm automation dashboard – intake to billing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Workflow Engine | Accounting Automation | OMGsystems",
    description: "Automate 80% of your accounting firm's grind — secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
    images: ["/images/accounting/accounting-workflow-preview.gif"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/accounting",
  },
};

export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <RealOutcomes />
      <ProblemsSolutionsSection />
      <AccountingModules />
      <HowItWorks />
      <SecureVaultIntegration />
      <AccountingSegments />
      <SecurityCompliance />
      <ImplementationTimeline />
      <FAQSection />
      <FinalCTASection />
      <AccountingPageTracker />
    </div>
  );
}