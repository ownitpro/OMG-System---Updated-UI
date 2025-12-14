"use client";

import { useState, useEffect } from "react";
import { 
  ChartBarIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

interface ChatbotMetrics {
  totalInteractions: number;
  successfulInteractions: number;
  escalatedInteractions: number;
  averageResponseTime: number;
  averageConfidence: number;
  topQueries: Array<{
    query: string;
    count: number;
    avgConfidence: number;
  }>;
  escalationTypes: Record<string, number>;
  hourlyStats: Array<{
    hour: string;
    interactions: number;
    escalations: number;
  }>;
}

interface ChatbotAnalyticsProps {
  className?: string;
}

export default function ChatbotAnalytics({ className = "" }: ChatbotAnalyticsProps) {
  const [metrics, setMetrics] = useState<ChatbotMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would fetch from your analytics API
    // For now, we'll simulate some data
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in production, this would come from your analytics service
        const mockMetrics: ChatbotMetrics = {
          totalInteractions: 1247,
          successfulInteractions: 1089,
          escalatedInteractions: 158,
          averageResponseTime: 1240,
          averageConfidence: 0.73,
          topQueries: [
            { query: "What automations do you offer?", count: 45, avgConfidence: 0.82 },
            { query: "How secure is my data?", count: 38, avgConfidence: 0.76 },
            { query: "What industries do you serve?", count: 32, avgConfidence: 0.79 },
            { query: "Tell me about your CRM", count: 28, avgConfidence: 0.71 },
            { query: "How can I automate workflows?", count: 24, avgConfidence: 0.68 }
          ],
          escalationTypes: {
            "low_confidence": 89,
            "pricing": 34,
            "internal": 23,
            "admin": 12
          },
          hourlyStats: [
            { hour: "00:00", interactions: 12, escalations: 2 },
            { hour: "01:00", interactions: 8, escalations: 1 },
            { hour: "02:00", interactions: 5, escalations: 0 },
            { hour: "03:00", interactions: 3, escalations: 0 },
            { hour: "04:00", interactions: 4, escalations: 1 },
            { hour: "05:00", interactions: 7, escalations: 1 },
            { hour: "06:00", interactions: 15, escalations: 2 },
            { hour: "07:00", interactions: 28, escalations: 4 },
            { hour: "08:00", interactions: 45, escalations: 6 },
            { hour: "09:00", interactions: 67, escalations: 8 },
            { hour: "10:00", interactions: 89, escalations: 12 },
            { hour: "11:00", interactions: 95, escalations: 14 },
            { hour: "12:00", interactions: 78, escalations: 11 },
            { hour: "13:00", interactions: 82, escalations: 10 },
            { hour: "14:00", interactions: 91, escalations: 13 },
            { hour: "15:00", interactions: 88, escalations: 12 },
            { hour: "16:00", interactions: 76, escalations: 9 },
            { hour: "17:00", interactions: 65, escalations: 8 },
            { hour: "18:00", interactions: 52, escalations: 6 },
            { hour: "19:00", interactions: 38, escalations: 4 },
            { hour: "20:00", interactions: 29, escalations: 3 },
            { hour: "21:00", interactions: 22, escalations: 2 },
            { hour: "22:00", interactions: 18, escalations: 2 },
            { hour: "23:00", interactions: 14, escalations: 1 }
          ]
        };
        
        setMetrics(mockMetrics);
        setError(null);
      } catch (err) {
        setError("Failed to load analytics data");
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <div className="text-center text-red-600">
          <XCircleIcon className="h-12 w-12 mx-auto mb-2" />
          <p>{error || "Failed to load metrics"}</p>
        </div>
      </div>
    );
  }

  const successRate = ((metrics.successfulInteractions / metrics.totalInteractions) * 100).toFixed(1);
  const escalationRate = ((metrics.escalatedInteractions / metrics.totalInteractions) * 100).toFixed(1);

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center mb-6">
        <ChartBarIcon className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Chatbot Analytics</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Interactions</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.totalInteractions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-900">{successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-600">Escalation Rate</p>
              <p className="text-2xl font-bold text-yellow-900">{escalationRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-purple-900">
                {metrics.averageResponseTime < 1000 
                  ? `${metrics.averageResponseTime}ms` 
                  : `${(metrics.averageResponseTime / 1000).toFixed(1)}s`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Queries */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Queries</h3>
        <div className="space-y-3">
          {metrics.topQueries.map((query, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{query.query}</p>
                <p className="text-xs text-gray-500">
                  {query.count} times • {Math.round(query.avgConfidence * 100)}% confidence
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Types */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Escalation Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(metrics.escalationTypes).map(([type, count]) => (
            <div key={type} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 capitalize">{type.replace('_', ' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Activity Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Activity</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-12 gap-1 h-32">
            {metrics.hourlyStats.map((stat, index) => {
              const maxInteractions = Math.max(...metrics.hourlyStats.map(s => s.interactions));
              const height = (stat.interactions / maxInteractions) * 100;
              const escalationHeight = (stat.escalations / maxInteractions) * 100;
              
              return (
                <div key={index} className="flex flex-col justify-end">
                  <div className="relative h-full">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                      title={`${stat.hour}: ${stat.interactions} interactions, ${stat.escalations} escalations`}
                    />
                    {stat.escalations > 0 && (
                      <div 
                        className="absolute bottom-0 w-full bg-red-500 rounded-t"
                        style={{ height: `${escalationHeight}%` }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {stat.hour.split(':')[0]}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Interactions</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Escalations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
