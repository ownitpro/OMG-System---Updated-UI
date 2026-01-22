'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactSalesPage() {
  return (
    <div className="landing-bg min-h-screen relative">
      <div className="grain-overlay" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-readable-light text-shadow-md mb-4">Contact Sales</h1>
        <p className="text-lg text-readable-muted text-shadow-sm">
            Interested in our Enterprise plans? Let's talk about how SecureVault Docs can help your organization.
        </p>
      </div>

      <div className="glass-card-enhanced p-8 rounded-3xl">
        <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-readable-light text-shadow-sm mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white/15 transition backdrop-blur-sm" placeholder="Jane" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-readable-light text-shadow-sm mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white/15 transition backdrop-blur-sm" placeholder="Doe" />
                </div>
            </div>

            <div>
                 <label className="block text-sm font-medium text-readable-light text-shadow-sm mb-2">Work Email</label>
                 <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white/15 transition backdrop-blur-sm" placeholder="jane@company.com" />
            </div>

            <div>
                 <label className="block text-sm font-medium text-readable-light text-shadow-sm mb-2">Company Size</label>
                 <select className="form-select-enhanced w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-teal-500 focus:bg-white/15 transition backdrop-blur-sm">
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>500+ employees</option>
                 </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-readable-light text-shadow-sm mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white/15 transition backdrop-blur-sm" placeholder="Tell us about your needs..."></textarea>
            </div>

            <button type="submit" className="btn-enhanced-primary w-full py-4">
                Contact Sales Team
            </button>
        </form>
      </div>
      </div>
    </div>
  );
}
