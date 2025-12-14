"use client";

import { useState } from 'react';
import { 
  WrenchScrewdriverIcon, 
  CogIcon, 
  PlayIcon, 
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CalendarIcon,
  BellIcon,
  ArrowRightIcon,
  StarIcon,
  LightBulbIcon,
  CodeBracketIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';


const customAutomations = [
  {
    id: 1,
    name: 'Multi-Channel Lead Scoring',
    description: 'Automatically scores leads from multiple sources (website, email, social, ads) based on behavior and engagement, so your sales team focuses on the hottest prospects.',
    painPoint: 'Stop wasting time on cold leads. Your sales team spends hours qualifying prospects manually, missing hot opportunities while chasing dead ends.',
    solution: 'Our AI-powered system identifies who\'s ready to buy instantly, so you close deals faster and never miss a hot prospect again.',
    whyChooseUs: 'We integrate all your channels into one intelligent scoring system—no guesswork, just data-driven prioritization tailored to your business.',
    complexity: 'High',
    icon: ChartBarIcon,
    color: 'bg-purple-500',
    status: 'In Development',
    progress: 75,
    estimatedCompletion: '2 weeks',
    features: ['AI-powered scoring', 'Real-time updates', 'Custom algorithms'],
    businessImpact: '40% faster lead qualification, 60% higher conversion rates'
  },
  {
    id: 2,
    name: 'Dynamic Pricing Engine',
    description: 'Adjusts your pricing in real-time based on demand, competition, inventory, and customer behavior to maximize revenue.',
    painPoint: 'Stay competitive and profitable without constant manual price updates. Your current pricing strategy is static while your market is dynamic.',
    solution: 'Our engine learns your market and adapts continuously, ensuring you\'re always pricing optimally without sacrificing margins.',
    whyChooseUs: 'Unlike basic pricing tools, our AI understands your unique market dynamics and customer behavior patterns for maximum profitability.',
    complexity: 'High',
    icon: CpuChipIcon,
    color: 'bg-blue-500',
    status: 'Completed',
    progress: 100,
    estimatedCompletion: 'Completed',
    features: ['Market analysis', 'Competitor tracking', 'Automated adjustments'],
    businessImpact: '25% revenue increase, 15% margin improvement'
  },
  {
    id: 3,
    name: 'Inventory Optimization',
    description: 'Predicts demand, automates reordering, and optimizes stock levels to prevent overstocking and stockouts.',
    painPoint: 'Reduce waste, free up cash flow, and never lose a sale due to out-of-stock items. Manual inventory management is costing you money.',
    solution: 'Our AI-driven system learns your sales patterns and seasonality, making smarter inventory decisions than any manual process.',
    whyChooseUs: 'We don\'t just track inventory—we predict demand with 95% accuracy and automate reordering before you even know you need it.',
    complexity: 'Medium',
    icon: DocumentTextIcon,
    color: 'bg-green-500',
    status: 'Testing',
    progress: 90,
    estimatedCompletion: '1 week',
    features: ['Demand prediction', 'Reorder automation', 'Cost optimization'],
    businessImpact: '30% reduction in stockouts, 20% less waste'
  },
  {
    id: 4,
    name: 'Customer Journey Mapping',
    description: 'Tracks every touchpoint and interaction a customer has with your business, visualizing their journey from first contact to loyal advocate.',
    painPoint: 'Understand where customers drop off, what drives conversions, and how to improve their experience at every stage.',
    solution: 'We don\'t just map—we automate actions based on journey insights, so your team responds in real-time to customer needs.',
    whyChooseUs: 'Our system doesn\'t just show you the journey—it actively improves it by triggering personalized actions at critical moments.',
    complexity: 'High',
    icon: UserGroupIcon,
    color: 'bg-pink-500',
    status: 'Planning',
    progress: 25,
    estimatedCompletion: '4 weeks',
    features: ['Journey tracking', 'Experience scoring', 'Optimization suggestions'],
    businessImpact: '50% improvement in customer satisfaction, 35% higher retention'
  }
];

const complexityLevels = ['All', 'Low', 'Medium', 'High'];
const statusFilters = ['All', 'Planning', 'In Development', 'Testing', 'Completed'];

export default function CustomAutomationPage() {
  const [selectedComplexity, setSelectedComplexity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAutomation, setSelectedAutomation] = useState(null);

  const filteredAutomations = customAutomations.filter(automation => {
    const complexityMatch = selectedComplexity === 'All' || automation.complexity === selectedComplexity;
    const statusMatch = selectedStatus === 'All' || automation.status === selectedStatus;
    return complexityMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Custom Automation
              </h1>
              <p className="text-xl text-orange-200 mb-6">
                Bespoke automation development tailored to your specific business needs
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-orange-300">
                <div className="flex items-center space-x-2">
                  <WrenchScrewdriverIcon className="w-5 h-5" />
                  <span>Expert Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LightBulbIcon className="w-5 h-5" />
                  <span>Tailored Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5" />
                  <span>100% Custom</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Complexity</label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {complexityLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusFilters.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Custom Automations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredAutomations.map((automation) => (
              <div
                key={automation.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedAutomation(automation)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${automation.color} rounded-lg flex items-center justify-center`}>
                      <automation.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{automation.name}</h3>
                      <p className="text-orange-200 text-sm">{automation.complexity} Complexity</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    automation.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-300' 
                      : automation.status === 'In Development'
                      ? 'bg-blue-500/20 text-blue-300'
                      : automation.status === 'Testing'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {automation.status}
                  </div>
                </div>

                <p className="text-blue-200 text-sm mb-4">{automation.description}</p>

                {/* Pain Point & Solution */}
                <div className="mb-4 space-y-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="text-red-300 text-xs font-medium mb-1">Pain Point:</div>
                    <div className="text-white text-xs">{automation.painPoint}</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="text-green-300 text-xs font-medium mb-1">Our Solution:</div>
                    <div className="text-white text-xs">{automation.solution}</div>
                  </div>
                </div>

                {/* Business Impact */}
                <div className="mb-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-emerald-300 text-xs font-medium mb-1">Business Impact:</div>
                    <div className="text-white text-xs font-semibold">{automation.businessImpact}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-blue-300 mb-1">
                    <span>Progress</span>
                    <span>{automation.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${automation.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-300">
                    <ClockIcon className="w-4 h-4 inline mr-1" />
                    {automation.estimatedCompletion}
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300">
                    <PlayIcon className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Automation Details Modal */}
          {selectedAutomation && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-3xl w-full border border-white/20">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${selectedAutomation.color} rounded-lg flex items-center justify-center`}>
                      <selectedAutomation.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedAutomation.name}</h3>
                      <p className="text-blue-200">{selectedAutomation.complexity} Complexity • {selectedAutomation.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAutomation(null)}
                    className="text-white hover:text-blue-300 transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-blue-200 mb-6">{selectedAutomation.description}</p>

                {/* Pain Point & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="text-red-300 font-semibold mb-3">Pain Point</h4>
                    <p className="text-white text-sm">{selectedAutomation.painPoint}</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-300 font-semibold mb-3">Our Solution</h4>
                    <p className="text-white text-sm">{selectedAutomation.solution}</p>
                  </div>
                </div>

                {/* Why Choose Us & Business Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-300 font-semibold mb-3">Why Choose Us</h4>
                    <p className="text-white text-sm">{selectedAutomation.whyChooseUs}</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <h4 className="text-emerald-300 font-semibold mb-3">Business Impact</h4>
                    <p className="text-white text-sm font-semibold">{selectedAutomation.businessImpact}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Development Progress</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Progress</span>
                        <span className="text-white">{selectedAutomation.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${selectedAutomation.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300">Estimated Completion</span>
                        <span className="text-white">{selectedAutomation.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <div className="space-y-2">
                      {selectedAutomation.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircleIcon className="w-4 h-4 text-green-400" />
                          <span className="text-blue-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-300">
                    <CodeBracketIcon className="w-5 h-5" />
                    <span>View Code</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors duration-300">
                    <CogIcon className="w-5 h-5" />
                    <span>Configure</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Development Process */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LightBulbIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Discovery</h3>
                <p className="text-orange-200 text-sm">We analyze your business needs and requirements</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Design</h3>
                <p className="text-orange-200 text-sm">We create detailed specifications and architecture</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CodeBracketIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Development</h3>
                <p className="text-orange-200 text-sm">Our experts build your custom automation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Deployment</h3>
                <p className="text-orange-200 text-sm">We deploy and monitor your automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
