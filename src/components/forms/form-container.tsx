'use client';

import ContactUsForm from './contact-us-form';
import NewsletterForm from './newsletter-form';
import UserFeedbackForm from './user-feedback-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface FormContainerProps {
  formName: string;
  className?: string;
  onSuccess?: (data: Record<string, unknown>) => void;
}

export default function FormContainer({ formName, className, onSuccess }: FormContainerProps) {
  // Map form names to their components
  const FORM_COMPONENTS: Record<string, React.ReactNode> = {
    'contact_form': <ContactUsForm className={className} onSuccess={onSuccess} />,
    'newsletter_signup': <NewsletterForm className={className} onSuccess={onSuccess} />,
    'feedback_form': <UserFeedbackForm className={className} onSuccess={onSuccess} />
  };

  // Check if the requested form exists
  if (!FORM_COMPONENTS[formName]) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Form &quot;{formName}&quot; not found</AlertDescription>
      </Alert>
    );
  }

  // Return the appropriate form component
  return FORM_COMPONENTS[formName];
} 