import { NextResponse } from 'next/server'
import { createClient }  from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const config = { api: { bodyParser: false } }

export async function POST(req) {
  try {
    const supabase = await createClient()

    // Verify auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const formData = await req.formData()
    const file     = formData.get('file')
    const folder   = formData.get('folder') || 'products'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const ext      = file.name.split('.').pop()
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const buffer   = Buffer.from(await file.arrayBuffer())

    const admin = createAdminClient()
    const { data, error } = await admin.storage
      .from('product-images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: { publicUrl } } = admin.storage
      .from('product-images')
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl, path: data.path })
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
