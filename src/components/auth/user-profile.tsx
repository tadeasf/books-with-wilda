'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Mail, User } from 'lucide-react';

export default function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-2 pb-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardContent className="pt-6">
          <div className="text-destructive text-center">
            <p className="font-medium">Error loading profile</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center">
            <p>Not signed in</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center gap-4 pb-2">
        <Avatar className="h-24 w-24">
          {user.picture ? (
            <AvatarImage src={user.picture} alt={user.name || 'User'} />
          ) : null}
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          {user.email && (
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-3.5 w-3.5" />
              <span>{user.email}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {user.sub && (
          <div className="text-xs text-center text-muted-foreground">
            <p>User ID: {user.sub}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button asChild variant="outline">
          <Link href="/auth/logout" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}