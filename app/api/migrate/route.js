// ONE-TIME MIGRATION — Delete after use
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'MJ_MIGRATE_002') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const results = []

  async function run(label, fn) {
    try { await fn(); results.push({ label, ok: true }) }
    catch (e) { results.push({ label, ok: false, err: e.message }) }
  }

  // profiles table
  await run('profiles table', () => sb.rpc('exec_sql', { sql:
    `create table if not exists profiles (
      id uuid primary key references auth.users(id) on delete cascade,
      full_name text, phone text, role text default 'customer',
      avatar_url text, created_at timestamptz default now(), updated_at timestamptz default now()
    )`
  }))

  // RLS + trigger omitted from rpc (handled manually)
  // Return instructions
  return NextResponse.json({
    message: 'The exec_sql RPC is not available by default. Please run the SQL manually.',
    sql_file: 'supabase/migrations/002_missing_tables.sql',
    supabase_sql_editor: 'https://supabase.com/dashboard/project/ycrgxetewmevbnkeuybm/sql',
    results,
  })
}
