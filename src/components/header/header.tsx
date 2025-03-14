'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, BookOpen, MessageSquare, Menu, MoreHorizontal } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

export default function Header() {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  // Get the Forum URL from environment variable or use a default
  const forumUrl = process.env.NEXT_PUBLIC_FORUM_URL || 'https://books.forum.tadeasfort.com';

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    ...(user ? [
      { name: "My Books", href: "/dashboard" },
      { name: "Profile", href: "/profile" }
    ] : [])
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-8 flex h-16 items-center mx-auto max-w-screen-xl justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Books with Ztracena Cackorka</span>
            <span className="font-bold sm:hidden">Books</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              
              {/* Replace NavigationMenuTrigger with DropdownMenu for Forum access */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-10 gap-1 px-4">
                      <span>More</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href={forumUrl} target="_blank" rel="noopener noreferrer" className="flex items-center cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Forum</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isLoading ? (
              <Button disabled variant="outline" size="sm">
                Loading...
              </Button>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {user.picture ? (
                    <AvatarImage src={user.picture} alt={user.name || 'User'} />
                  ) : null}
                  <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth/logout" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Books with Ztracena Cackorka</span>
                </Link>
                <div className="grid gap-3">
                  {navigationItems.map((item) => (
                    <Button 
                      key={item.name} 
                      asChild 
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => setOpen(false)}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </Button>
                  ))}
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <a href={forumUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Forum</span>
                    </a>
                  </Button>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex justify-between items-center">
                    <ThemeToggle />
                    {user && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{user.name}</span>
                        <Avatar className="h-8 w-8">
                          {user.picture ? (
                            <AvatarImage src={user.picture} alt={user.name || 'User'} />
                          ) : null}
                          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                  {isLoading ? (
                    <Button disabled variant="outline" size="sm">
                      Loading...
                    </Button>
                  ) : user ? (
                    <Button 
                      asChild 
                      variant="outline" 
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/auth/logout" className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button 
                      asChild 
                      variant="outline" 
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/auth/login" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}