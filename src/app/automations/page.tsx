import type { Metadata } from "next";
import Link from "next/link";
import { AutomationGrid } from "@/components/automations/AutomationGrid";
import { CTASection } from "@/components/common/cta-section";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "Automation & Workflows | OMGsystems",
  description: "Explore ready-to-deploy automations and workflows from OMGsystems that save time, reduce admin, and scale your business effortlessly.",
  openGraph: {
    title: "Automation & Workflows | OMGsystems",
    description: "Explore ready-to-deploy automations and workflows from OMGsystems that save time, reduce admin, and scale your business effortlessly.",
    url: "https://www.omgsystems.com/automations",
    images: [
      {
        url: "https://www.omgsystems.com/images/automations-og.jpg",
        width: 1200,
        height: 630,
        alt: "OMGsystems Automation & Workflows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation & Workflows | OMGsystems",
    description: "Explore ready-to-deploy automations and workflows from OMGsystems that save time, reduce admin, and scale your business effortlessly.",
    images: ["https://www.omgsystems.com/images/automations-og.jpg"],
  },
};

export default function AutomationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automate the Busywork.
              <br />
              <span className="text-blue-600">Scale What Matters.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Quick-win automations you can implement in days, not months — built and maintained by OMGsystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book an Automation Demo
              </Link>
              <Link
                href="/pricing"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Grid Section */}
      <AutomationGrid showAll={true} />

      {/* CTA Section */}
      <CTASection
        title="Ready to Automate Your Business?"
        subtitle="Let our team help you identify the best automations for your specific needs and implement them quickly."
        primaryCta={{
          label: "Get Started Today",
          href: "/contact",
          id: "automations_cta_primary"
        }}
        secondaryCta={{
          label: "View Case Studies",
          href: "/case-snapshots",
          id: "automations_cta_secondary"
        }}
      />
    </div>
  );
}
