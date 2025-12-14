import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "Case Snapshots | OMGsystems",
  description:
    "Real results from businesses across industries — see how property, real estate, contractors, accounting, cleaning & healthcare firms grew with OMGsystems.",
  openGraph: {
    title: "Case Snapshots | OMGsystems",
    description:
      "Real results from businesses across industries — see how firms grew with OMGsystems.",
    url: "https://www.omgsystems.com/case-snapshots",
    images: [
      {
        url: "/og-images/case-snapshots-banner.png",
        width: 1200,
        height: 630,
        alt: "OMGsystems case snapshot outcomes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Snapshots | OMGsystems",
    description:
      "Real outcomes from property, real estate, contractors & more using OMGsystems.",
    images: ["/og-images/case-snapshots-banner.png"],
  },
};
