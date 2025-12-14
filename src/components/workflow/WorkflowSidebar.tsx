"use client";

import { useState } from 'react';
import { workflowTemplates, nodeTypes, categories } from "@/data/workflow-templates";

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

interface NodeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
}

interface WorkflowSidebarProps {
  templates: WorkflowTemplate[];
  nodeTypes: NodeType[];
  onTemplateSelect: (templateId: string) => void;
  onAddNode: (nodeType: string, position: { x: number; y: number }) => void;
  selectedTemplate: string | null;
}

export function WorkflowSidebar({ 
  templates, 
  nodeTypes, 
  onTemplateSelect, 
  onAddNode,
  selectedTemplate 
}: WorkflowSidebarProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'nodes'>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredNodeTypes = nodeTypes.filter(nodeType => {
    const matchesSearch = nodeType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nodeType.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || nodeType.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNodeDrag = (nodeType: string, event: React.DragEvent) => {
    event.dataTransfer.setData('application/json', JSON.stringify({ nodeType }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Workflow Builder</h2>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'templates'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('nodes')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'nodes'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Nodes
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'templates' ? (
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Workflow Templates</h3>
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => onTemplateSelect(template.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {template.setupTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-green-600">
                        ${template.setupCost}
                      </span>
                      <span className="text-xs text-gray-500">
                        + ${template.monthlyCost}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Node Types</h3>
            <p className="text-xs text-gray-500 mb-4">
              Drag nodes to the canvas to build your workflow
            </p>
            {filteredNodeTypes.map(nodeType => (
              <div
                key={nodeType.id}
                draggable
                onDragStart={(e) => handleNodeDrag(nodeType.id, e)}
                className="p-3 border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{nodeType.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {nodeType.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {nodeType.description}
                    </p>
                    <span className={`inline-block text-xs px-2 py-1 rounded mt-1 ${nodeType.color}`}>
                      {nodeType.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <p>💡 <strong>Tip:</strong> Start with a template, then customize with additional nodes</p>
        </div>
      </div>
    </div>
  );
}