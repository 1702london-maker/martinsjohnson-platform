import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const {
    type,
    style,
    leather,
    colour,
    size,
    hardware,
    lining,
    initials,
    notes,
    referenceImages,
    customerEmail,
    customerName,
  } = body

  if (!type || !customerEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sb = await createClient()
  const { data, error } = await sb
    .from('bespoke_requests')
    .insert([{
      type,
      style,
      leather,
      colour,
      size,
      hardware,
      lining,
      initials,
      notes,
      reference_images: referenceImages || [],
      customer_email: customerEmail,
      customer_name: customerName,
      status: 'submitted',
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ request: data, message: 'Bespoke request received' })
}
