import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    return auth0.middleware(request);
  } catch (error) {
    console.error('Error in callback route:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 