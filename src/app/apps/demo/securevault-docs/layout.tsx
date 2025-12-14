import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SecureVault Docs Demo | OMGsystems",
  description: "See OCR auto-naming, checklists, and audit logs in a safe vault demo.",
  alternates: { canonical: "/apps/demo/securevault-docs" },
  robots: { index: false, follow: true },
};

export default function SecureVaultDocsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
