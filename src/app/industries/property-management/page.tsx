import { Metadata } from "next";
import HeroSection from "@/components/property-management/HeroSection";
import BenefitsSection from "@/components/property-management/BenefitsSection";
import ProblemsSolutionsSection from "@/components/property-management/ProblemsSolutionsSection";
import FeaturesGrid from "@/components/property-management/FeaturesGrid";
import UseCasesSection from "@/components/property-management/UseCasesSection";
import SecurityComplianceSection from "@/components/property-management/SecurityComplianceSection";
import ImplementationTimeline from "@/components/property-management/ImplementationTimeline";
import FAQSection from "@/components/property-management/FAQSection";
import FinalCTASection from "@/components/property-management/FinalCTASection";
import PropertyManagementPageTracker from "@/components/property-management/PropertyManagementPageTracker";

export const metadata: Metadata = {
  title: "Property Management Automation | OMGsystems",
  description: "Automate operations, tenant & owner communications, maintenance, invoicing, and more with OMGsystems built for property management. Launch in 1–3 weeks.",
  keywords: "property management automation, tenant management, owner statements, maintenance workflows, property management software, real estate management, property operations",
  openGraph: {
    title: "Property Management Automation | OMGsystems",
    description: "Automate operations, tenant & owner communications, maintenance, invoicing, and more with OMGsystems built for property management. Launch in 1–3 weeks.",
    type: "website",
    images: [
      {
        url: "/images/property-management/property-dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "Property Management workflow dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management Automation | OMGsystems",
    description: "Automate operations, tenant & owner communications, maintenance, invoicing, and more with OMGsystems built for property management. Launch in 1–3 weeks.",
    images: ["/images/property-management/property-dashboard-preview.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/property-management",
  },
};

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-white">
      <PropertyManagementPageTracker />
      <HeroSection />
      <BenefitsSection />
      <ProblemsSolutionsSection />
      <FeaturesGrid />
      <UseCasesSection />
      <SecurityComplianceSection />
      <ImplementationTimeline />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}