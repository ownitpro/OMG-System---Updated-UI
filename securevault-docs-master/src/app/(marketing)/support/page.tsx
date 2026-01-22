'use client';
import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
    return (
        <div className="landing-bg min-h-screen relative">
            <div className="grain-overlay" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-readable-light text-shadow-md mb-6">Help & Support</h1>
             <p className="text-lg text-readable-muted text-shadow-sm mb-12">
                We're here to help. Search common questions or contact our team.
            </p>

            <div className="glass-card-enhanced p-8 rounded-2xl mb-12">
                 <input type="text" placeholder="Search for help..." className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white/15 text-lg transition backdrop-blur-sm" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card-enhanced p-6 rounded-2xl">
                    <h3 className="font-bold text-readable-light text-shadow-md mb-2">Account & Billing</h3>
                    <p className="text-sm text-slate-100 text-shadow-sm">Manage subscription and billing details.</p>
                </div>
                 <div className="glass-card-enhanced p-6 rounded-2xl">
                    <h3 className="font-bold text-readable-light text-shadow-md mb-2">Security & Access</h3>
                    <p className="text-sm text-slate-100 text-shadow-sm">2FA, password reset, and access controls.</p>
                </div>
                 <div className="glass-card-enhanced p-6 rounded-2xl">
                    <h3 className="font-bold text-readable-light text-shadow-md mb-2">Troubleshooting</h3>
                    <p className="text-sm text-slate-100 text-shadow-sm">Common fixes and error messages.</p>
                </div>
            </div>

             <div className="mt-16">
                <p className="text-slate-100 text-shadow-sm mb-4">Can't find what you need?</p>
                <Link href="/contact-sales" className="text-teal-400 hover:text-teal-300 font-semibold text-shadow-sm">Contact Support Team &rarr;</Link>
            </div>
            </div>
        </div>
    )
}
