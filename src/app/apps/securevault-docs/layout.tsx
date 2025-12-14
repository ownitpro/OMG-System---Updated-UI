import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SecureVault Docs | OMGsystems",
  description: "Secure, automated document management with Canadian data residency, audit trails, and predictable billing. Works with any CRM.",
  alternates: { canonical: "/apps/securevault-docs" },
  openGraph: {
    title: "SecureVault Docs — the vault that files itself",
    description: "Collect, organize, and secure documents automatically. Built in Canada with KMS encryption.",
    url: "https://www.omgsystems.com/apps/securevault-docs",
    type: "website",
    images: [
      {
        url: "/og/securevault-docs.jpg",
        width: 1200,
        height: 630,
        alt: "SecureVault Docs dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureVault Docs — the vault that files itself",
    description: "Secure, automated document management with Canadian data residency and audit trails. Works with any CRM.",
    images: ["/og/securevault-docs.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function SecureVaultDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
