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
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We've received your information and will contact you within 24 hours 
              to schedule your free consultation.
            </p>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens next?
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Our team will review your business needs</li>
                <li>• We'll prepare a custom automation strategy</li>
                <li>• You'll receive a detailed ROI projection</li>
                <li>• We'll schedule your free consultation call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Free
              <span className="text-blue-600"> Automation Strategy</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover how automation can transform your business. Get a personalized 
              strategy call with our automation experts.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Contact@omgsystems.com</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get Your Free Strategy Call
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Tell us about your ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
