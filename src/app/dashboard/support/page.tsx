import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MagnifyingGlassIcon, PlusIcon, ChatBubbleLeftRightIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Support | Client Dashboard | OMGsystems",
  description: "Get help and manage support tickets.",
};

export default async function DashboardSupportPage() {
  const session = await getServerSession(authOptions);
  const activeOrgId = (session?.user as any)?.activeOrgId;

  // Placeholder data - in a real app, this would come from API calls
  const tickets = [
    {
      id: 'T-001',
      subject: 'Workflow not triggering automatically',
      status: 'open',
      priority: 'high',
      category: 'technical',
      createdAt: '2024-10-14T10:30:00Z',
      lastActivity: '2024-10-14T14:30:00Z',
      responses: 2
    },
    {
      id: 'T-002',
      subject: 'Billing question about invoice',
      status: 'in_progress',
      priority: 'medium',
      category: 'billing',
      createdAt: '2024-10-13T09:15:00Z',
      lastActivity: '2024-10-14T11:15:00Z',
      responses: 4
    },
    {
      id: 'T-003',
      subject: 'Request for new feature',
      status: 'resolved',
      priority: 'low',
      category: 'feature_request',
      createdAt: '2024-10-12T16:45:00Z',
      lastActivity: '2024-10-13T10:30:00Z',
      responses: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">Get help and manage your support tickets</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'in_progress').length}</div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter(t => t.status === 'resolved').length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChatBubbleLeftRightIcon className="mr-2 h-5 w-5" />
            Quick Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <ExclamationCircleIcon className="h-6 w-6 mb-2" />
              <span>Common Issues</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-6 w-6 mb-2" />
              <span>Live Chat</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <ExclamationCircleIcon className="h-6 w-6 mb-2" />
              <span>Documentation</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search tickets..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant="outline">{ticket.category.replace('_', ' ')}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <div className="font-medium">{formatDate(ticket.createdAt)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Activity:</span>
                      <div className="font-medium">{formatDate(ticket.lastActivity)}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Responses:</span>
                      <div className="font-medium">{ticket.responses}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-6">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {ticket.status === 'resolved' && (
                    <Button variant="outline" size="sm">
                      Reopen
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input placeholder="Brief description of your issue" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea 
                placeholder="Please provide detailed information about your issue..."
                rows={6}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit Ticket</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}