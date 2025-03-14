'use client';

import { Card } from '@/components/ui/card';
import { useEffect } from 'react';

export default function GoodreadsWidgets() {
  useEffect(() => {
    const loadScript = (src: string) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    const scripts = [
      'https://www.goodreads.com/user_challenges/widget/62899486-tade-fo-t?challenge_id=11627&v=2',
      'https://www.goodreads.com/quotes/widget/62899486-tade-fo-t?v=2',
      'https://www.goodreads.com/review/grid_widget/62899486.Tade%C3%A1%C5%A1\'s%20read%20book%20montage?cover_size=medium&hide_link=true&hide_title=true&num_books=200&order=a&shelf=read&sort=date_added&widget_id=1741796452'
    ].map(loadScript);

    return () => scripts.forEach(script => script.remove());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div id="gr_challenge_11627" />
      </Card>

      <Card className="p-6">
        <div id="gr_quote_body" />
      </Card>

      <Card className="p-6 md:col-span-2">
        <div id="gr_grid_widget_1741796452" />
      </Card>
    </div>
  );
} 