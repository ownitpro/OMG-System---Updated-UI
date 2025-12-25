"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  hero,
  painPoints,
  solutionFeatures,
  individualCourse,
  businessCourse,
  whyItWorks,
  individualBuilds,
  businessBuilds,
  certificationBenefits,
  certificationFeatures,
  pricingPlans,
  faqs,
  finalCta,
} from "@/content/ai-mastery";

// Circuit board node positions for animated data flow
const circuitNodes = [
  { id: 0, x: 10, y: 20, connections: [1, 3] },
  { id: 1, x: 25, y: 15, connections: [2, 4] },
  { id: 2, x: 40, y: 25, connections: [5] },
  { id: 3, x: 15, y: 45, connections: [4, 6] },
  { id: 4, x: 35, y: 40, connections: [5, 7] },
  { id: 5, x: 55, y: 30, connections: [8] },
  { id: 6, x: 20, y: 70, connections: [7] },
  { id: 7, x: 45, y: 65, connections: [8] },
  { id: 8, x: 70, y: 50, connections: [] },
  { id: 9, x: 60, y: 15, connections: [10, 5] },
  { id: 10, x: 75, y: 25, connections: [11] },
  { id: 11, x: 85, y: 40, connections: [8] },
  { id: 12, x: 80, y: 70, connections: [11] },
  { id: 13, x: 90, y: 20, connections: [10] },
];

