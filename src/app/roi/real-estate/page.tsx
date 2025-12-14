import React from "react";
import { Metadata } from "next";
import { ROICalculatorShell } from "@/components/roi-calculators/roi-calculator-shell";

export const metadata: Metadata = {
  title: "Real Estate ROI Calculator | OMGsystems",
  description: "Calculate your time and cost savings with automated real estate workflows. See how much you can save with OMGsystems automation.",
  keywords: "real estate ROI, automation calculator, time savings, cost savings, Ontario real estate",
  openGraph: {
    title: "Real Estate ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated real estate workflows.",
    images: [
      {
        url: "/og/roi-real-estate.png",
        width: 1200,
        height: 630,
        alt: "Real Estate ROI Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated real estate workflows.",
    images: ["/og/roi-real-estate.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/roi/real-estate"
  }
};

export default function RealEstateROIPage() {
  return (
    <ROICalculatorShell
      slug="real-estate"
    />
  );
}
