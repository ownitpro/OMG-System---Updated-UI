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
import { SolutionsLeadForm, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";

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
    <div className="min-h-screen bg-slate-950 font-sans">

      <div className="relative z-10">
        {/* Header Section */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 chess-grid opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent opacity-50" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-in shadow-2xl">
                <SparklesIcon className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold text-indigo-200 uppercase tracking-widest">Enterprise Ready</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 leading-[1.05] tracking-tighter">
                Architecture for <br />
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent italic">Unlimited Scale</span>
              </h1>

              <p className="text-xl text-white/50 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                Stop compromising with off-the-shelf software. We engineer custom-built applications that map perfectly to your unique operations—delivered with speed and precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <button
                  onClick={handleBuildFromScratch}
                  className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-300 transform hover:scale-105"
                >
                  <RocketLaunchIcon className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                  Build From Scratch
                </button>
                <button
                  onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
                >
                  <EyeIcon className="w-5 h-5 mr-3" />
                  Explore Blueprints
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div id="templates" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Proven <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent italic">Blueprints</span>
              </h2>
              <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
                Scale faster with our library of battle-tested application architectures. Customise every detail to match your growth trajectory.
              </p>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customAppTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group relative bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                  onClick={() => handleViewDetails(template)}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.color.replace('bg-', 'from-').replace('-500', '-600 to-')} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <template.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1 opacity-60">{template.industry}</div>
                      <div className="flex items-center justify-end text-cyan-400 gap-1">
                        <StarIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">V-1.2</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-6 font-medium leading-relaxed">
                    {template.description}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {template.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/60 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-indigo-500/20 transition-colors">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <ArrowRightIcon className="w-5 h-5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template Details Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 max-w-4xl w-full border border-white/5 max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/20">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedTemplate.color.replace('bg-', 'from-').replace('-500', '-600 to-')} flex items-center justify-center shadow-2xl transition-transform duration-500`}>
                    <selectedTemplate.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">{selectedTemplate.name}</h3>
                    <p className="text-indigo-400/60 font-bold text-[10px] uppercase tracking-[0.2em]">{selectedTemplate.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* What the App Does */}
                <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3 uppercase tracking-widest text-[9px]">
                    <LightBulbIcon className="w-3.5 h-3.5 text-cyan-400" />
                    Strategic Purpose
                  </h4>
                  <p className="text-white/50 text-sm mb-6 font-medium leading-relaxed">{selectedTemplate.description}</p>
                  <div className="space-y-4">
                    <h5 className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest">Architectural Components:</h5>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedTemplate.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4 text-sm text-white/40 bg-white/5 p-4 rounded-2xl border border-white/5">
                          <CheckCircleIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                          <span className="font-bold tracking-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Integrations & Context */}
                <div className="space-y-6">
                  <div className="bg-slate-950/40 rounded-2xl p-6 border border-white/5">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3 uppercase tracking-widest text-[9px]">
                      <CogIcon className="w-3.5 h-3.5 text-indigo-400" />
                      Data Ecosystem
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.integrations.map((integration, index) => (
                        <span key={index} className="text-[9px] font-bold bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-indigo-600/10 rounded-2xl p-6 border border-indigo-500/20">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-3 uppercase tracking-widest text-[9px]">
                      <RocketLaunchIcon className="w-3.5 h-3.5 text-indigo-400" />
                      Deployment Ready
                    </h4>
                    <p className="text-white/60 text-xs font-medium leading-relaxed">
                      This architecture is fully evaluated and ready for custom engineering. Deployment can be initiated within 24 hours of specifications lock.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <button
                  onClick={handleBuildSimilar}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-indigo-500/20"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  Initialize Blueprint
                </button>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all duration-300"
                >
                  Return
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

        {/* Lead Form Section */}
        <SolutionsLeadForm />

        {/* Sticky Button (Desktop) */}
        <StickyGetStartedButton variant="solutions" />

        {/* Mobile Drawer */}
        <MobileFormDrawer variant="solutions" />
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
    window.location.href = `/solutions/custom-apps/request?components=${Array.from(selectedComponents).join(',')}`;
  };

  void template;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 max-w-3xl w-full border border-white/5 max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/20">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-1">Refine Your <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">Architecture</span></h3>
            <p className="text-white/40 text-sm font-medium">Select additional modules to augment your base blueprint.</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {availableComponents.map((component) => {
            const isSelected = selectedComponents.has(component.id);
            return (
              <div
                key={component.id}
                className={`group relative p-4 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${isSelected
                  ? 'border-indigo-500/50 bg-indigo-500/10'
                  : 'border-white/5 bg-slate-950/40 hover:border-indigo-500/20 hover:bg-slate-950/60'
                  }`}
                onClick={() => toggleComponent(component.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-bold tracking-tight text-sm transition-colors ${isSelected ? 'text-indigo-300' : 'text-white'}`}>{component.name}</h4>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isSelected
                    ? 'border-indigo-400 bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]'
                    : 'border-white/10'
                    }`}>
                    {isSelected && (
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <p className="text-white/40 text-[10px] font-medium leading-relaxed">{component.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            Selected: <span className="text-indigo-400">{selectedComponents.size}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all duration-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleBuildRequest}
              disabled={selectedComponents.size === 0}
              className="px-10 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-white/20 disabled:cursor-not-allowed text-white rounded-[1.25rem] font-bold transition-all duration-500 transform hover:scale-105 shadow-xl shadow-indigo-500/10"
            >
              Initialize Engineering
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
      title: 'Front End / Interface',
      description: 'Choose high-fidelity user interaction modules',
      components: [
        { id: 'dashboard', name: 'Control Dashboard', description: 'Central intelligence hub with real-time feedback' },
        { id: 'forms', name: 'Smart Input', description: 'Dynamic forms with validation and logic' },
        { id: 'reports', name: 'Advanced Analytics', description: 'High-precision data visualization engine' },
        { id: 'user-portal', name: 'Secure Portal', description: 'Encrypted access for external stakeholders' },
        { id: 'mobile-ui', name: 'Hybrid Native', description: 'Full mobile responsiveness with native speed' }
      ]
    },
    {
      id: 2,
      title: 'Data & Architecture',
      description: 'Engineer the backbone of your application',
      components: [
        { id: 'database', name: 'Scalable DB', description: 'High-concurrency data storage architecture' },
        { id: 'crm-integration', name: 'ERP/CRM Sync', description: 'Bidirectional sync with enterprise systems' },
        { id: 'accounting', name: 'Financial Ledger', description: 'Secure transaction and accounting modules' },
        { id: 'communication', name: 'Omni-Channel', description: 'Unified messaging and internal comms' },
        { id: 'api-connections', name: 'Custom SDK', description: 'Tailored API endpoints for external access' }
      ]
    },
    {
      id: 3,
      title: 'Logic & Automation',
      description: 'Inject intelligent behavior into every flow',
      components: [
        { id: 'workflows', name: 'Logic Engine', description: 'Custom conditional workflows and branches' },
        { id: 'notifications', name: 'Signal System', description: 'Smart triggers and multi-stage alerts' },
        { id: 'triggers', name: 'Event Handlers', description: 'Actionable responses based on data shifts' },
        { id: 'scheduling', name: 'Resource Allocator', description: 'Automated task and asset scheduling' },
        { id: 'data-processing', name: 'Compute Unit', description: 'Heavy-lifting background data processing' }
      ]
    },
    {
      id: 4,
      title: 'Global Scale',
      description: 'Finalize your application for production',
      components: [
        { id: 'ai-features', name: 'Neural Models', description: 'LLM integration and predictive intelligence' },
        { id: 'analytics', name: 'Executive BI', description: 'Strategic reporting for data-driven growth' },
        { id: 'security', name: 'SOC-2 Guard', description: 'Hardened security and compliance modules' },
        { id: 'permissions', name: 'ACL Control', description: 'Granular role-based access architectures' },
        { id: 'custom-features', name: 'Bespoke Logic', description: 'Unique modules engineered for your ops' }
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
    const allComponents = Object.entries(selectedComponents)
      .flatMap(([phase, components]) => Array.from(components))
      .join(',');
    window.location.href = `/solutions/custom-apps/request?components=${allComponents}&fromScratch=true`;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 max-w-4xl w-full border border-white/5 max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/20">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Build Your <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">Application</span></h3>
            <p className="text-white/40 text-sm font-medium">Select components across four phases to engineer your perfect build.</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>

        {/* Phase Navigation */}
        <div className="flex justify-center mb-10 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`relative px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300 ${currentPhase === phase.id
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 scale-105'
                  : 'bg-white/5 text-white/20 hover:text-white/40'
                  }`}
              >
                Phase 0{phase.id}
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Content */}
        <div className="mb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-0.5 uppercase tracking-tight">{phases[currentPhase - 1].title}</h4>
              <p className="text-indigo-400/60 font-bold text-[10px] uppercase tracking-[0.2em]">{phases[currentPhase - 1].description}</p>
            </div>
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
              Selected: {selectedComponents[getPhaseKey(currentPhase)].size} / {phases[currentPhase - 1].components.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {phases[currentPhase - 1].components.map((component) => {
              const isSelected = selectedComponents[getPhaseKey(currentPhase)].has(component.id);
              return (
                <div
                  key={component.id}
                  className={`group relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${isSelected
                    ? 'border-indigo-500/50 bg-indigo-500/10'
                    : 'border-white/5 bg-slate-950/40 hover:border-indigo-500/20 hover:bg-slate-950/60'
                    }`}
                  onClick={() => toggleComponent(currentPhase, component.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className={`text-lg font-bold tracking-tight transition-colors ${isSelected ? 'text-indigo-300' : 'text-white'}`}>{component.name}</h5>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isSelected
                      ? 'border-indigo-400 bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]'
                      : 'border-white/10'
                      }`}>
                      {isSelected && (
                        <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-white/40 text-xs font-medium leading-relaxed">{component.description}</p>

                  {/* Subtle selection glow */}
                  {isSelected && (
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-indigo-500/20 blur-[30px] rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation and Build Button */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex space-x-3">
            {currentPhase > 1 && (
              <button
                onClick={() => setCurrentPhase(currentPhase - 1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all duration-300 text-sm"
              >
                Previous
              </button>
            )}
            {currentPhase < 4 && (
              <button
                onClick={() => setCurrentPhase(currentPhase + 1)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all duration-300 shadow-xl shadow-indigo-500/20 text-sm"
              >
                Next Phase
              </button>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-xl font-bold text-white">{getTotalSelected()}</div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Modules</div>
            </div>
            <button
              onClick={handleBuildRequest}
              disabled={getTotalSelected() === 0}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-white/20 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-500 transform hover:scale-105 shadow-xl shadow-indigo-500/10 text-sm"
            >
              Initialize Build
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
