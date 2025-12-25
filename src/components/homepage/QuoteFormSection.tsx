"use client";

import { useState } from "react";
import { 
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: ClockIcon,
    title: "Free 30-Minute Consultation",
    description: "Get personalized automation recommendations for your business"
  },
  {
    icon: CurrencyDollarIcon,
    title: "Custom ROI Projection",
    description: "See exactly how much you could save with automation"
  },
  {
    icon: UserGroupIcon,
    title: "Expert Implementation Plan",
    description: "Step-by-step roadmap tailored to your business needs"
  }
];

const formFields = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: false },
  { name: "company", label: "Company Name", type: "text", required: true },
  { name: "industry", label: "Industry", type: "select", required: true, options: [
    "Property Management", "Real Estate", "Contractors", "Accounting", 
    "Healthcare", "Cleaning", "Other"
  ]},
  { name: "employees", label: "Number of Employees", type: "select", required: true, options: [
    "1-10", "11-50", "51-200", "200+"
  ]},
  { name: "challenges", label: "Main Business Challenges", type: "textarea", required: false }
];

export default function HomepageQuoteFormSection() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section className="relative py-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-[#47BD79]/20" style={{ boxShadow: '0 0 40px rgba(71, 189, 121, 0.15)' }}>
            <CheckCircleIcon className="w-16 h-16 text-[#47BD79] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="text-xl text-white/70 mb-8">
              We've received your information and will contact you within 24 hours
              to schedule your free consultation.
            </p>
            <div className="bg-[#47BD79]/10 rounded-xl p-6 border border-[#47BD79]/20">
              <h3 className="text-lg font-semibold text-white mb-2">
                What happens next?
              </h3>
              <ul className="text-white/70 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center"><span className="text-[#47BD79] mr-2">•</span> Our team will review your business needs</li>
                <li className="flex items-center"><span className="text-[#47BD79] mr-2">•</span> We'll prepare a custom automation strategy</li>
                <li className="flex items-center"><span className="text-[#47BD79] mr-2">•</span> You'll receive a detailed ROI projection</li>
                <li className="flex items-center"><span className="text-[#47BD79] mr-2">•</span> We'll schedule your free consultation call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get Your Free
              <span className="text-[#3B82F6]"> Automation Strategy</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Discover how automation can transform your business. Get a personalized
              strategy call with our automation experts.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#3B82F6]/30">
                    <benefit.icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-4 h-4 text-[#47BD79]" />
                <span className="text-white/70">Contact@omgsystems.com</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-[#3B82F6]/20" style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)' }}>
            <h3 className="text-2xl font-bold text-white mb-6">
              Get Your Free Strategy Call
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-white/80 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-white transition-all duration-400"
                    >
                      <option value="" className="bg-[#1f1e1e]">Select {field.label}</option>
                      {field.options?.map((option, optionIndex) => (
                        <option key={optionIndex} value={option} className="bg-[#1f1e1e]">
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-white placeholder-white/40 transition-all duration-400"
                      placeholder={`Tell us about your ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-white placeholder-white/40 transition-all duration-400"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3B82F6] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#2563eb] transition-all duration-600 ease-premium-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-[#3B82F6]/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Free Strategy Call
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>

              <p className="text-xs text-white/50 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
