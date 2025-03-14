import { createDirectus, rest } from '@directus/sdk';

// Get the Directus URL from environment variables with a fallback
const directusUrl = process.env.DIRECTUS_PUBLIC_URL || 'https://books.admin.tadeasfort.com';
const directusToken = process.env.NEXT_DIRECTUS_STATIC_TOKEN || '';

export interface BlogPost {
  id: string;
  status: string;
  title: string;
  content: string;
  header_image: string;
  date_created: string;
  date_updated: string;
  user_created: string;
}

// Common form submission interface for all form types
export interface BaseFormSubmission {
  id: string;
  title: string;
  user_nickname: string;
  user_email: string;
  content: string;
  date_created: string;
  status: string; // "new", "in-progress", "completed", etc.
}

// Contact us form submission
export interface ContactUsSubmission extends BaseFormSubmission {
  subject?: string;
  phone_number?: string;
}

// Newsletter subscription form
export interface NewsletterSubmission extends BaseFormSubmission {
  subscribe_to_updates: boolean;
  interests?: string[]; // Array of interests (e.g., fiction, non-fiction, etc.)
}

// User feedback form
export interface UserFeedbackSubmission extends BaseFormSubmission {
  rating: number; // 1-5 rating
  category: string; // feedback category (e.g., website, books, recommendations)
}

// Legacy form interfaces (kept for reference but will be deprecated)
export interface FormField {
  id: string;
  form_id: string;
  name: string;
  label: string;
  type: string; // text, email, textarea, select, checkbox, etc.
  required: boolean;
  options?: string; // JSON string for select options
  placeholder?: string;
  default_value?: string;
  help_text?: string;
  order: number;
}

export interface Form {
  id: string;
  status: string;
  name: string;
  title: string;
  description?: string;
  success_message: string;
  submit_button_text: string;
  notification_email?: string;
  date_created: string;
  date_updated: string;
  fields?: FormField[];
}

export interface FormSubmission {
  id: string;
  form_id: string;
  submission_data: string; // JSON string of form data
  date_created: string;
  user_email?: string;
  user_name?: string;
  status: string; // new, in-progress, completed, etc.
}

export const directus = createDirectus<{
  blog: BlogPost;
  // Legacy form collections (kept for backward compatibility)
  forms: Form;
  form_fields: FormField;
  form_submissions: FormSubmission;
  // New specific form collections
  contact_us: ContactUsSubmission;
  newsletter: NewsletterSubmission;
  user_feedback: UserFeedbackSubmission;
}>(directusUrl)
  .with(rest({
    onRequest: (options) => ({ 
      ...options, 
      cache: 'no-store',  // Prevent Next.js from caching responses
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${directusToken}` // Ensure token is included in every request
      }
    }),
  })); 