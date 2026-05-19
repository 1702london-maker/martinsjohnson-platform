// app/api/bespoke/route.js
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const {
    type, style, leather, colour, size,
    hardware, lining, initials, notes,
    referenceImages, customerEmail, customerName,
  } = body

  if (!type || !customerEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sb = createClient()
  const { data, error } = await sb
    .from('bespoke_requests')
    .insert([{
      type, style, leather, colour, size,
      hardware, lining, initials, notes,
      reference_images:  referenceImages || [],
      customer_email:    customerEmail,
      customer_name:     customerName,
      status:            'submitted',
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ request: data, message: 'Bespoke request received' })
}


// ══════════════════════════════════════════
// app/api/newsletter/route.js
// ══════════════════════════════════════════
export async function newsletter_POST(request) {
  const { email, source } = await request.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const { createClient: create } = await import('@/lib/supabase/server')
  const sb = create()
  const { error } = await sb
    .from('newsletter_subscribers')
    .upsert([{ email, source: source || 'website', subscribed: true }], { onConflict: 'email' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: 'Subscribed successfully' })
}
