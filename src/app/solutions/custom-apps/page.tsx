"use client";

import { useState } from "react";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  MapIcon,
  ChartBarIcon,
  CogIcon,
  BoltIcon,
  EyeIcon,
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  StarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

type AppTemplate = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  industry: string;
  features: string[];
  integrations: string[];
};

type CustomizationBuilderProps = {
  template: AppTemplate | null;
  onClose: () => void;
};

type FromScratchBuilderProps = {
  onClose: () => void;
};

const customAppTemplates: AppTemplate[] = [
  {
    id: 1,
    name: 'Property Inventory Tracker',
    tagline: 'Real-time asset management for property managers',
    description: 'Keep track of all property assets, maintenance schedules, and tenant-related items in one centralized system.',
    icon: BuildingOfficeIcon,
    color: 'bg-blue-500',
    industry: 'Property Management',
    features: ['Asset tracking', 'Maintenance scheduling', 'Tenant management', 'Reporting dashboard'],
    integrations: ['Google Sheets', 'QuickBooks', 'Slack', 'Property management software']
  },
  {
    id: 2,
    name: 'Tenant Payment Portal',
    tagline: 'Streamlined payment processing for tenants',
    description: 'Automated payment collection, rent reminders, and financial reporting for property managers.',
    icon: CreditCardIcon,
    color: 'bg-green-500',
    industry: 'Property Management',
    features: ['Payment processing', 'Rent reminders', 'Financial reporting', 'Tenant portal'],
    integrations: ['Stripe', 'PayPal', 'QuickBooks', 'Email systems']
  },
  {
    id: 3,
    name: 'Contractor Work Order',
    tagline: 'Project management for contractors',
    description: 'Track projects, manage clients, schedule work, and handle invoicing all in one place.',
    icon: WrenchScrewdriverIcon,
    color: 'bg-orange-500',
    industry: 'Contractors',
    features: ['Project tracking', 'Client management', 'Scheduling', 'Invoicing'],
    integrations: ['QuickBooks', 'Google Calendar', 'Slack', 'CRM systems']
  },
  {
    id: 4,
    name: 'Client Onboarding Toolkit',
    tagline: 'Automated client intake and onboarding',
    description: 'Streamline the client onboarding process with automated forms, document collection, and workflow management.',
    icon: UserGroupIcon,
    color: 'bg-purple-500',
    industry: 'Professional Services',
    features: ['Automated forms', 'Document collection', 'Workflow management', 'Client portal'],
    integrations: ['CRM systems', 'Document management', 'Email automation', 'Calendar systems']
  },
  {
    id: 5,
    name: 'Client Intake Hub',
    tagline: 'Centralized client information management',
    description: 'Collect, organize, and manage all client information in one secure, accessible location.',
    icon: ClipboardDocumentListIcon,
    color: 'bg-indigo-500',
    industry: 'Healthcare',
    features: ['Client profiles', 'Document storage', 'Intake forms', 'Data analytics'],
    integrations: ['Electronic health records', 'Document management', 'Email systems', 'Analytics tools']
  },
  {
    id: 6,
    name: 'Cleaning Route Planner',
    tagline: 'Optimized scheduling for cleaning services',
    description: 'Plan efficient routes, manage client schedules, and track service completion for cleaning businesses.',
    icon: MapIcon,
    color: 'bg-teal-500',
    industry: 'Cleaning Services',
    features: ['Route optimization', 'Schedule management', 'Client tracking', 'Performance analytics'],
    integrations: ['Google Maps', 'Calendar systems', 'CRM', 'Mobile apps']
  },
  {
    id: 7,
    name: 'Real Estate Lead Manager',
    tagline: 'Lead generation and management for realtors',
    description: 'Capture, nurture, and convert real estate leads with automated follow-ups and CRM integration.',
    icon: ChartBarIcon,
    color: 'bg-red-500',
    industry: 'Real Estate',
    features: ['Lead capture', 'Automated follow-ups', 'CRM integration', 'Analytics dashboard'],
    integrations: ['Real estate CRM', 'Email marketing', 'Social media', 'Analytics tools']
  },
  {
    id: 8,
    name: 'Custom Dashboard Builder',
    tagline: 'Create personalized business dashboards',
    description: 'Build custom dashboards with real-time data visualization and business intelligence for any industry.',
    icon: CogIcon,
    color: 'bg-gray-500',
    industry: 'All Industries',
    features: ['Custom widgets', 'Real-time data', 'Visualization tools', 'Role-based access'],
    integrations: ['Business intelligence tools', 'Database systems', 'API connections', 'Cloud services']
  },
  {
    id: 9,
    name: 'Workflow Automation Studio',
    tagline: 'Visual workflow builder for business processes',
    description: 'Design, build, and deploy custom workflows to automate repetitive business tasks and processes.',
    icon: BoltIcon,
    color: 'bg-yellow-500',
    industry: 'All Industries',
    features: ['Visual builder', 'Process automation', 'Task management', 'Integration hub'],
    integrations: ['Business process tools', 'API connections', 'Database systems', 'Communication platforms']
  }
];

