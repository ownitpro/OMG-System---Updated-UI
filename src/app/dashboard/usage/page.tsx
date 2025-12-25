import { Metadata } from 'next';
import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Usage & Billing | Client Dashboard | OMGsystems",
  description: "Monitor your usage and manage billing information.",
};

export default async function DashboardUsagePage() {
  const session = await auth();
  const activeOrgId = (session?.user as any)?.activeOrgId;

  // Placeholder data - in a real app, this would come from API calls
  const usageData = {
    currentPlan: "Pro Automation",
    monthlyLimit: 2000,
    currentUsage: 1200,
    usagePercentage: 60,
    nextBilling: "2024-11-15",
    amount: 149.00,
    status: "active",
    features: [
      { name: "Lead Capture", usage: 450, limit: 500, percentage: 90 },
      { name: "Email Automation", usage: 320, limit: 400, percentage: 80 },
      { name: "Document Processing", usage: 280, limit: 300, percentage: 93 },
      { name: "CRM Integration", usage: 150, limit: 200, percentage: 75 }
    ],
    recentInvoices: [
      { id: "INV-001", date: "2024-10-15", amount: 149.00, status: "paid" },
      { id: "INV-002", date: "2024-09-15", amount: 149.00, status: "paid" },
      { id: "INV-003", date: "2024-08-15", amount: 149.00, status: "paid" }
    ]
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 80) return "text-yellow-600";
    return "text-green-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Usage & Billing</h1>
        <p className="text-gray-600">Monitor your usage and manage your subscription</p>
      </div>

      {/* Current Plan & Usage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">{usageData.currentPlan}</div>
            <div className="text-sm text-gray-600 mb-4">
              Next billing: {usageData.nextBilling}
            </div>
            <Badge className={getStatusColor(usageData.status)}>
              {usageData.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {usageData.currentUsage.toLocaleString()} / {usageData.monthlyLimit.toLocaleString()}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${usageData.usagePercentage}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {usageData.usagePercentage}% of monthly allowance used
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">
              ${usageData.amount.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Auto-renewal enabled
            </div>
            <Button variant="outline" size="sm">Update Payment</Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Alerts */}
      {usageData.usagePercentage >= 80 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-semibold text-yellow-800">Usage Alert</h3>
                <p className="text-yellow-700">
                  You've used {usageData.usagePercentage}% of your monthly allowance. 
                  Consider upgrading your plan to avoid service interruptions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Usage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {usageData.features.map((feature, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{feature.name}</span>
                  <span className={`text-sm font-semibold ${getUsageColor(feature.percentage)}`}>
                    {feature.usage} / {feature.limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      feature.percentage >= 90 ? 'bg-red-500' :
                      feature.percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${feature.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {feature.percentage}% of limit used
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usageData.recentInvoices.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Invoice {invoice.id}</div>
                    <div className="text-sm text-gray-500">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">${invoice.amount.toFixed(2)}</div>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-500">Expires 12/25</div>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Enterprise Plan</h3>
              <p className="text-sm text-gray-600 mb-4">
                Unlimited usage, priority support, advanced features
              </p>
              <div className="text-2xl font-bold mb-4">$499/month</div>
              <Button className="w-full">Upgrade to Enterprise</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Add Usage Credits</h3>
              <p className="text-sm text-gray-600 mb-4">
                Purchase additional usage credits for current plan
              </p>
              <div className="text-2xl font-bold mb-4">$0.10 per event</div>
              <Button variant="outline" className="w-full">Buy Credits</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}