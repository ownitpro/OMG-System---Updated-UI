'use client';
import React from 'react';
import { Shield, Lock, Activity, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
    return (
        <div className="landing-bg min-h-screen relative">
            <div className="grain-overlay" />
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
             <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-readable-light text-shadow-md mb-6">
                  Enterprise-Grade Security
                </h1>
                <p className="text-xl text-readable-muted text-shadow-sm max-w-3xl mx-auto">
                  Security isn't just a feature; it's our foundation. We use bank-level encryption and rigorous protocols to protect your data.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <SecurityCard 
                    icon={<Lock />}
                    title="Encryption at Rest & Transit"
                    description="All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Your documents are secure from the moment they leave your device."
                  />
                  <SecurityCard 
                    icon={<Shield />}
                    title="SOC 2 Compliance"
                    description="We adhere to strict SOC 2 Type II standards, ensuring our controls and processes meet the highest industry benchmarks."
                  />
                  <SecurityCard 
                    icon={<Activity />}
                    title="Continuous Monitoring"
                    description="Our automated systems monitor for threats 24/7, with instant alerts and automated mitigation strategies."
                  />
                  <SecurityCard 
                    icon={<CheckCircle />}
                    title="Regular Audits"
                    description="We conduct regular third-party penetration testing and security audits to identify and resolve vulnerabilities."
                  />
              </div>

              <div className="glass-card-enhanced p-8 rounded-3xl border border-teal-500/30 bg-teal-900/10 text-center">
                  <h2 className="text-2xl font-bold text-readable-light text-shadow-md mb-4">Report a Vulnerability</h2>
                  <p className="text-readable-muted text-shadow-sm mb-6">
                      We value the security community. If you find a vulnerability, please report it to our security team.
                  </p>
                  <a href="mailto:security@securevaultdocs.com" className="btn-enhanced-primary">
                      Contact Security Team
                  </a>
              </div>
            </div>
        </div>
    )
}

function SecurityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="glass-card-enhanced p-8 rounded-2xl hover:bg-slate-800/50 transition">
            <div className="badge-enhanced w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-bold text-readable-light text-shadow-md mb-3">{title}</h3>
            <p className="text-slate-100 text-shadow-sm leading-relaxed">{description}</p>
        </div>
    )
}
