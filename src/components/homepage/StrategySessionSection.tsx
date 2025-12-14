"use client";

import { useState, useEffect } from "react";
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

export default function StrategySessionSection() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-24 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white overflow-hidden">
      {/* Modern Background Elements - Performance optimized */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>
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
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500/30 to-indigo-500/30 border-2 border-purple-400/50 backdrop-blur-sm">
              <UserIcon className="w-5 h-5 text-purple-200" />
              <span className="text-base font-bold text-white">
                One-on-One Strategy Session
              </span>
            </div>
          </div>

          {/* Eyebrow Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm">
              <SparklesIcon className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-semibold text-purple-200 uppercase tracking-wide">
                AI-Powered Strategy • Systems • Automation
              </span>
            </div>
          </div>

          {/* Headline - Full Width, Horizontal */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight max-w-5xl mx-auto">
              Turn Chaos into a{" "}
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
                Clear AI Game Plan
              </span>
            </h2>
          </div>

          {/* Body Copy - Full Width, Horizontal */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed">
              You've got big goals, but your systems, tools, and workflows aren't moving fast enough.
            </p>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              In one focused <strong className="text-white">2-hour one-on-one session</strong> with the OMG Systems team, we audit your business, find the real bottlenecks, and map out a simple AI + automation roadmap you can start using right away.
            </p>
          </div>

          {/* 3 Quick Bullets - Horizontal Grid */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-10">
            <div className="flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-white font-medium text-lg">Find out what's actually slowing your business down</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-white font-medium text-lg">Discover which AI + automation tools fit your workflow</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <RocketLaunchIcon className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-white font-medium text-lg">Leave with a clear, step-by-step action plan</p>
            </div>
          </div>

          {/* Price Badge - Centered, Prominent */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-500/20 to-lime-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-emerald-400/30">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-sm text-emerald-200 mb-2">Limited Time Offer</p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl font-bold text-white">$999</span>
                    <span className="text-2xl text-slate-400 line-through">$3,000</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20"></div>
                <div className="flex items-center gap-2 text-emerald-200">
                  <ClockIcon className="w-6 h-6" />
                  <div>
                    <p className="text-sm font-medium">2-Hour</p>
                    <p className="text-xs text-emerald-300">One-on-One Session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs - Centered */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/solutions/strategy-session"
              className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 text-lg"
            >
              Book My Strategy Session
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/solutions/strategy-session"
              className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40 text-lg"
            >
              Learn More About What's Included
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Bottom Section: Strategy Session Dashboard - Full Width, Wider */}
        <div 
          className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl opacity-20 blur-xl"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <LightBulbIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Your Strategy Session Experience</h3>
                </div>
                <p className="text-lg text-slate-400">What you'll get in your 2-hour one-on-one session</p>
              </div>

              {/* Content Grid - Wider Layout */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left: Key Metrics */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4">Session Overview</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-5 border border-purple-400/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ClockIcon className="w-5 h-5 text-purple-300" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Duration</span>
                      </div>
                      <div className="text-3xl font-bold text-white">2hr</div>
                      <div className="text-xs text-slate-400 mt-1">One-on-One</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-xl p-5 border border-emerald-400/20">
                      <div className="flex items-center gap-2 mb-2">
                        <SparklesIcon className="w-5 h-5 text-emerald-300" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Custom</span>
                      </div>
                      <div className="text-3xl font-bold text-white">100%</div>
                      <div className="text-xs text-slate-400 mt-1">Tailored</div>
                    </div>
                  </div>
                </div>

                {/* Right: Process Steps */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4">What We'll Cover</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-400/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">Business Audit</p>
                        <p className="text-sm text-slate-400">Complete systems analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg p-4 border border-blue-400/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">Bottleneck Analysis</p>
                        <p className="text-sm text-slate-400">Identify root causes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg p-4 border border-emerald-400/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-lg">AI Roadmap</p>
                        <p className="text-sm text-slate-400">Step-by-step action plan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Price Badge - Full Width */}
              <div className="bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl p-6 text-center shadow-lg">
                <p className="text-sm text-emerald-900 font-semibold mb-2 uppercase tracking-wide">Limited Time Offer</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl font-bold text-emerald-900">$999</span>
                  <span className="text-xl text-emerald-800 line-through">$3,000</span>
                </div>
                <p className="text-sm text-emerald-800 mt-2">Regularly $3,000 — Book now to save $2,001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
