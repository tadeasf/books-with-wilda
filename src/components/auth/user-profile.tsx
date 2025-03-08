'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="p-6 border rounded-lg">
        {user.picture && (
          <div className="mb-4 text-center">
            <Image
              src={user.picture}
              alt={user.name || 'User profile'}
              className="rounded-full mx-auto"
              width={96}
              height={96}
            />
          </div>
        )}
        
        <h2 className="text-xl font-semibold text-center">{user.name}</h2>
        {user.email && <p className="text-gray-500 text-center mb-4">{user.email}</p>}
        
        <div className="flex justify-center mt-4">
          <Button asChild variant="outline">
            <Link href="/auth/logout">Logout</Link>
          </Button>
        </div>
      </div>
    )
  );
}