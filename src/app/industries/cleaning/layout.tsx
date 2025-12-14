import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Operations Engine™ | OMGsystems",
  description: "Automate quoting, scheduling, staff coordination, client communication, invoices, and reviews. Built for cleaning companies in Ontario and across Canada.",
  alternates: { canonical: "/industries/cleaning" },
  openGraph: {
    title: "Cleaning Operations Engine™ | OMGsystems",
    description: "From quote to review — automate the full cleaning workflow with one connected system.",
    url: "https://www.omgsystems.com/industries/cleaning",
    type: "website",
    images: [
      {
        url: "/og/cleaning.jpg",
        width: 1200,
        height: 630,
        alt: "OMGsystems Cleaning Operations Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Operations Engine™ | OMGsystems",
    description: "Automate quoting, scheduling, staff, invoices, and reviews — one connected system.",
    images: ["/og/cleaning.jpg"],
  },
  robots: { index: true, follow: true },
  keywords: "commercial cleaning software Canada, janitorial automation, cleaning CRM, staff scheduling software Canada",
};

export default function CleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
