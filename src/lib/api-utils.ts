import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { AuthError, requireRole, requireAuth } from "./auth-helpers";

// Standard API response format
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status: number = 400, details?: any) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status }
  );
}

// Wrapper for protected routes
export function withAuth(
  handler: (req: NextRequest, context: { params: any; user: any }) => Promise<NextResponse>,
  options?: { roles?: string[] }
) {
  return async (req: NextRequest, context: { params: any }) => {
    try {
      const user = options?.roles
        ? await requireRole(options.roles)
        : await requireAuth();

      return await handler(req, { ...context, user });
    } catch (error) {
      if (error instanceof AuthError) {
        return apiError(error.message, error.statusCode);
      }
      if (error instanceof ZodError) {
        return apiError("Validation failed", 400, error.errors);
      }
      console.error("API Error:", error);
      return apiError("Internal server error", 500);
    }
  };
}

// Request body validation
export async function parseBody<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T
): Promise<z.infer<T>> {
  const body = await req.json();
  return schema.parse(body);
}
