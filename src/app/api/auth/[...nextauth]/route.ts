import NextAuth from "next-auth";
import { authOptions } from "@/auth";
import type { NextRequest } from "next/server";

const handler = NextAuth(authOptions);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  try {
    const params = await context.params;
    return await handler(req, { params });
  } catch (error: any) {
    console.error("[NextAuth] GET error:", error);
    // Return JSON error response instead of letting Next.js return HTML
    return new Response(
      JSON.stringify({ 
        error: "Authentication error", 
        message: error?.message || "Unknown error" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  try {
    const params = await context.params;
    return await handler(req, { params });
  } catch (error: any) {
    console.error("[NextAuth] POST error:", error);
    // Return JSON error response instead of letting Next.js return HTML
    return new Response(
      JSON.stringify({ 
        error: "Authentication error", 
        message: error?.message || "Unknown error" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
