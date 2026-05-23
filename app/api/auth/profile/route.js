import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle()
  return NextResponse.json({ user, profile })
}

export async function PATCH(req) {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { full_name, phone } = body

  const { data, error } = await sb.from('profiles')
    .upsert({ id: user.id, full_name, phone, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ profile: data })
}
