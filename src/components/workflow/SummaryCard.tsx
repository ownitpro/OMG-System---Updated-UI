"use client";

import { WorkflowDefinition } from "@/data/workflow-definitions";

interface SummaryCardProps {
  workflow: WorkflowDefinition;
  modules: any[];
  connections: any[];
  configs: Record<string, any>;
}

export function SummaryCard({ workflow, modules, connections, configs }: SummaryCardProps) {
  const moduleInfo = {
    trigger: { name: 'Trigger', icon: '⚡' },
    spreadsheet: { name: 'Spreadsheet', icon: '📊' },
    email: { name: 'Email', icon: '📧' },
    sms: { name: 'SMS', icon: '📱' },
    webhook: { name: 'Webhook', icon: '🔗' },
    delay: { name: 'Delay', icon: '⏰' },
    condition: { name: 'Condition', icon: '❓' },
    notification: { name: 'Notification', icon: '🔔' },
    database: { name: 'Database', icon: '🗄️' },
    calendar: { name: 'Calendar', icon: '📅' }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">{workflow.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{workflow.name}</h3>
            <p className="text-gray-600">{workflow.description}</p>
          </div>
        </div>

        {/* Pain & Benefit Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <h4 className="font-semibold text-red-800 mb-2">Problem Solved:</h4>
            <p className="text-red-700 text-sm">{workflow.pain}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-800 mb-2">Solution Delivered:</h4>
            <p className="text-green-700 text-sm">{workflow.benefit}</p>
          </div>
        </div>
      </div>

      {/* Modules Used */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Modules in Your Workflow</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.map((module, index) => {
            const info = moduleInfo[module.type as keyof typeof moduleInfo];
            if (!info) return null;

            return (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-xl mr-3">{info.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{info.name}</div>
                  <div className="text-xs text-gray-600">
                    {configs[module.id] ? 'Configured' : 'Not configured'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flow Connections */}
      {connections.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Workflow Flow</h4>
          <div className="space-y-2">
            {connections.map((connection, index) => {
              const fromModule = modules.find(m => m.id === connection.from);
              const toModule = modules.find(m => m.id === connection.to);
              
              if (!fromModule || !toModule) return null;

              const fromInfo = moduleInfo[fromModule.type as keyof typeof moduleInfo];
              const toInfo = moduleInfo[toModule.type as keyof typeof moduleInfo];

              return (
                <div key={index} className="flex items-center text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">{fromInfo?.icon}</span>
                    <span className="font-medium">{fromInfo?.name}</span>
                  </div>
                  <div className="mx-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{toInfo?.icon}</span>
                    <span className="font-medium">{toInfo?.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pricing Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">One-time setup cost</span>
            <span className="text-lg font-bold text-gray-900">${workflow.setupCost}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monthly subscription</span>
            <span className="text-lg font-bold text-gray-900">${workflow.monthlyCost}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total first month</span>
              <span className="text-xl font-bold text-lime-600">
                ${workflow.setupCost + workflow.monthlyCost}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-lime-50 border border-lime-200 rounded-lg">
          <p className="text-sm text-lime-800">
            ✅ <strong>What's included:</strong> Full setup, integration, testing, and 30 days of support
          </p>
        </div>
      </div>

      {/* Deployment Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Deployment Timeline</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-lime-600 font-bold text-sm">1</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Payment & Setup (Today)</div>
              <div className="text-sm text-gray-600">We'll start building your automation immediately</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-600 font-bold text-sm">2</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Development & Testing ({workflow.estimatedTime})</div>
              <div className="text-sm text-gray-600">We'll build, integrate, and test your automation</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-600 font-bold text-sm">3</span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Go Live & Training</div>
              <div className="text-sm text-gray-600">We'll deploy your automation and train your team</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
