'use client';

import dynamic from 'next/dynamic';

// Dynamically import the user profile component with no SSR
const ClientProfile = dynamic(
  () => import('@/components/auth/user-profile'),
  { ssr: false }
);

export default function ClientProfileWrapper() {
  return <ClientProfile />;
} 