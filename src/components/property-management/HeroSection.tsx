"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTryDemo = () => {
    // Navigate to demo page with property management industry pre-selected
    window.location.href = "/try-live-demo?industry=property-management";
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Animated dashboard background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="propertyAnimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          {/* Property management specific animated elements */}
          <rect x="10" y="20" width="8" height="15" fill="rgba(255,255,255,0.15)">
            <animate attributeName="height" from="15" to="25" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="25" y="15" width="8" height="20" fill="rgba(255,255,255,0.1)">
            <animate attributeName="y" from="15" to="10" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="25" width="8" height="12" fill="rgba(255,255,255,0.08)">
            <animate attributeName="height" from="12" to="18" dur="5s" repeatCount="indefinite" />
          </rect>
          <circle cx="70" cy="30" r="3" fill="rgba(255,255,255,0.12)">
            <animate attributeName="cx" from="70" to="80" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-clamp-h1 font-extrabold tracking-tight leading-tight mb-4">
          Property Management & Operations Reimagined
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Automate owner statements, maintenance workflows, tenant communications, and billing — all in one unified platform.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={handleTryDemo}
          >
            Try a Live Property Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
