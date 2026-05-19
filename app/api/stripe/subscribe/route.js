import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const { priceId, customerEmail, tier } = await request.json()

  if (!priceId || !customerEmail) {
    return NextResponse.json({ error:'Missing required fields' }, { status:400 })
  }

  const existing = await stripe.customers.list({ email: customerEmail, limit:1 })
  const customer = existing.data[0] || await stripe.customers.create({
    email: customerEmail,
    metadata: { tier }
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customer.id,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity:1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/join-the-club/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${process.env.NEXT_PUBLIC_URL}/join-the-club`,
    subscription_data: { metadata: { tier, source:'mj_club' } },
  })

  return NextResponse.json({ url: session.url, sessionId: session.id })
}
