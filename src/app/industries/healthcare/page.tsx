import { Metadata } from "next";
import HeroSection from "@/components/healthcare/HeroSection";
import PainPointsSection from "@/components/healthcare/PainPointsSection";
import CareFlowModules from "@/components/healthcare/CareFlowModules";
import HowCareFlowWorks from "@/components/healthcare/HowCareFlowWorks";
import RealOutcomes from "@/components/healthcare/RealOutcomes";
import HealthcareSegments from "@/components/healthcare/HealthcareSegments";
import SecurityCompliance from "@/components/healthcare/SecurityCompliance";
import ImplementationTimeline from "@/components/healthcare/ImplementationTimeline";
import FAQSection from "@/components/healthcare/FAQSection";
import FinalCTASection from "@/components/healthcare/FinalCTASection";
import HealthcarePageTracker from "@/components/healthcare/HealthcarePageTracker";
import { LeadFormWrapper } from "@/components/forms";

export const metadata: Metadata = {
  title: "CareFlow Automation | Healthcare Workflow Automation | OMGsystems",
  description: "Automate clinical workflows, improve patient care and operational efficiency — scheduling, intake, documentation, claims, medications and alerts. Built for clinics, long-term care homes and group practices in Ontario.",
  keywords: "healthcare automation, clinical workflows, patient care, scheduling, intake, documentation, claims, medications, alerts, Ontario healthcare, PHIPA compliance, long-term care, clinics",
  openGraph: {
    title: "CareFlow Automation | Healthcare Workflow Automation | OMGsystems",
    description: "Automate clinical workflows, improve patient care and operational efficiency — scheduling, intake, documentation, claims, medications and alerts. Built for clinics, long-term care homes and group practices in Ontario.",
    type: "website",
    images: [
      {
        url: "/images/healthcare/healthcare-dashboard-preview.gif",
        width: 1200,
        height: 630,
        alt: "Healthcare automation dashboard – scheduling, intake, claims & staffing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CareFlow Automation | Healthcare Workflow Automation | OMGsystems",
    description: "Automate clinical workflows, improve patient care and operational efficiency — scheduling, intake, documentation, claims, medications and alerts. Built for clinics, long-term care homes and group practices in Ontario.",
    images: ["/images/healthcare/healthcare-dashboard-preview.gif"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/healthcare",
  },
};

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PainPointsSection />
      <CareFlowModules />
      <HowCareFlowWorks />
      <RealOutcomes />
      <HealthcareSegments />
      <SecurityCompliance />
      <ImplementationTimeline />
      <FAQSection />
      <FinalCTASection />
      <HealthcarePageTracker />

      {/* Lead Form Section */}
      <LeadFormWrapper variant="industries" />
    </div>
  );
}