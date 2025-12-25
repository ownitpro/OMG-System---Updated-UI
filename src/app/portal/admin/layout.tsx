import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma";

export default async function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Check if user has ADMIN or STAFF role
  const userRole = (session.user as any).role as Role;
  if (userRole !== Role.ADMIN && userRole !== Role.STAFF) {
    redirect("/unauthorized");
  }

  // PortalShell handles the UI, just render children
  return <>{children}</>;
}

