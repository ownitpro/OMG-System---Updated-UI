"use client";

import React, { useState } from 'react';

interface ColorScheme {
  gradient: string; // e.g., "from-emerald-500/10 to-teal-500/10"
  border: string; // e.g., "border-emerald-500/20"
  ring: string; // e.g., "focus:ring-emerald-500"
  button: string; // e.g., "from-emerald-500 to-teal-500"
  buttonHover: string; // e.g., "hover:from-emerald-600 hover:to-teal-600"
  shadow: string; // e.g., "shadow-emerald-500/30"
  successBg: string; // e.g., "bg-emerald-500/20"
  successBorder: string; // e.g., "border-emerald-500/50"
  successText: string; // e.g., "text-emerald-400"
  accent: string;
}

interface ConfigurableLeadFormProps {
  formType: 'solutions' | 'marketing' | 'industries';
  colorScheme: ColorScheme;
  formTitle?: string;
  formSubtitle?: string;
}

// Predefined color schemes
export const COLOR_SCHEMES = {
  emerald: {
    gradient: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/20',
    ring: 'focus:ring-emerald-500',
    button: 'from-emerald-500 to-teal-500',
    buttonHover: 'hover:from-emerald-600 hover:to-teal-600',
    shadow: 'shadow-emerald-500/30',
    successBg: 'bg-emerald-500/20',
    successBorder: 'border-emerald-500/50',
    successText: 'text-emerald-400',
    accent: 'emerald',
  },
  blue: {
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    ring: 'focus:ring-blue-500',
    button: 'from-blue-500 to-cyan-500',
    buttonHover: 'hover:from-blue-600 hover:to-cyan-600',
    shadow: 'shadow-blue-500/30',
    successBg: 'bg-blue-500/20',
    successBorder: 'border-blue-500/50',
    successText: 'text-blue-400',
    accent: 'blue',
  },
  purple: {
    gradient: 'from-purple-500/10 to-violet-500/10',
    border: 'border-purple-500/20',
    ring: 'focus:ring-purple-500',
    button: 'from-purple-500 to-violet-500',
    buttonHover: 'hover:from-purple-600 hover:to-violet-600',
    shadow: 'shadow-purple-500/30',
    successBg: 'bg-purple-500/20',
    successBorder: 'border-purple-500/50',
    successText: 'text-purple-400',
    accent: 'purple',
  },
  indigo: {
    gradient: 'from-indigo-500/10 to-violet-500/10',
    border: 'border-indigo-500/20',
    ring: 'focus:ring-indigo-500',
    button: 'from-indigo-500 to-violet-500',
    buttonHover: 'hover:from-indigo-600 hover:to-violet-600',
    shadow: 'shadow-indigo-500/30',
    successBg: 'bg-indigo-500/20',
    successBorder: 'border-indigo-500/50',
    successText: 'text-indigo-400',
    accent: 'indigo',
  },
  yellow: {
    gradient: 'from-yellow-500/10 to-amber-500/10',
    border: 'border-yellow-500/20',
    ring: 'focus:ring-yellow-500',
    button: 'from-yellow-500 to-amber-500',
    buttonHover: 'hover:from-yellow-600 hover:to-amber-600',
    shadow: 'shadow-yellow-500/30',
    successBg: 'bg-yellow-500/20',
    successBorder: 'border-yellow-500/50',
    successText: 'text-yellow-400',
    accent: 'yellow',
  },
  cyan: {
    gradient: 'from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-500/20',
    ring: 'focus:ring-cyan-500',
    button: 'from-cyan-500 to-blue-500',
    buttonHover: 'hover:from-cyan-600 hover:to-blue-600',
    shadow: 'shadow-cyan-500/30',
    successBg: 'bg-cyan-500/20',
    successBorder: 'border-cyan-500/50',
    successText: 'text-cyan-400',
    accent: 'cyan',
  },
  pink: {
    gradient: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    ring: 'focus:ring-purple-500',
    button: 'from-purple-500 to-pink-500',
    buttonHover: 'hover:from-purple-600 hover:to-pink-600',
    shadow: 'shadow-purple-500/30',
    successBg: 'bg-purple-500/20',
    successBorder: 'border-purple-500/50',
    successText: 'text-purple-400',
    accent: 'pink',
  },
  orange: {
    gradient: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    ring: 'focus:ring-orange-500',
    button: 'from-orange-500 to-amber-500',
    buttonHover: 'hover:from-orange-600 hover:to-amber-600',
    shadow: 'shadow-orange-500/30',
    successBg: 'bg-orange-500/20',
    successBorder: 'border-orange-500/50',
    successText: 'text-orange-400',
    accent: 'orange',
  },
} as const;

