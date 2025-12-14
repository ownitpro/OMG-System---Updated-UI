import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadFlow Engine™ | OMGsystems",
  description: "Turn your ads into a predictable stream of qualified clients. Lead capture, instant follow-up, nurture, retargeting, and ROI feedback — end to end.",
  alternates: { canonical: "/apps/leadflow" },
  openGraph: {
    title: "LeadFlow Engine™ — predictable lead machine",
    description: "Strategy, creatives, Meta lead campaigns, instant CRM follow-up, nurture + retarget, and continuous optimization.",
    url: "https://www.omgsystems.com/apps/leadflow",
    type: "website",
    images: [
      {
        url: "/og/leadflow.jpg",
        width: 1200,
        height: 630,
        alt: "LeadFlow Engine dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadFlow Engine™ — predictable lead machine",
    description: "From first click to final sale with automated follow-up and ROI visibility.",
    images: ["/og/leadflow.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function LeadFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
