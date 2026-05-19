import { NextResponse } from 'next/server'
import { createClient }  from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req) {
  try {
    const { email, source } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    let saved = false

    try {
      const supabase = createAdminClient()
      const { error } = await supabase.from('newsletter_subscribers').upsert(
        { email, source: source || 'website', subscribed_at: new Date().toISOString() },
        { onConflict: 'email' }
      )
      if (!error) saved = true
    } catch (_) {
      try {
        const supabase = await createClient()
        const { error } = await supabase.from('newsletter_subscribers').insert(
          { email, source: source || 'website', subscribed_at: new Date().toISOString() }
        )
        if (!error || error.code === '23505') saved = true
      } catch (_) {}
    }

    // Welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Martins Johnson <journal@martinsjohnson.com>',
            to: email,
            subject: 'Welcome to the Journal',
            html: `
              <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1A1A18">
                <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8A8A87;margin-bottom:24px">Martins Johnson · The Journal</p>
                <h1 style="font-size:30px;font-weight:400;margin-bottom:16px;line-height:1.2">Welcome.</h1>
                <p style="color:#5A5A58;line-height:1.9;margin-bottom:24px">You'll receive a new essay monthly — on craft, materials, heritage, and the philosophy of lasting things. Nothing else.</p>
                <p style="color:#5A5A58;line-height:1.9;">If you ever want to unsubscribe, reply to any email and we'll remove you within 24 hours.</p>
                <p style="margin-top:48px;font-size:12px;color:#AEAEAD">Martins Johnson · London</p>
              </div>`,
          }),
        })
      } catch (_) {}
    }

    return NextResponse.json({ success: true, saved })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
