import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeGuard AI – Your 24/7 Client Concierge | OMGsystems",
  description:
    "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
  keywords: [
    "AI assistant",
    "appointment scheduling",
    "client concierge",
    "automated messaging",
    "time management",
    "AI scheduling",
    "business automation",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/timeguard-ai",
  },
  openGraph: {
    title: "TimeGuard AI – Your 24/7 Client Concierge | OMGsystems",
    description:
      "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    url: "https://www.omgsystems.com/solutions/timeguard-ai",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/timeguard-ai/timeguard-preview.png",
        width: 1200,
        height: 630,
        alt: "TimeGuard AI – 24/7 Client Concierge",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeGuard AI – Your 24/7 Client Concierge | OMGsystems",
    description:
      "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    images: ["https://www.omgsystems.com/images/timeguard-ai/timeguard-preview.png"],
  },
};

export default function TimeGuardAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
