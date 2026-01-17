"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";

export default function TeamWorkflowPage() {
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
                className="hero-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[1.1] text-white"
                style={{
                  fontFamily:
                    "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                Team workflows that{" "}
                <span
                  className="text-transparent bg-clip-text italic"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)",
                  }}
                >
                  actually work.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="hero-subheadline text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-slate-700 px-4 uppercase tracking-widest font-outfit">
                When multiple people handle the same documents, control matters. SecureVault Docs keeps everyone aligned without losing structure or accountability.
              </p>

              {/* Reinforcement Box */}
              <div className="flex justify-center pt-2">
                <div className="inline-block px-6 py-3 rounded-lg bg-slate-800/80 backdrop-blur">
                  <p className="text-sm sm:text-base font-medium text-white/90 uppercase tracking-widest font-outfit">
                    No version confusion. No lost files. No communication gaps.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="btn-smooth icon-slide-right group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-6 h-6 transition-transform"
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
                  Watch team workflow demo
                </button>
                <Link
                  href="/apps/securevault-docs"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-teal-500 text-white text-lg font-semibold hover:bg-teal-500/10 hover:border-teal-400 transition-all"
                >
                  Back to SecureVault Docs
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

      {/* Section 2: The Problem */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Content */}
            <div>
              <h2
                className="font-helvetica text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6"
                style={{ lineHeight: 0.9, letterSpacing: "-0.062em" }}
              >
                Multi-person deals
                <br />
                fall apart silently.
              </h2>
              <p className="font-outfit text-lg sm:text-xl text-slate-700 leading-relaxed max-w-[420px]">
                When agents, coordinators, and partners all touch the same transaction, the smallest miscommunication becomes the biggest problem.
              </p>
            </div>

            {/* Right - Glassmorphism Cards */}
            <div className="relative h-[400px] sm:h-[450px]">
              {/* Card 1 - VERSION CONFUSION */}
              <div
                className="card-lift absolute top-0 left-0 z-30 w-[280px] sm:w-[320px] h-[160px] sm:h-[180px] rounded-3xl backdrop-blur-xl border border-white/40 shadow-2xl flex items-end justify-center pb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(254, 255, 255, 0.5) 50%, rgba(6, 182, 212, 0.3) 100%)",
                }}
              >
                <p
                  className="text-base sm:text-lg font-bold text-white uppercase tracking-[0.2em]"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                >
                  VERSION CONFUSION
                </p>
              </div>

              {/* Card 2 - MISSING UPDATES */}
              <div
                className="card-lift absolute top-[100px] sm:top-[120px] right-0 z-20 w-[280px] sm:w-[320px] h-[160px] sm:h-[180px] rounded-3xl backdrop-blur-xl border border-white/40 shadow-2xl flex items-end justify-center pb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(254, 255, 255, 0.5) 50%, rgba(20, 184, 166, 0.4) 100%)",
                }}
              >
                <p
                  className="text-base sm:text-lg font-bold text-white uppercase tracking-[0.2em]"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                >
                  MISSING UPDATES
                </p>
              </div>

              {/* Card 3 - LOST ACCOUNTABILITY */}
              <div
                className="card-lift absolute top-[200px] sm:top-[240px] left-0 z-10 w-[280px] sm:w-[320px] h-[160px] sm:h-[180px] rounded-3xl backdrop-blur-xl border border-white/40 shadow-2xl flex items-end justify-center pb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20, 184, 166, 0.35) 0%, rgba(254, 255, 255, 0.5) 50%, rgba(6, 182, 212, 0.35) 100%)",
                }}
              >
                <p
                  className="text-base sm:text-lg font-bold text-white uppercase tracking-[0.2em]"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
                >
                  LOST ACCOUNTABILITY
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center">
            <p className="font-outfit text-sm sm:text-base md:text-lg font-semibold text-white/70 uppercase tracking-widest mb-4">
              By the time everyone realizes something's wrong, the deal is at risk.
            </p>
            <div className="inline-block bg-slate-800/80 backdrop-blur px-6 py-3 rounded-lg">
              <span className="font-outfit text-sm sm:text-base font-medium text-white/90 uppercase tracking-widest">
                SecureVault Docs keeps teams in sync — automatically.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How Team Workflows Work */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading - Italic Gradient */}
          <h2
            className="font-normal italic mb-8 sm:mb-10 leading-[1.1] text-center text-transparent bg-clip-text"
            style={{
              fontFamily: "'Open Sauce One', sans-serif",
              fontSize: "clamp(40px, 8vw, 80px)",
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #ffffff 50%, #14b8a6 100%)",
            }}
          >
            Everyone sees
            <br />
            the same truth.
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Left Column */}
            <div>
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-4 font-outfit" style={{ color: "#334155" }}>
                SecureVault Docs team workflows solve this:
              </p>
              <p className="font-outfit italic text-xl sm:text-2xl md:text-3xl text-slate-700 leading-relaxed font-bold">
                Every team member sees the current state of documents, knows what's complete, and understands what's still needed — in real time.
              </p>
            </div>

            {/* Right Column - Timeline */}
            <div>
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-6 font-outfit" style={{ color: "#334155" }}>
                How it works:
              </p>
              <div className="relative pl-10">
                {/* Vertical Line */}
                <div
                  className="absolute left-[11px] sm:left-[13px] top-3 bottom-3 w-[3px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, #2dd4bf, #22d3ee, #14b8a6)",
                  }}
                ></div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  <div className="relative group">
                    <div className="absolute -left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-teal-200 transition-colors font-outfit">
                      Single source of truth
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-teal-200 transition-colors font-outfit">
                      Real-time visibility
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-teal-200 transition-colors font-outfit">
                      Clear accountability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Text */}
          <p
            className="text-center text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #5eead4, #67e8f9, #2dd4bf)",
            }}
          >
            No more "I thought you had that" moments.
          </p>
        </div>
      </section>

      {/* Section 4: Team Workflow Features */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2
            className="italic text-left mb-20 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Open Sauce One', sans-serif",
              fontSize: "clamp(36px, 7vw, 80px)",
              lineHeight: 0.9,
              letterSpacing: "-0.062em",
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #ffffff 50%, #14b8a6 100%)",
            }}
          >
            Built for teams
            <br />
            who need control
          </h2>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Role-Based Access */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              <div className="absolute -top-12 sm:-top-16 left-6 sm:left-8">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Role-Based Access
              </h3>
              <p className="font-outfit text-sm sm:text-base leading-relaxed" style={{ color: "#0f2336" }}>
                Agents, coordinators, and partners see only what they need. Control access by role, transaction, or document type — without manual permission management.
              </p>
            </div>

            {/* Card 2 - Activity Tracking */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              <div className="absolute -top-12 sm:-top-16 left-6 sm:left-8">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Activity Tracking
              </h3>
              <p className="font-outfit text-sm sm:text-base leading-relaxed" style={{ color: "#0f2336" }}>
                Know who uploaded what, when documents were viewed, and which tasks are complete. Full audit trail without micromanaging.
              </p>
              <p className="font-outfit text-sm italic mt-4" style={{ color: "#0f2336", opacity: 0.7 }}>
                Everyone stays accountable, naturally.
              </p>
            </div>

            {/* Card 3 - Smart Notifications */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              <div className="absolute -top-12 sm:-top-16 left-6 sm:left-8">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Smart Notifications
              </h3>
              <p className="font-outfit text-sm sm:text-base leading-relaxed mb-4" style={{ color: "#0f2336" }}>
                Teams get notified when:
              </p>
              <ul className="font-outfit text-sm sm:text-base space-y-2" style={{ color: "#0f2336" }}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Documents are uploaded or updated
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Deadlines are approaching
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Tasks need attention
                </li>
              </ul>
              <p className="font-outfit text-sm sm:text-base mt-4" style={{ color: "#0f2336" }}>
                No one misses what matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Real-World Use Cases */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-normal italic mb-4 text-transparent bg-clip-text text-center"
            style={{
              fontFamily: "'Open Sauce One', sans-serif",
              fontSize: "80px",
              lineHeight: 0.9,
              letterSpacing: "-0.062em",
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #ffffff 50%, #14b8a6 100%)",
            }}
          >
            Built for how
            <br />
            teams actually work
          </h2>

          <p className="font-outfit font-normal text-base sm:text-lg md:text-xl text-white mb-10 text-center">
            SecureVault Docs team workflows adapt to real collaboration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Real Estate Teams */}
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-lg"
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
                Real Estate Teams
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Agents, coordinators, and partners manage buyer/seller documents together — without version confusion or lost paperwork.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Everyone sees current documents</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Clear responsibility tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Automatic deadline alerts</span>
                </div>
              </div>
            </div>

            {/* Professional Services */}
            <div
              className="rounded-2xl p-6 sm:p-8 shadow-lg"
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
                Professional Services
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Accountants, lawyers, and consultants collaborate on client files while maintaining strict access control and compliance.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Role-based document access</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Complete audit trails</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">Secure client portals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Result Box */}
          <div className="mt-12 text-center">
            <div
              className="inline-block px-6 sm:px-8 py-4 rounded-lg"
              style={{ background: "#5a8a9a" }}
            >
              <span className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.1em] font-outfit">
                Teams stay aligned. Deals move forward. Nothing falls through the cracks.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl lg:text-7xl font-normal mb-8"
            style={{
              fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontStyle: "italic",
              letterSpacing: "-0.062em",
              lineHeight: "0.90"
            }}
          >
            <span className="text-white">Stop managing files.</span>{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 100%)"
              }}
            >
              Start managing teams.
            </span>
          </h2>

          <p className="font-outfit text-sm sm:text-base md:text-lg text-slate-700 uppercase tracking-widest mb-8 font-bold">
            Give your team the control they need — without the chaos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch team workflow demo
            </button>
            <Link
              href="/#pricing"
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
      </section>

      {/* Section 7: Bottom Banner */}
      <section
        className="relative z-10 w-full py-16"
        style={{
          background: "linear-gradient(180deg, #b8e0e8 0%, #a8d4de 100%)"
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
            SecureVault Docs Team Workflows
          </h3>
          <p
            className="text-2xl sm:text-3xl md:text-4xl italic text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 50%, #14b8a6 100%)"
            }}
          >
            Everyone aligned. Nothing lost. Always in control.
          </p>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/svd-demo.mp4"
        title="SecureVault Docs Team Workflow Demo"
      />
    </div>
  );
}
