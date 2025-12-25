"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  LightBulbIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ClockIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

// 3D Tilt Hook
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition({ x: 50, y: 50 });
  };

  return { ref, transform, glowPosition, handleMouseMove, handleMouseLeave };
}

export default function StrategySessionSection() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const tilt = useTilt();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 bg-black text-white overflow-hidden">
      {/* Smooth gradient transition from black to emerald-tinted background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#051008] via-30% to-[#071510]" />

      {/* Modern Background Elements - Emerald theme */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#47BD79]/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Full Width Content */}
        <div 
          className={`space-y-8 mb-12 transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* One-on-One Session Badge - Prominent at Top */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#47BD79]/20 border-2 border-[#47BD79]/50 backdrop-blur-sm">
              <UserIcon className="w-5 h-5 text-[#47BD79]" />
              <span className="text-base font-bold text-white">
                One-on-One Strategy Session
              </span>
            </div>
          </div>

          {/* Eyebrow Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 backdrop-blur-sm">
              <SparklesIcon className="w-4 h-4 text-[#47BD79]" />
              <span className="text-sm font-semibold text-[#47BD79] uppercase tracking-wide">
                AI-Powered Strategy • Systems • Automation
              </span>
            </div>
          </div>

          {/* Headline - Full Width, Horizontal */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight max-w-5xl mx-auto">
              Turn Chaos into a{" "}
              <span className="bg-gradient-to-r from-[#47BD79] via-[#5fd492] to-[#47BD79] bg-clip-text text-transparent">
                Clear AI Game Plan
              </span>
            </h2>
          </div>

          {/* Body Copy - Full Width, Horizontal */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              You've got big goals, but your systems, tools, and workflows aren't moving fast enough.
            </p>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              In one focused <strong className="text-white">2-hour one-on-one session</strong> with the OMG Systems team, we audit your business, find the real bottlenecks, and map out a simple AI + automation roadmap you can start using right away.
            </p>
          </div>

          {/* 3 Quick Bullets - Horizontal Grid */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-10">
            <div className="flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-[#47BD79]/20 hover:bg-white/10 hover:border-[#47BD79]/40 transition-all duration-600 ease-premium-out">
              <div className="w-14 h-14 bg-[#47BD79]/20 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-8 h-8 text-[#47BD79]" />
              </div>
              <p className="text-white font-medium text-lg">Find out what's actually slowing your business down</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-[#47BD79]/20 hover:bg-white/10 hover:border-[#47BD79]/40 transition-all duration-600 ease-premium-out">
              <div className="w-14 h-14 bg-[#47BD79]/20 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-[#47BD79]" />
              </div>
              <p className="text-white font-medium text-lg">Discover which AI + automation tools fit your workflow</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-[#47BD79]/20 hover:bg-white/10 hover:border-[#47BD79]/40 transition-all duration-600 ease-premium-out">
              <div className="w-14 h-14 bg-[#47BD79]/20 rounded-xl flex items-center justify-center">
                <RocketLaunchIcon className="w-8 h-8 text-[#47BD79]" />
              </div>
              <p className="text-white font-medium text-lg">Leave with a clear, step-by-step action plan</p>
            </div>
          </div>

          {/* Price Badge - Centered, Prominent */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#47BD79]/15 backdrop-blur-md rounded-2xl p-6 border-2 border-[#47BD79]/30">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-sm text-[#47BD79] mb-2">Limited Time Offer</p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl font-bold text-white">$999</span>
                    <span className="text-2xl text-white/40 line-through">$3,000</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20"></div>
                <div className="flex items-center gap-2 text-[#47BD79]">
                  <ClockIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm font-medium text-white">2-Hour</p>
                    <p className="text-xs text-[#47BD79]">One-on-One Session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs - Centered */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/solutions/strategy-session"
              className="group inline-flex items-center justify-center px-10 py-5 bg-[#47BD79] text-white font-bold rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#47BD79]/50 text-lg"
            >
              Book My Strategy Session
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/solutions/strategy-session"
              className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-600 ease-premium-out border-2 border-white/20 hover:border-[#47BD79]/50 text-lg"
            >
              Learn More About What's Included
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Bottom Section: Strategy Session Dashboard - Full Width, Wider with 3D Tilt */}
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div
            ref={tilt.ref}
            onMouseMove={tilt.handleMouseMove}
            onMouseLeave={tilt.handleMouseLeave}
            className="relative bg-black/60 backdrop-blur-xl rounded-3xl border border-[#47BD79]/20 p-8 md:p-12 shadow-2xl overflow-hidden group"
            style={{
              transform: tilt.transform,
              transition: 'transform 0.1s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dynamic glow effect that follows cursor */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${tilt.glowPosition.x}% ${tilt.glowPosition.y}%, rgba(71, 189, 121, 0.3) 0%, transparent 50%)`,
              }}
            />
            {/* Static Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#47BD79] to-[#3da86a] rounded-3xl opacity-20 blur-xl"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-xl flex items-center justify-center">
                    <LightBulbIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Your Strategy Session Experience</h3>
                </div>
                <p className="text-lg text-white/60">What you'll get in your 2-hour one-on-one session</p>
              </div>

              {/* Content Grid - Wider Layout */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left: Key Metrics */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4">Session Overview</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#47BD79]/10 rounded-xl p-5 border border-[#47BD79]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ClockIcon className="w-5 h-5 text-[#47BD79]" />
                        <span className="text-xs text-white/50 uppercase tracking-wide">Duration</span>
                      </div>
                      <div className="text-3xl font-bold text-white">2hr</div>
                      <div className="text-xs text-white/50 mt-1">One-on-One</div>
                    </div>
                    <div className="bg-[#47BD79]/10 rounded-xl p-5 border border-[#47BD79]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <SparklesIcon className="w-5 h-5 text-[#47BD79]" />
                        <span className="text-xs text-white/50 uppercase tracking-wide">Custom</span>
                      </div>
                      <div className="text-3xl font-bold text-white">100%</div>
                      <div className="text-xs text-white/50 mt-1">Tailored</div>
                    </div>
                  </div>
                </div>

                {/* Right: Process Steps */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4">What We'll Cover</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-[#47BD79]/10 rounded-lg p-4 border border-[#47BD79]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">Business Audit</p>
                        <p className="text-sm text-white/50">Complete systems analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#47BD79]/10 rounded-lg p-4 border border-[#47BD79]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">Bottleneck Analysis</p>
                        <p className="text-sm text-white/50">Identify root causes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#47BD79]/10 rounded-lg p-4 border border-[#47BD79]/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">AI Roadmap</p>
                        <p className="text-sm text-white/50">Step-by-step action plan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Price Badge - Full Width */}
              <div className="bg-gradient-to-r from-[#47BD79] to-[#3da86a] rounded-xl p-6 text-center shadow-lg shadow-[#47BD79]/30">
                <p className="text-sm text-white/80 font-semibold mb-2 uppercase tracking-wide">Limited Time Offer</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl font-bold text-white">$999</span>
                  <span className="text-xl text-white/60 line-through">$3,000</span>
                </div>
                <p className="text-sm text-white/80 mt-2">Regularly $3,000 — Book now to save $2,001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
