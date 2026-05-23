-- Martins Johnson Migration 002
-- Run in Supabase Dashboard -> SQL Editor

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, phone text, role text default 'customer',
  avatar_url text, created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table profiles enable row level security;
drop policy if exists "Users read own profile" on profiles;
create policy "Users read own profile" on profiles for select using (auth.uid() = id);
drop policy if exists "Users update own profile" on profiles;
create policy "Users update own profile" on profiles for update using (auth.uid() = id);
drop policy if exists "Profiles insert on signup" on profiles;
create policy "Profiles insert on signup" on profiles for insert with check (auth.uid() = id);

create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure handle_new_user();

create table if not exists affiliate_applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id), full_name text not null, email text not null,
  phone text, platform text, handle text, social_links jsonb default '{}',
  audience_size text, niche text, tier text default 'creator', location text,
  reason text, status text default 'pending', reviewed_at timestamptz, created_at timestamptz default now()
);
alter table affiliate_applications enable row level security;
drop policy if exists "Anyone can apply affiliate" on affiliate_applications;
create policy "Anyone can apply affiliate" on affiliate_applications for insert with check (true);
drop policy if exists "Users see own application" on affiliate_applications;
create policy "Users see own application" on affiliate_applications for select
  using (auth.uid() = user_id or (auth.jwt() ->> 'email') = email);

create table if not exists affiliates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique references auth.users(id),
  application_id uuid references affiliate_applications(id),
  referral_code text unique not null, referral_link text not null,
  tier text default 'creator', commission_rate numeric(5,2) default 12.00,
  clicks integer default 0, conversions integer default 0,
  commission_balance numeric(10,2) default 0, total_earned numeric(10,2) default 0,
  payout_status text default 'pending', bank_details jsonb,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table affiliates enable row level security;
drop policy if exists "Affiliates see own data" on affiliates;
create policy "Affiliates see own data" on affiliates for select using (auth.uid() = user_id);
drop policy if exists "Affiliates update own" on affiliates;
create policy "Affiliates update own" on affiliates for update using (auth.uid() = user_id);

create table if not exists member_messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id), title text not null, body text not null,
  from_name text default 'Martins Johnson', read_at timestamptz, created_at timestamptz default now()
);
alter table member_messages enable row level security;
drop policy if exists "Users see own messages" on member_messages;
create policy "Users see own messages" on member_messages for select using (auth.uid() = user_id);
drop policy if exists "Users mark messages read" on member_messages;
create policy "Users mark messages read" on member_messages for update using (auth.uid() = user_id);

create table if not exists member_selections (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id), month text not null,
  selected_product uuid references products(id), selected_colour text,
  status text default 'pending', tracking_number text, created_at timestamptz default now()
);
alter table member_selections enable row level security;
drop policy if exists "Users manage own selections" on member_selections;
create policy "Users manage own selections" on member_selections for all using (auth.uid() = user_id);

create table if not exists events (
  id uuid primary key default uuid_generate_v4(), title text not null, description text,
  date timestamptz not null, location text, members_only boolean default true,
  tier_required text, image_url text, rsvp_link text, created_at timestamptz default now()
);
alter table events enable row level security;
drop policy if exists "Events public read" on events;
create policy "Events public read" on events for select using (true);

create table if not exists affiliate_clicks (
  id uuid primary key default uuid_generate_v4(),
  affiliate_id uuid references affiliates(id), referral_code text,
  url text, ip_hash text, converted boolean default false,
  order_id uuid references orders(id), created_at timestamptz default now()
);
alter table affiliate_clicks enable row level security;
drop policy if exists "Affiliates see own clicks" on affiliate_clicks;
create policy "Affiliates see own clicks" on affiliate_clicks for select using (
  affiliate_id in (select id from affiliates where user_id = auth.uid())
);

insert into events (title, description, date, location, members_only, tier_required) values
  ('Martins Johnson Autumn Showcase', 'An exclusive preview of the AW collection. Members only.', '2025-10-15 19:00:00+00', 'Mayfair, London', true, 'founder'),
  ('Knife on Leather Live Session', 'Watch a bespoke pair crafted live. All members welcome.', '2025-11-08 18:30:00+00', 'Martins Johnson Atelier', true, null),
  ('1702London Private Drop', 'The 1702 collection unveiled to Maison tier members.', '2025-12-01 20:00:00+00', 'Private Location, London', true, 'maison')
on conflict do nothing;

select 'Migration 002 complete' as status;
