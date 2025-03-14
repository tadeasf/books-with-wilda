import { Auth0Client } from '@auth0/nextjs-auth0/server';

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
  }
});