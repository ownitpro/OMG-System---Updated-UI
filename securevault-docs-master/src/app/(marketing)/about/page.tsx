'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="landing-bg min-h-screen relative">
      <div className="grain-overlay" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-readable-light text-shadow-md mb-6">
          About SecureVault Docs
        </h1>
        <p className="text-xl text-readable-muted text-shadow-sm">
          We're on a mission to make document management secure, intelligent, and effortless for everyone.
        </p>
      </div>

      <div className="glass-card-enhanced p-8 md:p-12 rounded-3xl mb-12">
        <h2 className="text-2xl font-bold text-readable-light text-shadow-md mb-4">Our Story</h2>
        <div className="prose prose-invert prose-lg text-slate-100 text-shadow-sm">
          <p>
            SecureVault Docs started with a simple problem: managing sensitive documents securely was too complicated.
            Existing solutions were either insecure, overly complex enterprise tools, or fragmented across multiple apps.
          </p>
          <p>
            We realized that individuals and businesses needed a "Digital Safety Deposit Box" that wasn't just secure storage,
            but an intelligent system that helped organize, process, and share information safely.
          </p>
          <p>
            Today, thousands of users trust SecureVault Docs to protect their most critical information, from personal identification
            documents to sensitive business contracts.
          </p>
        </div>
      </div>

       <div className="grid md:grid-cols-3 gap-6 mb-16">
          <StatCard number="10k+" label="Active Users" />
          <StatCard number="5M+" label="Documents Secured" />
          <StatCard number="99.9%" label="Uptime Reliability" />
       </div>

      <div className="text-center">
         <h2 className="text-2xl font-bold text-readable-light text-shadow-md mb-8">Join the Team</h2>
         <p className="text-readable-muted text-shadow-sm mb-8">
            We're always looking for talented individuals to help us build the future of secure document management.
         </p>
         <Link href="/contact-sales" className="btn-enhanced-secondary">
            Contact Us
         </Link>
      </div>
      </div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="glass-card-enhanced p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-teal-400 text-shadow-md mb-2">{number}</div>
            <div className="text-sm text-slate-100 text-shadow-sm uppercase tracking-wide">{label}</div>
        </div>
    )
}
