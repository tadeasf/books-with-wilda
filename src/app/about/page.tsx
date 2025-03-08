import { BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">About Books with Wilda</h1>
          <p className="text-gray-500">
            A platform for book lovers to share, discover, and track their reading journey.
          </p>
        </div>

        <div className="my-8 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Books with Wilda was created with a simple mission: to connect readers 
            around the world and foster a community where the love of reading is 
            celebrated. We believe that books have the power to transform lives, 
            spark imagination, and build bridges between different cultures and 
            perspectives.
          </p>
          <p className="text-gray-700">
            Our platform is designed to make it easy for you to keep track of your 
            reading journey, discover new books that match your interests, and 
            connect with fellow book enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Track Your Reading</h3>
            <p className="text-gray-500 text-sm">
              Keep a digital library of books you&apos;ve read, want to read, and are 
              currently reading.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Share Recommendations</h3>
            <p className="text-gray-500 text-sm">
              Help others discover great books by sharing your favorites and writing 
              thoughtful reviews.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Connect with Readers</h3>
            <p className="text-gray-500 text-sm">
              Join reading challenges, participate in discussions, and follow other 
              readers with similar tastes.
            </p>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Who is Wilda?</h2>
          <p className="text-gray-700">
            Wilda is our fictional mascot - an avid reader with an insatiable 
            appetite for books of all genres. She represents the curious reader 
            in all of us, always searching for the next great story to get lost in.
          </p>
        </div>
      </div>
    </div>
  );
}