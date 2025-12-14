"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@heroicons/react/24/outline";

interface WizardData {
  industry: string;
  focus: string[];
  teamSize: string;
  locations: string;
  currentTools: string;
  workflows: string[];
  budgetBand: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    bestTime: string;
  };
}

interface PricingWizardProps {
  onClose: () => void;
}

export function PricingWizard({ onClose }: PricingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    industry: '',
    focus: [],
    teamSize: '',
    locations: '',
    currentTools: '',
    workflows: [],
    budgetBand: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      bestTime: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalSteps = 5;

  const updateData = (field: keyof WizardData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateContactInfo = (field: keyof WizardData['contactInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const toggleArrayValue = (field: 'focus' | 'workflows', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.industry && data.focus.length > 0;
      case 2:
        return data.teamSize;
      case 3:
        return data.workflows.length > 0;
      case 4:
        return data.budgetBand;
      case 5:
        return data.contactInfo.name && data.contactInfo.email;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.contactInfo.email,
          name: data.contactInfo.name,
          phone: data.contactInfo.phone,
          industry: data.industry,
          budgetBand: data.budgetBand,
          source: 'pricing-wizard',
          context: {
            page_path: window.location.pathname,
            section: 'pricing-wizard',
            timestamp: new Date().toISOString(),
            wizardData: data
          }
        }),
      });

      if (response.ok) {
        // Show success and redirect
        router.push('/thank-you?source=pricing-wizard');
      }
    } catch (error) {
      console.error('Wizard submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSuggestion = () => {
    const industrySuggestions: Record<string, string> = {
      'property-management': 'Start with Property Growth Kickstart: onboarding forms, e-sign PMAs, owner statements, a basic reporting dashboard, and tasked follow-ups. Typical rollout: 1–3 weeks in Ontario.',
      'real-estate': 'Start with lead capture + showing scheduler + auto-filled contracts + post-close nurture. 1–3 weeks.',
      'contractors': 'Start with LeadFlow + intake scoring + proposal templates + milestone updates + review automation. 1–3 weeks.',
      'healthcare': 'Start with Scheduling + Intake + Document hub + basic claims prep; then add alerts or med workflows as needed. Rollouts are phased, 8–12 weeks per site.',
      'accounting': 'Start with document capture + engagement workflow + KYC/e-sign + billing. 2–4 weeks for a pilot.',
      'cleaning': 'Start with CRM + scheduling + route optimization + mobile checklists + invoicing. 2–3 weeks.'
    };
    
    return industrySuggestions[data.industry] || 'We\'ll create a customized proposal based on your specific needs and industry requirements.';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Pricing Guidance</h2>
            <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Industry & Focus</h3>
                <p className="text-gray-600">A few quick questions to shape a proposal for your team.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Industry</label>
                <select
                  value={data.industry}
                  onChange={(e) => updateData('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  <option value="property-management">Property Management</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="contractors">Contractors</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="accounting">Accounting</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Primary Focus</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Lead generation',
                    'CRM + operations',
                    'Document automation',
                    'Client portals',
                    'Reporting/analytics'
                  ].map((focus) => (
                    <label key={focus} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.focus.includes(focus)}
                        onChange={() => toggleArrayValue('focus', focus)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{focus}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Team & Tools</h3>
                <p className="text-gray-600">Helps us size the rollout and integrations.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Team Size Today</label>
                <select
                  value={data.teamSize}
                  onChange={(e) => updateData('teamSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select team size</option>
                  <option value="1-3">1–3 people</option>
                  <option value="4-10">4–10 people</option>
                  <option value="11-25">11–25 people</option>
                  <option value="26-50">26–50 people</option>
                  <option value="51-100">51–100 people</option>
                  <option value="100+">100+ people</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Locations</label>
                <select
                  value={data.locations}
                  onChange={(e) => updateData('locations', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select locations</option>
                  <option value="single">Single location</option>
                  <option value="multi-ontario">Multi-site in Ontario</option>
                  <option value="canada-wide">Canada-wide</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Current Tools</label>
                <input
                  type="text"
                  placeholder="e.g., spreadsheets, accounting software, a CRM"
                  value={data.currentTools}
                  onChange={(e) => updateData('currentTools', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Workflows You Want to Fix First</h3>
                <p className="text-gray-600">Pick the headaches we should remove first.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Intake & onboarding',
                  'Scheduling & reminders',
                  'Document collection & e-sign',
                  'Billing & payments',
                  'Status updates & portals',
                  'Reviews/referrals',
                  'Reporting & dashboards'
                ].map((workflow) => (
                  <label key={workflow} className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={data.workflows.includes(workflow)}
                      onChange={() => toggleArrayValue('workflows', workflow)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{workflow}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ballpark Budget Band (CAD)</h3>
                <p className="text-gray-600">This helps us match features and rollout depth.</p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'exploring', label: 'Exploring', range: 'up to $500/mo', description: 'Basic automation for small teams' },
                  { value: 'growing', label: 'Growing', range: '$500–$1,500/mo', description: 'Full platform with integrations' },
                  { value: 'scaling', label: 'Scaling', range: '$1,500–$4,000/mo', description: 'Advanced features and multi-location' },
                  { value: 'enterprise', label: 'Custom/Enterprise', range: '$4,000+/mo', description: 'Custom solutions and dedicated support' }
                ].map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="budgetBand"
                      value={option.value}
                      checked={data.budgetBand === option.value}
                      onChange={(e) => updateData('budgetBand', e.target.value)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-blue-600">{option.range}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                We'll tailor a proposal; no commitments here.
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Tailored Suggestion</h3>
                <p className="text-gray-600">Based on your answers, here's what we recommend:</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Industry:</strong> {data.industry}</p>
                  <p><strong>Focus:</strong> {data.focus.join(', ')}</p>
                  <p><strong>Team:</strong> {data.teamSize}, {data.locations}</p>
                  <p><strong>Priority workflows:</strong> {data.workflows.join(', ')}</p>
                  <p><strong>Budget:</strong> {data.budgetBand}</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Our Recommendation:</h4>
                <p className="text-sm text-gray-700">{getSuggestion()}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Get Your Proposal</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={data.contactInfo.name}
                      onChange={(e) => updateContactInfo('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      value={data.contactInfo.email}
                      onChange={(e) => updateContactInfo('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                    <input
                      type="tel"
                      value={data.contactInfo.phone}
                      onChange={(e) => updateContactInfo('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Best time to reach you</label>
                    <select
                      value={data.contactInfo.bestTime}
                      onChange={(e) => updateContactInfo('bestTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9-12)</option>
                      <option value="afternoon">Afternoon (12-5)</option>
                      <option value="evening">Evening (5-8)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-gray-600">
                  We'll email your suggestion and follow up. You can opt out anytime.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Back</span>
          </button>

          <div className="flex space-x-2">
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Continue</span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    <span>Get a proposal & book a call</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
