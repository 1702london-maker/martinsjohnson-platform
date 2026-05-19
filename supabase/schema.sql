-- ═══════════════════════════════════════════════════════
-- MARTINS JOHNSON PLATFORM — SUPABASE SCHEMA
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ─── PRODUCTS ────────────────────────────────────────────
create table if not exists products (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  slug            text unique not null,
  description     text,
  price           numeric(10,2) not null,
  currency        text default 'GBP',
  -- Category: oxford | loafer | boot | derby | monkstrap | sneaker | slipper | highheel | bag | belt | bracelet | watch
  category        text not null,
  -- Gender: men | women | unisex
  gender          text default 'unisex',
  -- Images stored in Supabase Storage, referenced by public URL
  image_urls      text[] default '{}',
  sku             text unique,
  stock_qty       integer default 0,
  is_featured     boolean default false,
  is_new_arrival  boolean default false,
  is_bespoke      boolean default false,
  available       boolean default true,
  tags            text[] default '{}',
  metadata        jsonb default '{}',
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists idx_products_category  on products(category);
create index if not exists idx_products_available on products(available);
create index if not exists idx_products_gender    on products(gender);

-- ─── PRODUCT VARIANTS ────────────────────────────────────
create table if not exists product_variants (
  id          uuid primary key default uuid_generate_v4(),
  product_id  uuid references products(id) on delete cascade,
  sku         text unique,
  size        text,
  colour      text,
  leather     text,
  sole        text,
  price_adj   numeric(10,2) default 0,
  stock_qty   integer default 0,
  available   boolean default true
);

-- ─── ORDERS ──────────────────────────────────────────────
create table if not exists orders (
  id                  uuid primary key default uuid_generate_v4(),
  order_number        text unique not null default 'MJ-' || upper(substr(md5(random()::text), 1, 8)),
  user_id             uuid references auth.users(id),
  customer_email      text not null,
  customer_name       text,
  status              text default 'pending',
  -- status: pending | confirmed | processing | shipped | delivered | cancelled
  items               jsonb not null,
  subtotal            numeric(10,2) not null,
  shipping            numeric(10,2) default 0,
  total               numeric(10,2) not null,
  currency            text default 'GBP',
  stripe_session_id   text unique,
  shipping_address    jsonb,
  tracking_number     text,
  notes               text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index if not exists idx_orders_user   on orders(user_id);
create index if not exists idx_orders_email  on orders(customer_email);
create index if not exists idx_orders_status on orders(status);

-- ─── BESPOKE REQUESTS ────────────────────────────────────
create table if not exists bespoke_requests (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id),
  customer_email    text not null,
  customer_name     text,
  type              text not null,  -- shoes | bags | leather-goods
  style             text,           -- oxford | loafer | etc.
  leather           text,
  colour            text,
  size              text,
  hardware          text,
  lining            text,
  initials          text,           -- max 3 chars
  notes             text,
  reference_images  text[] default '{}',
  status            text default 'submitted',
  -- status: submitted | reviewing | quoted | in-progress | completed
  quote_amount      numeric(10,2),
  admin_notes       text,
  created_at        timestamptz default now()
);

-- ─── APPOINTMENTS ────────────────────────────────────────
create table if not exists appointments (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id),
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text,
  type              text not null,
  -- type: bespoke-shoes | bespoke-bags | leather-goods | 1702london | kol | general
  appointment_date  date not null,
  appointment_time  text not null,
  notes             text,
  status            text default 'confirmed',
  -- status: confirmed | cancelled | completed | no-show
  deposit_paid      boolean default false,
  stripe_session_id text,
  created_at        timestamptz default now()
);

create index if not exists idx_appts_date  on appointments(appointment_date);
create index if not exists idx_appts_email on appointments(customer_email);

-- ─── CLUB SUBSCRIPTIONS ──────────────────────────────────
create table if not exists club_subscriptions (
  id                      uuid primary key default uuid_generate_v4(),
  user_id                 uuid references auth.users(id),
  customer_email          text not null,
  tier                    text not null,  -- founder | atelier | maison
  stripe_subscription_id  text unique,
  stripe_customer_id      text,
  status                  text default 'active',
  -- status: active | cancelled | past_due | paused
  current_period_end      timestamptz,
  created_at              timestamptz default now(),
  cancelled_at            timestamptz
);

-- ─── WISHLISTS ───────────────────────────────────────────
create table if not exists wishlists (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) not null,
  product_id  uuid references products(id) on delete cascade,
  added_at    timestamptz default now(),
  unique(user_id, product_id)
);

-- ─── NEWSLETTER ──────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id             uuid primary key default uuid_generate_v4(),
  email          text unique not null,
  source         text,   -- homepage | kol | footer | join_the_club
  subscribed     boolean default true,
  subscribed_at  timestamptz default now()
);

-- ─── JOURNAL / BLOG ──────────────────────────────────────
create table if not exists journal_posts (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text unique not null,
  excerpt       text,
  content       text,
  cover_image   text,
  category      text,
  author        text default 'Martins Johnson',
  published     boolean default false,
  published_at  timestamptz,
  created_at    timestamptz default now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────
alter table products              enable row level security;
alter table orders                enable row level security;
alter table bespoke_requests      enable row level security;
alter table appointments          enable row level security;
alter table wishlists             enable row level security;
alter table newsletter_subscribers enable row level security;
alter table club_subscriptions    enable row level security;
alter table journal_posts         enable row level security;

-- Products: public read
create policy "Products public read"
  on products for select using (available = true);

-- Orders: users see own orders
create policy "Users see own orders"
  on orders for select using (auth.uid() = user_id);
create policy "Users see orders by email"
  on orders for select using ((auth.jwt() ->> 'email') = customer_email);

-- Bespoke: anyone can submit, users see own
create policy "Anyone can submit bespoke"
  on bespoke_requests for insert with check (true);
create policy "Users see own bespoke"
  on bespoke_requests for select using (auth.uid() = user_id);

-- Appointments: anyone can book, users see own
create policy "Anyone can book appointment"
  on appointments for insert with check (true);
create policy "Users see own appointments"
  on appointments for select using (auth.uid() = user_id);

-- Wishlist: users manage own
create policy "Users manage wishlist"
  on wishlists for all using (auth.uid() = user_id);

-- Newsletter: anyone can subscribe
create policy "Anyone can subscribe newsletter"
  on newsletter_subscribers for insert with check (true);

-- Club: users see own subscription
create policy "Users see own subscription"
  on club_subscriptions for select using (auth.uid() = user_id);
create policy "Users see subscription by email"
  on club_subscriptions for select using ((auth.jwt() ->> 'email') = customer_email);

-- Journal: public read for published
create policy "Journal public read"
  on journal_posts for select using (published = true);

-- ─── AUTO-UPDATE updated_at ──────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger trg_products_updated
  before update on products for each row execute function update_updated_at();

create trigger trg_orders_updated
  before update on orders for each row execute function update_updated_at();

-- ─── SUPABASE STORAGE: product-images bucket ─────────────
-- Run this manually in Supabase Dashboard > Storage > New bucket
-- Bucket name: product-images
-- Public: YES (so image URLs work in the frontend)
-- Max file size: 10MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
