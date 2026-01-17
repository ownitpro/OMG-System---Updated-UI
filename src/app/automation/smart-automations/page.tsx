"use client";

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CalendarIcon,
  BellIcon,
  CogIcon,
  ArrowRightIcon,
  StarIcon,
  BoltIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';


const automationTemplates = [
  {
    id: 1,
    name: 'Lead Nurturing Sequence',
    description: 'Automatically nurture leads with personalized email sequences',
    category: 'Marketing',
    icon: EnvelopeIcon,
    color: 'bg-blue-500',
    status: 'active',
    successRate: 94,
    timeSaved: '15 hours/week',
    setupPrice: 1200,
    monthlyPrice: 200,
    painPoint: 'Leads go cold because follow-ups are inconsistent or forgotten.',
    solution: 'Automatically nurture leads with timely, personalized messages to keep them engaged.'
  },
  {
    id: 2,
    name: 'Invoice Processing',
    description: 'Automatically process and categorize incoming invoices',
    category: 'Finance',
    icon: DocumentTextIcon,
    color: 'bg-green-500',
    status: 'active',
    successRate: 98,
    timeSaved: '8 hours/week',
    setupPrice: 1000,
    monthlyPrice: 150,
    painPoint: 'Manual invoice entry is slow and error-prone, delaying payments.',
    solution: 'Automate invoice capture, approval, and entry for faster, accurate processing.'
  },
  {
    id: 3,
    name: 'Customer Onboarding',
    description: 'Streamline new customer setup and welcome process',
    category: 'Sales',
    icon: UserGroupIcon,
    color: 'bg-purple-500',
    status: 'paused',
    successRate: 96,
    timeSaved: '12 hours/week',
    setupPrice: 1600,
    monthlyPrice: 250,
    painPoint: 'New customers feel lost without structured onboarding, leading to churn.',
    solution: 'Automate welcome emails, training resources, and check-ins for smooth onboarding.'
  },
  {
    id: 4,
    name: 'Report Generation',
    description: 'Automatically generate and distribute weekly reports',
    category: 'Analytics',
    icon: ChartBarIcon,
    color: 'bg-orange-500',
    status: 'active',
    successRate: 100,
    timeSaved: '6 hours/week',
    setupPrice: 1200,
    monthlyPrice: 125,
    painPoint: 'Pulling reports manually wastes hours every week.',
    solution: 'Automatically generate and deliver reports on schedule with up-to-date data.'
  },
  {
    id: 5,
    name: 'Task Assignment',
    description: 'Intelligently assign tasks based on workload and expertise',
    category: 'Operations',
    icon: CalendarIcon,
    color: 'bg-pink-500',
    status: 'active',
    successRate: 92,
    timeSaved: '10 hours/week',
    setupPrice: 1700,
    monthlyPrice: 175,
    painPoint: 'Tasks fall through the cracks without clear ownership or reminders.',
    solution: 'Automatically assign and track tasks to keep teams accountable and on schedule.'
  },
  {
    id: 6,
    name: 'Follow-up Reminders',
    description: 'Send automated follow-up reminders for pending actions',
    category: 'Communication',
    icon: BellIcon,
    color: 'bg-indigo-500',
    status: 'active',
    successRate: 89,
    timeSaved: '5 hours/week',
    setupPrice: 800,
    monthlyPrice: 100,
    painPoint: 'Missed follow-ups cost deals and damage client relationships.',
    solution: 'Automatically send reminders so no opportunity or commitment is forgotten.'
  }
];

const categories = ['All', 'Marketing', 'Finance', 'Sales', 'Analytics', 'Operations', 'Communication'];

type AutomationTemplate = typeof automationTemplates[number];

