"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    metric: "66%",
    label: "of companies deploying AI agents report measurable productivity gains",
    source: "PwC",
    color: "emerald"
  },
  {
    id: 2,
    metric: "79%",
    label: "of firms report adopting or planning widespread use of AI agents",
    source: "oneadvanced.com",
    color: "blue"
  },
  {
    id: 3,
    metric: "45%",
    label: "CAGR projected growth of the global AI agents market from 2025-2030",
    source: "warmly.ai",
    color: "purple"
  },
  {
    id: 4,
    metric: "15%",
    label: "of day-to-day decisions will be made autonomously by agent-powered systems by 2028",
    source: "gartner.com",
    color: "orange"
  }
];

const outcomes = [
  {
    id: 1,
    metric: "500+",
    label: "Agents Deployed",
    icon: UserGroupIcon,
    color: "emerald"
  },
  {
    id: 2,
    metric: "85%",
    label: "Time Savings Reported",
    icon: ClockIcon,
    color: "blue"
  },
  {
    id: 3,
    metric: "60%",
    label: "Cost Reduction",
    icon: CurrencyDollarIcon,
    color: "purple"
  },
  {
    id: 4,
    metric: "24/7",
    label: "Always-On Operations",
    icon: ChartBarIcon,
    color: "orange"
  }
];

const testimonials = [
  {
    id: 1,
    quote: "Thanks to our agent, we reclaimed 10+ hours every week.",
    author: "Sarah Chen",
    role: "Real Estate Manager",
    company: "Metro Properties"
  }
];

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600"
};

const bgColorClasses = {
  emerald: "bg-emerald-500/10 border-emerald-500/30",
  blue: "bg-blue-500/10 border-blue-500/30",
  purple: "bg-purple-500/10 border-purple-500/30",
  orange: "bg-orange-500/10 border-orange-500/30"
};

export default function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    productivity: 0,
    adoption: 0,
    growth: 0,
    decisions: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateStat = (target: number, key: keyof typeof animatedStats, duration: number) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      animateStat(66, 'productivity', 2000);
      animateStat(79, 'adoption', 2500);
      animateStat(45, 'growth', 3000);
      animateStat(15, 'decisions', 3500);
    }
  }, [isVisible]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="neural-nodes" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
                <path d="M2 2 L100 2 M2 2 L2 100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-nodes)" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Intelligent <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent italic">Outcomes</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
            The transition from traditional software to autonomous teammates is more than a trend—it's the new standard for operational excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => {
            return (
              <div
                key={stat.id}
                className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 hover:border-purple-500/40 transition-all duration-500 transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Neural Pulse Node */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-purple-500 group-hover:animate-ping" />

                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-400 transition-colors">
                    {stat.id === 1 && animatedStats.productivity > 0 ? `${animatedStats.productivity}%` : stat.metric}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
                    {stat.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold group-hover:text-purple-500/50 transition-colors">
                      {stat.source}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* These figures show it's not just hype */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">These figures show it's not just hype—AI agents are already delivering tangible value.</span>
          </div>
        </div>

        {/* Client Outcomes */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 shadow-2xl mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-white/5 pb-12">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Technical Authority</h3>
                <p className="text-white/50">Performance metrics from across our active agent network.</p>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-purple-400 fill-purple-400" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {outcomes.map((outcome, index) => {
                const Icon = outcome.icon;

                return (
                  <div
                    key={outcome.id}
                    className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    style={{ transitionDelay: `${(index + 4) * 150}ms` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClasses[outcome.color as keyof typeof colorClasses]} flex items-center justify-center p-2.5 shadow-lg shadow-purple-500/10`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className="text-white/30 font-bold text-lg tracking-tighter">0{index + 1}</div>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 tracking-tight transition-transform hover:scale-105 inline-block cursor-default">{outcome.metric}</div>
                    <div className="text-white/40 text-sm font-semibold uppercase tracking-widest">{outcome.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonials - Signature Row */}
        <div className="max-w-4xl mx-auto mb-24">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-white/10 overflow-hidden group transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />

              <div className="relative z-10 text-center">
                <blockquote className="text-2xl md:text-3xl text-white/90 mb-10 italic font-light leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white mb-1">{testimonial.author}</div>
                  <div className="text-purple-400 font-medium tracking-wide uppercase text-xs mb-4">
                    {testimonial.role} — {testimonial.company}
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-purple-500 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Footprint */}
        <div className="pt-24 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] mr-4">Proven Operations In:</span>
            {[
              "Property Management",
              "Real Estate Sales",
              "Field Contractors",
              "Clinical Healthcare",
              "Tax & Accounting",
              "Growth Agencies"
            ].map((industry, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold text-white/50 hover:text-purple-400 border border-white/10 transition-all duration-300 cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


