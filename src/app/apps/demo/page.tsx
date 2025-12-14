import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

export const metadata: Metadata = {
  title: "Try Live Demos | OMGsystems",
  description: "Experience our powerful business automation tools with interactive demos. Try CRM, SecureVault Docs, and more.",
  openGraph: {
    title: "Try Live Demos | OMGsystems",
    description: "Experience our powerful business automation tools with interactive demos. Try CRM, SecureVault Docs, and more.",
    type: "website",
  },
};

const demos = [
  {
    title: "CRM Demo",
    description: "See how our intelligent pipelines automate your sales and client follow-up.",
    href: "/apps/demo/crm",
    features: ["Lead capture & scoring", "Automated nurture sequences", "Deal board & tasks", "Dashboards & analytics"],
    color: "bg-blue-50 border-blue-200",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "SecureVault Docs Demo",
    description: "Experience bank-grade document security and compliance automation.",
    href: "/apps/demo/securevault-docs",
    features: ["Upload → OCR → Auto-file", "Request lists & reminders", "Short-lived secure links", "Audit trail & retention"],
    color: "bg-green-50 border-green-200",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Try Live Demos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Experience our powerful business automation tools with interactive demos. 
              See how OMGsystems can transform your workflows in minutes.
            </p>
          </div>
        </Container>
      </Section>

      {/* Demo Cards */}
      <Section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demos.map((demo, index) => (
                <div
                  key={index}
                  className={`${demo.color} border-2 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {demo.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {demo.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      What you can try:
                    </h3>
                    <ul className="space-y-2">
                      {demo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={demo.href}
                    className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white ${demo.buttonColor} transition-colors`}
                  >
                    Try {demo.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need a Custom Demo?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team can walk you through industry-specific workflows tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}