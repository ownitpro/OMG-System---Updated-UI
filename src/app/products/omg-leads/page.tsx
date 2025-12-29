"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  PlayIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Screenshot data for carousel
const screenshots = [
  {
    id: 1,
    title: "Lead Dashboard",
    description: "See all your leads in one clean view",
  },
  {
    id: 2,
    title: "Smart Scoring",
    description: "Know which leads are hot and ready to close",
  },
  {
    id: 3,
    title: "Source Tracking",
    description: "See exactly which ads and campaigns work",
  },
  {
    id: 4,
    title: "ROI Analytics",
    description: "Track cost per lead and conversion rates",
  },
];

// Benefits data
const benefits = [
  {
    icon: CursorArrowRaysIcon,
    title: "Lead Capture",
    description: "From all your ad sources automatically",
  },
  {
    icon: BoltIcon,
    title: "Smart Scoring",
    description: "Know which leads are hot instantly",
  },
  {
    icon: ClockIcon,
    title: "Auto Follow-up",
    description: "Nurture leads 24/7 on autopilot",
  },
  {
    icon: ChartBarIcon,
    title: "ROI Tracking",
    description: "See what's working, cut what's not",
  },
];

// Stats for visual
const stats = [
  { value: "20+", label: "Qualified leads in 7 days" },
  { value: "3×", label: "Higher conversion rates" },
  { value: "60%", label: "Less manual follow-up" },
];

export default function OmgLeadsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || userRole === "STAFF";
  const backToPortalHref = status === "loading" ? "/portal/client" : (isAdmin ? "/portal/admin/products" : "/portal/client");

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">OMG Systems</span>
            </Link>

            {/* Back to Portal */}
            <Link
              href={backToPortalHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Split Hero Section - UNIQUE LAYOUT */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#47BD79]/30 bg-[#47BD79]/10 px-4 py-2 mb-6">
                <div className="w-6 h-6 rounded-lg bg-[#47BD79] flex items-center justify-center">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[#47BD79]">OMG-Leads</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Turn ads into predictable revenue.
              </h1>
              <p className="text-xl text-white/60 mb-8">
                Stop guessing which ads work. Capture, score, and follow up on every lead automatically.
              </p>

              {/* Price Badge */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#47BD79] px-4 py-2">
                  <span className="text-lg font-bold text-white">$19/month</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                    6-day free trial
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/* Primary CTA */}
              <Link
                href="/checkout/start?product=omg-leads&trial=true"
                className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-8 py-4 text-lg font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-xl hover:shadow-[#47BD79]/40"
              >
                Start 6-Day Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Stats Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#47BD79]/10 via-[#1e293b] to-[#3B82F6]/10 p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-white/50 uppercase tracking-wide">Average Results</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-16 h-16 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#47BD79]">{stat.value}</span>
                      </div>
                      <p className="text-white/80">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-white/40">Based on average client performance</p>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-[#47BD79]/10 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Your complete lead engine</h2>
            <p className="text-white/60">From ad click to booked call—automated</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 hover:border-[#47BD79]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center mb-4 group-hover:bg-[#47BD79]/30 transition-all">
                  <benefit.icon className="w-6 h-6 text-[#47BD79]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">See OMG-Leads in action</h2>
            <p className="text-white/60">Watch how easy it is to track and convert leads</p>
          </div>

          {/* Video Player Placeholder */}
          <div
            onClick={() => setShowVideoModal(true)}
            className="relative aspect-video rounded-2xl border border-white/10 bg-[#1e293b] overflow-hidden cursor-pointer group"
          >
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#47BD79]/20 via-transparent to-[#3B82F6]/20" />

            {/* Placeholder Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#47BD79] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#47BD79]/30">
                <PlayIcon className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-white/60 text-sm">Click to watch demo video</p>
            </div>

            {/* Upload Indicator for Dev */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white/40">
              Video placeholder - Upload your demo video
            </div>
          </div>
        </section>

        {/* Screenshots Carousel */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Product Preview</h2>
            <p className="text-white/60">A lead system built for growth</p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1e293b]">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="w-full flex-shrink-0">
                    {/* Screenshot Placeholder */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 flex flex-col items-center justify-center p-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                        <ArrowTrendingUpIcon className="w-8 h-8 text-[#47BD79]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{screenshot.title}</h3>
                      <p className="text-white/60 text-center max-w-md">{screenshot.description}</p>
                      <p className="text-xs text-white/30 mt-4">Screenshot placeholder - Upload image</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-6 bg-[#47BD79]"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#47BD79]/10 via-[#1e293b] to-[#3B82F6]/10 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for predictable lead flow?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Try OMG-Leads free for 6 days. Stop guessing and start growing on purpose.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout/start?product=omg-leads&trial=true"
                className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-8 py-4 text-lg font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-xl hover:shadow-[#47BD79]/40"
              >
                Start 6-Day Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/products/plans"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-lg font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                View All Plans
              </Link>
            </div>

            <p className="text-sm text-white/40 mt-6">
              Works perfectly with OMG-CRM for complete pipeline management.
            </p>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl bg-[#1e293b] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Video Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#47BD79]/20 via-transparent to-[#3B82F6]/20">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <PlayIcon className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white/60">Video placeholder</p>
              <p className="text-sm text-white/40 mt-2">Embed your YouTube/Vimeo video here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
