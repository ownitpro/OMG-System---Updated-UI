"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";

export default function RealEstatePage() {
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
        {/* Hero Decoration Images */}
        {/* Left Side Image */}
        <div className="absolute left-0 top-[30%] -translate-x-[25%] w-[400px] md:w-[500px] lg:w-[600px] pointer-events-none hidden md:block opacity-60">
          <Image
            src="/Real Estate el.png"
            alt=""
            width={600}
            height={600}
            className="w-full object-contain"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
        {/* Right Side Image */}
        <div className="absolute right-0 top-[30%] translate-x-[25%] w-[400px] md:w-[500px] lg:w-[600px] pointer-events-none hidden md:block opacity-60">
          <Image
            src="/Real Estate el 2.png"
            alt=""
            width={600}
            height={600}
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
          <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-white leading-[1.1] mb-8"
              style={{
                fontFamily:
                  "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              Every deal moves{" "}
              <span
                className="text-transparent bg-clip-text italic"
                style={{
                  backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)",
                }}
              >
                faster
              </span>{" "}
              when
              <br />
              paperwork doesn&apos;t slow it down.
            </h1>

            {/* Badge */}
            <div className="inline-block px-6 py-3 rounded-lg bg-slate-800/80 backdrop-blur mb-8">
              <p className="text-sm sm:text-base font-medium text-white uppercase tracking-widest">
                CAPTURE ONCE. ORGANIZE FOREVER.
              </p>
            </div>

            {/* Subtext */}
            <p
              className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-outfit"
            >
              SecureVault Docs keeps real estate transactions clean, complete, and
              moving forward by automatically organizing documents and tracking
              time-sensitive paperwork — so deals don&apos;t stall and follow-ups don&apos;t
              pile up.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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

      {/* Section 2: Problem Statement */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            {/* Left - Large Headline */}
            <div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-white leading-[0.95]"
                style={{
                  fontFamily:
                    "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                Real estate
                <br />
                isn&apos;t hard.
                <br />
                Chasing
                <br />
                documents is.
              </h2>
            </div>

            {/* Right - Body Text */}
            <div className="lg:pt-8">
              <p
                className="text-lg text-slate-700 leading-relaxed font-outfit"
              >
                Every deal depends on paperwork arriving on time — and it
                rarely does. Buyers forget uploads. Sellers resend outdated
                files. Financing documents expire. Amendments get buried in
                email threads. One missing document can slow everything
                down.
              </p>
            </div>
          </div>

          {/* Bottom Centered Text */}
          <div className="text-center space-y-4">
            <p className="text-sm sm:text-base font-bold uppercase tracking-widest" style={{ color: "#334155" }}>
              The issue isn&apos;t finding files.
            </p>
            <p className="text-sm sm:text-base font-bold uppercase tracking-widest" style={{ color: "#334155" }}>
              It&apos;s keeping transactions clean, current, and under control.
            </p>
            <div className="flex justify-center pt-4">
              <div className="inline-block px-6 py-3 rounded-lg bg-slate-400/30 backdrop-blur mt-4">
                <p className="text-sm sm:text-base font-semibold text-white uppercase tracking-widest">
                  SECUREVAULT DOCS EXISTS TO REMOVE THAT FRICTION.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Gradient Text Headline */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-normal italic mb-6 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Open Sauce One', sans-serif",
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #ffffff 50%, #14b8a6 100%)",
            }}
          >
            How real estate teams keep deals moving
          </h2>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-16 font-outfit"
          >
            SecureVault Docs replaces scattered uploads, manual sorting, and last-minute
            scrambling with a single system that handles documents automatically — from
            intake to close.
          </p>

          {/* Three Icons Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-20">
            {/* Capture */}
            <div className="flex flex-col items-center">
              <Image
                src="/13.png"
                alt="Capture"
                width={120}
                height={120}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-4"
              />
              <p
                className="text-lg sm:text-xl font-bold uppercase tracking-widest"
                style={{ color: "#0f2336" }}
              >
                Capture
              </p>
            </div>

            {/* Organize */}
            <div className="flex flex-col items-center">
              <Image
                src="/14.png"
                alt="Organize"
                width={120}
                height={120}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-4"
              />
              <p
                className="text-lg sm:text-xl font-bold uppercase tracking-widest"
                style={{ color: "#0f2336" }}
              >
                Organize
              </p>
            </div>

            {/* Stay Ahead */}
            <div className="flex flex-col items-center">
              <Image
                src="/15.png"
                alt="Stay Ahead"
                width={120}
                height={120}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-4"
              />
              <p
                className="text-lg sm:text-xl font-bold uppercase tracking-widest"
                style={{ color: "#0f2336" }}
              >
                Stay Ahead
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Buyers/Sellers/Teams Cards */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Buyers Card */}
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm flex flex-col h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.7) 0%, rgba(200, 230, 240, 0.5) 100%)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <h3
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: "#0d7377" }}
              >
                Buyers
              </h3>
              {/* Content area with flex-grow to push button down */}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-slate-800 mb-3 leading-relaxed">
                  Buyer paperwork, without the follow-ups.
                </p>
                <p className="text-lg text-slate-700 mb-3 leading-relaxed">
                  Buyers upload documents once — and everything stays organized from first
                  offer to close.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  No missing IDs. No expired approvals. No repeated requests.
                </p>
              </div>
              {/* Button and Video - fixed at bottom */}
              <div className="mt-6">
                <button
                  className="w-full px-4 py-3 rounded-full text-sm font-semibold text-white mb-6 shadow-md hover:shadow-lg transition-shadow h-12 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(90deg, #0d7377 0%, #14b8a6 100%)",
                  }}
                >
                  How buyer documents organize themselves
                </button>
                {/* Video Placeholder */}
                <div
                  className="w-full h-32 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13, 115, 119, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%)",
                  }}
                >
                  <span className="text-sm font-medium text-slate-500">Embed Video</span>
                </div>
              </div>
            </div>

            {/* Sellers Card */}
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm flex flex-col h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.7) 0%, rgba(200, 230, 240, 0.5) 100%)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <h3
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: "#0d7377" }}
              >
                Sellers
              </h3>
              {/* Content area with flex-grow to push button down */}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-slate-800 mb-3 leading-relaxed">
                  Seller documents stay complete from listing to close.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Disclosures, amendments, and required paperwork stay current — without version
                  confusion or last-minute gaps. You always know what&apos;s missing, what&apos;s current, and
                  what&apos;s ready.
                </p>
              </div>
              {/* Button and Video - fixed at bottom */}
              <div className="mt-6">
                <button
                  className="w-full px-4 py-3 rounded-full text-sm font-semibold text-white mb-6 shadow-md hover:shadow-lg transition-shadow h-12 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(90deg, #0d7377 0%, #14b8a6 100%)",
                  }}
                >
                  How seller paperwork stays clean and current
                </button>
                {/* Video Placeholder */}
                <div
                  className="w-full h-32 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13, 115, 119, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%)",
                  }}
                >
                  <span className="text-sm font-medium text-slate-500">Embed Video</span>
                </div>
              </div>
            </div>

            {/* Teams Card */}
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm flex flex-col h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.7) 0%, rgba(200, 230, 240, 0.5) 100%)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <h3
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: "#0d7377" }}
              >
                Teams
              </h3>
              {/* Content area with flex-grow to push button down */}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-slate-800 mb-3 leading-relaxed">
                  Transactions stay organized — even with multiple hands.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  When deals involve agents, coordinators, and partners, document control matters.
                  SecureVault Docs keeps everyone aligned without losing structure or
                  accountability.
                </p>
              </div>
              {/* Button and Video - fixed at bottom */}
              <div className="mt-6">
                <button
                  className="w-full px-4 py-3 rounded-full text-sm font-semibold text-white mb-6 shadow-md hover:shadow-lg transition-shadow h-12 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(90deg, #0d7377 0%, #14b8a6 100%)",
                  }}
                >
                  How teams manage deals without losing control
                </button>
                {/* Video Placeholder */}
                <div
                  className="w-full h-32 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(13, 115, 119, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%)",
                  }}
                >
                  <span className="text-sm font-medium text-slate-500">Embed Video</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center">
            <Link
              href="/apps/securevault-docs/team-workflow"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-slate-700 text-slate-800 font-semibold uppercase tracking-widest text-sm hover:bg-slate-800/10 transition-all"
            >
              See a team workflow
              <svg
                className="w-4 h-4"
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
        </div>
      </section>

      {/* Section 5: Why SecureVault Docs */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left - Image (full height, no glassmorphism) */}
            <div className="relative rounded-l-3xl overflow-hidden lg:rounded-r-none rounded-t-3xl lg:rounded-t-none lg:rounded-tl-3xl lg:rounded-bl-3xl">
              <Image
                src="/Real Estate.png"
                alt="Real Estate"
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
                    Why
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
                    SecureVault Docs protects momentum.
                  </p>
                </div>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Most tools help you store documents. SecureVault Docs helps you keep deals moving by
                  organizing paperwork automatically and surfacing
                  issues before they slow the transaction.
                </p>

                <p
                  className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text pt-2"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #0d9488 0%, #0891b2 100%)",
                  }}
                >
                  That&apos;s the difference between reacting and staying in
                  control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Security */}
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
                Built for sensitive
                <br />
                client documents.
              </h2>

              <p className="text-lg sm:text-xl mb-4 leading-relaxed font-medium text-white">
                Real estate paperwork includes personal and financial
                information.
              </p>
              <p className="text-lg sm:text-xl mb-4 leading-relaxed text-white">
                Documents are private by default, shared only when you
                choose, and always under your control — so clients trust you
                with what matters.
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-10 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 100%)",
            }}
          >
            Stop chasing paperwork.
            <br />
            Close with confidence.
          </h2>

          <div className="flex justify-center">
            <Link
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
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
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
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
