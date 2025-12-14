"use client";

import React, { useState, useEffect } from "react";
import { 
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

interface ContactSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry: string;
  product?: string;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate some data
    const mockSubmissions: ContactSubmission[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        name: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        company: 'Smith Properties',
        industry: 'Property Management',
        product: 'CRM',
        message: 'Looking for a CRM solution for our property management business.',
        source: 'contact-sales',
        status: 'new'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        company: 'Johnson Realty',
        industry: 'Real Estate',
        product: 'Lead Flow Engine',
        message: 'Interested in lead generation automation.',
        source: 'contact-sales',
        status: 'contacted'
      }
    ];

    setSubmissions(mockSubmissions);
    
    // Calculate stats
    const newStats = {
      total: mockSubmissions.length,
      new: mockSubmissions.filter(s => s.status === 'new').length,
      contacted: mockSubmissions.filter(s => s.status === 'contacted').length,
      qualified: mockSubmissions.filter(s => s.status === 'qualified').length,
      closed: mockSubmissions.filter(s => s.status === 'closed').length
    };
    setStats(newStats);
  }, []);

  const updateSubmissionStatus = (id: string, status: ContactSubmission['status']) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'contacted': return <PhoneIcon className="w-4 h-4" />;
      case 'qualified': return <CheckCircleIcon className="w-4 h-4" />;
      case 'closed': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-gray-600">Manage contact sales submissions and track leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <PhoneIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.contacted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Qualified</p>
                <p className="text-2xl font-bold text-gray-900">{stats.qualified}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.closed}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submissions List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <div 
                    key={submission.id}
                    className="p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {submission.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{submission.name}</h3>
                          <p className="text-sm text-gray-500">{submission.email}</p>
                          <p className="text-sm text-gray-500">{submission.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status}</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Industry:</strong> {submission.industry}
                        {submission.product && (
                          <span> • <strong>Product:</strong> {submission.product}</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-sm text-gray-900">{selectedSubmission.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-sm text-gray-900">{selectedSubmission.email}</p>
                    </div>
                    {selectedSubmission.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-sm text-gray-900">{selectedSubmission.phone}</p>
                      </div>
                    )}
                    {selectedSubmission.company && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Company</label>
                        <p className="text-sm text-gray-900">{selectedSubmission.company}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Industry</label>
                      <p className="text-sm text-gray-900">{selectedSubmission.industry}</p>
                    </div>
                    {selectedSubmission.product && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Product Interest</label>
                        <p className="text-sm text-gray-900">{selectedSubmission.product}</p>
                      </div>
                    )}
                    {selectedSubmission.message && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Message</label>
                        <p className="text-sm text-gray-900">{selectedSubmission.message}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Source</label>
                      <p className="text-sm text-gray-900">{selectedSubmission.source}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Submitted</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedSubmission.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <h3 className="text-sm font-medium text-gray-900">Update Status</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateSubmissionStatus(selectedSubmission.id, 'contacted')}
                        className="px-3 py-2 text-xs font-medium text-yellow-800 bg-yellow-100 rounded hover:bg-yellow-200"
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => updateSubmissionStatus(selectedSubmission.id, 'qualified')}
                        className="px-3 py-2 text-xs font-medium text-blue-800 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        Qualified
                      </button>
                      <button
                        onClick={() => updateSubmissionStatus(selectedSubmission.id, 'closed')}
                        className="px-3 py-2 text-xs font-medium text-green-800 bg-green-100 rounded hover:bg-green-200"
                      >
                        Closed
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                      <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                      Send Email
                    </button>
                    <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700">
                      <PhoneIcon className="w-4 h-4 inline mr-2" />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
