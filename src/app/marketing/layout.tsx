import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Services | OMG Systems",
  description:
    "Strategic marketing that actually scales your business. From brand strategy to paid ads to content systems — we build marketing engines that drive real revenue.",
  openGraph: {
    title: "Marketing Services | OMG Systems",
    description:
      "Strategic marketing that actually scales your business. From brand strategy to paid ads to content systems — we build marketing engines that drive real revenue.",
    type: "website",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
