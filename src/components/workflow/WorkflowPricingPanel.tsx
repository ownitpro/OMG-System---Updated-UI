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

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  setupCost: number;
  monthlyCost: number;
  setupTime: string;
}

interface WorkflowPricingPanelProps {
  workflow: WorkflowInstance | null;
  template: WorkflowTemplate | null;
  simulationResults: any;
  onOrder: () => void;
  mode: 'wizard' | 'canvas';
  currentStep?: number;
}

export function WorkflowPricingPanel({
  workflow,
  template,
  simulationResults,
  onOrder,
  mode,
  currentStep = 0
}: WorkflowPricingPanelProps) {
  const [showDetails, setShowDetails] = useState(false);

  const calculatePricing = () => {
    if (template) {
      return {
        setupCost: template.setupCost,
        monthlyCost: template.monthlyCost,
        totalFirstMonth: template.setupCost + template.monthlyCost
      };
    }

    // Calculate pricing based on workflow complexity
    const nodeCount = workflow?.nodes?.length || 0;
    const connectionCount = workflow?.connections?.length || 0;
    
    const baseSetupCost = 500;
    const nodeCost = nodeCount * 100;
    const connectionCost = connectionCount * 50;
    
    const setupCost = baseSetupCost + nodeCost + connectionCost;
    const monthlyCost = Math.max(50, nodeCount * 25);
    
    return {
      setupCost,
      monthlyCost,
      totalFirstMonth: setupCost + monthlyCost
    };
  };

  const pricing = calculatePricing();

  const getWorkflowStatus = () => {
    if (!workflow) return 'No workflow';
    return workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1);
  };

  const getValidationErrors = () => {
    if (!workflow) return ['No workflow created'];
    
    const errors: string[] = [];
    
    // Check for trigger node
    const hasTrigger = workflow.nodes?.some(node => node.type === 'trigger');
    if (!hasTrigger) errors.push('Missing trigger node');
    
    // Check for end node
    const hasEnd = workflow.nodes?.some(node => node.type === 'end');
    if (!hasEnd) errors.push('Missing end node');
    
    // Check for connections
    if (!workflow.connections?.length) errors.push('No connections between nodes');
    
    // Check node configurations
    workflow.nodes?.forEach(node => {
      if (node.type === 'trigger' && !node.config.triggerType) {
        errors.push(`Trigger node "${node.title}" not configured`);
      }
      if (node.type === 'action' && !node.config.actionType) {
        errors.push(`Action node "${node.title}" not configured`);
      }
    });
    
    return errors;
  };

  const validationErrors = getValidationErrors();
  const canOrder = validationErrors.length === 0 && workflow?.status === 'tested';

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Workflow Summary</h3>
        <p className="text-sm text-gray-600 mt-1">
          {mode === 'wizard' ? 'Guided Setup' : 'Visual Builder'}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Workflow Status */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              workflow?.status === 'ready' ? 'bg-green-100 text-green-800' :
              workflow?.status === 'tested' ? 'bg-blue-100 text-blue-800' :
              workflow?.status === 'configured' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {getWorkflowStatus()}
            </span>
          </div>
          
          {workflow && (
            <div className="text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Nodes:</span>
                <span>{workflow.nodes?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Connections:</span>
                <span>{workflow.connections?.length || 0}</span>
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Pricing</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Setup Cost:</span>
              <span className="font-medium">${pricing.setupCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly:</span>
              <span className="font-medium">${pricing.monthlyCost.toLocaleString()}/month</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span>First Month:</span>
                <span>${pricing.totalFirstMonth.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
          >
            {showDetails ? 'Hide' : 'Show'} pricing details
          </button>
          
          {showDetails && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <p className="mb-2">Pricing includes:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Initial setup and configuration</li>
                <li>Integration with your systems</li>
                <li>Testing and validation</li>
                <li>Monthly monitoring and support</li>
                <li>Usage up to base limits</li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                Overage charges apply for usage beyond base limits.
              </p>
            </div>
          )}
        </div>

        {/* Simulation Results */}
        {simulationResults && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Test Results</h4>
            <div className={`p-3 rounded-lg ${
              simulationResults.status === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  simulationResults.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm font-medium">
                  {simulationResults.status === 'success' ? 'Test Passed' : 'Test Failed'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{simulationResults.message}</p>
              
              {simulationResults.log && (
                <div className="space-y-1">
                  {simulationResults.log.map((logEntry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        logEntry.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-gray-600">
                        {logEntry.nodeId}: {logEntry.output}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-red-900 mb-3">Issues to Fix</h4>
            <div className="space-y-2">
              {validationErrors.map((error, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-red-700">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Progress */}
        {mode === 'wizard' && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Progress</h4>
            <div className="space-y-2">
              {[
                { step: 1, title: 'Choose Trigger', completed: currentStep > 0 },
                { step: 2, title: 'Connect Data Source', completed: currentStep > 1 },
                { step: 3, title: 'Map to CRM', completed: currentStep > 2 },
                { step: 4, title: 'Add Conditions', completed: currentStep > 3 },
                { step: 5, title: 'Test Workflow', completed: currentStep > 4 },
                { step: 6, title: 'Review & Deploy', completed: currentStep > 5 }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                    item.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.completed ? '✓' : item.step}
                  </div>
                  <span className={`text-sm ${
                    item.completed ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow Preview */}
        {workflow && (
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Workflow Preview</h4>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{workflow.name}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Description:</span>
                <span className="ml-2">{workflow.description}</span>
              </div>
              {template && (
                <div className="text-sm">
                  <span className="text-gray-600">Template:</span>
                  <span className="ml-2">{template.name}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200">
        {canOrder ? (
          <button
            onClick={onOrder}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Deploy & Pay - ${pricing.totalFirstMonth.toLocaleString()}
          </button>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {validationErrors.length > 0 
                ? 'Fix issues above to continue'
                : 'Complete your workflow to deploy'
              }
            </p>
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Deploy Workflow
            </button>
          </div>
        )}
      </div>
    </div>
  );
}