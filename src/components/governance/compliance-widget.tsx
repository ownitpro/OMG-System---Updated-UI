"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { 
  getComplianceScore,
  getUpcomingAssessments,
  getNonCompliantRequirements
} from '@/content/governance-compliance';

interface ComplianceWidgetProps {
  className?: string;
  showFullDetails?: boolean;
}

export function ComplianceWidget({ className = "", showFullDetails = false }: ComplianceWidgetProps) {
  const [complianceScore, setComplianceScore] = useState({ overall: 0, byFramework: {} });
  const [upcomingAssessments, setUpcomingAssessments] = useState<any[]>([]);
  const [nonCompliantRequirements, setNonCompliantRequirements] = useState<any[]>([]);

  useEffect(() => {
    // In a real application, this would fetch data from an API
    const score = getComplianceScore();
    const assessments = getUpcomingAssessments();
    const nonCompliant = getNonCompliantRequirements();
    
    setComplianceScore(score);
    setUpcomingAssessments(assessments);
    setNonCompliantRequirements(nonCompliant);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (!showFullDetails) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Compliance Status</h3>
          <Link 
            href="/admin/governance" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            View Details
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${getScoreBgColor(complianceScore.overall)}`}>
                <ChartBarIcon className={`h-5 w-5 ${getScoreColor(complianceScore.overall)}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Overall Compliance</p>
                <p className="text-xs text-gray-500">Across all frameworks</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${getScoreColor(complianceScore.overall)}`}>
                {complianceScore.overall.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-red-600">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{nonCompliantRequirements.length}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Issues</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-yellow-600">
                <ClockIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{upcomingAssessments.length}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Due Soon</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Governance & Compliance</h3>
        <Link 
          href="/admin/governance" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          Full Dashboard
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBgColor(complianceScore.overall)} mb-3`}>
            <span className={`text-2xl font-bold ${getScoreColor(complianceScore.overall)}`}>
              {complianceScore.overall.toFixed(0)}%
            </span>
          </div>
          <h4 className="text-lg font-medium text-gray-900">Overall Compliance Score</h4>
          <p className="text-sm text-gray-500">Across all regulatory frameworks</p>
        </div>

        {/* Framework Breakdown */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-gray-900">By Framework</h5>
          {Object.entries(complianceScore.byFramework).map(([framework, score]) => (
            <div key={framework} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{framework}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium w-10 text-right ${getScoreColor(score)}`}>
                  {score.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {(nonCompliantRequirements.length > 0 || upcomingAssessments.length > 0) && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-900">Alerts</h5>
            {nonCompliantRequirements.length > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  {nonCompliantRequirements.length} non-compliant requirement{nonCompliantRequirements.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            {upcomingAssessments.length > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <ClockIcon className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  {upcomingAssessments.length} assessment{upcomingAssessments.length !== 1 ? 's' : ''} due soon
                </span>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/admin/governance?tab=requirements"
              className="flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm font-medium"
            >
              <ShieldCheckIcon className="h-4 w-4 mr-1" />
              Requirements
            </Link>
            <Link 
              href="/admin/governance?tab=audit"
              className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 text-sm font-medium"
            >
              <ChartBarIcon className="h-4 w-4 mr-1" />
              Audit Logs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
