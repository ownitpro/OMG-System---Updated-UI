"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ServerIcon,
  GlobeAmericasIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClockIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  EyeSlashIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

const privacyPrinciples = [
  {
    title: "Canadian Data Residency",
    description: "All data stored exclusively in Canadian data centers. Never transferred outside Canada without consent.",
    icon: GlobeAmericasIcon,
    color: "emerald",
  },
  {
    title: "Bank-Level Encryption",
    description: "AES-256 encryption at rest, TLS 1.3 in transit. Your data is always protected.",
    icon: LockClosedIcon,
    color: "blue",
  },
  {
    title: "Minimal Collection",
    description: "We only collect what's essential. No unnecessary tracking, no selling data.",
    icon: EyeSlashIcon,
    color: "amber",
  },
  {
    title: "Strict Access Control",
    description: "Role-based access with complete audit logging. Only authorized personnel.",
    icon: FingerPrintIcon,
    color: "rose",
  },
];

const yourRights = [
  { right: "Access", description: "Request a copy of all data we hold about you" },
  { right: "Correction", description: "Update or correct any inaccurate information" },
  { right: "Deletion", description: "Request deletion of your personal data" },
  { right: "Portability", description: "Export your data in a machine-readable format" },
  { right: "Restriction", description: "Limit how we process your information" },
  { right: "Objection", description: "Object to certain types of data processing" },
];

