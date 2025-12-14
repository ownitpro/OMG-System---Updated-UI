import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Overview | Client Dashboard | OMGsystems",
  description: "Your personalized overview of OMGsystems automations and usage.",
};

export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email || 'Client';
  const activeOrgId = (session?.user as any)?.activeOrgId;

  // Placeholder data - in a real app, this would come from an API call
  const clientData = {
    plan: "Pro Automation",
    monthlyUsage: "1,200 / 2,000 automation runs",
    upcomingInvoice: "$149.00 (due Nov 1, 2025)",
    activeWorkflows: 5,
    documentsInVault: 120,
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
      <p className="text-gray-600">Here's a quick overview of your OMGsystems account.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{clientData.plan}</p>
            <p className="text-gray-600 mt-2">Next billing cycle: Nov 1, 2025</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/usage">View Billing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{clientData.monthlyUsage}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">60% of monthly allowance used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{clientData.activeWorkflows}</p>
            <p className="text-gray-600 mt-2">Automations running</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/workflows">Manage Workflows</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents in Vault</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-indigo-600">{clientData.documentsInVault}</p>
            <p className="text-gray-600 mt-2">Secure documents stored</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/files">View Files</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{clientData.upcomingInvoice}</p>
            <p className="text-gray-600 mt-2">Auto-renewal enabled</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/usage">View Details</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/workflow-builder">Create New Workflow</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/support">Get Support</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/settings">Account Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Workflow "Lead Capture" completed successfully</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
        </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
          <div>
                  <p className="font-medium">New document uploaded to SecureVault</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Usage alert: 80% of monthly allowance used</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}