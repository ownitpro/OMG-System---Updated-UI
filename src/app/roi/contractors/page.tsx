import React from "react";
import { Metadata } from "next";
import { ROICalculatorShell } from "@/components/roi-calculators/roi-calculator-shell";

export const metadata: Metadata = {
  title: "Contractors ROI Calculator | OMGsystems",
  description: "Calculate your time and cost savings with automated contractor workflows. See how much you can save with OMGsystems automation.",
  keywords: "contractors ROI, automation calculator, time savings, cost savings, Ontario contractors",
  openGraph: {
    title: "Contractors ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated contractor workflows.",
    images: [
      {
        url: "/og/roi-contractors.png",
        width: 1200,
        height: 630,
        alt: "Contractors ROI Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contractors ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated contractor workflows.",
    images: ["/og/roi-contractors.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/roi/contractors"
  }
};

export default function ContractorsROIPage() {
  return (
    <ROICalculatorShell
      slug="contractors"
    />
  );
}
