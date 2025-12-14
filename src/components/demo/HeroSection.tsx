"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartDemo = () => {
    // Dispatch custom event to open modal
    window.dispatchEvent(new CustomEvent('openIndustryModal'));
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Animated dashboard background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-pulse"></div>
        {/* Dashboard mockup animation */}
        <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
            </linearGradient>
          </defs>
          {/* Animated dashboard elements */}
          <rect x="10" y="20" width="80" height="60" rx="4" fill="url(#dashboardGradient)" className="animate-pulse" />
          <rect x="15" y="25" width="20" height="15" rx="2" fill="rgba(16, 185, 129, 0.3)" className="animate-bounce" />
          <rect x="40" y="25" width="20" height="15" rx="2" fill="rgba(59, 130, 246, 0.3)" className="animate-bounce" style={{ animationDelay: '0.5s' }} />
          <rect x="65" y="25" width="20" height="15" rx="2" fill="rgba(99, 102, 241, 0.3)" className="animate-bounce" style={{ animationDelay: '1s' }} />
          <rect x="15" y="45" width="50" height="30" rx="2" fill="rgba(255, 255, 255, 0.1)" className="animate-pulse" />
          <rect x="70" y="45" width="15" height="30" rx="2" fill="rgba(16, 185, 129, 0.2)" className="animate-pulse" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-clamp-h1 font-extrabold tracking-tight leading-tight mb-6">
          See It In Action — Choose Your Industry. Start Your Demo.
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-200">
          Pick your vertical, launch an interactive walkthrough, and discover how OMGsystems transforms your business.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={handleStartDemo}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <PlayIcon className="mr-3 h-6 w-6" />
            Start Your Live Demo
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            No signup required
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            Fully interactive
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            Industry-specific
          </div>
        </div>
      </div>
    </section>
  );
}
