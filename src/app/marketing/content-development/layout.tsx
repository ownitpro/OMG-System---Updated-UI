import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Development – Done-For-You Content Systems | OMGsystems",
  description:
    "We plan, create, and optimize content systems that attract your ideal audience, build authority, and drive measurable business results. Strategy, SOPs, and scalable content production.",
  keywords: [
    "content development",
    "content strategy",
    "content creation",
    "content marketing",
    "SOP development",
    "content systems",
    "blog writing",
    "social media content",
    "email marketing",
    "lead magnets",
    "content production",
    "editorial calendar",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/marketing/content-development",
  },
  openGraph: {
    title: "Content Development – Done-For-You Content Systems | OMGsystems",
    description:
      "We plan, create, and optimize content systems that attract your ideal audience, build authority, and drive measurable business results.",
    url: "https://www.omgsystems.com/marketing/content-development",
    siteName: "OMGsystems",
    type: "website",
  },
};

export default function ContentDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