export default function CustomAppsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<AppTemplate | null>(null);
  const [showCustomizationBuilder, setShowCustomizationBuilder] = useState(false);
  const [showFromScratchBuilder, setShowFromScratchBuilder] = useState(false);

  const handleViewDetails = (template: AppTemplate) => {
    setSelectedTemplate(template);
  };

  const handleBuildSimilar = () => {
    setShowCustomizationBuilder(true);
    setSelectedTemplate(null);
  };

  const handleBuildFromScratch = () => {
    setShowFromScratchBuilder(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8">
                <SparklesIcon className="w-5 h-5 mr-2 text-blue-400" />
                <span className="font-semibold text-blue-400">Custom App Development</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Build Your Perfect
                <span className="block text-blue-400">Custom Application</span>
              </h1>
              
              <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
                Choose from our pre-built templates or create a completely custom app tailored to your business needs. 
                No coding required—we handle everything.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBuildFromScratch}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  Build From Scratch
                </button>
                <button
                  onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-8 py-4 border border-blue-400/30 text-lg font-medium rounded-lg text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  Explore Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div id="templates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pre-Built App Templates
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Choose from our collection of industry-specific app templates, then customize them to fit your exact needs.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customAppTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleViewDetails(template)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center`}>
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-300 mb-1">{template.industry}</div>
                    <div className="flex items-center text-yellow-400">
                      <StarIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {template.name}
                </h3>
                <p className="text-blue-200 text-sm mb-4">{template.tagline}</p>
                <p className="text-white/80 text-sm mb-6">{template.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 2 && (
                      <span className="text-xs text-blue-300">+{template.features.length - 2} more</span>
                    )}
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300">
                    <span>View Details</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Details Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-4xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${selectedTemplate.color} rounded-lg flex items-center justify-center`}>
                    <selectedTemplate.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedTemplate.name}</h3>
                    <p className="text-blue-200">{selectedTemplate.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-white hover:text-blue-300 transition-colors duration-300 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* What the App Does */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <LightBulbIcon className="w-5 h-5 mr-2 text-yellow-400" />
                    What the App Does
                  </h4>
                  <p className="text-white/80 text-sm mb-4">{selectedTemplate.description}</p>
                  <div className="space-y-2">
                    <h5 className="text-blue-300 font-medium text-sm">Key Features:</h5>
                    <ul className="space-y-1">
                      {selectedTemplate.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-white/80">
                          <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Integrations */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <CogIcon className="w-5 h-5 mr-2 text-blue-400" />
                    Integrations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.integrations.map((integration, index) => (
                      <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* App Structure Overview */}
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="text-white font-semibold mb-4">App Structure Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-blue-300 font-medium mb-2">Front End</h5>
                    <p className="text-white/80 text-sm">User-friendly interface with dashboards, forms, and interactive elements designed for your specific workflow.</p>
                  </div>
                  <div>
                    <h5 className="text-blue-300 font-medium mb-2">Back End</h5>
                    <p className="text-white/80 text-sm">Robust data processing, automation logic, and secure integrations that power your app behind the scenes.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBuildSimilar}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  <span>Build Similar</span>
                </button>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customization Builder */}
        {showCustomizationBuilder && (
          <CustomizationBuilder 
            template={selectedTemplate}
            onClose={() => setShowCustomizationBuilder(false)}
          />
        )}

        {/* From Scratch Builder */}
        {showFromScratchBuilder && (
          <FromScratchBuilder 
            onClose={() => setShowFromScratchBuilder(false)}
          />
        )}
      </div>
    </div>
  );
}

