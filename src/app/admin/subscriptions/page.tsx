import { redirect } from 'next/navigation';

// Redirect /admin/subscriptions to /dashboard/admin/subscriptions
export default function AdminSubscriptionsRedirect() {
  redirect('/dashboard/admin/subscriptions');
}
