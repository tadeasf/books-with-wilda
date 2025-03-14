import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

// This ensures the route is always dynamically evaluated
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Forward to the middleware which will handle the login
    return auth0.middleware(request);
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 