export function AIMasteryAppPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const individualCarouselRef = useRef<HTMLDivElement>(null);
  const businessCarouselRef = useRef<HTMLDivElement>(null);

  // Drag to scroll functionality
  const handleMouseDown = (ref: React.RefObject<HTMLDivElement | null>) => (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    const startX = e.pageX - ref.current.offsetLeft;
    const scrollLeft = ref.current.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2;
      ref.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <main className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Hero Section - Circuit Board Pattern */}
      <section className="relative overflow-hidden bg-slate-950 pt-40 sm:pt-52 pb-20 sm:pb-32">
        {/* Circuit Board SVG Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Gradient for circuit lines */}
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
              </linearGradient>

              {/* Glow filter for nodes */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Animated pulse for data flow */}
              <circle id="dataPacket" r="0.4" fill="#F59E0B">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </defs>

            {/* Circuit board paths */}
            <g stroke="url(#circuitGradient)" strokeWidth="0.15" fill="none" opacity="0.6">
              {/* Main horizontal pathways */}
              <path d="M0,20 H25 L30,25 H55 L60,20 H100" className="circuit-path" />
              <path d="M0,40 H15 L20,45 H45 L50,40 H75 L80,35 H100" className="circuit-path" />
              <path d="M0,65 H20 L25,70 H45 L55,60 H80 L85,65 H100" className="circuit-path" />

              {/* Vertical connectors */}
              <path d="M25,0 V20" className="circuit-path" />
              <path d="M25,25 V45" className="circuit-path" />
              <path d="M55,20 V40" className="circuit-path" />
              <path d="M75,35 V65" className="circuit-path" />
              <path d="M45,45 V70" className="circuit-path" />
              <path d="M85,0 V35" className="circuit-path" />
              <path d="M55,60 V100" className="circuit-path" />

              {/* Additional decorative paths */}
              <path d="M10,0 V15 L15,20" className="circuit-path" />
              <path d="M40,0 V10 L45,15 V25" className="circuit-path" />
              <path d="M70,0 V15 L75,20 V35" className="circuit-path" />
              <path d="M20,70 V100" className="circuit-path" />
              <path d="M90,40 V85 L85,90 V100" className="circuit-path" />
            </g>

            {/* Circuit nodes - Amber accent */}
            <g filter="url(#nodeGlow)">
              {circuitNodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="0.8"
                    fill={node.id % 2 === 0 ? "#F59E0B" : "#10B981"}
                    opacity="0.8"
                  >
                    <animate
                      attributeName="r"
                      values="0.6;1;0.6"
                      dur={`${2 + (node.id % 3)}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;1;0.6"
                      dur={`${2 + (node.id % 3)}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Inner glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="0.4"
                    fill="white"
                    opacity="0.6"
                  />
                </g>
              ))}
            </g>

            {/* Animated data flow particles */}
            <g>
              <circle r="0.3" fill="#F59E0B" opacity="0.9">
                <animateMotion dur="4s" repeatCount="indefinite" path="M0,20 H25 L30,25 H55 L60,20 H100" />
              </circle>
              <circle r="0.3" fill="#10B981" opacity="0.9">
                <animateMotion dur="5s" repeatCount="indefinite" path="M0,40 H15 L20,45 H45 L50,40 H75 L80,35 H100" />
              </circle>
              <circle r="0.25" fill="#F59E0B" opacity="0.8">
                <animateMotion dur="6s" repeatCount="indefinite" path="M25,0 V20 M25,25 V45" />
              </circle>
              <circle r="0.25" fill="#10B981" opacity="0.8">
                <animateMotion dur="4.5s" repeatCount="indefinite" path="M55,20 V40 M45,45 V70" />
              </circle>
            </g>
          </svg>

          {/* Gradient fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Gradient headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                {hero.title}
              </span>
            </h1>
            <p className="text-xl leading-8 text-white/80 pt-6 font-medium">
              {hero.subtitle}
            </p>
            <p className="text-lg leading-8 text-slate-400 pt-4 max-w-3xl mx-auto">
              {hero.description}
            </p>

            {/* Benefits pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              {hero.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
                >
                  <CheckCircleIcon className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-white/80">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-x-6 pt-10">
              <Link
                href={hero.primaryCta.href}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="text-base font-semibold leading-6 text-white hover:text-amber-400 transition-colors"
              >
                {hero.secondaryCta.label} <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Two paths preview card */}
            <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Individual path */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-300 group">
                <div className="text-amber-400 text-sm font-semibold mb-2">
                  {hero.coursePaths.individual.label}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {hero.coursePaths.individual.title}
                </h3>
                <p className="text-white/60 text-sm mt-2">
                  {hero.coursePaths.individual.description}
                </p>
              </div>

              {/* Business path */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300 group">
                <div className="text-emerald-400 text-sm font-semibold mb-2">
                  {hero.coursePaths.business.label}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {hero.coursePaths.business.title}
                </h3>
                <p className="text-white/60 text-sm mt-2">
                  {hero.coursePaths.business.description}
                </p>
              </div>
            </div>

            {/* Footnote */}
            <p className="text-sm text-white/40 pt-8">{hero.footnote}</p>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Horizontal Timeline with Red/Amber Warning Theme */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Most people waste time with AI because they don&apos;t know how to
              talk to it.
            </h2>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block relative max-w-6xl mx-auto">
            {/* Connecting line - aligned to center of nodes (top-[32px] = half of 64px node height) */}
            <div className="absolute top-[32px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-red-500/30 via-amber-500 to-red-500/30 rounded-full -translate-y-1/2" />

            <div className="grid grid-cols-5 gap-4">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center group"
                >
                  {/* Node with step number inside */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/20 border-2 border-red-500/50 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-amber-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300">
                    <XMarkIcon className="w-7 h-7 text-red-400 group-hover:text-amber-400 transition-colors" />
                    {/* Step number badge inside node */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-amber-500/50 flex items-center justify-center">
                      <span className="text-amber-400 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content card - uniform size */}
                  <div className="mt-6 p-5 rounded-xl bg-white/5 backdrop-blur-xl border border-red-500/20 group-hover:border-amber-500/40 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300 min-h-[140px] w-full flex items-center">
                    <p className="text-sm text-white/70 text-center group-hover:text-white/90 transition-colors w-full">
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-amber-500 to-red-500/30 rounded-full" />

            {painPoints.map((point, index) => (
              <div key={index} className="relative mb-6 last:mb-0">
                {/* Node */}
                <div className="absolute left-[-25px] top-3 w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/20 border-2 border-red-500/50 flex items-center justify-center z-10">
                  <XMarkIcon className="w-5 h-5 text-red-400" />
                </div>

                {/* Card */}
                <div className="ml-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-red-500/20">
                  <p className="text-sm text-white/70">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Hub & Spokes */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Meet OMG AI Mastery: the simple path to becoming truly AI-smart.
            </h2>
          </div>

          {/* Hub & Spokes Layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Hub */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Pulsing glow */}
                <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-amber-500/40 to-emerald-500/40 rounded-full blur-xl animate-pulse" />

                {/* Hub badge */}
                <div className="relative w-32 h-32 bg-gradient-to-br from-amber-500 via-amber-400 to-emerald-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.5)]">
                  <span className="text-white font-bold text-sm">OMG AI</span>
                  <span className="text-white font-bold text-lg">MASTERY</span>
                </div>
              </div>
            </div>

            {/* Connection lines from hub to grid - Desktop only */}
            <div className="hidden md:flex justify-center mb-4">
              <div className="relative w-full max-w-3xl">
                {/* Central vertical line from hub */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-0.5 h-8 bg-gradient-to-b from-amber-500/60 to-emerald-500/60" />

                {/* Horizontal connector line */}
                <div className="absolute top-4 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-amber-500/40 via-emerald-500/60 to-amber-500/40" />

                {/* Vertical drop lines to each column */}
                <div className="absolute top-4 left-[16.66%] w-0.5 h-6 bg-gradient-to-b from-amber-500/50 to-transparent" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-emerald-500/50 to-transparent" />
                <div className="absolute top-4 right-[16.66%] w-0.5 h-6 bg-gradient-to-b from-amber-500/50 to-transparent" />
              </div>
            </div>

            {/* Spokes / Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6">
              {solutionFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const isAmber = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`group relative p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      isAmber
                        ? "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                        : "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    }`}
                  >
                    {/* Connection node at top of card */}
                    <div
                      className={`hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                        isAmber ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />

                    {/* Vertical line connecting to card */}
                    <div
                      className={`hidden md:block absolute w-0.5 h-3 -top-3 left-1/2 -translate-x-1/2 ${
                        isAmber
                          ? "bg-gradient-to-b from-amber-500/60 to-amber-500/30"
                          : "bg-gradient-to-b from-emerald-500/60 to-emerald-500/30"
                      }`}
                    />

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 ${
                        isAmber
                          ? "bg-amber-500/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                          : "bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          isAmber ? "text-amber-400" : "text-emerald-400"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-bold mb-2 transition-colors ${
                        isAmber
                          ? "text-white group-hover:text-amber-400"
                          : "text-white group-hover:text-emerald-400"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Two Courses Section - Side-by-Side Split Cards */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Two courses, one goal: become confident, fast, and effective.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
            {/* Central dividing line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/20 via-white/20 to-emerald-500/20" />

            {/* Individual Course Card */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent backdrop-blur-xl border-2 border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_60px_rgba(245,158,11,0.25)] transition-all duration-500 group flex flex-col">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full">
                <div className="text-amber-400 text-sm font-semibold mb-2">
                  {individualCourse.label}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {individualCourse.title}
                </h3>
                <p className="text-white/60 mb-6">{individualCourse.description}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {individualCourse.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-xs text-white/40 mb-6">
                    {individualCourse.footnote}
                  </p>

                  <Link
                    href={individualCourse.cta.href}
                    className="block w-full text-center rounded-xl bg-amber-500 px-6 py-4 font-semibold text-white shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300"
                  >
                    {individualCourse.cta.label}
                  </Link>
                </div>
              </div>
            </div>

            {/* Business Course Card */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent backdrop-blur-xl border-2 border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_60px_rgba(16,185,129,0.25)] transition-all duration-500 group flex flex-col">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full">
                <div className="text-emerald-400 text-sm font-semibold mb-2">
                  {businessCourse.label}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {businessCourse.title}
                </h3>
                <p className="text-white/60 mb-6">{businessCourse.description}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {businessCourse.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-xs text-white/40 mb-6">
                    {businessCourse.footnote}
                  </p>

                  <Link
                    href={businessCourse.cta.href}
                    className="block w-full text-center rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
                  >
                    {businessCourse.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section - Horizontal Capsule Pills */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              AI isn&apos;t the future, it&apos;s the present.
            </h2>
            <p className="text-lg text-white/60 pt-4">
              But only if you know how to use it.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {whyItWorks.map((item, index) => {
              const IconComponent = item.icon;
              const isAmber = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`group flex flex-col items-center text-center p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 min-h-[180px] ${
                    isAmber
                      ? "bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                      : "bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ${
                      isAmber
                        ? "bg-amber-500/20 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                        : "bg-emerald-500/20 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${
                        isAmber ? "text-amber-400" : "text-emerald-400"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 transition-colors ${
                      isAmber
                        ? "text-white group-hover:text-amber-400"
                        : "text-white group-hover:text-emerald-400"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You'll Build Section - Drag-to-Scroll Carousels */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What you&apos;ll actually build inside OMG AI Mastery.
            </h2>
          </div>

          {/* Individual Builds Carousel - Amber Theme */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="text-lg font-semibold text-amber-400">
                For Individuals
              </h3>
              <span className="text-white/40 text-sm ml-auto">
                ← Drag to explore →
              </span>
            </div>

            <div className="relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

              <div
                ref={individualCarouselRef}
                className={`flex gap-4 overflow-x-auto scrollbar-hide pb-4 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onMouseDown={handleMouseDown(individualCarouselRef)}
              >
                {individualBuilds.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-64 p-6 rounded-2xl bg-slate-900/80 bg-gradient-to-br from-amber-500/15 via-amber-500/10 to-slate-900/90 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Business Builds Carousel - Emerald Theme */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="text-lg font-semibold text-emerald-400">
                For Businesses
              </h3>
              <span className="text-white/40 text-sm ml-auto">
                ← Drag to explore →
              </span>
            </div>

            <div className="relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

              <div
                ref={businessCarouselRef}
                className={`flex gap-4 overflow-x-auto scrollbar-hide pb-4 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onMouseDown={handleMouseDown(businessCarouselRef)}
              >
                {businessBuilds.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-64 p-6 rounded-2xl bg-slate-900/80 bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-slate-900/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section - 3D Spinning Certificate */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Show your skills with a real, verifiable certificate.
            </h2>
          </div>

          {/* Central Certificate Visual */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Pulsing glow */}
              <div className="absolute inset-0 w-48 h-56 bg-gradient-to-br from-amber-500/30 to-emerald-500/30 rounded-3xl blur-2xl animate-pulse" />

              {/* Static Certificate Container */}
              <div className="relative w-48 h-56 bg-gradient-to-br from-amber-500/20 via-white/10 to-emerald-500/20 backdrop-blur-xl rounded-3xl border-2 border-amber-500/40 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.3)]">
                {/* 3D Spinning Icon Only */}
                <div style={{ perspective: "500px" }} className="mb-3">
                  <div
                    className="cert-icon-spin text-5xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    📜
                  </div>
                </div>
                <div className="text-center px-4">
                  <div className="text-lg font-bold text-white">CERTIFIED</div>
                  <div className="text-sm font-semibold bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                    AI-SMART
                  </div>
                </div>
              </div>

              <style jsx>{`
                .cert-icon-spin {
                  animation: spin3d-cert-icon 6s linear infinite;
                }
                @keyframes spin3d-cert-icon {
                  0% {
                    transform: rotateY(0deg);
                  }
                  100% {
                    transform: rotateY(360deg);
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Certification Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {certificationBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent backdrop-blur-xl border border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-white/60 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {certificationFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-colors"
                >
                  <IconComponent className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-white/80">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Clear, simple pricing.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const isIndividual = plan.type === "individual";
              return (
                <div
                  key={index}
                  className={`relative rounded-3xl p-8 backdrop-blur-xl border-2 transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular
                      ? "bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.25)]"
                      : "bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/30 hover:border-amber-500/60"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-block rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`text-sm font-semibold mb-2 ${
                      isIndividual ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {plan.title}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.subtitle}
                  </h3>

                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircleIcon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isIndividual ? "text-amber-400" : "text-emerald-400"
                          }`}
                        />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.cta.href}
                    className={`block w-full text-center rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 ${
                      isIndividual
                        ? "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                        : "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    }`}
                  >
                    {plan.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion */}
      <section className="relative py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-amber-500/8 via-emerald-500/5 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/70 text-center mb-12">
            Everything you need to know about OMG AI Mastery.
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-amber-500/30"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        openFaqIndex === index
                          ? "bg-gradient-to-br from-amber-500 to-emerald-500"
                          : "bg-white/10"
                      }`}
                    >
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        openFaqIndex === index ? "text-amber-400" : "text-white"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? "rotate-180 text-amber-400" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-12 border-l-2 border-emerald-500/30">
                      <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Gradient Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-emerald-600/15 to-transparent" />
        <div className="absolute inset-0 bg-slate-950/50" />

        {/* Animated glow orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {finalCta.title}
            </h2>
            <p className="text-lg leading-8 text-white/70 pt-6">
              {finalCta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <Link
                href={finalCta.primaryCta.href}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105"
              >
                {finalCta.primaryCta.label}
              </Link>
              <Link
                href={finalCta.secondaryCta.href}
                className="w-full sm:w-auto rounded-xl bg-white/10 backdrop-blur-xl px-8 py-4 text-base font-semibold text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                {finalCta.secondaryCta.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal note */}
      <section className="bg-slate-950 py-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-white/40">
            OMG AI Mastery is designed for educational purposes. Results may
            vary based on individual effort and application.
          </p>
        </div>
      </section>
    </main>
  );
}
