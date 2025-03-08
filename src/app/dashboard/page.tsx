'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@/components/ui/button';
import { BookOpen, BookPlus } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div className="container py-12">Loading...</div>;
  if (error) return <div className="container py-12">Error: {error.message}</div>;

  // This page is protected by middleware, but we'll add an extra check just in case
  if (!user) {
    return (
      <div className="container max-w-5xl py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p>Please log in to view your dashboard.</p>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
        <p className="text-gray-500">
          Welcome back, {user.name || user.email}! Here are your books and recommendations.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Book List</h2>
        <Button size="sm">
          <BookPlus className="mr-2 h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Example placeholder items - would be populated from API/database */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col border rounded-lg overflow-hidden">
            <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">Book Title #{item}</h3>
              <p className="text-gray-500 text-sm">Author Name</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Add books to your collection by clicking &quot;Add Book&quot;</li>
          <li>Track your reading progress</li>
          <li>Share recommendations with friends</li>
          <li>Discover new books based on your interests</li>
        </ul>
      </div>
    </div>
  );
}