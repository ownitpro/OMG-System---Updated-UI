"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoModal } from "@/components/ui/video-modal";
import { IndustryTabs } from "@/components/securevault-docs/industry-tabs";

export default function SecureVaultDocsPage() {
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
        {/* Hero Content */}
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
              Stay ahead of every
              <br />
              <span
                className="text-transparent bg-clip-text italic"
                style={{
                  backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #22d3ee 100%)",
                }}
              >
                deadline.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="hero-subheadline text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-slate-700 px-4 uppercase tracking-widest font-outfit">
              Upload a photo or file, and Secure Vault Docs automatically
              organizes it, tracks deadlines and expirations, and keeps you
              ahead — without manual work.
            </p>

            {/* Reinforcement Box */}
            <div className="flex justify-center pt-2">
              <div className="inline-block px-6 py-3 rounded-lg bg-slate-800/80 backdrop-blur">
                <p className="text-sm sm:text-base font-medium text-white/90 uppercase tracking-widest font-outfit">
                  No folders to manage. No reminders to set. Nothing slips.
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

      {/* Section 2: Most People Realize Too Late */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Content */}
            <div>
              <h2
                className="font-helvetica text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6"
                style={{ lineHeight: 0.9, letterSpacing: "-0.062em" }}
              >
                Most people
                <br />
                realize too late.
              </h2>
              <p className="font-outfit text-lg sm:text-xl text-slate-700 leading-relaxed max-w-[420px]">
                Important files don't fail you because they're hard to store.
                They fail you because they sit quietly until the moment you need
                them.
              </p>
            </div>

            {/* Right - Glassmorphism Cards */}
            <div className="relative h-[400px] sm:h-[450px]">
              {/* Card 1 - AN ID EXPIRES */}
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
                  AN ID EXPIRES
                </p>
              </div>

              {/* Card 2 - A BILL GOES PAST DUE */}
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
                  A BILL GOES PAST DUE
                </p>
              </div>

              {/* Card 3 - A RENEWAL GETS MISSED */}
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
                  A RENEWAL GETS MISSED
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center">
            <p className="font-outfit text-sm sm:text-base md:text-lg font-semibold text-white/70 uppercase tracking-widest mb-4">
              By the time you're looking for the file, the problem has already
              started.
            </p>
            <div className="inline-block bg-slate-800/80 backdrop-blur px-6 py-3 rounded-lg">
              <span className="font-outfit text-sm sm:text-base font-medium text-white/90 uppercase tracking-widest">
                SecureVault Docs is built to change that.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Files Shouldn't Wait */}
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
            Files shouldn't wait
            <br />
            for you to remember.
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Left Column */}
            <div>
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-4 font-outfit" style={{ color: "#334155" }}>
                Secure Vault Docs runs on a simple idea:
              </p>
              <p className="font-outfit italic text-xl sm:text-2xl md:text-3xl text-slate-700 leading-relaxed font-bold">
                You shouldn't have to manage files, track deadlines, or remember
                what's coming up next.
              </p>
            </div>

            {/* Right Column - Timeline */}
            <div>
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-6 font-outfit" style={{ color: "#334155" }}>
                Once something is captured, it should:
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
                      stay organized
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-teal-200 transition-colors font-outfit">
                      know when it matters
                    </p>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-teal-200 transition-colors font-outfit">
                      and keep you ahead automatically
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
            That's what SecureVault Docs does.
          </p>
        </div>
      </section>

      {/* Section 4: How It Works */}
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
            How Secure Vault Docs
            <br />
            keeps you ahead
          </h2>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Capture Once */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              {/* 3D Icon */}
              <div className="absolute -top-12 sm:-top-16 left-6 sm:left-8">
                <Image
                  src="/13.png"
                  alt="Capture Once"
                  width={112}
                  height={112}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                />
              </div>
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Capture once.
              </h3>
              <p className="font-outfit text-sm sm:text-base leading-relaxed" style={{ color: "#0f2336" }}>
                Take a photo, upload a file, scan a document, or forward a
                receipt. However it comes in, Secure Vault Docs captures it
                instantly. No special steps. No prep work.
              </p>
            </div>

            {/* Card 2 - It Organizes Itself */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              {/* 3D Icon */}
              <div className="absolute -top-12 sm:-top-16 left-6 sm:left-8">
                <Image
                  src="/14.png"
                  alt="It Organizes Itself"
                  width={112}
                  height={112}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                />
              </div>
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                It organizes itself.
              </h3>
              <p className="font-outfit text-sm sm:text-base leading-relaxed" style={{ color: "#0f2336" }}>
                Secure Vault Docs understands what you upload and files it
                automatically — without folders, naming rules, or manual
                sorting.
              </p>
              <p className="font-outfit text-sm italic mt-4" style={{ color: "#0f2336", opacity: 0.7 }}>
                Everything lands where it belongs, ready when you need it.
              </p>
            </div>

            {/* Card 3 - Stay Ahead Automatically */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 pt-14 sm:pt-16 shadow-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(254, 255, 255, 0.445) 0%, rgba(0, 110, 239, 0) 100%)",
                border: "0.5px solid white",
              }}
            >
              {/* 3D Icon */}
              <div className="absolute -top-12 sm:-top-16 left-6 sm:left-8">
                <Image
                  src="/15.png"
                  alt="Stay Ahead Automatically"
                  width={112}
                  height={112}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                />
              </div>
              <h3
                className="text-base sm:text-lg font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: "#0f2336" }}
              >
                Stay ahead — automatically.
              </h3>
              <p className="font-outfit text-sm sm:text-base leading-relaxed mb-4" style={{ color: "#0f2336" }}>
                If something has a due date, expiration, or renewal:
              </p>
              <ul className="font-outfit text-sm sm:text-base space-y-2" style={{ color: "#0f2336" }}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Secure Vault Docs detects it
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  tracks it
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  and notifies you ahead of time
                </li>
              </ul>
              <p className="font-outfit text-sm sm:text-base mt-4" style={{ color: "#0f2336" }}>
                You don't chase deadlines. They never surprise you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Built for Real Life */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2
            className="font-normal italic mb-4 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Open Sauce One', sans-serif",
              fontSize: "80px",
              lineHeight: 0.9,
              letterSpacing: "-0.062em",
              backgroundImage:
                "linear-gradient(90deg, #14b8a6 0%, #ffffff 50%, #14b8a6 100%)",
            }}
          >
            Built for real life —
            <br />
            and real work
          </h2>

          <p className="font-outfit font-normal text-base sm:text-lg md:text-xl text-white mb-10">
            Secure Vault Docs adapts to how people actually handle important
            files.
          </p>

          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 items-start">
            {/* Left - Pills */}
            <div>
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.15em] mb-4 font-outfit" style={{ color: "#334155" }}>
                Whether you're managing:
              </p>
              <div className="flex flex-col items-start space-y-4">
                <span
                  className="px-6 sm:px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white uppercase tracking-[0.1em] cursor-default font-outfit"
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(180deg, #008c9e 0%, #b5e3ef 100%)",
                  }}
                >
                  Personal records and IDs
                </span>
                <span
                  className="px-6 sm:px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white uppercase tracking-[0.1em] cursor-default font-outfit"
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(180deg, #008c9e 0%, #b5e3ef 100%)",
                  }}
                >
                  Client documents and receipts
                </span>
                <span
                  className="px-6 sm:px-8 py-4 rounded-full text-sm sm:text-base font-bold text-white uppercase tracking-[0.1em] cursor-default font-outfit"
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(180deg, #008c9e 0%, #b5e3ef 100%)",
                  }}
                >
                  Deals, properties, or projects
                </span>
              </div>
            </div>

            {/* Right - Result Box */}
            <div className="lg:text-right">
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.15em] mb-4 font-outfit" style={{ color: "#334155" }}>
                The system stays the same:
              </p>
              <div
                className="inline-block px-6 sm:px-8 py-4 rounded-lg"
                style={{ background: "#5a8a9a" }}
              >
                <span className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.1em] font-outfit">
                  Capture once. Stay ahead forever.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Why It's Different (Storage tools) */}
      <section id="why-different" className="relative z-10 py-8 sm:py-12 overflow-hidden">
        {/* Decorative Image - Left */}
        <Image
          src="/16.png"
          alt=""
          width={500}
          height={500}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[20%] w-[280px] sm:w-[350px] md:w-[420px] lg:w-[500px] pointer-events-none hidden md:block"
        />
        {/* Decorative Image - Right */}
        <Image
          src="/17.png"
          alt=""
          width={500}
          height={500}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[30%] w-[280px] sm:w-[350px] md:w-[420px] lg:w-[500px] pointer-events-none hidden md:block"
        />

        <div className="relative max-w-4xl mx-auto px-4">
          {/* Main Headline */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 w-full">
            <h2
              className="text-center"
              style={{
                fontFamily: "'Open Sauce One', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                style={{ color: "#0f2336" }}
              >
                Storage tools hold files.
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 whitespace-nowrap">
                <span className="font-bold" style={{ color: "#0f2336" }}>
                  SecureVault Docs{" "}
                </span>
                <span
                  className="font-normal italic text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #14b8a6 0%, #ffffff 100%)",
                  }}
                >
                  stays ahead of them.
                </span>
              </span>
            </h2>
          </div>

          {/* Content Box */}
          <div className="w-full space-y-6">
            <p className="text-center text-white/80 font-normal font-outfit text-xl sm:text-[22px]">
              Most tools stop at storage, search, or organization.
            </p>
            <p className="text-center text-white/80 font-normal font-outfit text-xl sm:text-[22px]">
              Secure Vault Docs goes further:
            </p>

            {/* Bullet Points - Left aligned */}
            <div className="flex flex-col items-start space-y-2 text-white/80 font-normal font-outfit text-xl sm:text-[22px]">
              <p>
                <span style={{ color: "#144255" }}>•</span> it understands what
                a file is
              </p>
              <p>
                <span style={{ color: "#144255" }}>•</span> knows when it
                matters
              </p>
              <p>
                <span style={{ color: "#144255" }}>•</span> and watches the
                clock for you
              </p>
            </div>
          </div>

          {/* Bottom CTA Text */}
          <p
            className="mt-6 sm:mt-8"
            style={{
              fontSize: "24px",
              color: "#0f2336",
              fontFamily: "'Open Sauce One', sans-serif",
              fontWeight: 700,
            }}
          >
            That's the difference between managing files — and being ahead of
            them.
          </p>
        </div>
      </section>

      {/* Section 7: Trust & Control (Private by default) */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2
                className="font-bold mb-6"
                style={{
                  fontFamily: "'Open Sauce One', sans-serif",
                  fontSize: "clamp(40px, 6vw, 70px)",
                  color: "#0f2336",
                  lineHeight: 0.9,
                  letterSpacing: "-0.062em",
                }}
              >
                Private by default.
                <br />
                Always in your control.
              </h2>

              <p className="font-outfit text-lg text-white/90 mb-6">
                Your files are private, secure, and only shared when you choose.
              </p>

              <p className="font-outfit text-lg text-white/90 mb-4">You decide:</p>

              <ul className="space-y-3 font-outfit text-lg text-white/90 mb-8">
                <li className="flex items-start">
                  <span className="mr-3 text-teal-300">•</span>
                  who sees what
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-teal-300">•</span>
                  when access starts and ends
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-teal-300">•</span>
                  what stays tracked
                </li>
              </ul>

              <div
                className="inline-block px-6 py-4 rounded-lg"
                style={{
                  background: "rgba(0, 84, 104, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <span className="font-outfit text-sm font-semibold text-white uppercase tracking-widest">
                  Secure Vault Docs works quietly in the background — without
                  getting in the way.
                </span>
              </div>
            </div>

            {/* Right - Shield Image */}
            <div className="flex justify-center lg:justify-end lg:-mt-16">
              <Image
                src="/Untitled design.png"
                alt="Privacy Shield"
                width={550}
                height={550}
                className="w-[350px] sm:w-[450px] md:w-[500px] lg:w-[550px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7.5: Upgrade How You Handle Files */}
      <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2
            className="text-4xl sm:text-5xl lg:text-7xl font-normal mb-8"
            style={{
              fontFamily: "'Helvetica Now', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontStyle: "italic",
              letterSpacing: "-0.062em",
              lineHeight: "0.90"
            }}
          >
            <span className="text-white">Upgrade</span>{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 100%)"
              }}
            >
              how you handle files.
            </span>
          </h2>

          {/* Subtext */}
          <p className="font-outfit text-sm sm:text-base md:text-lg text-slate-700 uppercase tracking-widest mb-8 font-bold">
            STOP REACTING TO DEADLINES. STOP REALIZING THINGS TOO LATE.
          </p>

          {/* CTA Text */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-10 text-white font-outfit">
            Capture once — and stay ahead from there.
          </p>

          {/* Button */}
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
            See how it works
          </button>
        </div>
      </section>

      {/* Section 8: Bottom Banner */}
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
            SecureVault Docs
          </h3>
          <p
            className="text-2xl sm:text-3xl md:text-4xl italic text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0f2336 50%, #14b8a6 100%)"
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
