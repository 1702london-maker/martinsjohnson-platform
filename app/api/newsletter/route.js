// app/api/newsletter/route.js
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, source } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const sb = createClient()
  const { error } = await sb
    .from('newsletter_subscribers')
    .upsert(
      [{ email: email.toLowerCase().trim(), source: source || 'website', subscribed: true, subscribed_at: new Date().toISOString() }],
      { onConflict: 'email' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: 'Subscribed' })
}
