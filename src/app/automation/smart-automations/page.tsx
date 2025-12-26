"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  SparklesIcon, 
  PlayIcon, 
  PauseIcon, 
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CalendarIcon,
  BellIcon,
  CogIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';


const automationTemplates = [
  {
    id: 1,
    name: 'Lead Nurturing Sequence',
    description: 'Automatically nurture leads with personalized email sequences',
    category: 'Marketing',
    icon: EnvelopeIcon,
    color: 'bg-blue-500',
    status: 'active',
    successRate: 94,
    timeSaved: '15 hours/week',
    setupPrice: 1200,
    monthlyPrice: 200,
    painPoint: 'Leads go cold because follow-ups are inconsistent or forgotten.',
    solution: 'Automatically nurture leads with timely, personalized messages to keep them engaged.'
  },
  {
    id: 2,
    name: 'Invoice Processing',
    description: 'Automatically process and categorize incoming invoices',
    category: 'Finance',
    icon: DocumentTextIcon,
    color: 'bg-green-500',
    status: 'active',
    successRate: 98,
    timeSaved: '8 hours/week',
    setupPrice: 1000,
    monthlyPrice: 150,
    painPoint: 'Manual invoice entry is slow and error-prone, delaying payments.',
    solution: 'Automate invoice capture, approval, and entry for faster, accurate processing.'
  },
  {
    id: 3,
    name: 'Customer Onboarding',
    description: 'Streamline new customer setup and welcome process',
    category: 'Sales',
    icon: UserGroupIcon,
    color: 'bg-purple-500',
    status: 'paused',
    successRate: 96,
    timeSaved: '12 hours/week',
    setupPrice: 1600,
    monthlyPrice: 250,
    painPoint: 'New customers feel lost without structured onboarding, leading to churn.',
    solution: 'Automate welcome emails, training resources, and check-ins for smooth onboarding.'
  },
  {
    id: 4,
    name: 'Report Generation',
    description: 'Automatically generate and distribute weekly reports',
    category: 'Analytics',
    icon: ChartBarIcon,
    color: 'bg-orange-500',
    status: 'active',
    successRate: 100,
    timeSaved: '6 hours/week',
    setupPrice: 1200,
    monthlyPrice: 125,
    painPoint: 'Pulling reports manually wastes hours every week.',
    solution: 'Automatically generate and deliver reports on schedule with up-to-date data.'
  },
  {
    id: 5,
    name: 'Task Assignment',
    description: 'Intelligently assign tasks based on workload and expertise',
    category: 'Operations',
    icon: CalendarIcon,
    color: 'bg-pink-500',
    status: 'active',
    successRate: 92,
    timeSaved: '10 hours/week',
    setupPrice: 1700,
    monthlyPrice: 175,
    painPoint: 'Tasks fall through the cracks without clear ownership or reminders.',
    solution: 'Automatically assign and track tasks to keep teams accountable and on schedule.'
  },
  {
    id: 6,
    name: 'Follow-up Reminders',
    description: 'Send automated follow-up reminders for pending actions',
    category: 'Communication',
    icon: BellIcon,
    color: 'bg-indigo-500',
    status: 'active',
    successRate: 89,
    timeSaved: '5 hours/week',
    setupPrice: 800,
    monthlyPrice: 100,
    painPoint: 'Missed follow-ups cost deals and damage client relationships.',
    solution: 'Automatically send reminders so no opportunity or commitment is forgotten.'
  }
];

const categories = ['All', 'Marketing', 'Finance', 'Sales', 'Analytics', 'Operations', 'Communication'];

type AutomationTemplate = typeof automationTemplates[number];

export default function SmartAutomationsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<AutomationTemplate | null>(null);

  const handleDeploy = (templateId: number) => {
    router.push(`/automation/smart-automations/${templateId}`);
  };

  const filteredTemplates = selectedCategory === 'All' 
    ? automationTemplates 
    : automationTemplates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Smart Automations
              </h1>
              <p className="text-xl text-emerald-200 mb-6">
                Deploy ready-to-use automation templates for your business
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-emerald-300">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>56 Active Automations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>127 Hours Saved This Week</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5" />
                  <span>96% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-emerald-900 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Automation Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                      <p className="text-emerald-200 text-sm">{template.category}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.status === 'active' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {template.status}
                  </div>
                </div>

                <p className="text-emerald-200 text-sm mb-4">{template.description}</p>

                {/* Pain Point & Solution */}
                <div className="mb-4 space-y-2">
                  <div>
                    <div className="text-red-300 text-xs font-medium mb-1">Pain Point:</div>
                    <div className="text-white text-xs">{template.painPoint}</div>
                  </div>
                  <div>
                    <div className="text-green-300 text-xs font-medium mb-1">Solution:</div>
                    <div className="text-white text-xs">{template.solution}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div>
                    <div className="text-white font-semibold">{template.successRate}%</div>
                    <div className="text-emerald-300 text-xs">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{template.timeSaved}</div>
                    <div className="text-emerald-300 text-xs">Time Saved</div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-green-400 font-semibold text-lg">${template.setupPrice}</div>
                    <div className="text-emerald-300 text-xs">Setup Cost</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-blue-400 font-semibold text-lg">${template.monthlyPrice}</div>
                    <div className="text-emerald-300 text-xs">Monthly</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeploy(template.id);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors duration-300"
                  >
                    <PlayIcon className="w-4 h-4" />
                    <span>Deploy</span>
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="text-emerald-300 hover:text-white transition-colors duration-300"
                  >
                    <CogIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Template Details Modal */}
          {selectedTemplate && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full border border-white/20">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${selectedTemplate.color} rounded-lg flex items-center justify-center`}>
                      <selectedTemplate.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedTemplate.name}</h3>
                      <p className="text-emerald-200">{selectedTemplate.category} • {selectedTemplate.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-white hover:text-emerald-300 transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-emerald-200 mb-6">{selectedTemplate.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">Executions</span>
                        <span className="text-white">{selectedTemplate.executions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">Success Rate</span>
                        <span className="text-white">{selectedTemplate.successRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">Time Saved</span>
                        <span className="text-white">{selectedTemplate.timeSaved}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="text-emerald-300">Trigger: Email received</div>
                      <div className="text-emerald-300">Condition: Contains keyword</div>
                      <div className="text-emerald-300">Action: Send notification</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors duration-300">
                    <PlayIcon className="w-5 h-5" />
                    <span>Deploy Now</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300">
                    <CogIcon className="w-5 h-5" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">56</div>
              <div className="text-emerald-200">Active Automations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">4,567</div>
              <div className="text-emerald-200">Total Executions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">96%</div>
              <div className="text-emerald-200">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">127h</div>
              <div className="text-emerald-200">Time Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
