"use client";

import React, { useState } from "react";
import { 
  ChartBarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MinusIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import { 
  kpiMetrics, 
  industryMetrics, 
  feedbackLoops, 
  dashboards, 
  Metric, 
  FeedbackLoop, 
  Dashboard,
  getMetricsByCategory,
  getMetricStatus,
  calculateMetricTrend
} from "@/content/measurement-metrics";

interface MeasurementDashboardProps {
  industry?: string;
  dashboardType?: 'executive' | 'operational' | 'marketing' | 'sales' | 'product';
}

export function MeasurementDashboard({ industry, dashboardType }: MeasurementDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'feedback' | 'dashboards'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const allMetrics = industry 
    ? [...kpiMetrics, ...(industryMetrics[industry] || [])]
    : [...kpiMetrics, ...Object.values(industryMetrics).flat()];

  const filteredMetrics = selectedCategory === 'all' 
    ? allMetrics 
    : allMetrics.filter(metric => metric.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Metrics', count: allMetrics.length },
    { id: 'acquisition', name: 'Acquisition', count: getMetricsByCategory('acquisition').length },
    { id: 'activation', name: 'Activation', count: getMetricsByCategory('activation').length },
    { id: 'retention', name: 'Retention', count: getMetricsByCategory('retention').length },
    { id: 'revenue', name: 'Revenue', count: getMetricsByCategory('revenue').length },
    { id: 'referral', name: 'Referral', count: getMetricsByCategory('referral').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'off-track':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'at-risk':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'off-track':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <MinusIcon className="h-4 w-4 text-gray-600" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatValue = (metric: Metric) => {
    switch (metric.type) {
      case 'currency':
        return `$${metric.value.toLocaleString()}`;
      case 'percentage':
        return `${metric.value.toFixed(1)}%`;
      case 'duration':
        return `${metric.value} days`;
      default:
        return metric.value.toLocaleString();
    }
  };

  const formatTarget = (metric: Metric) => {
    switch (metric.type) {
      case 'currency':
        return `$${metric.target.toLocaleString()}`;
      case 'percentage':
        return `${metric.target.toFixed(1)}%`;
      case 'duration':
        return `${metric.target} days`;
      default:
        return metric.target.toLocaleString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Measurement & Analytics</h2>
            <p className="text-gray-600 mt-1">
              {industry ? `${industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Metrics` : 'All Performance Metrics'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Analytics</span>
          </div>
        </div>
      </div>

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
            onClick={() => setActiveTab('metrics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'metrics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Metrics ({allMetrics.length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'feedback'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Feedback Loops ({feedbackLoops.length})
          </button>
          <button
            onClick={() => setActiveTab('dashboards')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboards'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboards ({dashboards.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            
            {/* Key Metrics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category) => {
                const categoryMetrics = getMetricsByCategory(category.id);
                const onTrackCount = categoryMetrics.filter(metric => getMetricStatus(metric) === 'on-track').length;
                const atRiskCount = categoryMetrics.filter(metric => getMetricStatus(metric) === 'at-risk').length;
                const offTrackCount = categoryMetrics.filter(metric => getMetricStatus(metric) === 'off-track').length;
                
                return (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">On Track</span>
                        <span className="text-sm font-semibold text-green-600">{onTrackCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">At Risk</span>
                        <span className="text-sm font-semibold text-yellow-600">{atRiskCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Off Track</span>
                        <span className="text-sm font-semibold text-red-600">{offTrackCount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Alerts */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h4>
              <div className="space-y-3">
                {feedbackLoops.slice(0, 3).map((loop) => (
                  <div key={loop.id} className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <BellIcon className="h-5 w-5 text-yellow-600 mr-3" />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{loop.name}</h5>
                      <p className="text-sm text-gray-600">{loop.description}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last run: {new Date(loop.lastRun).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6">
              {filteredMetrics.map((metric) => {
                const status = getMetricStatus(metric);
                const progress = (metric.value / metric.target) * 100;
                
                return (
                  <div key={metric.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{metric.name}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {getStatusIcon(status)}
                            <span className="ml-1">{status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {metric.category}
                          </span>
                          {metric.industry && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {metric.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{metric.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Current Value</p>
                            <p className="text-2xl font-bold text-gray-900">{formatValue(metric)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Target</p>
                            <p className="text-2xl font-bold text-gray-900">{formatTarget(metric)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Progress</p>
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    progress >= 100 ? 'bg-green-500' :
                                    progress >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{progress.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="flex items-center justify-end mb-2">
                          {getTrendIcon(metric.trend)}
                          <span className={`ml-1 text-sm font-semibold ${
                            metric.trend === 'up' ? 'text-green-600' :
                            metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {metric.period} • Updated {new Date(metric.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Feedback Loops</h3>
            <div className="grid gap-6">
              {feedbackLoops.map((loop) => (
                <div key={loop.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{loop.name}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          loop.status === 'active' ? 'bg-green-100 text-green-800' :
                          loop.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {loop.status}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {loop.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {loop.frequency}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{loop.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Triggers</h5>
                          <div className="space-y-2">
                            {loop.triggers.map((trigger) => (
                              <div key={trigger.id} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-900">{trigger.name}</p>
                                <p className="text-xs text-gray-600">{trigger.condition}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Actions</h5>
                          <div className="space-y-2">
                            {loop.actions.map((action) => (
                              <div key={action.id} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-900">{action.name}</p>
                                <p className="text-xs text-gray-600">{action.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm text-gray-600">Last Run</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(loop.lastRun).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Next: {new Date(loop.nextRun).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboards' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Custom Dashboards</h3>
            <div className="grid gap-6">
              {dashboards.map((dashboard) => (
                <div key={dashboard.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{dashboard.name}</h4>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {dashboard.type}
                        </span>
                        {dashboard.isPublic && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Public
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{dashboard.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Metrics</p>
                          <p className="text-lg font-semibold text-gray-900">{dashboard.metrics.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Refresh</p>
                          <p className="text-lg font-semibold text-gray-900">{dashboard.refreshInterval}m</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Filters</p>
                          <p className="text-lg font-semibold text-gray-900">{dashboard.filters.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Widgets</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {dashboard.layout.rows.reduce((sum, row) => sum + row.columns.reduce((colSum, col) => colSum + col.widgets.length, 0), 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(dashboard.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