interface ConfigurableFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  solutions: string[];
  services: string[];
  budget: string;
  industries: string[];
  companySize: string;
  message: string;
  timeguard_headaches: string[];
  timeguard_volume: string;
  automations_tools: string;
  automations_repetitive: string;
  strategy_goal: string;
  custom_vision: string;
  ads_platforms: string[];
  ads_roas: string;
  branding_scope: string[];
  branding_vibe: string;
  content_types: string[];
  content_frequency: string;
}

export default function ConfigurableLeadForm({
  formType,
  colorScheme,
  formTitle,
  formSubtitle,
}: ConfigurableLeadFormProps) {
  const [formData, setFormData] = useState<ConfigurableFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    solutions: [] as string[],
    services: [] as string[],
    budget: '',
    industries: [] as string[],
    companySize: '',
    message: '',
    // Dynamic Solutions Fields
    timeguard_headaches: [] as string[],
    timeguard_volume: '',
    automations_tools: '',
    automations_repetitive: '',
    strategy_goal: '',
    custom_vision: '',
    // Marketing Dynamic Fields
    ads_platforms: [] as string[],
    ads_roas: '',
    branding_scope: [] as string[],
    branding_vibe: '',
    content_types: [] as string[],
    content_frequency: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const solutionOptions = [
    { id: 'timeguard-ai', name: 'TimeGuard AI', color: 'text-blue-400' },
    { id: 'automations', name: 'Automations', color: 'text-emerald-400' },
    { id: 'strategy-session', name: 'Strategy Session', color: 'text-purple-400' },
    { id: 'custom-solutions', name: 'Custom Solutions', color: 'text-orange-400' },
  ];

  const serviceOptions = [
    { id: 'ads-management', name: 'Ads Management' },
    { id: 'branding-creative', name: 'Branding & Creative' },
    { id: 'content-development', name: 'Content Development' },
  ];

  const budgetOptions = [
    { id: 'under-1k', label: 'Under $1,000/month' },
    { id: '1k-5k', label: '$1,000 - $5,000/month' },
    { id: '5k-10k', label: '$5,000 - $10,000/month' },
    { id: 'over-10k', label: '$10,000+/month' },
  ];

  const industryOptions = [
    { id: 'real-estate', name: 'Real Estate', color: 'text-emerald-400' },
    { id: 'accounting', name: 'Accounting', color: 'text-indigo-400' },
    { id: 'property-management', name: 'Property Management', color: 'text-blue-400' },
    { id: 'contractors', name: 'Contractors', color: 'text-yellow-400' },
  ];

  const companySizeOptions = [
    { id: '1-5', label: '1-5 employees' },
    { id: '6-20', label: '6-20 employees' },
    { id: '21-50', label: '21-50 employees' },
    { id: '51-100', label: '51-100 employees' },
    { id: '100+', label: '100+ employees' },
  ];

  const handleSolutionCheckboxChange = (solutionId: string) => {
    setFormData((prev: ConfigurableFormData) => ({
      ...prev,
      solutions: prev.solutions.includes(solutionId)
        ? prev.solutions.filter(id => id !== solutionId)
        : [...prev.solutions, solutionId]
    }));
  };

  const handleMultiSelect = (field: keyof ConfigurableFormData, value: string) => {
    setFormData((prev: ConfigurableFormData) => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const handleServiceCheckboxChange = (serviceId: string) => {
    setFormData((prev: ConfigurableFormData) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleIndustryCheckboxChange = (industryId: string) => {
    setFormData((prev: ConfigurableFormData) => ({
      ...prev,
      industries: prev.industries.includes(industryId)
        ? prev.industries.filter(id => id !== industryId)
        : [...prev.industries, industryId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${formType} lead submission:`, formData);
      setSubmitStatus('success');

      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          company: '',
          phone: '',
          solutions: [],
          services: [],
          budget: '',
          industries: [],
          companySize: '',
          message: '',
          timeguard_headaches: [],
          timeguard_volume: '',
          automations_tools: '',
          automations_repetitive: '',
          strategy_goal: '',
          custom_vision: '',
          ads_platforms: [],
          ads_roas: '',
          branding_scope: [],
          branding_vibe: '',
          content_types: [],
          content_frequency: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTitle = formType === 'solutions' ? 'Get Started Today'
    : formType === 'marketing' ? 'Grow Your Business'
      : 'Industry Solutions';

  const defaultSubtitle = formType === 'solutions'
    ? 'Tell us about your business challenges and we\'ll show you how our solutions can help.'
    : formType === 'marketing'
      ? 'Let\'s discuss how our marketing services can help you reach your goals.'
      : 'Get solutions tailored specifically for your industry\'s unique challenges.';

  return (
    <section id="lead-form" className="py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-br ${colorScheme.gradient} backdrop-blur-xl rounded-2xl p-8 md:p-12 border ${colorScheme.border}`}>
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {formTitle || defaultTitle}
            </h2>
            <p className="text-lg text-white/70">
              {formSubtitle || defaultSubtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor={`${formType}-fullName`} className="block text-sm font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id={`${formType}-fullName`}
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev: ConfigurableFormData) => ({ ...prev, fullName: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor={`${formType}-email`} className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id={`${formType}-email`}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev: ConfigurableFormData) => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all`}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor={`${formType}-company`} className="block text-sm font-medium text-white mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id={`${formType}-company`}
                  required
                  value={formData.company}
                  onChange={(e) => setFormData((prev: ConfigurableFormData) => ({ ...prev, company: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all`}
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label htmlFor={`${formType}-phone`} className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id={`${formType}-phone`}
                  value={formData.phone}
                  onChange={(e) => setFormData((prev: ConfigurableFormData) => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Solutions-specific fields */}
            {formType === 'solutions' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Which solutions are you interested in? <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {solutionOptions.map(solution => (
                      <label
                        key={solution.id}
                        className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.solutions.includes(solution.id)}
                          onChange={() => handleSolutionCheckboxChange(solution.id)}
                          className={`w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-2 ${colorScheme.ring} focus:ring-offset-0`}
                        />
                        <span className={`ml-3 font-medium ${solution.color}`}>{solution.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dynamic Solution Fields */}
                <div className="space-y-6 mt-6">
                  {/* TimeGuard AI Fields */}
                  {formData.solutions.includes('timeguard-ai') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>TimeGuard AI Configuration</h3>
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
                                  ? `${colorScheme.successBg} ${colorScheme.successBorder} ${colorScheme.successText}`
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
                            onChange={(e) => setFormData(prev => ({ ...prev, timeguard_volume: e.target.value }))}
                            className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all`}
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
                  {formData.solutions.includes('automations') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>Automation Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="automations_tools" className="block text-sm font-medium text-white mb-2">What tools do you use now?</label>
                          <input
                            type="text"
                            id="automations_tools"
                            value={formData.automations_tools}
                            onChange={(e) => setFormData(prev => ({ ...prev, automations_tools: e.target.value }))}
                            className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all`}
                            placeholder="e.g. Zapier, Sheets..."
                          />
                        </div>
                        <div>
                          <label htmlFor="automations_repetitive" className="block text-sm font-medium text-white mb-2">Most repetitive task?</label>
                          <input
                            type="text"
                            id="automations_repetitive"
                            value={formData.automations_repetitive}
                            onChange={(e) => setFormData(prev => ({ ...prev, automations_repetitive: e.target.value }))}
                            className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all`}
                            placeholder="e.g. Data entry..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Strategy Session Fields */}
                  {formData.solutions.includes('strategy-session') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>Session Goal</h3>
                      <div className="space-y-2">
                        {[
                          'Scale revenue',
                          'Cut costs with AI',
                          'Automate manual work',
                          'Fix lead flow'
                        ].map(goal => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, strategy_goal: goal }))}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${formData.strategy_goal === goal
                              ? `${colorScheme.successBg} ${colorScheme.successBorder} ${colorScheme.successText}`
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                              }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Solutions Fields */}
                  {formData.solutions.includes('custom-solutions') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>Project Vision</h3>
                      <textarea
                        rows={3}
                        value={formData.custom_vision}
                        onChange={(e) => setFormData(prev => ({ ...prev, custom_vision: e.target.value }))}
                        className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all resize-none`}
                        placeholder="What are we building?"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor={`${formType}-message`} className="block text-sm font-medium text-white mb-2">
                    Tell us about your challenges
                  </label>
                  <textarea
                    id={`${formType}-message`}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all resize-none`}
                    placeholder="What business challenges are you trying to solve?"
                  />
                </div>
              </>
            )}

            {/* Marketing-specific fields */}
            {formType === 'marketing' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Services Interested In <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {serviceOptions.map(service => {
                      const isSelected = formData.services.includes(service.id);
                      return (
                        <label
                          key={service.id}
                          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${isSelected
                            ? `${colorScheme.successBg} ${colorScheme.successBorder}`
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleServiceCheckboxChange(service.id)}
                            className={`w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-2 ${colorScheme.ring} focus:ring-offset-0 text-${colorScheme.accent}-500`}
                          />
                          <span className={`ml-3 font-medium ${isSelected ? colorScheme.successText : 'text-white'}`}>{service.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Marketing Fields */}
                <div className="space-y-6 mt-6">
                  {/* Ads Management Fields */}
                  {formData.services.includes('ads-management') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>Ad Strategy Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Platform Interests?</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {['Meta', 'Google', 'LinkedIn', 'TikTok'].map(platform => (
                              <button
                                key={platform}
                                type="button"
                                onClick={() => handleMultiSelect('ads_platforms', platform)}
                                className={`px-3 py-2 rounded-lg text-xs border transition-all ${formData.ads_platforms.includes(platform)
                                  ? `${colorScheme.successBg} ${colorScheme.successBorder} ${colorScheme.successText}`
                                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                  }`}
                              >
                                {platform}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.ads_roas}
                            onChange={(e) => setFormData(prev => ({ ...prev, ads_roas: e.target.value }))}
                            className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all`}
                            placeholder="Target Monthly ROAS Goal?"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Branding Fields */}
                  {formData.services.includes('branding-creative') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>Branding Scope</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {['New Identity', 'Rebrand', 'Style Guide', 'Assets'].map(scope => (
                            <button
                              key={scope}
                              type="button"
                              onClick={() => handleMultiSelect('branding_scope', scope)}
                              className={`text-left px-4 py-2 rounded-lg text-sm border transition-all ${formData.branding_scope.includes(scope)
                                ? `${colorScheme.successBg} ${colorScheme.successBorder} ${colorScheme.successText}`
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                }`}
                            >
                              {scope}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={formData.branding_vibe}
                          onChange={(e) => setFormData(prev => ({ ...prev, branding_vibe: e.target.value }))}
                          className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all`}
                          placeholder="Brand vibe? (e.g. Minimalist, Bold)"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content Fields */}
                  {formData.services.includes('content-development') && (
                    <div className={`p-6 bg-white/5 rounded-2xl border ${colorScheme.border} animate-in fade-in slide-in-from-top-4 duration-300`}>
                      <h3 className={`${colorScheme.successText} font-bold mb-4`}>Content Development</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          {['Social', 'Blog', 'Email', 'Video'].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => handleMultiSelect('content_types', type)}
                              className={`px-3 py-2 rounded-lg text-xs border transition-all ${formData.content_types.includes(type)
                                ? `${colorScheme.successBg} ${colorScheme.successBorder} ${colorScheme.successText}`
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={formData.content_frequency}
                          onChange={(e) => setFormData(prev => ({ ...prev, content_frequency: e.target.value }))}
                          className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} transition-all`}
                          placeholder="Desired posting frequency?"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor={`${formType}-budget`} className="block text-sm font-medium text-white mb-2">
                    Current Marketing Budget <span className="text-red-400">*</span>
                  </label>
                  <select
                    id={`${formType}-budget`}
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all appearance-none cursor-pointer`}
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

                <div>
                  <label htmlFor={`${formType}-goals`} className="block text-sm font-medium text-white mb-2">
                    What are your marketing goals?
                  </label>
                  <textarea
                    id={`${formType}-goals`}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all resize-none`}
                    placeholder="Tell us about your marketing goals and what you're hoping to achieve..."
                  />
                </div>
              </>
            )}

            {/* Industries-specific fields */}
            {formType === 'industries' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Which industries are you in? <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {industryOptions.map(industry => (
                      <label
                        key={industry.id}
                        className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.industries.includes(industry.id)}
                          onChange={() => handleIndustryCheckboxChange(industry.id)}
                          className={`w-5 h-5 rounded border-white/20 bg-white/5 focus:ring-2 ${colorScheme.ring} focus:ring-offset-0`}
                        />
                        <span className={`ml-3 font-medium ${industry.color}`}>{industry.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor={`${formType}-companySize`} className="block text-sm font-medium text-white mb-2">
                    Company Size <span className="text-red-400">*</span>
                  </label>
                  <select
                    id={`${formType}-companySize`}
                    required
                    value={formData.companySize}
                    onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all appearance-none cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="" className="bg-slate-900">Select company size...</option>
                    {companySizeOptions.map(option => (
                      <option key={option.id} value={option.id} className="bg-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={`${formType}-challenge`} className="block text-sm font-medium text-white mb-2">
                    What's your biggest challenge?
                  </label>
                  <textarea
                    id={`${formType}-challenge`}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 ${colorScheme.ring} focus:border-transparent transition-all resize-none`}
                    placeholder="Tell us about the biggest challenge you're facing in your industry..."
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || (formType === 'solutions' && formData.solutions.length === 0) || (formType === 'marketing' && (formData.services.length === 0 || !formData.budget)) || (formType === 'industries' && (formData.industries.length === 0 || !formData.companySize))}
                className={`w-full px-8 py-4 bg-gradient-to-r ${colorScheme.button} text-white rounded-xl font-semibold ${colorScheme.buttonHover} transition-all shadow-lg ${colorScheme.shadow} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Get Started'
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className={`mt-4 p-4 ${colorScheme.successBg} border ${colorScheme.successBorder} rounded-xl`}>
                  <p className={`${colorScheme.successText} text-center font-medium`}>
                    ✓ Thank you! We'll be in touch shortly to discuss your needs.
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
              By submitting this form, you agree to be contacted about OMGsystems {formType}.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
