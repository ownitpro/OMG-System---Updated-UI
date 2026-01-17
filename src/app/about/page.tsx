"use client";

import * as React from "react";
import Link from "next/link";
import {
  hero,
  tiles,
  process,
  stats,
  quotes,
  industries,
  team,
  security,
  faq,
  finalCta,
  analytics,
  schema,
} from "@/content/about";

export default function AboutPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(analytics.view));
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION - DNA Helix / Connections Animation
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-20 sm:pb-28">
        {/* SVG DNA/Connection Lines Animation */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="aboutLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="50%" stopColor="rgba(16, 185, 129, 0.4)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
            <linearGradient id="aboutLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0)" />
              <stop offset="50%" stopColor="rgba(52, 211, 153, 0.3)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
            </linearGradient>
          </defs>

          {/* Flowing curved paths */}
          <path
            d="M0,150 Q300,50 600,150 T1200,150"
            stroke="url(#aboutLineGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M0,300 Q400,200 800,300 T1200,300"
            stroke="url(#aboutLineGradient2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0,450 Q350,350 700,450 T1200,450"
            stroke="url(#aboutLineGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M0,600 Q500,500 900,600 T1200,600"
            stroke="url(#aboutLineGradient2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />

          {/* Animated dots traveling along paths */}
          <circle r="4" fill="#10B981">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M0,150 Q300,50 600,150 T1200,150"
            />
          </circle>
          <circle r="3" fill="#34D399" opacity="0.8">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              begin="2s"
              path="M0,300 Q400,200 800,300 T1200,300"
            />
          </circle>
          <circle r="3" fill="#6EE7B7" opacity="0.6">
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              begin="4s"
              path="M0,450 Q350,350 700,450 T1200,450"
            />
          </circle>
        </svg>

        {/* Floating Abstract Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Sparkle */}
          <div className="absolute top-[15%] left-[8%] text-emerald-400/20 float-about">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          {/* Lightning bolt */}
          <div className="absolute top-[25%] right-[10%] text-teal-400/15 float-about-delayed">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {/* Cube */}
          <div className="absolute bottom-[30%] left-[5%] text-emerald-500/15 float-about">
            <svg className="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
            </svg>
          </div>
          {/* Target */}
          <div className="absolute bottom-[25%] right-[8%] text-teal-400/20 float-about-delayed">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] emerald-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] emerald-glow-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] emerald-glow-float" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {hero.eyebrow}
          </span>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-4xl mx-auto mb-8 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {hero.primaryCta && (
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                {hero.primaryCta.label}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-emerald-500/50 transition-all backdrop-blur-xl"
              >
                {hero.secondaryCta.label}
              </Link>
            )}
          </div>

          {/* Trust badges */}
          {hero.badges && (
            <div className="flex flex-wrap justify-center gap-3">
              {hero.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-sm text-white/80"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHAT WE DO - Three Column Glassmorphism Cards
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {tiles.map((tile, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {tile.title}
                </h3>
                <p className="text-white/60 mb-6">{tile.body}</p>

                {tile.bullets && (
                  <ul className="space-y-3 mb-6">
                    {tile.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-center text-sm text-white/70">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mr-3">
                          <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={tile.href}
                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium group-hover:translate-x-1 transition-all"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          OUR APPROACH - Vertical Timeline
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {process.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {process.title}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {process.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-teal-500/30 to-emerald-500/50">
              {/* Animated particle */}
              <div className="absolute w-2 h-2 -left-[3px] bg-emerald-400 rounded-full timeline-particle-emerald" />
            </div>

            <div className="space-y-8">
              {process.steps.map((step, index) => (
                <div key={index} className="flex items-start group">
                  {/* Step number */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    {step.index}
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 group-hover:border-emerald-500/30 transition-all">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/60">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS - Gradient Banner
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="statsGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#statsGrid)" />
          </svg>
        </div>

        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform whitespace-nowrap">
                  {stat.value}
                </div>
                <div className="text-emerald-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
          {stats.footerNote && (
            <p className="text-center text-emerald-200/80 text-sm mt-10">{stats.footerNote}</p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHO WE SERVE - Industries Grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V9h2v8zm4 0h-2v-6h2v6zm-8 0H6v-4h2v4z" />
              </svg>
              Industries
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {industries.title}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {industries.subtitle}
            </p>
          </div>

          {/* Industries Grid - Modern Interactive Design */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {industries.items.map((industry, index) => (
              <Link
                key={index}
                href={industry.href}
                className="group relative block"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                    {industry.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-white/50 group-hover:text-emerald-400 transition-colors duration-300 transform group-hover:-rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <p className="text-lg text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                  {industry.blurb}
                </p>

                {/* Animated Gradient Line */}
                <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TEAM SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet the People Behind OMGsystems
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Building your automation solutions with care
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {team.members.map((member, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-emerald-400 font-medium mb-4">{member.role}</p>
                <p className="text-white/60 text-sm">{member.bio}</p>

                {member.social && (
                  <div className="mt-4 flex justify-center gap-3">
                    {member.social.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
                      >
                        <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Values */}
          {team.values && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-8">Our Values</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {team.values.map((value, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="w-8 h-8 mx-auto mb-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-medium text-white/90">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECURITY SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-10 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />

            <div className="relative z-10 text-center">
              {/* Shield icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Security & Privacy First
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                {security.copy}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {security.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-sm text-white/80"
                  >
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>

              {security.cta && (
                <Link
                  href={security.cta.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                >
                  {security.cta.label}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faq.items.map((item, index) => (
              <details
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden"
              >
                <summary className="cursor-pointer p-6 flex items-center justify-between font-semibold text-white text-lg">
                  <span>{item.q}</span>
                  <svg
                    className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/60">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="ctaGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#ctaGrid)" />
          </svg>
        </div>

        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {finalCta.title}
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            {finalCta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={finalCta.primaryCta.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg"
            >
              {finalCta.primaryCta.label}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {finalCta.secondaryCta && (
              <Link
                href={finalCta.secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                {finalCta.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faq) }} />
    </main>
  );
}
