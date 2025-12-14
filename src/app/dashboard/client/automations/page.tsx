import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CogIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Mock data fallback
const mockAutomations = [
  {
    id: "1",
    name: "Invoice Processing",
    status: "Active",
    deployedDate: "2024-01-15",
    monthlyCost: 149,
    setupCost: 399,
    setupPaid: true,
    description: "Automatically process and categorize incoming invoices",
  },
  {
    id: "2",
    name: "Lead Capture",
    status: "Paused",
    deployedDate: "2024-01-10",
    monthlyCost: 99,
    setupCost: 299,
    setupPaid: true,
    description: "Capture and qualify leads from multiple sources",
  },
  {
    id: "3",
    name: "Customer Onboarding",
    status: "Active",
    deployedDate: "2024-01-20",
    monthlyCost: 79,
    setupCost: 249,
    setupPaid: false,
    description: "Streamline new customer setup and welcome sequences",
  },
];

export default async function AutomationsPage() {
  const session = await getServerSession(authOptions);

  // Fetch real data from API
  let automations = mockAutomations;
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/automations`, {
      headers: {
        'Cookie': `next-auth.session-token=${(session as any)?.sessionToken || ''}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      automations = data.automations || mockAutomations;
    }
  } catch (error) {
    console.error('Error fetching automations:', error);
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
          <p className="text-gray-600">
            Manage your active automations and workflows
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/automations/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Automation
          </Link>
        </Button>
      </div>

      {/* Automation Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {automations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{automation.name}</CardTitle>
                <Badge
                  variant={automation.status === "Active" ? "default" : "secondary"}
                >
                  {automation.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{automation.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Deployed</p>
                  <p className="font-medium">{automation.deployedDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Monthly Cost</p>
                  <p className="font-medium">${automation.monthlyCost}</p>
                </div>
              </div>

              {!automation.setupPaid && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Setup Cost Pending:</strong> ${automation.setupCost}
                  </p>
                  <Button size="sm" className="mt-2">
                    Pay Setup Cost
                  </Button>
                </div>
              )}

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <EyeIcon className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={automation.status === "Active" ? "text-orange-600" : "text-green-600"}
                >
                  {automation.status === "Active" ? (
                    <PauseIcon className="h-4 w-4" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table View (Alternative) */}
      <Card>
        <CardHeader>
          <CardTitle>All Automations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deployed</TableHead>
                <TableHead>Monthly Cost</TableHead>
                <TableHead>Setup Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automations.map((automation) => (
                <TableRow key={automation.id}>
                  <TableCell className="font-medium">{automation.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={automation.status === "Active" ? "default" : "secondary"}
                    >
                      {automation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{automation.deployedDate}</TableCell>
                  <TableCell>${automation.monthlyCost}</TableCell>
                  <TableCell>
                    {automation.setupPaid ? (
                      <Badge variant="default">Paid</Badge>
                    ) : (
                      <Badge variant="destructive">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={automation.status === "Active" ? "text-orange-600" : "text-green-600"}
                      >
                        {automation.status === "Active" ? (
                          <PauseIcon className="h-4 w-4" />
                        ) : (
                          <PlayIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
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
