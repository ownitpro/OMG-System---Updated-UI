"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";

export default function ContractorsPage() {
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

      {/* Section 1: Hero */}
      <section className="relative z-10 overflow-hidden pt-20">
        {/* Decorative Images - Left */}
        <div className="absolute left-0 top-[20%] -translate-x-[20%] w-[320px] md:w-[380px] lg:w-[450px] pointer-events-none hidden md:block opacity-60">
          <Image
            src="/Contractor 1.png"
            alt="Contractor documents"
            width={450}
            height={450}
            className="w-full object-contain"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>

        {/* Decorative Images - Right */}
        <div className="absolute right-0 top-[20%] translate-x-[20%] w-[320px] md:w-[380px] lg:w-[450px] pointer-events-none hidden md:block opacity-60">
          <Image
            src="/Contractor 3.png"
            alt="Contractor documents"
            width={450}
            height={450}
            className="w-full object-contain"
            style={{ transform: "rotate(-90deg) scaleX(-1)" }}
          />
        </div>

        <div
          className="relative mx-auto px-4 pb-16 flex flex-col items-center text-center min-h-[80vh]"
          style={{ maxWidth: "1350px" }}
        >
          {/* Industry Tab Navigation - Fixed position from top */}
          <IndustryTabs />

          {/* Main content - centered in remaining space */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="relative space-y-8">
            {/* Main Headline */}
            <h1
              className="font-normal italic leading-[1.1] text-white"
              style={{
                fontFamily:
                  "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "96px",
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
              of compliance,
              <br />
              renewals, and inspections.
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
              SecureVault Docs automatically organizes permits, certifications,
              and licenses — and alerts you before they expire. So projects stay
              on track and nothing gets missed.
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

      {/* Section 2: Pain Point */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Headline */}
            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light italic leading-[0.95] text-white"
                style={{
                  fontFamily:
                    "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Missed paperwork costs more than admin time.
              </h2>
            </div>

            {/* Right - Body Text */}
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-outfit">
                Permits expire. Certifications lapse. Licenses go unchecked.
              </p>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-outfit">
                It&apos;s not that contractors don&apos;t care — it&apos;s that
                there&apos;s no system tracking what matters. Things slip.
                Projects stall. Compliance problems turn into real costs.
              </p>
            </div>
          </div>

          {/* Bottom Centered Text */}
          <div className="mt-16 text-center space-y-4">
            <p className="text-sm sm:text-base font-bold uppercase tracking-widest font-outfit" style={{ color: "#334155" }}>
              The issue isn&apos;t finding files.
            </p>
            <p className="text-sm sm:text-base font-bold uppercase tracking-widest font-outfit" style={{ color: "#334155" }}>
              It&apos;s staying ahead of what each one requires.
            </p>
            <div className="pt-4">
              <span
                className="inline-block px-6 py-3 rounded-full text-sm font-bold text-white uppercase tracking-widest"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20, 184, 166, 0.6) 0%, rgba(6, 182, 212, 0.6) 100%)",
                }}
              >
                SecureVault Docs exists to fix that.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section
        id="how-it-works"
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic leading-[0.95]"
              style={{
                fontFamily:
                  "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="text-white">How it works for </span>
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #ffffff 0%, #14b8a6 50%, #14b8a6 100%)",
                }}
              >
                contractors
              </span>
            </h2>
          </div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {/* Card 1: Capture */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              <Image
                src="/13.png"
                alt="Capture"
                width={112}
                height={112}
                className="absolute -top-12 sm:-top-16 left-6 sm:left-8 w-20 h-20 sm:w-28 sm:h-28"
              />
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Capture
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#0f2336" }}
              >
                Upload permits, licenses, and certifications from anywhere —
                photos, scans, emails. Everything lands in one secure place.
              </p>
            </div>

            {/* Card 2: Organize */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              <Image
                src="/14.png"
                alt="Organize"
                width={112}
                height={112}
                className="absolute -top-12 sm:-top-16 left-6 sm:left-8 w-20 h-20 sm:w-28 sm:h-28"
              />
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Organize
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#0f2336" }}
              >
                As documents arrive, SecureVault Docs automatically classifies
                them, extracts key dates, and organizes by project or trade. No
                manual sorting.
              </p>
            </div>

            {/* Card 3: Stay Ahead */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              <Image
                src="/15.png"
                alt="Stay Ahead"
                width={112}
                height={112}
                className="absolute -top-12 sm:-top-16 left-6 sm:left-8 w-20 h-20 sm:w-28 sm:h-28"
              />
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Stay Ahead
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#0f2336" }}
              >
                Expiration dates, renewal deadlines, and inspection requirements
                are detected automatically. You get alerts before anything
                lapses.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold uppercase tracking-widest text-white hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(90deg, #0f2336 0%, #1e4050 100%)",
              }}
            >
              See a contractor example
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Built for Contractor Workflows */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-8">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold italic leading-[0.95]"
              style={{
                fontFamily:
                  "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: "#0f2336",
              }}
            >
              Built for contractor workflows
            </h2>
          </div>

          {/* Subheadline */}
          <p className="text-center text-sm font-bold text-slate-700 uppercase tracking-widest font-outfit mb-12">
            Secure Vault Docs supports contractor work across every project:
          </p>

          {/* Timeline */}
          <div className="relative flex flex-col items-center">
            {/* Vertical Line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full"
              style={{
                background:
                  "linear-gradient(180deg, #2dd4bf 0%, #22d3ee 50%, #14b8a6 100%)",
              }}
            ></div>

            {/* Timeline Items */}
            <div className="relative w-full max-w-2xl space-y-8">
              {/* Item 1 */}
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium">
                    Permit and license tracking
                  </p>
                </div>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left pl-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium">
                    Certification renewals and compliance
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium">
                    Project-based document organization
                  </p>
                </div>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left pl-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-medium">
                    Inspection scheduling and follow-up
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-12">
            <p
              className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #2dd4bf 0%, #22d3ee 50%, #14b8a6 100%)",
              }}
            >
              Everything stays structured and visible — without adding admin
              overhead.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-xl border border-white/20 text-sm font-semibold uppercase tracking-widest text-slate-800 hover:bg-white/20 transition-all"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)",
              }}
            >
              Explore contractor workflows
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: Why SecureVault Docs */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left - Image (full height, no glassmorphism) */}
            <div className="relative rounded-l-3xl overflow-hidden lg:rounded-r-none rounded-t-3xl lg:rounded-t-none lg:rounded-tl-3xl lg:rounded-bl-3xl">
              <Image
                src="/Contractor.png"
                alt="Building permits and construction documents"
                width={600}
                height={500}
                className="w-full h-full object-cover opacity-70"
                style={{ minHeight: "100%" }}
              />
            </div>

            {/* Right - Content with glassmorphism */}
            <div
              className="rounded-r-3xl lg:rounded-l-none rounded-b-3xl lg:rounded-b-none lg:rounded-tr-3xl lg:rounded-br-3xl p-8 lg:p-12 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.45) 0%, rgba(200, 230, 240, 0.35) 100%)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderLeft: "none",
              }}
            >
              <div className="space-y-6 h-full flex flex-col justify-center">
                <h2
                  style={{
                    fontFamily:
                      "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  }}
                >
                  <span
                    className="block text-3xl sm:text-4xl lg:text-5xl font-light italic mb-1"
                    style={{ color: "#5a8a9a" }}
                  >
                    Why contractors choose
                  </span>
                  <span
                    className="block text-3xl sm:text-4xl lg:text-5xl font-bold"
                    style={{ color: "#0f2336" }}
                  >
                    SecureVault Docs
                  </span>
                </h2>

                <div className="space-y-1">
                  <p className="text-lg sm:text-xl font-normal text-slate-600">
                    Storage holds files.
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-slate-800">
                    Secure Vault Docs watches deadlines.
                  </p>
                </div>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Most tools stop at organization.
                </p>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  SecureVault Docs goes further by monitoring what matters over
                  time — so compliance, renewals, and inspections don&apos;t
                  catch you off guard.
                </p>

                <div
                  className="mt-6 px-6 py-4 rounded-lg"
                  style={{ background: "rgba(90, 138, 154, 0.2)" }}
                >
                  <p className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wider">
                    That&apos;s the difference between managing files and
                    running a jobsite efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Trust and Control */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
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
                Contractor documents are private, regulated, and critical.
              </p>
              <p className="text-lg sm:text-xl mb-4 leading-relaxed text-white">
                Files are private by default, shared only when you choose, and
                always under your control.
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Right - Shield Image */}
            <div className="relative flex items-center justify-center order-1 lg:order-2">
              <Image
                src="/Untitled design.png"
                alt="Security Shield"
                width={600}
                height={600}
                className="w-[350px] sm:w-[450px] lg:w-[550px] h-auto object-contain drop-shadow-2xl"
                style={{ filter: "contrast(1.2) brightness(1.8)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic mb-10 text-transparent bg-clip-text"
            style={{
              fontFamily:
                "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #0f2336 100%)",
            }}
          >
            Stop chasing paperwork.
            <br />
            Stay compliant.
          </h2>

          <div className="flex justify-center">
            <Link
              href="#how-it-works"
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
              fontFamily:
                "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            SecureVault Docs
          </h3>
          <p
            className="text-2xl sm:text-3xl md:text-4xl italic text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #0f2336 50%, #14b8a6 100%)",
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
