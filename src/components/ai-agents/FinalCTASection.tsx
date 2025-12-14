"use client";

import { useState } from "react";
import { 
  RocketLaunchIcon, 
  SparklesIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function FinalCTASection() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCTAClick = () => {
    setIsAnimating(true);
    // Track CTA click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ai_agent_final_cta", {
        event_category: "AI Agents",
        event_label: "Ready to Transform Your Business",
      });
    }
    // Scroll to quote form
    setTimeout(() => {
      document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
      setIsAnimating(false);
    }, 1000);
  };

  const features = [
    "24/7 automated operations",
    "Custom AI integration",
    "Scalable & profitable growth",
    "Enterprise-grade security",
    "Lifetime support",
    "No long-term contracts"
  ];

  const stats = [
    { number: "500+", label: "Agents Deployed" },
    { number: "85%", label: "Time Savings" },
    { number: "60%", label: "Cost Reduction" },
    { number: "24/7", label: "Always-On" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/images/ai-agents/cta-pattern.svg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-emerald-500/20 rounded-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the AI revolution and let your digital teammate work while you sleep.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <button
            onClick={handleCTAClick}
            className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              isAnimating ? 'animate-pulse' : ''
            }`}
          >
            <RocketLaunchIcon className="w-5 h-5 mr-2" />
            Request Your Agent Now – Get the Founder's Offer
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white text-sm">{feature}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <span className="text-white text-sm">4.9/5 from 500+ customers</span>
            </div>
            <div className="flex items-center space-x-6 text-white/80 text-sm">
              <span>✅ Custom development</span>
              <span>✅ 24/7 support</span>
              <span>✅ No setup fees</span>
            </div>
          </div>
        </div>

        {/* Confetti Animation (when button is clicked) */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping absolute top-0 left-8 delay-100"></div>
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping absolute top-0 left-16 delay-200"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


