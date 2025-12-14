import React from "react";
import { Metadata } from "next";
import { ROICalculatorShell } from "@/components/roi-calculators/roi-calculator-shell";

export const metadata: Metadata = {
  title: "Cleaning ROI Calculator | OMGsystems",
  description: "Calculate your time and cost savings with automated cleaning workflows. See how much you can save with OMGsystems automation.",
  keywords: "cleaning ROI, automation calculator, time savings, cost savings, Ontario cleaning",
  openGraph: {
    title: "Cleaning ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated cleaning workflows.",
    images: [
      {
        url: "/og/roi-cleaning.png",
        width: 1200,
        height: 630,
        alt: "Cleaning ROI Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated cleaning workflows.",
    images: ["/og/roi-cleaning.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/roi/cleaning"
  }
};

export default function CleaningROIPage() {
  return (
    <ROICalculatorShell
      slug="cleaning"
    />
  );
}
