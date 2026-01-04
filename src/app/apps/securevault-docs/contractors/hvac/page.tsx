"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";
import {
  Upload,
  FolderOpen,
  Bell,
  Award,
  Thermometer,
  FileCheck,
  Shield,
  Building2,
  Users,
  ClipboardCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Zap
} from "lucide-react";

export default function HVACContractorsPage() {
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
            {/* Card 1 - ODP Certificate (Top Left) */}
            <div
              className="absolute top-[15%] left-[5%] w-48 h-32 rounded-xl bg-white/90 shadow-2xl border border-white/50 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(-12deg) perspective(1000px) rotateY(5deg)" }}
            >
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">ODP Certificate</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[8px] text-slate-400">EXP: 06/2024</span>
                <div className="px-2 py-0.5 bg-amber-500 text-white text-[8px] font-bold rounded transform rotate-[-5deg]">
                  EXPIRING
                </div>
              </div>
            </div>

            {/* Card 2 - Red Seal Certificate (Top Right) */}
            <div
              className="absolute top-[20%] right-[8%] w-44 h-28 rounded-xl bg-white/80 shadow-xl border border-white/50 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(8deg) perspective(1000px) rotateY(-5deg)" }}
            >
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Red Seal - HVAC</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
              <div className="mt-2 text-[8px] text-slate-400">Cert #: RS-4821</div>
            </div>

            {/* Card 3 - Equipment Warranty (Bottom Left) */}
            <div
              className="absolute bottom-[20%] left-[10%] w-40 h-24 rounded-xl bg-white/70 shadow-lg border border-white/40 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(6deg)" }}
            >
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Equipment Warranty</div>
              <div className="flex-1 bg-slate-100 rounded"></div>
            </div>

            {/* Card 4 - TSSA Gas License (Bottom Right) */}
            <div
              className="absolute bottom-[25%] right-[5%] w-36 h-24 rounded-xl bg-white/60 shadow-lg border border-white/30 hidden lg:flex flex-col p-3"
              style={{ transform: "rotate(-5deg)" }}
            >
              <div className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">TSSA Gas License</div>
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
                Stay ahead of HVAC licenses,{" "}
                <span
                  className="text-transparent bg-clip-text italic"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)",
                  }}
                >
                  inspections
                </span>
                , and warranties.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-slate-700 font-outfit">
                Secure Vault Docs automatically organizes HVAC documents,
                tracks license and insurance expirations, and alerts you before
                inspections, renewals, or warranties are missed — so jobs keep moving
                and compliance stays intact.
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
          SECTION 2: THE HVAC REALITY - Split Layout with Visual Timeline
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
                HVAC work runs on{" "}
                <span className="italic font-normal text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)" }}>
                  timing and compliance
                </span>
                .
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-outfit">
                HVAC companies don&apos;t just manage jobs — they manage requirements.
                Licenses, certifications, inspections, insurance, and warranties all have deadlines.
                Missing one can delay installs, fail inspections, or create liability.
              </p>

              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-white/60 font-outfit">
                  The problem isn&apos;t storing HVAC paperwork.
                </p>
                <p className="text-sm font-bold uppercase tracking-widest text-white/60 font-outfit">
                  It&apos;s keeping every requirement current, across every job and technician.
                </p>
              </div>

              <div className="pt-2">
                <span
                  className="inline-block px-6 py-3 rounded-full text-sm font-bold text-white uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                  }}
                >
                  Secure Vault Docs exists to make sure nothing slips.
                </span>
              </div>
            </div>

            {/* Right Column - Visual: Compliance Timeline */}
            <div className="relative">
              <div className="space-y-4">
                {/* Timeline Item 1 - Warning */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">ODP Cert - Tech Mike</span>
                      <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">7 DAYS</span>
                    </div>
                    <p className="text-xs text-slate-500">Certificate expires June 15, 2024</p>
                  </div>
                </div>

                {/* Timeline Item 2 - Urgent */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-red-200 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">TSSA G2 License - Sarah</span>
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">EXPIRED</span>
                    </div>
                    <p className="text-xs text-slate-500">Renewal required immediately</p>
                  </div>
                </div>

                {/* Timeline Item 3 - OK */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">Equipment Warranty - Unit #4521</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">VALID</span>
                    </div>
                    <p className="text-xs text-slate-500">Covered until March 2026</p>
                  </div>
                </div>

                {/* Alert Bell */}
                <div className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <Bell className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: HOW IT WORKS - Horizontal Process Flow
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
                HVAC teams
              </span>
            </h2>
          </div>

          {/* Process Steps - Horizontal Flow */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 rounded-full -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 - Capture */}
              <div className="relative">
                <div className="relative z-10 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">01</span>
                  </div>
                  <div className="pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mb-5">
                      <Upload className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide">Capture</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Upload HVAC documents however they come in — photos from the field, PDFs from
                      inspectors, emailed certificates, or files sent through secure upload links.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Organize */}
              <div className="relative lg:mt-8">
                <div className="relative z-10 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">02</span>
                  </div>
                  <div className="pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center mb-5">
                      <FolderOpen className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide">Organize</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Documents are automatically classified, key details extracted, and organized
                      by job, technician, or compliance category. No manual filing required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Stay Ahead */}
              <div className="relative">
                <div className="relative z-10 p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">03</span>
                  </div>
                  <div className="pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-5">
                      <Bell className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 uppercase tracking-wide">Stay Ahead</h3>
                    <p className="text-slate-600 leading-relaxed">
                      License expirations, insurance renewals, inspection dates, and warranty terms
                      are detected automatically. Get alerts before action is required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold uppercase tracking-widest text-white hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg, #0f2336 0%, #1e4050 100%)" }}
            >
              See an HVAC example
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: BUILT FOR HVAC OPERATIONS - Bento Grid Layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold italic leading-[1.05] text-white mb-4"
              style={{
                fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              Built for HVAC operations
            </h2>
            <p className="text-base text-white/80 font-outfit leading-relaxed max-w-2xl mx-auto">
              Secure Vault Docs supports how HVAC companies actually operate — from the office to the job site.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large Card - ODP & TSSA */}
            <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">License & Certification Tracking</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Track ODP certifications, TSSA gas licenses, Red Seal credentials,
                    and provincial certifications across your entire team automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Small Card - Warranties */}
            <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-4">
                <Thermometer className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Equipment Warranties</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Store warranties and maintenance records with automatic expiration tracking.
              </p>
            </div>

            {/* Small Card - Inspections */}
            <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4">
                <ClipboardCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Inspection & Permit Docs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Keep inspection reports and permit documentation organized and accessible.
              </p>
            </div>

            {/* Small Card - Sharing */}
            <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Secure Sharing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Share documents securely between office, field, and inspectors.
              </p>
            </div>

            {/* Small Card - Centralized */}
            <div className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white/85 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Centralized Records</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                One source of truth across installs and service contracts.
              </p>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center mt-12">
            <p
              className="text-lg font-semibold text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)" }}
            >
              Everything stays organized and current — without admin overhead.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: WHY HVAC COMPANIES CHOOSE SVD - Comparison Design
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal italic leading-[1.1] text-white"
              style={{
                fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              Why HVAC companies choose{" "}
              <span
                className="text-transparent bg-clip-text font-bold not-italic"
                style={{ backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)" }}
              >
                Secure Vault Docs
              </span>
            </h2>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left - Storage */}
            <div className="relative p-8 rounded-3xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 opacity-60">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-700/50 flex items-center justify-center mb-6">
                  <FolderOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-400 mb-4">Storage holds files</h3>
                <p className="text-slate-500 leading-relaxed">
                  Most tools help you find HVAC documents after you need them.
                </p>
              </div>
            </div>

            {/* Right - SVD */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-500/30 shadow-xl shadow-teal-500/10">
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center animate-pulse">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">SVD watches deadlines</h3>
                <p className="text-white/80 leading-relaxed">
                  Secure Vault Docs helps you stay ahead — before inspections fail, warranties lapse, or licenses expire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: TRUST & CONTROL
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                Trusted for real HVAC documentation
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-lg text-white font-medium leading-relaxed">
                  HVAC documents involve safety, compliance, and liability.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Files are private by default, shared only when you choose, and
                  always under your control.
                </p>
                <p className="text-lg text-white font-medium leading-relaxed">
                  Built for documents that affect real systems, real jobs, and real risk.
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
            Stop tracking HVAC paperwork.{" "}
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
