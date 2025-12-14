import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Demo | OMGsystems",
  description: "Explore industry-specific CRM sandbox with synthetic data.",
  alternates: { canonical: "/apps/demo/crm" },
  robots: { index: false, follow: true },
};

export default function CRMDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
