# Martins Johnson Platform — Backend Setup Guide

## Test Credentials

Create these accounts in Supabase Auth → Users → Invite User

| Role      | Email                          | Password         | Notes |
|-----------|-------------------------------|------------------|-------|
| Customer  | customer@test.martinsjohnson.com | MJ_Test2025! | Basic registered user |
| Member    | member@test.martinsjohnson.com   | MJ_Test2025! | Needs club_subscriptions row |
| Affiliate | affiliate@test.martinsjohnson.com| MJ_Test2025! | Needs affiliates row |
| Admin     | admin@test.martinsjohnson.com    | MJ_Admin2025! | Set role='admin' in profiles |

## After Creating Test Users

Run this SQL in Supabase → SQL Editor to set up test data:

```sql
-- Get the user IDs first
select id, email from auth.users where email like '%@test.martinsjohnson.com';

-- Set admin role (replace UUID with actual admin user id)
update profiles set role = 'admin' where id = '<admin-user-id>';

-- Create member subscription (replace UUID with member user id)
insert into club_subscriptions (user_id, customer_email, tier, status, stripe_subscription_id)
values ('<member-user-id>', 'member@test.martinsjohnson.com', 'atelier', 'active', 'sub_demo_atelier_001');

-- Create affiliate record (replace UUID with affiliate user id)
insert into affiliates (user_id, referral_code, referral_link, tier, commission_rate, clicks, conversions, commission_balance, total_earned)
values (
  '<affiliate-user-id>',
  'MJ-AFF-DEMO',
  'https://martinsjohnson.com/shop?ref=MJ-AFF-DEMO',
  'influencer', 15.00, 1247, 38, 214.00, 579.00
);
```

## Environment Variables Required

Add these to Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ycrgxetewmevbnkeuybm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_FOUNDER_PRICE=price_... (£49/mo Stripe Price ID)
NEXT_PUBLIC_STRIPE_ATELIER_PRICE=price_... (£149/mo Stripe Price ID)
NEXT_PUBLIC_STRIPE_MAISON_PRICE=price_... (£395/mo Stripe Price ID)
APPOINTMENTS_EMAIL=appointments@martinsjohnson.com
NEXT_PUBLIC_SITE_URL=https://martinsjohnson.com
```

## Database Setup

Run migrations in order in Supabase SQL Editor:
1. `supabase/schema.sql` — base tables
2. `supabase/migrations/002_missing_tables.sql` — profiles, affiliates, member tables, events

## Routes Built

| Route | Description | Auth Required |
|-------|-------------|---------------|
| /login | Login + Register + Reset | Guest only |
| /account | Member dashboard | Yes |
| /join-the-club | Membership tiers + Stripe checkout | No |
| /affiliates | Affiliate programme page + application form | No |
| /affiliates/dashboard | Real affiliate dashboard | Yes |
| /api/affiliates/apply | POST — save affiliate application to DB | No |
| /api/affiliates/dashboard | GET — load affiliate data | Yes |
| /api/auth/profile | GET/PATCH — user profile | Yes |
| /api/stripe/subscribe | POST — create Stripe subscription session | No |
| /api/stripe/checkout | POST — one-time checkout | No |
| /api/stripe/webhook | POST — Stripe webhook | No |

## What Works Today

- [x] Registration + email confirmation
- [x] Login / logout / password reset
- [x] Session persistence (Supabase cookies)
- [x] Protected /account route
- [x] Protected /affiliates/dashboard route
- [x] Affiliate application saved to database
- [x] Affiliate dashboard loads real data (pending/approved state)
- [x] User profiles auto-created on signup (trigger)
- [x] Member dashboard with orders, wishlist, subscription tabs
- [x] Join The Club page with 3 tiers — Stripe ready (needs Price IDs)

## What Needs Stripe Keys

- Join The Club checkout (Stripe subscription)
- Order checkout (already coded in /api/stripe/checkout)
- Webhook to update club_subscriptions on payment

## Stripe Setup (when ready)

1. Create 3 products in Stripe: Founder (£49), Atelier (£149), Maison (£395)
2. Copy Price IDs into Vercel env vars above
3. Set up webhook at: https://martinsjohnson.com/api/stripe/webhook
4. Listen for: checkout.session.completed, customer.subscription.deleted
