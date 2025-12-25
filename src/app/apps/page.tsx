import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omgsystems.com"),
  title: "OMGsystems Apps - Business Automation Solutions",
  description: "Discover our suite of business automation apps: CRM, SecureVault Docs, LeadFlow, Content Engine, and Industry IQ. Transform your business operations with intelligent automation.",
  openGraph: {
    title: "OMGsystems Apps - Business Automation Solutions",
    description: "Transform your business with our suite of automation apps designed for property management, real estate, contractors, accounting, healthcare, and cleaning industries.",
    url: "https://www.omgsystems.com/apps",
    images: [
      {
        url: "/og-images/apps-banner.png",
        width: 1200,
        height: 630,
        alt: "OMGsystems Business Automation Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OMGsystems Apps - Business Automation Solutions",
    description: "Transform your business with our suite of automation apps designed for property management, real estate, contractors, accounting, healthcare, and cleaning industries.",
    images: ["/og-images/apps-banner.png"],
  },
};

const apps = [
  {
    name: "OMG CRM",
    slug: "crm",
    description: "Complete customer relationship management with intelligent automation, lead scoring, and workflow optimization.",
    features: ["Lead Management", "Pipeline Automation", "Contact Management", "Sales Analytics"],
    icon: "📊",
    href: "/apps/crm",
    demoHref: "/demo/crm",
    color: "bg-blue-500/20",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
  },
  {
    name: "SecureVault Docs",
    slug: "securevault",
    description: "Secure document management with automated workflows, e-signatures, and compliance tracking.",
    features: ["Document Storage", "E-Signatures", "Workflow Automation", "Compliance Tracking"],
    icon: "🔒",
    href: "/apps/securevault",
    demoHref: "/demo/securevault-docs",
    color: "bg-[#47BD79]/20",
    textColor: "text-[#47BD79]",
    borderColor: "border-[#47BD79]/30",
  },
  {
    name: "LeadFlow Engine",
    slug: "leadflow",
    description: "Intelligent lead generation and nurturing with automated follow-ups and conversion optimization.",
    features: ["Lead Generation", "Automated Follow-ups", "Conversion Tracking", "ROI Analytics"],
    icon: "🎯",
    href: "/apps/leadflow",
    demoHref: "/demo/leadflow",
    color: "bg-purple-500/20",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Content Engine",
    slug: "content-engine",
    description: "AI-powered content creation and management for marketing campaigns and customer communications.",
    features: ["AI Content Creation", "Campaign Management", "Template Library", "Performance Analytics"],
    icon: "📝",
    href: "/apps/content-engine",
    demoHref: "/demo/content-engine",
    color: "bg-orange-500/20",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
  },
  {
    name: "Industry IQ",
    slug: "industry-iq",
    description: "Industry-specific intelligence and automation tailored for your business sector and compliance requirements.",
    features: ["Industry Insights", "Compliance Automation", "Best Practices", "Performance Benchmarking"],
    icon: "🧠",
    href: "/apps/industry-iq",
    demoHref: "/demo/industry-iq",
    color: "bg-indigo-500/20",
    textColor: "text-indigo-400",
    borderColor: "border-indigo-500/30",
  },
];

const industries = [
  { name: "Property Management", href: "/industries/property-management" },
  { name: "Real Estate", href: "/industries/real-estate" },
  { name: "Contractors", href: "/industries/contractors" },
  { name: "Accounting", href: "/industries/accounting" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Cleaning", href: "/industries/cleaning" },
];

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#1f1e1e] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              OMGsystems <span className="text-[#47BD79]">Apps</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-4xl mx-auto">
              Transform your business with our suite of intelligent automation apps.
              Built for modern businesses across all industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo/crm"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white rounded-lg font-semibold hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-[0_0_20px_rgba(71,189,121,0.4)]"
              >
                Try All Apps Free
              </Link>
              <Link
                href="/case-snapshots"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Business Automation Suite
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Five powerful apps working together to automate your entire business workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app) => (
              <div
                key={app.slug}
                className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl border ${app.borderColor} hover:border-[#47BD79]/50 transition-all duration-600 ease-premium-out overflow-hidden`}
              >
                {/* App Icon */}
                <div className={`${app.color} p-6 text-center`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl text-2xl mb-4`}>
                    {app.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{app.name}</h3>
                  <p className="text-white/70 leading-relaxed">{app.description}</p>
                </div>

                {/* Features */}
                <div className="p-6">
                  <h4 className="font-semibold text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-white/70">
                        <svg className="w-4 h-4 text-[#47BD79] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={app.href}
                      className={`inline-flex items-center justify-center px-4 py-2 ${app.textColor} border border-current rounded-lg font-medium hover:bg-white/10 transition-all duration-600 ease-premium-out`}
                    >
                      Learn More
                    </Link>
                    <Link
                      href={app.demoHref}
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#47BD79] text-white rounded-lg font-medium hover:bg-[#3da86a] transition-all duration-600 ease-premium-out"
                    >
                      Try Demo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section - Dark Glass Theme */}
      <section className="py-20 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Seamless Integration
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              All apps work together seamlessly, sharing data and automating workflows across your entire business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/60">Deploy in minutes, not months. Get up and running with pre-built industry templates.</p>
            </div>

            <div className="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#47BD79]/20 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-[#47BD79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Compliant</h3>
              <p className="text-white/60">Canadian data residency, encryption, and compliance with industry standards.</p>
            </div>

            <div className="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Loved by Teams</h3>
              <p className="text-white/60">Intuitive design that your team will actually want to use every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Focus - Dark Glass Theme */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Each app is customized with industry-specific workflows, compliance requirements, and best practices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="group p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#47BD79]/30 hover:bg-white/10 transition-all duration-600 ease-premium-out text-center"
              >
                <h3 className="font-semibold text-white/80 group-hover:text-[#47BD79] transition-colors">
                  {industry.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Glass Theme */}
      <section className="py-20 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-[#47BD79]/20 shadow-[0_0_40px_rgba(71,189,121,0.15)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-white/70">
              Join thousands of businesses already using OMGsystems to automate their workflows and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo/crm"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white rounded-lg font-semibold hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-[0_0_20px_rgba(71,189,121,0.4)]"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
