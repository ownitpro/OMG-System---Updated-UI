'use client';
import React from 'react';

export default function TermsPage() {
    return (
        <div className="landing-bg min-h-screen relative">
            <div className="grain-overlay" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
                <div className="glass-card-enhanced p-8 rounded-3xl">
                    <div className="mb-12 border-b border-white/20 pb-8">
                        <h1 className="text-4xl font-bold text-readable-light text-shadow-md mb-4">Terms of Service</h1>
                        <p className="text-readable-muted text-shadow-sm">Last updated: January 20, 2026</p>
                    </div>
                    <div className="prose prose-invert prose-lg text-slate-100 max-w-none">
                        <p>Please read these Terms of Service carefully before using SecureVault Docs.</p>

                        <h3>1. Acceptance of Terms</h3>
                        <p>By accessing or using our service, you agree to be bound by these terms.</p>

                        <h3>2. Account Responsibilities</h3>
                        <p>You are responsible for safeguarding your account credentials and for all activities that occur under your account.</p>

                        <h3>3. Service Availability</h3>
                        <p>We strive to maintain 99.9% uptime but do not guarantee uninterrupted access to the service.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
