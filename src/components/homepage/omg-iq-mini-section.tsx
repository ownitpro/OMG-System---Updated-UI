"use client";

import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export function OMGIQMiniSection() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Animated Background Elements - Purple glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass Effect Container - Dark theme with purple accent */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#A855F7]/20 p-8 md:p-12" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.15)' }}>
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge - centered above icon */}
            <div className="mb-4 inline-flex items-center rounded-full bg-[#A855F7]/20 px-4 py-2 text-sm font-semibold text-[#A855F7] border border-[#A855F7]/30">
              <SparklesIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              New: OMGIQ
            </div>

            {/* Icon - on its own line, centered */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A855F7] to-[#8B5CF6] rounded-2xl shadow-lg shadow-[#A855F7]/30">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              OMG Space IQ (OMGIQ)
            </h2>
            <p className="text-2xl md:text-3xl text-[#A855F7] font-semibold mb-6">
              Your daily edge—delivered.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Pick your industries, choose SMS or WhatsApp, and get short, smart
              digests you can act on. No more tab overload. Just signal.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href="/apps/omg-iq"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#A855F7] text-white font-bold rounded-xl hover:bg-[#9333ea] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-lg shadow-[#A855F7]/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                Explore OMGIQ
                <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* How We Compare - Full width grid layout */}
          <div className="mt-12 rounded-2xl bg-[#A855F7]/10 p-6 md:p-8 border border-[#A855F7]/20">
            <h3 className="text-lg font-semibold text-white mb-6">
              How We Compare
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Email newsletters */}
              <div className="flex items-start p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/40 mr-3 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="font-semibold text-white mb-1">Email newsletters</p>
                  <p className="text-sm text-white/60">Long, slow, not tailored to your mix.</p>
                </div>
              </div>
              {/* Manual research */}
              <div className="flex items-start p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/40 mr-3 text-xl flex-shrink-0">•</span>
                <div>
                  <p className="font-semibold text-white mb-1">Manual research</p>
                  <p className="text-sm text-white/60">Accurate but eats your day.</p>
                </div>
              </div>
              {/* OMGIQ */}
              <div className="flex items-start p-4 rounded-xl bg-[#A855F7]/20 border border-[#A855F7]/30">
                <span className="text-[#A855F7] mr-3 text-xl font-bold flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-[#A855F7] mb-1">OMGIQ</p>
                  <p className="text-sm text-white/70">Short, relevant, delivered where you are.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

