import { createDirectus, rest, staticToken } from '@directus/sdk';

const directusUrl = process.env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055';

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

export const directus = createDirectus<{ blog: BlogPost }>(directusUrl)
  .with(rest())
  .with(staticToken(process.env.NEXT_DIRECTUS_STATIC_TOKEN!)); 