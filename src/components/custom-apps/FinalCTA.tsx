"use client";

import { useState } from "react";
import { SparklesIcon, ArrowRightIcon, CodeBracketIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function FinalCTA() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartNewApp = () => {
    setIsAnimating(true);
    // Add confetti or other animation effect
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/images/custom-apps/cta-pattern.svg')] bg-cover bg-center opacity-10"></div>
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
            Have your own idea in mind?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Start from scratch with our team and watch it become reality.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <button
            onClick={handleStartNewApp}
            className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              isAnimating ? 'animate-pulse' : ''
            }`}
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            ⚡ Start a New App
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <CodeBracketIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Custom Development</h3>
            <p className="text-gray-300 text-sm">Built specifically for your business needs and workflows</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <RocketLaunchIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-300 text-sm">From concept to launch in weeks, not months</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <SparklesIcon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ongoing Support</h3>
            <p className="text-gray-300 text-sm">Training, maintenance, and updates included</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-white/80">Custom Apps Built</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">2-4</div>
            <div className="text-white/80">Weeks to Launch</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-white/80">Client Satisfaction</div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            Ready to transform your business with a custom app? Let's discuss your vision.
          </p>
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
    </section>
  );
}
