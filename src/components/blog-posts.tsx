'use client';
import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, AlertCircle, ArrowRight } from 'lucide-react';

// Define the BlogPost interface
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date_created: string;
  header_image?: string;
  status: string;
}

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get the directus URL from env or use the URL from the directus client
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_PUBLIC_URL || '';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await directus.request(
          // @ts-expect-error - Type issue with directus collection name
          readItems('blog', {
            filter: { status: { _eq: 'published' } },
            sort: ['-date_created'],
            limit: 3
          })
        );
        setPosts((result as unknown) as BlogPost[]);
      } catch (err: unknown) {
        console.error('Error fetching blog posts:', err);
        // Handle the error message extraction safely
        const errorMessage = err instanceof Error ? err.message : 'Failed to load blog posts';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Error loading blog posts</p>
          </div>
          <p className="text-sm mt-2">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="p-0">
              <Skeleton className="h-48 w-full rounded-t-lg" />
            </CardHeader>
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No posts found.</p>
        </CardContent>
      </Card>
    );
  }

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number): string => {
    // Strip HTML tags
    const strippedText = text.replace(/<[^>]*>?/gm, '');
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + '...';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="flex flex-col h-full">
          <CardHeader className="p-0">
            {post.header_image && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={`${directusUrl}/assets/${post.header_image}`}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6 flex-grow">
            <CardTitle className="mb-3 line-clamp-2">{post.title}</CardTitle>
            <div className="text-sm text-muted-foreground mb-3">
              {truncateText(post.content, 150)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="mr-1 h-3.5 w-3.5" />
              <time>{new Date(post.date_created).toLocaleDateString()}</time>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>Read more</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 