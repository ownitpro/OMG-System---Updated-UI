import React from "react";
import { Metadata } from "next";
import { ROICalculatorShell } from "@/components/roi-calculators/roi-calculator-shell";

export const metadata: Metadata = {
  title: "Accounting ROI Calculator | OMGsystems",
  description: "Calculate your time and cost savings with automated accounting workflows. See how much you can save with OMGsystems automation.",
  keywords: "accounting ROI, automation calculator, time savings, cost savings, Ontario accounting",
  openGraph: {
    title: "Accounting ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated accounting workflows.",
    images: [
      {
        url: "/og/roi-accounting.png",
        width: 1200,
        height: 630,
        alt: "Accounting ROI Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Accounting ROI Calculator | OMGsystems",
    description: "Calculate your time and cost savings with automated accounting workflows.",
    images: ["/og/roi-accounting.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/roi/accounting"
  }
};

export default function AccountingROIPage() {
  return (
    <ROICalculatorShell
      slug="accounting"
    />
  );
}
