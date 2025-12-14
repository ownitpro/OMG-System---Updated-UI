import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OMGsystems — Automation that puts your growth first",
  description: "We design industry-specific systems for property management, real estate, contractors, accounting, cleaning, and healthcare. Canadian privacy, clear outcomes, fast delivery.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OMGsystems",
    description: "We build real workflows, not busywork — with security, privacy, and outcomes you can measure.",
    url: "https://www.omgsystems.com/about",
    type: "website",
    images: [
      {
        url: "/og/about.jpg",
        width: 1200,
        height: 630,
        alt: "About OMGsystems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OMGsystems",
    description: "We build real workflows, not busywork — with security, privacy, and outcomes you can measure.",
    images: ["/og/about.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
