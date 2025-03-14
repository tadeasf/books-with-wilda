import { NextResponse, NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

// This ensures the route is always dynamically evaluated
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get returnTo parameter from URL if it exists
    const url = new URL(request.url);
    const returnTo = url.searchParams.get('returnTo');
    
    // If we have a returnTo parameter, modify the request URL to include it
    // The Auth0 middleware will use this for redirection after authentication
    if (returnTo) {
      // The Auth0 middleware will automatically use the returnTo parameter
      // when processing the login request
      console.log(`Login with returnTo: ${returnTo}`);
    }
    
    // Use the auth0 middleware to handle the login
    return auth0.middleware(request);
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.redirect(new URL('/', process.env.APP_BASE_URL as string));
  }
} 