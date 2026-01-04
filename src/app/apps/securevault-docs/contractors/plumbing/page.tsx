"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";
import {
  Upload,
  FolderOpen,
  Bell,
  FileCheck,
  Shield,
  Building2,
  Users,
  ClipboardCheck,
  Clock,
  Droplets,
  Award,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Wrench,
} from "lucide-react";

export default function PlumbingContractorsPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 80% 20%, #ebe8e4 0%, transparent 50%),
          radial-gradient(ellipse 100% 100% at 20% 80%, #005468 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 60% 60%, #0c9092 0%, transparent 50%),
          radial-gradient(ellipse 90% 70% at 40% 40%, #8db0b6 0%, transparent 55%),
          linear-gradient(180deg,
            #005468 0%,
            #075f6e 10%,
            #0a6a7a 18%,
            #0a7d86 26%,
            #0c9092 35%,
            #289294 42%,
            #3d9598 48%,
            #5aa5a8 55%,
            #6a9fa3 60%,
            #79a8ac 65%,
            #8db0b6 70%,
            #9ebbb8 75%,
            #b8ccc8 80%,
            #c5d0cc 84%,
            #d5ddd8 88%,
            #dcdad6 91%,
            #e2dfdb 94%,
            #e5e2de 97%,
            #ebe8e4 100%
          )
        `,
      }}
    >
      {/* Global Grain Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative z-10 overflow-hidden pt-20">
        {/* Floating Document Cards - Plumbing specific */}
        <div className="absolute left-[5%] top-[25%] w-[140px] sm:w-[180px] pointer-events-none hidden lg:block">
          <div
            className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl"
            style={{ transform: "rotate(-8deg) perspective(500px) rotateY(5deg)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase">Plumbing Permit</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded mb-1.5"></div>
            <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
            <div className="mt-2 text-[8px] text-green-600 font-semibold">APPROVED</div>
          </div>
        </div>

        <div className="absolute right-[5%] top-[22%] w-[140px] sm:w-[180px] pointer-events-none hidden lg:block">
          <div
            className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl"
            style={{ transform: "rotate(6deg) perspective(500px) rotateY(-5deg)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase">Backflow Cert</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded mb-1.5"></div>
            <div className="h-1.5 bg-slate-200 rounded w-2/3"></div>
            <div className="mt-2 text-[8px] text-teal-600 font-semibold">CERTIFIED</div>
          </div>
        </div>

        <div className="absolute left-[8%] top-[55%] w-[130px] sm:w-[160px] pointer-events-none hidden lg:block">
          <div
            className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl"
            style={{ transform: "rotate(4deg) perspective(500px) rotateY(8deg)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase">License</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded mb-1.5"></div>
            <div className="h-1.5 bg-slate-200 rounded w-4/5"></div>
            <div className="mt-2 text-[8px] text-emerald-600 font-semibold">ACTIVE</div>
          </div>
        </div>

        <div className="absolute right-[8%] top-[52%] w-[130px] sm:w-[160px] pointer-events-none hidden lg:block">
          <div
            className="p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl"
            style={{ transform: "rotate(-5deg) perspective(500px) rotateY(-8deg)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <ClipboardCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-slate-700 uppercase">Inspection</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded mb-1.5"></div>
            <div className="h-1.5 bg-slate-200 rounded w-1/2"></div>
            <div className="mt-2 text-[8px] text-orange-600 font-semibold">PASSED</div>
          </div>
        </div>

        <div
          className="relative mx-auto px-4 pb-16 flex flex-col items-center text-center min-h-[80vh]"
          style={{ maxWidth: "1350px" }}
        >
          {/* Industry Tab Navigation */}
          <IndustryTabs />

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <div className="relative space-y-8">
              {/* Main Headline */}
              <h1
                className="font-normal italic leading-[1.1] text-white"
                style={{
                  fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "clamp(48px, 8vw, 96px)",
                }}
              >
                Stay{" "}
                <span
                  className="text-transparent bg-clip-text italic"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)",
                  }}
                >
                  ahead
                </span>{" "}
                of plumbing permits
                <br />
                and compliance.
              </h1>

              {/* Tag Box */}
              <div className="flex justify-center">
                <div className="inline-block px-6 py-3 rounded-lg bg-slate-800/80 backdrop-blur">
                  <p className="text-sm font-medium text-white/90 uppercase tracking-widest font-outfit">
                    Capture once. Organize forever.
                  </p>
                </div>
              </div>

              {/* Subheadline */}
              <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-slate-700 px-4 font-outfit">
                SecureVault Docs automatically organizes plumbing permits, backflow certifications,
                and license renewals — and alerts you before they expire. So your plumbers stay
                certified and jobs stay on schedule.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  See how it works
                </button>
                <Link
                  href="https://omgsystem.com/#pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-teal-500 text-white text-lg font-semibold hover:bg-teal-500/10 hover:border-teal-400 transition-all"
                >
                  Get early access
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: THE PLUMBING REALITY ===== */}
      {/* Design: Two-column with animated pipe flow visual */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Pipe Flow Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20">
                {/* Pipe system visualization */}
                <div className="space-y-4">
                  {/* Main Pipe Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Document Pipeline</h4>
                      <p className="text-sm text-white/60">Active tracking system</p>
                    </div>
                  </div>

                  {/* Document Status Cards */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">Backflow Cert - Site A</span>
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">EXPIRED</span>
                      </div>
                      <p className="text-xs text-slate-500">Renewal required immediately</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">Building Permit - Commercial</span>
                        <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">14 DAYS</span>
                      </div>
                      <p className="text-xs text-slate-500">Inspection due June 28, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">Red Seal 306A - Tom</span>
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">CURRENT</span>
                      </div>
                      <p className="text-xs text-slate-500">Valid through Dec 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-light italic leading-[0.95]"
                style={{
                  fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.02em",
                  color: "#0f2336",
                }}
              >
                Plumbing work depends on approvals and timing.
              </h2>

              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-outfit">
                  Permits expire. Backflow certifications lapse. Journeyman licenses need renewal.
                </p>
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-outfit">
                  It&apos;s not that plumbers don&apos;t care — it&apos;s that there&apos;s no system
                  tracking permits, certifications, and code compliance across your entire team.
                </p>
              </div>

              <div className="pt-4">
                <span
                  className="inline-block px-6 py-3 rounded-full text-sm font-bold text-white uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 184, 166, 0.6) 0%, rgba(6, 182, 212, 0.6) 100%)",
                  }}
                >
                  SecureVault Docs exists to fix that.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: HOW IT WORKS ===== */}
      {/* Design: Vertical cascading cards with connecting flow */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic leading-[0.95]"
              style={{
                fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="text-white">How it works for </span>
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #ffffff 0%, #14b8a6 50%, #14b8a6 100%)",
                }}
              >
                plumbing teams
              </span>
            </h2>
          </div>

          {/* Cascading Process Cards */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-cyan-400 to-teal-500 hidden md:block" style={{ transform: "translateX(-50%)" }}></div>

            {/* Step 1 - Capture */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="flex-1 md:text-right order-2 md:order-1">
                <div className="inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl max-w-md">
                  <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Upload className="w-7 h-7 text-white" />
                    </div>
                    <div className="md:text-right">
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Step 01</span>
                      <h3 className="text-xl font-bold text-slate-800">Capture</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Upload plumbing permits, backflow certifications, journeyman licenses, and inspection
                    reports from anywhere — photos, scans, emails.
                  </p>
                </div>
              </div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30 order-1 md:order-2">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <div className="flex-1 order-3 hidden md:block"></div>
            </div>

            {/* Step 2 - Organize */}
            <div className="relative flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="flex-1 hidden md:block"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <div className="flex-1">
                <div className="inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <FolderOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Step 02</span>
                      <h3 className="text-xl font-bold text-slate-800">Organize</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Documents are automatically classified by type — permits, certifications,
                    inspection reports — and organized by job site or plumber.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Stay Ahead */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 md:text-right order-2 md:order-1">
                <div className="inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl max-w-md">
                  <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                      <Bell className="w-7 h-7 text-white" />
                    </div>
                    <div className="md:text-right">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 03</span>
                      <h3 className="text-xl font-bold text-slate-800">Stay Ahead</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    License renewals, backflow cert expirations, and permit deadlines are detected
                    automatically. Get alerts before anything lapses.
                  </p>
                </div>
              </div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30 order-1 md:order-2">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <div className="flex-1 order-3 hidden md:block"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-16">
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold uppercase tracking-widest text-white hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(90deg, #0f2336 0%, #1e4050 100%)",
              }}
            >
              See a plumbing example
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: BUILT FOR PLUMBING OPERATIONS ===== */}
      {/* Design: Hexagonal/honeycomb style grid */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold italic leading-[0.95] mb-4"
              style={{
                fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: "#0f2336",
              }}
            >
              Built for plumbing operations
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-outfit">
              SecureVault Docs supports how plumbing contractors actually operate — from permit pulls to final inspections.
            </p>
          </div>

          {/* Hexagonal Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Permit Tracking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Track plumbing permits across all job sites with automatic expiration monitoring and renewal alerts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Backflow Certifications</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Manage backflow preventer certifications and testing schedules. Never miss a required annual test.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">License Management</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Track journeyman and master plumber licenses across your team. Automatic renewal reminders keep everyone current.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ClipboardCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Inspection Records</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Store rough-in, final, and specialized inspection reports. Easy retrieval for warranty claims and compliance audits.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Secure Sharing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Share documents securely between office, field crews, inspectors, and general contractors without email chaos.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Centralized Records</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                One secure location for residential repairs, commercial projects, and new construction documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: WHY PLUMBING CONTRACTORS CHOOSE SVD ===== */}
      {/* Design: Split comparison with pipe metaphor */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-light italic leading-[0.95]"
              style={{
                fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              <span style={{ color: "#5a8a9a" }}>Why plumbing contractors choose</span>
              <br />
              <span className="font-bold" style={{ color: "#0f2336" }}>SecureVault Docs</span>
            </h2>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Left Card - Old Way (Faded) */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-200/50 to-slate-300/30 backdrop-blur-sm border border-slate-300/50 opacity-70">
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-500 mb-4 mt-2">Storage holds files</h3>
              <ul className="space-y-3 text-slate-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span>Documents sit in folders</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span>Manual tracking required</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span>No automatic alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  <span>Reactive compliance</span>
                </li>
              </ul>
            </div>

            {/* Right Card - SVD Way (Vibrant) */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-500/30 shadow-xl shadow-teal-500/10">
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center animate-pulse">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 mt-2">SVD watches deadlines</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Intelligent organization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Automatic detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Proactive alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Stay ahead of compliance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="text-center mt-12">
            <div className="inline-block px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
              <p className="text-lg font-bold text-slate-800">
                That&apos;s the difference between <span className="text-slate-500">managing files</span> and{" "}
                <span className="text-teal-600">keeping your plumbers compliant</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: TRUST & CONTROL ===== */}
      {/* Design: Two-column with large shield on right */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div>
              <h2
                className="font-bold mb-8"
                style={{
                  fontFamily: "'Open Sauce One', sans-serif",
                  fontSize: "clamp(40px, 6vw, 70px)",
                  letterSpacing: "-0.062em",
                  lineHeight: "0.90",
                  color: "#0f2336",
                }}
              >
                Trust and control,
                <br />
                built in.
              </h2>

              <p className="text-lg sm:text-xl mb-4 leading-relaxed font-medium text-white">
                Plumbing documents are regulated and critical.
              </p>
              <p className="text-lg sm:text-xl mb-4 leading-relaxed text-white">
                Files are private by default, shared only when you choose, and always under your control.
              </p>
              <p className="text-lg sm:text-xl mb-10 leading-relaxed text-white font-medium">
                Built for trust, accuracy, and accountability.
              </p>

              <Link
                href="/security"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold uppercase tracking-widest text-white hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(90deg, #0f2336 0%, #1e4050 100%)",
                }}
              >
                Learn about security
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Right - Shield Image */}
            <div className="relative flex items-center justify-center">
              <Image
                src="/Untitled design.png"
                alt="Security Shield"
                width={600}
                height={600}
                className="w-[350px] sm:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-2xl"
                style={{ filter: "contrast(1.2) brightness(1.8)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: FINAL CTA ===== */}
      {/* Design: Clean centered layout */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic mb-10 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 100%)",
            }}
          >
            Stop chasing paperwork.
            <br />
            Keep your plumbers compliant.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              See how it works
            </button>
            <Link
              href="https://omgsystem.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-teal-500 text-slate-700 text-lg font-semibold hover:bg-teal-500/10 hover:border-teal-400 transition-all"
            >
              Get early access
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Bottom Banner */}
      <section
        className="relative z-10 w-full py-16"
        style={{
          background: "linear-gradient(180deg, #b8e0e8 0%, #a8d4de 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              color: "#0f2336",
              fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            SecureVault Docs
          </h3>
          <p
            className="text-2xl sm:text-3xl md:text-4xl italic text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 50%, #14b8a6 100%)",
            }}
          >
            Capture once. Stay ahead forever.
          </p>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/svd-demo.mp4"
        title="SecureVault Docs Demo"
      />
    </div>
  );
}
