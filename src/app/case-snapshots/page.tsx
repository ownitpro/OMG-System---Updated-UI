"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HomeModernIcon,
  CalculatorIcon,
  SparklesIcon,
  HeartIcon,
  Squares2X2Icon,
  ArrowTrendingUpIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SnapshotCard from '@/components/cases/SnapshotCard';
import { SNAPSHOTS } from './snapshots';

const snapshots = SNAPSHOTS;

// Industry data with icons and colors
const industries = [
  { id: 'all', label: 'All Industries', icon: Squares2X2Icon, color: 'from-white/20 to-white/10' },
  { id: 'property-management', label: 'Property Management', icon: BuildingOfficeIcon, color: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'contractors', label: 'Contractors', icon: WrenchScrewdriverIcon, color: 'from-orange-500/20 to-amber-500/20' },
  { id: 'real-estate', label: 'Real Estate', icon: HomeModernIcon, color: 'from-emerald-500/20 to-teal-500/20' },
  { id: 'accounting', label: 'Accounting', icon: CalculatorIcon, color: 'from-purple-500/20 to-violet-500/20' },
  { id: 'cleaning', label: 'Cleaning', icon: SparklesIcon, color: 'from-cyan-500/20 to-sky-500/20' },
  { id: 'healthcare', label: 'Healthcare', icon: HeartIcon, color: 'from-rose-500/20 to-pink-500/20' },
];

// Stats data
const stats = [
  { label: 'Case Studies', value: '6+', icon: ChartBarIcon },
  { label: 'Avg. Time Saved', value: '57%', icon: ClockIcon },
  { label: 'Client Satisfaction', value: '96%', icon: StarIcon },
  { label: 'Industries Served', value: '6', icon: UsersIcon },
];

// Animated counter component
function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <div className="text-xl font-black text-white">{value}</div>
        <div className="text-xs text-white/60">{label}</div>
      </div>
    </div>
  );
}

export default function CaseSnapshotsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  // Filter snapshots based on selected industry
  const filteredSnapshots = selectedIndustry === 'all'
    ? snapshots
    : snapshots.filter(snap =>
        snap.industry.toLowerCase().replace(/\s+/g, '-') === selectedIndustry
      );

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background with Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[250px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 sm:pt-40 pb-16 text-center text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-8 backdrop-blur-xl">
              <StarIcon className="w-4 h-4" />
              Real Results, Real Businesses
            </div>

            {/* Bold Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none">
              <span className="block text-white">Case</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Snapshots
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/70 font-medium leading-relaxed max-w-4xl mx-auto mb-10">
              Real results from real businesses. See how companies across industries
              <span className="text-emerald-400 font-semibold"> achieved remarkable growth</span> with OMGsystems.
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
              <div className="inline-flex items-center bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-2 divide-x divide-white/10">
                {stats.map((stat) => (
                  <AnimatedStat key={stat.label} {...stat} />
                ))}
              </div>
            </div>

            {/* Bold CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:-translate-y-1"
              >
                Get Your Free Demo
                <ArrowTrendingUpIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tools/roi-calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/[0.08] hover:border-emerald-500/50 transition-all"
              >
                <CalculatorIcon className="w-5 h-5 mr-2" />
                Calculate Your ROI
              </Link>
            </div>
          </div>
        </section>

        {/* Industry Filters Section */}
        <section className="py-8 border-y border-white/10 backdrop-blur-xl bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry) => {
                const Icon = industry.icon;
                const isSelected = selectedIndustry === industry.id;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                        : 'bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white/80 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-400 group-hover:text-emerald-300'}`} />
                    {industry.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results Count */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-sm">
                Showing <span className="text-emerald-400 font-semibold">{filteredSnapshots.length}</span> case {filteredSnapshots.length === 1 ? 'study' : 'studies'}
                {selectedIndustry !== 'all' && (
                  <span> in <span className="text-white/80">{industries.find(i => i.id === selectedIndustry)?.label}</span></span>
                )}
              </p>
              {selectedIndustry !== 'all' && (
                <button
                  onClick={() => setSelectedIndustry('all')}
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Snapshots Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredSnapshots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSnapshots.map((snap, index) => (
                  <div
                    key={snap.slug}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SnapshotCard
                      slug={snap.slug}
                      industry={snap.industry}
                      title={snap.title}
                      subtitle={snap.subtitle}
                      metricLabel={snap.metricLabel}
                      metricValue={snap.metricValue}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                  <Squares2X2Icon className="w-10 h-10 text-white/40" />
                </div>
                <p className="text-xl text-white/60 mb-2">No case studies found</p>
                <p className="text-white/40 mb-8">No case studies found for this industry yet.</p>
                <button
                  onClick={() => setSelectedIndustry('all')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg"
                >
                  View All Industries
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-4">"OMGsystems transformed our property management workflow. We went from chaos to complete control in just weeks."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">James Davidson</div>
                      <div className="text-white/50 text-xs">Property Manager</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-teal-500/20 to-transparent">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-4">"The ROI was immediate. We cut our quote turnaround from days to hours, and our close rate jumped 40%."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      MR
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Maria Rodriguez</div>
                      <div className="text-white/50 text-xs">Contractor</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-4">"Document collection used to be a nightmare. Now clients submit everything digitally, and tax season is actually manageable."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      SC
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Sarah Chen</div>
                      <div className="text-white/50 text-xs">CPA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Businesses Choose <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">OMGsystems</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Join thousands of businesses that have transformed their operations with our comprehensive platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Quick Setup', desc: 'Get started in minutes, not weeks' },
                { title: 'Industry-Specific', desc: 'Tailored solutions for your sector' },
                { title: '24/7 Support', desc: 'Expert help whenever you need it' },
                { title: 'Proven Results', desc: 'Average 50%+ efficiency gains' },
              ].map((feature, i) => (
                <div key={i} className="group bg-white/[0.03] backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/50 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500" />
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Write Your
              <span className="block">Success Story?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 font-medium mb-10 max-w-3xl mx-auto">
              Join the businesses that have transformed their operations with OMGsystems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-emerald-600 text-lg font-bold rounded-xl hover:bg-white/95 transition-all shadow-2xl hover:scale-105"
              >
                Start Your Free Demo
                <ArrowTrendingUpIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/40 text-white text-lg font-bold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all backdrop-blur-xl"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
