// ═══════════════════════════════════════════
// app/api/products/route.js
// ═══════════════════════════════════════════
// Paste this file content into:  app/api/products/route.js

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const gender   = searchParams.get('gender')
  const filter   = searchParams.get('filter')   // 'new' | 'featured'
  const limit    = parseInt(searchParams.get('limit') || '20')
  const offset   = parseInt(searchParams.get('offset') || '0')
  const slug     = searchParams.get('slug')

  const sb = await createClient()
  let query = sb
    .from('products')
    .select('id,name,slug,price,currency,category,gender,image_urls,is_new_arrival,is_featured,is_bespoke,available,description,tags')
    .eq('available', true)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)
  if (gender)   query = query.eq('gender', gender)
  if (slug)     query = query.eq('slug', slug).single()
  if (filter === 'new')      query = query.eq('is_new_arrival', true)
  if (filter === 'featured') query = query.eq('is_featured', true)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ products: data, total: count })
}

export async function POST(req) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const body = await req.json()
    const slug = body.slug || body.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const badge = body.badge || body.tag || null
    const tags = Array.isArray(body.tags) ? body.tags : []
    const imageUrls = body.image_urls || body.images || []
    const admin = createAdminClient()

    const { data, error } = await admin.from('products').insert({
      name:        body.name,
      slug,
      price:       Number(body.price),
      category:    body.category,
      gender:      body.gender || 'unisex',
      description: body.description || null,
      image_urls:  imageUrls,
      tags,
      is_new_arrival: badge?.toLowerCase() === 'new',
      is_featured:    ['signature', 'bestseller', 'featured'].includes(String(badge || '').toLowerCase()),
      available:   body.available ?? true,
      metadata:    { badge },
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ product: data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
