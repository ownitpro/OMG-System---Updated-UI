'use client';

import React from 'react';
import Link from 'next/link';
import { Apple, Smartphone } from 'lucide-react';

export default function DownloadPage() {
  return (
    <div className="landing-bg min-h-screen relative">
      <div className="grain-overlay" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 text-center">
       <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-readable-light text-shadow-md mb-6">
          SecureVault Everywhere
        </h1>
        <p className="text-xl text-readable-muted text-shadow-sm max-w-2xl mx-auto">
          Access your documents from any device. Securely scan, upload, and view files on the go.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* iOS */}
        <div className="glass-card-enhanced p-8 rounded-3xl flex flex-col items-center hover:bg-white/5 transition duration-300">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6">
                <Apple className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-readable-light text-shadow-md mb-2">iOS App</h2>
            <p className="text-slate-100 text-shadow-sm mb-8">For iPhone and iPad</p>
            <button className="mt-auto btn-enhanced-primary">
                Download on App Store
            </button>
        </div>

        {/* Android */}
        <div className="glass-card-enhanced p-8 rounded-3xl flex flex-col items-center hover:bg-white/5 transition duration-300">
            <div className="badge-enhanced w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-readable-light text-shadow-md mb-2">Android App</h2>
            <p className="text-slate-100 text-shadow-sm mb-8">For Android phones and tablets</p>
            <button className="mt-auto btn-enhanced-primary">
                Get it on Google Play
            </button>
        </div>
      </div>
        
      <div className="mt-16 glass-card-enhanced p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-readable-light text-shadow-md mb-4">Desktop App</h3>
        <p className="text-slate-100 text-shadow-sm mb-6">Prefer a native desktop experience? Download for macOS and Windows.</p>
        <div className="flex justify-center gap-4">
            <button className="btn-enhanced-secondary">macOS (Silicon)</button>
            <button className="btn-enhanced-secondary">macOS (Intel)</button>
            <button className="btn-enhanced-secondary">Windows</button>
        </div>
      </div>
      </div>
    </div>
  );
}
