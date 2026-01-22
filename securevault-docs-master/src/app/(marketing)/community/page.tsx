'use client';
import React from 'react';

export default function CommunityPage() {
    return (
        <div className="landing-bg min-h-screen relative">
            <div className="grain-overlay" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-readable-light text-shadow-md mb-6">Community</h1>
            <p className="text-lg text-readable-muted text-shadow-sm mb-12">
                Join our community of developers, security experts, and users.
            </p>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card-enhanced p-8 rounded-3xl hover:border-teal-500 transition cursor-pointer">
                    <h3 className="text-2xl font-bold text-readable-light text-shadow-md mb-4">Discord Server</h3>
                    <p className="text-slate-100 text-shadow-sm mb-6">Chat with the team, get live help, and meet other users.</p>
                    <button className="btn-enhanced-primary">Join Discord</button>
                </div>
                <div className="glass-card-enhanced p-8 rounded-3xl hover:border-teal-500 transition cursor-pointer">
                    <h3 className="text-2xl font-bold text-readable-light text-shadow-md mb-4">GitHub Discussions</h3>
                     <p className="text-slate-100 text-shadow-sm mb-6">Propose features, report bugs, and contribute to our open source SDKs.</p>
                    <button className="btn-enhanced-secondary">View on GitHub</button>
                </div>
            </div>
            </div>
        </div>
    )
}
