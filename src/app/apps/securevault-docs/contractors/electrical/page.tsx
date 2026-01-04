"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";
import { Upload, FolderOpen, Bell, FileCheck, Shield, Building2, Users, ClipboardCheck } from "lucide-react";

export default function ElectricalContractorsPage() {
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

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO - Two-Column Layout with Flow Visualization
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden pt-20">
        <div
          className="relative mx-auto px-4 pb-16 min-h-[90vh]"
          style={{ maxWidth: "1350px" }}
        >
          {/* Floating Document Cards in Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Card 1 - Electrical Permit (Top Left) */}
            <div
              className="absolute top-[15%] left-[5%] w-48 h-32 rounded-xl bg-white/90 shadow-2xl border border-white/50 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(-12deg) perspective(1000px) rotateY(5deg)" }}
            >
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Electrical Permit</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[8px] text-slate-400">EXP: 03/2024</span>
                <div className="px-2 py-0.5 bg-red-500 text-white text-[8px] font-bold rounded transform rotate-[-5deg]">
                  EXPIRED
                </div>
              </div>
            </div>

            {/* Card 2 - Master Electrician License (Top Right) */}
            <div
              className="absolute top-[20%] right-[8%] w-44 h-28 rounded-xl bg-white/80 shadow-xl border border-white/50 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(8deg) perspective(1000px) rotateY(-5deg)" }}
            >
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Master Electrician</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
              <div className="mt-2 text-[8px] text-slate-400">License #ME-2847</div>
            </div>

            {/* Card 3 - Insurance COI (Bottom Left) */}
            <div
              className="absolute bottom-[20%] left-[10%] w-40 h-24 rounded-xl bg-white/70 shadow-lg border border-white/40 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(6deg)" }}
            >
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Insurance COI</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
            </div>

            {/* Card 4 - Inspection Report (Bottom Right) */}
            <div
              className="absolute bottom-[25%] right-[5%] w-36 h-24 rounded-xl bg-white/60 shadow-lg border border-white/30 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(-5deg)" }}
            >
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Inspection Report</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
            </div>
          </div>

          {/* Industry Tab Navigation */}
          <IndustryTabs />

          {/* Centered Hero Content */}
          <div className="flex-1 flex flex-col items-center justify-center mt-16 lg:mt-20">
            <div className="space-y-6 text-center relative z-10 max-w-3xl">
              {/* Main Headline */}
              <h1
                className="font-normal leading-[1.05] text-white"
                style={{
                  fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "clamp(40px, 6vw, 72px)",
                }}
              >
                Stay ahead of electrical{" "}
                <span
                  className="text-transparent bg-clip-text italic"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)",
                  }}
                >
                  licenses
                </span>
                , permits, and inspections.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-slate-700 font-outfit">
                Secure Vault Docs automatically organizes electrical documentation,
                tracks license and insurance expirations, and alerts you before
                inspections, renewals, or permits lapse — so work stays compliant
                and projects don&apos;t stall.
              </p>

              {/* Tag */}
              <div className="inline-block px-5 py-2 rounded-full bg-slate-800/80 backdrop-blur">
                <p className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-widest font-outfit">
                  Capture once. Organize forever.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-teal-500 text-white text-base font-semibold hover:bg-teal-500/10 transition-all duration-300"
                >
                  Get early access
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: THE ELECTRICAL REALITY - Two Column Layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] text-white"
                style={{
                  fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                Electrical work leaves{" "}
                <span className="italic font-normal text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #f87171 0%, #fbbf24 100%)" }}>
                  no room
                </span>
                {" "}for expired paperwork.
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-outfit">
                Electrical contractors operate under strict licensing, permitting, and
                inspection requirements. Expired licenses, missing permits, or outdated
                insurance can fail inspections, delay approvals, and create serious
                compliance risk.
              </p>

              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-600 font-outfit">
                  The problem isn&apos;t keeping files.
                </p>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-600 font-outfit">
                  It&apos;s staying ahead of every requirement — across every job and technician.
                </p>
              </div>

              <div className="pt-2">
                <span
                  className="inline-block px-6 py-3 rounded-full text-sm font-bold text-white uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                  }}
                >
                  Secure Vault Docs exists to prevent those failures.
                </span>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Stack of document cards */}
                <div className="relative h-[400px]">
                  {/* Background card - Inspection Report */}
                  <div
                    className="absolute top-0 right-0 w-64 h-44 rounded-2xl bg-white/60 shadow-lg border border-white/40 p-4"
                    style={{ transform: "rotate(6deg)" }}
                  >
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Inspection Report</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div className="h-2 bg-slate-200 rounded w-20"></div>
                    </div>
                  </div>

                  {/* Middle card - Insurance COI */}
                  <div
                    className="absolute top-16 left-4 w-64 h-44 rounded-2xl bg-white/80 shadow-xl border border-white/50 p-4"
                    style={{ transform: "rotate(-4deg)" }}
                  >
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Insurance COI</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-2/3"></div>
                      <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-[10px] text-slate-400">Coverage: $1M</div>
                      <div className="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded">VALID</div>
                    </div>
                  </div>

                  {/* Front card - Electrical License with EXPIRED */}
                  <div
                    className="absolute top-32 left-8 w-72 h-48 rounded-2xl bg-white shadow-2xl border border-white/60 p-5"
                    style={{ transform: "rotate(2deg)" }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-sm font-bold text-slate-700 uppercase tracking-wider">Electrical License</div>
                      <div
                        className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-lg"
                        style={{ transform: "rotate(-8deg)" }}
                      >
                        EXPIRED
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2.5 bg-slate-200 rounded w-full"></div>
                      <div className="h-2.5 bg-slate-200 rounded w-2/3"></div>
                      <div className="h-2.5 bg-slate-200 rounded w-4/5"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-600">License #ME-2847</div>
                        <div className="text-[10px] text-red-500 font-medium">Expired: Mar 15, 2024</div>
                      </div>
                    </div>
                  </div>

                  {/* Alert indicator */}
                  <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center animate-pulse">
                    <Bell className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: HOW IT WORKS - Horizontal Stepped Process
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal italic leading-[1.05]"
              style={{
                fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              <span className="text-white">How it works for </span>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)" }}
              >
                electrical teams
              </span>
            </h2>
          </div>

          {/* Three Steps - Horizontal */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-[16.66%] right-[16.66%] h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 rounded-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1: Capture */}
              <div className="relative text-center">
                {/* Number Background */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] font-bold text-white/5 leading-none select-none pointer-events-none" style={{ fontFamily: "system-ui" }}>
                  01
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <Upload className="w-9 h-9 text-white" />
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Capture</h3>
                <p className="text-slate-700 leading-relaxed font-outfit">
                  Upload electrical documents however they come in — photos from the field,
                  emailed permits, inspection reports, or files sent through secure upload
                  links to electricians, inspectors, or office staff.
                </p>
                <p className="mt-3 text-sm text-teal-300 font-semibold">No special systems required.</p>
              </div>

              {/* Step 2: Organize */}
              <div className="relative text-center">
                {/* Number Background */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] font-bold text-white/5 leading-none select-none pointer-events-none" style={{ fontFamily: "system-ui" }}>
                  02
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
                  <FolderOpen className="w-9 h-9 text-white" />
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Organize</h3>
                <p className="text-slate-700 leading-relaxed font-outfit">
                  Secure Vault Docs automatically classifies document types, extracts key
                  details, and creates consistent folders by project, license type, or
                  compliance category.
                </p>
                <p className="mt-3 text-sm text-teal-300 font-semibold">No manual filing. No renaming.</p>
              </div>

              {/* Step 3: Stay Ahead */}
              <div className="relative text-center">
                {/* Number Background */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] font-bold text-white/5 leading-none select-none pointer-events-none" style={{ fontFamily: "system-ui" }}>
                  03
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <Bell className="w-9 h-9 text-white" />
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Stay Ahead</h3>
                <p className="text-slate-700 leading-relaxed font-outfit">
                  If a document includes license expiration, permit validity period,
                  inspection date, or insurance renewal — Secure Vault Docs detects it
                  automatically and alerts you before action is required.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold uppercase tracking-widest text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg, #0f2336 0%, #1e4050 100%)" }}
            >
              See an electrical example
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: BUILT FOR ELECTRICAL OPERATIONS - Modern Feature Layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Header + Main Features */}
            <div className="space-y-8">
              {/* Section Header */}
              <div>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold italic leading-[1.05] mb-4 text-white"
                  style={{
                    fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  }}
                >
                  Built for electrical operations
                </h2>
                <p className="text-base text-white/80 font-outfit leading-relaxed">
                  Secure Vault Docs supports how electrical companies actually operate — from the office to the job site.
                </p>
              </div>

              {/* Feature 1 - Large Card */}
              <div className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">License & Certification Tracking</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Track journeyman licenses, master electrician credentials, and specialty certifications across your entire team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Large Card */}
              <div className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Permit & Inspection Documentation</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Keep permits, inspection reports, and approval documents organized and accessible for every job site.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stacked Features */}
            <div className="space-y-6 lg:pt-24">
              {/* Feature 3 */}
              <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Insurance & Compliance Records</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Store liability insurance, workers comp, and compliance certificates with automatic expiration tracking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Secure Sharing</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Share documents securely between office, field crews, and inspectors — without email attachments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Centralized Records</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      One source of truth for residential and commercial projects — no more scattered files.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="pt-4">
                <p
                  className="text-lg font-semibold text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)" }}
                >
                  Everything stays current — without admin overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: WHY ELECTRICAL COMPANIES CHOOSE SVD - Comparison Split
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Left Side - Storage (Faded) */}
            <div className="relative p-8 lg:p-12 rounded-l-3xl lg:rounded-r-none rounded-3xl lg:rounded-tr-none lg:rounded-br-none bg-slate-200/50 backdrop-blur-sm border border-slate-300/50">
              <div className="opacity-60">
                <div className="w-16 h-16 rounded-2xl bg-slate-400 flex items-center justify-center mb-6">
                  <FolderOpen className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-600 mb-4">Storage holds files.</h3>
                <p className="text-slate-500 leading-relaxed">
                  Most tools help you retrieve documents after inspections fail or permits
                  are questioned. They wait for you to remember.
                </p>
                <div className="mt-6 flex gap-2">
                  <div className="w-8 h-8 rounded bg-slate-300"></div>
                  <div className="w-8 h-8 rounded bg-slate-300"></div>
                  <div className="w-8 h-8 rounded bg-slate-300"></div>
                </div>
              </div>
            </div>

            {/* Right Side - SVD (Vibrant) */}
            <div
              className="relative p-8 lg:p-12 rounded-r-3xl lg:rounded-l-none rounded-3xl lg:rounded-tl-none lg:rounded-bl-none backdrop-blur-sm border border-teal-400/30"
              style={{ background: "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Secure Vault Docs{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #2dd4bf, #22d3ee)" }}>
                  watches deadlines.
                </span>
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Secure Vault Docs helps you stay ahead — before compliance becomes a problem.
                Automatic detection. Proactive alerts. Peace of mind.
              </p>
              <div className="mt-6 flex gap-2 items-center">
                <div className="w-8 h-8 rounded bg-teal-400 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded bg-cyan-400 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded bg-emerald-400 flex items-center justify-center animate-pulse">
                  <Bell className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: TRUST & CONTROL - Minimal with Shield
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Circuit Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="10" cy="10" r="3" fill="currentColor"/>
              <circle cx="90" cy="10" r="3" fill="currentColor"/>
              <circle cx="10" cy="90" r="3" fill="currentColor"/>
              <circle cx="90" cy="90" r="3" fill="currentColor"/>
              <circle cx="50" cy="50" r="5" fill="currentColor"/>
              <path d="M50 10v40M10 50h40M50 90v-40M90 50h-40" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{
                  fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  color: "#0f2336",
                }}
              >
                Trusted for electrical compliance documentation
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-lg text-white font-medium leading-relaxed">
                  Electrical documentation involves safety, regulation, and liability.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Files are private by default, shared only when you choose, and
                  always under your control.
                </p>
                <p className="text-lg text-white font-medium leading-relaxed">
                  Built for documents that affect real systems and real risk.
                </p>
              </div>

              <Link
                href="/security"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(90deg, #0f2336 0%, #1e4050 100%)" }}
              >
                Learn about security
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Right - Shield Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/Untitled design.png"
                  alt="Security Shield"
                  width={500}
                  height={500}
                  className="w-[350px] sm:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-2xl"
                  style={{ filter: "contrast(1.15) brightness(1.3) saturate(1.2)" }}
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-400/30 to-cyan-400/20 rounded-full blur-3xl -z-10 scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-normal italic mb-10 text-white leading-[1.1]"
            style={{
              fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            Stop tracking electrical paperwork.{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)" }}
            >
              Stay ahead.
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold hover:from-teal-400 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-teal-500/30"
            >
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              See how it works
            </button>
            <Link
              href="https://omgsystem.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-teal-500 text-white text-lg font-semibold hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-300"
            >
              Get early access
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM BANNER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 w-full py-16"
        style={{ background: "linear-gradient(180deg, #b8e0e8 0%, #a8d4de 100%)" }}
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
            style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 50%, #14b8a6 100%)" }}
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
