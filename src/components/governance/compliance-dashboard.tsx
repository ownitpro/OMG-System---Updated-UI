"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  EyeIcon,
  CalendarIcon,
  AlertCircleIcon
} from '@heroicons/react/24/outline';
import { 
  complianceRequirements, 
  dataRetentionPolicies, 
  privacyImpactAssessments, 
  sampleAuditLogs,
  getComplianceScore,
  getUpcomingAssessments,
  getNonCompliantRequirements,
  ComplianceRequirement,
  DataRetentionPolicy,
  PrivacyImpactAssessment,
  AuditLog
} from '@/content/governance-compliance';

interface ComplianceDashboardProps {
  className?: string;
}

export function ComplianceDashboard({ className = "" }: ComplianceDashboardProps) {
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'policies' | 'assessments' | 'audit'>('overview');

  const complianceScore = getComplianceScore();
  const upcomingAssessments = getUpcomingAssessments();
  const nonCompliantRequirements = getNonCompliantRequirements();

  const frameworks = ['all', ...Object.keys(complianceRequirements)];
  const categories = ['all', 'data-protection', 'privacy', 'security', 'accessibility', 'audit', 'retention'];
  const statuses = ['all', 'compliant', 'partial', 'non-compliant', 'not-applicable'];

  const getFilteredRequirements = (): ComplianceRequirement[] => {
    let requirements = Object.values(complianceRequirements).flat();
    
    if (selectedFramework !== 'all') {
      requirements = requirements.filter(req => req.framework === selectedFramework);
    }
    
    if (selectedCategory !== 'all') {
      requirements = requirements.filter(req => req.category === selectedCategory);
    }
    
    if (selectedStatus !== 'all') {
      requirements = requirements.filter(req => req.status === selectedStatus);
    }
    
    return requirements;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'non-compliant': return 'text-red-600 bg-red-100';
      case 'not-applicable': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Compliance Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overall Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{complianceScore.overall.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Non-Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{nonCompliantRequirements.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAssessments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900">{dataRetentionPolicies.filter(p => p.status === 'active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Compliance Scores */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance by Framework</h3>
        <div className="space-y-4">
          {Object.entries(complianceScore.byFramework).map(([framework, score]) => (
            <div key={framework} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{framework}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12 text-right">{score.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audit Logs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Compliance Events</h3>
        <div className="space-y-3">
          {sampleAuditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${log.outcome === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{log.userId}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RequirementsTab = () => {
    const filteredRequirements = getFilteredRequirements();

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Framework</label>
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {frameworks.map(framework => (
                  <option key={framework} value={framework}>
                    {framework === 'all' ? 'All Frameworks' : framework}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Requirements List */}
        <div className="space-y-4">
          {filteredRequirements.map((requirement) => (
            <div key={requirement.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{requirement.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(requirement.status)}`}>
                      {requirement.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(requirement.priority)}`}>
                      {requirement.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{requirement.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Framework: {requirement.framework}</span>
                    <span>Owner: {requirement.owner}</span>
                    <span>Next Assessment: {new Date(requirement.nextAssessment).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PoliciesTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Retention Policies</h3>
        <div className="space-y-4">
          {dataRetentionPolicies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-md font-medium text-gray-900">{policy.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{policy.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Data Type: {policy.dataType}</span>
                    <span>Retention: {policy.retentionPeriod} days</span>
                    <span>Status: {policy.status}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  policy.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                }`}>
                  {policy.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AssessmentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Impact Assessments</h3>
        <div className="space-y-4">
          {privacyImpactAssessments.map((assessment) => (
            <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-md font-medium text-gray-900">{assessment.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(assessment.riskLevel)}`}>
                      {assessment.riskLevel} risk
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      assessment.status === 'approved' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                    }`}>
                      {assessment.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{assessment.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>Data Types: {assessment.dataTypes.join(', ')}</p>
                    <p>Legal Basis: {assessment.legalBasis}</p>
                    <p>Created: {new Date(assessment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AuditTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Audit Logs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleAuditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.resource}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.outcome === 'success' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {log.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.complianceRelevant ? 'text-blue-600 bg-blue-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {log.complianceRelevant ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Governance & Compliance</h1>
          <p className="text-gray-600">Monitor and manage compliance across all frameworks and regulations</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
            Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
            Export Data
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'requirements', name: 'Requirements', icon: ShieldCheckIcon },
            { id: 'policies', name: 'Policies', icon: DocumentTextIcon },
            { id: 'assessments', name: 'Assessments', icon: EyeIcon },
            { id: 'audit', name: 'Audit Logs', icon: UserGroupIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'requirements' && <RequirementsTab />}
        {activeTab === 'policies' && <PoliciesTab />}
        {activeTab === 'assessments' && <AssessmentsTab />}
        {activeTab === 'audit' && <AuditTab />}
      </div>
    </div>
  );
}
