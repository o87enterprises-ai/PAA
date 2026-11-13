-- supabase/schema.sql  (run in the Supabase SQL editor)

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  subscription_tier text default 'free' check (subscription_tier in ('free','toolkit','pro','done_for_you')),
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null check (category in ('mental_health','basic_needs','substance_use','legal_advocacy','education','crisis')),
  subcategory text,
  state text,
  city text,
  address text,
  phone text,
  website text,
  email text,
  hours text,
  languages text[] default '{en}',
  is_verified boolean default false,
  listing_tier text default 'free' check (listing_tier in ('free','verified','premier','sponsor')),
  last_verified_at timestamptz,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

create index idx_resources_state_category on public.resources (state, category);
create index idx_resources_search on public.resources using gin (to_tsvector('english', name || ' ' || coalesce(description,'')));

create table public.crisis_resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  description text,
  available_24_7 boolean default true,
  state text,
  created_at timestamptz default now()
);

insert into public.crisis_resources (name, phone, description) values
  ('988 Suicide & Crisis Lifeline', '988', 'Free, confidential support for people in distress.'),
  ('Crisis Text Line', '741741', 'Text HOME to connect with a crisis counselor.'),
  ('National Domestic Violence Hotline', '1-800-799-7233', '24/7 support for domestic violence survivors.');

-- NOTE: for digital products, file_url holds a PATH inside a PRIVATE storage bucket
-- named "products" (not a public URL). /api/download-product signs it after payment.
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_cents integer not null,
  product_type text check (product_type in ('digital','pod','affiliate')),
  file_url text,
  image_url text,
  stripe_price_id text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  stripe_session_id text unique,
  product_id uuid references public.products,
  amount_cents integer,
  status text default 'pending',
  created_at timestamptz default now()
);

create table public.ad_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  reward_type text not null,
  request_id text,
  granted_at timestamptz default now()
);

-- Row Level Security: enabled on EVERY table (tables without it are world-writable via the API)
alter table public.profiles enable row level security;
alter table public.resources enable row level security;
alter table public.crisis_resources enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.ad_grants enable row level security;

create policy "Public resources are viewable by everyone" on public.resources for select using (true);
-- Submissions must start unverified/free so users can't self-promote a listing
create policy "Authenticated users can submit resources" on public.resources for insert
  with check (auth.role() = 'authenticated' and is_verified = false and listing_tier = 'free');
create policy "Crisis resources are public" on public.crisis_resources for select using (true);
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Active products are viewable" on public.products for select using (is_active = true);
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can view own ad grants" on public.ad_grants for select using (auth.uid() = user_id);

-- Users may only edit their name; subscription_tier / stripe_customer_id are written by the
-- Stripe webhook (service role). Without this, any user could upgrade themselves for free.
revoke update on public.profiles from authenticated, anon;
grant update (full_name) on public.profiles to authenticated;
