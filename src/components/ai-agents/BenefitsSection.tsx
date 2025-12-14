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
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Business Teams Are Turning to AI Agents
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The Results Are In:
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const isHovered = false;
            
            return (
              <div
                key={stat.id}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Stat Content */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {stat.id === 1 && animatedStats.productivity > 0 ? `${animatedStats.productivity}%` : stat.metric}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    {stat.label}
                  </p>
                  <div className="text-xs text-gray-400">
                    Source: {stat.source}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
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
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Client Outcomes / Social Proof</h3>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              
              return (
                <div
                  key={outcome.id}
                  className={`text-center ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 4) * 200}ms` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClasses[outcome.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{outcome.metric}</div>
                  <div className="text-gray-300 text-sm">{outcome.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 8) * 200}ms` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <blockquote className="text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-white font-semibold">{testimonial.author}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
                <div className="text-emerald-400 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted by Businesses */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-6">Trusted by Businesses Across Industries</h3>
          <div className="flex flex-wrap justify-center gap-4 text-white/60">
            {[
              "Property Management",
              "Real Estate", 
              "Contractors",
              "Healthcare",
              "Accounting",
              "Cleaning Services"
            ].map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10"
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


