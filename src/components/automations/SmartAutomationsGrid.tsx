"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { AutomationDefinition, automations } from "@/data/automations";

interface SmartAutomationsGridProps {
  onOrderClick?: (automation: AutomationDefinition) => void;
  onCardExpand?: (automation: AutomationDefinition) => void;
  expandedCard?: string | null;
  selectedAutomation?: AutomationDefinition | null;
}

export function SmartAutomationsGrid({ 
  onOrderClick, 
  onCardExpand, 
  expandedCard, 
  selectedAutomation 
}: SmartAutomationsGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Import automations data
  const automations = [
    {
      slug: "overdue-invoice-notification",
      title: "Overdue Invoice Notification",
      setupTime: "2-3 weeks",
      setupCost: 800,
      monthlyCost: 60,
      pain: "Clients forget to pay and you chase manually.",
      benefit: "Automatically send payment reminders so cash flows consistently.",
      features: [
        "Auto email/SMS reminders for overdue invoices",
        "Escalation logic for repeated delays",
        "Custom message templates per client tier",
        "Integration with billing & accounting system"
      ],
      category: "Finance",
      industries: ["Accounting", "Contractors", "Healthcare"],
      icon: "💸"
    },
    {
      slug: "lead-capture-crm-sync",
      title: "Lead Capture & CRM Sync",
      setupTime: "1-2 weeks",
      setupCost: 600,
      monthlyCost: 45,
      pain: "Leads come in but you miss capturing them.",
      benefit: "Automatically capture leads from your forms/sheets.",
      features: [
        "Auto-capture from forms, calls, emails",
        "Smart duplicate detection",
        "Instant CRM updates",
        "Lead scoring & routing"
      ],
      category: "Lead Management",
      industries: ["Real Estate", "Contractors", "Healthcare"],
      icon: "🎯"
    },
    {
      slug: "appointment-reminders",
      title: "Appointment Reminders",
      setupTime: "1-2 weeks",
      setupCost: 500,
      monthlyCost: 40,
      pain: "Clients miss appointments, wasting your time.",
      benefit: "Automatically send reminders to reduce no-shows.",
      features: [
        "Multi-channel reminders (SMS, email, call)",
        "Customizable timing & messages",
        "Rescheduling & cancellation handling",
        "Calendar integration"
      ],
      category: "Scheduling",
      industries: ["Healthcare", "Real Estate", "Contractors"],
      icon: "📅"
    },
    {
      slug: "contract-expiry-alerts",
      title: "Contract Expiry & Renewal Alerts",
      setupTime: "2-3 weeks",
      setupCost: 700,
      monthlyCost: 55,
      pain: "Contracts lapse without reminders, you lose renewals.",
      benefit: "Get alert triggers before contract expiry to renew timely.",
      features: [
        "Automated expiry date tracking",
        "Multi-stage reminder system",
        "Renewal opportunity identification",
        "Contract performance analytics"
      ],
      category: "Legal & Compliance",
      industries: ["Property Management", "Real Estate", "Contractors"],
      icon: "📄"
    },
    {
      slug: "customer-feedback-request",
      title: "Customer Feedback Request",
      setupTime: "1-2 weeks",
      setupCost: 400,
      monthlyCost: 35,
      pain: "You rarely collect feedback, miss chances to improve.",
      benefit: "Automatically send feedback surveys to clients post-work.",
      features: [
        "Triggered feedback requests",
        "Multi-channel survey delivery",
        "Response tracking & analytics",
        "Review management & responses"
      ],
      category: "Customer Service",
      industries: ["Cleaning", "Contractors", "Healthcare"],
      icon: "⭐"
    },
    {
      slug: "meeting-followup-summary",
      title: "Meeting Follow-Up Summary",
      setupTime: "2-3 weeks",
      setupCost: 900,
      monthlyCost: 75,
      pain: "Key next steps from meetings get lost or delayed.",
      benefit: "Generate summaries and tasks automatically so nothing slips.",
      features: [
        "AI-powered meeting transcription",
        "Automatic action item extraction",
        "Task assignment & tracking",
        "Follow-up email generation"
      ],
      category: "Productivity",
      industries: ["Real Estate", "Property Management", "Healthcare"],
      icon: "📝"
    },
    {
      slug: "document-approval-workflow",
      title: "Document Approval Workflow",
      setupTime: "3-4 weeks",
      setupCost: 1200,
      monthlyCost: 90,
      pain: "Document approvals get stuck in bottlenecks.",
      benefit: "Streamline approvals with automated routing and reminders.",
      features: [
        "Multi-level approval routing",
        "Digital signature integration",
        "Approval deadline tracking",
        "Audit trail & compliance"
      ],
      category: "Document Management",
      industries: ["Property Management", "Real Estate", "Healthcare"],
      icon: "📋"
    },
    {
      slug: "inventory-reorder-alerts",
      title: "Inventory Reorder Alerts",
      setupTime: "2-3 weeks",
      setupCost: 800,
      monthlyCost: 60,
      pain: "You run out of supplies, disrupting service delivery.",
      benefit: "Automatically track inventory and reorder before stockout.",
      features: [
        "Real-time inventory tracking",
        "Smart reorder point calculation",
        "Supplier integration & ordering",
        "Cost optimization recommendations"
      ],
      category: "Inventory Management",
      industries: ["Cleaning", "Healthcare", "Contractors"],
      icon: "📦"
    },
    {
      slug: "tenant-communication-blast",
      title: "Tenant Communication Blast",
      setupTime: "1-2 weeks",
      setupCost: 500,
      monthlyCost: 40,
      pain: "Important updates don't reach all tenants effectively.",
      benefit: "Send targeted communications to tenant groups instantly.",
      features: [
        "Segmented tenant messaging",
        "Multi-channel delivery (SMS, email, app)",
        "Delivery confirmation tracking",
        "Response collection & management"
      ],
      category: "Communication",
      industries: ["Property Management", "Real Estate"],
      icon: "📢"
    },
    {
      slug: "maintenance-request-routing",
      title: "Maintenance Request Routing",
      setupTime: "2-3 weeks",
      setupCost: 1000,
      monthlyCost: 80,
      pain: "Maintenance requests get lost or assigned to wrong vendors.",
      benefit: "Automatically route requests to the right vendor with priority handling.",
      features: [
        "Smart vendor matching",
        "Priority-based routing",
        "Progress tracking & updates",
        "Cost estimation & approval"
      ],
      category: "Maintenance",
      industries: ["Property Management", "Real Estate"],
      icon: "🔧"
    },
    {
      slug: "payment-processing-automation",
      title: "Payment Processing Automation",
      setupTime: "3-4 weeks",
      setupCost: 1500,
      monthlyCost: 120,
      pain: "Payment processing is manual and error-prone.",
      benefit: "Automate payment collection, processing, and reconciliation.",
      features: [
        "Automated payment collection",
        "Multiple payment method support",
        "Reconciliation & reporting",
        "Fraud detection & prevention"
      ],
      category: "Finance",
      industries: ["Property Management", "Real Estate", "Contractors"],
      icon: "💳"
    },
    {
      slug: "compliance-reporting-automation",
      title: "Compliance Reporting Automation",
      setupTime: "4-5 weeks",
      setupCost: 2000,
      monthlyCost: 150,
      pain: "Compliance reporting is time-consuming and error-prone.",
      benefit: "Automatically generate and submit compliance reports.",
      features: [
        "Automated data collection",
        "Report generation & formatting",
        "Submission scheduling",
        "Audit trail maintenance"
      ],
      category: "Compliance",
      industries: ["Healthcare", "Property Management", "Real Estate"],
      icon: "📊"
    },
    {
      slug: "social-media-content-scheduling",
      title: "Social Media Content Scheduling",
      setupTime: "1-2 weeks",
      setupCost: 600,
      monthlyCost: 50,
      pain: "Social media posting is inconsistent and time-consuming.",
      benefit: "Automatically schedule and post content across platforms.",
      features: [
        "Multi-platform scheduling",
        "Content calendar management",
        "Performance analytics",
        "Engagement monitoring"
      ],
      category: "Marketing",
      industries: ["Real Estate", "Contractors", "Healthcare"],
      icon: "📱"
    }
  ];

  const categories = useMemo(() => {
    const allCategories = automations.map(auto => auto.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, []);

  const industries = useMemo(() => {
    const allIndustries = automations.flatMap(auto => auto.industries);
    return ['all', ...Array.from(new Set(allIndustries))];
  }, []);

  const filteredAutomations = useMemo(() => {
    return automations.filter(automation => {
      const matchesSearch = automation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           automation.pain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           automation.benefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           automation.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || automation.category === selectedCategory;
      const matchesIndustry = selectedIndustry === 'all' || automation.industries.includes(selectedIndustry);

      return matchesSearch && matchesCategory && matchesIndustry;
    });
  }, [automations, searchTerm, selectedCategory, selectedIndustry]);

  return (
    <Section className="bg-white py-16">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pick from 13 pre-built automations designed for your industry. Each automation is ready to deploy and can be customized to your specific needs.
            </p>
          </div>

          {/* Enhanced Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search automations..."
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-lime-500 focus:border-lime-500 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {/* Category Filters */}
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-lime-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {/* Industry Filters */}
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedIndustry === ind
                      ? 'bg-lime-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {ind === 'all' ? 'All Industries' : ind}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Automation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAutomations.map((automation) => {
              const isExpanded = expandedCard === automation.slug;
              const isSelected = selectedAutomation?.slug === automation.slug;
              
              return (
                <div
                  key={automation.slug}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                    isSelected ? 'border-lime-500 shadow-lime-100' : 'border-gray-200'
                  } ${isExpanded ? 'ring-2 ring-lime-500' : ''}`}
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{automation.icon}</div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">{automation.setupTime}</div>
                        <div className="text-xs text-lime-600 font-medium bg-lime-100 px-2 py-1 rounded-full">
                          {automation.category}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{automation.title}</h3>
                    
                    {/* Pain & Benefit */}
                    <div className="mb-4">
                      <p className="text-sm text-red-600 font-medium mb-1">Pain: {automation.pain}</p>
                      <p className="text-sm text-lime-600 font-bold">Benefit: {automation.benefit}</p>
                    </div>

                    {/* Key Features */}
                    <ul className="text-sm text-gray-600 space-y-1 mb-6">
                      {automation.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-lime-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {automation.features.length > 3 && (
                        <li className="text-xs text-gray-500">
                          +{automation.features.length - 3} more features
                        </li>
                      )}
                    </ul>

                    {/* Pricing */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Setup Cost:</span>
                        <span className="font-bold text-gray-900">${automation.setupCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly:</span>
                        <span className="font-bold text-gray-900">${automation.monthlyCost.toLocaleString()}/mo</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onCardExpand?.(automation)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                      </button>
                      <button
                        onClick={() => onOrderClick?.(automation)}
                        className="flex-1 bg-lime-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-lime-600 transition-all transform hover:scale-105 shadow-md"
                      >
                        Pick This
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Full Feature List</h4>
                      <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        {automation.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-lime-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2">What's Included</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-700 mb-1">Setup (${automation.setupCost.toLocaleString()})</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Full configuration</li>
                              <li>• Integration setup</li>
                              <li>• Team training</li>
                              <li>• 30-day support</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700 mb-1">Monthly (${automation.monthlyCost.toLocaleString()})</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Usage monitoring</li>
                              <li>• Regular updates</li>
                              <li>• Email support</li>
                              <li>• Performance optimization</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onOrderClick?.(automation)}
                        className="w-full bg-lime-500 text-white py-3 rounded-lg font-semibold hover:bg-lime-600 transition-all transform hover:scale-105 shadow-lg"
                      >
                        Order & Activate - ${automation.setupCost.toLocaleString()}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredAutomations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No automations found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedIndustry('all');
                }}
                className="bg-lime-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-lime-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}