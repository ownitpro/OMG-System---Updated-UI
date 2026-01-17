"use client";

import React from "react";
import Link from "next/link";
import {
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CommandLineIcon,
  CircleStackIcon,
  CpuChipIcon,
  PresentationChartLineIcon
} from "@heroicons/react/24/outline";
import { SolutionsLeadForm, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";

export default function SolutionsPage() {
  const industries = [
    { name: "Property Management", support: "24/7 technical oversight for maintenance & leasing flows." },
    { name: "Real Estate", support: "Live lead-routing support for zero-leakage pipeline management." },
    { name: "Contractors", support: "Back-office to field synchronization support." },
    { name: "Accounting", support: "Compliance-first data flow monitoring." },
    { name: "Healthcare", support: "HIPAA-aligned technical coordination." },
    { name: "Cleaning", support: "Dynamic scheduling & team growth support." }
  ];

  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-purple-500/30">
      {/* Background effects */}
      <div className="fixed inset-0 bg-slate-950" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 chess-grid translate-y-[-50%] opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-48 pb-24 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
              <SparklesIcon className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">The Blueprint for Modern Growth</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              Scale Your Operations <br className="hidden md:block" />
              With <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-violet-400 bg-clip-text text-transparent italic">Intelligent Systems</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-12">
              We don't just build tools; we architect the engines that drive revenue. Stop managing chaos and start leading systems designed to double your capacity.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:scale-105"
              >
                Start Your Strategy Session
                <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/try-live-demo"
                className="inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                Explore Live Demos
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Showcase Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Innovative Foundation</h2>
            <p className="text-xl text-white/50 max-w-2xl">A curated suite of enterprise-grade AI and automation tools tailored for your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
            {/* AI Agents - FEATURED (Large) */}
            <Link
              href="/solutions/ai-agents"
              className="md:col-span-8 md:row-span-2 group relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 hover:border-purple-500/40 transition-all duration-500"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    <SparklesIcon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Agents</h3>
                  <p className="text-lg md:text-xl text-white/50 max-w-md leading-relaxed">
                    Intelligent autonomous staff that work 24/7 to manage leads, support clients, and clear your inbox before you wake up.
                  </p>
                </div>
                <div className="flex gap-4">
                  {["NLP Driven", "Self-Learning", "24/7 Execution"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-medium tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Element - Node Pulse */}
              <div className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[80%] opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-full h-full border border-purple-500/30 rounded-full blueprint-pulse" />
                <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] border border-purple-500/20 rounded-full blueprint-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <CpuChipIcon className="w-32 h-32 text-purple-400" />
                </div>
              </div>
            </Link>

            {/* Content Engine - Mid */}
            <Link
              href="/solutions/content-engine"
              className="md:col-span-4 md:row-span-2 group relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:border-blue-500/40 transition-all duration-500"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-all">
                    <DocumentTextIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Content Engine</h3>
                  <p className="text-white/50 leading-relaxed">
                    Scale your voice without scaling your effort. Full-funnel content creation that sounds like you and sells for you.
                  </p>
                </div>

                {/* Simulated Timeline Visual */}
                <div className="space-y-3 opacity-40 group-hover:opacity-60 transition-opacity">
                  <div className="h-2 w-full bg-blue-500/20 rounded-full" />
                  <div className="h-2 w-[80%] bg-blue-500/20 rounded-full" />
                  <div className="h-2 w-[90%] bg-blue-500/20 rounded-full" />
                </div>
              </div>
            </Link>

            {/* Custom Apps - Mid */}
            <Link
              href="/solutions/custom-apps"
              className="md:col-span-6 md:row-span-2 group relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:border-violet-500/40 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:-translate-y-1 transition-all">
                  <CommandLineIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Custom Applications</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                  Proprietary software tailored to your specific competitive advantage. Don't use what your competitors use.
                </p>
              </div>

              {/* Component Library Visual Overlay */}
              <div className="absolute right-0 bottom-0 p-8 flex gap-3 pointer-events-none">
                <div className="w-16 h-24 bg-white/5 border border-white/10 rounded-xl animate-float" />
                <div className="w-16 h-20 bg-purple-500/20 border border-purple-500/30 rounded-xl animate-float-delayed mt-4" />
                <div className="w-16 h-24 bg-white/5 border border-white/10 rounded-xl animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </Link>

            {/* Smart Automations - Small */}
            <Link
              href="/automation/smart-automations"
              className="md:col-span-6 md:row-span-1 group bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:border-emerald-500/40 transition-all duration-500 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                <RocketLaunchIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Smart Automations</h3>
                <p className="text-white/50 text-sm">Precision workflows that kill repetitive tasks.</p>
              </div>
              <ArrowRightIcon className="w-6 h-6 text-white/20 ml-auto group-hover:text-emerald-400 group-hover:translate-x-2 transition-all" />
            </Link>

            {/* Analytics - Small */}
            <Link
              href="/solutions/analytics"
              className="md:col-span-6 md:row-span-1 group bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:border-orange-500/40 transition-all duration-500 flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                <PresentationChartLineIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Analytics & Reporting</h3>
                <p className="text-white/50 text-sm">Real-time clarity on every business metric.</p>
              </div>
              <ArrowRightIcon className="w-6 h-6 text-white/20 ml-auto group-hover:text-orange-400 group-hover:translate-x-2 transition-all" />
            </Link>
          </div>
        </section>

        {/* Industries Section with Support Statements */}
        <section className="py-32 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Industries We <span className="text-purple-500">Scale</span></h2>
              <p className="text-xl text-white/40 max-w-2xl mx-auto">We don't just speak your language; we build the systems that give you the unfair advantage in your market.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <Link
                  key={index}
                  href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Decorative faint glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{industry.name}</h3>

                  {/* Support Statement - Premium Highlight */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/40" />
                    <p className="text-white/70 text-sm leading-relaxed italic">
                      "{industry.support}"
                    </p>
                  </div>

                  <div className="flex items-center text-purple-400 font-bold group-hover:gap-2 transition-all">
                    <span>View Industrial Roadmap</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <div id="lead-form" className="py-24 bg-slate-950">
          <SolutionsLeadForm />
        </div>

        {/* Sticky Button (Desktop) */}
        <StickyGetStartedButton variant="solutions" />

        {/* Mobile Drawer */}
        <MobileFormDrawer variant="solutions" />
      </div>

      <style jsx>{`
        .chess-grid {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 80px 80px;
        }
      `}</style>
    </main>
  );
}
