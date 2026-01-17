"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  industry: string;
  metrics: string[];
  comments: string;
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

const METRICS_OPTIONS = [
  "Performance Metrics & KPIs",
  "Revenue & Profit Analysis",
  "Customer Satisfaction Trends",
  "Operational Efficiency",
  "Lead Generation & Conversion",
  "Market Benchmarking",
  "Predictive Analytics",
  "Custom Dashboards"
];

export function AnalyticsDemoForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    industry: "",
    metrics: [],
    comments: ""
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.industry) {
      newErrors.industry = "Please select your industry";
    }

    if (formData.metrics.length === 0) {
      newErrors.metrics = "Please select at least one metric you're interested in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: Partial<Record<keyof FormData, string>>) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMetricChange = (metric: string, checked: boolean) => {
    const updatedMetrics = checked
      ? [...formData.metrics, metric]
      : formData.metrics.filter(m => m !== metric);
    handleInputChange('metrics', updatedMetrics);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/request-analytics-report', {
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
        router.push('/thank-you?type=analytics-report');
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
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
        <p className="text-gray-600 mb-4">
          Your custom analytics report request has been submitted successfully. Our team will prepare your personalized report within 48 hours.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting you to our thank you page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="Enter your email address"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Industry */}
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
          Industry *
        </label>
        <select
          id="industry"
          value={formData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.industry ? 'border-red-500' : 'border-gray-300'
            }`}
        >
          <option value="">Select your industry</option>
          {INDUSTRIES.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
        {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
      </div>

      {/* Metrics */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What metrics are you most interested in? * (Select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {METRICS_OPTIONS.map(metric => (
            <label key={metric} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.metrics.includes(metric)}
                onChange={(e) => handleMetricChange(metric, e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">{metric}</span>
            </label>
          ))}
        </div>
        {errors.metrics && <p className="mt-1 text-sm text-red-600">{errors.metrics}</p>}
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
          Comments / Special Requests
        </label>
        <textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => handleInputChange('comments', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Any specific metrics, timeframes, or special requirements for your analytics report"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            'Request Custom Analytics Report'
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
              <h3 className="text-sm font-medium text-red-800">Error submitting request</h3>
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
          By submitting this form, you agree to our privacy policy. We'll only use your information to prepare your custom analytics report.
        </p>
      </div>
    </form>
  );
}
