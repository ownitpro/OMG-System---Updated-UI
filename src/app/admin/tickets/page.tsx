import { redirect } from 'next/navigation';

// Redirect /admin/tickets to /dashboard/admin/tickets
export default function AdminTicketsRedirect() {
  redirect('/dashboard/admin/tickets');
}
