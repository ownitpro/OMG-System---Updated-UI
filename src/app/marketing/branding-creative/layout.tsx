import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding & Creative – Build an Unforgettable Brand | OMGsystems",
  description:
    "We craft compelling brand identities and creative assets that capture attention, build trust, and drive lasting impressions. Complete branding from strategy to execution.",
  keywords: [
    "branding agency",
    "brand identity design",
    "logo design",
    "visual identity",
    "brand strategy",
    "creative agency",
    "brand guidelines",
    "marketing collateral",
    "brand development",
    "creative direction",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/marketing/branding-creative",
  },
  openGraph: {
    title: "Branding & Creative – Build an Unforgettable Brand | OMGsystems",
    description:
      "We craft compelling brand identities and creative assets that capture attention, build trust, and drive lasting impressions.",
    url: "https://www.omgsystems.com/marketing/branding-creative",
    siteName: "OMGsystems",
    type: "website",
  },
};

export default function BrandingCreativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
