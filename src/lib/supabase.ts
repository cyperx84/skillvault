import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Template {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  files_url: string;
  preview_content: string;
  rating_avg: number;
  review_count: number;
  downloads: number;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  template_id: string;
  stripe_session_id: string;
  created_at: string;
}

export interface Review {
  id: string;
  template_id: string;
  user_id: string;
  rating: number;
  text: string;
  created_at: string;
}
