-- SkillVault database schema
-- Run in Supabase SQL Editor

create table templates (
  id uuid default gen_random_uuid() primary key,
  creator_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text not null,
  category text not null,
  price integer not null default 0,
  files_url text,
  preview_content text,
  rating_avg real default 0,
  review_count integer default 0,
  downloads integer default 0,
  created_at timestamptz default now()
);

create table purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  template_id uuid references templates(id) on delete cascade not null,
  stripe_session_id text not null,
  created_at timestamptz default now(),
  unique(stripe_session_id)
);

create table reviews (
  id uuid default gen_random_uuid() primary key,
  template_id uuid references templates(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text,
  created_at timestamptz default now(),
  unique(template_id, user_id)
);

create or replace function increment_downloads(template_id uuid)
returns void as $$
  update templates set downloads = downloads + 1 where id = template_id;
$$ language sql;

alter table templates enable row level security;
alter table purchases enable row level security;
alter table reviews enable row level security;

create policy "Anyone can read templates" on templates for select using (true);
create policy "Creators can insert templates" on templates for insert with check (auth.uid() = creator_id);
create policy "Creators can update their templates" on templates for update using (auth.uid() = creator_id);
create policy "Users can read their purchases" on purchases for select using (auth.uid() = user_id);
create policy "Users can insert purchases" on purchases for insert with check (auth.uid() = user_id);
create policy "Anyone can read reviews" on reviews for select using (true);
create policy "Users can insert reviews" on reviews for insert with check (auth.uid() = user_id);
