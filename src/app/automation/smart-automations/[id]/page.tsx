"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

// Automation data (same as in main page)
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
    solution: 'Automatically nurture leads with timely, personalized messages to keep them engaged.',
    features: [
      'Automated email sequences based on lead behavior',
      'Personalized content based on lead source and interests',
      'A/B testing for optimal conversion rates',
      'Integration with CRM and marketing tools',
      'Advanced segmentation and targeting',
      'Performance analytics and reporting'
    ],
    demoSteps: [
      'Lead submits contact form on website',
      'System automatically adds lead to nurturing sequence',
      'Personalized welcome email sent within 5 minutes',
      'Follow-up emails sent based on lead behavior',
      'Lead scoring updated in real-time',
      'Sales team notified when lead is ready to buy'
    ]
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
    solution: 'Automate invoice capture, approval, and entry for faster, accurate processing.',
    features: [
      'OCR technology for automatic data extraction',
      'Smart categorization and coding',
      'Automated approval workflows',
      'Integration with accounting systems',
      'Exception handling and manual review',
      'Comprehensive audit trails'
    ],
    demoSteps: [
      'Invoice received via email or upload',
      'OCR extracts key data automatically',
      'System categorizes and codes invoice',
      'Approval workflow triggered if needed',
      'Data entered into accounting system',
      'Payment scheduled and tracked'
    ]
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
    solution: 'Automate welcome emails, training resources, and check-ins for smooth onboarding.',
    features: [
      'Automated welcome email sequences',
      'Personalized onboarding paths',
      'Training resource delivery',
      'Progress tracking and milestones',
      'Check-in scheduling and reminders',
      'Success metrics and reporting'
    ],
    demoSteps: [
      'New customer signs up for service',
      'Welcome email sent immediately',
      'Onboarding checklist created',
      'Training resources delivered',
      'Progress tracked automatically',
      'Success team notified of milestones'
    ]
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
    solution: 'Automatically generate and deliver reports on schedule with up-to-date data.',
    features: [
      'Automated data collection from multiple sources',
      'Custom report templates and formatting',
      'Scheduled delivery to stakeholders',
      'Interactive dashboards and visualizations',
      'Data validation and quality checks',
      'Version control and change tracking'
    ],
    demoSteps: [
      'Data sources connected and configured',
      'Report template created and customized',
      'Automated data collection begins',
      'Reports generated on schedule',
      'Quality checks performed automatically',
      'Reports delivered to stakeholders'
    ]
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
    solution: 'Automatically assign and track tasks to keep teams accountable and on schedule.',
    features: [
      'Intelligent task assignment algorithms',
      'Workload balancing and optimization',
      'Skill-based matching and routing',
      'Deadline tracking and reminders',
      'Progress monitoring and reporting',
      'Escalation and re-assignment logic'
    ],
    demoSteps: [
      'New task created with requirements',
      'System analyzes team member skills and workload',
      'Task automatically assigned to best person',
      'Deadline set and reminders scheduled',
      'Progress tracked in real-time',
      'Completion notification sent to stakeholders'
    ]
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
    solution: 'Automatically send reminders so no opportunity or commitment is forgotten.',
    features: [
      'Smart reminder scheduling',
      'Multi-channel notification delivery',
      'Escalation and priority management',
      'Customizable reminder templates',
      'Response tracking and analytics',
      'Integration with calendar and CRM'
    ],
    demoSteps: [
      'Follow-up action identified and scheduled',
      'Reminder automatically created',
      'Notification sent at optimal time',
      'Response tracked and recorded',
      'Escalation triggered if no response',
      'Success metrics updated'
    ]
  }
];

export default function AutomationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [automation, setAutomation] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const automationId = parseInt(params.id as string);
    const foundAutomation = automationTemplates.find(a => a.id === automationId);
    setAutomation(foundAutomation);
  }, [params.id]);

  const runSimulation = () => {
    if (!automation) return;
    
    setIsSimulating(true);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= automation.demoSteps.length) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return prev;
        }
        return nextStep;
      });
    }, 2000);
  };

  const handlePurchase = () => {
    // Store automation data and redirect to checkout
    sessionStorage.setItem('selectedAutomation', JSON.stringify(automation));
    router.push('/automation/smart-automations/checkout');
  };

  if (!automation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading automation details...</p>
        </div>
      </div>
    );
  }

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 text-emerald-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${automation.color} rounded-lg flex items-center justify-center`}>
                    <automation.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{automation.name}</h1>
                    <p className="text-emerald-200">{automation.category} Automation</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSimulating 
                      ? 'bg-orange-500 text-white cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-5 h-5" />
                      <span>Run Demo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Problem & Solution */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Problem & Solution</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
                      <h3 className="text-lg font-semibold text-white">Pain Point</h3>
                    </div>
                    <p className="text-red-200">{automation.painPoint}</p>
                  </div>
                  
                  <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <LightBulbIcon className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">Our Solution</h3>
                    </div>
                    <p className="text-green-200">{automation.solution}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
                
                <div className="space-y-4">
                  {automation.demoSteps.map((step: string, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                        isSimulating && index <= currentStep
                          ? 'bg-emerald-500/30 border border-emerald-400 scale-105'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSimulating && index <= currentStep
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/20 text-white/70'
                      }`}>
                        {isSimulating && index < currentStep ? (
                          <CheckCircleIcon className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        isSimulating && index <= currentStep
                          ? 'text-white font-semibold'
                          : 'text-emerald-200'
                      }`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {automation.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-emerald-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Pricing */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Pricing</h3>
                
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 font-medium">Setup Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-white">${automation.setupPrice}</div>
                    <div className="text-green-200 text-sm">One-time implementation</div>
                  </div>
                  
                  <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <ClockIcon className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-300 font-medium">Monthly Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-white">${automation.monthlyPrice}</div>
                    <div className="text-blue-200 text-sm">Ongoing maintenance</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300">Success Rate</span>
                    <span className="text-white font-semibold">{automation.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300">Time Saved</span>
                    <span className="text-white font-semibold">{automation.timeSaved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      automation.status === 'active' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {automation.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Ready to Deploy?</h3>
                <p className="text-emerald-200 text-sm mb-6">
                  Get this automation set up and running in your business within 2-3 weeks.
                </p>
                
                <button
                  onClick={handlePurchase}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <CreditCardIcon className="w-5 h-5" />
                  <span>Purchase & Deploy</span>
                </button>
                
                <div className="mt-4 space-y-2 text-sm text-emerald-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Secure deployment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-4 h-4" />
                    <span>Customized for your business</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RocketLaunchIcon className="w-4 h-4" />
                    <span>Setup in 2-3 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
