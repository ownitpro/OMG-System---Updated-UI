import { Metadata } from 'next';
import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon, PlayIcon, PauseIcon, TrashIcon, CogIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Automations & Workflows | Client Dashboard | OMGsystems",
  description: "Manage your automations and workflows.",
};

export default async function DashboardWorkflowsPage() {
  const session = await auth();
  const activeOrgId = (session?.user as any)?.activeOrgId;

  // Placeholder data - in a real app, this would come from API calls
  const workflows = [
    {
      id: 'wf-001',
      name: 'Lead Capture Automation',
      description: 'Automatically capture and qualify leads from website forms',
      status: 'active',
      lastRun: '2024-10-14T10:30:00Z',
      nextRun: '2024-10-14T14:30:00Z',
      runs: 234,
      successRate: 98.5,
      category: 'Lead Generation'
    },
    {
      id: 'wf-002',
      name: 'Invoice Processing',
      description: 'Automate invoice creation and payment tracking',
      status: 'active',
      lastRun: '2024-10-14T09:15:00Z',
      nextRun: '2024-10-14T15:15:00Z',
      runs: 156,
      successRate: 96.2,
      category: 'Finance'
    },
    {
      id: 'wf-003',
      name: 'Customer Onboarding',
      description: 'Welcome new customers with automated sequences',
      status: 'paused',
      lastRun: '2024-10-13T16:45:00Z',
      nextRun: null,
      runs: 89,
      successRate: 99.1,
      category: 'Customer Success'
    },
    {
      id: 'wf-004',
      name: 'Inventory Management',
      description: 'Track inventory levels and automate reordering',
      status: 'active',
      lastRun: '2024-10-14T08:00:00Z',
      nextRun: '2024-10-15T08:00:00Z',
      runs: 67,
      successRate: 94.8,
      category: 'Operations'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayIcon className="h-4 w-4" />;
      case 'paused': return <PauseIcon className="h-4 w-4" />;
      default: return <CogIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automations & Workflows</h1>
          <p className="text-gray-600">Manage your automated workflows and processes</p>
        </div>
        <Button>Create New Workflow</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter(w => w.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Running workflows</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.reduce((sum, w) => sum + w.runs, 0)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search workflows..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Filter by Category</Button>
          </div>
        </CardContent>
      </Card>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{workflow.name}</h3>
                    <Badge className={getStatusColor(workflow.status)}>
                      {getStatusIcon(workflow.status)}
                      <span className="ml-1">{workflow.status}</span>
                    </Badge>
                    <Badge variant="outline">{workflow.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{workflow.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Last Run:</span>
                      <div className="font-medium">{formatDate(workflow.lastRun)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Run:</span>
                      <div className="font-medium">
                        {workflow.nextRun ? formatDate(workflow.nextRun) : 'Not scheduled'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Runs:</span>
                      <div className="font-medium">{workflow.runs}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Success Rate:</span>
                      <div className="font-medium text-green-600">{workflow.successRate}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-6">
                  <Button variant="outline" size="sm">
                    <CogIcon className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  {workflow.status === 'active' ? (
                    <Button variant="outline" size="sm">
                      <PauseIcon className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <PlayIcon className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center">
              <PlayIcon className="h-6 w-6 mb-2" />
              <span>Create New Workflow</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <CogIcon className="h-6 w-6 mb-2" />
              <span>Import Workflow</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <CogIcon className="h-6 w-6 mb-2" />
              <span>Browse Templates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}