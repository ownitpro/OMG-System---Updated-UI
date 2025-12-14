"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTryDemo = () => {
    // Navigate to demo page with accounting industry pre-selected
    window.location.href = "/try-live-demo?industry=accounting";
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-blue-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Animated accounting workflow background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="accountingAnimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,197,94,0.1)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
            </linearGradient>
          </defs>
          {/* Animated accounting workflow: Intake → Docs → Billing */}
          <rect x="10" y="30" width="12" height="8" fill="rgba(34,197,94,0.3)" rx="2">
            <animate attributeName="x" from="10" to="40" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill" values="rgba(34,197,94,0.3);rgba(59,130,246,0.3);rgba(16,185,129,0.3)" dur="4s" repeatCount="indefinite" />
          </rect>
          <text x="12" y="35" fontSize="3" fill="white" opacity="0.8">Intake</text>
          
          <rect x="45" y="30" width="12" height="8" fill="rgba(59,130,246,0.3)" rx="2">
            <animate attributeName="x" from="45" to="75" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill" values="rgba(59,130,246,0.3);rgba(16,185,129,0.3);rgba(34,197,94,0.3)" dur="4s" repeatCount="indefinite" />
          </rect>
          <text x="47" y="35" fontSize="3" fill="white" opacity="0.8">Docs</text>
          
          <rect x="80" y="30" width="12" height="8" fill="rgba(16,185,129,0.3)" rx="2">
            <animate attributeName="opacity" from="0.3" to="1" dur="2s" repeatCount="indefinite" />
          </rect>
          <text x="82" y="35" fontSize="3" fill="white" opacity="0.8">Billing</text>
          
          {/* Connection arrows */}
          <path d="M22 34 L43 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            <animate attributeName="stroke-dasharray" values="0,20;20,0" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M57 34 L78 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            <animate attributeName="stroke-dasharray" values="0,20;20,0" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-clamp-h1 font-extrabold tracking-tight leading-tight mb-4">
          Financial Workflow Engine
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
          Automate 80% of your accounting firm's grind.
        </p>
        
        {/* Supporting bullets */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Canadian data residency
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            PHIPA/PIPEDA aligned
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Audit trail
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Role-based access
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            onClick={handleTryDemo}
          >
            Try a Live Accounting Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
