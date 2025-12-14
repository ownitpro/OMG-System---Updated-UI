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
    <section id="securevault-docs" className="relative py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 overflow-hidden">
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
            <div className="w-12 h-12 bg-emerald-200/30 rounded-lg backdrop-blur-sm flex items-center justify-center transform rotate-12">
              <DocumentTextIcon className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        ))}
        
        {/* Glowing Vault Icon in Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-lime-400 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass Effect Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl mb-4 shadow-lg">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              SecureVault Docs
            </h2>
            <p className="text-2xl md:text-3xl text-emerald-600 font-semibold mb-4">
              Capture once. Organize forever.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Give your team and clients one secure place to upload, find, and share documents.
            </p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto mt-2">
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
                  className="group inline-flex items-center px-4 py-2 bg-emerald-100/50 hover:bg-emerald-200/70 rounded-full border border-emerald-200 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-emerald-600 mr-2" />
                  <span className="text-sm font-medium text-emerald-900">{feature.label}</span>
                </div>
              );
            })}
          </div>

          {/* Two-Column Split */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* For Business */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <SparklesIcon className="w-5 h-5 text-blue-600 mr-2" />
                For Business
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Client portals, file requests, secure sharing, connectors (QBO, Xero, Google Drive, OneDrive, Dropbox, Box), 
                alerts, and usage visibility.
              </p>
            </div>

            {/* For Personal */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-purple-600 mr-2" />
                For Personal
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A private vault for IDs, receipts, and life records—with secure links when schools, banks, or landlords ask.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-500 font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try the Live Demo
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 border-2 border-gray-300 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
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













