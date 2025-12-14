"use client";

import React, { useState } from "react";
import { 
  ChatBubbleLeftIcon,
  PaperClipIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PauseIcon,
  PlusIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

interface Ticket {
  id: string;
  subject: string;
  description: string | null;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  organization: {
    name: string;
    slug: string;
  };
  user: {
    name: string | null;
    email: string;
  };
  comments: Array<{
    id: string;
    content: string;
    createdAt: Date;
    user: {
      name: string | null;
      email: string;
    };
  }>;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
    mimeType: string;
    createdAt: Date;
    user: {
      name: string | null;
    };
  }>;
}

interface PortalTicketDetailTabsProps {
  ticket: Ticket;
}

export function PortalTicketDetailTabs({ ticket }: PortalTicketDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("conversation");
  const [newComment, setNewComment] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPEN":
        return ExclamationTriangleIcon;
      case "IN_PROGRESS":
        return ClockIcon;
      case "RESOLVED":
        return CheckCircleIcon;
      case "CLOSED":
        return CheckCircleIcon;
      case "ON_HOLD":
        return PauseIcon;
      case "CANCELLED":
        return XCircleIcon;
      default:
        return ChatBubbleLeftIcon;
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
      case "ON_HOLD":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
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

  const handleSendComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call to add a comment
      console.log('Sending comment:', newComment);
      setNewComment("");
    }
  };

  const tabs = [
    { id: "conversation", name: "Conversation", icon: ChatBubbleLeftIcon },
    { id: "attachments", name: "Attachments", icon: PaperClipIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
            {ticket.status.replace('_', ' ')}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
          </span>
        </div>
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
              <dt className="text-sm font-medium text-gray-500">Created By</dt>
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
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{ticket.description}</dd>
            </div>
          )}
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
                  {tab.id === "conversation" && ticket.comments.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {ticket.comments.length}
                    </span>
                  )}
                  {tab.id === "attachments" && ticket.attachments.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {ticket.attachments.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-4">
          {/* Conversation Tab */}
          {activeTab === "conversation" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Conversation</h3>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {ticket.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {comment.user.name || comment.user.email}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                ))}
                {ticket.comments.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No comments yet</p>
                )}
              </div>

              {/* New Comment Form */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add a comment</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Type your comment here..."
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSendComment}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Comment
                  </button>
                </div>
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
                {ticket.attachments.map((attachment) => (
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
                        <a
                          href={attachment.url}
                          download
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {ticket.attachments.length === 0 && (
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