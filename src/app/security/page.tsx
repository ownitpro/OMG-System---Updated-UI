"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ServerStackIcon,
  FingerPrintIcon,
  EyeSlashIcon,
  CloudArrowUpIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  BoltIcon,
  GlobeAmericasIcon,
  EnvelopeIcon,
  KeyIcon,
  CpuChipIcon,
  ShieldExclamationIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

const certifications = [
  { name: "SOC 2 Type II", status: "Certified", icon: CheckBadgeIcon },
  { name: "PIPEDA", status: "Compliant", icon: DocumentCheckIcon },
  { name: "GDPR", status: "Ready", icon: GlobeAmericasIcon },
  { name: "ISO 27001", status: "In Progress", icon: ShieldCheckIcon },
];

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "AES-256 encryption at rest, TLS 1.3 in transit. Your data is encrypted before it leaves your browser.",
    icon: LockClosedIcon,
  },
  {
    title: "Zero-Knowledge Architecture",
    description: "We can't read your sensitive data. Only you hold the keys to decrypt your most confidential information.",
    icon: EyeSlashIcon,
  },
  {
    title: "Multi-Factor Authentication",
    description: "Secure your account with TOTP, SMS, or hardware security keys. Biometric support coming soon.",
    icon: FingerPrintIcon,
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions let you control exactly who can see and do what in your organization.",
    icon: UserGroupIcon,
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements - Red/Rose tones */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] right-1/4 w-[600px] h-[600px] bg-rose-500/6 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute top-[40%] left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[70%] right-1/3 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-6">
              <ShieldCheckIcon className="w-4 h-4" />
              Enterprise-Grade Security
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Data is{" "}
              <span className="bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Fort Knox Safe
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
              Bank-level encryption, Canadian data residency, and continuous security monitoring.
              We take security seriously so you can focus on growing your business.
            </p>

            {/* Trust Indicators - Horizontal Strip */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { value: "256-bit", label: "Encryption" },
                { value: "99.99%", label: "Uptime SLA" },
                { value: "24/7", label: "Monitoring" },
                { value: "0", label: "Data Breaches" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-rose-400">{item.value}</div>
                  <div className="text-sm text-white/50">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold rounded-lg hover:from-rose-400 hover:to-red-400 transition-all duration-300 shadow-[0_0_30px_rgba(244,63,94,0.3)]"
              >
                Request Security Audit
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="#certifications"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                View Certifications
              </a>
            </div>
          </div>
        </div>

        {/* ===== SECURITY SHIELD VISUAL - Central Feature ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="relative">
            {/* Central Shield */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-red-500/30 rounded-full blur-[60px] animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-rose-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/30 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <ShieldCheckIcon className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Feature Grid Around Shield */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="group backdrop-blur-xl bg-white/[0.03] rounded-2xl border border-white/10 p-6 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-rose-500/30 group-hover:to-red-500/30 transition-all">
                    <feature.icon className="w-6 h-6 text-rose-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== INFRASTRUCTURE - Layered Visual ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
              <ServerStackIcon className="w-4 h-4" />
              Infrastructure
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Built on{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Secure Foundations
              </span>
            </h2>
          </div>

          {/* Stacked Layers */}
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { layer: "Application Layer", desc: "Secure code practices, input validation, XSS/CSRF protection", color: "rose", width: "100%" },
              { layer: "Network Layer", desc: "DDoS protection, WAF, private VPC, encrypted tunnels", color: "red", width: "90%" },
              { layer: "Data Layer", desc: "AES-256 encryption, secure key management, encrypted backups", color: "orange", width: "80%" },
              { layer: "Physical Layer", desc: "Canadian Tier-4 data centers, biometric access, 24/7 guards", color: "amber", width: "70%" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="mx-auto transition-all duration-500 hover:scale-[1.02]"
                style={{ width: item.width }}
              >
                <div
                  className={`backdrop-blur-xl rounded-2xl border p-5 ${
                    item.color === "rose"
                      ? "bg-rose-500/10 border-rose-500/20 hover:border-rose-400/40"
                      : item.color === "red"
                      ? "bg-red-500/10 border-red-500/20 hover:border-red-400/40"
                      : item.color === "orange"
                      ? "bg-orange-500/10 border-orange-500/20 hover:border-orange-400/40"
                      : "bg-amber-500/10 border-amber-500/20 hover:border-amber-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        item.color === "rose" ? "text-rose-400" :
                        item.color === "red" ? "text-red-400" :
                        item.color === "orange" ? "text-orange-400" : "text-amber-400"
                      }`}>
                        {item.layer}
                      </h3>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                    <CheckBadgeIcon className={`w-6 h-6 flex-shrink-0 ${
                      item.color === "rose" ? "text-rose-400" :
                      item.color === "red" ? "text-red-400" :
                      item.color === "orange" ? "text-orange-400" : "text-amber-400"
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CERTIFICATIONS - Badge Grid ===== */}
        <div id="certifications" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="backdrop-blur-xl bg-gradient-to-br from-rose-500/10 via-transparent to-orange-500/10 rounded-3xl border border-white/10 p-8 lg:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Compliance &{" "}
                <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h2>
              <p className="text-white/50">Industry-recognized security standards</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="group relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 text-center hover:border-rose-500/40 hover:bg-rose-500/5 transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <cert.icon className="w-7 h-7 text-rose-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    cert.status === "Certified"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : cert.status === "Compliant"
                      ? "bg-blue-500/20 text-blue-400"
                      : cert.status === "Ready"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-white/10 text-white/60"
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SECURITY PRACTICES - Timeline Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              <BoltIcon className="w-4 h-4" />
              Ongoing Protection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Security{" "}
              <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                Practices
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                {
                  icon: BugAntIcon,
                  title: "Penetration Testing",
                  description: "Quarterly third-party penetration tests by certified security firms. All findings remediated within 30 days.",
                },
                {
                  icon: ClockIcon,
                  title: "24/7 Monitoring",
                  description: "Real-time threat detection and automated incident response. Our security team is always watching.",
                },
                {
                  icon: KeyIcon,
                  title: "Access Reviews",
                  description: "Monthly access audits ensure only authorized personnel have system access. Principle of least privilege enforced.",
                },
                {
                  icon: CloudArrowUpIcon,
                  title: "Secure Backups",
                  description: "Encrypted daily backups with 30-day retention. Geographically distributed across Canadian data centers.",
                },
                {
                  icon: CpuChipIcon,
                  title: "Vulnerability Scanning",
                  description: "Continuous automated scanning of our infrastructure. Critical vulnerabilities patched within 24 hours.",
                },
                {
                  icon: ShieldExclamationIcon,
                  title: "Incident Response",
                  description: "Documented incident response plan with defined SLAs. Security incidents communicated within 72 hours.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== DATA RESIDENCY - Map Visual ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
                <GlobeAmericasIcon className="w-4 h-4" />
                Data Residency
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                100% Canadian{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Data Storage
                </span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Your data never leaves Canada. Our infrastructure is hosted exclusively in Canadian data centers,
                ensuring compliance with PIPEDA and meeting the strictest data sovereignty requirements.
              </p>

              <div className="space-y-4">
                {[
                  "Primary data center in Toronto, Ontario",
                  "Backup facility in Montreal, Quebec",
                  "No data transfer outside Canadian borders",
                  "Full PIPEDA compliance guaranteed",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckBadgeIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-[60px]" />
              <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 overflow-hidden">
                {/* Simplified Map Visual */}
                <div className="aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Canada outline placeholder */}
                      <div className="w-48 h-48 bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <GlobeAmericasIcon className="w-20 h-20 text-rose-400/50 mx-auto mb-2" />
                          <span className="text-white font-bold text-lg">🇨🇦 Canada</span>
                        </div>
                      </div>
                      {/* Ping indicators */}
                      <div className="absolute top-8 left-12 w-4 h-4">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                        <div className="relative w-4 h-4 bg-emerald-400 rounded-full" />
                      </div>
                      <div className="absolute bottom-12 right-8 w-4 h-4">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75 animation-delay-500" />
                        <div className="relative w-4 h-4 bg-emerald-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data center labels */}
                <div className="flex justify-around mt-4">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2" />
                    <span className="text-xs text-white/60">Toronto</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full mx-auto mb-2" />
                    <span className="text-xs text-white/60">Montreal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== REPORT VULNERABILITY - CTA Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-red-500/10 to-orange-500/20" />
              <div className="relative backdrop-blur-xl border border-rose-500/20 p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                      <BugAntIcon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Found a Vulnerability?</h2>
                    <p className="text-white/60 mb-6">
                      We take security reports seriously. If you've discovered a potential security issue,
                      please report it responsibly. We offer rewards for valid security findings.
                    </p>
                    <a
                      href="mailto:security@omgsystems.ca"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold rounded-xl hover:from-rose-400 hover:to-red-400 transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                    >
                      Report Security Issue
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                  <div className="lg:w-48 text-center lg:text-right">
                    <div className="inline-block px-4 py-2 bg-white/10 rounded-xl">
                      <div className="text-3xl font-bold text-rose-400">$500+</div>
                      <div className="text-sm text-white/50">Bug Bounty Rewards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTACT - Minimal Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-gradient-to-br from-rose-500/10 via-red-500/10 to-orange-500/10 rounded-3xl border border-white/10 p-10">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform">
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Security Questions?</h2>
              <p className="text-white/60 mb-6">Our security team is here to answer your questions.</p>

              <a
                href="mailto:security@omgsystems.ca"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold rounded-xl hover:from-rose-400 hover:to-red-400 transition-all duration-300 shadow-[0_0_30px_rgba(244,63,94,0.3)] mb-4"
              >
                security@omgsystems.ca
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
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-red-600 to-orange-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Security You Can Trust
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Enterprise-grade security without the enterprise complexity. Your data is safe with us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-rose-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Secure Trial
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
