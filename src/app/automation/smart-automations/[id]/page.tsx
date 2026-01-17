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
  EnvelopeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
  BoltIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Automation data (same as in main page)
const automationTemplates = [
  {
    id: 1,
    name: 'Lead Nurturing Sequence',
    description: 'Automatically nurture leads with personalized email sequences',
    category: 'Marketing',
    icon: EnvelopeIcon,
    color: 'from-blue-600 to-blue-500',
    bgColor: 'bg-blue-500',
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
    color: 'from-green-600 to-green-500',
    bgColor: 'bg-green-500',
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
    color: 'from-purple-600 to-purple-500',
    bgColor: 'bg-purple-500',
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
    color: 'from-orange-600 to-orange-500',
    bgColor: 'bg-orange-500',
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
    color: 'from-pink-600 to-pink-500',
    bgColor: 'bg-pink-500',
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
    color: 'from-indigo-600 to-indigo-500',
    bgColor: 'bg-indigo-500',
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
    // Redirect to catalog page with automation id param and scroll to form
    router.push(`/automation/smart-automations?automation=${automation.id}#lead-form`);
  };

  if (!automation) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <BoltIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-white/60 font-medium">Loading automation details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 chess-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="relative pt-32 pb-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-white/40 hover:text-emerald-400 transition-colors duration-300 group"
                >
                  <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold uppercase tracking-widest">Back</span>
                </button>

                <div className="h-8 w-px bg-white/10" />

                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${automation.color} flex items-center justify-center shadow-lg`}>
                    <automation.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-3xl md:text-4xl font-bold text-white">{automation.name}</h1>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        automation.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {automation.status}
                      </span>
                    </div>
                    <p className="text-emerald-400/60 text-sm font-bold uppercase tracking-[0.2em]">{automation.category} Automation</p>
                  </div>
                </div>
              </div>

              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isSimulating
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isSimulating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                    <span>Simulating...</span>
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

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-8">

              {/* Problem & Solution */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <LightBulbIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Problem & Solution</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative bg-red-500/5 border border-red-500/20 rounded-2xl p-6 overflow-hidden group hover:border-red-500/30 transition-colors">
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/5 blur-[60px] rounded-full" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Pain Point</h3>
                      </div>
                      <p className="text-red-200/70 text-sm leading-relaxed">{automation.painPoint}</p>
                    </div>
                  </div>

                  <div className="relative bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <SparklesIcon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Our Solution</h3>
                      </div>
                      <p className="text-emerald-200/70 text-sm leading-relaxed">{automation.solution}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Demo Steps */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <BoltIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">How It Works</h2>
                </div>

                <div className="space-y-4">
                  {automation.demoSteps.map((step: string, index: number) => {
                    const isCompleted = isSimulating && index < currentStep;
                    const isCurrent = isSimulating && index === currentStep;
                    const isActive = isSimulating && index <= currentStep;

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 ${
                          isActive
                            ? 'bg-emerald-500/10 border border-emerald-500/30 scale-[1.02]'
                            : 'bg-white/5 border border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-slate-950'
                            : 'bg-white/10 text-white/40'
                        }`}>
                          {isCompleted ? (
                            <CheckCircleIcon className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <p className={`text-sm font-medium transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/50'
                        }`}>
                          {step}
                        </p>
                        {isCurrent && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <StarIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Key Features</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {automation.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition-colors">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-32 lg:self-start">

              {/* Performance Metrics */}
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Performance</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/50 text-sm font-medium">Success Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                          style={{ width: `${automation.successRate}%` }}
                        />
                      </div>
                      <span className="text-white font-bold text-sm">{automation.successRate}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/50 text-sm font-medium">Time Saved</span>
                    <span className="text-white font-bold text-sm">{automation.timeSaved}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/50 text-sm font-medium">Status</span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                      automation.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {automation.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase CTA */}
              <div className="relative bg-gradient-to-br from-emerald-500/10 via-slate-900/40 to-cyan-500/10 backdrop-blur-xl rounded-[2rem] p-6 border border-emerald-500/20 shadow-2xl overflow-hidden">
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full" />

                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-3">Ready to Deploy?</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Get this automation set up and running in your business within 2-3 weeks.
                  </p>

                  <button
                    onClick={handlePurchase}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] group"
                  >
                    <BellIcon className="w-5 h-5" />
                    <span>Join the Waitlist</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white/60">Secure deployment</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <SparklesIcon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-white/60">Customized for your business</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <RocketLaunchIcon className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-white/60">Setup in 2-3 weeks</span>
                    </div>
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
