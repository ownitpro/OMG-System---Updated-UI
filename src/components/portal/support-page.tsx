import React from "react";
import { Badge } from "@/components/ui/badge";
import { TicketIcon, PlusIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SupportPageProps {
  tickets: Ticket[];
}

export function SupportPage({ tickets }: SupportPageProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge variant="warning">Open</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="secondary">In Progress</Badge>;
      case "RESOLVED":
        return <Badge variant="success">Resolved</Badge>;
      case "CLOSED":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      case "low":
        return <Badge variant="success">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Ticket */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a support ticket and our team will get back to you
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Support Tickets</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Track the status of your support requests
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <li className="px-4 py-4 sm:px-6">
              <div className="text-center">
                <TicketIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't created any support tickets yet
                </p>
              </div>
            </li>
          ) : (
            tickets.map((ticket) => (
              <li key={ticket.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <TicketIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600">
                            {ticket.subject}
                          </p>
                          <div className="ml-2 flex space-x-1">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {ticket.description}
                        </p>
                        <div className="mt-1 text-sm text-gray-400">
                          Created {new Date(ticket.createdAt).toLocaleDateString()}
                          {ticket.updatedAt.getTime() !== ticket.createdAt.getTime() && (
                            <> • Updated {new Date(ticket.updatedAt).toLocaleDateString()}</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Other Ways to Get Help</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Email Support</h4>
            <p className="text-sm text-gray-500">support@omgsystems.com</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Phone Support</h4>
            <p className="text-sm text-gray-500">1-800-OMG-HELP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
