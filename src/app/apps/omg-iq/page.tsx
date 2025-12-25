import { Metadata } from "next";
import { OMGIQAppPage } from "@/components/apps/OMGIQAppPage";

export const metadata: Metadata = {
  title: "OMGIQ – Turn Industry Noise Into Daily Smart Moves | OMGsystems",
  description:
    "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
  keywords: [
    "industry intelligence",
    "SMS digests",
    "WhatsApp business",
    "industry insights",
    "daily digest",
    "business intelligence",
    "industry news",
    "SMS notifications",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/apps/omg-iq",
  },
  openGraph: {
    title: "OMGIQ – Turn Industry Noise Into Daily Smart Moves | OMGsystems",
    description:
      "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
    url: "https://www.omgsystems.com/apps/omg-iq",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/omg-iq/omg-iq-preview.png",
        width: 1200,
        height: 630,
        alt: "OMGIQ – Industry intelligence delivered via SMS and WhatsApp",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMGIQ – Turn Industry Noise Into Daily Smart Moves | OMGsystems",
    description:
      "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
    images: ["https://www.omgsystems.com/images/omg-iq/omg-iq-preview.png"],
  },
};

export default function OMGIQPageWrapper() {
  return <OMGIQAppPage />;
}
