"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PlayIcon,
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
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

type AppTemplate = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  whatItDoes: string;
  whoItsFor: string;
  howItHelps: string;
  integrations: string[];
  frontEnd: string[];
  backEnd: string[];
  features: string[];
  benefits: string[];
};

const appTemplates: Record<string, AppTemplate> = {
  'property-inventory': {
    id: 'property-inventory',
    name: 'Property Inventory Tracker',
    tagline: 'Complete property management solution',
    description: 'A comprehensive system for tracking properties, tenants, maintenance, and financial records.',
    icon: '🏠',
    color: 'bg-blue-500',
    whatItDoes: 'Manages your entire property portfolio with automated tracking, tenant communication, and financial reporting.',
    whoItsFor: 'Property managers, real estate investors, and rental property owners who need to streamline their operations.',
    howItHelps: 'Reduces manual work by 70%, improves tenant satisfaction, and provides real-time insights into your property performance.',
    integrations: ['QuickBooks', 'Stripe', 'Mailchimp', 'Google Calendar', 'Zapier'],
    frontEnd: ['Dashboard', 'Property Listings', 'Tenant Portal', 'Maintenance Requests', 'Financial Reports'],
    backEnd: ['Database Management', 'Payment Processing', 'Email Automation', 'Document Storage', 'API Integrations'],
    features: [
      'Property portfolio overview',
      'Tenant management system',
      'Maintenance tracking',
      'Financial reporting',
      'Document storage',
      'Automated communications'
    ],
    benefits: [
      'Save 10+ hours per week on manual tasks',
      'Improve tenant retention by 40%',
      'Reduce maintenance costs by 25%',
      'Get real-time financial insights'
    ]
  },
  'tenant-payment': {
    id: 'tenant-payment',
    name: 'Tenant Payment Portal',
    tagline: 'Streamlined rent collection',
    description: 'Automated rent collection with online payments, late fee management, and tenant communication.',
    icon: '💳',
    color: 'bg-green-500',
    whatItDoes: 'Automates rent collection, tracks payments, sends reminders, and manages late fees.',
    whoItsFor: 'Property managers and landlords who want to streamline rent collection and reduce payment delays.',
    howItHelps: 'Increases on-time payments by 60%, reduces administrative work, and improves cash flow.',
    integrations: ['Stripe', 'QuickBooks', 'Mailchimp', 'SMS Gateway', 'Banking APIs'],
    frontEnd: ['Payment Dashboard', 'Tenant Portal', 'Payment History', 'Invoice Management', 'Mobile App'],
    backEnd: ['Payment Processing', 'Automated Billing', 'SMS/Email Notifications', 'Financial Tracking', 'Security'],
    features: [
      'Online payment processing',
      'Automated rent reminders',
      'Late fee calculations',
      'Payment history tracking',
      'Tenant communication',
      'Financial reporting'
    ],
    benefits: [
      'Reduce late payments by 60%',
      'Save 5+ hours per week on collections',
      'Improve tenant satisfaction',
      'Better cash flow management'
    ]
  },
  'contractor-workorder': {
    id: 'contractor-workorder',
    name: 'Contractor Work Order',
    tagline: 'Project management for contractors',
    description: 'Complete project tracking, client communication, and job management system.',
    icon: '🔨',
    color: 'bg-orange-500',
    whatItDoes: 'Manages projects from quote to completion with client communication, scheduling, and progress tracking.',
    whoItsFor: 'Contractors, construction companies, and service providers who need to manage multiple projects efficiently.',
    howItHelps: 'Increases project completion rates by 45%, improves client satisfaction, and reduces administrative overhead.',
    integrations: ['QuickBooks', 'Google Calendar', 'Stripe', 'Email', 'SMS', 'File Storage'],
    frontEnd: ['Project Dashboard', 'Client Portal', 'Scheduling', 'Progress Tracking', 'Mobile App'],
    backEnd: ['Project Management', 'Client Communication', 'Scheduling Engine', 'File Management', 'Reporting'],
    features: [
      'Project timeline management',
      'Client communication portal',
      'Photo documentation',
      'Invoice generation',
      'Team scheduling',
      'Progress tracking'
    ],
    benefits: [
      'Complete projects 30% faster',
      'Improve client satisfaction by 50%',
      'Reduce administrative time by 40%',
      'Better project profitability'
    ]
  },
  'client-onboarding': {
    id: 'client-onboarding',
    name: 'Client Onboarding Toolkit',
    tagline: 'Automated client onboarding',
    description: 'Streamlined client onboarding with automated workflows, document collection, and progress tracking.',
    icon: '👥',
    color: 'bg-purple-500',
    whatItDoes: 'Automates the entire client onboarding process from initial contact to project kickoff.',
    whoItsFor: 'Service-based businesses, consultants, and agencies who need to onboard new clients efficiently.',
    howItHelps: 'Reduces onboarding time by 60%, improves client experience, and ensures nothing falls through the cracks.',
    integrations: ['CRM Systems', 'Email Marketing', 'Document Storage', 'Calendar', 'Payment Processing'],
    frontEnd: ['Onboarding Portal', 'Progress Tracking', 'Document Upload', 'Communication Hub', 'Mobile Interface'],
    backEnd: ['Workflow Automation', 'Document Management', 'Email Automation', 'Progress Tracking', 'Integration APIs'],
    features: [
      'Automated welcome sequences',
      'Document collection',
      'Progress tracking',
      'Client communication',
      'Task automation',
      'Onboarding analytics'
    ],
    benefits: [
      'Reduce onboarding time by 60%',
      'Improve client satisfaction',
      'Eliminate manual processes',
      'Better client retention'
    ]
  },
  'client-intake': {
    id: 'client-intake',
    name: 'Client Intake Hub',
    tagline: 'Smart client intake system',
    description: 'Intelligent client intake with automated forms, qualification, and routing.',
    icon: '📋',
    color: 'bg-cyan-500',
    whatItDoes: 'Captures and processes client information automatically, qualifying leads and routing them to the right team.',
    whoItsFor: 'Service businesses, healthcare providers, and consultants who need efficient client intake processes.',
    howItHelps: 'Increases qualified leads by 80%, reduces intake time by 70%, and improves client experience.',
    integrations: ['CRM Systems', 'Email Marketing', 'Calendar', 'Payment Systems', 'Document Storage'],
    frontEnd: ['Intake Forms', 'Client Portal', 'Admin Dashboard', 'Mobile Forms', 'Progress Tracking'],
    backEnd: ['Form Processing', 'Lead Qualification', 'Automated Routing', 'Data Management', 'Integration APIs'],
    features: [
      'Smart intake forms',
      'Automated qualification',
      'Lead scoring',
      'Client routing',
      'Progress tracking',
      'Data analytics'
    ],
    benefits: [
      'Increase qualified leads by 80%',
      'Reduce intake time by 70%',
      'Improve lead quality',
      'Better client experience'
    ]
  },
  'cleaning-route': {
    id: 'cleaning-route',
    name: 'Cleaning Route Planner',
    tagline: 'Optimized cleaning operations',
    description: 'Route optimization, scheduling, and client management for cleaning services.',
    icon: '🧹',
    color: 'bg-teal-500',
    whatItDoes: 'Optimizes cleaning routes, manages schedules, tracks team performance, and handles client communication.',
    whoItsFor: 'Cleaning companies, janitorial services, and maintenance providers who need efficient route planning.',
    howItHelps: 'Reduces travel time by 40%, increases team productivity, and improves client satisfaction.',
    integrations: ['Google Maps', 'Calendar', 'SMS', 'Email', 'Payment Processing', 'GPS Tracking'],
    frontEnd: ['Route Dashboard', 'Mobile App', 'Client Portal', 'Scheduling', 'Performance Tracking'],
    backEnd: ['Route Optimization', 'Scheduling Engine', 'GPS Integration', 'Communication', 'Analytics'],
    features: [
      'Route optimization',
      'Team scheduling',
      'Client communication',
      'Performance tracking',
      'GPS integration',
      'Mobile workforce management'
    ],
    benefits: [
      'Reduce travel time by 40%',
      'Increase team productivity by 35%',
      'Improve client satisfaction',
      'Better route efficiency'
    ]
  },
  'real-estate-lead': {
    id: 'real-estate-lead',
    name: 'Real Estate Lead Manager',
    tagline: 'Complete lead management system',
    description: 'Lead capture, nurturing, and conversion system for real estate professionals.',
    icon: '🏘️',
    color: 'bg-indigo-500',
    whatItDoes: 'Captures leads from multiple sources, nurtures them with automated sequences, and converts them into clients.',
    whoItsFor: 'Real estate agents, brokers, and teams who need to manage and convert leads effectively.',
    howItHelps: 'Increases lead conversion by 65%, reduces follow-up time by 50%, and improves client relationships.',
    integrations: ['MLS Systems', 'Email Marketing', 'CRM', 'Social Media', 'Website Forms', 'SMS'],
    frontEnd: ['Lead Dashboard', 'Client Portal', 'Communication Hub', 'Mobile App', 'Analytics'],
    backEnd: ['Lead Processing', 'Automated Nurturing', 'CRM Integration', 'Communication Engine', 'Analytics'],
    features: [
      'Multi-channel lead capture',
      'Automated nurturing sequences',
      'Lead scoring and qualification',
      'Client communication',
      'Performance analytics',
      'Mobile lead management'
    ],
    benefits: [
      'Increase lead conversion by 65%',
      'Reduce follow-up time by 50%',
      'Improve lead quality',
      'Better client relationships'
    ]
  },
  'custom-dashboard': {
    id: 'custom-dashboard',
    name: 'Custom Dashboard Builder',
    tagline: 'Build your perfect dashboard',
    description: 'Create custom dashboards with real-time data, analytics, and interactive widgets.',
    icon: '📊',
    color: 'bg-pink-500',
    whatItDoes: 'Provides a flexible dashboard builder that connects to your data sources and displays real-time insights.',
    whoItsFor: 'Business owners, managers, and teams who need customized data visualization and reporting.',
    howItHelps: 'Improves decision-making with real-time insights, reduces reporting time by 80%, and increases data accessibility.',
    integrations: ['Database Systems', 'APIs', 'Cloud Services', 'Analytics Tools', 'Business Intelligence'],
    frontEnd: ['Dashboard Builder', 'Widget Library', 'Data Visualization', 'Mobile Dashboard', 'Sharing Tools'],
    backEnd: ['Data Processing', 'API Integration', 'Real-time Updates', 'Security', 'Performance Optimization'],
    features: [
      'Drag-and-drop builder',
      'Real-time data updates',
      'Custom widgets',
      'Mobile responsive',
      'Data sharing',
      'Advanced analytics'
    ],
    benefits: [
      'Improve decision-making speed',
      'Reduce reporting time by 80%',
      'Increase data accessibility',
      'Better business insights'
    ]
  },
  'workflow-automation': {
    id: 'workflow-automation',
    name: 'Workflow Automation Studio',
    tagline: 'Automate your business processes',
    description: 'Visual workflow builder with automation, triggers, and process optimization.',
    icon: '⚡',
    color: 'bg-yellow-500',
    whatItDoes: 'Creates automated workflows that connect your apps and processes, eliminating manual work.',
    whoItsFor: 'Businesses of all sizes that want to automate repetitive tasks and improve efficiency.',
    howItHelps: 'Eliminates 90% of manual work, reduces errors by 95%, and increases team productivity by 200%.',
    integrations: ['All Major Apps', 'APIs', 'Email Systems', 'CRM', 'Database', 'Cloud Services'],
    frontEnd: ['Visual Builder', 'Workflow Designer', 'Testing Tools', 'Monitoring Dashboard', 'Mobile App'],
    backEnd: ['Automation Engine', 'Integration APIs', 'Trigger System', 'Data Processing', 'Monitoring'],
    features: [
      'Visual workflow builder',
      'Pre-built templates',
      'Custom triggers',
      'Real-time monitoring',
      'Error handling',
      'Performance analytics'
    ],
    benefits: [
      'Eliminate 90% of manual work',
      'Reduce errors by 95%',
      'Increase productivity by 200%',
      'Better process efficiency'
    ]
  }
};

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<AppTemplate | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const id = typeof params.id === 'string' ? params.id : undefined;
    if (id && appTemplates[id]) {
      setTemplate(appTemplates[id]);
    }
  }, [params.id]);

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading template...</p>
        </div>
      </div>
    );
  }

  const handleBuildSimilar = () => {
    router.push(`/solutions/custom-apps/build?template=${template.id}`);
  };

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
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Templates
          </button>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 ${template.color} rounded-xl flex items-center justify-center text-3xl`}>
                  {template.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{template.name}</h1>
                  <p className="text-xl text-blue-200">{template.tagline}</p>
                </div>
              </div>
              
              <button
                onClick={handleBuildSimilar}
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Build Similar
              </button>
            </div>
            
            <p className="text-white/80 mt-6 text-lg">{template.description}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
            {[
              { id: 'overview', label: 'Overview', icon: PlayIcon },
              { id: 'features', label: 'Features', icon: CheckCircleIcon },
              { id: 'integrations', label: 'Integrations', icon: CogIcon },
              { id: 'structure', label: 'App Structure', icon: ServerIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">What It Does</h3>
                    <p className="text-white/80">{template.whatItDoes}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Who It's For</h3>
                    <p className="text-white/80">{template.whoItsFor}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">How It Helps</h3>
                    <p className="text-white/80">{template.howItHelps}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
                    <div className="space-y-3">
                      {template.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start text-white/80">
                          <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-white/80">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Integrations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {template.integrations.map((integration, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4 text-center border border-white/20">
                      <div className="text-white font-medium">{integration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <ComputerDesktopIcon className="w-5 h-5 mr-2 text-blue-400" />
                    Front End Components
                  </h3>
                  <div className="space-y-3">
                    {template.frontEnd.map((component, index) => (
                      <div key={index} className="flex items-center text-white/80">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        <span>{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <ServerIcon className="w-5 h-5 mr-2 text-green-400" />
                    Back End Components
                  </h3>
                  <div className="space-y-3">
                    {template.backEnd.map((component, index) => (
                      <div key={index} className="flex items-center text-white/80">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span>{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your Custom App?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Let's create a custom version of this template tailored to your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBuildSimilar}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Build Similar App
              </button>
              <button
                onClick={() => router.push('/solutions/custom-apps')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                View All Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
