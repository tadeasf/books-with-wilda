'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@auth0/nextjs-auth0';
import { Form as FormComponent, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { directus } from '@/lib/directus';
import { createItem } from '@directus/sdk';
import { toast } from 'sonner';

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  user_nickname: z.string().min(2, { message: "Name must be at least 2 characters" }),
  user_email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().optional(),
  phone_number: z.string().optional(),
  content: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactUsFormValues = z.infer<typeof formSchema>;

interface ContactUsFormProps {
  className?: string;
  onSuccess?: (data: ContactUsFormValues) => void;
}

export default function ContactUsForm({ className, onSuccess }: ContactUsFormProps) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form with validation
  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      user_nickname: user?.name || '',
      user_email: user?.email || '',
      subject: '',
      phone_number: '',
      content: ''
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: ContactUsFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit to Directus
      await directus.request(
        createItem('contact_us', {
          ...data,
          status: 'new'
        })
      );
      
      // Show success message
      toast.success('Your message has been sent successfully!');
      
      // Reset form
      form.reset();
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <p className="text-muted-foreground text-sm">
          Have a question or feedback? We&apos;d love to hear from you!
        </p>
      </CardHeader>
      <CardContent>
        <FormComponent {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title<span className="text-destructive ml-1">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="What&apos;s this about?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message<span className="text-destructive ml-1">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How can we help you?" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </FormComponent>
      </CardContent>
    </Card>
  );
} 