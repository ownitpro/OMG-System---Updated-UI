"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  SparklesIcon,
  LightBulbIcon,
  BoltIcon,
  ShieldCheckIcon,
  HeartIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  CubeTransparentIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const apps = [
  {
    name: "OMG-CRM",
    slug: "crm",
    tagline: "Customer Relationship Management",
    description: "Complete customer relationship management with intelligent automation, lead scoring, and workflow optimization.",
    features: ["Lead Management", "Pipeline Automation", "Contact Management", "Sales Analytics"],
    icon: ChartBarIcon,
    href: "/apps/crm",
    gradient: "from-sky-500 to-blue-600",
    bgGlow: "bg-sky-500/20",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-400",
    available: false,
  },
  {
    name: "SecureVault Docs",
    slug: "securevault-docs",
    tagline: "Secure Document Management",
    description: "Secure document management with automated workflows, e-signatures, and compliance tracking.",
    features: ["Document Storage", "E-Signatures", "Workflow Automation", "Compliance Tracking"],
    icon: DocumentTextIcon,
    href: "/apps/securevault-docs",
    gradient: "from-teal-500 to-emerald-600",
    bgGlow: "bg-teal-500/20",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-400",
    available: true,
  },
  {
    name: "OMG-Leads",
    slug: "omg-leads",
    tagline: "Lead Generation Engine",
    description: "Intelligent lead generation and nurturing with automated follow-ups and conversion optimization.",
    features: ["Lead Generation", "Automated Follow-ups", "Conversion Tracking", "ROI Analytics"],
    icon: UserGroupIcon,
    href: "/apps/omg-leads",
    gradient: "from-indigo-500 to-purple-600",
    bgGlow: "bg-indigo-500/20",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-400",
    available: false,
  },
  {
    name: "OMG AI Mastery",
    slug: "omg-ai-mastery",
    tagline: "AI-Powered Content Creation",
    description: "AI-powered content creation and management for marketing campaigns and customer communications.",
    features: ["AI Content Creation", "Campaign Management", "Template Library", "Performance Analytics"],
    icon: SparklesIcon,
    href: "/apps/omg-ai-mastery",
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    available: false,
  },
  {
    name: "OMG IQ",
    slug: "omg-iq",
    tagline: "Industry Intelligence",
    description: "Industry-specific intelligence and automation tailored for your business sector and compliance requirements.",
    features: ["Industry Insights", "Daily Digests", "SMS/Email Delivery", "Multi-Industry Coverage"],
    icon: LightBulbIcon,
    href: "/apps/omg-iq",
    gradient: "from-purple-500 to-fuchsia-600",
    bgGlow: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    available: false,
  },
];

const integrationFeatures = [
  {
    icon: BoltIcon,
    title: "Lightning Fast Setup",
    description: "Deploy in minutes with pre-built industry templates. No complex configuration required.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Security",
    description: "Bank-level encryption, SOC 2 compliance, and Canadian data residency for peace of mind.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: HeartIcon,
    title: "Loved by Teams",
    description: "Intuitive interfaces designed for real people. Your team will actually enjoy using it.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
  },
];

const stats = [
  { value: "5", label: "Powerful Apps", icon: CubeTransparentIcon },
  { value: "99.9%", label: "Uptime SLA", icon: ArrowTrendingUpIcon },
  { value: "24/7", label: "Support", icon: ClockIcon },
  { value: "∞", label: "Integrations", icon: BoltIcon },
];

function WaitingListForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    interestedApps: [] as string[],
    crmSystem: '',
    leadVolume: '',
    aiGoal: '',
    industryFocus: '',
    currentChallenges: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const availableApps = [
    { id: 'crm', name: 'OMG-CRM', color: 'text-sky-400', gradient: 'from-sky-500 to-blue-600' },
    { id: 'leads', name: 'OMG-Leads', color: 'text-indigo-400', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'ai-mastery', name: 'OMG AI Mastery', color: 'text-amber-400', gradient: 'from-amber-500 to-orange-600' },
    { id: 'omg-iq', name: 'OMG IQ', color: 'text-purple-400', gradient: 'from-purple-500 to-fuchsia-600' }
  ];

  const handleCheckboxChange = (appId: string) => {
    setFormData(prev => ({
      ...prev,
      interestedApps: prev.interestedApps.includes(appId)
        ? prev.interestedApps.filter(id => id !== appId)
        : [...prev.interestedApps, appId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare submission data with metadata
      const submissionData = {
        ...formData,
        source: 'apps-waiting-list',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_APPS_WAITING_LIST;

      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData)
            // Removed mode: 'no-cors' to test if body data is sent
          });
          console.log('Webhook sent successfully to:', webhookUrl);
          console.log('Submission data:', submissionData);
        } catch (error) {
          console.error('Webhook error (non-blocking):', error);
          // Don't throw - allow form submission to succeed
        }
      } else {
        console.warn('No webhook URL configured for apps waiting list');
      }

      setSubmitStatus('success');
      // Form stays in success state - no reset, one-time submission only
    } catch {
      setSubmitStatus('error');
      setIsSubmitting(false); // Only re-enable on error so user can retry
    }
  };

  return (
    <section id="waiting-list-form" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 p-[1px] rounded-3xl">
            <div className="absolute inset-[1px] bg-slate-900 rounded-[calc(1.5rem-1px)]" />
          </div>

          <div className="relative p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
                <RocketLaunchIcon className="w-4 h-4" />
                Early Access
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join the Waiting List
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Be the first to know when our upcoming apps launch. Tell us about your business needs and we&apos;ll notify you when the perfect solution is ready.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Company & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Interested Apps */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Which apps are you interested in? <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableApps.map(app => (
                    <label
                      key={app.id}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                        formData.interestedApps.includes(app.id)
                          ? 'bg-white/10 border-2 border-teal-500/50'
                          : 'bg-white/5 border border-white/10 hover:bg-white/[0.07]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interestedApps.includes(app.id)}
                        onChange={() => handleCheckboxChange(app.id)}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-0"
                      />
                      <span className={`ml-3 font-medium ${app.color}`}>{app.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* App-Specific Details */}
              {formData.interestedApps.length > 0 && (
                <div className="space-y-6 pt-4 pb-4 border-l-2 border-teal-500/30 pl-6 ml-1 animate-in fade-in slide-in-from-left-4 duration-500">
                  <p className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                    Personalizing Your Experience
                  </p>

                  {formData.interestedApps.includes('crm') && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <label htmlFor="crmSystem" className="block text-sm font-medium text-white/80 mb-2">
                        Which industry template fits your business? <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="crmSystem"
                        required={formData.interestedApps.includes('crm')}
                        value={formData.crmSystem}
                        onChange={(e) => setFormData(prev => ({ ...prev, crmSystem: e.target.value }))}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select your industry...</option>
                        <option value="real-estate" className="bg-slate-900">Real Estate</option>
                        <option value="property-management" className="bg-slate-900">Property Management</option>
                        <option value="accounting" className="bg-slate-900">Accounting & Tax</option>
                        <option value="contractors" className="bg-slate-900">Contractors</option>
                        <option value="consulting" className="bg-slate-900">Consulting</option>
                        <option value="creative-agency" className="bg-slate-900">Creative Agency</option>
                        <option value="other" className="bg-slate-900">Other</option>
                      </select>
                    </div>
                  )}

                  {formData.interestedApps.includes('leads') && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <label htmlFor="leadVolume" className="block text-sm font-medium text-white/80 mb-2">
                        Target Monthly Lead Volume <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="leadVolume"
                        required={formData.interestedApps.includes('leads')}
                        value={formData.leadVolume}
                        onChange={(e) => setFormData(prev => ({ ...prev, leadVolume: e.target.value }))}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select target volume...</option>
                        <option value="small" className="bg-slate-900">Under 50 leads / month</option>
                        <option value="medium" className="bg-slate-900">50 - 200 leads / month</option>
                        <option value="large" className="bg-slate-900">200 - 500 leads / month</option>
                        <option value="enterprise" className="bg-slate-900">500+ leads / month</option>
                      </select>
                    </div>
                  )}

                  {formData.interestedApps.includes('ai-mastery') && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <label htmlFor="aiGoal" className="block text-sm font-medium text-white/80 mb-2">
                        Primary AI Education Goal <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="aiGoal"
                        required={formData.interestedApps.includes('ai-mastery')}
                        value={formData.aiGoal}
                        onChange={(e) => setFormData(prev => ({ ...prev, aiGoal: e.target.value }))}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select your goal...</option>
                        <option value="individual" className="bg-slate-900">Personal Productivity (Solopreneur)</option>
                        <option value="team" className="bg-slate-900">Team Scaling (Agency/Business)</option>
                        <option value="build" className="bg-slate-900">Building Custom AI Tools</option>
                      </select>
                    </div>
                  )}

                  {formData.interestedApps.includes('omg-iq') && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <label htmlFor="industryFocus" className="block text-sm font-medium text-white/80 mb-2">
                        Primary Focus Industry <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="industryFocus"
                        required={formData.interestedApps.includes('omg-iq')}
                        value={formData.industryFocus}
                        onChange={(e) => setFormData(prev => ({ ...prev, industryFocus: e.target.value }))}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select your industry...</option>
                        <option value="real-estate" className="bg-slate-900">Real Estate</option>
                        <option value="accounting" className="bg-slate-900">Accounting</option>
                        <option value="property-management" className="bg-slate-900">Property Management</option>
                        <option value="contractors" className="bg-slate-900">Contractors / Home Services</option>
                        <option value="other" className="bg-slate-900">Other</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Current Challenges */}
              <div>
                <label htmlFor="challenges" className="block text-sm font-medium text-white/80 mb-2">
                  What are your biggest business challenges? <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="challenges"
                  required
                  rows={4}
                  value={formData.currentChallenges}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentChallenges: e.target.value }))}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
                  placeholder="Tell us about the challenges you're facing..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    submitStatus === 'success' ||
                    formData.interestedApps.length === 0 ||
                    (formData.interestedApps.includes('crm') && !formData.crmSystem) ||
                    (formData.interestedApps.includes('leads') && !formData.leadVolume) ||
                    (formData.interestedApps.includes('ai-mastery') && !formData.aiGoal) ||
                    (formData.interestedApps.includes('omg-iq') && !formData.industryFocus)
                  }
                  className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-teal-500 disabled:hover:to-cyan-500 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining Waiting List...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Submitted Successfully
                    </>
                  ) : (
                    <>
                      Join Waiting List
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-teal-500/20 border border-teal-500/50 rounded-xl flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-teal-400 flex-shrink-0" />
                    <p className="text-teal-400 font-medium">
                      Successfully joined! We&apos;ll notify you when your selected apps are ready.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                    <p className="text-red-400 text-center font-medium">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs text-white/40 text-center pt-2">
                By joining, you agree to receive updates about OMGsystems products. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppCard({ app, scrollToForm }: { app: typeof apps[0]; scrollToForm: () => void }) {
  const Icon = app.icon;

  return (
    <div className="group relative">
      {/* Card */}
      <div className={`relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border ${app.borderColor} hover:border-white/20 transition-all duration-500 overflow-hidden h-full flex flex-col`}>
        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 ${app.bgGlow} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none`} />

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          {app.available ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available Now
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/10">
              Coming Soon
            </span>
          )}
        </div>

        {/* Header Section */}
        <div className="relative p-8 pb-6">
          {/* Icon */}
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} p-[1px] mb-6`}>
            <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
              <Icon className={`w-8 h-8 ${app.textColor}`} />
            </div>
          </div>

          {/* App Name & Tagline */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-1">{app.name}</h3>
            <p className={`text-sm font-medium ${app.textColor}`}>{app.tagline}</p>
          </div>

          {/* Description */}
          <p className="text-white/60 leading-relaxed">
            {app.description}
          </p>
        </div>

        {/* Features Section */}
        <div className="px-8 pb-6 flex-grow">
          <div className="space-y-3">
            {app.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${app.gradient} flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 p-8 pt-0 space-y-3 mt-auto">
          <Link
            href={app.href}
            className={`flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl border ${app.borderColor} ${app.textColor} font-medium hover:bg-white/5 transition-all group/btn`}
          >
            Learn More
            <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {app.available ? (
            <a
              href="https://omgsystem.com/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r ${app.gradient} text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-${app.textColor.split('-')[1]}-500/25`}
            >
              <RocketLaunchIcon className="w-5 h-5" />
              Start Free Trial
            </a>
          ) : (
            <button
              onClick={scrollToForm}
              className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
            >
              Join Waiting List
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AppsPage() {
  const scrollToForm = () => {
    const formSection = document.getElementById('waiting-list-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-8">
                <CubeTransparentIcon className="w-4 h-4" />
                The Complete Business Suite
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                OMGsystems{' '}
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Apps
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed">
                Transform your business with our suite of intelligent automation apps.
                Built for modern businesses across all industries.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/25"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  Get Early Access
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/case-snapshots"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all"
                >
                  View Success Stories
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                      <Icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/50">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Apps Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Business Automation Suite
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Five powerful apps working together to automate your entire business workflow
              </p>
            </div>

            {/* First Row: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {apps.slice(0, 3).map((app) => (
                <AppCard key={app.slug} app={app} scrollToForm={scrollToForm} />
              ))}
            </div>

            {/* Second Row: 2 Cards Centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {apps.slice(3, 5).map((app) => (
                <AppCard key={app.slug} app={app} scrollToForm={scrollToForm} />
              ))}
            </div>
          </div>
        </section>

        {/* Integration Features */}
        <section className="py-24 relative">
          {/* Background Divider */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Seamless Integration
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                All apps work together seamlessly, sharing data and automating workflows across your entire business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {integrationFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`group text-center bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:${feature.borderColor} transition-all duration-300`}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-6 border ${feature.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
              <div className="relative px-8 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Automate Your Business?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Join the waitlist today and be the first to experience the future of business automation
                </p>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg shadow-black/20"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  Join Waiting List
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Waiting List Form */}
        <WaitingListForm />
      </div>
    </main>
  );
}
