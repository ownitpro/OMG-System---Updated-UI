"use client";

import React, { useState } from 'react';
import {
  BuildingOfficeIcon,
  CalculatorIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const industryOptions = [
  { id: 'real-estate', name: 'Real Estate', color: 'blue', icon: HomeModernIcon },
  { id: 'accounting', name: 'Accounting', color: 'emerald', icon: CalculatorIcon },
  { id: 'property-management', name: 'Property Management', color: 'purple', icon: BuildingOfficeIcon },
  { id: 'contractors', name: 'Contractors', color: 'amber', icon: WrenchScrewdriverIcon },
];

interface IndustriesFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  industries: string[];
  challenge: string;
  // Dynamic Industry Fields
  re_volume: string;
  re_pain_point: string[];
  acc_size: string;
  acc_challenge: string[];
  cont_trade: string;
  cont_project_vol: string;
  pm_units: string;
  pm_focus: string[];
}

export default function IndustriesLeadForm() {
  const [formData, setFormData] = useState<IndustriesFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    industries: [] as string[],
    challenge: '',
    // Initial State for Dynamic Fields
    re_volume: '',
    re_pain_point: [],
    acc_size: '',
    acc_challenge: [],
    cont_trade: '',
    cont_project_vol: '',
    pm_units: '',
    pm_focus: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCheckboxChange = (industryId: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(industryId)
        ? prev.industries.filter(id => id !== industryId)
        : [...prev.industries, industryId]
    }));
  };

  const handleMultiSelect = (field: keyof IndustriesFormData, value: string) => {
    setFormData((prev) => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare submission data with metadata
      const submissionData = {
        ...formData,
        source: 'industries-lead',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_INDUSTRIES;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Industries webhook sent to:', webhookUrl);
        console.log('Submission data:', submissionData);
      } else {
        console.warn('No webhook URL configured for industries lead form');
      }

      setSubmitStatus('success');
      // Form stays in success state - no reset, one-time submission only
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false); // Only re-enable on error so user can retry
    }
  };

  const isRealEstateSelected = formData.industries.includes('real-estate');
  const isAccountingSelected = formData.industries.includes('accounting');
  const isContractorsSelected = formData.industries.includes('contractors');
  const isPropertyMgmtSelected = formData.industries.includes('property-management');

  const getFormTheme = () => {
    if (formData.industries.length === 0) return {
      from: 'from-blue-500/10',
      to: 'to-indigo-500/10',
      border: 'border-blue-500/20',
      shadow: 'shadow-blue-500/10',
      ring: 'focus:ring-blue-500',
      accent: 'blue'
    };

    const lastSelectedId = formData.industries[formData.industries.length - 1];
    switch (lastSelectedId) {
      case 'real-estate':
        return {
          from: 'from-blue-500/10',
          to: 'to-indigo-500/10',
          border: 'border-blue-500/20',
          shadow: 'shadow-blue-500/10',
          ring: 'focus:ring-blue-500',
          accent: 'blue'
        };
      case 'accounting':
        return {
          from: 'from-emerald-500/10',
          to: 'to-teal-500/10',
          border: 'border-emerald-500/20',
          shadow: 'shadow-emerald-500/10',
          ring: 'focus:ring-emerald-500',
          accent: 'emerald'
        };
      case 'property-management':
        return {
          from: 'from-purple-500/10',
          to: 'to-violet-500/10',
          border: 'border-purple-500/20',
          shadow: 'shadow-purple-500/10',
          ring: 'focus:ring-purple-500',
          accent: 'purple'
        };
      case 'contractors':
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

  return (
    <section id="lead-form" className="py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-br ${theme.from} ${theme.to} backdrop-blur-xl rounded-3xl p-8 md:p-12 border ${theme.border} shadow-2xl ${theme.shadow} transition-all duration-500`}>
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industry Solutions
            </h2>
            <p className="text-lg text-white/70">
              Get solutions tailored specifically for your industry's unique challenges.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ind-fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="ind-fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className={`w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="ind-email" className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="ind-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ind-company" className="block text-sm font-medium text-white mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="ind-company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className={`w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label htmlFor="ind-phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="ind-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Industries Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Which industries are you in? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industryOptions.map(option => {
                  const isSelected = formData.industries.includes(option.id);
                  const iColor = option.id === 'real-estate' ? 'blue' :
                    option.id === 'accounting' ? 'emerald' :
                      option.id === 'property-management' ? 'purple' : 'amber';

                  return (
                    <label
                      key={option.id}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${isSelected
                        ? `bg-${iColor}-500/10 border-${iColor}-500/50 shadow-lg shadow-${iColor}-500/10`
                        : 'bg-slate-900/30 border-white/10 hover:bg-slate-900/50'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(option.id)}
                        className={`w-5 h-5 rounded border-white/20 bg-slate-900 focus:ring-2 focus:ring-${iColor}-500 focus:ring-offset-0 text-${iColor}-500`}
                      />
                      <option.icon className={`w-5 h-5 ml-3 mr-2 ${isSelected ? `text-${iColor}-400` : 'text-white/40'}`} />
                      <span className={`font-medium ${isSelected ? `text-${iColor}-400` : 'text-white'}`}>{option.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Industry Fields */}
            <div className="space-y-6">
              {/* Real Estate Fields */}
              {isRealEstateSelected && (
                <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-blue-400 font-bold mb-4 flex items-center">
                    <HomeModernIcon className="w-5 h-5 mr-2" />
                    Real Estate Profile
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="re_volume" className="block text-sm font-medium text-white mb-2">Annual Transaction Volume</label>
                      <select
                        id="re_volume"
                        value={formData.re_volume}
                        onChange={(e) => setFormData(prev => ({ ...prev, re_volume: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="" className="bg-slate-900">Select volume...</option>
                        <option value="0-10" className="bg-slate-900">0-10 Deals/Year</option>
                        <option value="10-25" className="bg-slate-900">10-25 Deals/Year</option>
                        <option value="25-50" className="bg-slate-900">25-50 Deals/Year</option>
                        <option value="50+" className="bg-slate-900">50+ Deals/Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Biggest Operational Pain Point</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Manual Follow-ups', 'Lost Leads', 'Document Chaos', 'Pipeline Visibility'].map(pain => (
                          <button
                            key={pain}
                            type="button"
                            onClick={() => handleMultiSelect('re_pain_point', pain)}
                            className={`text-left px-4 py-2 rounded-lg text-sm border transition-all ${formData.re_pain_point.includes(pain)
                              ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                              : 'bg-slate-900/50 border-white/10 text-white/60 hover:bg-slate-900'
                              }`}
                          >
                            {pain}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Accounting Fields */}
              {isAccountingSelected && (
                <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-emerald-400 font-bold mb-4 flex items-center">
                    <CalculatorIcon className="w-5 h-5 mr-2" />
                    Firm Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="acc_size" className="block text-sm font-medium text-white mb-2">Practice Size</label>
                      <select
                        id="acc_size"
                        value={formData.acc_size}
                        onChange={(e) => setFormData(prev => ({ ...prev, acc_size: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      >
                        <option value="" className="bg-slate-900">Select size...</option>
                        <option value="solo" className="bg-slate-900">Solo Practitioner</option>
                        <option value="2-5" className="bg-slate-900">2-5 Staff</option>
                        <option value="5-10" className="bg-slate-900">5-10 Staff</option>
                        <option value="10+" className="bg-slate-900">10+ Staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Primary Challenge</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Document Collection', 'Client Onboarding', 'Tax Season Workflow', 'Billing/AR'].map(chall => (
                          <button
                            key={chall}
                            type="button"
                            onClick={() => handleMultiSelect('acc_challenge', chall)}
                            className={`text-left px-4 py-2 rounded-lg text-sm border transition-all ${formData.acc_challenge.includes(chall)
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-900/50 border-white/10 text-white/60 hover:bg-slate-900'
                              }`}
                          >
                            {chall}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Property Management Fields */}
              {isPropertyMgmtSelected && (
                <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-purple-400 font-bold mb-4 flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                    Portfolio Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pm_units" className="block text-sm font-medium text-white mb-2">Portfolio Size (Units)</label>
                      <select
                        id="pm_units"
                        value={formData.pm_units}
                        onChange={(e) => setFormData(prev => ({ ...prev, pm_units: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      >
                        <option value="" className="bg-slate-900">Select units...</option>
                        <option value="1-50" className="bg-slate-900">1-50 Units</option>
                        <option value="50-200" className="bg-slate-900">50-200 Units</option>
                        <option value="200-500" className="bg-slate-900">200-500 Units</option>
                        <option value="500+" className="bg-slate-900">500+ Units</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Key Focus Areas</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Tenant Screening', 'Maintenance Coord', 'Owner Reporting', 'Rent Collection'].map(focus => (
                          <button
                            key={focus}
                            type="button"
                            onClick={() => handleMultiSelect('pm_focus', focus)}
                            className={`text-left px-4 py-2 rounded-lg text-sm border transition-all ${formData.pm_focus.includes(focus)
                              ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                              : 'bg-slate-900/50 border-white/10 text-white/60 hover:bg-slate-900'
                              }`}
                          >
                            {focus}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contractors Fields */}
              {isContractorsSelected && (
                <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-amber-400 font-bold mb-4 flex items-center">
                    <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                    Business Profile
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cont_trade" className="block text-sm font-medium text-white mb-2">Primary Trade</label>
                      <select
                        id="cont_trade"
                        value={formData.cont_trade}
                        onChange={(e) => setFormData(prev => ({ ...prev, cont_trade: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      >
                        <option value="" className="bg-slate-900">Select trade...</option>
                        <option value="gc" className="bg-slate-900">General Contractor</option>
                        <option value="hvac-plumbing" className="bg-slate-900">HVAC / Plumbing</option>
                        <option value="electrical" className="bg-slate-900">Electrical</option>
                        <option value="landscaping" className="bg-slate-900">Landscaping</option>
                        <option value="other" className="bg-slate-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cont_project_vol" className="block text-sm font-medium text-white mb-2">Monthly Project Volume</label>
                      <select
                        id="cont_project_vol"
                        value={formData.cont_project_vol}
                        onChange={(e) => setFormData(prev => ({ ...prev, cont_project_vol: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      >
                        <option value="" className="bg-slate-900">Select volume...</option>
                        <option value="1-5" className="bg-slate-900">1-5 Projects</option>
                        <option value="5-15" className="bg-slate-900">5-15 Projects</option>
                        <option value="15-30" className="bg-slate-900">15-30 Projects</option>
                        <option value="30+" className="bg-slate-900">30+ Projects</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Biggest Challenge */}
            <div>
              <label htmlFor="industries-challenge" className="block text-sm font-medium text-white mb-2">
                All Other Details
              </label>
              <textarea
                id="industries-challenge"
                rows={4}
                value={formData.challenge}
                onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all resize-none`}
                placeholder="Tell us about the biggest challenge you're facing in your industry..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success' || formData.industries.length === 0}
                className={`w-full px-8 py-4 bg-gradient-to-r from-${theme.accent}-600 to-${theme.accent}-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-${theme.accent}-500/30 disabled:opacity-50 disabled:cursor-not-allowed`}
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
                    Thank you! Our industry specialists will reach out soon.
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
              By submitting this form, you agree to be contacted about OMGsystems solutions.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
