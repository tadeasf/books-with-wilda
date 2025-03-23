import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookMarked, Heart, Users } from "lucide-react";
import BlogPosts from "@/components/blog-posts";
import LandingForm from "@/components/forms/landing-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tighter">
                Discover and Share <span className="text-primary">Books</span> with Fellow Readers
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Join our community of book lovers, where you can track your reading journey, discover new favorites, and connect with like-minded readers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/auth/login?returnTo=/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="bg-background border rounded-xl shadow-lg p-6">
              <LandingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to enhance your reading experience 
              and connect with fellow book enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Your Reading</h3>
              <p className="text-muted-foreground">
                Keep a digital library of books you&apos;ve read, want to read, and are 
                currently reading. Set goals and track your progress.
              </p>
            </div>
            
            <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Recommendations</h3>
              <p className="text-muted-foreground">
                Help others discover great books by sharing your favorites and writing 
                thoughtful reviews that inspire new reading adventures.
              </p>
            </div>
            
            <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Readers</h3>
              <p className="text-muted-foreground">
                Join reading challenges, participate in discussions, and follow other 
                readers with similar tastes to expand your literary horizons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover tips, recommendations, and insights from our community of book lovers.
            </p>
          </div>
          
          <BlogPosts />
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-screen-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Reading Journey?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of readers who have already discovered their next favorite book on our platform.
          </p>
          <Button size="lg" variant="outline" className="border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link href="/auth/login?returnTo=/dashboard">
              Join Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
