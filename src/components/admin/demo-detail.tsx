"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { 
  PlayIcon, 
  CalendarIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

interface DemoRequest {
  id: string;
  appSlug: string;
  industry: string | null;
  answers: any;
  bookedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lead: {
    id: string;
    contact: string | null;
    email: string | null;
    orgName: string | null;
    source: string | null;
  } | null;
}

interface TimelineEvent {
  id: string;
  action: string;
  resourceType: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  } | null;
}

interface DemoDetailProps {
  demo: DemoRequest;
  timeline: TimelineEvent[];
}

export function DemoDetail({ demo, timeline }: DemoDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getAppDisplayName = (appSlug: string) => {
    switch (appSlug) {
      case "crm":
        return "CRM Demo";
      case "securevault-docs":
        return "SecureVault Docs Demo";
      default:
        return appSlug;
    }
  };

  const getAppIcon = (appSlug: string) => {
    switch (appSlug) {
      case "crm":
        return BuildingOfficeIcon;
      case "securevault-docs":
        return UserIcon;
      default:
        return PlayIcon;
    }
  };

  const AppIcon = getAppIcon(demo.appSlug);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Demo Info */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Demo Information
                </h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Demo Type</dt>
                    <dd className="mt-1 flex items-center text-sm text-gray-900">
                      <AppIcon className="h-5 w-5 mr-2 text-gray-400" />
                      {getAppDisplayName(demo.appSlug)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        demo.bookedAt ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {demo.bookedAt ? "Booked" : "Pending"}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Industry</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {demo.industry || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(demo.createdAt).toLocaleString()}
                    </dd>
                  </div>
                  {demo.bookedAt && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Booked At</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(demo.bookedAt).toLocaleString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Lead Information */}
            {demo.lead && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Lead Information
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {demo.lead.contact || "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {demo.lead.email ? (
                          <a href={`mailto:${demo.lead.email}`} className="text-blue-600 hover:text-blue-500">
                            {demo.lead.email}
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Organization</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {demo.lead.orgName || "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Source</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {demo.lead.source || "Not specified"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {/* Demo Answers */}
            {demo.answers && Object.keys(demo.answers).length > 0 && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Demo Form Answers
                  </h3>
                  <dl className="space-y-4">
                    {Object.entries(demo.answers).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>
        );

      case "timeline":
        return (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Activity Timeline
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {timeline.length === 0 ? (
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                              <ClockIcon className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5">
                            <p className="text-sm text-gray-500">No activity recorded yet</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    timeline.map((event, eventIdx) => (
                      <li key={event.id}>
                        <div className="relative pb-8">
                          {eventIdx !== timeline.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                <ClockIcon className="h-5 w-5 text-white" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {event.user?.name || event.user?.email || "System"}
                                  </span>{" "}
                                  performed{" "}
                                  <span className="font-medium text-gray-900">
                                    {event.action}
                                  </span>
                                  {event.resourceType && (
                                    <>
                                      {" "}on{" "}
                                      <span className="font-medium text-gray-900">
                                        {event.resourceType}
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={event.createdAt.toISOString()}>
                                  {new Date(event.createdAt).toLocaleString()}
                                </time>
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AppIcon className="h-12 w-12 text-gray-400 mr-4" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {getAppDisplayName(demo.appSlug)}
                </h2>
                <p className="text-sm text-gray-500">
                  Demo Request • {new Date(demo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!demo.bookedAt && (
                <Link
                  href={`/admin/demos/${demo.id}/convert`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <ArrowRightIcon className="h-4 w-4 mr-2" />
                  Convert to Organization
                </Link>
              )}
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`${
              activeTab === "timeline"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <ClockIcon className="h-4 w-4 mr-2" />
            Timeline
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}
