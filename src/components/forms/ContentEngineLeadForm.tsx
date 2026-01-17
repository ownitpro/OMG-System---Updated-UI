"use client";

import React, { useState } from 'react';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  VideoCameraIcon,
  MegaphoneIcon,
  DocumentDuplicateIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const contentTypeOptions = [
  { id: 'blog-posts', name: 'Blog Posts & Articles', icon: DocumentTextIcon },
  { id: 'social-media', name: 'Social Media Content', icon: ChatBubbleBottomCenterTextIcon },
  { id: 'email-campaigns', name: 'Email Campaigns', icon: EnvelopeIcon },
  { id: 'video-scripts', name: 'Video Scripts', icon: VideoCameraIcon },
  { id: 'ad-copy', name: 'Ad Copy', icon: MegaphoneIcon },
  { id: 'whitepapers', name: 'Whitepapers & Guides', icon: DocumentDuplicateIcon },
];

const volumeOptions = [
  { value: '1-10', label: '1-10 pieces/month' },
  { value: '11-25', label: '11-25 pieces/month' },
  { value: '26-50', label: '26-50 pieces/month' },
  { value: '50+', label: '50+ pieces/month' },
];

const industryOptions = [
  'Real Estate',
  'Property Management',
  'Healthcare',
  'Accounting & Finance',
  'Contractors & Home Services',
  'Cleaning Services',
  'Technology & SaaS',
  'E-commerce & Retail',
  'Professional Services',
  'Other',
];

interface ContentEngineFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  contentTypes: string[];
  monthlyVolume: string;
  industry: string;
  biggestChallenge: string;
}

export default function ContentEngineLeadForm() {
  const [formData, setFormData] = useState<ContentEngineFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    contentTypes: [],
    monthlyVolume: '',
    industry: '',
    biggestChallenge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContentTypeToggle = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(typeId)
        ? prev.contentTypes.filter(id => id !== typeId)
        : [...prev.contentTypes, typeId]
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
        source: 'content-engine',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_CONTENT_ENGINE;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Content Engine webhook sent to:', webhookUrl);
        console.log('Submission data:', submissionData);
      } else {
        console.warn('No webhook URL configured for content engine form');
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
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <SparklesIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Content Engine</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Free Trial
            </h2>
            <p className="text-lg text-white/70">
              Tell us about your content needs and we'll show you how Content Engine can scale your output.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ce-fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="ce-fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="ce-email" className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="ce-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ce-company" className="block text-sm font-medium text-white mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="ce-company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label htmlFor="ce-phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="ce-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Content Types Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                What types of content do you need? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {contentTypeOptions.map(type => {
                  const isSelected = formData.contentTypes.includes(type.id);

                  return (
                    <label
                      key={type.id}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleContentTypeToggle(type.id)}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 text-cyan-500"
                      />
                      <type.icon className={`w-5 h-5 ml-3 mr-2 ${isSelected ? 'text-cyan-400' : 'text-white/40'}`} />
                      <span className={`font-medium text-sm ${isSelected ? 'text-cyan-300' : 'text-white'}`}>{type.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Monthly Volume & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ce-volume" className="block text-sm font-medium text-white mb-2">
                  Monthly Content Volume <span className="text-red-400">*</span>
                </label>
                <select
                  id="ce-volume"
                  required
                  value={formData.monthlyVolume}
                  onChange={(e) => setFormData((prev) => ({ ...prev, monthlyVolume: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="" className="bg-slate-900 font-sans">Select volume...</option>
                  {volumeOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-900 font-sans">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ce-industry" className="block text-sm font-medium text-white mb-2">
                  Primary Industry/Niche <span className="text-red-400">*</span>
                </label>
                <select
                  id="ce-industry"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="" className="bg-slate-900 font-sans">Select industry...</option>
                  {industryOptions.map(industry => (
                    <option key={industry} value={industry} className="bg-slate-900 font-sans">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Biggest Challenge */}
            <div>
              <label htmlFor="ce-challenge" className="block text-sm font-medium text-white mb-2">
                What's your biggest content challenge? <span className="text-red-400">*</span>
              </label>
              <textarea
                id="ce-challenge"
                rows={4}
                required
                value={formData.biggestChallenge}
                onChange={(e) => setFormData((prev) => ({ ...prev, biggestChallenge: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                placeholder="e.g., Maintaining consistent brand voice, scaling output without more staff, SEO optimization..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success' || formData.contentTypes.length === 0}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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
                  'Start Free Trial'
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-cyan-500/20 border border-cyan-500/50 rounded-xl transition-all duration-300">
                  <p className="text-cyan-400 text-center font-medium flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Thank you! We'll be in touch shortly to set up your free trial.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <p className="text-red-400 text-center font-medium">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                </div>
              )}
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-white/50 text-center">
              By submitting this form, you agree to be contacted about Content Engine.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
