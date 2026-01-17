// app/try-live-demo/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { liveDemos } from "@/config/try_live_demo_config";
import {
  PlayIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import DemoCarousel from "@/components/demos/DemoCarousel";

export const metadata: Metadata = {
  title: "Try a Live Demo | OMGsystems",
  description:
    "Choose a live sandbox and see how OMGsystems works in your world. No registration required. Just launch, click around, and imagine your team using this every day.",
  keywords: "live demo, interactive demo, CRM demo, SecureVault Docs demo, business software demo",
  openGraph: {
    title: "Try a Live Demo | OMGsystems",
    description:
      "Choose a live sandbox and see how OMGsystems works in your world. No registration required.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/try-live-demo",
  },
};

export default function TryLiveDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ============================================
          1. HERO SECTION - Interactive Demo Theme
          ============================================ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-20 sm:pb-28">
        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] cyan-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] cyan-glow-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] cyan-glow-float" style={{ animationDelay: '1s' }} />

        {/* Floating Play Button Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Play icon 1 - Large */}
          <div className="absolute top-[15%] left-[10%] float-play" style={{ animationDelay: '0s' }}>
            <div className="w-14 h-14 rounded-full bg-cyan-500/25 border border-cyan-500/40 flex items-center justify-center play-pulse">
              <PlayIcon className="w-6 h-6 text-cyan-400/80" />
            </div>
          </div>
          {/* Play icon 2 */}
          <div className="absolute top-[20%] right-[12%] float-play" style={{ animationDelay: '1.5s' }}>
            <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/35 flex items-center justify-center play-pulse" style={{ animationDelay: '0.5s' }}>
              <PlayIcon className="w-5 h-5 text-teal-400/70" />
            </div>
          </div>
          {/* Play icon 3 */}
          <div className="absolute top-[45%] left-[5%] float-play" style={{ animationDelay: '3s' }}>
            <div className="w-10 h-10 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">
              <PlayIcon className="w-4 h-4 text-cyan-300/60" />
            </div>
          </div>
          {/* Play icon 4 - Large */}
          <div className="absolute top-[35%] right-[8%] float-play" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center play-pulse" style={{ animationDelay: '1s' }}>
              <PlayIcon className="w-7 h-7 text-teal-400/60" />
            </div>
          </div>
          {/* Play icon 5 */}
          <div className="absolute top-[55%] left-[15%] float-play" style={{ animationDelay: '2.2s' }}>
            <div className="w-11 h-11 rounded-full bg-cyan-500/18 border border-cyan-500/28 flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-cyan-400/55" />
            </div>
          </div>
          {/* Play icon 6 */}
          <div className="absolute top-[60%] right-[18%] float-play" style={{ animationDelay: '4s' }}>
            <div className="w-9 h-9 rounded-full bg-teal-400/12 border border-teal-400/22 flex items-center justify-center">
              <PlayIcon className="w-4 h-4 text-teal-300/50" />
            </div>
          </div>
          {/* Ripple effects */}
          <div className="absolute top-[25%] left-[45%] w-24 h-24 rounded-full border border-cyan-500/25 ripple-animation" />
          <div className="absolute top-[50%] right-[35%] w-20 h-20 rounded-full border border-teal-500/20 ripple-animation" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[70%] left-[30%] w-16 h-16 rounded-full border border-cyan-400/15 ripple-animation" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              Interactive Demos
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Try a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Live Demo
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="text-center mb-10">
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Choose a live sandbox and see how OMGsystems works in your world.
              No registration required. Just launch, click around, and imagine
              your team using this every day.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-500/20 text-white/80 text-sm">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span className="font-medium">Instant access · No setup</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-teal-500/20 text-white/80 text-sm">
              <ClockIcon className="w-4 h-4 text-teal-400" />
              <span className="font-medium">5-10 minute guided experience</span>
            </div>
          </div>

          {/* Demo Carousel - Swipeable horizontal cards */}
          <DemoCarousel demos={liveDemos} />
        </div>
      </section>

      {/* ============================================
          3. FOOTER CTA SECTION - Gradient Banner
          ============================================ */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-500" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="demo-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#demo-grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <ArrowRightIcon className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                After you explore the demos, connect with us through{" "}
                <Link href="/contact" className="font-bold underline underline-offset-2 hover:text-white/80 transition-colors">
                  Contact Us
                </Link>{" "}
                or{" "}
                <Link href="/solutions/custom-solutions" className="font-bold underline underline-offset-2 hover:text-white/80 transition-colors">
                  Custom Solutions
                </Link>{" "}
                to map out how OMGsystems can plug into your actual workflows.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-cyan-600 shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                href="/solutions/custom-solutions"
                className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-3 font-medium text-white hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Custom Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
