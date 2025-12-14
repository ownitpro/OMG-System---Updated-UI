"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  hasRunAds: string;
  platforms: string[];
  monthlyBudget: string;
  teamSize: string;
  leadGoal: string;
  additionalNotes: string;
}

const INDUSTRIES = [
  "Property Management",
  "Real Estate",
  "Contractors",
  "Accounting",
  "Cleaning Services",
  "Healthcare",
  "Other"
];

const PLATFORMS = [
  "Meta (Facebook/Instagram)",
  "Google Ads",
  "YouTube",
  "LinkedIn",
  "TikTok",
  "Twitter/X",
  "Other"
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "Over $50,000"
];

const TEAM_SIZES = [
  "1-5 employees",
  "6-20 employees",
  "21-50 employees",
  "51-100 employees",
  "100+ employees"
];

export function LeadFlowStrategyForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    hasRunAds: "",
    platforms: [],
    monthlyBudget: "",
    teamSize: "",
    leadGoal: "",
    additionalNotes: ""
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.industry) {
      newErrors.industry = "Please select your industry";
    }
    
    if (!formData.hasRunAds) {
      newErrors.hasRunAds = "Please let us know if you've run ads before";
    }
    
    if (!formData.leadGoal.trim()) {
      newErrors.leadGoal = "Please tell us your lead goal";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const updatedPlatforms = checked
      ? [...formData.platforms, platform]
      : formData.platforms.filter(p => p !== platform);
    handleInputChange('platforms', updatedPlatforms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/leadflow-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setSubmitStatus('success');
      
      // Redirect to thank you page or show success message
      setTimeout(() => {
        router.push('/thank-you?type=leadflow-strategy');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your strategy call request has been submitted successfully. We'll be in touch within 24 hours to schedule your call.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting you to our thank you page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company / Organization
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your company name"
        />
      </div>

      {/* Industry */}
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
          Industry / Vertical *
        </label>
        <select
          id="industry"
          value={formData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.industry ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your industry</option>
          {INDUSTRIES.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
        {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
      </div>

      {/* Has Run Ads */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Have you run ads / lead campaigns before? *
        </label>
        <div className="space-y-2">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="hasRunAds"
                value={option}
                checked={formData.hasRunAds === option}
                onChange={(e) => handleInputChange('hasRunAds', e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {errors.hasRunAds && <p className="mt-1 text-sm text-red-600">{errors.hasRunAds}</p>}
      </div>

      {/* Platforms Used */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Platforms used (select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {PLATFORMS.map(platform => (
            <label key={platform} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.platforms.includes(platform)}
                onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Monthly Budget */}
      <div>
        <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-2">
          Monthly ad budget
        </label>
        <select
          id="monthlyBudget"
          value={formData.monthlyBudget}
          onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select budget range</option>
          {BUDGET_RANGES.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Team Size */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
          Number of employees / team size
        </label>
        <select
          id="teamSize"
          value={formData.teamSize}
          onChange={(e) => handleInputChange('teamSize', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select team size</option>
          {TEAM_SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Lead Goal */}
      <div>
        <label htmlFor="leadGoal" className="block text-sm font-medium text-gray-700 mb-2">
          What's your lead goal / outcome you want? *
        </label>
        <textarea
          id="leadGoal"
          value={formData.leadGoal}
          onChange={(e) => handleInputChange('leadGoal', e.target.value)}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.leadGoal ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe your lead generation goals and what you want to achieve"
        />
        {errors.leadGoal && <p className="mt-1 text-sm text-red-600">{errors.leadGoal}</p>}
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
          Additional notes / comments
        </label>
        <textarea
          id="additionalNotes"
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any additional information you'd like to share"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Request Strategy Call'
          )}
        </button>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error submitting form</h3>
              <p className="mt-1 text-sm text-red-700">
                There was an error submitting your request. Please try again or contact us directly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="text-center text-sm text-gray-500">
        <p>
          By submitting this form, you agree to our privacy policy. We'll only use your information to contact you about your strategy call.
        </p>
      </div>
    </form>
  );
}
