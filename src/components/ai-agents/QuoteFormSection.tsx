"use client";

import { useState } from "react";
import {
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  CalendarIcon,
  CpuChipIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const industries = [
  "Real Estate",
  "Accounting",
  "Contractors",
  "Property Management",
];

const agentTypes = [
  { id: "lead-capture", label: "Lead Capture Agent", icon: "🎯" },
  { id: "customer-support", label: "Customer Support Agent", icon: "💬" },
  { id: "scheduling", label: "Scheduling Assistant", icon: "📅" },
  { id: "data-entry", label: "Data Entry Agent", icon: "📊" },
  { id: "email-automation", label: "Email Automation Agent", icon: "📧" },
  { id: "custom", label: "Custom Agent", icon: "⚡" },
];

export default function QuoteFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    industry: "",
    agentType: "",
    agentDescription: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIndustrySelect = (industry: string) => {
    setFormData((prev) => ({ ...prev, industry }));
    setShowIndustryDropdown(false);
  };

  const handleAgentTypeSelect = (agentType: string) => {
    setFormData((prev) => ({ ...prev, agentType }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ai_agent_quote_request", {
        event_category: "AI Agents",
        event_label: "Custom Quote Request",
        industry: formData.industry,
        timeline: formData.timeline,
        agentType: formData.agentType,
      });
    }

    try {
      // Prepare submission data with metadata
      const submissionData = {
        ...formData,
        source: 'ai-agents',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_AI_AGENTS;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('AI Agents webhook sent to:', webhookUrl);
        console.log('Submission data:', submissionData);
      } else {
        console.warn('No webhook URL configured for AI agents form');
      }

      // Show success state - form stays locked
      setSubmitStatus('success');
      // Form stays in success state - no reset, one-time submission only
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false); // Only re-enable on error so user can retry
    }
  };

  return (
    <section id="ai-agent-form" className="py-20 md:py-32 relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <CpuChipIcon className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Start Your AI Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hire Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              AI Agent
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Tell us about your business needs and we'll design a custom AI agent
            that works 24/7 for you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <SparklesIcon className="w-6 h-6 text-purple-400" />
                What You'll Get
              </h3>
              <ul className="space-y-4">
                {[
                  "Custom AI agent built for your specific needs",
                  "24/7 autonomous operation",
                  "Seamless integration with your existing tools",
                  "Dedicated support during setup",
                  "Training and documentation included",
                  "30-day money-back guarantee",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-white mb-1">48h</div>
                <div className="text-sm text-white/50">Response Time</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-white/50">Agents Deployed</div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Agent Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    What type of agent do you need? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {agentTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleAgentTypeSelect(type.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                          formData.agentType === type.id
                            ? "bg-purple-500/20 border-purple-500/50 text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xl mb-1 block">{type.icon}</span>
                        <span className="text-xs font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name and Company Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Company Name *
                    </label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        autoComplete="organization"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                        placeholder="Company name"
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Industry and Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Industry *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                      >
                        <span className={formData.industry ? "text-white" : "text-white/30"}>
                          {formData.industry || "Select industry"}
                        </span>
                      </button>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />

                      {showIndustryDropdown && (
                        <div className="absolute z-20 w-full mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden">
                          {industries.map((industry) => (
                            <button
                              key={industry}
                              type="button"
                              onClick={() => handleIndustrySelect(industry)}
                              className="w-full px-4 py-3 text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200"
                            >
                              {industry}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Preferred Start Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none z-10" />
                      <input
                        type="date"
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                {/* Agent Description */}
                <div>
                  <label
                    htmlFor="agentDescription"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    What should your AI agent do? *
                  </label>
                  <textarea
                    id="agentDescription"
                    name="agentDescription"
                    required
                    rows={4}
                    value={formData.agentDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 resize-none"
                    placeholder="Describe the tasks you want your AI agent to handle. Be as specific as possible - what triggers should it respond to? What actions should it take? What tools does it need to integrate with?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Processing...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Submitted Successfully
                    </>
                  ) : (
                    <>
                      <RocketLaunchIcon className="w-5 h-5 mr-2" />
                      Get My Custom AI Agent Quote
                    </>
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-purple-500/20 border border-purple-500/50 rounded-xl">
                    <p className="text-purple-400 text-center font-medium flex items-center justify-center">
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Thank you! We'll respond within 48 hours with your tailored AI-Agent plan.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                    <p className="text-red-400 text-center font-medium">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                {/* Form Note */}
                {submitStatus === 'idle' && (
                  <p className="text-center text-white/40 text-sm">
                    We'll respond within 48 hours with your tailored AI-Agent
                    proposal.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


