import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ChartBarIcon, 
  StarIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Feedback Analytics | Admin Dashboard | OMGsystems",
  description: "Analyze user feedback and improve the platform based on insights.",
};

export default function AdminFeedbackPage() {
  // Placeholder data - in a real app, this would come from an API call
  const feedbackMetrics = {
    totalFeedback: 247,
    averageRating: 4.2,
    newThisWeek: 18,
    resolvedThisWeek: 12,
    highPriority: 8,
    featureRequests: 45,
    bugReports: 23,
    improvementSuggestions: 67,
    responseTime: "2.3 hours"
  };

  const feedbackByCategory = [
    { category: 'UI/UX', count: 89, percentage: 36 },
    { category: 'Performance', count: 45, percentage: 18 },
    { category: 'Features', count: 67, percentage: 27 },
    { category: 'Bug Reports', count: 23, percentage: 9 },
    { category: 'Other', count: 23, percentage: 9 }
  ];

  const recentFeedback = [
    {
      id: 'FB001',
      user: 'Sarah Johnson',
      organization: 'Acme Corp',
      category: 'UI/UX',
      rating: 5,
      feedback: 'The new dashboard is amazing! Much cleaner interface.',
      status: 'resolved',
      priority: 'low',
      createdAt: '2025-10-26',
      assignedTo: 'John Smith'
    },
    {
      id: 'FB002',
      user: 'Mike Chen',
      organization: 'TechStart Inc',
      category: 'Performance',
      rating: 2,
      feedback: 'Workflow execution is slow, takes 30+ seconds to complete.',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2025-10-25',
      assignedTo: 'Jane Doe'
    },
    {
      id: 'FB003',
      user: 'Lisa Rodriguez',
      organization: 'Global Solutions',
      category: 'Features',
      rating: 4,
      feedback: 'Would love to see more integration options with Salesforce.',
      status: 'new',
      priority: 'medium',
      createdAt: '2025-10-24',
      assignedTo: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Analytics</h1>
          <p className="text-gray-600">Analyze user feedback and improve the platform.</p>
        </div>
        <Button>Export Report</Button>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackMetrics.totalFeedback}</div>
            <p className="text-xs text-gray-500">+{feedbackMetrics.newThisWeek} this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <StarIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {feedbackMetrics.averageRating}
              <StarIcon className="h-5 w-5 text-yellow-400 ml-1" />
            </div>
            <p className="text-xs text-gray-500">out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <ClockIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackMetrics.responseTime}</div>
            <p className="text-xs text-gray-500">average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{feedbackMetrics.highPriority}</div>
            <p className="text-xs text-gray-500">needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feedback by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackByCategory.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category.count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Feature Requests</span>
                </div>
                <span className="text-sm text-gray-600">{feedbackMetrics.featureRequests}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Bug Reports</span>
                </div>
                <span className="text-sm text-gray-600">{feedbackMetrics.bugReports}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Improvement Suggestions</span>
                </div>
                <span className="text-sm text-gray-600">{feedbackMetrics.improvementSuggestions}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Feedback</CardTitle>
            <div className="flex space-x-2">
              <Input placeholder="Search feedback..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFeedback.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{feedback.user}</div>
                      <div className="text-sm text-gray-500">{feedback.organization}</div>
                    </div>
                  </TableCell>
                  <TableCell>{feedback.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{feedback.feedback}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(feedback.priority)}>
                      {feedback.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{feedback.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
