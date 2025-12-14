"use client";

import React, { useState } from "react";
import { ChartBarIcon, EyeIcon, CursorArrowRaysIcon, CurrencyDollarIcon, UsersIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import { retargetingAudiences, retargetingCreatives, RetargetingAudience, RetargetingCreative, getAudiencePerformance } from "@/content/retargeting-audiences";

interface RetargetingManagerProps {
  industry?: string;
}

export function RetargetingManager({ industry }: RetargetingManagerProps) {
  const [activeTab, setActiveTab] = useState<'audiences' | 'creatives' | 'performance'>('audiences');
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  const audiences = industry 
    ? retargetingAudiences[industry as keyof typeof retargetingAudiences] || []
    : Object.values(retargetingAudiences).flat();

  const creatives = industry 
    ? retargetingCreatives[industry as keyof typeof retargetingCreatives] || []
    : Object.values(retargetingCreatives).flat();

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

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return 'bg-blue-100 text-blue-800';
      case 'google':
        return 'bg-red-100 text-red-800';
      case 'linkedin':
        return 'bg-blue-100 text-blue-800';
      case 'twitter':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'image':
        return 'bg-purple-100 text-purple-800';
      case 'video':
        return 'bg-pink-100 text-pink-800';
      case 'carousel':
        return 'bg-indigo-100 text-indigo-800';
      case 'collection':
        return 'bg-teal-100 text-teal-800';
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
            <h2 className="text-2xl font-bold text-gray-900">Retargeting Campaigns</h2>
            <p className="text-gray-600 mt-1">
              {industry ? `${industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Retargeting` : 'All Retargeting Campaigns'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MegaphoneIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Retargeting</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('audiences')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'audiences'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Audiences ({audiences.length})
          </button>
          <button
            onClick={() => setActiveTab('creatives')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'creatives'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Creatives ({creatives.length})
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'performance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Performance
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'audiences' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Retargeting Audiences</h3>
            <div className="grid gap-6">
              {audiences.map((audience) => {
                const performance = getAudiencePerformance(audience.id);
                return (
                  <div key={audience.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{audience.name}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audience.status)}`}>
                            {audience.status}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(audience.platform)}`}>
                            {audience.platform}
                          </span>
                          {audience.industry && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {audience.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{audience.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center">
                              <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Audience Size</p>
                                <p className="text-lg font-bold text-gray-900">{audience.size.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center">
                              <EyeIcon className="h-5 w-5 text-green-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Impressions</p>
                                <p className="text-lg font-bold text-gray-900">{performance.totalImpressions.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center">
                              <CursorArrowRaysIcon className="h-5 w-5 text-purple-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">Clicks</p>
                                <p className="text-lg font-bold text-gray-900">{performance.totalClicks.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center">
                              <ChartBarIcon className="h-5 w-5 text-orange-600 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">CTR</p>
                                <p className="text-lg font-bold text-gray-900">{performance.avgCtr.toFixed(2)}%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'creatives' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Retargeting Creatives</h3>
            <div className="grid gap-6">
              {creatives.map((creative) => (
                <div key={creative.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{creative.name}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(creative.status)}`}>
                          {creative.status}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(creative.platform)}`}>
                          {creative.platform}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(creative.format)}`}>
                          {creative.format}
                        </span>
                        {creative.industry && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {creative.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{creative.description}</p>
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Creative Content:</h5>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-semibold text-gray-900 mb-2">{creative.content.headline}</p>
                          <p className="text-gray-600 text-sm mb-3">{creative.content.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">CTA: {creative.cta}</span>
                            <span className="text-sm text-gray-500">Audience: {creative.audienceId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <EyeIcon className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-600">Impressions</p>
                              <p className="text-lg font-bold text-gray-900">{creative.performance.impressions.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <CursorArrowRaysIcon className="h-5 w-5 text-green-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-600">Clicks</p>
                              <p className="text-lg font-bold text-gray-900">{creative.performance.clicks.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <ChartBarIcon className="h-5 w-5 text-purple-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-600">CTR</p>
                              <p className="text-lg font-bold text-gray-900">{creative.performance.ctr.toFixed(2)}%</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-5 w-5 text-orange-600 mr-2" />
                            <div>
                              <p className="text-sm text-gray-600">ROAS</p>
                              <p className="text-lg font-bold text-gray-900">{creative.performance.roas.toFixed(1)}x</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Metrics */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center">
                  <EyeIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-blue-600">Total Impressions</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {creatives.reduce((sum, creative) => sum + creative.performance.impressions, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center">
                  <CursorArrowRaysIcon className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-green-600">Total Clicks</p>
                    <p className="text-2xl font-bold text-green-900">
                      {creatives.reduce((sum, creative) => sum + creative.performance.clicks, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center">
                  <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-purple-600">Avg CTR</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {(creatives.reduce((sum, creative) => sum + creative.performance.ctr, 0) / creatives.length).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm text-orange-600">Avg ROAS</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {(creatives.reduce((sum, creative) => sum + creative.performance.roas, 0) / creatives.length).toFixed(1)}x
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Creatives */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Creatives</h4>
              <div className="space-y-4">
                {creatives
                  .sort((a, b) => b.performance.roas - a.performance.roas)
                  .slice(0, 5)
                  .map((creative, index) => (
                    <div key={creative.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{creative.name}</h5>
                          <p className="text-sm text-gray-600">{creative.platform} • {creative.format}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">ROAS</p>
                          <p className="font-semibold text-gray-900">{creative.performance.roas.toFixed(1)}x</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">CTR</p>
                          <p className="font-semibold text-gray-900">{creative.performance.ctr.toFixed(2)}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Conversions</p>
                          <p className="font-semibold text-gray-900">{creative.performance.conversions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
