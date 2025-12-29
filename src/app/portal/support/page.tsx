import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function PortalSupportPage() {
  const session = await auth();

  // Redirect to the appropriate support page based on role
  if (session?.user?.role === "ADMIN" || session?.user?.role === "STAFF") {
    redirect("/portal/admin/support");
  } else {
    redirect("/portal/client/support");
  }
}
