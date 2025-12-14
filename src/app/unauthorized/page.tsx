import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Unauthorized | OMGsystems",
  description: "You don't have permission to access this resource.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Unauthorized Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              You don't have the necessary permissions to view this page. This could be because:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>You're not logged in</li>
              <li>Your account doesn't have the required role</li>
              <li>You're trying to access another organization's data</li>
              <li>Your session has expired</li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help?{' '}
                <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}