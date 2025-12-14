import React from "react";
import { Metadata } from "next";
import { ROICalculatorShell } from "@/components/roi-calculators/roi-calculator-shell";

export const metadata: Metadata = {
  title: "Healthcare ROI Calculator | OMGsystems",
  description: "Calculate your time and cost savings with automated healthcare workflows. See how much you can save with OMGsystems automation.",
  keywords: "healthcare ROI, automation calculator, time savings, cost savings, Ontario healthcare",
  openGraph: {
    title: "Healthcare ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated healthcare workflows.",
    images: [
      {
        url: "/og/roi-healthcare.png",
        width: 1200,
        height: 630,
        alt: "Healthcare ROI Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated healthcare workflows.",
    images: ["/og/roi-healthcare.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/roi/healthcare"
  }
};

export default function HealthcareROIPage() {
  return (
    <ROICalculatorShell
      slug="healthcare"
    />
  );
}
