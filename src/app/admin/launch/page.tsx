import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  RocketLaunchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Launch Management | Admin Dashboard | OMGsystems",
  description: "Manage product launches and rollout strategies.",
};

export default function AdminLaunchPage() {
  // Placeholder data - in a real app, this would come from an API call
  const launchPlans = [
    {
      id: 'lp001',
      name: 'Dashboard Beta Launch',
      description: 'Internal testing of new dashboard features',
      launchDate: '2025-11-01',
      rolloutPercentage: 25,
      status: 'scheduled',
      createdBy: 'John Smith',
      createdAt: '2025-10-20'
    },
    {
      id: 'lp002',
      name: 'Client Portal Rollout',
      description: 'Gradual rollout of client portal to all customers',
      launchDate: '2025-11-15',
      rolloutPercentage: 100,
      status: 'draft',
      createdBy: 'Jane Doe',
      createdAt: '2025-10-15'
    }
  ];

  const readinessChecklist = [
    {
      category: 'Technical',
      items: [
        { name: 'Database migrations completed', status: 'completed' },
        { name: 'API endpoints tested', status: 'completed' },
        { name: 'Performance benchmarks met', status: 'completed' },
        { name: 'Security audit passed', status: 'in_progress' },
        { name: 'Load testing completed', status: 'pending' }
      ]
    },
    {
      category: 'User Experience',
      items: [
        { name: 'UI/UX testing completed', status: 'completed' },
        { name: 'Accessibility compliance verified', status: 'completed' },
        { name: 'Mobile responsiveness tested', status: 'completed' },
        { name: 'User onboarding flow tested', status: 'in_progress' },
        { name: 'Error handling implemented', status: 'pending' }
      ]
    },
    {
      category: 'Business',
      items: [
        { name: 'Feature documentation updated', status: 'completed' },
        { name: 'Support team trained', status: 'in_progress' },
        { name: 'Marketing materials prepared', status: 'pending' },
        { name: 'Legal review completed', status: 'pending' },
        { name: 'Rollback plan prepared', status: 'completed' }
      ]
    },
    {
      category: 'Monitoring',
      items: [
        { name: 'Analytics tracking implemented', status: 'completed' },
        { name: 'Error monitoring configured', status: 'completed' },
        { name: 'Performance monitoring setup', status: 'completed' },
        { name: 'Alert systems configured', status: 'in_progress' },
        { name: 'Backup systems verified', status: 'pending' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLaunchStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Launch Management</h1>
          <p className="text-gray-600">Manage product launches and rollout strategies.</p>
        </div>
        <Button>
          <RocketLaunchIcon className="mr-2 h-4 w-4" />
          Create Launch Plan
        </Button>
      </div>

      {/* Launch Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Launch Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {launchPlans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                  <p className="text-xs text-gray-500">Created by {plan.createdBy} on {plan.createdAt}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getLaunchStatusColor(plan.status)}>
                    {plan.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{plan.rolloutPercentage}% rollout</span>
                  <span className="text-sm text-gray-600">Launch: {plan.launchDate}</span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Readiness Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {readinessChecklist.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CogIcon className="mr-2 h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Launch Readiness Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Launch Readiness Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">4</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">4</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">60%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Launch Plan Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Launch Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Plan Name</label>
            <Input type="text" id="name" placeholder="Enter launch plan name" className="mt-1" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea id="description" rows={3} placeholder="Describe the launch plan" className="mt-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="launchDate" className="block text-sm font-medium text-gray-700">Launch Date</label>
              <Input type="date" id="launchDate" className="mt-1" />
            </div>
            <div>
              <label htmlFor="rolloutPercentage" className="block text-sm font-medium text-gray-700">Rollout Percentage</label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select percentage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <Textarea id="notes" rows={2} placeholder="Additional notes or requirements" className="mt-1" />
          </div>
          <Button className="w-full">Create Launch Plan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
