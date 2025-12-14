"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CogIcon,
  BoltIcon,
  ShieldCheckIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  StarIcon,
  RocketLaunchIcon,
  PlayIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const allComponents = {
  'frontend': [
    { id: 'dashboard', name: 'Dashboard', description: 'Main control panel with key metrics', icon: ComputerDesktopIcon, required: true },
    { id: 'forms', name: 'Data Entry Forms', description: 'User-friendly forms for data input', icon: WrenchScrewdriverIcon, required: false },
    { id: 'reports', name: 'Reporting System', description: 'Generate and view business reports', icon: StarIcon, required: false },
    { id: 'notifications', name: 'Notification System', description: 'Real-time alerts and updates', icon: BoltIcon, required: false },
    { id: 'user-management', name: 'User Management', description: 'Manage user accounts and permissions', icon: ShieldCheckIcon, required: true },
    { id: 'mobile', name: 'Mobile Access', description: 'Mobile-responsive interface', icon: DevicePhoneMobileIcon, required: false },
    { id: 'user-portal', name: 'User Portal', description: 'Client-facing portal interface', icon: CloudIcon, required: false },
    { id: 'mobile-ui', name: 'Mobile Interface', description: 'Native mobile app interface', icon: DevicePhoneMobileIcon, required: false }
  ],
  'integrations': [
    { id: 'integrations', name: 'Third-party Integrations', description: 'Connect with external services', icon: CogIcon, required: false },
    { id: 'crm-integration', name: 'CRM Integration', description: 'Connect with CRM systems', icon: ComputerDesktopIcon, required: false },
    { id: 'accounting', name: 'Accounting Software', description: 'Financial system integration', icon: StarIcon, required: false },
    { id: 'communication', name: 'Communication Tools', description: 'Email, SMS, and messaging integration', icon: BoltIcon, required: false },
    { id: 'api-connections', name: 'API Connections', description: 'Custom API integrations', icon: ServerIcon, required: false }
  ],
  'automation': [
    { id: 'automation', name: 'Workflow Automation', description: 'Automate business processes', icon: BoltIcon, required: false },
    { id: 'workflows', name: 'Workflow Automation', description: 'Visual workflow builder', icon: WrenchScrewdriverIcon, required: false },
    { id: 'triggers', name: 'Event Triggers', description: 'Automated event-based actions', icon: SparklesIcon, required: false },
    { id: 'scheduling', name: 'Scheduling System', description: 'Automated scheduling and reminders', icon: StarIcon, required: false }
  ],
  'advanced': [
    { id: 'database', name: 'Database Setup', description: 'Custom database configuration', icon: ServerIcon, required: true },
    { id: 'data-processing', name: 'Data Processing', description: 'Advanced data manipulation', icon: CogIcon, required: false },
    { id: 'ai-features', name: 'AI Features', description: 'Machine learning and AI capabilities', icon: SparklesIcon, required: false },
    { id: 'analytics', name: 'Advanced Analytics', description: 'Deep insights and reporting', icon: StarIcon, required: false },
    { id: 'security', name: 'Security & Compliance', description: 'Advanced security features', icon: ShieldCheckIcon, required: false },
    { id: 'permissions', name: 'Role-based Access', description: 'Advanced permission system', icon: ShieldCheckIcon, required: false },
    { id: 'custom-features', name: 'Custom Features', description: 'Bespoke functionality', icon: WrenchScrewdriverIcon, required: false }
  ]
};

const templateComponents = {
  'property-inventory': ['dashboard', 'forms', 'reports', 'user-management', 'integrations', 'automation', 'database', 'mobile'],
  'tenant-payment': ['dashboard', 'forms', 'user-management', 'integrations', 'automation', 'database', 'mobile', 'notifications'],
  'contractor-workorder': ['dashboard', 'forms', 'reports', 'user-management', 'integrations', 'automation', 'database', 'mobile', 'scheduling'],
  'client-onboarding': ['dashboard', 'forms', 'user-portal', 'integrations', 'automation', 'database', 'mobile', 'notifications'],
  'client-intake': ['dashboard', 'forms', 'user-portal', 'integrations', 'automation', 'database', 'mobile', 'notifications'],
  'cleaning-route': ['dashboard', 'forms', 'reports', 'user-management', 'integrations', 'automation', 'database', 'mobile', 'scheduling'],
  'real-estate-lead': ['dashboard', 'forms', 'reports', 'user-management', 'integrations', 'automation', 'database', 'mobile', 'notifications'],
  'custom-dashboard': ['dashboard', 'reports', 'user-management', 'integrations', 'database', 'analytics', 'custom-features'],
  'workflow-automation': ['dashboard', 'user-management', 'integrations', 'automation', 'workflows', 'triggers', 'database', 'custom-features']
};

function CustomAppBuildPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [template, setTemplate] = useState(null);
  const [buildPhase, setBuildPhase] = useState('selection'); // 'selection', 'preview', 'request'

  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId && templateComponents[templateId]) {
      setTemplate(templateId);
      setSelectedComponents(templateComponents[templateId]);
    }
  }, [searchParams]);

  const toggleComponent = (componentId) => {
    setSelectedComponents(prev => {
      if (prev.includes(componentId)) {
        return prev.filter(id => id !== componentId);
      } else {
        return [...prev, componentId];
      }
    });
  };

  const getComponentById = (id) => {
    for (const category of Object.values(allComponents)) {
      const component = category.find(comp => comp.id === id);
      if (component) return component;
    }
    return null;
  };

  const handleBuildRequest = () => {
    const components = selectedComponents.map(id => getComponentById(id)).filter(Boolean);
    const componentIds = components.map(comp => comp.id).join(',');
    router.push(`/solutions/custom-apps/request?components=${componentIds}&fromScratch=${!template}`);
  };

  const renderComponentCard = (component, category) => {
    const isSelected = selectedComponents.includes(component.id);
    const isRequired = component.required;
    
    return (
      <div
        key={component.id}
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
          isSelected
            ? 'border-blue-500 bg-blue-500/20'
            : isRequired
            ? 'border-green-500/50 bg-green-500/10'
            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
        }`}
        onClick={() => !isRequired && toggleComponent(component.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isSelected ? 'bg-blue-500' : isRequired ? 'bg-green-500' : 'bg-white/20'
            }`}>
              <component.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-white">{component.name}</h3>
                {isRequired && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                    Required
                  </span>
                )}
                {isSelected && !isRequired && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-sm text-white/70 mt-1">{component.description}</p>
            </div>
          </div>
          
          {!isRequired && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComponent(component.id);
              }}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-white/60 hover:bg-white/30'
              }`}
            >
              {isSelected ? (
                <CheckCircleIcon className="w-4 h-4" />
              ) : (
                <PlusIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (buildPhase === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Your Custom App Preview</h1>
            <p className="text-xl text-blue-200">Review your selected components before proceeding</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Selected Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedComponents.map(componentId => {
                const component = getComponentById(componentId);
                if (!component) return null;
                return (
                  <div key={componentId} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <component.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{component.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setBuildPhase('selection')}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2 inline" />
              Back to Selection
            </button>
            <button
              onClick={handleBuildRequest}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              <RocketLaunchIcon className="w-4 h-4 mr-2 inline" />
              Build My App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8">
            <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-blue-400" />
            <span className="font-semibold text-blue-400">
              {template ? 'Customize Template' : 'Build Your Own Custom App'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {template ? 'Customize Your App' : 'Build Your Custom App'}
          </h1>
          
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            {template 
              ? 'Select the components you want to include in your custom app. Required components are pre-selected.'
              : 'Choose the components you need for your custom application. Build exactly what you need.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Component Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {Object.entries(allComponents).map(([category, components]) => (
                  <div key={category} className="text-white/80 text-sm">
                    <span className="capitalize">{category.replace('-', ' ')}</span>
                    <span className="ml-2 text-white/60">({components.length})</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-white/80 text-sm mb-2">Selected: {selectedComponents.length}</div>
                <div className="text-white/80 text-sm">Required: {Object.values(allComponents).flat().filter(c => c.required).length}</div>
              </div>
            </div>
          </div>

          {/* Component Selection */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {Object.entries(allComponents).map(([category, components]) => (
                <div key={category} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6 capitalize">
                    {category.replace('-', ' ')} Components
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {components.map(component => renderComponentCard(component, category))}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setBuildPhase('preview')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <EyeIcon className="w-5 h-5 mr-2" />
                Preview Selection
              </button>
              
              <button
                onClick={handleBuildRequest}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Build My App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomAppBuildPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <CustomAppBuildPageContent />
    </Suspense>
  );
}
