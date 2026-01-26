import { NextResponse } from "next/server";

/**
 * Health check endpoint
 * GET /api/health
 *
 * Returns the current server status and timestamp
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    },
    { status: 200 }
  );
}
