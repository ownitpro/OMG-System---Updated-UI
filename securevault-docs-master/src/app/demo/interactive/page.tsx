// src/app/demo/interactive/page.tsx
// Interactive demo page with dynamic preview

"use client";

import * as React from "react";
import Link from "next/link";
import { InteractivePreview } from "@/components/demo/InteractivePreview";

type PreviewType = 'upload' | 'share' | 'request' | 'ocr' | 'install' | 'pricing' | null;

function Step({ 
  title, 
  desc, 
  action, 
  previewType,
  isActive 
}: { 
  title: string; 
  desc: string; 
  action?: () => void;
  previewType: PreviewType;
  isActive: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 transition-all ${
      isActive
        ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-600/20'
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{desc}</p>
      {action && (
        <button
          onClick={action}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            isActive
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Simulate
        </button>
      )}
    </div>
  );
}

export default function InteractiveDemo() {
  const [activePreview, setActivePreview] = React.useState<PreviewType>(null);

  const steps = [
    {
      title: "Upload a document",
      desc: "Simulate a direct‑to‑vault upload with progress and auto-classification.",
      previewType: 'upload' as PreviewType,
    },
    {
      title: "Create a share link",
      desc: "Add PIN & expiry. Recipient sees a watermark viewer with secure access.",
      previewType: 'share' as PreviewType,
    },
    {
      title: "Request files",
      desc: "Send a request to a client; they upload into their portal automatically.",
      previewType: 'request' as PreviewType,
    },
    {
      title: "OCR preview",
      desc: "See text extraction & classification sample with confidence scores.",
      previewType: 'ocr' as PreviewType,
    },
    {
      title: "Install PWA",
      desc: "Guide to install on desktop or as PWA for offline access.",
      previewType: 'install' as PreviewType,
    },
    {
      title: "See pricing",
      desc: "View transparent pricing plans with all features included.",
      previewType: 'pricing' as PreviewType,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Marketing Header */}
      <header className="border-b border-gray-200 bg-white backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/demo" className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600">
              Try Demo
            </Link>
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-8 max-w-7xl">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Interactive Demo</h1>
          <p className="text-lg text-gray-600">Click each step to see SecureVault Docs in action—no account needed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Steps Column */}
          <div className="lg:col-span-1 space-y-4">
            {steps.map((step, i) => (
              <Step
                key={i}
                title={step.title}
                desc={step.desc}
                action={() => setActivePreview(step.previewType)}
                previewType={step.previewType}
                isActive={activePreview === step.previewType}
              />
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                {activePreview && (
                  <button
                    onClick={() => setActivePreview(null)}
                    className="text-xs text-gray-600 hover:text-gray-900 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="h-[600px]">
                <InteractivePreview type={activePreview} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

