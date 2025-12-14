import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserPlusIcon, 
  EnvelopeIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Beta Testing Management | Admin Dashboard | OMGsystems",
  description: "Manage beta testing program, user invitations, and feedback collection.",
};

export default function AdminBetaPage() {
  // Placeholder data - in a real app, this would come from API calls
  const betaStats = {
    totalInvites: 47,
    activeUsers: 23,
    feedbackCount: 156,
    averageRating: 4.2,
    completionRate: 78
  };

  const betaUsers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      company: 'TechCorp Solutions',
      status: 'active',
      joinedAt: '2025-01-15',
      lastActive: '2025-01-18',
      feedbackCount: 8,
      rating: 4.5,
      role: 'Internal Team'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@propmanagement.com',
      company: 'Property Management Co',
      status: 'active',
      joinedAt: '2025-01-16',
      lastActive: '2025-01-17',
      feedbackCount: 12,
      rating: 4.8,
      role: 'Friendly Client'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      email: 'lisa@realestate.com',
      company: 'Real Estate Partners',
      status: 'pending',
      joinedAt: '2025-01-17',
      lastActive: null,
      feedbackCount: 0,
      rating: null,
      role: 'Friendly Client'
    }
  ];

  const feedbackItems = [
    {
      id: '1',
      user: 'Sarah Johnson',
      category: 'UI/UX',
      rating: 5,
      feedback: 'The dashboard is incredibly intuitive. Love the clean design!',
      status: 'resolved',
      createdAt: '2025-01-18'
    },
    {
      id: '2',
      user: 'Mike Chen',
      category: 'Performance',
      rating: 4,
      feedback: 'Loading times could be faster on mobile devices.',
      status: 'in_progress',
      createdAt: '2025-01-17'
    },
    {
      id: '3',
      user: 'Sarah Johnson',
      category: 'Feature Request',
      rating: 5,
      feedback: 'Would love to see bulk actions for workflow management.',
      status: 'new',
      createdAt: '2025-01-16'
    }
  ];

  const launchReadiness = [
    { item: 'Authentication System', status: 'complete', notes: 'NextAuth.js with RBAC implemented' },
    { item: 'Database Schema', status: 'complete', notes: 'Prisma schema with all required models' },
    { item: 'API Endpoints', status: 'complete', notes: 'All CRUD operations secured' },
    { item: 'UI Components', status: 'complete', notes: 'Consistent design system' },
    { item: 'Mobile Responsiveness', status: 'in_progress', notes: 'Testing on various devices' },
    { item: 'Performance Optimization', status: 'in_progress', notes: 'Bundle size optimization' },
    { item: 'Security Audit', status: 'pending', notes: 'Third-party security review' },
    { item: 'Documentation', status: 'pending', notes: 'User guides and API docs' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Beta Testing Management</h1>
          <p className="text-gray-600">Manage beta users, collect feedback, and prepare for launch</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <EnvelopeIcon className="mr-2 h-4 w-4" />
            Send Invitations
          </Button>
          <Button>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add Beta User
          </Button>
        </div>
      </div>

      {/* Beta Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invites</p>
                <p className="text-2xl font-bold text-gray-900">{betaStats.totalInvites}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{betaStats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Feedback Count</p>
                <p className="text-2xl font-bold text-gray-900">{betaStats.feedbackCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <StarIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{betaStats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{betaStats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Beta Users</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="launch">Launch Readiness</TabsTrigger>
        </TabsList>

        {/* Beta Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Beta Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {betaUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.feedbackCount}</TableCell>
                      <TableCell>
                        {user.rating ? (
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            {user.rating}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{item.user}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            {item.rating}
                          </div>
                          <Badge variant={
                            item.status === 'resolved' ? 'default' :
                            item.status === 'in_progress' ? 'secondary' : 'outline'
                          }>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{item.feedback}</p>
                      <p className="text-xs text-gray-500">{item.createdAt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Satisfaction</span>
                    <span className="text-sm text-gray-600">4.2/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Response Rate</span>
                    <span className="text-sm text-gray-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Top Feedback Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>UI/UX Improvements</span>
                        <span>45%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Performance</span>
                        <span>30%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Feature Requests</span>
                        <span>25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Launch Readiness Tab */}
        <TabsContent value="launch" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Launch Readiness Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {launchReadiness.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.status === 'complete' ? 'bg-green-100 text-green-600' :
                        item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status === 'complete' ? (
                          <CheckCircleIcon className="h-4 w-4" />
                        ) : item.status === 'in_progress' ? (
                          <ClockIcon className="h-4 w-4" />
                        ) : (
                          <ExclamationTriangleIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-sm text-gray-500">{item.notes}</p>
                      </div>
                    </div>
                    <Badge variant={
                      item.status === 'complete' ? 'default' :
                      item.status === 'in_progress' ? 'secondary' : 'outline'
                    }>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Launch Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="launch-date">Launch Date</Label>
                  <Input id="launch-date" type="date" defaultValue="2025-02-01" />
                </div>
                <div>
                  <Label htmlFor="rollout-percentage">Rollout Percentage</Label>
                  <Select defaultValue="25">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="100">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="launch-notes">Launch Notes</Label>
                  <Textarea 
                    id="launch-notes" 
                    placeholder="Add any special instructions or notes for the launch..."
                    rows={3}
                  />
                </div>
                <Button className="w-full" disabled>
                  Schedule Launch
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Launch Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Readiness Score</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Remaining Tasks</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Complete mobile responsiveness testing</li>
                      <li>• Finalize performance optimization</li>
                      <li>• Conduct security audit</li>
                      <li>• Complete user documentation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
