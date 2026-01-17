import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { IndustryBreadcrumbs } from "@/components/ui/breadcrumbs";
import { LeadFormWrapper } from "@/components/forms";

const industries = [
  {
    name: "Property Management",
    href: "/industries/property-management",
    description: "SmartRent Flow - Automate rent, maintenance, and owner reports",
    icon: "/icons/property/building.svg",
    features: ["Automated rent collection", "Maintenance tracking", "Owner dashboards", "Lease management"],
    stats: "Save 10+ admin hours/week"
  },
  {
    name: "Real Estate",
    href: "/industries/real-estate",
    description: "Agent Growth Engine - Automate the busywork, close more deals",
    icon: "/icons/realestate/house.svg",
    features: ["Lead capture & drips", "Automated showings", "Contract generation", "Client nurturing"],
    stats: "5x faster response time"
  },
  {
    name: "Accounting",
    href: "/industries/accounting",
    description: "Financial Workflow Engine - Automate 80% of your firm's grind",
    icon: "/icons/accounting/calculator.svg",
    features: ["Document capture", "Client onboarding", "Billing automation", "Compliance tracking"],
    stats: "70% less manual work"
  },
  {
    name: "Contractors",
    href: "/industries/contractors",
    description: "Project Growth Engine - Let automation handle the admin",
    icon: "/icons/contractors/helmet.svg",
    features: ["Lead generation", "Quote automation", "Project tracking", "Payment collection"],
    stats: "Steady lead flow year-round"
  }
];

export const metadata = {
  title: "Industry Solutions | OMGsystems Canada",
  description: "Discover how OMGsystems automates workflows for Property Management, Real Estate, Accounting, Contractors, Cleaning Services, and Healthcare across Canada.",
  openGraph: {
    title: "Industry Solutions | OMGsystems Canada",
    description: "Discover how OMGsystems automates workflows for Property Management, Real Estate, Accounting, Contractors, Cleaning Services, and Healthcare across Canada.",
    url: "/industries",
    images: ["/og/industries.jpg"],
  },
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <Container className="relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-8 backdrop-blur-xl">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Industry Solutions
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Built for
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 animate-gradient">
                Your Industry
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Automation solutions designed specifically for your industry's unique challenges.
              <span className="block mt-2 text-white/50">
                From property management to contractors—we've got you covered.
              </span>
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-purple-500/10 border border-purple-500/30 backdrop-blur-xl rounded-2xl">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">4</div>
                <div className="text-xs text-white/60 font-medium">Industries</div>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-500/10 border border-blue-500/30 backdrop-blur-xl rounded-2xl">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">10+</div>
                <div className="text-xs text-white/60 font-medium">Hours Saved/Week</div>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl rounded-2xl">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">1-3</div>
                <div className="text-xs text-white/60 font-medium">Week Setup</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="relative py-24">
        <Container className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Industry
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium">
              Powerful automation tailored to your specific workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {industries.map((industry, index) => {
              const gradients = [
                'from-blue-500/20 to-cyan-500/10',
                'from-emerald-500/20 to-teal-500/10',
                'from-indigo-500/20 to-violet-500/10',
                'from-yellow-500/20 to-amber-500/10',
              ];
              const borderColors = [
                'border-blue-500/30',
                'border-emerald-500/30',
                'border-indigo-500/30',
                'border-yellow-500/30',
              ];
              const statColors = [
                'from-blue-400 to-cyan-400',
                'from-emerald-400 to-teal-400',
                'from-indigo-400 to-violet-400',
                'from-yellow-400 to-amber-400',
              ];

              return (
                <Link
                  key={index}
                  href={industry.href}
                  className={`group relative bg-gradient-to-br ${gradients[index]} backdrop-blur-xl border ${borderColors[index]} rounded-3xl p-8 hover:scale-[1.02] transition-all duration-500 overflow-hidden`}
                >
                  {/* Animated Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:scale-105 transition-transform">
                          {industry.name}
                        </h3>
                        <p className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${statColors[index]}`}>
                          {industry.stats}
                        </p>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <img src={industry.icon} alt="" className="h-8 w-8 brightness-150" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 mb-6 text-lg font-medium leading-relaxed">
                      {industry.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {industry.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-white/70 font-medium">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${statColors[index]}`} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className={`flex items-center justify-between px-6 py-4 bg-gradient-to-r ${gradients[index]} border ${borderColors[index]} rounded-2xl group-hover:shadow-xl group-hover:shadow-${borderColors[index].split('-')[1]}-500/20 transition-all`}>
                      <span className="font-bold text-white text-lg">Explore Solutions</span>
                      <ArrowRightIcon className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradients[index]} rounded-bl-full opacity-50`} />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 my-20 overflow-hidden">
        {/* Full gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600" />

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Don't See Your
              <span className="block">Industry?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium">
              We work with businesses across all industries. Contact us to discuss how we can
              customize our automation solutions for your specific needs.
            </p>

            <Link
              href="#lead-form"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-2xl font-black text-lg hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
            >
              Let's Talk
              <ArrowRightIcon className="w-6 h-6" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form">
        <LeadFormWrapper variant="industries" />
      </section>
    </main>
  );
}
