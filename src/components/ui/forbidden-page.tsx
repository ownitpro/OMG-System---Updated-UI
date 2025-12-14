import React from "react";
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ForbiddenPageProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
}

export function ForbiddenPage({
  title = "Access Denied",
  message = "You don't have access to this organization.",
  showBackButton = true,
  backHref = "/admin",
  backText = "Back to Admin"
}: ForbiddenPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" aria-hidden="true" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="text-6xl font-bold text-red-500 mb-4">403</div>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this resource. 
              This action has been logged for security purposes.
            </p>
            
            {showBackButton && (
              <div className="space-y-4">
                <Link
                  href={backHref}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  {backText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
}
