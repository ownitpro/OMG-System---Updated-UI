"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlayIcon, 
  PauseIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  BellIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightIcon,
  BoltIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  BeakerIcon,
  StarIcon,
  ArrowPathIcon,
  TagIcon,
  ExclamationCircleIcon,
  TicketIcon
} from '@heroicons/react/24/outline';

// Import automation data
import { automations, categories, industries } from '@/data/automations';

// Workflow template interface
interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  steps: WorkflowStep[];
  setupCost: number;
  monthlyCost: number;
  setupTime: string;
  pain: string;
  benefit: string;
  features: string[];
}

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'end';
  title: string;
  description: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
  inputs: WorkflowInput[];
}

interface WorkflowInput {
  id: string;
  label: string;
  type: 'text' | 'email' | 'url' | 'select';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

// Convert automations to workflow templates
const workflowTemplates: WorkflowTemplate[] = automations.map((automation, index) => {
  const iconMap: { [key: string]: any } = {
    "💰": CurrencyDollarIcon,
    "📝": DocumentTextIcon,
    "🤖": CogIcon,
    "📊": ChartBarIcon,
    "📁": DocumentCheckIcon,
    "📋": ClipboardDocumentListIcon,
    "⭐": StarIcon,
    "💬": ChatBubbleLeftRightIcon,
    "✅": CheckCircleIcon,
    "📧": EnvelopeIcon,
    "🔍": LightBulbIcon,
    "🔄": ArrowPathIcon,
    "🎫": TicketIcon
  };

  const colorMap: { [key: string]: string } = {
    "Finance": "bg-green-500",
    "Communication": "bg-blue-500", 
    "CRM": "bg-purple-500",
    "Data Management": "bg-indigo-500",
    "Document Management": "bg-orange-500",
    "Contract Management": "bg-yellow-500",
    "Customer Experience": "bg-pink-500",
    "Team Communication": "bg-cyan-500",
    "Workflow": "bg-red-500",
    "Client Communication": "bg-teal-500",
    "Lead Management": "bg-emerald-500",
    "Retention": "bg-violet-500",
    "Support": "bg-rose-500"
  };

  return {
    id: automation.slug,
    title: automation.title,
    description: automation.benefit,
    category: automation.category,
    icon: iconMap[automation.icon] || CogIcon,
    color: colorMap[automation.category] || "bg-gray-500",
    setupCost: automation.setupCost,
    monthlyCost: automation.monthlyCost,
    setupTime: automation.setupTime,
    pain: automation.pain,
    benefit: automation.benefit,
    features: automation.features,
    steps: generateWorkflowSteps(automation)
  };
});

function generateWorkflowSteps(automation: any): WorkflowStep[] {
  const baseSteps: WorkflowStep[] = [
    {
      id: 'trigger',
      type: 'trigger',
      title: 'Trigger Event',
      description: 'What starts this workflow?',
      icon: BoltIcon,
      color: 'bg-blue-500',
      position: { x: 50, y: 100 },
      inputs: [
        { id: 'trigger_type', label: 'Trigger Type', type: 'select', required: true, options: ['Email Received', 'Form Submitted', 'Time Based', 'Manual'] }
      ]
    },
    {
      id: 'condition',
      type: 'condition',
      title: 'Check Conditions',
      description: 'Apply business rules',
      icon: ExclamationTriangleIcon,
      color: 'bg-yellow-500',
      position: { x: 300, y: 100 },
      inputs: [
        { id: 'condition_field', label: 'Field to Check', type: 'text', required: true, placeholder: 'e.g., email subject, amount, status' }
      ]
    },
    {
      id: 'action',
      type: 'action',
      title: 'Take Action',
      description: 'Execute the automation',
      icon: RocketLaunchIcon,
      color: 'bg-green-500',
      position: { x: 550, y: 100 },
      inputs: [
        { id: 'action_type', label: 'Action Type', type: 'select', required: true, options: ['Send Email', 'Create Task', 'Update CRM', 'Generate Report'] }
      ]
    },
    {
      id: 'end',
      type: 'end',
      title: 'Complete',
      description: 'Workflow finished',
      icon: CheckCircleIcon,
      color: 'bg-gray-500',
      position: { x: 800, y: 100 },
      inputs: []
    }
  ];

  return baseSteps;
}

export default function InteractiveWorkflowBuilderPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isReadyToCheckout, setIsReadyToCheckout] = useState(false);

  // Filter templates by category
  const filteredTemplates = selectedCategory === 'All' 
    ? workflowTemplates 
    : workflowTemplates.filter(template => template.category === selectedCategory);

  // Handle template selection
  const handleTemplateSelect = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setIsReadyToCheckout(false);
    setFormData({});
  };

  // Handle form input changes
  const handleInputChange = (stepId: string, inputId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [`${stepId}_${inputId}`]: value
    }));
  };

  // Run workflow simulation
  const runSimulation = () => {
    if (!selectedTemplate) return;
    
    setIsSimulating(true);
    setSimulationStep(0);
    setActiveConnections([]);

    // Animate through each step
    const stepInterval = setInterval(() => {
      setSimulationStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= selectedTemplate.steps.length) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          setIsReadyToCheckout(true);
          return prev;
        }
        
        // Activate connection to next step
        setActiveConnections(prev => [...prev, `connection-${prev.length}`]);
        return nextStep;
      });
    }, 1500);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!selectedTemplate) return;
    
    // Store selected template and form data in session storage
    sessionStorage.setItem('selectedWorkflow', JSON.stringify({
      template: selectedTemplate,
      formData: formData
    }));
    
    // Navigate to checkout page
    router.push('/workflow-builder/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Interactive Workflow Builder
                </h1>
                <p className="text-blue-200 text-lg">
                  Select, customize, simulate, and deploy powerful automations
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {selectedTemplate && (
                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSimulating 
                        ? 'bg-orange-500 text-white cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isSimulating ? (
                      <>
                        <PauseIcon className="w-5 h-5 animate-spin" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-5 h-5" />
                        <span>Run Simulation</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Side - Workflow Template Library */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sticky top-8">
                <h3 className="text-xl font-bold text-white mb-4">Workflow Templates</h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Template List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedTemplate?.id === template.id
                          ? 'bg-white/30 scale-105 shadow-lg'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center`}>
                          <template.icon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-white font-semibold text-sm">{template.title}</h4>
                      </div>
                      <p className="text-blue-200 text-xs mb-2">{template.description}</p>
                      <div className="flex items-center justify-between text-xs text-blue-300">
                        <span>{template.setupTime}</span>
                        <span>${template.setupCost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Workflow Canvas */}
            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 min-h-[600px]">
                {selectedTemplate ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">{selectedTemplate.title}</h3>
                        <p className="text-blue-200">{selectedTemplate.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Ready to simulate</span>
                      </div>
                    </div>

                    {/* Workflow Canvas */}
                    <div className="relative bg-white/5 rounded-xl p-6 min-h-[400px]">
                      <svg className="w-full h-full absolute inset-0" viewBox="0 0 900 300">
                        {/* Connection Lines */}
                        {selectedTemplate.steps.map((step, index) => {
                          if (index < selectedTemplate.steps.length - 1) {
                            const currentStep = selectedTemplate.steps[index];
                            const nextStep = selectedTemplate.steps[index + 1];
                            const isActive = activeConnections.includes(`connection-${index}`);
                            
                            return (
                              <line
                                key={`connection-${index}`}
                                x1={currentStep.position.x + 100}
                                y1={currentStep.position.y + 50}
                                x2={nextStep.position.x}
                                y2={nextStep.position.y + 50}
                                stroke={isActive ? "#10B981" : "#3B82F6"}
                                strokeWidth={isActive ? "4" : "2"}
                                markerEnd="url(#arrowhead)"
                                className={isActive ? "animate-pulse" : ""}
                              />
                            );
                          }
                          return null;
                        })}
                        
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                          </marker>
                        </defs>
                      </svg>

                      {/* Workflow Steps */}
                      {selectedTemplate.steps.map((step, index) => {
                        const isActive = simulationStep >= index;
                        const isCurrent = simulationStep === index;
                        
                        return (
                          <div
                            key={step.id}
                            className={`absolute p-4 rounded-xl border-2 transition-all duration-500 ${
                              isCurrent 
                                ? 'bg-green-500/30 border-green-400 scale-110 shadow-lg' 
                                : isActive 
                                  ? 'bg-blue-500/30 border-blue-400' 
                                  : 'bg-white/10 border-white/30'
                            }`}
                            style={{
                              left: step.position.x,
                              top: step.position.y,
                              width: '180px'
                            }}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center`}>
                                <step.icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold text-sm">{step.title}</h4>
                                <p className="text-blue-200 text-xs">{step.description}</p>
                              </div>
                            </div>

                            {/* Step Inputs */}
                            {step.inputs.map((input) => {
                              const fieldId = `workflow-${step.id}-${input.id}`;
                              const fieldName = `${step.id}_${input.id}`;
                              return (
                                <div key={input.id} className="mb-2">
                                  <label htmlFor={fieldId} className="block text-xs text-blue-200 mb-1">
                                    {input.label}
                                    {input.required && <span className="text-red-400 ml-1">*</span>}
                                  </label>
                                  {input.type === 'select' ? (
                                    <select
                                      id={fieldId}
                                      name={fieldName}
                                      value={formData[fieldName] || ''}
                                      onChange={(e) => handleInputChange(step.id, input.id, e.target.value)}
                                      className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                      <option value="">Select...</option>
                                      {input.options?.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      type={input.type}
                                      id={fieldId}
                                      name={fieldName}
                                      value={formData[fieldName] || ''}
                                      onChange={(e) => handleInputChange(step.id, input.id, e.target.value)}
                                      placeholder={input.placeholder}
                                      className="w-full px-2 py-1 bg-white/20 border border-white/30 rounded text-white text-xs placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  )}
                                </div>
                              );
                            })}

                            {/* Success Indicator */}
                            {isActive && !isCurrent && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircleIcon className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Simulation Results */}
                    {isReadyToCheckout && (
                      <div className="mt-6 bg-green-500/20 border border-green-400/50 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-400" />
                          <h4 className="text-green-400 font-bold">Simulation Complete!</h4>
                        </div>
                        <p className="text-green-200 text-sm">
                          Your workflow has been tested successfully. Ready to deploy!
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <CogIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Select a Workflow Template</h3>
                      <p className="text-blue-200">Choose from the left sidebar to start building your automation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Checkout Panel */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sticky top-8">
                <h3 className="text-xl font-bold text-white mb-4">Pricing & Checkout</h3>
                
                {selectedTemplate ? (
                  <>
                    {/* Pricing Information */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Setup Cost</h4>
                        <div className="text-2xl font-bold text-green-400">${selectedTemplate.setupCost}</div>
                        <p className="text-blue-200 text-sm">One-time implementation</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Monthly Cost</h4>
                        <div className="text-2xl font-bold text-blue-400">${selectedTemplate.monthlyCost}</div>
                        <p className="text-blue-200 text-sm">Ongoing maintenance</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {selectedTemplate.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-blue-200 text-sm">
                            <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      disabled={!isReadyToCheckout}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        isReadyToCheckout
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white transform hover:scale-105'
                          : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isReadyToCheckout ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CreditCardIcon className="w-5 h-5" />
                          <span>Deploy Workflow</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <PlayIcon className="w-5 h-5" />
                          <span>Run Simulation First</span>
                        </div>
                      )}
                    </button>

                    {/* Trust Indicators */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center space-x-2 text-blue-200 text-sm">
                        <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                        <span>Secure deployment</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-200 text-sm">
                        <ClockIcon className="w-4 h-4 text-blue-400" />
                        <span>Setup in {selectedTemplate.setupTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-200 text-sm">
                        <SparklesIcon className="w-4 h-4 text-purple-400" />
                        <span>Customized for your business</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CreditCardIcon className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-blue-200">Select a workflow to see pricing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}