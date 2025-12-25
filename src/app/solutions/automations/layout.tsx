import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automations – Buy Your Time Back Every Week | OMGsystems",
  description:
    "We map your tools, remove repetitive work, and build automations that give you hours back every week—so you can focus on clients, family, and growth.",
  keywords: [
    "business automation",
    "workflow automation",
    "process automation",
    "time savings",
    "automated workflows",
    "business efficiency",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/automations",
  },
  openGraph: {
    title: "Automations – Buy Your Time Back Every Week | OMGsystems",
    description:
      "We map your tools, remove repetitive work, and build automations that give you hours back every week—so you can focus on clients, family, and growth.",
    url: "https://www.omgsystems.com/solutions/automations",
    siteName: "OMGsystems",
    type: "website",
  },
};

export default function AutomationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
