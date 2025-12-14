import React from "react";
import { Badge } from "@/components/ui/badge";

interface Organization {
  invoices: Array<{
    id: string;
    number: string;
    status: string;
    amount: number;
    currency: string;
    createdAt: Date;
  }>;
}

interface OrgBillingProps {
  org: Organization;
}

export function OrgBilling({ org }: OrgBillingProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success">Paid</Badge>;
      case "OPEN":
        return <Badge variant="warning">Open</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Invoices</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage invoices and payments for this organization
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate Invoice
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {org.invoices.map((invoice) => (
            <li key={invoice.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <p className="text-sm font-medium text-blue-600">
                        {invoice.number}
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm text-gray-900">
                          ${(invoice.amount / 100).toFixed(2)} {invoice.currency.toUpperCase()}
                        </p>
                        <span className="ml-2">
                          {getStatusBadge(invoice.status)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Issued {new Date(invoice.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {invoice.status === "OPEN" && (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Generate PDF
                    </button>
                    {invoice.status === "PAID" && (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Download PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
