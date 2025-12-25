// app/contact/layout.tsx
import * as React from "react";
import type { Metadata } from "next";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: contact.meta.canonical },
  openGraph: {
    title: contact.meta.title,
    description: contact.meta.description,
    images: [{ url: contact.meta.ogImage, width: 1200, height: 630, alt: "Contact OMGsystems" }],
    type: "website",
  },
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image", title: contact.meta.title, description: contact.meta.description, images: [contact.meta.ogImage] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
