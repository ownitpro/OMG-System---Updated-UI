"use client";

import { useState } from "react";
import { PlayIcon, SparklesIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('/images/custom-apps/hero-pattern.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-lg animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-emerald-500/20 rounded-lg animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Build Custom Apps Perfectly Tailored to Your Business
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Start with proven templates or a blank slate. Our team brings your ideas to life — in weeks, not months.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleVideoPlay}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                📱 View Example Apps
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-emerald-400/30 text-lg font-medium rounded-lg text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <SparklesIcon className="w-5 h-5 mr-2" />
                ⚡ Start a New App
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                <span className="text-sm">Weeks, not months</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm">Proven templates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span className="text-sm">Custom branding</span>
              </div>
            </div>
          </div>

          {/* Right Content - App Building Animation */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {!isVideoPlaying ? (
                  <div className="text-center text-white/80">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300" onClick={handleVideoPlay}>
                      <PlayIcon className="w-10 h-10" />
                    </div>
                    <p className="text-lg font-medium">Watch App Building Process</p>
                    <p className="text-sm">See how we build your custom app</p>
                  </div>
                ) : (
                  <div className="text-center text-white/80">
                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <CodeBracketIcon className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium">Building Your App...</p>
                    <p className="text-sm">Custom development in progress</p>
                  </div>
                )}
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-500/30 rounded-lg animate-bounce"></div>
                <div className="absolute top-8 right-6 w-6 h-6 bg-blue-500/30 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-6 left-8 w-4 h-4 bg-purple-500/30 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-500/20 rounded-lg animate-pulse delay-700"></div>
              </div>
            </div>

            {/* App Building Steps Indicator */}
            <div className="mt-6 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Design</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Build</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Launch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
