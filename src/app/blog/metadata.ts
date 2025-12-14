import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "Business Automation Blog | OMGsystems",
  description:
    "Discover how Ontario businesses are transforming operations with automation. Case studies, insights, and guides from the OMGsystems team.",
  openGraph: {
    title: "Business Automation Blog | OMGsystems",
    description:
      "Ontario case studies & industry automation insights by OMGsystems",
    url: "https://www.omgsystems.com/blog",
    images: [
      {
        url: "/og-images/blog-listing.png",
        width: 1200,
        height: 630,
        alt: "Automation blog insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Automation Blog | OMGsystems",
    description:
      "Ontario case studies & industry automation insights by OMGsystems",
    images: ["/og-images/blog-listing.png"],
  },
};
