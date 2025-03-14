import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

// This ensures the route is always dynamically evaluated
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    return NextResponse.json({ user: session.user || null });
  } catch (error) {
    console.error('Error in profile route:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 