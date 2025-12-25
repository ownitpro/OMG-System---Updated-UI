"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  PaintBrushIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import {
  whatItDoes,
  industries,
  whyTeamsLoveIt,
  howItWorks,
  keyFeatures,
  pricingPlans,
  securityTrust,
  faqs,
  finalCta,
} from "@/content/omg-iq";

// Generate falling dots aligned to 60px grid lines
// Each dot falls on a specific vertical grid line
const fallingDotsConfig = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  gridLine: i, // Which grid line (0, 1, 2, 3... = 0px, 60px, 120px, 180px...)
  delay: (i * 0.4) % 6, // Staggered delays 0-6s
  duration: 3 + (i % 3), // 3-5 seconds for faster rain effect
}));

export function OMGIQAppPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set());
  const observersRef = useRef<Map<number, IntersectionObserver>>(new Map());

  // Callback ref for each feature card - sets up observer when element mounts
  const setFeatureRef = (index: number) => (el: HTMLDivElement | null) => {
    // Clean up existing observer for this index
    const existingObserver = observersRef.current.get(index);
    if (existingObserver) {
      existingObserver.disconnect();
      observersRef.current.delete(index);
    }

    // If element exists and is visible (not display:none), set up observer
    if (el && el.offsetParent !== null) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Card entered viewport - add to visible set
              setVisibleFeatures((prev) => new Set(Array.from(prev).concat(index)));
            } else {
              // Card left viewport - remove from visible set
              setVisibleFeatures((prev) => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
      );

      observer.observe(el);
      observersRef.current.set(index, observer);
    }
  };

  // Cleanup all observers on unmount
  useEffect(() => {
    return () => {
      observersRef.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Hero Section - Clean line grid */}
      <section className="relative overflow-hidden bg-slate-950 pt-40 sm:pt-52 pb-20 sm:pb-32">
        {/* Clean line grid pattern */}
        <div
          className="absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h60M0 60h60' stroke='%23A855F7' stroke-opacity='0.15' stroke-width='1'/%3E%3Cpath d='M0 0v60M60 0v60' stroke='%23A855F7' stroke-opacity='0.15' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Animated falling dots on grid lines - aligned to 60px grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {fallingDotsConfig.map((dot) => (
            <div
              key={dot.id}
              className="falling-dot absolute w-1 h-1 rounded-full bg-[#A855F7]"
              style={{
                left: `${dot.gridLine * 60}px`, // Position on grid line (60px spacing)
                animationDelay: `${dot.delay}s`,
                animationDuration: `${dot.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Falling dots animation - rain effect on grid lines */}
        <style jsx>{`
          .falling-dot {
            animation: fall-and-fade linear infinite;
            box-shadow: 0 0 6px 2px rgba(168, 85, 247, 0.6);
            will-change: transform, opacity;
          }
          @keyframes fall-and-fade {
            0% {
              transform: translateY(-5px);
              opacity: 0.9;
            }
            60% {
              opacity: 0.4;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
        `}</style>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Turn industry noise into daily smart moves.
            </h1>
            <p className="text-lg leading-8 text-slate-300 sm:text-xl pt-6">
              OMGIQ finds what matters in your industry, turns it into clear,
              short digests, and delivers it to you and your team either through Email or SMS.
            </p>
            <div className="flex items-center justify-center gap-x-6 pt-10">
              <Link
                href="/apps/demo?app=omg-iq"
                className="rounded-xl bg-[#A855F7] px-6 py-3 text-base font-semibold text-white shadow-[0_0_20px_rgba(71,189,121,0.4)] hover:bg-[#9333EA] hover:shadow-[0_0_30px_rgba(71,189,121,0.5)] transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/apps/omg-iq/sample"
                className="text-base font-semibold leading-6 text-white hover:text-[#A855F7] transition-colors"
              >
                See a Sample Digest <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What it does - Horizontal Step Flow */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What it does (in one minute)
            </h2>
          </div>

          {/* Desktop: Horizontal Flow */}
          <div className="hidden md:block">
            <div className="relative flex items-start justify-between max-w-5xl mx-auto">
              {/* Connecting line */}
              <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#A855F7]/30 via-[#A855F7] to-[#A855F7]/30 rounded-full" />

              {whatItDoes.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center w-1/5 px-2 group">
                  {/* Step node */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(71,189,121,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative max-w-sm mx-auto">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#A855F7] to-[#A855F7]/30 rounded-full" />

              {whatItDoes.map((item, index) => (
                <div key={index} className="relative flex items-start mb-8 last:mb-0">
                  {/* Node */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center z-10 flex-shrink-0 shadow-[0_0_15px_rgba(71,189,121,0.3)]">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="ml-4 pt-1">
                    <p className="text-sm text-white/70">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for - Single Row Auto-Scroll (Full Width) */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        {/* Header stays contained */}
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Who it's for
            </h2>
            <p className="text-lg leading-8 text-white/70 pt-4 max-w-2xl mx-auto">
              If you lead a team and make decisions fast, OMGIQ keeps you sharp
              without the time sink.
            </p>
          </div>
        </div>

        {/* Full Width Marquee - No container constraint */}
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Continuous auto-scroll marquee */}
          <div className="overflow-hidden group">
            <div
              className="flex w-max hover:[animation-play-state:paused]"
              style={{
                animation: 'scroll 25s linear infinite',
              }}
            >
              {/* First set */}
              {industries.map((industry, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl border border-[#A855F7]/30 hover:border-[#A855F7]/60 hover:shadow-[0_0_20px_rgba(71,189,121,0.2)] transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-2xl">{industry.icon}</span>
                  <span className="text-white font-medium whitespace-nowrap">{industry.name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {industries.map((industry, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl border border-[#A855F7]/30 hover:border-[#A855F7]/60 hover:shadow-[0_0_20px_rgba(71,189,121,0.2)] transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-2xl">{industry.icon}</span>
                  <span className="text-white font-medium whitespace-nowrap">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keyframes for the scroll animation */}
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>
      </section>

      {/* Why teams love it - Full Width Cards */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why teams love it
            </h2>
          </div>

          {/* Responsive Grid - 2 cols mobile, 5 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {whyTeamsLoveIt.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center p-5 md:p-6 bg-gradient-to-b from-[#A855F7]/15 via-[#A855F7]/5 to-transparent backdrop-blur-xl rounded-2xl border border-[#A855F7]/20 hover:border-[#A855F7]/50 hover:scale-105 hover:shadow-[0_0_40px_rgba(71,189,121,0.25)] transition-all duration-300"
                >
                  {/* Large Icon */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(71,189,121,0.4)] transition-all duration-300">
                    <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#A855F7]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 group-hover:text-[#A855F7] transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works - Bento Grid */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How it works
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Bento Grid Layout - All cards with emerald gradient */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 - Large (spans 2 columns) */}
              <div className="md:col-span-2 bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 border border-[#A855F7]/30 hover:border-[#A855F7]/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(71,189,121,0.3)] group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#A855F7] transition-colors mb-2">
                      {howItWorks[0].title}
                    </h3>
                    <p className="text-white/60">{howItWorks[0].description}</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-6 border border-[#A855F7]/30 hover:border-[#A855F7]/50 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(71,189,121,0.3)] group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#A855F7] transition-colors mb-2">
                    {howItWorks[1].title}
                  </h3>
                  <p className="text-white/60 text-sm">{howItWorks[1].description}</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-6 border border-[#A855F7]/30 hover:border-[#A855F7]/50 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(71,189,121,0.3)] group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#A855F7] transition-colors mb-2">
                    {howItWorks[2].title}
                  </h3>
                  <p className="text-white/60 text-sm">{howItWorks[2].description}</p>
                </div>
              </div>

              {/* Card 4 - Large (spans 2 columns) */}
              <div className="md:col-span-2 bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 border border-[#A855F7]/30 hover:border-[#A855F7]/50 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(71,189,121,0.3)] group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#A855F7] transition-colors mb-2">
                      {howItWorks[3].title}
                    </h3>
                    <p className="text-white/60">{howItWorks[3].description}</p>
                  </div>
                </div>
              </div>

              {/* Card 5 - Full width */}
              <div className="md:col-span-3 bg-gradient-to-r from-[#A855F7]/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 border border-[#A855F7]/30 hover:border-[#A855F7]/50 transition-all duration-300 group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A855F7] to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_rgba(71,189,121,0.4)] group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-2xl">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#A855F7] transition-colors mb-1">
                      {howItWorks[4].title}
                    </h3>
                    <p className="text-white/60">{howItWorks[4].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key features - Zigzag Alternating Timeline */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Key features
            </h2>
          </div>

          {/* Desktop: Zigzag Timeline */}
          <div className="hidden md:block relative max-w-4xl mx-auto">
            {/* Central Glowing Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[#A855F7] via-[#A855F7]/50 to-[#A855F7]/20 rounded-full shadow-[0_0_20px_rgba(71,189,121,0.5)]" />

            {keyFeatures.map((feature, index) => {
              const isLeft = index % 2 === 0;
              const isActive = visibleFeatures.has(index);
              return (
                <div
                  key={index}
                  ref={setFeatureRef(index)}
                  className={`relative flex items-center mb-8 last:mb-0 ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Card */}
                  <div
                    className={`w-[45%] group bg-gradient-to-br from-[#A855F7]/10 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 ${
                      isActive
                        ? 'border-[#A855F7]/60 shadow-[0_0_40px_rgba(71,189,121,0.35)] scale-[1.02]'
                        : 'border-[#A855F7]/10 opacity-50'
                    } hover:border-[#A855F7]/70 hover:shadow-[0_0_50px_rgba(71,189,121,0.4)] ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive ? 'scale-110 shadow-[0_0_20px_rgba(71,189,121,0.5)]' : ''
                      }`}>
                        <CheckCircleIcon className="w-6 h-6 text-[#A855F7]" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold mb-1 transition-colors duration-500 ${
                          isActive ? 'text-[#A855F7]' : 'text-white'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-white/60 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Dot on Timeline */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-500 z-10 ${
                    isActive
                      ? 'bg-[#A855F7] shadow-[0_0_20px_rgba(71,189,121,0.8)] scale-125'
                      : 'bg-[#A855F7]/30'
                  }`} />

                  {/* Horizontal Connector Line */}
                  <div
                    className={`absolute top-1/2 w-[5%] h-0.5 transition-all duration-500 bg-gradient-to-r ${
                      isActive ? 'opacity-100' : 'opacity-30'
                    } ${isLeft ? 'left-[45%] from-transparent to-[#A855F7]/50' : 'right-[45%] from-[#A855F7]/50 to-transparent'}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical Timeline on Left */}
          <div className="md:hidden relative pl-8">
            {/* Left Glowing Line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#A855F7] via-[#A855F7]/50 to-[#A855F7]/20 rounded-full shadow-[0_0_10px_rgba(71,189,121,0.4)]" />

            {keyFeatures.map((feature, index) => {
              const isActive = visibleFeatures.has(index);
              return (
                <div key={index} ref={setFeatureRef(index)} className="relative mb-6 last:mb-0">
                  {/* Connector Dot */}
                  <div className={`absolute left-[-17px] top-6 w-3 h-3 rounded-full transition-all duration-500 ${
                    isActive
                      ? 'bg-[#A855F7] shadow-[0_0_15px_rgba(71,189,121,0.8)] scale-125'
                      : 'bg-[#A855F7]/30'
                  }`} />

                  {/* Card */}
                  <div className={`bg-gradient-to-br from-[#A855F7]/10 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-xl p-5 border transition-all duration-500 ${
                    isActive
                      ? 'border-[#A855F7]/60 shadow-[0_0_30px_rgba(71,189,121,0.3)]'
                      : 'border-[#A855F7]/10 opacity-50'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive ? 'scale-110 shadow-[0_0_15px_rgba(71,189,121,0.4)]' : ''
                      }`}>
                        <CheckCircleIcon className="w-5 h-5 text-[#A855F7]" />
                      </div>
                      <div>
                        <h3 className={`text-base font-bold mb-1 transition-colors duration-500 ${
                          isActive ? 'text-[#A855F7]' : 'text-white'
                        }`}>{feature.title}</h3>
                        <p className="text-white/60 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing - Enhanced Cards */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pricing (USD monthly)
            </h2>
            <p className="text-white/60 pt-4">
              Cancel or change plans anytime. Taxes may apply.
            </p>
          </div>

          <div className="grid max-w-5xl gap-6 md:grid-cols-3 mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl bg-white/5 backdrop-blur-xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-[#A855F7] shadow-[0_0_40px_rgba(71,189,121,0.25)]'
                    : 'border-white/10 hover:border-[#A855F7]/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-[#A855F7] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(71,189,121,0.5)]">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white pt-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline pt-4">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/60 pl-2">/month</span>
                </div>
                <p className="text-white/60 pt-2">
                  {plan.description}
                </p>
                <ul className="space-y-3 pt-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircleIcon
                        className="mr-3 h-5 w-5 shrink-0 text-[#A855F7]"
                      />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/apps/demo?app=omg-iq&plan=${plan.name.toLowerCase()}`}
                  className={`block w-full rounded-xl px-4 py-3 text-center font-semibold transition-all duration-300 mt-8 ${
                    plan.popular
                      ? 'bg-[#A855F7] text-white shadow-[0_0_20px_rgba(71,189,121,0.4)] hover:bg-[#9333EA] hover:shadow-[0_0_30px_rgba(71,189,121,0.5)]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations - Clean 3-Column Layout */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Integrations & delivery
            </h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Your digests flow through robust channels to reach you anywhere
            </p>
          </div>

          {/* Central OMGIQ Badge */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-[#A855F7]/50 to-purple-600/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#A855F7] to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(71,189,121,0.4)]">
                <span className="text-white font-bold text-xl">OMGIQ</span>
              </div>
            </div>
          </div>

          {/* Connecting Line */}
          <div className="hidden md:flex justify-center mb-6">
            <div className="w-px h-8 bg-gradient-to-b from-[#A855F7] to-[#A855F7]/20" />
          </div>

          {/* Three Integration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* AWS SNS */}
            <div className="group relative bg-gradient-to-b from-[#A855F7]/15 via-[#A855F7]/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-[#A855F7]/20 hover:border-[#A855F7]/50 hover:shadow-[0_0_40px_rgba(71,189,121,0.2)] transition-all duration-300">
              {/* Top connector dot (desktop) */}
              <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_rgba(71,189,121,0.8)]" />

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(71,189,121,0.4)] transition-all duration-300">
                  <DevicePhoneMobileIcon className="w-8 h-8 text-[#A855F7]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors">AWS SNS for SMS</h4>
                <p className="text-white/50 text-sm">Global reach with robust deliverability for SMS notifications worldwide</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="group relative bg-gradient-to-b from-[#A855F7]/15 via-[#A855F7]/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-[#A855F7]/20 hover:border-[#A855F7]/50 hover:shadow-[0_0_40px_rgba(71,189,121,0.2)] transition-all duration-300">
              {/* Top connector dot (desktop) */}
              <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_rgba(71,189,121,0.8)]" />

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(71,189,121,0.4)] transition-all duration-300">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#A855F7]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors">Amazon Pinpoint</h4>
                <p className="text-white/50 text-sm">Approved WhatsApp templates for compliant business messaging</p>
              </div>
            </div>

            {/* Your Branding */}
            <div className="group relative bg-gradient-to-b from-[#A855F7]/15 via-[#A855F7]/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-[#A855F7]/20 hover:border-[#A855F7]/50 hover:shadow-[0_0_40px_rgba(71,189,121,0.2)] transition-all duration-300">
              {/* Top connector dot (desktop) */}
              <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_rgba(71,189,121,0.8)]" />

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(71,189,121,0.4)] transition-all duration-300">
                  <PaintBrushIcon className="w-8 h-8 text-[#A855F7]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors">Your Branding</h4>
                <p className="text-white/50 text-sm">Your number and your name—clients see consistent branding</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Security & trust - Central Shield Hero + Badge Row */}
      <section className="py-16 sm:py-24 bg-slate-950 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-gradient-to-br from-[#A855F7]/15 via-purple-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Security & trust
            </h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Your data is protected with enterprise-grade security
            </p>
          </div>

          {/* Central Shield Hero */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Animated glow ring */}
              <div className="absolute inset-0 w-36 h-40 md:w-44 md:h-48 bg-gradient-to-br from-[#A855F7]/40 to-purple-600/25 rounded-3xl blur-xl animate-pulse" />

              {/* Shield container */}
              <div className="relative w-36 h-40 md:w-44 md:h-48 bg-gradient-to-br from-[#A855F7]/25 via-purple-600/15 to-slate-900/80 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center border-2 border-[#A855F7]/30 shadow-[0_0_60px_rgba(71,189,121,0.3)]">
                {/* 3D Spinning Shield Icon */}
                <div style={{ perspective: '500px' }} className="mb-2">
                  <CloudIcon
                    className="security-shield-spin w-16 h-16 md:w-20 md:h-20 text-[#A855F7]"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </div>
                <div className="text-center px-3">
                  <h3 className="text-lg md:text-xl font-bold text-white">Built on</h3>
                  <p className="text-[#A855F7] font-semibold">AWS</p>
                </div>
              </div>

              {/* 3D Spin Animation */}
              <style jsx>{`
                .security-shield-spin {
                  animation: spin3d-security 6s linear infinite;
                }
                @keyframes spin3d-security {
                  0% { transform: rotateY(0deg); }
                  100% { transform: rotateY(360deg); }
                }
              `}</style>
            </div>
          </div>

          {/* Security Badge Pills Row */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {securityTrust.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#A855F7]/10 to-purple-600/5 backdrop-blur-xl rounded-2xl border border-[#A855F7]/20 hover:border-[#A855F7]/50 hover:scale-105 hover:shadow-[0_0_25px_rgba(71,189,121,0.2)] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A855F7]/30 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(71,189,121,0.4)] transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-[#A855F7]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-[#A855F7] transition-colors">{item.title}</h4>
                    <p className="text-white/50 text-xs">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ - Accordion */}
      <section className="relative py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-[#A855F7]/8 via-purple-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-lg text-white/70 text-center mb-12">
            Everything you need to know about OMGIQ.
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#A855F7]/30"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      openFaqIndex === index ? 'bg-[#A855F7]' : 'bg-white/10'
                    }`}>
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      openFaqIndex === index ? 'text-[#A855F7]' : 'text-white'
                    }`}>
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? 'rotate-180 text-[#A855F7]' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-12 border-l-2 border-[#A855F7]/30">
                      <p className="text-white/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Gradient Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/20 via-purple-600/10 to-transparent" />
        <div className="absolute inset-0 bg-slate-950/50" />

        {/* Animated glow orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#A855F7]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

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
                className="w-full sm:w-auto rounded-xl bg-[#A855F7] px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(71,189,121,0.5)] hover:bg-[#9333EA] hover:shadow-[0_0_40px_rgba(71,189,121,0.6)] transition-all duration-300 hover:scale-105"
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
            <div className="pt-8">
              <Link
                href="/contact"
                className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
              >
                Talk to us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal note */}
      <section className="bg-slate-950 py-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-white/40">
            OMGIQ delivers summaries for information purposes only. Always verify
            critical decisions with official sources.
          </p>
        </div>
      </section>
    </main>
  );
}
