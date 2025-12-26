"use client";

import React from "react";
import { useState } from "react";
import { 
  TicketIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";

interface TicketMessage {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
}

interface TicketAttachment {
  id: string;
  name: string;
  url: string | null;
  size: number;
  mimeType: string;
  createdAt: Date;
}

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string | null;
  assignedTo: string | null;
  resolvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  organization: {
    name: string;
    slug: string;
  };
  messages?: TicketMessage[];
  attachments?: TicketAttachment[];
}

interface TicketDetailTabsProps {
  ticket: Ticket;
}

export function TicketDetailTabs({ ticket }: TicketDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [newMessage, setNewMessage] = useState("");
  const [newInternalNote, setNewInternalNote] = useState("");
  const [showInternalNotes, setShowInternalNotes] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);

  // Default empty arrays for optional fields
  const messages = ticket.messages ?? [];
  const attachments = ticket.attachments ?? [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPEN":
        return TicketIcon;
      case "IN_PROGRESS":
        return ClockIcon;
      case "RESOLVED":
        return CheckCircleIcon;
      case "CLOSED":
        return XCircleIcon;
      default:
        return TicketIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: TicketIcon },
    { id: "conversation", name: "Conversation", icon: ChatBubbleLeftIcon },
    { id: "attachments", name: "Attachments", icon: PaperClipIcon },
  ];

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // In a real app, this would make an API call to update the ticket
    console.log('Updating ticket status to:', newStatus);
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority);
    // In a real app, this would make an API call to update the ticket
    console.log('Updating ticket priority to:', newPriority);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would make an API call to add a message
      console.log('Sending message:', newMessage);
      setNewMessage("");
    }
  };

  const handleAddInternalNote = () => {
    if (newInternalNote.trim()) {
      // In a real app, this would make an API call to add an internal note
      console.log('Adding internal note:', newInternalNote);
      setNewInternalNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.replace('_', ' ')}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
        <button
          onClick={() => setShowInternalNotes(!showInternalNotes)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {showInternalNotes ? (
            <>
              <EyeSlashIcon className="h-4 w-4 mr-2" />
              Hide Internal Notes
            </>
          ) : (
            <>
              <EyeIcon className="h-4 w-4 mr-2" />
              Show Internal Notes
            </>
          )}
        </button>
      </div>

      {/* Ticket Info */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Organization</dt>
              <dd className="mt-1 text-sm text-gray-900">{ticket.organization.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Requester</dt>
              <dd className="mt-1 text-sm text-gray-900">{ticket.user.name || ticket.user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(ticket.updatedAt).toLocaleDateString()}
              </dd>
            </div>
          </div>
          
          {ticket.description && (
            <div className="mt-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{ticket.description}</dd>
            </div>
          )}

          {/* Status and Priority Controls */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                  {tab.id === "conversation" && messages.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {messages.length}
                    </span>
                  )}
                  {tab.id === "attachments" && attachments.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {attachments.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
                  <div className="space-y-3">
                    {messages.slice(0, 5).map((message) => (
                      <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {message.user.name || message.user.email}
                          </span>
                          <span className="text-sm text-gray-500">
                            {getTimeAgo(message.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{message.content}</p>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <p className="text-sm text-gray-500">No messages yet</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Attachments</h3>
                  <div className="space-y-3">
                    {attachments.slice(0, 5).map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <PaperClipIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{attachment.name}</div>
                            <div className="text-sm text-gray-500">
                              {formatFileSize(attachment.size)} • {attachment.mimeType}
                            </div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                    {attachments.length === 0 && (
                      <p className="text-sm text-gray-500">No attachments yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conversation Tab */}
          {activeTab === "conversation" && (
            <div className="space-y-6">
              {/* New Message Form */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reply to customer</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Type your reply here..."
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Reply
                  </button>
                </div>
              </div>

              {/* Internal Notes Form */}
              {showInternalNotes && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Internal Note (not visible to customer)</label>
                  <textarea
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                    rows={2}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Add internal note..."
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleAddInternalNote}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              )}

              {/* Messages List */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {message.user.name || message.user.email}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {message.user.email.includes('@omgsystems.com') ? '(Internal)' : '(Customer)'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{message.content}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No messages yet</p>
                )}
              </div>
            </div>
          )}

          {/* Attachments Tab */}
          {activeTab === "attachments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload File
                </button>
              </div>

              {/* Attachments List */}
              <div className="space-y-3">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PaperClipIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{attachment.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatFileSize(attachment.size)} • {attachment.mimeType}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {attachment.user.name || "Unknown"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(attachment.createdAt).toLocaleDateString()}
                        </span>
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          Download
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {attachments.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No attachments yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
