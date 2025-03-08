'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, BookOpen } from 'lucide-react';

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <Link href="/" className="font-bold">
            Books with Wilda
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className="text-sm font-medium">
                My Books
              </Link>
              <Link href="/profile" className="text-sm font-medium">
                Profile
              </Link>
            </>
          )}
          
          <div className="ml-4">
            {isLoading ? (
              <Button disabled variant="outline" size="sm">
                Loading...
              </Button>
            ) : user ? (
              <Button asChild variant="outline" size="sm">
                {/* 
                  Auth0 docs recommend using anchor tags for API routes rather than Link:
                  "Next linting rules might suggest using the Link component instead of an anchor tag. 
                  The Link component is meant to perform client-side transitions between pages. 
                  As the link points to an API route and not to a page, you should keep it as an anchor tag."
                */}
                <Link href="/auth/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm">
                {/* Using anchor tag as recommended by Auth0 docs */}
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}