"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  LockClosedIcon,
  EyeIcon,
  ArrowRightIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export function SecureVaultDocsSection() {
  const [documentIcons, setDocumentIcons] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Create floating document icons
    const icons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setDocumentIcons(icons);
  }, []);

  const features = [
    { label: "PIN-Protected Links", icon: LockClosedIcon },
    { label: "Client Portals", icon: ShieldCheckIcon },
    { label: "Smart OCR", icon: DocumentTextIcon },
    { label: "Clear Audit Trails", icon: EyeIcon }
  ];

  return (
    <section id="securevault-docs" className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition - matches Strategy Session end and fades to black for CRM */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071510] via-black via-40% to-black" />

      {/* Animated Background - Floating Documents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {documentIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute animate-float-down"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              animationDelay: `${icon.delay}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div className="w-12 h-12 bg-[#47BD79]/20 rounded-lg backdrop-blur-sm flex items-center justify-center transform rotate-12 border border-[#47BD79]/30">
              <DocumentTextIcon className="w-6 h-6 text-[#47BD79]" />
            </div>
          </div>
        ))}

        {/* Glowing Vault Icon in Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Background glow orbs - positioned away from top edge for smooth blend */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass Effect Container - Dark Theme */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#47BD79]/20 p-8 md:p-12" style={{ boxShadow: '0 0 40px rgba(71, 189, 121, 0.15)' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-2xl mb-4 shadow-lg shadow-[#47BD79]/30">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              SecureVault Docs
            </h2>
            <p className="text-2xl md:text-3xl text-[#47BD79] font-semibold mb-4">
              Capture once. Organize forever.
            </p>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Give your team and clients one secure place to upload, find, and share documents.
            </p>
            <p className="text-base text-white/50 max-w-2xl mx-auto mt-2">
              PIN-protected links, client portals, smart OCR, and clear audit trails—without the chaos of email threads.
            </p>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group inline-flex items-center px-4 py-2 bg-[#47BD79]/10 hover:bg-[#47BD79]/20 rounded-full border border-[#47BD79]/30 transition-all duration-400 ease-premium-out hover:scale-105 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-[#47BD79] mr-2" />
                  <span className="text-sm font-medium text-white">{feature.label}</span>
                </div>
              );
            })}
          </div>

          {/* Two-Column Split */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* For Business */}
            <div className="bg-[#3B82F6]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#3B82F6]/30 hover:bg-[#3B82F6]/15 transition-all duration-400 ease-premium-out">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <SparklesIcon className="w-5 h-5 text-[#3B82F6] mr-2" />
                For Business
              </h3>
              <p className="text-white/70 leading-relaxed">
                Client portals, file requests, secure sharing, connectors (QBO, Xero, Google Drive, OneDrive, Dropbox, Box),
                alerts, and usage visibility.
              </p>
            </div>

            {/* For Personal */}
            <div className="bg-[#A855F7]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#A855F7]/30 hover:bg-[#A855F7]/15 transition-all duration-400 ease-premium-out">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-[#A855F7] mr-2" />
                For Personal
              </h3>
              <p className="text-white/70 leading-relaxed">
                A private vault for IDs, receipts, and life records—with secure links when schools, banks, or landlords ask.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white font-bold rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)]"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-[#47BD79]/50 font-bold rounded-xl hover:bg-white/20 hover:border-[#47BD79] transition-all duration-600 ease-premium-out transform hover:scale-105"
            >
              Try the Live Demo
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white/80 border-2 border-white/20 font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-400 ease-premium-out"
            >
              Learn More
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-down {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-down {
          animation: float-down linear infinite;
        }
      `}</style>
    </section>
  );
}













