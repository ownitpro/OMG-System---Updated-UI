import React from "react";
import { Metadata } from "next";
import { ROICalculatorShell } from "@/components/roi-calculators/roi-calculator-shell";

export const metadata: Metadata = {
  title: "Property Management ROI Calculator | OMGsystems",
  description: "Calculate your time and cost savings with automated property management workflows. See how much you can save with OMGsystems automation.",
  keywords: "property management ROI, automation calculator, time savings, cost savings, Ontario property management",
  openGraph: {
    title: "Property Management ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated property management workflows.",
    images: [
      {
        url: "/og/roi-property-management.png",
        width: 1200,
        height: 630,
        alt: "Property Management ROI Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated property management workflows.",
    images: ["/og/roi-property-management.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/roi/property-management"
  }
};

export default function PropertyManagementROIPage() {
  return (
    <ROICalculatorShell
      slug="property-management"
    />
  );
}
