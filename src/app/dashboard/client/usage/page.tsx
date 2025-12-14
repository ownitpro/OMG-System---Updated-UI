import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
const usageData = {
  storage: {
    used: 2.3,
    limit: 10,
    unit: "GB",
    percentage: 23,
    trend: "up",
    trendValue: 0.2,
  },
  ocrPages: {
    used: 1250,
    limit: 5000,
    unit: "pages",
    percentage: 25,
    trend: "up",
    trendValue: 150,
  },
  workflowRuns: {
    used: 45,
    limit: 100,
    unit: "runs",
    percentage: 45,
    trend: "up",
    trendValue: 5,
  },
  apiCalls: {
    used: 12500,
    limit: 50000,
    unit: "calls",
    percentage: 25,
    trend: "down",
    trendValue: 500,
  },
};

const usageHistory = [
  { date: "2024-01-01", storage: 1.8, ocrPages: 800, workflowRuns: 30, apiCalls: 8000 },
  { date: "2024-01-08", storage: 2.0, ocrPages: 950, workflowRuns: 35, apiCalls: 9500 },
  { date: "2024-01-15", storage: 2.1, ocrPages: 1100, workflowRuns: 40, apiCalls: 11000 },
  { date: "2024-01-22", storage: 2.3, ocrPages: 1250, workflowRuns: 45, apiCalls: 12500 },
];

const projectedCosts = {
  current: 299.00,
  projected: 344.50,
  overage: 45.50,
  reason: "Storage usage trending toward limit",
};

export default function UsagePage() {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
    );
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usage Dashboard</h1>
          <p className="text-gray-600">
            Monitor your resource usage and projected costs
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Usage Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(usageData).map(([key, data]) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </CardTitle>
              <ChartBarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof data.used === 'number' && data.used < 1 
                  ? data.used.toFixed(1) 
                  : data.used.toLocaleString()
                }{data.unit}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getUsageColor(data.percentage)}`}
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {data.percentage}%
                </span>
              </div>
              <div className="flex items-center mt-2">
                {getTrendIcon(data.trend)}
                <span className="text-xs text-muted-foreground ml-1">
                  {data.trendValue > 0 ? '+' : ''}{data.trendValue} this week
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                of {data.limit.toLocaleString()}{data.unit} limit
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Alerts */}
      {Object.values(usageData).some(data => data.percentage >= 70) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">
                  Usage Approaching Limits
                </h3>
                <p className="text-sm text-yellow-700">
                  Some resources are approaching their limits. Consider upgrading your plan to avoid overage charges.
                </p>
              </div>
              <Button size="sm" variant="outline">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost Projection */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ${projectedCosts.current}
              </div>
              <p className="text-sm text-gray-600">Current Monthly</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${projectedCosts.projected}
              </div>
              <p className="text-sm text-gray-600">Projected Total</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                +${projectedCosts.overage}
              </div>
              <p className="text-sm text-gray-600">Overage Charges</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Projection based on:</strong> {projectedCosts.reason}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Usage History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Storage Usage</h4>
                <div className="space-y-2">
                  {usageHistory.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{entry.date}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(entry.storage / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{entry.storage}GB</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">OCR Pages</h4>
                <div className="space-y-2">
                  {usageHistory.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{entry.date}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(entry.ocrPages / 5000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{entry.ocrPages.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          Contact Sales
        </Button>
        <Button>
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
}
