import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Get affiliate record
    const { data: affiliate, error: affErr } = await sb
      .from('affiliates')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (affErr) return NextResponse.json({ error: affErr.message }, { status: 500 })

    // Get application status
    const { data: application } = await sb
      .from('affiliate_applications')
      .select('status, tier, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Get click data
    const { data: clicks } = affiliate
      ? await sb.from('affiliate_clicks').select('*').eq('affiliate_id', affiliate.id)
      : { data: [] }

    return NextResponse.json({
      affiliate,
      application,
      clicks: clicks || [],
      user: { email: user.email, id: user.id },
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
