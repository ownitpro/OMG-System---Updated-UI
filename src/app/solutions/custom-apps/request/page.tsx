"use client";

import { useState, useEffect, Suspense, ChangeEvent, FormEvent, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircleIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  LightBulbIcon,
  CogIcon,
  BoltIcon,
  StarIcon,
  BeakerIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

function CustomAppRequestPageContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    description: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  useEffect(() => {
    const components = searchParams.get('components');
    // fromScratch param is available if needed for future use
    // const fromScratch = searchParams.get('fromScratch');

    if (components) {
      setSelectedComponents(components.split(','));
    }
  }, [searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare lead data matching the Admin Leads schema
      const leadData = {
        source: 'custom-apps',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.businessName,
        industry: formData.industry,
        message: formData.description,
        formData: {
          selectedModules: selectedComponents,
          coreObjectives: formData.description,
          additionalNotes: formData.additionalNotes,
        },
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_CUSTOM_APPS;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Custom Apps webhook sent to:', webhookUrl);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const componentDescriptions: Record<string, string> = {
    'dashboard': 'Dashboard',
    'forms': 'Data Entry Forms',
    'reports': 'Reporting System',
    'notifications': 'Notification System',
    'user-management': 'User Management',
    'integrations': 'Third-party Integrations',
    'automation': 'Workflow Automation',
    'mobile': 'Mobile Access',
    'database': 'Database Setup',
    'crm-integration': 'CRM Integration',
    'accounting': 'Accounting Software',
    'communication': 'Communication Tools',
    'api-connections': 'API Connections',
    'workflows': 'Workflow Automation',
    'triggers': 'Event Triggers',
    'scheduling': 'Scheduling System',
    'data-processing': 'Data Processing',
    'ai-features': 'AI Features',
    'analytics': 'Advanced Analytics',
    'security': 'Security & Compliance',
    'permissions': 'Role-based Access',
    'custom-features': 'Custom Features',
    'user-portal': 'User Portal',
    'mobile-ui': 'Mobile Interface'
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-75" />
        </div>

        <div className="relative z-10 bg-slate-900/50 backdrop-blur-2xl rounded-[2.5rem] p-12 max-w-2xl w-full border border-white/5 text-center shadow-2xl shadow-indigo-500/10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/20">
            <CheckCircleIcon className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Transmission <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">Received</span>
          </h2>

          <p className="text-lg text-white/40 mb-8 font-medium leading-relaxed">
            Your architectural request has been successfully queued. Our engineering team will contact you within 48 hours to finalize specifications.
          </p>

          <div className="bg-slate-950/40 rounded-3xl p-8 mb-10 border border-white/5 text-left">
            <h3 className="text-indigo-400/60 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Protocols Initiated:</h3>
            <div className="space-y-4">
              {[
                "Requirement Analysis & Feasibility Check",
                "Discovery Call Scheduling (48hr window)",
                "Full Architectural Blueprint Proposal",
                "Engineering Build Commencement"
              ].map((step, i) => (
                <div key={i} className="flex items-center text-sm text-white/60 font-medium">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center mr-4 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">{i + 1}</div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/solutions/custom-apps'}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-indigo-500/20"
            >
              Return to Catalog
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all duration-300 border border-white/5"
            >
              Speak to Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/chess-grid.png')] bg-[length:40px_40px] opacity-[0.03] animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8">
        {/* Compact Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm rounded-full border border-indigo-500/20 mb-4">
            <SparklesIcon className="w-4 h-4 mr-2 text-indigo-400" />
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Engineering Specification</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center tracking-tight leading-tight">
            Let's Build Your <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">Custom Application</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Selected Components Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/5 sticky top-24 shadow-xl shadow-indigo-500/5">
              <h3 className="text-sm font-bold text-white mb-6 flex items-center uppercase tracking-widest bg-white/5 py-2 px-4 rounded-xl border border-white/5">
                <CogIcon className="w-4 h-4 mr-2 text-indigo-400" />
                Selected Modules
              </h3>

              {selectedComponents.length > 0 ? (
                <div className="space-y-3">
                  {selectedComponents.map((component, index) => (
                    <div key={index} className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 border border-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-950/60">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <CheckCircleIcon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{componentDescriptions[component] || component}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                  <p className="text-white/20 text-xs font-bold uppercase tracking-widest leading-relaxed px-4">No modules selected in catalog</p>
                </div>
              )}

              <div className="mt-8 p-6 bg-indigo-600/10 rounded-2xl border border-indigo-500/20">
                <div className="flex items-center gap-3 mb-2 text-indigo-400">
                  <BeakerIcon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Phase Alpha</span>
                </div>
                <p className="text-[10px] text-white/40 font-medium leading-relaxed">
                  These components will be used to generate your initial architecture draft.
                </p>
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="xl:col-span-3">
            <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-10 border border-white/5 shadow-2xl shadow-indigo-500/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                    <UserIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Project Lead <span className="text-white/20 ml-2">Information</span></h2>
                    <p className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-[0.2em]">Required for specification delivery</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm"
                      placeholder="(+1) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm"
                      placeholder="Project Entity"
                    />
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                      <CommandLineIcon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white uppercase tracking-tight">Scope <span className="text-white/20 ml-2">& Blueprint</span></h2>
                      <p className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-[0.2em]">Technical Project Specifications</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Primary Industry</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm appearance-none"
                      >
                        <option value="">Select Sector</option>
                        <option value="property-management">Property Management</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="contractors">Contractors</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="cleaning-services">Cleaning Services</option>
                        <option value="accounting">Accounting</option>
                        <option value="professional-services">Professional Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Core Objectives *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm resize-none"
                        placeholder="What problem are we solving? Describe the ideal user flow and technical goals..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Ancillary Notes</label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-5 py-3.5 bg-slate-950/40 border border-white/5 rounded-2xl text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-950/60 transition-all duration-300 font-medium text-sm resize-none"
                        placeholder="Timeline constraints, budget ranges, or specific integration endpoints..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">
                    End-to-End Encryption Enabled
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold transition-all duration-500 transform hover:scale-[1.03] shadow-xl shadow-indigo-500/20 disabled:scale-100 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                        <span className="text-sm uppercase tracking-widest">Encrypting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RocketLaunchIcon className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span className="text-sm uppercase tracking-widest">Initialize Engineering Call</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Benefits Section - More Compact */}
        <div className="mt-16 mb-8 text-center">
          <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10 mb-8">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">The Build Promise</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BoltIcon, title: "Rapid Engineering", desc: "Proprietary stack optimized for sub-30 day deployment.", color: "text-blue-400" },
              { icon: StarIcon, title: "Precision Fit", desc: "Architecture mapped exactly to your operational DNA.", color: "text-indigo-400" },
              { icon: CogIcon, title: "Infinite Scale", desc: "Elastic foundations that grow alongside your user base.", color: "text-cyan-400" }
            ].map((benefit, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:bg-slate-900/60 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{benefit.title}</h4>
                <p className="text-white/30 text-[11px] font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomAppRequestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Initializing Interface...</div>
        </div>
      </div>
    }>
      <CustomAppRequestPageContent />
    </Suspense>
  );
}
