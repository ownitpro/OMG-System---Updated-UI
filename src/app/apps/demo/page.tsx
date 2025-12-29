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
  },
  {
    title: "SecureVault Docs Demo",
    description: "Experience bank-grade document security and compliance automation.",
    href: "/apps/demo/securevault-docs",
    features: ["Upload → OCR → Auto-file", "Request lists & reminders", "Short-lived secure links", "Audit trail & retention"],
  },
];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#1f1e1e] py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Try Live <span className="text-[#47BD79]">Demos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8">
              Experience our powerful business automation tools with interactive demos.
              See how OMGsystems can transform your workflows in minutes.
            </p>
          </div>
        </Container>
      </Section>

      {/* Demo Cards */}
      <Section className="py-16 bg-[#0f172a]">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demos.map((demo, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {demo.title}
                  </h2>
                  <p className="text-white/70 mb-6">
                    {demo.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3">
                      What you can try:
                    </h3>
                    <ul className="space-y-2">
                      {demo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#47BD79]/20 text-[#47BD79] text-xs">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={demo.href}
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white bg-[#47BD79] hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-[0_0_20px_rgba(71,189,121,0.4)]"
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
      <Section className="py-16 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-[#47BD79]/20 shadow-[0_0_40px_rgba(71,189,121,0.15)]">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need a Custom Demo?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Our team can walk you through industry-specific workflows tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium text-white bg-[#47BD79] hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-[0_0_20px_rgba(71,189,121,0.4)]"
                >
                  Contact Sales
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium text-white border border-white/20 hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}