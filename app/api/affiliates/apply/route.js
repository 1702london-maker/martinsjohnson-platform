import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { full_name, email, phone, platform, handle, audience_size, tier, location, reason, why } = body

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()

    // Save application to DB
    const { data, error } = await sb.from('affiliate_applications').insert({
      user_id:       user?.id || null,
      full_name,
      email,
      phone:         phone || null,
      platform:      platform || null,
      handle:        handle || null,
      social_links:  platform && handle ? { [platform]: handle } : {},
      audience_size: audience_size || null,
      tier:          tier || 'creator',
      location:      location || null,
      reason:        reason || why || null,
      status:        'pending',
    }).select().single()

    if (error) {
      // If table doesn't exist yet, fall back gracefully
      console.error('Affiliate application error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Also save email to newsletter
    await sb.from('newsletter_subscribers')
      .upsert({ email, source: `affiliate_application_${tier || 'creator'}` }, { onConflict: 'email' })

    return NextResponse.json({ success: true, id: data.id })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
