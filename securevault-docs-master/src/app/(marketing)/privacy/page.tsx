'use client';
import React from 'react';

export default function PrivacyPage() {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="January 20, 2026">
            <p>At SecureVault Docs, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
            
            <h3>1. Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, upload documents, or contact support.</p>
            
            <h3>2. How We Use Your Information</h3>
            <p>We use your information to provide, maintain, and improve our services, including processing transactions and sending related information.</p>
            
            <h3>3. Data Security</h3>
            <p>We implement industry-standard security measures, including encryption at rest and in transit, to protect your data.</p>
        </LegalLayout>
    )
}

function LegalLayout({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: React.ReactNode }) {
    return (
        <div className="landing-bg min-h-screen relative">
            <div className="grain-overlay" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
                <div className="glass-card-enhanced p-8 rounded-3xl">
                    <div className="mb-12 border-b border-white/20 pb-8">
                        <h1 className="text-4xl font-bold text-readable-light text-shadow-md mb-4">{title}</h1>
                        <p className="text-readable-muted text-shadow-sm">Last updated: {lastUpdated}</p>
                    </div>
                    <div className="prose prose-invert prose-lg text-slate-100 max-w-none">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
