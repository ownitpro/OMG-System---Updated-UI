import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
const orders = [
  {
    id: "ORD-2024-001",
    orgName: "TechCorp Solutions",
    userEmail: "admin@techcorp.com",
    status: "CONFIRMED",
    totalAmount: 999.00,
    currency: "USD",
    createdAt: "2024-01-20",
    eventType: "Subscription",
    items: [
      { name: "Enterprise Plan", quantity: 1, price: 999.00 },
    ],
  },
  {
    id: "ORD-2024-002",
    orgName: "Manufacturing Inc",
    userEmail: "billing@manufacturing.com",
    status: "PENDING",
    totalAmount: 299.00,
    currency: "USD",
    createdAt: "2024-01-19",
    eventType: "Setup",
    items: [
      { name: "Professional Plan", quantity: 1, price: 299.00 },
    ],
  },
  {
    id: "ORD-2024-003",
    orgName: "Retail Plus",
    userEmail: "admin@retailplus.com",
    status: "FULFILLED",
    totalAmount: 149.00,
    currency: "USD",
    createdAt: "2024-01-18",
    eventType: "Add-on",
    items: [
      { name: "Advanced Analytics", quantity: 1, price: 149.00 },
    ],
  },
  {
    id: "ORD-2024-004",
    orgName: "Healthcare Systems",
    userEmail: "it@healthcare.com",
    status: "CANCELLED",
    totalAmount: 99.00,
    currency: "USD",
    createdAt: "2024-01-17",
    eventType: "Subscription",
    items: [
      { name: "Starter Plan", quantity: 1, price: 99.00 },
    ],
  },
];

export default function OrdersPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "CONFIRMED":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "FULFILLED":
        return <Badge variant="default" className="bg-green-100 text-green-800">Fulfilled</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case "CONFIRMED":
        return <CheckCircleIcon className="h-4 w-4 text-blue-500" />;
      case "FULFILLED":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case "CANCELLED":
        return <XMarkIcon className="h-4 w-4 text-red-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventTypeBadge = (eventType: string) => {
    switch (eventType) {
      case "Subscription":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Subscription</Badge>;
      case "Setup":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Setup</Badge>;
      case "Add-on":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Add-on</Badge>;
      default:
        return <Badge variant="outline">{eventType}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">
            Manage all orders across organizations
          </p>
        </div>
        <Button variant="outline">
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="setup">Setup</SelectItem>
                <SelectItem value="add-on">Add-on</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FunnelIcon className="mr-2 h-4 w-4" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.orgName}</TableCell>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell>{getEventTypeBadge(order.eventType)}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)} {order.currency}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <EllipsisHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Summary Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(order => order.status === "PENDING").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fulfillment Rate</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((orders.filter(order => order.status === "FULFILLED").length / orders.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Orders completed successfully
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Order Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Order Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.orgName}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">${order.totalAmount}</div>
                    <div className="text-sm text-gray-600">{order.eventType}</div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
