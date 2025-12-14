"use client";

import { useState, useCallback } from 'react';

interface WorkflowNode {
  id: string;
  type: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  config: { [key: string]: any };
  status?: 'idle' | 'running' | 'completed' | 'error';
  output?: any;
}

interface WorkflowInstance {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  connections: any[];
  status: 'draft' | 'configured' | 'tested' | 'ready';
  templateId?: string;
}

interface WorkflowOrderModalProps {
  workflow: WorkflowInstance;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function WorkflowOrderModal({
  workflow,
  isOpen,
  onClose,
  onSuccess
}: WorkflowOrderModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    requirements: '',
    agreeToTerms: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  }, []);

  const calculatePricing = () => {
    // In a real app, this would be more sophisticated
    const nodeCount = workflow.nodes?.length || 0;
    const baseSetupCost = 500;
    const nodeCost = nodeCount * 100;
    const setupCost = baseSetupCost + nodeCost;
    const monthlyCost = Math.max(50, nodeCount * 25);
    
    return {
      setupCost,
      monthlyCost,
      totalFirstMonth: setupCost + monthlyCost
    };
  };

  const pricing = calculatePricing();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields (Full Name, Email, Phone).');
      setStatus('error');
      return;
    }

    if (!formData.agreeToTerms) {
      setErrorMessage('Please agree to the terms and conditions.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/workflow-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflow: {
            id: workflow.id,
            name: workflow.name,
            description: workflow.description,
            nodes: workflow.nodes,
            connections: workflow.connections,
            status: workflow.status
          },
          customerInfo: {
            fullName: formData.fullName,
            email: formData.email,
            companyName: formData.companyName,
            phone: formData.phone,
            requirements: formData.requirements
          },
          pricing: {
            setupCost: pricing.setupCost,
            monthlyCost: pricing.monthlyCost,
            totalFirstMonth: pricing.totalFirstMonth
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process order.');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
      setStatus('error');
    }
  }, [formData, workflow, pricing, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Deploy Your Workflow</h2>
              <p className="text-gray-600 mt-1">Review your configuration and complete your order</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === 'success' ? (
            /* Success State */
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Workflow Deployed Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your workflow has been deployed and is now active. You'll receive a confirmation email shortly.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Check your email for setup instructions</li>
                  <li>• Access your workflow dashboard</li>
                  <li>• Monitor workflow performance</li>
                  <li>• Contact support if needed</li>
                </ul>
              </div>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            /* Order Form */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Workflow Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">{workflow.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nodes:</span>
                      <span className="font-medium">{workflow.nodes?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connections:</span>
                      <span className="font-medium">{workflow.connections?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{workflow.status}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Pricing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Setup Cost:</span>
                      <span className="font-medium">${pricing.setupCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monthly Subscription:</span>
                      <span className="font-medium">${pricing.monthlyCost.toLocaleString()}/month</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total First Month:</span>
                        <span>${pricing.totalFirstMonth.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Order</h3>
                
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Error:</span>
                    </div>
                    <p className="mt-1">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={3}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any specific requirements or customizations..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="/terms-of-service" className="text-blue-600 hover:underline" target="_blank">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline" target="_blank">
                        Privacy Policy
                      </a>
                      . I authorize the one-time setup charge of{' '}
                      <span className="font-semibold">${pricing.setupCost.toLocaleString()}</span> and a monthly
                      subscription of{' '}
                      <span className="font-semibold">${pricing.monthlyCost.toLocaleString()}</span>.
                    </label>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Order...
                        </>
                      ) : (
                        `Deploy & Pay - $${pricing.totalFirstMonth.toLocaleString()}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}