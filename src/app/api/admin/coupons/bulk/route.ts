import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const bulkActionSchema = z.object({
  action: z.enum(["enable", "disable", "delete"]),
  ids: z.array(z.string()).min(1),
});

// POST /api/admin/coupons/bulk
// Performs bulk operations on coupons
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  try {
    const body = await req.json();
    const { action, ids } = bulkActionSchema.parse(body);

    let result: { count: number };

    switch (action) {
      case "enable":
        result = await prisma.coupon.updateMany({
          where: { id: { in: ids } },
          data: { isActive: true },
        });
        return apiSuccess({
          message: `${result.count} coupon(s) enabled successfully`,
          affected: result.count,
        });

      case "disable":
        result = await prisma.coupon.updateMany({
          where: { id: { in: ids } },
          data: { isActive: false },
        });
        return apiSuccess({
          message: `${result.count} coupon(s) disabled successfully`,
          affected: result.count,
        });

      case "delete":
        result = await prisma.coupon.deleteMany({
          where: { id: { in: ids } },
        });
        return apiSuccess({
          message: `${result.count} coupon(s) deleted successfully`,
          affected: result.count,
        });

      default:
        return apiError("Invalid action", 400);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.issues);
    }
    console.error("Bulk coupon action error:", error);
    throw error;
  }
}
