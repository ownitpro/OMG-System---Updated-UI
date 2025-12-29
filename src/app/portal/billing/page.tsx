import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function PortalBillingPage() {
  const session = await auth();

  // Redirect to the appropriate billing page based on role
  if (session?.user?.role === "ADMIN" || session?.user?.role === "STAFF") {
    redirect("/portal/admin/billing");
  } else {
    redirect("/portal/client/billing");
  }
}
