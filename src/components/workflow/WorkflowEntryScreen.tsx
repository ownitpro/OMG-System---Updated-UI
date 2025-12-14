"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  painStatement: string;
  benefitStatement: string;
  icon: string;
  setupCost: number;
  monthlyCost: number;
  estimatedTime: string;
}

interface WorkflowEntryScreenProps {
  onSelectWorkflow: (workflow: WorkflowTemplate) => void;
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'lead-capture',
    name: 'Lead Capture Automation',
    description: 'Automatically capture and qualify leads from multiple sources',
    painStatement: 'Missing leads and slow response times',
    benefitStatement: 'Capture 3x more leads with instant follow-up',
    icon: '📧',
    setupCost: 299,
    monthlyCost: 99,
    estimatedTime: '2-3 weeks'
  },
  {
    id: 'invoice-processing',
    name: 'Invoice Processing',
    description: 'Automate invoice creation, sending, and payment tracking',
    painStatement: 'Manual invoice processing takes hours',
    benefitStatement: 'Process invoices 10x faster with automation',
    icon: '📄',
    setupCost: 399,
    monthlyCost: 149,
    estimatedTime: '3-4 weeks'
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    description: 'Streamline new customer setup and welcome sequences',
    painStatement: 'Inconsistent onboarding experience',
    benefitStatement: 'Deliver consistent, professional onboarding',
    icon: '🚀',
    setupCost: 249,
    monthlyCost: 79,
    estimatedTime: '2-3 weeks'
  },
  {
    id: 'inventory-management',
    name: 'Inventory Management',
    description: 'Track inventory levels and automate reordering',
    painStatement: 'Stockouts and overstocking issues',
    benefitStatement: 'Optimize inventory with smart automation',
    icon: '📦',
    setupCost: 349,
    monthlyCost: 129,
    estimatedTime: '3-4 weeks'
  },
  {
    id: 'appointment-scheduling',
    name: 'Appointment Scheduling',
    description: 'Automate booking, reminders, and follow-ups',
    painStatement: 'Missed appointments and scheduling conflicts',
    benefitStatement: 'Reduce no-shows by 80% with smart scheduling',
    icon: '📅',
    setupCost: 199,
    monthlyCost: 69,
    estimatedTime: '1-2 weeks'
  },
  {
    id: 'document-management',
    name: 'Document Management',
    description: 'Organize, store, and retrieve documents automatically',
    painStatement: 'Lost documents and time searching',
    benefitStatement: 'Find any document in seconds',
    icon: '📁',
    setupCost: 299,
    monthlyCost: 99,
    estimatedTime: '2-3 weeks'
  }
];

export function WorkflowEntryScreen({ onSelectWorkflow }: WorkflowEntryScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Automation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a workflow template to get started, or build a custom automation from scratch.
          </p>
        </div>

        {/* Workflow Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workflowTemplates.map((workflow) => (
            <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{workflow.icon}</div>
                <CardTitle className="text-xl">{workflow.name}</CardTitle>
                <p className="text-gray-600">{workflow.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Pain Statement */}
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">Current Pain:</p>
                  <p className="text-sm text-red-700">{workflow.painStatement}</p>
                </div>

                {/* Benefit Statement */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">After Automation:</p>
                  <p className="text-sm text-green-700">{workflow.benefitStatement}</p>
                </div>

                {/* Pricing */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Setup Cost:</span>
                    <span className="font-semibold">${workflow.setupCost}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Monthly:</span>
                    <span className="font-semibold">${workflow.monthlyCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Timeline:</span>
                    <span className="text-sm font-medium text-blue-600">{workflow.estimatedTime}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => onSelectWorkflow(workflow)}
                  className="w-full group-hover:bg-blue-700 transition-colors"
                >
                  Start Building This Workflow
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Workflow Option */}
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Build Custom Workflow</CardTitle>
              <p className="text-gray-600">Start from scratch with our drag-and-drop builder</p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => onSelectWorkflow({
                  id: 'custom',
                  name: 'Custom Workflow',
                  description: 'Build your own automation from scratch',
                  painStatement: 'Need a custom solution',
                  benefitStatement: 'Tailored to your exact needs',
                  icon: '⚙️',
                  setupCost: 499,
                  monthlyCost: 199,
                  estimatedTime: '4-6 weeks'
                })}
                variant="outline"
                className="w-full"
              >
                <PlayIcon className="mr-2 h-4 w-4" />
                Start Custom Build
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}