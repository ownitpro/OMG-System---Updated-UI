import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CreditCardIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
const invoices = [
  {
    id: "INV-2024-001",
    issueDate: "2024-01-01",
    dueDate: "2024-01-31",
    status: "PAID",
    amount: 299.00,
    currency: "USD",
  },
  {
    id: "INV-2024-002",
    issueDate: "2024-02-01",
    dueDate: "2024-02-28",
    status: "OPEN",
    amount: 299.00,
    currency: "USD",
  },
  {
    id: "INV-2023-012",
    issueDate: "2023-12-01",
    dueDate: "2023-12-31",
    status: "PAID",
    amount: 299.00,
    currency: "USD",
  },
];

const subscription = {
  plan: "Professional",
  monthlyAmount: 299.00,
  nextBillingDate: "2024-02-15",
  paymentMethod: "**** **** **** 4242",
  status: "Active",
};

const usageOverage = {
  hasOverage: true,
  overageAmount: 45.50,
  overageReason: "Storage usage exceeded 10GB limit",
};

export default function BillingPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>;
      case "OPEN":
        return <Badge variant="destructive">Open</Badge>;
      case "VOID":
        return <Badge variant="secondary">Void</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600">
          Manage your subscription, view invoices, and update payment methods
        </p>
      </div>

      {/* Subscription Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCardIcon className="mr-2 h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Plan:</span>
                <span className="font-medium">{subscription.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monthly:</span>
                <span className="font-medium">${subscription.monthlyAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant="default">{subscription.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Billing:</span>
                <span className="font-medium">{subscription.nextBillingDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Card:</span>
                <span className="font-medium">{subscription.paymentMethod}</span>
              </div>
              <Button variant="outline" className="w-full">
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full">
              <DocumentTextIcon className="mr-2 h-4 w-4" />
              Download Payment History
            </Button>
            <Button variant="outline" className="w-full">
              <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
              Export Invoices (CSV)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Overage Alert */}
      {usageOverage.hasOverage && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">
                  Usage Overage Detected
                </h3>
                <p className="text-sm text-yellow-700">
                  {usageOverage.overageReason} - Additional charge: ${usageOverage.overageAmount}
                </p>
              </div>
              <Button size="sm" variant="outline">
                View Usage Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <DocumentTextIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment History Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Paid This Year:</span>
                <span className="font-medium">$598.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Monthly:</span>
                <span className="font-medium">$299.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Payment:</span>
                <span className="font-medium">Jan 1, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Next Billing Date:</span>
                <span className="font-medium">{subscription.nextBillingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="font-medium">${subscription.monthlyAmount}</span>
              </div>
              {usageOverage.hasOverage && (
                <div className="flex justify-between text-yellow-600">
                  <span className="text-sm">Overage:</span>
                  <span className="font-medium">+${usageOverage.overageAmount}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
