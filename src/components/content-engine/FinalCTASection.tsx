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
    // Add confetti or other animation effect
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const features = [
    "AI-powered content generation",
    "Multi-format support",
    "Industry-specific templates",
    "Performance analytics",
    "Team collaboration",
    "Brand consistency"
  ];

  const stats = [
    { number: "10,000+", label: "Businesses" },
    { number: "1M+", label: "Content Pieces Created" },
    { number: "95%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/images/content-engine/cta-pattern.svg')] bg-cover bg-center opacity-10"></div>
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
            Start Creating Amazing Content—Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses using Content Engine to achieve better content, faster.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCTAClick}
              className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                isAnimating ? 'animate-pulse' : ''
              }`}
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              🚀 Try the Free Demo
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-emerald-400/30 text-lg font-medium rounded-lg text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <SparklesIcon className="w-5 h-5 mr-2" />
              🤝 Speak with a Content Expert
            </button>
          </div>
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
              <span className="text-white text-sm">4.9/5 from 10,000+ customers</span>
            </div>
            <div className="flex items-center space-x-6 text-white/80 text-sm">
              <span>✅ Free trial</span>
              <span>✅ No setup fees</span>
              <span>✅ Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/careers" className="hover:text-white transition-colors">Careers</a>
            <a href="/press" className="hover:text-white transition-colors">Press</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          </div>
          
          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://linkedin.com/company/omgsystems" className="text-white/60 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com/omgsystems" className="text-white/60 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
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
