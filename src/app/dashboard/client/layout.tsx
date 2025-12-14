import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { Role } from "@/generated/prisma";
import { ClientSidebar } from "@/components/dashboard/ClientSidebar";
import { ClientHeader } from "@/components/dashboard/ClientHeader";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Check if user has CLIENT role
  if (session.user.role !== Role.CLIENT) {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientSidebar />
      <div className="lg:pl-64">
        <ClientHeader />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
