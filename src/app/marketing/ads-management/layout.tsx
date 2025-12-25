import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ads Management – Done-For-You Paid Advertising | OMGsystems",
  description:
    "We handle your entire ad strategy — from setup to optimization — so you can focus on closing deals, not managing campaigns. Google Ads, Meta, LinkedIn & more.",
  keywords: [
    "ads management",
    "paid advertising",
    "Google Ads management",
    "Facebook Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "PPC management",
    "ad campaign management",
    "digital advertising agency",
    "ad optimization",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/marketing/ads-management",
  },
  openGraph: {
    title: "Ads Management – Done-For-You Paid Advertising | OMGsystems",
    description:
      "We handle your entire ad strategy — from setup to optimization — so you can focus on closing deals, not managing campaigns.",
    url: "https://www.omgsystems.com/marketing/ads-management",
    siteName: "OMGsystems",
    type: "website",
  },
};

export default function AdsManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
