import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demos | OMGsystems",
  description: "Try our CRM and SecureVault Docs in a safe sandbox with synthetic data.",
  alternates: { canonical: "/apps/demo" },
  openGraph: {
    title: "Demos | OMGsystems",
    description: "Try our CRM and SecureVault Docs in a safe sandbox with synthetic data.",
    url: "https://www.omgsystems.com/apps/demo",
    type: "website",
    images: [
      {
        url: "/og/demos.jpg",
        width: 1200,
        height: 630,
        alt: "OMGsystems Demo Hub",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