// Separate component that uses useSearchParams - must be wrapped in Suspense
function AutomationParamHandler({
  onAutomationParam
}: {
  onAutomationParam: (param: string) => void
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const automationParam = searchParams.get('automation');
    if (automationParam) {
      onAutomationParam(automationParam);
      // Scroll to form after a short delay to ensure DOM is ready
      setTimeout(() => {
        const formElement = document.getElementById('lead-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchParams, onAutomationParam]);

  return null;
}

export default function SmartAutomationsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<AutomationTemplate | null>(null);
  const [automationInterest, setAutomationInterest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Memoized callback for URL param handling
  const handleAutomationParam = useCallback((param: string) => {
    setAutomationInterest(param);
  }, []);

  const handleDeploy = (templateId: number) => {
    router.push(`/automation/smart-automations/${templateId}`);
  };

  const filteredTemplates = selectedCategory === 'All'
    ? automationTemplates
    : automationTemplates.filter(template => template.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);

      // Prepare submission data with metadata
      const submissionData = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        phone: formData.get('phone'),
        automationInterest: formData.get('automationInterest'),
        message: formData.get('message'),
        source: 'smart-automations',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_SMART_AUTOMATIONS;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Smart Automations webhook sent to:', webhookUrl);
        console.log('Submission data:', submissionData);
      } else {
        console.warn('No webhook URL configured for smart automations form');
      }

      setSubmitStatus('success');
      // Form stays in success state - no reset, one-time submission only
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false); // Only re-enable on error so user can retry
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Handle URL params with Suspense boundary */}
      <Suspense fallback={null}>
        <AutomationParamHandler onAutomationParam={handleAutomationParam} />
      </Suspense>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative pt-32 pb-16 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 chess-grid opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent opacity-50" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-in shadow-2xl">
                <BoltIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-200 uppercase tracking-widest">Industrial Precision</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 leading-[1.05] tracking-tighter">
                Smart <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent italic">Automations</span>
              </h1>

              <p className="text-xl text-white/50 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
                Deploy enterprise-grade automation blueprints. Eliminate manual bottlenecks with ready-to-scale templates designed for high-performance teams.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl group hover:border-emerald-500/30 transition-all duration-500">
                  <div className="flex items-center justify-center gap-3 text-emerald-400 mb-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Active</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">56</div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-tighter">Live Blueprints</div>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl group hover:border-emerald-500/30 transition-all duration-500">
                  <div className="flex items-center justify-center gap-3 text-cyan-400 mb-2">
                    <ClockIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Efficiency</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">127h</div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-tighter">Saved This Week</div>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl group hover:border-emerald-500/30 transition-all duration-500">
                  <div className="flex items-center justify-center gap-3 text-teal-400 mb-2">
                    <StarIcon className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Stability</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">96%</div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-tighter">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${selectedCategory === category
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Automation Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.color.replace('bg-', 'from-').replace('-500', '-600 to-')} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <template.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${template.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                    {template.status}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{template.name}</h3>
                  <div className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-[0.2em]">{template.category}</div>
                </div>

                <p className="text-white/40 text-sm mb-8 font-medium leading-relaxed line-clamp-2">
                  {template.description}
                </p>

                {/* Efficiency Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8 pt-8 border-t border-white/5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-emerald-500/10 transition-colors">
                    <div className="text-xl font-bold text-white mb-1">{template.successRate}%</div>
                    <div className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">Success</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-emerald-500/10 transition-colors text-right">
                    <div className="text-xl font-bold text-white mb-1">{template.timeSaved.split(' ')[0]}h</div>
                    <div className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-widest">Saved/Wk</div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeploy(template.id);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-500 transition-all duration-300 transform group-hover:-translate-y-1"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Deploy
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-bold text-white/20 uppercase tracking-widest">v2.4</div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ArrowRightIcon className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </div>

                {/* Technical glow */}
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-700" />
              </div>
            ))}
          </div>

          {/* Template Details Modal */}
          {selectedTemplate && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full border border-white/20">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${selectedTemplate.color} rounded-lg flex items-center justify-center`}>
                      <selectedTemplate.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedTemplate.name}</h3>
                      <p className="text-emerald-200">{selectedTemplate.category} • {selectedTemplate.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-white hover:text-emerald-300 transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-emerald-200 mb-6">{selectedTemplate.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">Executions</span>
                        <span className="text-white">{selectedTemplate.executions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">Success Rate</span>
                        <span className="text-white">{selectedTemplate.successRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">Time Saved</span>
                        <span className="text-white">{selectedTemplate.timeSaved}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="text-emerald-300">Trigger: Email received</div>
                      <div className="text-emerald-300">Condition: Contains keyword</div>
                      <div className="text-emerald-300">Action: Send notification</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedTemplate(null);
                      setAutomationInterest(String(selectedTemplate.id));
                      setTimeout(() => {
                        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors duration-300"
                  >
                    <PlayIcon className="w-5 h-5" />
                    <span>Deploy Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lead Form Section */}
          <div id="lead-form" className="relative py-24">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                  <RocketLaunchIcon className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-200 uppercase tracking-widest">Get Started</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Automate</span>?
                </h2>
                <p className="text-lg text-white/50 max-w-2xl mx-auto">
                  Tell us about your workflow challenges and we'll design a custom automation solution that saves you hours every week.
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                        Company Name
                      </label>
                      <div className="relative">
                        <BuildingOfficeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Automation Interest Dropdown */}
                  <div>
                    <label htmlFor="automation-interest" className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                      What would you like to automate? *
                    </label>
                    <div className="relative">
                      <select
                        id="automation-interest"
                        name="automationInterest"
                        required
                        className="w-full px-5 py-4 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 appearance-none cursor-pointer"
                        value={automationInterest}
                        onChange={(e) => setAutomationInterest(e.target.value)}
                      >
                        <option value="" disabled>Select an automation...</option>
                        {/* Specific automation options */}
                        {automationTemplates.map((template) => (
                          <option key={template.id} value={String(template.id)}>
                            {template.name}
                          </option>
                        ))}
                        {/* General option */}
                        <option value="custom">Custom / Not Sure Yet</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                      Describe your workflow challenge
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about the repetitive tasks that are slowing down your team..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <CheckCircleIcon className="w-6 h-6" />
                          Submitted Successfully
                        </>
                      ) : (
                        <>
                          <BoltIcon className="w-6 h-6" />
                          Request Automation Consultation
                          <ArrowRightIcon className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <div className="mt-4 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl transition-all duration-300">
                        <p className="text-emerald-400 text-center font-medium flex items-center justify-center">
                          <CheckCircleIcon className="w-5 h-5 mr-2" />
                          Thank you! We'll contact you within 24 hours to discuss your automation needs.
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

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                      <span>Custom Solutions</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                      <span>Response within 24h</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
