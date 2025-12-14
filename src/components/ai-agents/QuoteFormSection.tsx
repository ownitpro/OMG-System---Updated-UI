"use client";

import { useState } from "react";
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  EnvelopeIcon,
  ChevronDownIcon,
  CalendarIcon,
  DocumentTextIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

const industries = [
  "Property Management",
  "Real Estate",
  "Contractors",
  "Healthcare",
  "Accounting",
  "Cleaning Services",
  "Technology",
  "Retail",
  "Other"
];

const timelines = [
  "ASAP (1-2 weeks)",
  "Within 1 month",
  "Within 2-3 months",
  "Flexible timeline"
];

export default function QuoteFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    industry: "",
    agentDescription: "",
    timeline: "",
    additionalDetails: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showTimelineDropdown, setShowTimelineDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIndustrySelect = (industry: string) => {
    setFormData(prev => ({ ...prev, industry }));
    setShowIndustryDropdown(false);
  };

  const handleTimelineSelect = (timeline: string) => {
    setFormData(prev => ({ ...prev, timeline }));
    setShowTimelineDropdown(false);
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
        timeline: formData.timeline
      });
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert("Thank you! We'll respond within 48 hours with your tailored AI-Agent plan.");
      
      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        industry: "",
        agentDescription: "",
        timeline: "",
        additionalDetails: ""
      });
    } catch (error) {
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your AI Agent?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Custom Quote / Lead Form
          </p>
          <p className="text-gray-400 mt-4">
            Fill in your details and we'll deliver a tailored quote within 48 hours.
          </p>
        </div>

        {/* Quote Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    autoComplete="organization"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Industry and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Industry *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                    className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    {formData.industry || "Select your industry"}
                  </button>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  
                  {showIndustryDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          type="button"
                          onClick={() => handleIndustrySelect(industry)}
                          className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Project Timeline
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTimelineDropdown(!showTimelineDropdown)}
                    className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    {formData.timeline || "Select timeline"}
                  </button>
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  
                  {showTimelineDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline}
                          type="button"
                          onClick={() => handleTimelineSelect(timeline)}
                          className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors duration-200"
                        >
                          {timeline}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Agent Description */}
            <div>
              <label htmlFor="agentDescription" className="block text-sm font-medium text-white mb-2">
                What do you want the agent to do? (describe) *
              </label>
              <div className="relative">
                <DocumentTextIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="agentDescription"
                  name="agentDescription"
                  required
                  rows={4}
                  value={formData.agentDescription}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe what you want your AI agent to do for your business..."
                />
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-white mb-2">
                Additional Details
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={3}
                value={formData.additionalDetails}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Any additional information about your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    Request Your Custom Quote
                  </>
                )}
              </button>
            </div>

            {/* Form Note */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                We'll respond within 48 hours with your tailored AI-Agent plan.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


