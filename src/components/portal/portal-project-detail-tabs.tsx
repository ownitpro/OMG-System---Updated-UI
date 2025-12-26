"use client";

import React, { useState } from "react";
import { 
  ClipboardDocumentListIcon,
  ChatBubbleLeftIcon,
  PaperClipIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  PlusIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  priority: string;
  startDate: Date | null;
  dueDate: Date | null;
  completedAt: Date | null;
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
  tasks: Array<{
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
      name: string | null;
      email: string;
    };
  }>;
  messages: Array<{
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
    url: string | null;
    size: number;
    mimeType: string;
    createdAt: Date;
  }>;
}

interface PortalProjectDetailTabsProps {
  project: Project;
}

export function PortalProjectDetailTabs({ project }: PortalProjectDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [newMessage, setNewMessage] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PLANNING":
        return ClockIcon;
      case "IN_PROGRESS":
        return CheckCircleIcon;
      case "COMPLETED":
        return CheckCircleIcon;
      case "ON_HOLD":
        return PauseIcon;
      case "CANCELLED":
        return ExclamationTriangleIcon;
      default:
        return ClipboardDocumentListIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLANNING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800";
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-gray-100 text-gray-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "REVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
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

  const isOverdue = (dueDate: Date | null) => {
    if (!dueDate) return false;
    return new Date() > dueDate;
  };

  const completedTasks = project.tasks.filter(task => task.status === "COMPLETED").length;
  const progressPercentage = project.tasks.length > 0 ? (completedTasks / project.tasks.length) * 100 : 0;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would make an API call to add a message
      console.log('Sending message:', newMessage);
      setNewMessage("");
    }
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: ClipboardDocumentListIcon },
    { id: "tasks", name: "Tasks", icon: ClipboardDocumentListIcon },
    { id: "messages", name: "Messages", icon: ChatBubbleLeftIcon },
    { id: "attachments", name: "Attachments", icon: PaperClipIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status.replace('_', ' ')}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Organization</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.organization.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Owner</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.user.name || project.user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Start Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.startDate ? new Date(project.startDate).toLocaleDateString() : "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.dueDate ? (
                  <span className={isOverdue(project.dueDate) ? "text-red-600" : ""}>
                    {new Date(project.dueDate).toLocaleDateString()}
                    {isOverdue(project.dueDate) && " (Overdue)"}
                  </span>
                ) : "Not set"}
              </dd>
            </div>
          </div>
          
          {project.description && (
            <div className="mt-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.description}</dd>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedTasks}/{project.tasks.length} tasks completed ({Math.round(progressPercentage)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
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
                  {tab.id === "tasks" && project.tasks.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {project.tasks.length}
                    </span>
                  )}
                  {tab.id === "messages" && project.messages.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {project.messages.length}
                    </span>
                  )}
                  {tab.id === "attachments" && project.attachments.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {project.attachments.length}
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Tasks</h3>
                  <div className="space-y-3">
                    {project.tasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                          <span className="ml-3 text-sm text-gray-900">{task.title}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {task.user.name || "Unassigned"}
                        </div>
                      </div>
                    ))}
                    {project.tasks.length === 0 && (
                      <p className="text-sm text-gray-500">No tasks yet</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
                  <div className="space-y-3">
                    {project.messages.slice(0, 5).map((message) => (
                      <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {message.user.name || message.user.email}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{message.content}</p>
                      </div>
                    ))}
                    {project.messages.length === 0 && (
                      <p className="text-sm text-gray-500">No messages yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {project.tasks.map((task) => (
                  <div key={task.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {task.user.name || "Unassigned"}
                        </span>
                      </div>
                    </div>
                    {task.description && (
                      <p className="mt-2 text-sm text-gray-700">{task.description}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                      <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
                      {task.dueDate && (
                        <span className={isOverdue(task.dueDate) ? "text-red-600" : ""}>
                          Due {new Date(task.dueDate).toLocaleDateString()}
                          {isOverdue(task.dueDate) && " (Overdue)"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {project.tasks.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">No tasks yet</p>
                )}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
              </div>

              {/* New Message Form */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add a message</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Type your message here..."
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {project.messages.map((message) => (
                  <div key={message.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {message.user.name || message.user.email}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{message.content}</p>
                  </div>
                ))}
                {project.messages.length === 0 && (
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
                {project.attachments.map((attachment) => (
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
                {project.attachments.length === 0 && (
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
