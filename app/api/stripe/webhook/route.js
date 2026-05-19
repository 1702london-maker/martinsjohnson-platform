import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function sendOrderEmail(session) {
  if (!process.env.RESEND_API_KEY) return
  const customer = session.customer_details
  const items = session.line_items?.data || []
  const total = (session.amount_total / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })

  const itemsHtml = items.map(i =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #E8E6E1;color:#1A1A18">${i.description}</td>
      <td style="padding:10px 0;border-bottom:1px solid #E8E6E1;color:#8A8A87;text-align:center">${i.quantity}</td>
      <td style="padding:10px 0;border-bottom:1px solid #E8E6E1;color:#1A1A18;text-align:right">£${(i.amount_total/100).toLocaleString()}</td>
    </tr>`
  ).join('')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Martins Johnson <orders@martinsjohnson.com>',
      to: customer?.email,
      bcc: process.env.ORDERS_EMAIL || 'orders@martinsjohnson.com',
      subject: `Order Confirmed — ${session.metadata?.orderNumber || session.id.slice(-8).toUpperCase()}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1A1A18">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8A8A87;margin-bottom:24px">Martins Johnson</p>
          <h1 style="font-size:26px;font-weight:400;margin-bottom:8px">Order Confirmed.</h1>
          <p style="color:#5A5A58;line-height:1.8;margin-bottom:32px">Thank you, ${customer?.name?.split(' ')[0] || 'there'}. Your order is now being prepared. We will be in touch with production and shipping updates.</p>
          <table style="width:100%;border-top:1px solid #E8E6E1;margin-bottom:24px">
            <thead><tr>
              <th style="padding:10px 0;text-align:left;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8A8A87;font-weight:400">Item</th>
              <th style="padding:10px 0;text-align:center;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8A8A87;font-weight:400">Qty</th>
              <th style="padding:10px 0;text-align:right;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8A8A87;font-weight:400">Price</th>
            </tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="text-align:right;padding-top:12px;border-top:2px solid #1A1A18">
            <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A87;margin-right:16px">Total</span>
            <span style="font-size:20px;font-weight:400">${total}</span>
          </div>
          <p style="margin-top:48px;font-size:12px;color:#AEAEAD;line-height:1.7">Martins Johnson · London, United Kingdom<br>For questions: orders@martinsjohnson.com</p>
        </div>`,
    }),
  }).catch(() => {})
}

export async function POST(req) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Expand line items
    const expanded = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    })

    // Save order to Supabase
    try {
      const supabase = await createClient()
      await supabase.from('orders').insert({
        stripe_session_id: session.id,
        customer_email:    session.customer_details?.email,
        customer_name:     session.customer_details?.name,
        amount_total:      session.amount_total,
        currency:          session.currency,
        status:            'confirmed',
        metadata:          session.metadata,
      })
    } catch (_) {}

    // Send confirmation email
    await sendOrderEmail(expanded)
  }

  if (event.type === 'customer.subscription.created') {
    // Club membership activated
    const sub = event.data.object
    try {
      const supabase = await createClient()
      await supabase.from('subscriptions').upsert({
        stripe_subscription_id: sub.id,
        stripe_customer_id:     sub.customer,
        status:                 sub.status,
        plan:                   sub.metadata?.plan || 'monthly',
        current_period_end:     new Date(sub.current_period_end * 1000).toISOString(),
      }, { onConflict: 'stripe_subscription_id' })
    } catch (_) {}
  }

  return NextResponse.json({ received: true })
}
