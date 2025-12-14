import React from "react";
import { CreditCardIcon, DocumentTextIcon, ArrowDownTrayIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  number: string;
  status: string;
  amount: any; // Decimal type from Prisma
  currency: string;
  createdAt: Date;
  organization: {
    name: string;
    slug: string;
  };
}

interface BillingPageProps {
  invoices: Invoice[];
}

export function BillingPage({ invoices }: BillingPageProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge variant="success">Paid</Badge>;
      case "SENT":
        return <Badge variant="warning">Sent</Badge>;
      case "OVERDUE":
        return <Badge variant="danger">Overdue</Badge>;
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CreditCardIcon className="h-5 w-5 text-green-500" />;
      case "SENT":
        return <DocumentTextIcon className="h-5 w-5 text-yellow-500" />;
      case "OVERDUE":
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  // Calculate summary stats
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === "PAID").length;
  const pendingInvoices = invoices.filter(inv => inv.status === "SENT").length;
  const overdueInvoices = invoices.filter(inv => inv.status === "OVERDUE").length;
  
  const totalAmount = invoices
    .filter(inv => inv.status === "PAID")
    .reduce((sum, inv) => sum + Number(inv.amount), 0);
  
  const pendingAmount = invoices
    .filter(inv => inv.status === "SENT")
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalInvoices}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCardIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Paid Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {paidInvoices}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingInvoices}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Overdue Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {overdueInvoices}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Total Paid</h4>
            <p className="text-2xl font-semibold text-gray-900">
              ${totalAmount.toFixed(2)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Pending Amount</h4>
            <p className="text-2xl font-semibold text-gray-900">
              ${pendingAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Invoice History</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            All invoices across your organizations
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {invoices.length === 0 ? (
            <li className="px-4 py-4 sm:px-6">
              <div className="text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any invoices yet
                </p>
              </div>
            </li>
          ) : (
            invoices.map((invoice) => (
              <li key={invoice.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getStatusIcon(invoice.status)}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600">
                            Invoice #{invoice.number}
                          </p>
                          <div className="ml-2">
                            {getStatusBadge(invoice.status)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {invoice.organization.name}
                        </p>
                        <div className="mt-1 text-sm text-gray-400">
                          Created {new Date(invoice.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {invoice.amount.toFixed(2)} {invoice.currency}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {invoice.status === "SENT" && (
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Pay Now
                          </button>
                        )}
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}