"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface EnhancedWorkflowBuilderProps {
  workflow: {
    id: string;
    name: string;
    description: string;
    painStatement: string;
    benefitStatement: string;
    icon: string;
    setupCost: number;
    monthlyCost: number;
    estimatedTime: string;
  };
  onBack: () => void;
  onComplete: (workflow: any) => void;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'trigger',
    title: 'Map Trigger & Source',
    description: 'Define what starts your automation',
    completed: false
  },
  {
    id: 'fields',
    title: 'Map Fields & Data',
    description: 'Configure data mapping and validation',
    completed: false
  },
  {
    id: 'logic',
    title: 'Define Workflow Logic',
    description: 'Set up actions and conditions',
    completed: false
  },
  {
    id: 'preview',
    title: 'Preview & Test',
    description: 'Test your automation before deployment',
    completed: false
  },
  {
    id: 'deploy',
    title: 'Configure & Deploy',
    description: 'Finalize settings and launch',
    completed: false
  }
];

export function EnhancedWorkflowBuilder({ workflow, onBack, onComplete }: EnhancedWorkflowBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(workflowSteps);

  const handleStepComplete = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'trigger':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Map Your Trigger</h3>
            <p className="text-gray-600">What event should start this automation?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Form Submission</h4>
                  <p className="text-sm text-gray-600">When someone fills out a form</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Email Received</h4>
                  <p className="text-sm text-gray-600">When an email arrives</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Scheduled Time</h4>
                  <p className="text-sm text-gray-600">At a specific time or interval</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">File Upload</h4>
                  <p className="text-sm text-gray-600">When a file is uploaded</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'fields':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Map Your Data Fields</h3>
            <p className="text-gray-600">Configure how data flows through your automation</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Field Mapping</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm font-medium">Customer Name</div>
                  <div className="flex-1 h-8 bg-white border rounded px-3 flex items-center">form.name</div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  <div className="w-32 text-sm font-medium">CRM Contact</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm font-medium">Email Address</div>
                  <div className="flex-1 h-8 bg-white border rounded px-3 flex items-center">form.email</div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  <div className="w-32 text-sm font-medium">CRM Email</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 text-sm font-medium">Phone Number</div>
                  <div className="flex-1 h-8 bg-white border rounded px-3 flex items-center">form.phone</div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                  <div className="w-32 text-sm font-medium">CRM Phone</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logic':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Define Your Workflow Logic</h3>
            <p className="text-gray-600">Set up the actions and conditions for your automation</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Workflow Steps</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div className="flex-1">Trigger: Form submission received</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div className="flex-1">Action: Validate email format</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div className="flex-1">Action: Create CRM contact</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div className="flex-1">Action: Send welcome email</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div className="flex-1">Action: Notify sales team</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Preview & Test Your Workflow</h3>
            <p className="text-gray-600">Test your automation with sample data before going live</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <input type="text" defaultValue="John Doe" className="w-full mt-1 px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input type="email" defaultValue="john@example.com" className="w-full mt-1 px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <input type="tel" defaultValue="(555) 987-6543" className="w-full mt-1 px-3 py-2 border rounded" />
                    </div>
                    <Button className="w-full">Run Test</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckIcon className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Email validation passed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckIcon className="h-5 w-5 text-green-600" />
                      <span className="text-sm">CRM contact created</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckIcon className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Welcome email sent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckIcon className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Sales team notified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'deploy':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Configure & Deploy</h3>
            <p className="text-gray-600">Finalize your settings and launch your automation</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Workflow Name</label>
                    <input type="text" defaultValue={workflow.name} className="w-full mt-1 px-3 py-2 border rounded" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea defaultValue={workflow.description} className="w-full mt-1 px-3 py-2 border rounded" rows={3} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notifications" defaultChecked />
                    <label htmlFor="notifications" className="text-sm">Enable notifications</label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Setup Cost</span>
                      <span className="font-semibold">${workflow.setupCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Subscription</span>
                      <span className="font-semibold">${workflow.monthlyCost}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total First Month</span>
                        <span>${workflow.setupCost + workflow.monthlyCost}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{workflow.name}</h1>
          <p className="text-gray-600">{workflow.description}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < currentStep ? 'bg-green-600 text-white' :
                  index === currentStep ? 'bg-blue-600 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {index < currentStep ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex space-x-4">
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={() => onComplete(workflow)}
                className="bg-green-600 hover:bg-green-700"
              >
                Deploy Workflow
                <CheckIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}