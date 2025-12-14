import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LifebuoyIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
const tickets = [
  {
    id: "TKT-001",
    subject: "Invoice processing automation not working",
    status: "Open",
    priority: "High",
    createdAt: "2024-01-20",
    lastUpdated: "2024-01-22",
    description: "The invoice processing workflow is not capturing data correctly from PDF files.",
  },
  {
    id: "TKT-002",
    subject: "Need help with lead capture setup",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2024-01-18",
    lastUpdated: "2024-01-21",
    description: "Setting up lead capture automation for our website forms.",
  },
  {
    id: "TKT-003",
    subject: "Billing question about overage charges",
    status: "Resolved",
    priority: "Low",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-19",
    description: "Question about the overage charges on last month's bill.",
  },
];

const slaInfo = {
  responseTime: "2 hours",
  resolutionTime: "24 hours",
  currentStatus: "All tickets within SLA",
};

export default function SupportPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge variant="destructive">Open</Badge>;
      case "In Progress":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "Resolved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">
            Get help with your automations and manage support tickets
          </p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* SLA Status */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-green-800">
                SLA Status: {slaInfo.currentStatus}
              </h3>
              <p className="text-sm text-green-700">
                Response time: {slaInfo.responseTime} | Resolution time: {slaInfo.resolutionTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChatBubbleLeftRightIcon className="mr-2 h-5 w-5" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get instant help from our support team
            </p>
            <Button className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LifebuoyIcon className="mr-2 h-5 w-5" />
              Knowledge Base
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Search our documentation and guides
            </p>
            <Button variant="outline" className="w-full">
              Browse Articles
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClockIcon className="mr-2 h-5 w-5" />
              Schedule Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Book a one-on-one session with our experts
            </p>
            <Button variant="outline" className="w-full">
              Schedule Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Your Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell>{ticket.lastUpdated}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create New Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="general">General Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
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
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your issue..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="attachments">Attachments (Optional)</Label>
              <Input
                id="attachments"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit Ticket</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
