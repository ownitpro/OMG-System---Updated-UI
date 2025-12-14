"use client";

import { useState, useCallback, useEffect } from 'react';
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { WorkflowSidebar } from "./WorkflowSidebar";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { WorkflowPricingPanel } from "./WorkflowPricingPanel";
import { WorkflowOrderModal } from "./WorkflowOrderModal";
import { WorkflowWizard } from "./WorkflowWizard";
import { workflowTemplates, nodeTypes } from "@/data/workflow-templates";

interface WorkflowNode {
  id: string;
  type: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  config: { [key: string]: any };
  status?: 'idle' | 'running' | 'completed' | 'error';
  output?: any;
  pain?: string;
  solution?: string;
}

interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface WorkflowInstance {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  status: 'draft' | 'configured' | 'tested' | 'ready';
  templateId?: string;
}

export function WorkflowBuilder() {
  const [currentWorkflow, setCurrentWorkflow] = useState<WorkflowInstance | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [mode, setMode] = useState<'wizard' | 'canvas'>('wizard');
  const [wizardStep, setWizardStep] = useState(0);
  const [draftId, setDraftId] = useState<string | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('workflow-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setCurrentWorkflow(draft.workflow);
        setSelectedTemplate(draft.templateId);
        setMode(draft.mode || 'wizard');
        setWizardStep(draft.wizardStep || 0);
        setDraftId(draft.draftId);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage whenever workflow changes
  useEffect(() => {
    if (currentWorkflow) {
      const draftData = {
        workflow: currentWorkflow,
        templateId: selectedTemplate,
        mode,
        wizardStep,
        draftId: draftId || `draft-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('workflow-draft', JSON.stringify(draftData));
      if (!draftId) {
        setDraftId(draftData.draftId);
      }
    }
  }, [currentWorkflow, selectedTemplate, mode, wizardStep, draftId]);

  const handleTemplateSelect = useCallback((templateId: string) => {
    const template = workflowTemplates.find(t => t.id === templateId);
    if (!template) return;

    const workflow: WorkflowInstance = {
      id: `workflow-${Date.now()}`,
      name: template.name,
      description: template.description,
      nodes: template.nodes.map(node => ({
        ...node,
        id: `${node.id}-${Date.now()}`
      })),
      connections: template.connections.map(conn => ({
        id: `conn-${Date.now()}-${Math.random()}`,
        ...conn
      })),
      status: 'draft',
      templateId: template.id
    };

    setCurrentWorkflow(workflow);
    setSelectedTemplate(templateId);
    setWizardStep(0);
  }, []);

  const handleNodeUpdate = useCallback((nodeId: string, updates: Partial<WorkflowNode>) => {
    if (!currentWorkflow) return;

    setCurrentWorkflow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        nodes: prev.nodes.map(node => 
          node.id === nodeId ? { ...node, ...updates } : node
        )
      };
    });
  }, [currentWorkflow]);

  const handleConnectionUpdate = useCallback((connectionId: string, updates: Partial<WorkflowConnection>) => {
    if (!currentWorkflow) return;

    setCurrentWorkflow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        connections: prev.connections.map(conn => 
          conn.id === connectionId ? { ...conn, ...updates } : conn
        )
      };
    });
  }, [currentWorkflow]);

  const handleAddNode = useCallback((nodeType: string, position: { x: number; y: number }) => {
    if (!currentWorkflow) return;

    const nodeTemplate = nodeTypes.find(nt => nt.id === nodeType);
    if (!nodeTemplate) return;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}-${Math.random()}`,
      type: nodeType,
      title: nodeTemplate.name,
      description: nodeTemplate.description,
      icon: nodeTemplate.icon,
      color: nodeTemplate.color,
      position,
      config: {},
      inputs: [],
      outputs: []
    };

    setCurrentWorkflow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        nodes: [...prev.nodes, newNode]
      };
    });
  }, [currentWorkflow]);

  const handleRemoveNode = useCallback((nodeId: string) => {
    if (!currentWorkflow) return;

    setCurrentWorkflow(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        nodes: prev.nodes.filter(node => node.id !== nodeId),
        connections: prev.connections.filter(conn => 
          conn.from !== nodeId && conn.to !== nodeId
        )
      };
    });
  }, [currentWorkflow]);

  const handleSimulate = useCallback(async () => {
    if (!currentWorkflow) return;

    // Simulate workflow execution
    const results = {
      status: 'success',
      steps: currentWorkflow.nodes.map(node => ({
        id: node.id,
        title: node.title,
        status: 'completed',
        duration: Math.random() * 1000 + 500
      })),
      totalDuration: 2000,
      warnings: []
    };

    setSimulationResults(results);
    setCurrentWorkflow(prev => prev ? { ...prev, status: 'tested' } : null);
  }, [currentWorkflow]);

  const handleOrder = useCallback(() => {
    setIsOrderModalOpen(true);
  }, []);

  const handleOrderComplete = useCallback(() => {
    setIsOrderModalOpen(false);
    setCurrentWorkflow(prev => prev ? { ...prev, status: 'ready' } : null);
  }, []);

  const handleModeSwitch = useCallback((newMode: 'wizard' | 'canvas') => {
    setMode(newMode);
    if (newMode === 'wizard' && currentWorkflow) {
      // Convert canvas workflow to wizard steps
      setWizardStep(0);
    }
  }, [currentWorkflow]);

  const handleWizardStepChange = useCallback((step: number) => {
    setWizardStep(step);
  }, []);

  const handleWizardComplete = useCallback(() => {
    if (currentWorkflow) {
      setCurrentWorkflow(prev => prev ? { ...prev, status: 'configured' } : null);
    }
  }, [currentWorkflow]);

  const handleReset = useCallback(() => {
    setCurrentWorkflow(null);
    setSelectedTemplate(null);
    setSimulationResults(null);
    setWizardStep(0);
    setDraftId(null);
    localStorage.removeItem('workflow-draft');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Section className="bg-white border-b border-gray-200">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Builder</h1>
              <p className="text-gray-600">
                {mode === 'wizard' 
                  ? 'Guided step-by-step workflow creation' 
                  : 'Visual drag-and-drop workflow designer'
                }
              </p>
            </div>
            <div className="flex gap-3">
              {/* Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleModeSwitch('wizard')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    mode === 'wizard'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Guided Wizard
                </button>
                <button
                  onClick={() => handleModeSwitch('canvas')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    mode === 'canvas'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Visual Builder
                </button>
              </div>
              
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
              {currentWorkflow && (
                <button
                  onClick={handleSimulate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simulate
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Builder Interface */}
      <div className="flex h-[calc(100vh-120px)]">
        {mode === 'wizard' ? (
          /* Wizard Mode */
          <div className="flex-1 flex">
            {/* Wizard Content */}
            <div className="flex-1 bg-gray-100 relative">
              <WorkflowWizard
                workflow={currentWorkflow}
                template={selectedTemplate ? workflowTemplates.find(t => t.id === selectedTemplate) : null}
                currentStep={wizardStep}
                onStepChange={handleWizardStepChange}
                onWorkflowUpdate={setCurrentWorkflow}
                onComplete={handleWizardComplete}
                onTemplateSelect={handleTemplateSelect}
                templates={workflowTemplates}
              />
            </div>
            
            {/* Right Panel - Pricing & Summary */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
              <WorkflowPricingPanel
                workflow={currentWorkflow}
                template={selectedTemplate ? workflowTemplates.find(t => t.id === selectedTemplate) : null}
                simulationResults={simulationResults}
                onOrder={handleOrder}
                mode="wizard"
                currentStep={wizardStep}
              />
            </div>
          </div>
        ) : (
          /* Canvas Mode */
          <>
            {/* Left Sidebar - Templates */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <WorkflowSidebar
                templates={workflowTemplates}
                nodeTypes={nodeTypes}
                onTemplateSelect={handleTemplateSelect}
                onAddNode={handleAddNode}
                selectedTemplate={selectedTemplate}
              />
            </div>

            {/* Main Canvas */}
            <div className="flex-1 bg-gray-100 relative">
              <WorkflowCanvas
                workflow={currentWorkflow}
                onNodeUpdate={handleNodeUpdate}
                onConnectionUpdate={handleConnectionUpdate}
                onRemoveNode={handleRemoveNode}
                simulationResults={simulationResults}
              />
            </div>

            {/* Right Panel - Pricing & Summary */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
              <WorkflowPricingPanel
                workflow={currentWorkflow}
                template={selectedTemplate ? workflowTemplates.find(t => t.id === selectedTemplate) : null}
                simulationResults={simulationResults}
                onOrder={handleOrder}
                mode="canvas"
              />
            </div>
          </>
        )}
      </div>

      {/* Order Modal */}
      {isOrderModalOpen && currentWorkflow && (
        <WorkflowOrderModal
          workflow={currentWorkflow}
          onClose={() => setIsOrderModalOpen(false)}
          onComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}