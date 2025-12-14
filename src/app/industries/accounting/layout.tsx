import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounting Automation for Canadian Firms | OMGsystems",
  description: "Automate client intake, document capture, KYC, scheduling, e-sign, billing and audit readiness. PHIPA/PIPEDA-aligned with Canadian data residency.",
  alternates: { canonical: "/industries/accounting" },
  openGraph: {
    title: "Accounting Automation for Canadian Firms | OMGsystems",
    description: "Automate intake, documents, KYC, e-sign and billing. Built for Canadian accounting firms.",
    url: "https://www.omgsystems.com/industries/accounting",
    type: "website",
    images: [{ url: "/og/accounting.jpg", width: 1200, height: 630, alt: "OMGsystems Accounting Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accounting Automation for Canadian Firms | OMGsystems",
    description: "Automate intake, documents, KYC, e-sign and billing. Built for Canadian accounting firms.",
    images: ["/og/accounting.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
