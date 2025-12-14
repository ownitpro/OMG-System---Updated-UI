"use client";

import React, { useState } from "react";
import { EnvelopeIcon, ClockIcon, ChartBarIcon, PlayIcon, PauseIcon, EyeIcon } from "@heroicons/react/24/outline";
import { emailSequences, EmailSequence, EmailTemplate } from "@/content/email-drips";

interface EmailSequenceManagerProps {
  industry?: string;
}

export function EmailSequenceManager({ industry }: EmailSequenceManagerProps) {
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'analytics'>('overview');

  const sequences = industry 
    ? Object.values(emailSequences).filter(seq => seq.industry === industry)
    : Object.values(emailSequences);

  const currentSequence = selectedSequence 
    ? sequences.find(seq => seq.id === selectedSequence)
    : sequences[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'bg-blue-100 text-blue-800';
      case 'nurture':
        return 'bg-purple-100 text-purple-800';
      case 'educational':
        return 'bg-green-100 text-green-800';
      case 'promotional':
        return 'bg-orange-100 text-orange-800';
      case 're-engagement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Email Sequences</h2>
            <p className="text-gray-600 mt-1">
              {industry ? `${industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Sequences` : 'All Email Sequences'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Email Marketing</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Sequence List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sequences</h3>
            <div className="space-y-2">
              {sequences.map((sequence) => (
                <button
                  key={sequence.id}
                  onClick={() => setSelectedSequence(sequence.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
                    selectedSequence === sequence.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{sequence.name}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sequence.status)}`}>
                      {sequence.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{sequence.description}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>{sequence.totalDuration} days</span>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-3 w-3 mr-1" />
                      <span>{sequence.templates.length} emails</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {currentSequence && (
            <>
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'templates'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Templates ({currentSequence.templates.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'analytics'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Analytics
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{currentSequence.name}</h3>
                      <p className="text-gray-600 mb-4">{currentSequence.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentSequence.status)}`}>
                          {currentSequence.status}
                        </span>
                        {currentSequence.industry && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {currentSequence.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <ClockIcon className="h-8 w-8 text-blue-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Total Duration</p>
                            <p className="text-2xl font-bold text-gray-900">{currentSequence.totalDuration} days</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-8 w-8 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Email Count</p>
                            <p className="text-2xl font-bold text-gray-900">{currentSequence.templates.length}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Expected Open Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{currentSequence.expectedOpenRate}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Sequence Details</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Trigger</p>
                            <p className="font-medium text-gray-900">{currentSequence.trigger.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Expected Click Rate</p>
                            <p className="font-medium text-gray-900">{currentSequence.expectedClickRate}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'templates' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
                    <div className="space-y-4">
                      {currentSequence.templates.map((template, index) => (
                        <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Email {index + 1}
                                </span>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                                  {template.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  template.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  template.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {template.priority} priority
                                </span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.subject}</h4>
                              <p className="text-gray-600 text-sm mb-3">{template.preheader}</p>
                              <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <div className="flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  <span>Send after {template.delay} hours</span>
                                </div>
                                <div className="flex items-center">
                                  <span>CTA: {template.ctaText}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <PlayIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Open Rate</span>
                            <span className="font-semibold text-gray-900">{currentSequence.expectedOpenRate}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Click Rate</span>
                            <span className="font-semibold text-gray-900">{currentSequence.expectedClickRate}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Conversion Rate</span>
                            <span className="font-semibold text-gray-900">12%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Engagement</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Sent</span>
                            <span className="font-semibold text-gray-900">1,247</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Opens</span>
                            <span className="font-semibold text-gray-900">349</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Clicks</span>
                            <span className="font-semibold text-gray-900">112</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
