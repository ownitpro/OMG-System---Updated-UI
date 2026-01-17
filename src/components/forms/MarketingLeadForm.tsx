"use client";

import React, { useState } from 'react';
import {
  CheckCircleIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

const serviceOptions = [
  { id: 'ads-management', name: 'Ads Management', color: 'text-sky-400', icon: MegaphoneIcon },
  { id: 'branding-creative', name: 'Branding & Creative', color: 'text-purple-400', icon: PaintBrushIcon },
  { id: 'content-development', name: 'Content Development', color: 'text-amber-400', icon: PencilSquareIcon },
];

const budgetOptions = [
  { id: 'under-1k', label: 'Under $1,000/month' },
  { id: '1k-5k', label: '$1,000 - $5,000/month' },
  { id: '5k-10k', label: '$5,000 - $10,000/month' },
  { id: 'over-10k', label: '$10,000+/month' },
];

interface MarketingFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  services: string[];
  budget: string;
  goals: string;
  ads_platforms: string[];
  ads_roas: string;
  branding_scope: string[];
  branding_vibe: string;
  content_types: string[];
  content_frequency: string;
}

export default function MarketingLeadForm() {
  const [formData, setFormData] = useState<MarketingFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    services: [] as string[],
    budget: '',
    goals: '',
    // Dynamic Fields
    ads_platforms: [] as string[],
    ads_roas: '',
    branding_scope: [] as string[],
    branding_vibe: '',
    content_types: [] as string[],
    content_frequency: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCheckboxChange = (serviceId: string) => {
    setFormData((prev: MarketingFormData) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleMultiSelect = (field: keyof MarketingFormData, value: string) => {
    setFormData((prev: MarketingFormData) => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const getFormTheme = () => {
    if (formData.services.length === 0) return {
      from: 'from-blue-500/10',
      to: 'to-indigo-500/10',
      border: 'border-blue-500/20',
      shadow: 'shadow-blue-500/10',
      ring: 'focus:ring-blue-500',
      accent: 'blue'
    };

    const lastSelectedId = formData.services[formData.services.length - 1];
    switch (lastSelectedId) {
      case 'ads-management':
        return {
          from: 'from-sky-500/10',
          to: 'to-blue-500/10',
          border: 'border-sky-500/20',
          shadow: 'shadow-sky-500/10',
          ring: 'focus:ring-sky-500',
          accent: 'sky'
        };
      case 'branding-creative':
        return {
          from: 'from-purple-500/10',
          to: 'to-violet-500/10',
          border: 'border-purple-500/20',
          shadow: 'shadow-purple-500/10',
          ring: 'focus:ring-purple-500',
          accent: 'purple'
        };
      case 'content-development':
        return {
          from: 'from-amber-500/10',
          to: 'to-orange-500/10',
          border: 'border-amber-500/20',
          shadow: 'shadow-amber-500/10',
          ring: 'focus:ring-amber-500',
          accent: 'amber'
        };
      default:
        return {
          from: 'from-blue-500/10',
          to: 'to-indigo-500/10',
          border: 'border-blue-500/20',
          shadow: 'shadow-blue-500/10',
          ring: 'focus:ring-blue-500',
          accent: 'blue'
        };
    }
  };

  const theme = getFormTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare submission data with metadata
      const submissionData = {
        ...formData,
        source: 'marketing-services',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_MARKETING;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Marketing webhook sent to:', webhookUrl);
      }

      setSubmitStatus('success');
      // Form stays in success state - no reset, one-time submission only
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false); // Only re-enable on error so user can retry
    }
  };

  return (
    <section id="lead-form" className="py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-br ${theme.from} ${theme.to} backdrop-blur-xl rounded-2xl p-8 md:p-12 border ${theme.border} shadow-2xl ${theme.shadow} transition-all duration-500`}>
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Grow Your Business
            </h2>
            <p className="text-lg text-white/70">
              Let's discuss how our marketing services can help you reach your goals.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marketing-fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="marketing-fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, fullName: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="marketing-email" className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="marketing-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marketing-company" className="block text-sm font-medium text-white mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="marketing-company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, company: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label htmlFor="marketing-phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="marketing-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Services Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Services Interested In <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {serviceOptions.map(service => {
                  const isSelected = formData.services.includes(service.id);
                  const sColor = service.id === 'ads-management' ? 'sky' :
                    service.id === 'branding-creative' ? 'purple' : 'amber';
                  return (
                    <label
                      key={service.id}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${isSelected
                        ? `bg-${sColor}-500/10 border-${sColor}-500/50 shadow-lg shadow-${sColor}-500/10`
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(service.id)}
                        className={`w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-2 focus:ring-${sColor}-500 focus:ring-offset-0 text-${sColor}-500`}
                      />
                      <service.icon className={`w-5 h-5 ml-3 mr-2 ${isSelected ? `text-${sColor}-400` : 'text-white/40'}`} />
                      <span className={`font-medium ${isSelected ? `text-${sColor}-400` : 'text-white'}`}>{service.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Service Fields */}
            <div className="space-y-6">
              {/* Ads Management Fields */}
              {formData.services.includes('ads-management') && (
                <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-sky-400 font-bold mb-4 flex items-center">
                    <MegaphoneIcon className="w-5 h-5 mr-2" />
                    Ad Strategy Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Which platforms are you interested in?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Meta', 'Google', 'LinkedIn', 'TikTok'].map(platform => (
                          <button
                            key={platform}
                            type="button"
                            onClick={() => handleMultiSelect('ads_platforms', platform)}
                            className={`px-3 py-2 rounded-lg text-xs border transition-all ${formData.ads_platforms.includes(platform)
                              ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                          >
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ads_roas" className="block text-sm font-medium text-white mb-2">Target Monthly ROAS Goal? (e.g. 3x, 5x, 10x)</label>
                      <input
                        type="text"
                        id="ads_roas"
                        value={formData.ads_roas}
                        onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, ads_roas: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        placeholder="What is your return goal?"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Fields */}
              {formData.services.includes('branding-creative') && (
                <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-purple-400 font-bold mb-4 flex items-center">
                    <PaintBrushIcon className="w-5 h-5 mr-2" />
                    Branding & Design Scope
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">What do you need help with?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['New Brand Identity', 'Rebrand', 'Style Guide', 'Visual Assets'].map(scope => (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => handleMultiSelect('branding_scope', scope)}
                            className={`text-left px-4 py-2 rounded-lg text-sm border transition-all ${formData.branding_scope.includes(scope)
                              ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                          >
                            {scope}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="branding_vibe" className="block text-sm font-medium text-white mb-2">Brand vibe? (e.g. Minimalist, Bold, Corporate, Playful)</label>
                      <input
                        type="text"
                        id="branding_vibe"
                        value={formData.branding_vibe}
                        onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, branding_vibe: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="Describe your brand's personality..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Content Fields */}
              {formData.services.includes('content-development') && (
                <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-amber-400 font-bold mb-4 flex items-center">
                    <PencilSquareIcon className="w-5 h-5 mr-2" />
                    Content Needs
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Content types required?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Social Media', 'Blog Posts', 'Email Newsletters', 'Video Scripts'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleMultiSelect('content_types', type)}
                            className={`px-3 py-2 rounded-lg text-xs border transition-all ${formData.content_types.includes(type)
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="content_frequency" className="block text-sm font-medium text-white mb-2">Desired posting frequency?</label>
                      <input
                        type="text"
                        id="content_frequency"
                        value={formData.content_frequency}
                        onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, content_frequency: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        placeholder="e.g. 3x/week, Daily, Bi-weekly..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Budget Dropdown */}
            <div>
              <label htmlFor="marketing-budget" className="block text-sm font-medium text-white mb-2">
                Current Marketing Budget <span className="text-red-400">*</span>
              </label>
              <select
                id="marketing-budget"
                required
                value={formData.budget}
                onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, budget: e.target.value }))}
                className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all appearance-none cursor-pointer`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="" className="bg-slate-900">Select your budget...</option>
                {budgetOptions.map(option => (
                  <option key={option.id} value={option.id} className="bg-slate-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Goals */}
            <div>
              <label htmlFor="marketing-goals" className="block text-sm font-medium text-white mb-2">
                What are your marketing goals?
              </label>
              <textarea
                id="marketing-goals"
                rows={4}
                value={formData.goals}
                onChange={(e) => setFormData((prev: MarketingFormData) => ({ ...prev, goals: e.target.value }))}
                className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all resize-none`}
                placeholder="Tell us about your marketing goals and what you're hoping to achieve..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success' || formData.services.length === 0 || !formData.budget}
                className={`w-full px-8 py-4 bg-gradient-to-r from-${theme.accent}-600 to-${theme.accent}-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-${theme.accent}-500/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 ${theme.ring} focus:ring-offset-2 focus:ring-offset-slate-900`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Submitted Successfully
                  </span>
                ) : (
                  'Get Started'
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className={`mt-4 p-4 bg-${theme.accent}-500/20 border border-${theme.accent}-500/50 rounded-xl transition-all duration-300`}>
                  <p className={`text-${theme.accent}-400 text-center font-medium flex items-center justify-center`}>
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Thank you! Our marketing team will be in touch soon.
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

            {/* Privacy Note */}
            <p className="text-xs text-white/50 text-center">
              By submitting this form, you agree to be contacted about OMGsystems marketing services.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
