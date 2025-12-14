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
  return (
    <div className="min-h-screen bg-off text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-600">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li aria-hidden>›</li>
            <li><a href="/contact" className="text-neutral-900 font-medium">Contact</a></li>
          </ol>
        </nav>
        {children}
      </div>
    </div>
  );
}
