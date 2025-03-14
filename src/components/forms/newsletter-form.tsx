'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@auth0/nextjs-auth0';
import { Form as FormComponent, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { directus } from '@/lib/directus';
import { createItem } from '@directus/sdk';
import { toast } from 'sonner';

const INTERESTS = [
  { id: 'fiction', label: 'Fiction' },
  { id: 'non-fiction', label: 'Non-Fiction' },
  { id: 'sci-fi', label: 'Science Fiction' },
  { id: 'mystery', label: 'Mystery & Thriller' },
  { id: 'romance', label: 'Romance' },
  { id: 'biography', label: 'Biography' },
];

// Define form schema
const formSchema = z.object({
  title: z.string().default('Newsletter Subscription'),
  user_nickname: z.string().min(2, { message: "Name must be at least 2 characters" }),
  user_email: z.string().email({ message: "Please enter a valid email address" }),
  content: z.string().default('Newsletter subscription request'),
  subscribe_to_updates: z.boolean().default(true),
  interests: z.array(z.string()).optional(),
});

type NewsletterFormValues = z.infer<typeof formSchema>;

interface NewsletterFormProps {
  className?: string;
  onSuccess?: (data: NewsletterFormValues) => void;
}

export default function NewsletterForm({ className, onSuccess }: NewsletterFormProps) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form with validation
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Newsletter Subscription',
      user_nickname: user?.name || '',
      user_email: user?.email || '',
      content: 'Newsletter subscription request',
      subscribe_to_updates: true,
      interests: [],
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit to Directus
      await directus.request(
        createItem('newsletter', {
          ...data,
          status: 'new'
        })
      );
      
      // Show success message
      toast.success('You have been subscribed to our newsletter!');
      
      // Reset form
      form.reset({
        ...form.getValues(),
        interests: [],
      });
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Subscribe to Our Newsletter</CardTitle>
        <p className="text-muted-foreground text-sm">
          Stay updated with our latest book recommendations and reading events.
        </p>
      </CardHeader>
      <CardContent>
        <FormComponent {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="user_nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name<span className="text-destructive ml-1">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email<span className="text-destructive ml-1">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subscribe_to_updates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Subscribe to updates</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about new books and events.
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="space-y-3">
              <FormLabel>Reading Interests</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map((interest) => (
                  <FormField
                    key={interest.id}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={interest.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(interest.id)}
                              onCheckedChange={(checked) => {
                                const updatedInterests = checked
                                  ? [...(field.value || []), interest.id]
                                  : (field.value || []).filter(
                                      (value) => value !== interest.id
                                    );
                                field.onChange(updatedInterests);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {interest.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        </FormComponent>
      </CardContent>
    </Card>
  );
} 