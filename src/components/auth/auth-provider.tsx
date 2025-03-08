'use client';

import { Auth0Provider } from '@auth0/nextjs-auth0';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <Auth0Provider>{children}</Auth0Provider>;
}