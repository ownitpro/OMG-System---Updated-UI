"use client";

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  CogIcon,
  PresentationChartLineIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const solutionOptions = [
  { id: 'timeguard-ai', name: 'TimeGuard AI', color: 'text-blue-400', icon: ClockIcon },
  { id: 'automations', name: 'Automations', color: 'text-emerald-400', icon: CogIcon },
  { id: 'strategy-session', name: 'Strategy Session', color: 'text-purple-400', icon: PresentationChartLineIcon },
  { id: 'custom-solutions', name: 'Custom Solutions', color: 'text-orange-400', icon: SparklesIcon },
];

interface SolutionsFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  solutions: string[];
  message: string;
  timeguard_headaches: string[];
  timeguard_volume: string;
  automations_tools: string;
  automations_repetitive: string;
  strategy_goal: string;
  custom_vision: string;
}

export default function SolutionsLeadForm() {
  const [formData, setFormData] = useState<SolutionsFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    solutions: [] as string[],
    message: '',
    // Dynamic Fields
    timeguard_headaches: [] as string[],
    timeguard_volume: '',
    automations_tools: '',
    automations_repetitive: '',
    strategy_goal: '',
    custom_vision: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCheckboxChange = (solutionId: string) => {
    setFormData((prev: SolutionsFormData) => ({
      ...prev,
      solutions: prev.solutions.includes(solutionId)
        ? prev.solutions.filter(id => id !== solutionId)
        : [...prev.solutions, solutionId]
    }));
  };

  const handleMultiSelect = (field: keyof SolutionsFormData, value: string) => {
    setFormData((prev: SolutionsFormData) => {
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
        source: 'solutions-lead',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_SOLUTIONS;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Solutions webhook sent to:', webhookUrl);
      }

      setSubmitStatus('success');
      // Form stays in success state - no reset, one-time submission only
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false); // Only re-enable on error so user can retry
    }
  };

  const isTimeGuardSelected = formData.solutions.includes('timeguard-ai');
  const isAutomationsSelected = formData.solutions.includes('automations');
  const isStrategySelected = formData.solutions.includes('strategy-session');
  const isCustomSelected = formData.solutions.includes('custom-solutions');

  const getFormTheme = () => {
    if (formData.solutions.length === 0) return {
      from: 'from-blue-500/10',
      to: 'to-indigo-500/10',
      border: 'border-blue-500/20',
      shadow: 'shadow-blue-500/10',
      ring: 'focus:ring-blue-500',
      accent: 'blue'
    };

    const lastSelectedId = formData.solutions[formData.solutions.length - 1];
    switch (lastSelectedId) {
      case 'timeguard-ai':
        return {
          from: 'from-sky-500/10',
          to: 'to-blue-500/10',
          border: 'border-sky-500/20',
          shadow: 'shadow-sky-500/10',
          ring: 'focus:ring-sky-500',
          accent: 'sky'
        };
      case 'automations':
        return {
          from: 'from-emerald-500/10',
          to: 'to-teal-500/10',
          border: 'border-emerald-500/20',
          shadow: 'shadow-emerald-500/10',
          ring: 'focus:ring-emerald-500',
          accent: 'emerald'
        };
      case 'strategy-session':
        return {
          from: 'from-purple-500/10',
          to: 'to-violet-500/10',
          border: 'border-purple-500/20',
          shadow: 'shadow-purple-500/10',
          ring: 'focus:ring-purple-500',
          accent: 'purple'
        };
      case 'custom-solutions':
        return {
          from: 'from-orange-500/10',
          to: 'to-amber-500/10',
          border: 'border-orange-500/20',
          shadow: 'shadow-orange-500/10',
          ring: 'focus:ring-orange-500',
          accent: 'orange'
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
        <div className={`bg-gradient-to-br ${theme.from} ${theme.to} backdrop-blur-xl rounded-2xl p-8 md:p-12 border ${theme.border} shadow-2xl ${theme.shadow} transition-all duration-500`}>
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Started Today
            </h2>
            <p className="text-lg text-white/70">
              Tell us about your business challenges and we'll show you how our solutions can help.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="solutions-fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="solutions-fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, fullName: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="solutions-email" className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="solutions-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="solutions-company" className="block text-sm font-medium text-white mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="solutions-company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, company: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label htmlFor="solutions-phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="solutions-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Solutions Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Which solutions are you interested in? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {solutionOptions.map(solution => {
                  const isSelected = formData.solutions.includes(solution.id);
                  const sColor = solution.id === 'automations' ? 'emerald' :
                    solution.id === 'timeguard-ai' ? 'sky' :
                      solution.id === 'strategy-session' ? 'purple' : 'orange';

                  return (
                    <label
                      key={solution.id}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${isSelected
                        ? `bg-${sColor}-500/10 border-${sColor}-500/50 shadow-lg shadow-${sColor}-500/10`
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxChange(solution.id)}
                        className={`w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-2 focus:ring-${sColor}-500 focus:ring-offset-0 text-${sColor}-500`}
                      />
                      <solution.icon className={`w-5 h-5 ml-3 mr-2 ${isSelected ? `text-${sColor}-400` : 'text-white/40'}`} />
                      <span className={`font-medium ${isSelected ? `text-${sColor}-400` : 'text-white'}`}>{solution.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Solution Fields */}
            <div className="space-y-6">
              {/* TimeGuard AI Fields */}
              {isTimeGuardSelected && (
                <div className="p-6 bg-sky-500/5 rounded-2xl border border-sky-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-sky-400 font-bold mb-4 flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    TimeGuard AI Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">What are your biggest scheduling headaches?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['No-shows', 'Manual scheduling', 'Double bookings', 'After-hours calls'].map(headache => (
                          <button
                            key={headache}
                            type="button"
                            onClick={() => handleMultiSelect('timeguard_headaches', headache)}
                            className={`text-left px-4 py-2 rounded-lg text-sm border transition-all ${formData.timeguard_headaches.includes(headache)
                              ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                          >
                            {headache}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="timeguard_volume" className="block text-sm font-medium text-white mb-2">Approx. weekly appointments?</label>
                      <select
                        id="timeguard_volume"
                        value={formData.timeguard_volume}
                        onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, timeguard_volume: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                      >
                        <option value="" className="bg-slate-900 font-sans">Select volume...</option>
                        <option value="0-20" className="bg-slate-900 font-sans">0-20 per week</option>
                        <option value="20-50" className="bg-slate-900 font-sans">20-50 per week</option>
                        <option value="50-100" className="bg-slate-900 font-sans">50-100 per week</option>
                        <option value="100+" className="bg-slate-900 font-sans">100+ per week</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Automations Fields */}
              {isAutomationsSelected && (
                <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-emerald-400 font-bold mb-4 flex items-center">
                    <CogIcon className="w-5 h-5 mr-2" />
                    Automation Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="automations_tools" className="block text-sm font-medium text-white mb-2">What tools do you use now? (e.g. Zapier, Sheets, CRMs)</label>
                      <input
                        type="text"
                        id="automations_tools"
                        value={formData.automations_tools}
                        onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, automations_tools: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="List your main business tools..."
                      />
                    </div>
                    <div>
                      <label htmlFor="automations_repetitive" className="block text-sm font-medium text-white mb-2">Which task wastes the most time today?</label>
                      <input
                        type="text"
                        id="automations_repetitive"
                        value={formData.automations_repetitive}
                        onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, automations_repetitive: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="e.g. Data entry, lead follow-up, invoicing..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Strategy Session Fields */}
              {isStrategySelected && (
                <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-purple-400 font-bold mb-4 flex items-center">
                    <PresentationChartLineIcon className="w-5 h-5 mr-2" />
                    Session Preparation
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">What is your primary goal for this call?</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Scale revenue with better systems',
                        'Cut operational costs with AI',
                        'Move from manual to automated',
                        'Fix broken lead flow'
                      ].map(goal => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setFormData((prev: SolutionsFormData) => ({ ...prev, strategy_goal: goal }))}
                          className={`text-left px-4 py-3 rounded-xl text-sm border transition-all ${formData.strategy_goal === goal
                            ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                            }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Solutions Fields */}
              {isCustomSelected && (
                <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-orange-400 font-bold mb-4 flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    The Vision
                  </h3>
                  <div>
                    <label htmlFor="custom_vision" className="block text-sm font-medium text-white mb-2">Describe your vision or the specific gap you need to fill</label>
                    <textarea
                      id="custom_vision"
                      rows={3}
                      value={formData.custom_vision}
                      onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, custom_vision: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                      placeholder="What exactly are we building?"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* General Message */}
            <div>
              <label htmlFor="solutions-message" className="block text-sm font-medium text-white mb-2">
                Additional Comments
              </label>
              <textarea
                id="solutions-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((prev: SolutionsFormData) => ({ ...prev, message: e.target.value }))}
                className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all resize-none`}
                placeholder="Any other details you'd like to share?"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success' || formData.solutions.length === 0}
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
                    Thank you! We'll be in touch shortly to discuss your needs.
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
              By submitting this form, you agree to be contacted about OMGsystems solutions.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
