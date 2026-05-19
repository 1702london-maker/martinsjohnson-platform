import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  const stripe    = new Stripe(process.env.STRIPE_SECRET_KEY)
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')

  // Only validate signature in production
  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Init Supabase inside handler — requires env vars at runtime, not build time
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object
        if (session.mode !== 'payment') break
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ['data.price.product'] })
        await sb.from('orders').insert([{
          customer_email:    session.customer_details?.email,
          customer_name:     session.customer_details?.name,
          stripe_session_id: session.id,
          subtotal:          session.amount_subtotal / 100,
          shipping:          (session.shipping_cost?.amount_total || 0) / 100,
          total:             session.amount_total / 100,
          currency:          session.currency?.toUpperCase() || 'GBP',
          status:            'confirmed',
          shipping_address:  session.shipping_details?.address || null,
          items: lineItems.data.map(li => ({
            name:  li.description,
            qty:   li.quantity,
            price: li.amount_total / 100,
          })),
        }])
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub      = event.data.object
        const customer = await stripe.customers.retrieve(sub.customer)
        await sb.from('club_subscriptions').upsert([{
          stripe_subscription_id: sub.id,
          stripe_customer_id:     sub.customer,
          customer_email:         customer.email,
          tier:                   sub.metadata?.tier || 'founder',
          status:                 sub.status,
          current_period_end:     new Date(sub.current_period_end * 1000).toISOString(),
        }], { onConflict: 'stripe_subscription_id' })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object
        await sb.from('club_subscriptions')
          .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
