"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CreditCardIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  currentSystems: string;
  specificRequirements: string;
  timeline: string;
  budget: string;
  additionalNotes: string;
}

export default function SmartAutomationCheckoutPage() {
  const router = useRouter();
  const [selectedAutomation, setSelectedAutomation] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    currentSystems: '',
    specificRequirements: '',
    timeline: '',
    budget: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load selected automation from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedAutomation');
    if (stored) {
      const automation = JSON.parse(stored);
      setSelectedAutomation(automation);
    } else {
      router.push('/automation/smart-automations');
    }
  }, [router]);

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.industry) newErrors.industry = 'Please select your industry';
    if (!formData.companySize) newErrors.companySize = 'Please select company size';
    if (!formData.timeline) newErrors.timeline = 'Please select your timeline';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/smart-automation-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          automation: selectedAutomation,
          formData: formData
        }),
      });

      if (response.ok) {
        // Clear session storage
        sessionStorage.removeItem('selectedAutomation');
        
        // Redirect to success page
        router.push('/automation/smart-automations/success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation steps
  const steps = [
    { id: 1, title: 'Business Info', description: 'Basic information' },
    { id: 2, title: 'Requirements', description: 'Technical details' },
    { id: 3, title: 'Review & Submit', description: 'Final confirmation' }
  ];

  if (!selectedAutomation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 text-emerald-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Deploy {selectedAutomation.name}
                  </h1>
                  <p className="text-emerald-200">
                    Complete the information below to deploy your automation
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">${selectedAutomation.setupPrice}</div>
                  <div className="text-emerald-200 text-sm">Setup Cost</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">${selectedAutomation.monthlyPrice}</div>
                  <div className="text-emerald-200 text-sm">Monthly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-white/30 text-white/50'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`font-semibold ${currentStep >= step.id ? 'text-white' : 'text-white/50'}`}>
                      {step.title}
                    </div>
                    <div className="text-emerald-200 text-sm">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-white/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Business Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.businessName ? 'border-red-400' : 'border-white/30'
                      }`}
                      placeholder="Your company name"
                    />
                    {errors.businessName && (
                      <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.contactName ? 'border-red-400' : 'border-white/30'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.contactName && (
                      <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.email ? 'border-red-400' : 'border-white/30'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.phone ? 'border-red-400' : 'border-white/30'
                      }`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Industry *
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.industry ? 'border-red-400' : 'border-white/30'
                      }`}
                    >
                      <option value="">Select your industry</option>
                      <option value="property-management">Property Management</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="contractors">Contractors</option>
                      <option value="accounting">Accounting</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="cleaning">Cleaning Services</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Company Size *
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.companySize ? 'border-red-400' : 'border-white/30'
                      }`}
                    >
                      <option value="">Select company size</option>
                      <option value="1-5">1-5 employees</option>
                      <option value="6-20">6-20 employees</option>
                      <option value="21-50">21-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="text-red-400 text-sm mt-1">{errors.companySize}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-emerald-200 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Tell us anything else we should know about your business..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Technical Requirements</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Current Systems & Tools
                    </label>
                    <textarea
                      value={formData.currentSystems}
                      onChange={(e) => handleInputChange('currentSystems', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., Salesforce CRM, QuickBooks, Google Sheets, Slack, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Specific Requirements
                    </label>
                    <textarea
                      value={formData.specificRequirements}
                      onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Any specific requirements or customizations needed..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Timeline *
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.timeline ? 'border-red-400' : 'border-white/30'
                        }`}
                      >
                        <option value="">Select your timeline</option>
                        <option value="asap">ASAP (within 1 week)</option>
                        <option value="2-weeks">2 weeks</option>
                        <option value="1-month">1 month</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      {errors.timeline && (
                        <p className="text-red-400 text-sm mt-1">{errors.timeline}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1k-5k">$1,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k+">$10,000+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Review & Submit</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Automation Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Selected Automation</h3>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 ${selectedAutomation.color} rounded-lg flex items-center justify-center`}>
                          <selectedAutomation.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{selectedAutomation.name}</h4>
                          <p className="text-emerald-200 text-sm">{selectedAutomation.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-200">Setup Cost:</span>
                          <span className="text-green-400 font-semibold">${selectedAutomation.setupPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-200">Monthly Cost:</span>
                          <span className="text-blue-400 font-semibold">${selectedAutomation.monthlyPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-200">Success Rate:</span>
                          <span className="text-white font-semibold">{selectedAutomation.successRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Information Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>
                    <div className="bg-white/10 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-200">Business:</span>
                        <span className="text-white">{formData.businessName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-200">Contact:</span>
                        <span className="text-white">{formData.contactName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-200">Email:</span>
                        <span className="text-white">{formData.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-200">Industry:</span>
                        <span className="text-white capitalize">{formData.industry}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-200">Timeline:</span>
                        <span className="text-white capitalize">{formData.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-8 bg-emerald-500/20 border border-emerald-400/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-emerald-200">
                      <p className="font-semibold mb-2">What happens next?</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Our team will review your requirements within 24 hours</li>
                        <li>We'll schedule a discovery call to finalize details</li>
                        <li>Your automation will be built and deployed in 2-3 weeks</li>
                        <li>You'll receive training and ongoing support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    isSubmitting
                      ? 'bg-orange-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CreditCardIcon className="w-5 h-5" />
                      <span>Submit & Deploy</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
