# Martins Johnson — Luxury Brand Platform

Next.js 14 custom platform. Built to lead to a mobile app.

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env.local
# Fill in your Supabase + Stripe keys

# 3. Database
# Open Supabase Dashboard → SQL Editor
# Paste and run: supabase/schema.sql

# 4. Storage
# Supabase Dashboard → Storage → New bucket
# Name: product-images · Public: YES

# 5. Stripe
# Create 3 recurring prices in Stripe Dashboard:
#   Founder  £49/month
#   Atelier  £149/month
#   Maison   £395/month
# Copy Price IDs → .env.local

# 6. Run
npm run dev  →  http://localhost:3000
```

---

## Adding Product Images

1. Go to **Supabase Dashboard → Storage → product-images**
2. Upload your JPG/PNG/WebP photos
3. Copy the public URL
4. Go to **Supabase → Table Editor → products**
5. Find your product row → edit `image_urls` column
6. Add the URL as an array item: `["https://xxx.supabase.co/storage/v1/object/public/product-images/your-photo.jpg"]`

Multiple images per product: add more URLs to the array. The product modal shows them as thumbnails.

**The SVG sketches are automatically replaced** when `image_urls` has content.

---

## Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Framework    | Next.js 14 App Router         |
| Styling      | Tailwind CSS (off-white grey) |
| Animations   | Framer Motion + GSAP + Lenis  |
| Database     | Supabase (PostgreSQL)         |
| Auth         | Supabase Auth                 |
| Storage      | Supabase Storage              |
| Payments     | Stripe (one-time + recurring) |
| State        | Zustand                       |
| Forms        | React Hook Form + Zod         |

---

## Key Pages

| Route                     | Description                        |
|---------------------------|------------------------------------|
| `/`                       | Homepage — all sections            |
| `/shop`                   | Full catalogue with filters        |
| `/shoes`                  | Shoe collection                    |
| `/bags`                   | Bags & leather goods               |
| `/watches`                | 1702 Watches                       |
| `/bespoke`                | Bespoke hub                        |
| `/bespoke/shoes`          | Shoe configurator                  |
| `/bespoke/bags`           | Bag configurator                   |
| `/join-the-club`          | Subscription tiers (Stripe)        |
| `/book`                   | Appointment booking                |
| `/knife-on-leather`       | Campaign page                      |
| `/journal`                | Editorial blog                     |
| `/login`                  | Auth                               |
| `/account`                | Customer dashboard                 |

---

## Product Customisation

Every product page has a configuration panel:

- **Colours** — 8 leather/material swatches
- **UK Sizes** — 5 to 12 (inc. half sizes)
- **Lace Colour** — shown only for laced styles (Oxford, Derby, Sneaker)
- **Sole Type** — Leather / Dainite +£80 / Commando +£120 / Rubber +£40
- **Initials** — 3 separate input boxes, max 1 char each · +£75 when filled · gold embossed
- **Live price** — updates instantly as options change

---

## Colour Palette

Off-white / light grey throughout. No black, no gold, no beige.

```
mj-bg:    #F3F1EC  ← main background
mj-bg2:   #EBEBEA  ← alternate sections
mj-bg3:   #F9F8F6  ← cards / light surface
mj-t1:    #1A1A18  ← headlines / primary text
mj-t3:    #5A5A58  ← body text
mj-t4:    #8A8A87  ← muted / eyebrow
mj-dk1:   #181A1C  ← dark sections (KOL, footer)
```

---

## API → Mobile App

All API routes are REST-ready:

```
GET  /api/products?category=oxford&gender=men&limit=20
POST /api/stripe/checkout     — one-time purchase
POST /api/stripe/subscribe    — club membership
POST /api/appointments        — book appointment
POST /api/bespoke             — bespoke request
POST /api/newsletter          — subscribe
```

For the mobile app: authenticate via Supabase JWT, call the same endpoints. Cart state syncs via user_id once logged in.

---

## Deployment

```bash
# Vercel (recommended — zero config)
vercel deploy

# Set environment variables in Vercel Dashboard
# Add Stripe webhook: https://martinsjohnson.com/api/stripe/webhook
```

---

*Martins Johnson — Crafting Legacy Through Luxury.*
