"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  ScaleIcon,
  GlobeAmericasIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  UserGroupIcon,
  ClockIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ServerStackIcon,
  EyeIcon,
  ArrowPathIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

const complianceFrameworks = [
  {
    name: "PIPEDA",
    fullName: "Personal Information Protection and Electronic Documents Act",
    status: "Compliant",
    description: "Canada's federal privacy law governing how private sector organizations collect, use, and disclose personal information.",
    color: "emerald",
  },
  {
    name: "SOC 2 Type II",
    fullName: "Service Organization Control 2",
    status: "Certified",
    description: "Independent audit verifying our security, availability, processing integrity, confidentiality, and privacy controls.",
    color: "emerald",
  },
  {
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    status: "Ready",
    description: "European Union regulation on data protection and privacy. We're ready to serve EU customers.",
    color: "amber",
  },
  {
    name: "ISO 27001",
    fullName: "Information Security Management",
    status: "In Progress",
    description: "International standard for managing information security. Certification expected Q2 2025.",
    color: "amber",
  },
];

const dataHandlingPractices = [
  {
    title: "Data Minimization",
    description: "We only collect data that's essential for providing our services. No excessive data collection.",
    icon: EyeIcon,
  },
  {
    title: "Purpose Limitation",
    description: "Your data is used only for the purposes you agreed to. No surprise uses.",
    icon: FlagIcon,
  },
  {
    title: "Storage Limitation",
    description: "Data retained only as long as necessary. Automatic deletion policies in place.",
    icon: ClockIcon,
  },
  {
    title: "Accuracy",
    description: "Tools to update and correct your data anytime. Keep your information current.",
    icon: ArrowPathIcon,
  },
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements - Traffic light colors */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute top-[35%] right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[65%] left-1/3 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <ScaleIcon className="w-4 h-4" />
              Regulatory Compliance
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Compliance{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                Without Compromise
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
              Meeting the highest regulatory standards so you can focus on your business.
              Canadian data residency, industry certifications, and transparent practices.
            </p>

            {/* Status Traffic Light */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                </div>
                <span className="text-sm text-white/60">Fully Compliant</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-500/30">
                  <div className="w-8 h-8 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50" />
                </div>
                <span className="text-sm text-white/60">In Progress</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-rose-500/30">
                  <div className="w-8 h-8 bg-rose-500/30 rounded-full" />
                </div>
                <span className="text-sm text-white/60">Not Required</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Request Compliance Report
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="#frameworks"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                View All Frameworks
              </a>
            </div>
          </div>
        </div>

        {/* ===== COMPLIANCE FRAMEWORKS - Expanding Cards ===== */}
        <div id="frameworks" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <DocumentCheckIcon className="w-4 h-4" />
              Certifications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Compliance{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Frameworks
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework, idx) => (
              <div
                key={idx}
                className={`group relative backdrop-blur-xl rounded-3xl border p-8 transition-all duration-500 hover:scale-[1.02] ${
                  framework.color === "emerald"
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10"
                    : "bg-amber-500/5 border-amber-500/20 hover:border-amber-400/40 hover:bg-amber-500/10"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{framework.name}</h3>
                    <p className="text-sm text-white/40">{framework.fullName}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      framework.status === "Certified" || framework.status === "Compliant"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : framework.status === "Ready"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {framework.status}
                  </span>
                </div>
                <p className="text-white/60">{framework.description}</p>

                {/* Status indicator bar */}
                <div className="mt-6 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      framework.status === "Certified" || framework.status === "Compliant"
                        ? "w-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        : framework.status === "Ready"
                        ? "w-3/4 bg-gradient-to-r from-amber-500 to-yellow-500"
                        : "w-1/2 bg-gradient-to-r from-amber-500 to-yellow-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== DATA RESIDENCY - Split Visual ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left - Map Visual (2 cols) */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-3xl blur-[40px]" />
                <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <GlobeAmericasIcon className="w-32 h-32 text-emerald-400/30" />
                      <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                          <div className="relative w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                            <span className="text-xs">🇨🇦</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white font-bold text-xl mt-4">100% Canadian</p>
                    <p className="text-white/50 text-sm">Data never leaves Canada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content (3 cols) */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                <FlagIcon className="w-4 h-4" />
                Data Sovereignty
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Canadian Data{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Residency
                </span>
              </h2>
              <p className="text-white/60 mb-8 text-lg leading-relaxed">
                Your data is stored exclusively in Canadian data centers. We comply with all Canadian privacy
                laws and never transfer data outside the country without explicit consent.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: BuildingOfficeIcon, title: "Toronto DC", desc: "Primary infrastructure" },
                  { icon: ServerStackIcon, title: "Montreal DC", desc: "Redundant backups" },
                  { icon: ShieldCheckIcon, title: "PIPEDA", desc: "Full compliance" },
                  { icon: LockClosedIcon, title: "Encrypted", desc: "In transit & at rest" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== DATA HANDLING - Horizontal Scroll Pills ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-4">
              <ClipboardDocumentCheckIcon className="w-4 h-4" />
              Best Practices
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Data Handling{" "}
              <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                Principles
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataHandlingPractices.map((practice, idx) => (
              <div
                key={idx}
                className="group relative backdrop-blur-xl bg-white/[0.03] rounded-2xl border border-white/10 p-6 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <practice.icon className="w-7 h-7 text-rose-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{practice.title}</h3>
                <p className="text-sm text-white/50">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== AUDIT & REPORTING - Timeline ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-rose-500/10 rounded-3xl border border-white/10 p-8 lg:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Audit &{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                  Reporting
                </span>
              </h2>
              <p className="text-white/50">Transparent compliance monitoring and reporting</p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-rose-500/30 -translate-y-1/2 rounded-full" />

              <div className="grid md:grid-cols-4 gap-6 relative">
                {[
                  { period: "Daily", task: "Automated security scans", color: "emerald" },
                  { period: "Weekly", task: "Access log reviews", color: "emerald" },
                  { period: "Monthly", task: "Compliance assessments", color: "amber" },
                  { period: "Annually", task: "Third-party audits", color: "rose" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 ${
                        item.color === "emerald"
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
                          : item.color === "amber"
                          ? "bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30"
                          : "bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/30"
                      }`}
                    >
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`font-bold mb-1 ${
                      item.color === "emerald" ? "text-emerald-400" :
                      item.color === "amber" ? "text-amber-400" : "text-rose-400"
                    }`}>
                      {item.period}
                    </h3>
                    <p className="text-sm text-white/60">{item.task}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== YOUR RIGHTS - Checklist Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - What We Do */}
            <div className="backdrop-blur-xl bg-emerald-500/5 rounded-3xl border border-emerald-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Our Commitments</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Maintain up-to-date compliance certifications",
                  "Conduct regular third-party security audits",
                  "Provide transparent data processing information",
                  "Respond to data subject requests within 30 days",
                  "Notify of breaches within 72 hours",
                  "Appoint a dedicated Data Protection Officer",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckBadgeIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Your Rights */}
            <div className="backdrop-blur-xl bg-amber-500/5 rounded-3xl border border-amber-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-400">Your Rights</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Access all personal data we hold about you",
                  "Request correction of inaccurate information",
                  "Request deletion of your data (right to be forgotten)",
                  "Export your data in a portable format",
                  "Object to certain types of processing",
                  "Withdraw consent at any time",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckBadgeIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== INCIDENT RESPONSE - Warning Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/15 via-amber-500/10 to-emerald-500/15" />
              <div className="relative backdrop-blur-xl border border-white/10 p-8 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <ExclamationTriangleIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-3">Incident Response Plan</h2>
                    <p className="text-white/60 mb-4">
                      In the unlikely event of a security incident, we have a comprehensive response plan:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { time: "< 1 hour", action: "Detection & Containment", color: "emerald" },
                        { time: "< 24 hours", action: "Investigation", color: "amber" },
                        { time: "< 72 hours", action: "Notification", color: "rose" },
                      ].map((step, idx) => (
                        <div key={idx} className={`px-4 py-2 rounded-xl border ${
                          step.color === "emerald"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : step.color === "amber"
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        }`}>
                          <span className="font-bold">{step.time}</span>
                          <span className="text-white/60 ml-2">{step.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DOCUMENTS - Simple Links ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Compliance{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Documents
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Security Overview", href: "/security" },
              { name: "Data Processing Agreement", href: "/contact" },
              { name: "SOC 2 Report", href: "/contact" },
            ].map((doc, idx) => (
              <Link
                key={idx}
                href={doc.href}
                className="group flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300"
              >
                <DocumentTextIcon className="w-5 h-5 text-amber-400" />
                <span className="text-white/70 group-hover:text-white">{doc.name}</span>
                <ArrowRightIcon className="w-4 h-4 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* ===== CONTACT - Minimal Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 via-amber-500/10 to-rose-500/10 rounded-3xl border border-white/10 p-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-amber-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform">
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Compliance Questions?</h2>
              <p className="text-white/60 mb-6">Our compliance team is ready to assist with any regulatory inquiries.</p>

              <a
                href="mailto:compliance@omgsystems.ca"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-4"
              >
                compliance@omgsystems.ca
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-amber-600 to-rose-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trust Through Transparency
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            We believe compliance is more than checking boxes. It's about earning and maintaining your trust.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Compliant
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Security Overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
