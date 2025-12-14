import React from "react";
import Link from "next/link";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

interface UpcomingEventsListProps {
  events: Array<{
    date: string;
    title: string;
    description: string;
    url: string;
  }>;
}

export function UpcomingEventsList({ events }: UpcomingEventsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Community Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join live sessions, workshops, and networking events with automation experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {formatDate(event.date)}
                    <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                    {formatTime(event.date)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>
                  <Link
                    href={event.url}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Reserve Spot
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            See Full Events Calendar
            <CalendarIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
