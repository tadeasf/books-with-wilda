'use client';

import { useState } from 'react';
import FormContainer from './form-container';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

export default function LandingForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFormSuccess = () => {
    setFormSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  if (formSubmitted) {
    return (
      <Card className="w-full border-primary/20 bg-primary/5">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[350px] text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mb-2">Thank You!</CardTitle>
          <p className="text-muted-foreground">
            Your message has been received. We&apos;ll get back to you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Tabs defaultValue="contact" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="contact">Contact Us</TabsTrigger>
        <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
      </TabsList>
      
      <TabsContent value="contact" className="mt-0">
        <FormContainer 
          formName="contact_form" 
          onSuccess={handleFormSuccess}
        />
      </TabsContent>
      
      <TabsContent value="newsletter" className="mt-0">
        <FormContainer 
          formName="newsletter_signup" 
          onSuccess={handleFormSuccess}
        />
      </TabsContent>
    </Tabs>
  );
} 