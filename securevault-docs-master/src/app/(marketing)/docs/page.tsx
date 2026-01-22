'use client';
import React from 'react';
import Link from 'next/link';

export default function DocsPage() {
    return (
        <div className="landing-bg min-h-screen relative">
            <div className="grain-overlay" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-readable-light text-shadow-md mb-6">Documentation</h1>
            <p className="text-lg text-readable-muted text-shadow-sm mb-12">
                Explore our guides, API references, and tutorials to get the most out of SecureVault Docs.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
                <Link href="#" className="glass-card-enhanced p-6 rounded-2xl hover:border-teal-500 transition group">
                    <h3 className="text-xl font-bold text-readable-light text-shadow-md mb-2 group-hover:text-teal-400">Getting Started &rarr;</h3>
                    <p className="text-slate-100 text-shadow-sm">Step-by-step guides to setting up your account and first vault.</p>
                </Link>
                <Link href="#" className="glass-card-enhanced p-6 rounded-2xl hover:border-teal-500 transition group">
                    <h3 className="text-xl font-bold text-readable-light text-shadow-md mb-2 group-hover:text-teal-400">API Reference &rarr;</h3>
                    <p className="text-slate-100 text-shadow-sm">Complete documentation for our REST API and SDKs.</p>
                </Link>
                <Link href="#" className="glass-card-enhanced p-6 rounded-2xl hover:border-teal-500 transition group">
                    <h3 className="text-xl font-bold text-readable-light text-shadow-md mb-2 group-hover:text-teal-400">Integrations &rarr;</h3>
                    <p className="text-slate-100 text-shadow-sm">Connect SecureVault with your favorite tools.</p>
                </Link>
                <Link href="#" className="glass-card-enhanced p-6 rounded-2xl hover:border-teal-500 transition group">
                    <h3 className="text-xl font-bold text-readable-light text-shadow-md mb-2 group-hover:text-teal-400">Security Whitepaper &rarr;</h3>
                    <p className="text-slate-100 text-shadow-sm">Deep dive into our architecture and security controls.</p>
                </Link>
            </div>
            </div>
        </div>
    )
}
