"use client";

import React from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  ArrowTrendingUpIcon,
  CursorArrowRaysIcon,
  BoltIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { SolutionsLeadForm, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";

export default function AnalyticsPage() {
  const features = [
    {
      icon: PresentationChartLineIcon,
      title: "Real-time Dashboards",
      description: "Monitor your business metrics in real-time with customizable dashboards that update automatically."
    },
    {
      icon: ChartPieIcon,
      title: "Custom Reports",
      description: "Generate detailed reports tailored to your specific business needs with drag-and-drop simplicity."
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Performance Metrics",
      description: "Track KPIs, revenue trends, and operational efficiency with automated data collection and analysis."
    },
    {
      icon: CursorArrowRaysIcon,
      title: "Data Visualization",
      description: "Transform complex data into easy-to-understand charts, graphs, and visual representations."
    },
    {
      icon: BoltIcon,
      title: "Automated Insights",
      description: "AI-powered analytics that automatically identify trends, anomalies, and opportunities."
    },
    {
      icon: ClockIcon,
      title: "Historical Analysis",
      description: "Compare performance over time with historical data tracking and trend analysis."
    }
  ];

  const useCases = [
    {
      industry: "Property Management",
      metrics: ["Occupancy Rates", "Maintenance Response Times", "Rent Collection Efficiency"],
      icon: "🏢"
    },
    {
      industry: "Real Estate",
      metrics: ["Lead Conversion Rates", "Sales Pipeline Velocity", "Market Trends"],
      icon: "🏠"
    },
    {
      industry: "Contractors",
      metrics: ["Project Profitability", "Resource Utilization", "Job Completion Time"],
      icon: "🔨"
    },
    {
      industry: "Accounting",
      metrics: ["Client Retention", "Billable Hours", "Revenue per Client"],
      icon: "📊"
    }
  ];

  const benefits = [
    {
      stat: "10x Faster",
      description: "Generate reports in minutes instead of hours"
    },
    {
      stat: "99.9% Accuracy",
      description: "Eliminate manual data entry errors"
    },
    {
      stat: "24/7 Monitoring",
      description: "Always-on data collection and analysis"
    },
    {
      stat: "100% Customizable",
      description: "Tailor dashboards to your exact needs"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans">

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 chess-grid opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-50" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-in shadow-2xl">
                <ChartBarIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Crystal Intelligence</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 leading-[1.05] tracking-tighter">
                Turn Data Into <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent italic">Crystal Clarity</span>
              </h1>

              <p className="text-xl text-white/50 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                Experience high-fidelity business intelligence. We transform your raw operational data into precision-engineered visual insights that power faster, smarter growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-105"
                >
                  Start Scaling Now
                  <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
                >
                  Request Technical Demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 chess-grid opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powerful Analytics Features
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Everything you need to understand and optimize your business performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-white/40 font-medium leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Stats */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="text-7xl md:text-8xl font-thin tracking-tighter text-cyan-400/20 group-hover:text-cyan-400 transition-colors duration-700 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    {benefit.stat.split(' ')[0]}
                    <span className="text-3xl ml-1 opacity-50">{benefit.stat.split(' ')[1] || ''}</span>
                  </div>
                  <div className="h-px w-12 bg-cyan-500/30 mb-6 group-hover:w-full transition-all duration-700" />
                  <p className="text-lg font-bold text-white mb-2">{benefit.description.split(' ').slice(0, 2).join(' ')}</p>
                  <p className="text-sm text-white/40 font-medium">{benefit.description.split(' ').slice(2).join(' ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Use Cases */}
        <section className="py-24 md:py-32 relative overflow-hidden bg-slate-900/20 backdrop-blur-3xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Industry <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent italic">Verticals</span>
              </h2>
              <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
                Precision intelligence mapped to your specific operational landscape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="group bg-slate-950 border border-white/5 rounded-[2.5rem] p-10 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-6">
                      <div className="text-5xl p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">{useCase.icon}</div>
                      <div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">{useCase.industry}</h3>
                        <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mt-1">Live Feed Active</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {useCase.metrics.map((metric, mIndex) => (
                      <div key={mIndex} className="flex items-center text-white/40 font-bold text-sm bg-white/5 px-6 py-4 rounded-2xl group-hover:bg-white/10 transition-colors">
                        <CheckCircleIcon className="w-5 h-5 text-cyan-500 mr-4 flex-shrink-0" />
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-3xl mb-10">
              <ChartBarIcon className="w-12 h-12 text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter">
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent italic">Scale Smarter?</span>
            </h2>
            <p className="text-xl text-white/40 mb-12 font-medium leading-relaxed">
              Get started with powerful analytics and reporting today. No credit card required for the trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/case-snapshots"
                className="inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                View Success Stories
              </Link>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <SolutionsLeadForm />

        {/* Sticky Button (Desktop) */}
        <StickyGetStartedButton variant="solutions" />

        {/* Mobile Drawer */}
        <MobileFormDrawer variant="solutions" />
      </div>
    </div>
  );
}
