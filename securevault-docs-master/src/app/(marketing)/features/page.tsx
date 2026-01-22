'use client';

import React from "react";
import Link from "next/link";
import {
  Shield,
  Upload,
  ScanText,
  Link as LinkIcon,
  Users,
  Clock,
  FileCheck2,
  Fingerprint,
  Zap,
  Globe,
  Database,
  Lock
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="landing-bg min-h-screen relative">
      <div className="grain-overlay" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="badge-enhanced mb-6">
          <Zap className="w-4 h-4" />
          <span>Powerful Features</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-readable-light text-shadow-md mb-6">
          Everything you need to securely manage your documents.
        </h1>
        <p className="text-xl text-readable-muted text-shadow-sm">
          Enterprise-grade security meets consumer-grade simplicity. Built for modern businesses and professionals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {features.map((feature, idx) => (
          <div key={idx} className="glass-card-enhanced p-8 rounded-2xl hover:bg-white/5 transition duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
              <feature.icon className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-readable-light text-shadow-sm mb-3">{feature.title}</h3>
            <p className="text-slate-100 text-shadow-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Integrations Section */}
      <div className="glass-card-enhanced rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-readable-light text-shadow-md mb-4">Seamless Integrations</h2>
            <p className="text-readable-muted text-shadow-sm">Connect with the tools you already use.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {integrations.map((item, idx) => (
               <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                 <div className="p-2 rounded-lg bg-white/5 border border-white/20">
                   {item.icon}
                 </div>
                 <div>
                   <h4 className="font-semibold text-readable-light text-sm">{item.category}</h4>
                   <p className="text-xs text-slate-100 mt-1">{item.tools}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center glass-card-enhanced rounded-3xl p-12 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-readable-light text-shadow-md mb-6">Ready to get structured?</h2>
          <p className="text-readable-muted text-shadow-sm mb-8 max-w-xl mx-auto">Start your 6-day free trial today. No hidden fees, cancel anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-enhanced-primary">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="btn-enhanced-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Upload,
    title: "Secure Uploads",
    description: "Drag & drop or email-to-vault. Chunked uploads with auto-retries and instant antivirus scanning."
  },
  {
    icon: ScanText,
    title: "Smart OCR",
    description: "Automatically extract text from receipts and PDFs using AWS Textract for high-accuracy processing."
  },
  {
    icon: LinkIcon,
    title: "Controlled Sharing",
    description: "Share via secure links with PIN protection, expiry dates, and watermark viewing. Revoke access instantly."
  },
  {
    icon: Users,
    title: "Client Portals",
    description: "Give clients their own branded portal to upload, view, and track document requests effortlessly."
  },
  {
    icon: FileCheck2,
    title: "Checklists & Requests",
    description: "Create reusable document checklists and request files from clients with a single click."
  },
  {
    icon: Shield,
    title: "Defense-in-Depth",
    description: "WAF protection, detailed audit logs, and least-privilege IAM architecture for enterprise security."
  },
  {
    icon: Clock,
    title: "Usage Alerts",
    description: "Real-time notifications at 70%, 80%, 90% usage. Auto-scaling options available."
  },
  {
    icon: Fingerprint,
    title: "SSO & Auth",
    description: "Enterprise SSO (Google, Microsoft), MFA, and WebAuthn support for maximum account security."
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Documents served from edge locations for lightning-fast access anywhere in the world."
  }
];

const integrations = [
  {
    category: "Accounting",
    tools: "QuickBooks, Xero, Sage",
    icon: <Database className="w-5 h-5 text-blue-400" />
  },
  {
    category: "Cloud Storage",
    tools: "Google Drive, Dropbox, Box",
    icon: <Upload className="w-5 h-5 text-orange-400" />
  },
  {
    category: "Communication",
    tools: "Slack, Microsoft Teams",
    icon: <Users className="w-5 h-5 text-purple-400" />
  },
  {
    category: "eSignatures",
    tools: "DocuSign, Adobe Sign",
    icon: <FileCheck2 className="w-5 h-5 text-red-400" />
  },
  {
    category: "Automation",
    tools: "Zapier, Make, n8n",
    icon: <Zap className="w-5 h-5 text-yellow-400" />
  },
  {
    category: "Identity",
    tools: "Okta, Auth0, Google Workspace",
    icon: <Lock className="w-5 h-5 text-emerald-400" />
  }
];
