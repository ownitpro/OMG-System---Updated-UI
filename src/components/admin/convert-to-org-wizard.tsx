"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  UserIcon,
  CreditCardIcon,
  CogIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

interface DemoRequest {
  id: string;
  appSlug: string;
  industry: string | null;
  answers: any;
  bookedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lead: {
    id: string;
    contact: string | null;
    email: string | null;
    orgName: string | null;
    source: string | null;
  } | null;
}

interface ConvertToOrgWizardProps {
  demo: DemoRequest;
}

interface WizardData {
  // Step 1: Organization Details
  orgName: string;
  orgSlug: string;
  orgDescription: string;
  orgWebsite: string;
  orgIndustry: string;
  orgSize: string;
  
  // Step 2: Admin User
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  
  // Step 3: Billing
  billingEmail: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  
  // Step 4: Initial Project
  projectName: string;
  projectDescription: string;
  projectPriority: string;
  
  // Step 5: Welcome Email
  sendWelcomeEmail: boolean;
  emailTemplate: string;
  
  // Step 6: Review
  confirmData: boolean;
}

const steps = [
  { id: "org-details", name: "Organization Details", icon: BuildingOfficeIcon },
  { id: "admin-user", name: "Admin User", icon: UserIcon },
  { id: "billing", name: "Billing Information", icon: CreditCardIcon },
  { id: "project", name: "Initial Project", icon: CogIcon },
  { id: "email", name: "Welcome Email", icon: EnvelopeIcon },
  { id: "review", name: "Review & Create", icon: DocumentTextIcon },
];

export function ConvertToOrgWizard({ demo }: ConvertToOrgWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [data, setData] = useState<WizardData>({
    // Initialize with demo data
    orgName: demo.lead?.orgName || "",
    orgSlug: demo.lead?.orgName?.toLowerCase().replace(/[^a-z0-9]/g, '-') || "",
    orgDescription: "",
    orgWebsite: "",
    orgIndustry: demo.industry || "",
    orgSize: "",
    adminName: demo.lead?.contact || "",
    adminEmail: demo.lead?.email || "",
    adminPassword: "",
    billingEmail: demo.lead?.email || "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "US",
    projectName: `${demo.lead?.orgName || "New Organization"} Onboarding`,
    projectDescription: "Initial onboarding project created from demo request",
    projectPriority: "high",
    sendWelcomeEmail: true,
    emailTemplate: "default",
    confirmData: false,
  });

  const updateData = (updates: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/convert-demo-to-org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          demoId: demo.id,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create organization");
      }

      const result = await response.json();
      
      // Redirect to the new organization
      router.push(`/admin/orgs/${result.organization.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Organization Details
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Organization Details</h3>
              <p className="text-sm text-gray-500">Basic information about the new organization</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={data.orgName}
                  onChange={(e) => updateData({ orgName: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Slug *
                </label>
                <input
                  type="text"
                  value={data.orgSlug}
                  onChange={(e) => updateData({ orgSlug: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={data.orgDescription}
                  onChange={(e) => updateData({ orgDescription: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  value={data.orgWebsite}
                  onChange={(e) => updateData({ orgWebsite: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  value={data.orgIndustry}
                  onChange={(e) => updateData({ orgIndustry: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Construction">Construction</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  value={data.orgSize}
                  onChange={(e) => updateData({ orgSize: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 1: // Admin User
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Admin User</h3>
              <p className="text-sm text-gray-500">Create the administrator account for this organization</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={data.adminName}
                  onChange={(e) => updateData({ adminName: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={data.adminEmail}
                  onChange={(e) => updateData({ adminEmail: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  value={data.adminPassword}
                  onChange={(e) => updateData({ adminPassword: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Minimum 8 characters with letters and numbers
                </p>
              </div>
            </div>
          </div>
        );

      case 2: // Billing
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
              <p className="text-sm text-gray-500">Billing details for the organization</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Billing Email *
                </label>
                <input
                  type="email"
                  value={data.billingEmail}
                  onChange={(e) => updateData({ billingEmail: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Billing Address *
                </label>
                <input
                  type="text"
                  value={data.billingAddress}
                  onChange={(e) => updateData({ billingAddress: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  value={data.billingCity}
                  onChange={(e) => updateData({ billingCity: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State/Province *
                </label>
                <input
                  type="text"
                  value={data.billingState}
                  onChange={(e) => updateData({ billingState: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  value={data.billingZip}
                  onChange={(e) => updateData({ billingZip: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country *
                </label>
                <select
                  value={data.billingCountry}
                  onChange={(e) => updateData({ billingCountry: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3: // Initial Project
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Initial Project</h3>
              <p className="text-sm text-gray-500">Create an onboarding project to get started</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={data.projectName}
                  onChange={(e) => updateData({ projectName: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  value={data.projectDescription}
                  onChange={(e) => updateData({ projectDescription: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={data.projectPriority}
                  onChange={(e) => updateData({ projectPriority: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4: // Welcome Email
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Welcome Email</h3>
              <p className="text-sm text-gray-500">Send a welcome email to the new admin user</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sendWelcomeEmail"
                  checked={data.sendWelcomeEmail}
                  onChange={(e) => updateData({ sendWelcomeEmail: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sendWelcomeEmail" className="ml-2 block text-sm text-gray-900">
                  Send welcome email to {data.adminEmail}
                </label>
              </div>
              
              {data.sendWelcomeEmail && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Template
                  </label>
                  <select
                    value={data.emailTemplate}
                    onChange={(e) => updateData({ emailTemplate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="default">Default Welcome Template</option>
                    <option value="custom">Custom Template</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 5: // Review
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Review & Create</h3>
              <p className="text-sm text-gray-500">Review all information before creating the organization</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Organization Details</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Name:</dt>
                    <dd className="text-gray-900">{data.orgName}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Slug:</dt>
                    <dd className="text-gray-900">{data.orgSlug}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Industry:</dt>
                    <dd className="text-gray-900">{data.orgIndustry || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Size:</dt>
                    <dd className="text-gray-900">{data.orgSize || "Not specified"}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Admin User</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Name:</dt>
                    <dd className="text-gray-900">{data.adminName}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Email:</dt>
                    <dd className="text-gray-900">{data.adminEmail}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Initial Project</h4>
                <dl className="text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Name:</dt>
                    <dd className="text-gray-900">{data.projectName}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Priority:</dt>
                    <dd className="text-gray-900 capitalize">{data.projectPriority}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmData"
                checked={data.confirmData}
                onChange={(e) => updateData({ confirmData: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="confirmData" className="ml-2 block text-sm text-gray-900">
                I confirm that all information is correct and I want to create this organization
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => {
              const StepIcon = step.icon;
              const isActive = currentStep === stepIdx;
              const isCompleted = currentStep > stepIdx;
              
              return (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isCompleted ? "bg-blue-600" : isActive ? "bg-blue-600" : "bg-gray-300"
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        isActive ? "text-blue-600" : isCompleted ? "text-blue-600" : "text-gray-500"
                      }`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {stepIdx < steps.length - 1 && (
                    <div className="hidden sm:block ml-8 mr-8">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}
          
          {renderStepContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Previous
        </button>
        
        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Next
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!data.confirmData || isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Organization"}
            <CheckCircleIcon className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
