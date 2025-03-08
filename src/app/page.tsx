import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container max-w-6xl py-12 md:py-24">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="flex items-center justify-center gap-2 text-primary">
          <BookOpen className="h-12 w-12" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Books with Wilda
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Share your favorite books and discover new ones recommended by others.
            Join our community of book lovers today!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/auth/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
            <BookOpen className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Track Your Books</h3>
            <p className="text-center text-gray-500">
              Keep a record of books you&apos;ve read and want to read.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
            <BookOpen className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Share Recommendations</h3>
            <p className="text-center text-gray-500">
              Share your favorite reads with friends and the community.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
            <BookOpen className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Discover New Books</h3>
            <p className="text-center text-gray-500">
              Find your next great read from personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
