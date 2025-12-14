"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleDemoClick = () => {
    router.push("/try-live-demo?product=securevault-docs");
  };

  const handleContactSales = () => {
    router.push("/contact");
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-blue-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="securevaultAnimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,197,94,0.1)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
            </linearGradient>
          </defs>
          
          {/* Upload to Filing Flow */}
          <rect x="5" y="30" width="12" height="8" fill="rgba(34,197,94,0.3)" rx="2">
            <animate attributeName="x" from="5" to="25" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill" values="rgba(34,197,94,0.3);rgba(59,130,246,0.3);rgba(16,185,129,0.3)" dur="4s" repeatCount="indefinite" />
          </rect>
          <text x="7" y="35" fontSize="2.5" fill="white" opacity="0.8">Upload</text>
          
          <rect x="30" y="30" width="12" height="8" fill="rgba(59,130,246,0.3)" rx="2">
            <animate attributeName="x" from="30" to="50" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill" values="rgba(59,130,246,0.3);rgba(16,185,129,0.3);rgba(34,197,94,0.3)" dur="4s" repeatCount="indefinite" />
          </rect>
          <text x="32" y="35" fontSize="2.5" fill="white" opacity="0.8">Filing</text>
          
          <rect x="55" y="30" width="12" height="8" fill="rgba(16,185,129,0.3)" rx="2">
            <animate attributeName="x" from="55" to="75" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill" values="rgba(16,185,129,0.3);rgba(34,197,94,0.3);rgba(59,130,246,0.3)" dur="4s" repeatCount="indefinite" />
          </rect>
          <text x="57" y="35" fontSize="2.5" fill="white" opacity="0.8">Audit</text>
          
          {/* Connection Lines */}
          <path d="M17 34 L28 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M42 34 L53 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-clamp-h1 font-extrabold tracking-tight leading-tight mb-4">
          SecureVault Docs – Bank-Level Document Vault for Business
        </h1>
        
        <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
          Store, automate & audit your documents effortlessly—built for busy professionals.
        </p>

        {/* Supporting Bullets */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Audit-Ready Filing
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Encrypted in Canada
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Automated Document Workflows
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            One Login for Everything
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Real-Time Analytics
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleDemoClick}
            className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Try SecureVault Docs Demo
          </button>
          
          <button
            onClick={handleContactSales}
            className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 border border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full transition-all duration-300 ease-in-out"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
