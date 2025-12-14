import type { Metadata } from "next";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { ToastContainer } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: {
    template: "%s | OMGsystems Portal",
    default: "Client Portal | OMGsystems",
  },
  description: "OMGsystems client portal for managing your account, documents, and support.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
  other: {
    "theme-color": "#0B1220",
  },
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ConsentBanner />
      <ToastContainer />
    </>
  );
}
