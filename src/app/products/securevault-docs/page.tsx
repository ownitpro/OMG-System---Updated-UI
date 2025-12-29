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
  FolderIcon,
  MagnifyingGlassIcon,
  LockClosedIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Screenshot data for carousel
const screenshots = [
  {
    id: 1,
    title: "Vault Organization",
    description: "Clean folders that make sense for your business",
  },
  {
    id: 2,
    title: "Smart Upload",
    description: "Drag, drop, and auto-organize with OCR",
  },
  {
    id: 3,
    title: "Instant Search",
    description: "Find any document in seconds with tags",
  },
  {
    id: 4,
    title: "Secure Sharing",
    description: "PIN-protected links with expiry dates",
  },
];

// Benefits data
const benefits = [
  {
    icon: FolderIcon,
    title: "Vault Organization",
    description: "Clean folders, no mess. Everything in its place.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Fast Search",
    description: "Find anything with tags + OCR text search.",
  },
  {
    icon: LockClosedIcon,
    title: "Secure Sharing",
    description: "PIN-protected links that expire automatically.",
  },
  {
    icon: DocumentCheckIcon,
    title: "Business Ready",
    description: "Audit trails and compliance built-in.",
  },
];

export default function SecureVaultDocsPage() {
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center">
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
        {/* Hero Section */}
        <section className="text-center mb-12">
          {/* Product Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A855F7]/30 bg-[#A855F7]/10 px-4 py-2 mb-6">
            <div className="w-6 h-6 rounded-lg bg-[#A855F7] flex items-center justify-center">
              <ShieldCheckIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-[#A855F7]">SecureVault Docs</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stop losing documents.
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Store them once. Find them in seconds. Your documents deserve better than a messy folder system.
          </p>

          {/* Price Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7] px-4 py-2">
              <span className="text-lg font-bold text-white">$29/month</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#A855F7]" />
                6-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#A855F7]" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-[#A855F7]" />
                Secure checkout
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <Link
            href="/checkout/start?product=securevault-docs&trial=true"
            className="inline-flex items-center gap-2 rounded-xl bg-[#A855F7] px-8 py-4 text-lg font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30 hover:shadow-xl hover:shadow-[#A855F7]/40"
          >
            Start 6-Day Free Trial
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </section>

        {/* Benefits Section - FIRST (unique layout) */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Everything you need for document control</h2>
            <p className="text-white/60">No more digging through folders or losing important files</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 hover:border-[#A855F7]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center mb-4 group-hover:bg-[#A855F7]/30 transition-all">
                  <benefit.icon className="w-6 h-6 text-[#A855F7]" />
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
            <h2 className="text-2xl font-bold text-white mb-2">See SecureVault in action</h2>
            <p className="text-white/60">Watch how easy it is to organize your documents</p>
          </div>

          {/* Video Player Placeholder */}
          <div
            onClick={() => setShowVideoModal(true)}
            className="relative aspect-video rounded-2xl border border-white/10 bg-[#1e293b] overflow-hidden cursor-pointer group"
          >
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/20 via-transparent to-[#EC4899]/20" />

            {/* Placeholder Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#A855F7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#A855F7]/30">
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
            <p className="text-white/60">A vault system designed for how you actually work</p>
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
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#A855F7]/10 via-transparent to-[#EC4899]/10 flex flex-col items-center justify-center p-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                        <ShieldCheckIcon className="w-8 h-8 text-[#A855F7]" />
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
                      ? "w-6 bg-[#A855F7]"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#A855F7]/10 via-[#1e293b] to-[#EC4899]/10 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get organized?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Try SecureVault Docs free for 6 days. Stop losing files and start running cleaner.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout/start?product=securevault-docs&trial=true"
                className="inline-flex items-center gap-2 rounded-xl bg-[#A855F7] px-8 py-4 text-lg font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30 hover:shadow-xl hover:shadow-[#A855F7]/40"
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
              Secure checkout powered by Stripe. Your documents stay encrypted and protected.
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#A855F7]/20 via-transparent to-[#EC4899]/20">
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
