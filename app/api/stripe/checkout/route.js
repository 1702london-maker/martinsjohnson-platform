// app/api/stripe/checkout/route.js
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const { items, customerEmail, successUrl, cancelUrl } = await request.json()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_URL || request.nextUrl.origin

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'gbp',
      product_data: {
        name:     item.name,
        images:   item.image ? [item.image] : [],
        metadata: { product_id: item.productId, variant: item.variant || '' },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.qty,
  }))

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: customerEmail,
    success_url: successUrl || `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  cancelUrl  || `${siteUrl}/shop`,
    shipping_address_collection: { allowed_countries: ['GB','US','CA','AU','FR','DE','IT','ES','NL','NG','ZA','GH','KE'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'gbp' },
          display_name: 'Free UK Delivery',
          delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 5 } },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1500, currency: 'gbp' },
          display_name: 'Express (1–2 days)',
          delivery_estimate: { minimum: { unit: 'business_day', value: 1 }, maximum: { unit: 'business_day', value: 2 } },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 2500, currency: 'gbp' },
          display_name: 'International',
          delivery_estimate: { minimum: { unit: 'business_day', value: 5 }, maximum: { unit: 'business_day', value: 14 } },
        },
      },
    ],
    metadata: { source: 'martinsjohnson_web' },
  })

  return NextResponse.json({ url: session.url, sessionId: session.id })
}
