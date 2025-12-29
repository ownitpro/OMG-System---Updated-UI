import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminMinimalHeader } from "@/components/dashboard/AdminMinimalHeader";
import "@/styles/admin-theme.css";

export default async function AdminLayout({
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

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <AdminSidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <AdminMinimalHeader />
        <main className="py-6 admin-transition">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
