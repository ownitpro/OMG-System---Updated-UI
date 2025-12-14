"use client";

import { useState } from "react";
import { WorkflowDefinition } from "@/data/workflow-definitions";

interface WorkflowPaymentProps {
  workflow: WorkflowDefinition;
  workflowData: any;
  onComplete: (paymentData: any) => void;
  onClose: () => void;
}

export function WorkflowPayment({ workflow, workflowData, onComplete, onClose }: WorkflowPaymentProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    requirements: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        ...formData,
        workflowId: workflow.id,
        workflowName: workflow.name,
        setupCost: workflow.setupCost,
        monthlyCost: workflow.monthlyCost,
        totalFirstMonth: workflow.setupCost + workflow.monthlyCost,
        orderId: `WF-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      
      onComplete(paymentData);
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Deploy Your Workflow</h3>
              <p className="text-gray-600">Complete your payment and we'll start building your automation</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{workflow.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{workflow.name}</div>
                    <div className="text-sm text-gray-600">{workflow.description}</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup cost</span>
                    <span className="font-medium">${workflow.setupCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">First month</span>
                    <span className="font-medium">${workflow.monthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-lime-600 border-t border-gray-200 pt-2">
                    <span>Total today</span>
                    <span>${workflow.setupCost + workflow.monthlyCost}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-lime-50 border border-lime-200 rounded-lg">
                <p className="text-sm text-lime-800">
                  ✅ <strong>What's included:</strong> Full setup, integration, testing, and 30 days of support
                </p>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                      errors.fullName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                      errors.company ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Your Company Inc."
                  />
                  {errors.company && (
                    <p className="text-xs text-red-600 mt-1">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 987-6543"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all"
                    rows={3}
                    placeholder="Any specific requirements or customizations..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay $${workflow.setupCost + workflow.monthlyCost} & Deploy`
              )}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              🔒 Secure payment processing powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
