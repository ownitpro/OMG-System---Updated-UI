"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  SparklesIcon,
  BellAlertIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

// Preview features
const features = [
  {
    icon: GlobeAltIcon,
    title: "Multi-Industry Coverage",
    description: "Track up to 10 industries that matter to your business",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Your Channels",
    description: "Get digests via SMS, WhatsApp, or Email",
  },
  {
    icon: CalendarDaysIcon,
    title: "Your Cadence",
    description: "Daily or weekly—you choose how often",
  },
];

// Industries covered
const industries = [
  "Real Estate",
  "Construction",
  "HVAC",
  "Finance",
  "Healthcare",
  "Retail",
  "Consulting",
  "Education",
  "Hospitality",
  "Creative",
];

export default function OmgIqPage() {
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || userRole === "STAFF";
  const backToPortalHref = status === "loading" ? "/portal/client" : (isAdmin ? "/portal/admin/products" : "/portal/client");

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">OMG Systems</span>
            </Link>

            {/* Back to Portal */}
            <Link
              href={backToPortalHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          {/* Product Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 py-2 mb-6">
            <div className="w-6 h-6 rounded-lg bg-[#F59E0B] flex items-center justify-center">
              <BellAlertIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-[#F59E0B]">OMG-IQ</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Turn industry noise into<br />
            <span className="text-[#F59E0B]">daily smart moves.</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Get curated industry digests delivered to your phone. Short, skimmable, and actionable—so you stay ahead without doom-scrolling.
          </p>

          {/* Price Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-4 py-2">
              <span className="text-lg font-bold text-white">$9.97/month</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#F59E0B]" />
                6-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#F59E0B]" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-[#F59E0B]" />
                Secure checkout
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <Link
            href="/checkout/start?product=omg-iq&trial=true"
            className="inline-flex items-center gap-2 rounded-xl bg-[#F59E0B] px-8 py-4 text-lg font-semibold text-white hover:bg-[#D97706] transition-all shadow-lg shadow-[#F59E0B]/30 hover:shadow-xl hover:shadow-[#F59E0B]/40"
          >
            Start 6-Day Free Trial
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </section>

        {/* Features Preview */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">What you get</h2>
            <p className="text-white/60">Simple intelligence, delivered your way</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 text-center hover:border-[#F59E0B]/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-[#F59E0B]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#F59E0B]/10 via-[#1e293b] to-[#D97706]/10 p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Industries We Cover</h2>
              <p className="text-white/60 text-sm">Choose the ones that matter to you</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:border-[#F59E0B]/30 hover:text-[#F59E0B] transition-all cursor-default"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">How it works</h2>
            <p className="text-white/60">3 minutes to stay sharp</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">Choose Industries</h3>
              <p className="text-sm text-white/60">Select 1-10 industries you care about</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">Pick Your Channel</h3>
              <p className="text-sm text-white/60">SMS, WhatsApp, or Email—your choice</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">Get Your Digest</h3>
              <p className="text-sm text-white/60">Daily or weekly insights delivered</p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#F59E0B]/10 via-[#1e293b] to-[#D97706]/10 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to stay ahead?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Try OMG-IQ free for 6 days. Get smarter about your industry without the noise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout/start?product=omg-iq&trial=true"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F59E0B] px-8 py-4 text-lg font-semibold text-white hover:bg-[#D97706] transition-all shadow-lg shadow-[#F59E0B]/30 hover:shadow-xl hover:shadow-[#F59E0B]/40"
              >
                Start 6-Day Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/products/plans"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-lg font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                View All Plans
              </Link>
            </div>

            <p className="text-sm text-white/40 mt-6">
              Secure checkout powered by Stripe. Cancel anytime during your trial.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
