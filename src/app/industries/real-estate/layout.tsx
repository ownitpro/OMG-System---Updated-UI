import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Performance Engine™ | OMGsystems",
  description: "Automate your real estate workflow — lead capture, CRM, listings, marketing, and transactions — designed for Canadian agents and brokerages.",
  alternates: { canonical: "/industries/real-estate" },
  openGraph: {
    title: "Property Performance Engine™ | OMGsystems",
    description: "Close more deals with less work. Lead capture, CRM, listings, and transaction automation for Canadian agents and brokerages.",
    url: "https://www.omgsystems.com/industries/real-estate",
    type: "website",
    images: [
      {
        url: "/og/real-estate.jpg",
        width: 1200,
        height: 630,
        alt: "OMGsystems Real Estate Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Performance Engine™ | OMGsystems",
    description: "Lead capture, CRM, listings, marketing, and transaction automation for Canadian real estate.",
    images: ["/og/real-estate.jpg"],
  },
  robots: { index: true, follow: true },
  keywords: "real estate CRM Canada, realtor automation Ontario, property management software, brokerage dashboard",
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