// Customization Builder Component
function CustomizationBuilder({ template, onClose }: CustomizationBuilderProps) {
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());
  
  const availableComponents = [
    { id: 'dashboard', name: 'Dashboard', description: 'Main control panel with key metrics and navigation' },
    { id: 'forms', name: 'Data Entry Forms', description: 'Custom forms for data collection and user input' },
    { id: 'reports', name: 'Reporting System', description: 'Generate and export business reports and analytics' },
    { id: 'notifications', name: 'Notification System', description: 'Automated alerts and communication features' },
    { id: 'user-management', name: 'User Management', description: 'Role-based access and user account management' },
    { id: 'integrations', name: 'Third-party Integrations', description: 'Connect with external services and APIs' },
    { id: 'automation', name: 'Workflow Automation', description: 'Automate repetitive tasks and business processes' },
    { id: 'mobile', name: 'Mobile Access', description: 'Mobile-responsive design and native app features' }
  ];

  const toggleComponent = (componentId: string) => {
    const newSelected = new Set(selectedComponents);
    if (newSelected.has(componentId)) {
      newSelected.delete(componentId);
    } else {
      newSelected.add(componentId);
    }
    setSelectedComponents(newSelected);
  };

  const handleBuildRequest = () => {
    // Navigate to request form
    window.location.href = `/solutions/custom-apps/request?components=${Array.from(selectedComponents).join(',')}`;
  };

  // Suppress unused variable warning - template is used for context
  void template;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-4xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Customize Your App</h3>
            <p className="text-blue-200">Select the components you want in your custom application</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-300 transition-colors duration-300 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {availableComponents.map((component) => (
            <div
              key={component.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                selectedComponents.has(component.id)
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/20 bg-white/5 hover:border-blue-400 hover:bg-white/10'
              }`}
              onClick={() => toggleComponent(component.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  selectedComponents.has(component.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-white/40'
                }`}>
                  {selectedComponents.has(component.id) && (
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{component.name}</h4>
                  <p className="text-white/70 text-sm">{component.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white/80">
            {selectedComponents.size} component{selectedComponents.size !== 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleBuildRequest}
              disabled={selectedComponents.size === 0}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Build My App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type PhaseKey = 'phase1' | 'phase2' | 'phase3' | 'phase4';
type SelectedComponentsState = Record<PhaseKey, Set<string>>;

const getPhaseKey = (phaseId: number): PhaseKey => {
  return `phase${phaseId}` as PhaseKey;
};

// From Scratch Builder Component
function FromScratchBuilder({ onClose }: FromScratchBuilderProps) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponentsState>({
    phase1: new Set(),
    phase2: new Set(),
    phase3: new Set(),
    phase4: new Set()
  });

  const phases = [
    {
      id: 1,
      title: 'Front End / User Interface',
      description: 'Choose the user-facing components for your app',
      components: [
        { id: 'dashboard', name: 'Dashboard', description: 'Main control panel with widgets and navigation' },
        { id: 'forms', name: 'Forms & Input', description: 'Data entry forms and user input interfaces' },
        { id: 'reports', name: 'Reports & Analytics', description: 'Data visualization and reporting tools' },
        { id: 'user-portal', name: 'User Portal', description: 'Customer-facing portal for self-service' },
        { id: 'mobile-ui', name: 'Mobile Interface', description: 'Mobile-responsive design and native features' }
      ]
    },
    {
      id: 2,
      title: 'Data & Integrations',
      description: 'Select your data sources and third-party connections',
      components: [
        { id: 'database', name: 'Database Setup', description: 'Secure data storage and management' },
        { id: 'crm-integration', name: 'CRM Integration', description: 'Connect with customer relationship management systems' },
        { id: 'accounting', name: 'Accounting Software', description: 'QuickBooks, Xero, and other financial tools' },
        { id: 'communication', name: 'Communication Tools', description: 'Email, Slack, Teams integration' },
        { id: 'api-connections', name: 'API Connections', description: 'Custom API integrations and webhooks' }
      ]
    },
    {
      id: 3,
      title: 'Automation & Logic',
      description: 'Add intelligent automation to your app',
      components: [
        { id: 'workflows', name: 'Workflow Automation', description: 'Automate business processes and tasks' },
        { id: 'notifications', name: 'Smart Notifications', description: 'Automated alerts and communication' },
        { id: 'triggers', name: 'Event Triggers', description: 'Conditional logic and automated responses' },
        { id: 'scheduling', name: 'Scheduling System', description: 'Automated scheduling and calendar management' },
        { id: 'data-processing', name: 'Data Processing', description: 'Automated data analysis and processing' }
      ]
    },
    {
      id: 4,
      title: 'Advanced Features',
      description: 'Add powerful features to make your app stand out',
      components: [
        { id: 'ai-features', name: 'AI Features', description: 'Machine learning and artificial intelligence capabilities' },
        { id: 'analytics', name: 'Advanced Analytics', description: 'Business intelligence and predictive analytics' },
        { id: 'security', name: 'Security & Compliance', description: 'Advanced security features and compliance tools' },
        { id: 'permissions', name: 'Role-based Access', description: 'Granular user permissions and access control' },
        { id: 'custom-features', name: 'Custom Features', description: 'Bespoke functionality tailored to your needs' }
      ]
    }
  ];

  const toggleComponent = (phaseId: number, componentId: string) => {
    const phaseKey = getPhaseKey(phaseId);
    const newSelected = new Set(selectedComponents[phaseKey]);
    if (newSelected.has(componentId)) {
      newSelected.delete(componentId);
    } else {
      newSelected.add(componentId);
    }
    setSelectedComponents(prev => ({
      ...prev,
      [phaseKey]: newSelected
    }));
  };

  const getTotalSelected = () => {
    return Object.values(selectedComponents).reduce((total, phase) => total + phase.size, 0);
  };

  const handleBuildRequest = () => {
    // Navigate to request form with all selected components
    const allComponents = Object.entries(selectedComponents)
      .flatMap(([phase, components]) => Array.from(components))
      .join(',');
    window.location.href = `/solutions/custom-apps/request?components=${allComponents}&fromScratch=true`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-6xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Build Your Custom App</h3>
            <p className="text-blue-200">Select components across four phases to create your perfect app</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-300 transition-colors duration-300 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Phase Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPhase === phase.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Phase {phase.id}
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Content */}
        <div className="mb-8">
          <h4 className="text-xl font-bold text-white mb-2">{phases[currentPhase - 1].title}</h4>
          <p className="text-blue-200 mb-6">{phases[currentPhase - 1].description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phases[currentPhase - 1].components.map((component) => (
              <div
                key={component.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedComponents[getPhaseKey(currentPhase)].has(component.id)
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/20 bg-white/5 hover:border-blue-400 hover:bg-white/10'
                }`}
                onClick={() => toggleComponent(currentPhase, component.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedComponents[getPhaseKey(currentPhase)].has(component.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-white/40'
                  }`}>
                    {selectedComponents[getPhaseKey(currentPhase)].has(component.id) && (
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{component.name}</h5>
                    <p className="text-white/70 text-sm">{component.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation and Build Button */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {currentPhase > 1 && (
              <button
                onClick={() => setCurrentPhase(currentPhase - 1)}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Previous
              </button>
            )}
            {currentPhase < 4 && (
              <button
                onClick={() => setCurrentPhase(currentPhase + 1)}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Next Phase
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white/80">
              {getTotalSelected()} component{getTotalSelected() !== 1 ? 's' : ''} selected
            </div>
            <button
              onClick={handleBuildRequest}
              disabled={getTotalSelected() === 0}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Build My App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}