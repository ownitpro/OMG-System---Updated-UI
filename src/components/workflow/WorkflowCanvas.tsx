"use client";

import { useState } from "react";
import { WorkflowDefinition } from "@/data/workflow-definitions";
import { ModulePalette } from "./ModulePalette";
import { CanvasArea } from "./CanvasArea";
import { ConfigPanel } from "./ConfigPanel";
import { SummaryCard } from "./SummaryCard";

interface WorkflowCanvasProps {
  workflow: WorkflowDefinition;
  onComplete: (data: any) => void;
}

export function WorkflowCanvas({ workflow, onComplete }: WorkflowCanvasProps) {
  const [modules, setModules] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [configs, setConfigs] = useState<Record<string, any>>({});
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleModuleAdd = (moduleType: string) => {
    const newModule = {
      id: `${moduleType}_${Date.now()}`,
      type: moduleType,
      x: 100 + (modules.length * 150),
      y: 100 + (modules.length * 100)
    };
    setModules(prev => [...prev, newModule]);
  };

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    setIsConfigOpen(true);
  };

  const handleConfigSave = (moduleId: string, config: any) => {
    setConfigs(prev => ({ ...prev, [moduleId]: config }));
    setIsConfigOpen(false);
    setSelectedModule(null);
  };

  const handleConnectionCreate = (from: string, to: string) => {
    setConnections(prev => [...prev, { from, to, id: `${from}_${to}` }]);
  };

  const handleDeploy = () => {
    onComplete({
      workflow,
      modules,
      connections,
      configs,
      setupCost: workflow.setupCost,
      monthlyCost: workflow.monthlyCost
    });
  };

  if (showSummary) {
    return (
      <div className="h-screen bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Your Workflow</h2>
              <button
                onClick={() => setShowSummary(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Canvas
              </button>
            </div>
            
            <SummaryCard
              workflow={workflow}
              modules={modules}
              connections={connections}
              configs={configs}
            />
            
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setShowSummary(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Canvas
              </button>
              <button
                onClick={handleDeploy}
                className="px-6 py-3 bg-lime-600 text-white rounded-lg font-semibold hover:bg-lime-700 transition-colors"
              >
                🚀 Deploy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Module Palette */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Canvas Mode</h3>
            <p className="text-sm text-gray-600">
              Drag modules to the canvas and connect them to build your workflow
            </p>
          </div>
          
          <ModulePalette
            modules={workflow.defaultModules}
            onModuleAdd={handleModuleAdd}
          />
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Canvas Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Drag modules from the palette to the canvas</li>
              <li>• Click modules to configure them</li>
              <li>• Draw connections between modules</li>
              <li>• Use the review button to check your workflow</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Center Panel - Canvas */}
      <div className="flex-1 bg-gray-50 relative">
        <CanvasArea
          modules={modules}
          connections={connections}
          onModuleClick={handleModuleClick}
          onConnectionCreate={handleConnectionCreate}
        />
        
        {/* Canvas Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowSummary(true)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            📋 Review
          </button>
          <button
            onClick={handleDeploy}
            className="px-4 py-2 bg-lime-600 text-white rounded-lg shadow-sm hover:bg-lime-700 transition-colors"
          >
            🚀 Deploy
          </button>
        </div>
      </div>

      {/* Right Panel - Module Info */}
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Info</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current Workflow</h4>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">{workflow.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{workflow.name}</div>
                  <div className="text-sm text-gray-600">{workflow.description}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Modules Added</h4>
              <div className="space-y-2">
                {modules.length === 0 ? (
                  <p className="text-sm text-gray-500">No modules added yet</p>
                ) : (
                  modules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{module.type}</span>
                      <span className="text-xs text-gray-500">
                        {configs[module.id] ? 'Configured' : 'Not configured'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Connections</h4>
              <div className="space-y-1">
                {connections.length === 0 ? (
                  <p className="text-sm text-gray-500">No connections made yet</p>
                ) : (
                  connections.map((connection, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {connection.from} → {connection.to}
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Setup:</span>
                  <span className="font-medium">${workflow.setupCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly:</span>
                  <span className="font-medium">${workflow.monthlyCost}</span>
                </div>
                <div className="flex justify-between font-semibold text-lime-600 border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>${workflow.setupCost + workflow.monthlyCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Config Panel */}
      {isConfigOpen && selectedModule && (
        <ConfigPanel
          moduleId={selectedModule}
          module={modules.find(m => m.id === selectedModule)}
          config={configs[selectedModule] || {}}
          onSave={(config) => handleConfigSave(selectedModule, config)}
          onClose={() => {
            setIsConfigOpen(false);
            setSelectedModule(null);
          }}
        />
      )}
    </div>
  );
}