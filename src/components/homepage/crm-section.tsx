"use client";

import React from "react";
import { useInView } from "@/hooks/use-in-view";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export function CRMSection() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const features = [
    "Pipelines that make sense",
    "Roadmaps that guide your day",
    "Auto-tasks that keep you consistent",
    "AI that writes messages, reminders, and follow-ups",
    "And a clean design that won't overwhelm you",
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="crm" className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Modern Background Elements - Blue/Purple glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass Effect Container - Dark theme with blue accent */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#3B82F6]/20 p-8 md:p-12" style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)' }}>
          {/* Header */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ease-out ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-2xl mb-4 shadow-lg shadow-[#3B82F6]/30">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-bold text-[#3B82F6] uppercase tracking-widest mb-2">
              Introducing OMG CRM
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Business, Organized. Your Team, Aligned. Your Clients, Happy.
            </h2>
            <p className="text-2xl md:text-3xl text-[#3B82F6] font-semibold mb-6">
              A simple CRM that adapts to YOUR industry — not the other way around.
            </p>
            <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
              You shouldn't need a PhD to use a CRM. That's why we built OMG CRM. It's light, powerful, and built to feel like it belongs in your business from day one. Whether you're a contractor, realtor, accountant, coach, lawyer, or running an online store — the system adjusts to your world in seconds.
            </p>
          </div>

          {/* Features List */}
          <div className="mb-8 space-y-3">
            <p className="text-lg font-semibold text-white mb-4 text-center">
              You get:
            </p>
            <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start bg-[#3B82F6]/10 backdrop-blur-md rounded-lg p-4 border border-[#3B82F6]/20 hover:bg-[#3B82F6]/15 transition-all duration-400 ease-premium-out"
                >
                  <CheckCircleIcon className="w-6 h-6 text-[#3B82F6] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="/apps/crm"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#3B82F6] text-white font-bold rounded-xl hover:bg-[#2563eb] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-lg shadow-[#3B82F6]/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Learn About OMG CRM
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

