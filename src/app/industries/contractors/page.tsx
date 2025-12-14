import { Metadata } from "next";
import HeroSection from "@/components/contractors/HeroSection";
import WorkflowSteps from "@/components/contractors/WorkflowSteps";
import PainPointsSection from "@/components/contractors/PainPointsSection";
import ProjectModules from "@/components/contractors/ProjectModules";
import RealOutcomes from "@/components/contractors/RealOutcomes";
import ContractorSegments from "@/components/contractors/ContractorSegments";
import SecurityCompliance from "@/components/contractors/SecurityCompliance";
import ImplementationTimeline from "@/components/contractors/ImplementationTimeline";
import FAQSection from "@/components/contractors/FAQSection";
import FinalCTASection from "@/components/contractors/FinalCTASection";
import ContractorsPageTracker from "@/components/contractors/ContractorsPageTracker";

export const metadata: Metadata = {
  title: "Project Growth Engine | Contractors Automation | OMGsystems",
  description: "Grow your contracting business — lead capture, quoting, payments & client communication — all handled by automation built for Ontario builders, renovators and trades.",
  keywords: "contractor automation, construction business, lead generation, project management, Ontario contractors, construction CRM, contractor software, building automation",
  openGraph: {
    title: "Project Growth Engine | Contractors Automation | OMGsystems",
    description: "Grow your contracting business — lead capture, quoting, payments & client communication — all handled by automation built for Ontario builders, renovators and trades.",
    type: "website",
    images: [
      {
        url: "/images/contractors/contractor-dashboard-preview.gif",
        width: 1200,
        height: 630,
        alt: "Contractor business automation dashboard – lead to growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Growth Engine | Contractors Automation | OMGsystems",
    description: "Grow your contracting business — lead capture, quoting, payments & client communication — all handled by automation built for Ontario builders, renovators and trades.",
    images: ["/images/contractors/contractor-dashboard-preview.gif"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/contractors",
  },
};

export default function ContractorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <WorkflowSteps />
      <PainPointsSection />
      <ProjectModules />
      <RealOutcomes />
      <ContractorSegments />
      <SecurityCompliance />
      <ImplementationTimeline />
      <FAQSection />
      <FinalCTASection />
      <ContractorsPageTracker />
    </div>
  );
}