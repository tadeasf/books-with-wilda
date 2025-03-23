'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@auth0/nextjs-auth0';
import { Form as FormComponent, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { directus } from '@/lib/directus';
import { createItem } from '@directus/sdk';
import { toast } from 'sonner';

const FEEDBACK_CATEGORIES = [
  { value: 'website', label: 'Website Experience' },
  { value: 'content', label: 'Book Content' },
  { value: 'recommendations', label: 'Book Recommendations' },
  { value: 'community', label: 'Community & Forum' },
  { value: 'other', label: 'Other' },
];

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  user_nickname: z.string().min(2, { message: "Name must be at least 2 characters" }),
  user_email: z.string().email({ message: "Please enter a valid email address" }),
  content: z.string().min(10, { message: "Feedback must be at least 10 characters" }),
  rating: z.coerce.number().min(1).max(5, { message: "Please select a rating between 1 and 5" }),
  category: z.string({ required_error: "Please select a category" }),
});

type UserFeedbackFormValues = z.infer<typeof formSchema>;

interface UserFeedbackFormProps {
  className?: string;
  onSuccess?: (data: UserFeedbackFormValues) => void;
}

export default function UserFeedbackForm({ className, onSuccess }: UserFeedbackFormProps) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form with validation
  const form = useForm<UserFeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      user_nickname: user?.name || '',
      user_email: user?.email || '',
      content: '',
      rating: 5,
      category: '',
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: UserFeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit to Directus
      await directus.request(
        createItem('user_feedback', {
          ...data,
          status: 'new'
        })
      );
      
      // Show success message
      toast.success('Your feedback has been submitted successfully!');
      
      // Reset form
      form.reset({
        ...form.getValues(),
        title: '',
        content: '',
        rating: 5,
        category: '',
      });
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <p className="text-muted-foreground text-sm">
          Your feedback helps us improve our services and recommendations.
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
                    <Input placeholder="Summarize your feedback" {...field} />
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
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Category<span className="text-destructive ml-1">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FEEDBACK_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rating<span className="text-destructive ml-1">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                      className="flex space-x-2"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FormItem key={rating} className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={rating.toString()} />
                          </FormControl>
                          <FormLabel className="font-normal">{rating}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback<span className="text-destructive ml-1">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your experience" 
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
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </form>
        </FormComponent>
      </CardContent>
    </Card>
  );
} 