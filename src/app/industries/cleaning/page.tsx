import { Metadata } from "next";
import HeroSection from "@/components/cleaning/HeroSection";
import RealOutcomes from "@/components/cleaning/RealOutcomes";
import ProblemsSolutionsSection from "@/components/cleaning/ProblemsSolutionsSection";
import CleaningModules from "@/components/cleaning/CleaningModules";
import HowItWorks from "@/components/cleaning/HowItWorks";
import SystemIntegration from "@/components/cleaning/SystemIntegration";
import CleaningSegments from "@/components/cleaning/CleaningSegments";
import SecurityCompliance from "@/components/cleaning/SecurityCompliance";
import ImplementationTimeline from "@/components/cleaning/ImplementationTimeline";
import FAQSection from "@/components/cleaning/FAQSection";
import FinalCTASection from "@/components/cleaning/FinalCTASection";
import CleaningPageTracker from "@/components/cleaning/CleaningPageTracker";

export const metadata: Metadata = {
  title: "Cleaning Operations Engine™ | Cleaning Business Automation | OMGsystems",
  description: "Automate your cleaning business — from quote to review. The Cleaning Operations Engine™ connects your quotes, staff schedules, invoices, and client updates — all in one dashboard.",
  keywords: "cleaning business automation, janitorial software, cleaning company CRM, staff scheduling, cleaning business management, Canadian cleaning companies, cleaning operations",
  openGraph: {
    title: "Cleaning Operations Engine™ | Cleaning Business Automation | OMGsystems",
    description: "Automate your cleaning business — from quote to review. The Cleaning Operations Engine™ connects your quotes, staff schedules, invoices, and client updates — all in one dashboard.",
    type: "website",
    images: [
      {
        url: "/images/cleaning/cleaning-dashboard-preview.gif",
        width: 1200,
        height: 630,
        alt: "Cleaning business automation dashboard – quote to review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Operations Engine™ | Cleaning Business Automation | OMGsystems",
    description: "Automate your cleaning business — from quote to review. The Cleaning Operations Engine™ connects your quotes, staff schedules, invoices, and client updates — all in one dashboard.",
    images: ["/images/cleaning/cleaning-dashboard-preview.gif"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/cleaning",
  },
};

export default function CleaningPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <RealOutcomes />
      <ProblemsSolutionsSection />
      <CleaningModules />
      <HowItWorks />
      <SystemIntegration />
      <CleaningSegments />
      <SecurityCompliance />
      <ImplementationTimeline />
      <FAQSection />
      <FinalCTASection />
      <CleaningPageTracker />
    </div>
  );
}