const certifications = [
  { name: "SOC 2 Type II", description: "Certified security controls" },
  { name: "PIPEDA", description: "Canadian privacy compliance" },
  { name: "GDPR Ready", description: "European standards" },
  { name: "ISO 27001", description: "Security management" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[40%] right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[70%] left-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <ShieldCheckIcon className="w-4 h-4" />
              Privacy Policy
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Privacy{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
              At OMGsystems, privacy is a fundamental right. Our commitment to protecting your data is built into everything we do.
            </p>
            <p className="text-white/50 text-sm mb-10">Last updated: December 2024</p>

            {/* Certification Badges - Horizontal Strip */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                >
                  <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-white text-sm font-medium">{cert.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#your-rights"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                Your Rights
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                Contact Privacy Team
              </Link>
            </div>
          </div>
        </div>

        {/* ===== PRIVACY PRINCIPLES - Horizontal Scroll Cards ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Privacy{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Principles
              </span>
            </h2>
          </div>

          {/* Horizontal Layout with Connecting Line */}
          <div className="relative">
            {/* Line positioned at icon center: icon is 64px (h-16), so center is 32px from top */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 via-amber-500/30 to-rose-500/30" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {privacyPrinciples.map((principle, index) => (
                <div key={index} className="relative">
                  <div
                    className={`relative z-10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg ${
                      principle.color === "emerald"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30"
                        : principle.color === "blue"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/30"
                        : principle.color === "amber"
                        ? "bg-gradient-to-br from-amber-500 to-yellow-500 shadow-amber-500/30"
                        : "bg-gradient-to-br from-rose-500 to-pink-500 shadow-rose-500/30"
                    }`}
                  >
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                    <p className="text-sm text-white/60">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== WHAT DATA WE COLLECT - Accordion Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Data We{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Collect
                </span>
              </h2>
              <p className="text-white/60">Transparency about the information we gather.</p>
            </div>

            {/* Large Feature Cards - Stacked */}
            <div className="space-y-4">
              {/* Account Information */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl border border-blue-500/20 p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <UserGroupIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Account Information</h3>
                  </div>
                  <div className="flex-1 lg:pl-6 lg:border-l border-white/10">
                    <p className="text-white/60 text-sm">
                      Name, email, company details, and billing information to create and manage your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Data */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-amber-500/10 to-transparent rounded-2xl border border-amber-500/20 p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <DocumentTextIcon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Usage Data</h3>
                  </div>
                  <div className="flex-1 lg:pl-6 lg:border-l border-white/10">
                    <p className="text-white/60 text-sm">
                      Features accessed, performance metrics, and error logs to improve and optimize your experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Data */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl border border-emerald-500/20 p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ServerIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Business Data</h3>
                  </div>
                  <div className="flex-1 lg:pl-6 lg:border-l border-white/10">
                    <p className="text-white/60 text-sm">
                      Documents, workflows, and integrations you configure to provide our automation platform services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== YOUR RIGHTS - Modern Bento Grid ===== */}
        <div id="your-rights" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6">
              <UserGroupIcon className="w-4 h-4" />
              Your Control
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Rights
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Full control over your personal data. Always.</p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Large Feature Card - Access */}
            <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/20 p-8 hover:border-amber-400/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px] group-hover:bg-amber-500/30 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <CheckCircleIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Access Your Data</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Request a complete copy of all data we hold about you. Delivered within 30 days.
                </p>
                <div className="flex items-center gap-2 text-amber-400 font-medium">
                  <span>Request Now</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Correction */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-500">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Correction</h3>
              <p className="text-sm text-white/50">Update or correct any inaccurate information</p>
            </div>

            {/* Deletion */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-rose-400/50 hover:bg-rose-500/5 transition-all duration-500">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <EyeSlashIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Deletion</h3>
              <p className="text-sm text-white/50">Request complete deletion of your data</p>
            </div>

            {/* Portability */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-emerald-400/50 hover:bg-emerald-500/5 transition-all duration-500">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ServerIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Portability</h3>
              <p className="text-sm text-white/50">Export in machine-readable format</p>
            </div>

            {/* Restriction */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 hover:border-purple-400/50 hover:bg-purple-500/5 transition-all duration-500">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LockClosedIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Restriction</h3>
              <p className="text-sm text-white/50">Limit how we process your info</p>
            </div>

            {/* Objection - Full Width Card */}
            <div className="col-span-2 lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 p-6 hover:border-amber-400/30 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Object to Processing</h3>
                  <p className="text-sm text-white/50">Object to certain types of data processing at any time</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="mailto:privacy@omgsystems.ca"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full border border-amber-500/30 text-amber-400 font-medium hover:from-amber-500/30 hover:to-orange-500/30 hover:border-amber-400/50 transition-all duration-300"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Exercise Your Rights: privacy@omgsystems.ca
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ===== DATA RETENTION & SECURITY - Split Screen ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden">
            {/* Left - Data Retention (Dark) */}
            <div className="bg-gradient-to-br from-rose-500/20 to-rose-500/5 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <ClockIcon className="w-8 h-8 text-rose-400" />
                <h3 className="text-2xl font-bold text-white">Data Retention</h3>
              </div>

              <div className="space-y-6">
                <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-rose-400 before:rounded-full before:shadow-lg before:shadow-rose-400/50">
                  <p className="text-white font-medium">Active Accounts</p>
                  <p className="text-white/60 text-sm">Data retained while account is active</p>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-rose-400 before:rounded-full before:shadow-lg before:shadow-rose-400/50">
                  <p className="text-white font-medium">After Cancellation</p>
                  <p className="text-white/60 text-sm">Deleted within 30 days</p>
                </div>
                <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-rose-400 before:rounded-full before:shadow-lg before:shadow-rose-400/50">
                  <p className="text-white font-medium">Legal Compliance</p>
                  <p className="text-white/60 text-sm">Some records kept up to 7 years</p>
                </div>
              </div>
            </div>

            {/* Right - Security (Light) */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheckIcon className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Security Measures</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "End-to-end encryption",
                  "Penetration testing",
                  "24/7 monitoring",
                  "Multi-factor auth",
                  "Encrypted backups",
                  "Access logging",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== COOKIES & THIRD PARTIES - Inline Tags ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cookies &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Third Parties
              </span>
            </h2>
            <p className="text-white/60 mb-8">
              We use essential cookies for functionality. Analytics cookies require your consent. We never use advertising trackers.
            </p>

            {/* Cookie Types - Pill Style */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-5 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40 text-sm font-medium">
                ✓ Essential Cookies
              </span>
              <span className="px-5 py-2 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/40 text-sm font-medium">
                ⚙ Analytics (Optional)
              </span>
              <span className="px-5 py-2 bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/40 text-sm font-medium">
                ✗ No Ad Trackers
              </span>
            </div>

            {/* Third Party Services - Simple List */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 inline-block">
              <p className="text-white/50 text-sm mb-4">Trusted third-party services:</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {["Stripe (Payments)", "SendGrid (Email)", "AWS Canada (Hosting)", "Privacy-focused Analytics"].map((service, idx) => (
                  <span key={idx} className="text-white/70 text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTACT - Minimal Card ===== */}
        <div id="contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-amber-500/10 rounded-3xl border border-white/10 p-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-blue-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform">
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Privacy Questions?</h2>
              <p className="text-white/60 mb-6">Our Data Protection Officer responds within 48 hours.</p>

              <a
                href="mailto:privacy@omgsystems.ca"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4"
              >
                privacy@omgsystems.ca
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-amber-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Privacy You Can Trust
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Canadian data residency. World-class security. Complete control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
