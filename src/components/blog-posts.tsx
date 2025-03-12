import { directus } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await directus.request(
          readItems('blog', {
            filter: { status: { _eq: 'published' } },
            sort: ['-date_created'],
            limit: 3
          })
        );
        setPosts(result as BlogPost[]);
      } catch (err) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) return <div className="text-gray-500">Loading posts...</div>;

  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <article key={post.id} className="border rounded-lg p-6">
          {post.header_image && (
            <div className="relative h-48 mb-4">
              <Image
                src={`${directusUrl}/assets/${post.header_image}`}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <time className="text-sm text-gray-500 mt-2 block">
            {new Date(post.date_created).toLocaleDateString()}
          </time>
        </article>
      ))}
    </div>
  );
} 