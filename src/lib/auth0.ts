import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';

// Create instance with explicit configuration to ensure correct values
export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
  appBaseUrl: process.env.APP_BASE_URL as string,
  routes: {
    callback: '/auth/callback',
    login: '/auth/login',
    logout: '/auth/logout'
  },
  session: {
    rolling: true,
    absoluteDuration: 60 * 60 * 24 // 24 hours in seconds
  },
  // Add onCallback hook to handle redirection after authentication
  async onCallback(error, context) {
    // If there's an error during login, redirect to home page
    if (error) {
      console.error('Auth0 callback error:', error);
      return NextResponse.redirect(new URL('/', process.env.APP_BASE_URL as string));
    }

    // If returnTo was specified in the login URL, redirect there
    if (context.returnTo) {
      return NextResponse.redirect(new URL(context.returnTo, process.env.APP_BASE_URL as string));
    }

    // Default redirect to home page after successful login
    return NextResponse.redirect(new URL('/', process.env.APP_BASE_URL as string));
  }
});