import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadFlow Engine™ | OMGsystems",
  description: "Transform your lead generation with automated follow-up sequences, intelligent scoring, and seamless CRM integration. See how LeadFlow Engine™ can 3x your conversion rates.",
  keywords: "lead generation, CRM automation, lead scoring, follow-up sequences, conversion optimization, Ontario business",
  openGraph: {
    title: "LeadFlow Engine™ | OMGsystems",
    description: "Transform your lead generation with automated follow-up sequences, intelligent scoring, and seamless CRM integration.",
    images: [
      {
        url: "/og/leadflow-v2.png",
        width: 1200,
        height: 630,
        alt: "LeadFlow Engine™ - Automated Lead Generation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadFlow Engine™ | OMGsystems",
    description: "Transform your lead generation with automated follow-up sequences, intelligent scoring, and seamless CRM integration.",
    images: ["/og/leadflow-v2.png"]
  },
  alternates: {
    canonical: "https://omgsystems.com/campaign/leadflow-v2"
  }
};

export default function LeadFlowV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
