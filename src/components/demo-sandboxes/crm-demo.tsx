"use client";

import { useState, useEffect } from "react";
import { PlayIcon, ArrowPathIcon, ChartBarIcon, UserGroupIcon, DocumentTextIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { DemoTour } from "./demo-tour";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'demo-scheduled' | 'closed-won' | 'closed-lost';
  source: string;
  value: number;
  lastActivity: string;
}

interface DemoData {
  leads: Lead[];
  industry: string;
  preset: string;
}

export function CRMDemo() {
  const [demoData, setDemoData] = useState<DemoData>({
    leads: [],
    industry: 'property-management',
    preset: 'Property Management'
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const industryPresets = {
    'property-management': {
      name: 'Property Management',
      leads: [
        { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'new', source: 'Website Form', value: 2500, lastActivity: '2 hours ago' },
        { id: '2', name: 'Mike Chen', email: 'mike@example.com', status: 'contacted', source: 'Referral', value: 1800, lastActivity: '1 day ago' },
        { id: '3', name: 'Lisa Rodriguez', email: 'lisa@example.com', status: 'qualified', source: 'Google Ads', value: 3200, lastActivity: '3 days ago' },
        { id: '4', name: 'David Kim', email: 'david@example.com', status: 'demo-scheduled', source: 'Website Form', value: 2800, lastActivity: '5 days ago' },
        { id: '5', name: 'Emma Wilson', email: 'emma@example.com', status: 'closed-won', source: 'Referral', value: 4500, lastActivity: '1 week ago' }
      ]
    },
    'real-estate': {
      name: 'Real Estate',
      leads: [
        { id: '1', name: 'John Smith', email: 'john@example.com', status: 'new', source: 'Website Form', value: 15000, lastActivity: '1 hour ago' },
        { id: '2', name: 'Maria Garcia', email: 'maria@example.com', status: 'contacted', source: 'Facebook Ads', value: 12000, lastActivity: '2 hours ago' },
        { id: '3', name: 'Robert Brown', email: 'robert@example.com', status: 'qualified', source: 'Referral', value: 18000, lastActivity: '1 day ago' }
      ]
    },
    'contractors': {
      name: 'Contractors',
      leads: [
        { id: '1', name: 'Tom Anderson', email: 'tom@example.com', status: 'new', source: 'Website Form', value: 8500, lastActivity: '30 minutes ago' },
        { id: '2', name: 'Jennifer Lee', email: 'jennifer@example.com', status: 'contacted', source: 'Google Ads', value: 12000, lastActivity: '4 hours ago' },
        { id: '3', name: 'Mark Thompson', email: 'mark@example.com', status: 'qualified', source: 'Referral', value: 15000, lastActivity: '2 days ago' }
      ]
    }
  };

  useEffect(() => {
    // Load initial demo data
    const preset = industryPresets[demoData.industry as keyof typeof industryPresets];
    if (preset) {
      setDemoData(prev => ({
        ...prev,
        leads: preset.leads,
        preset: preset.name
      }));
    }
  }, [demoData.industry]);

  const resetDemoData = () => {
    const preset = industryPresets[demoData.industry as keyof typeof industryPresets];
    if (preset) {
      setDemoData(prev => ({
        ...prev,
        leads: preset.leads,
        preset: preset.name
      }));
    }
    setSelectedLead(null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'demo-scheduled': 'bg-purple-100 text-purple-800',
      'closed-won': 'bg-emerald-100 text-emerald-800',
      'closed-lost': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const tourSteps = [
    {
      target: '.industry-badge',
      title: 'See your Industry Setup',
      content: `You're viewing the ${demoData.preset} CRM preset. We preloaded sample stages, forms, and messages for Ontario.`,
      placement: 'bottom'
    },
    {
      target: '.leads-list',
      title: 'New Lead Appears Instantly',
      content: 'New inquiries from forms/ads/chat appear here. You can filter by status and owner.',
      placement: 'right'
    },
    {
      target: '.timeline-section',
      title: 'Auto Follow-ups',
      content: 'Auto emails/SMS launch immediately—so you respond within minutes. Edit templates anytime.',
      placement: 'top'
    },
    {
      target: '.schedule-button',
      title: 'Book Without Back-and-Forth',
      content: 'Invite clients to self-book from your real-time availability. Reminders reduce no-shows.',
      placement: 'top'
    },
    {
      target: '.documents-tab',
      title: 'Documents & E-sign',
      content: 'Generate contracts, forms, or proposals and send for e-signature. Everything is filed automatically.',
      placement: 'top'
    },
    {
      target: '.pipeline-board',
      title: 'Move the Deal Forward',
      content: 'Drag cards between stages (New → In Progress → Won). Automations trigger on stage change.',
      placement: 'top'
    },
    {
      target: '.dashboard-tab',
      title: 'Dashboards that Matter',
      content: 'Track response times, pipeline value, and activity. Get signal without the clutter.',
      placement: 'top'
    },
    {
      target: '.reset-button',
      title: 'Try It or Reset',
      content: 'Play around freely—then reset to start fresh. Ready to see it with your data?',
      placement: 'top'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500 px-2 py-1 rounded text-xs font-medium industry-badge">
                {demoData.preset}
              </span>
              <span className="text-sm opacity-90">CRM Demo</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTourActive(true)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded text-sm transition-colors"
            >
              <PlayIcon className="h-4 w-4" />
              <span>Show guided tour</span>
            </button>
            <button
              onClick={resetDemoData}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded text-sm transition-colors reset-button"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Reset demo data</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Sidebar - Leads List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Leads</h3>
            <p className="text-sm text-gray-600">{demoData.leads.length} total leads</p>
          </div>
          
          <div className="flex-1 overflow-y-auto leads-list">
            {demoData.leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedLead?.id === lead.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{lead.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{lead.email}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{lead.source}</span>
                  <span>${lead.value.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{lead.lastActivity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedLead ? (
            <>
              {/* Lead Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedLead.name}</h2>
                    <p className="text-gray-600">{selectedLead.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status.replace('-', ' ')}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${selectedLead.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                  Timeline
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Documents
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Dashboard
                </button>
              </div>

              {/* Timeline Section */}
              <div className="flex-1 p-4 overflow-y-auto timeline-section">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lead created</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Auto-email sent</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                      <p className="text-xs text-gray-600 mt-1">Welcome email with next steps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Follow-up scheduled</p>
                      <p className="text-xs text-gray-500">In 2 days</p>
                      <p className="text-xs text-gray-600 mt-1">Phone call reminder set</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="schedule-button flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Schedule Meeting</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <UserGroupIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Select a lead to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pipeline Board (Hidden by default, shown in tour) */}
      <div className="pipeline-board hidden">
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Pipeline</h3>
          <div className="grid grid-cols-4 gap-4">
            {['New', 'Contacted', 'Qualified', 'Closed Won'].map((stage) => (
              <div key={stage} className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">{stage}</h4>
                <div className="space-y-2">
                  {demoData.leads.filter(lead => lead.status === stage.toLowerCase().replace(' ', '-')).map((lead) => (
                    <div key={lead.id} className="bg-white p-2 rounded border cursor-pointer hover:shadow-sm">
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-gray-600">${lead.value.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Tour */}
      {isTourActive && (
        <DemoTour
          steps={tourSteps}
          onClose={() => setIsTourActive(false)}
          onComplete={() => setIsTourActive(false)}
        />
      )}
    </div>
  );
}
