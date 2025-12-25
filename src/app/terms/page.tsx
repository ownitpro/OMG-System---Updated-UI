"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ScaleIcon,
  ClockIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  HandRaisedIcon,
  GlobeAmericasIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  XMarkIcon,
  ArrowPathIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-1/4 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute top-[35%] right-1/3 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[65%] left-1/3 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              <ScaleIcon className="w-4 h-4" />
              Legal Agreement
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Terms of{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
              Clear, fair terms that protect both you and OMGsystems. No legal jargon, just straightforward agreements.
            </p>
            <p className="text-white/50 text-sm mb-10">Effective: December 2024 • Last Updated: December 25, 2024</p>

            {/* Quick Navigation Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Acceptable Use", href: "#acceptable-use" },
                { label: "Payments", href: "#payments" },
                { label: "Your Data", href: "#your-data" },
                { label: "Liability", href: "#liability" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-cyan-500/30 text-white/70 hover:text-white text-sm transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== AGREEMENT OVERVIEW - Horizontal Timeline Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 rounded-3xl border border-white/10 p-8 lg:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Agreement at a Glance
              </h2>
              <p className="text-white/50">What you're agreeing to when you use OMGsystems</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckBadgeIcon,
                  title: "You Agree To",
                  description: "Use our services lawfully and respect other users",
                  color: "emerald",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "We Promise",
                  description: "Secure, reliable service with 99.9% uptime guarantee",
                  color: "cyan",
                },
                {
                  icon: CreditCardIcon,
                  title: "Fair Billing",
                  description: "Transparent pricing, cancel anytime, no hidden fees",
                  color: "orange",
                },
                {
                  icon: LockClosedIcon,
                  title: "Data Protected",
                  description: "Your data stays yours, encrypted and in Canada",
                  color: "violet",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      item.color === "emerald"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25"
                        : item.color === "cyan"
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25"
                        : item.color === "orange"
                        ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25"
                        : "bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25"
                    }`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ACCEPTABLE USE - Dos and Don'ts Split ===== */}
        <div id="acceptable-use" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
              <HandRaisedIcon className="w-4 h-4" />
              Section 1
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Acceptable{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Use
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* DO */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/20 p-8 hover:border-emerald-400/40 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400">You Can</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Use our automation tools for legitimate business operations",
                  "Store and process your business documents securely",
                  "Integrate with approved third-party applications",
                  "Access your data anytime via our API",
                  "Share access with authorized team members",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckBadgeIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="rounded-3xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 border border-rose-500/20 p-8 hover:border-rose-400/40 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                  <XMarkIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-rose-400">You Cannot</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Use our services for any illegal or fraudulent activity",
                  "Attempt to bypass security measures or access restrictions",
                  "Share login credentials with unauthorized parties",
                  "Store malicious content or malware on our platform",
                  "Resell or redistribute our services without permission",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XMarkIcon className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== PAYMENTS & BILLING - Stacked Cards with Icons ===== */}
        <div id="payments" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium mb-4">
              <CreditCardIcon className="w-4 h-4" />
              Section 2
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Payments &{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Billing
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                icon: CreditCardIcon,
                title: "Billing Cycle",
                content: "Subscriptions are billed monthly or annually in advance. Your billing date is the day you first subscribed.",
                highlight: "Monthly or Annual",
              },
              {
                icon: ArrowPathIcon,
                title: "Automatic Renewal",
                content: "Subscriptions auto-renew unless cancelled. You'll receive email reminders 7 days before renewal.",
                highlight: "Cancel Anytime",
              },
              {
                icon: ClockIcon,
                title: "Refund Policy",
                content: "Request a full refund within 14 days of your initial purchase if you're not satisfied. No questions asked.",
                highlight: "14-Day Guarantee",
              },
              {
                icon: ExclamationTriangleIcon,
                title: "Failed Payments",
                content: "If payment fails, we'll retry 3 times over 10 days. After that, your account may be suspended until resolved.",
                highlight: "Grace Period",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-all">
                  <item.icon className="w-7 h-7 text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className="px-2 py-0.5 bg-orange-500/20 rounded-full text-orange-400 text-xs font-medium">
                      {item.highlight}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== YOUR DATA - Bento Grid ===== */}
        <div id="your-data" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium mb-4">
              <LockClosedIcon className="w-4 h-4" />
              Section 3
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Data
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Large Card */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-transparent border border-violet-500/20 p-8 hover:border-violet-400/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/20 rounded-full blur-[100px] group-hover:bg-violet-500/30 transition-all" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/25">
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Data Ownership</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Your data belongs to you. Always. We never sell, share, or use your data for advertising.
                  You can export or delete your data at any time.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Export Anytime", "Delete on Request", "No Data Mining"].map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-violet-500/20 rounded-full text-violet-300 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Small Cards */}
            <div className="group rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all duration-500">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <GlobeAmericasIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Canadian Hosting</h3>
              <p className="text-sm text-white/50">All data stored in Canadian data centers. PIPEDA compliant.</p>
            </div>

            <div className="group rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-emerald-400/50 hover:bg-emerald-500/5 transition-all duration-500">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <LockClosedIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Encryption</h3>
              <p className="text-sm text-white/50">AES-256 at rest, TLS 1.3 in transit. Bank-level security.</p>
            </div>

            {/* Wide Card */}
            <div className="md:col-span-3 group rounded-3xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 p-6 hover:border-violet-400/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Data Retention</h3>
                  <p className="text-white/60">
                    Active accounts: data retained indefinitely. After cancellation: 30-day grace period for reactivation, then permanent deletion.
                    Backup copies removed within 90 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LIABILITY & DISCLAIMERS - Alternating Layout ===== */}
        <div id="liability" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium mb-4">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Section 4
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Liability &{" "}
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Disclaimers
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-orange-500/50 to-amber-500/50 hidden md:block" />

              <div className="space-y-8">
                {[
                  {
                    title: "Service Availability",
                    content: "We strive for 99.9% uptime but cannot guarantee uninterrupted service. Scheduled maintenance is announced 48 hours in advance.",
                    color: "rose",
                  },
                  {
                    title: "Limitation of Liability",
                    content: "Our liability is limited to the amount you've paid us in the past 12 months. We're not liable for indirect, incidental, or consequential damages.",
                    color: "orange",
                  },
                  {
                    title: "Third-Party Integrations",
                    content: "We're not responsible for third-party services you connect to OMGsystems. Each integration is subject to that provider's terms.",
                    color: "amber",
                  },
                  {
                    title: "Indemnification",
                    content: "You agree to indemnify OMGsystems against claims arising from your use of our services or violation of these terms.",
                    color: "rose",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex gap-6 md:pl-16">
                    <div
                      className={`absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center z-10 hidden md:flex ${
                        item.color === "rose"
                          ? "bg-gradient-to-br from-rose-500 to-pink-500"
                          : item.color === "orange"
                          ? "bg-gradient-to-br from-orange-500 to-amber-500"
                          : "bg-gradient-to-br from-amber-500 to-yellow-500"
                      }`}
                    >
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-rose-500/30 transition-all duration-300">
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== CHANGES & TERMINATION - Simple Centered ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-3xl border border-white/10 p-8 lg:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DocumentTextIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to These Terms</h2>
              <p className="text-white/60 mb-6">
                We may update these terms occasionally. Significant changes will be communicated via email at least 30 days before taking effect.
                Continued use after changes means you accept the new terms.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-white/5 rounded-full text-white/70">
                  📧 Email notifications for major changes
                </span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-white/70">
                  📅 30-day advance notice
                </span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-white/70">
                  📜 Version history available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTACT - Minimal Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-violet-500/10 rounded-3xl border border-white/10 p-10">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-emerald-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform">
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Questions About Terms?</h2>
              <p className="text-white/60 mb-6">Our legal team is here to clarify any questions.</p>

              <a
                href="mailto:legal@omgsystems.ca"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] mb-4"
              >
                legal@omgsystems.ca
              </a>

              <p className="text-white/40 text-sm">
                OMGsystems Inc. • Durham, Ontario, Canada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-emerald-600 to-teal-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            By using OMGsystems, you agree to these terms. Let's build something great together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Free Trial
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
