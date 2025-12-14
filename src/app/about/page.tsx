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
  meta,
  schema,
} from "@/content/about";

export default function AboutPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(analytics.view));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              {hero.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {hero.primaryCta && (
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {hero.primaryCta.label}
              </Link>
            )}
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {hero.secondaryCta.label}
              </Link>
            )}
          </div>
          {hero.badges && (
            <div className="flex flex-wrap justify-center gap-3">
              {hero.badges.map((badge, index) => (
                <span key={index} className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What We Do - Tiles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {tiles.map((tile, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tile.title}</h3>
                <p className="text-gray-600 mb-4">{tile.body}</p>
                {tile.bullets && (
                  <ul className="space-y-2 mb-6">
                    {tile.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={tile.href}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">{process.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{process.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{process.subtitle}</p>
          </div>
          <div className="space-y-8">
            {process.steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  {step.index}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
          {stats.footerNote && (
            <p className="text-center text-blue-200 text-sm mt-8">{stats.footerNote}</p>
          )}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{industries.title}</h2>
            <p className="text-xl text-gray-600">{industries.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.items.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.title}</h3>
                <p className="text-gray-600 mb-4">{industry.blurb}</p>
                <Link
                  href={industry.href}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Meet the people building your automation solutions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.members.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
          {team.values && (
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {team.values.map((value, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Security */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Security & Privacy First</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">{security.copy}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {security.badges.map((badge, index) => (
              <span key={index} className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
                {badge}
              </span>
            ))}
          </div>
          {security.cta && (
            <Link
              href={security.cta.href}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {security.cta.label}
            </Link>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faq.items.map((item, index) => (
              <details key={index} className="bg-gray-50 rounded-lg p-6">
                <summary className="cursor-pointer font-semibold text-gray-900 text-lg mb-2">
                  {item.q}
                </summary>
                <p className="text-gray-600 mt-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{finalCta.title}</h2>
          <p className="text-xl text-blue-100 mb-8">{finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={finalCta.primaryCta.href}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {finalCta.primaryCta.label}
            </Link>
            {finalCta.secondaryCta && (
              <Link
                href={finalCta.secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {finalCta.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>
      </div>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faq) }} />
    </main>
  );
}
