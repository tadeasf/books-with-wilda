import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Call the Auth0 middleware which will handle the callback through the onCallback hook
    return await auth0.middleware(request);
  } catch (error) {
    console.error('Error in callback route:', error);
    // If there's an error, redirect to the home page
    return NextResponse.redirect(new URL('/', process.env.APP_BASE_URL as string));
  }
} 