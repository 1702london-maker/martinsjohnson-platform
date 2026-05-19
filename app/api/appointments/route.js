// app/api/appointments/route.js
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { type, date, time, name, email, phone, notes } = body

  if (!type || !date || !time || !email || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sb = createClient()

  // Check availability (no double-booking)
  const { data: existing } = await sb
    .from('appointments')
    .select('id')
    .eq('appointment_date', date)
    .eq('appointment_time', time)
    .eq('status', 'confirmed')
    .single()

  if (existing) {
    return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 409 })
  }

  const { data, error } = await sb
    .from('appointments')
    .insert([{
      type,
      appointment_date: date,
      appointment_time: time,
      customer_name:    name,
      customer_email:   email,
      customer_phone:   phone || null,
      notes:            notes || null,
      status:           'confirmed',
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // TODO: Send confirmation email via Nodemailer

  return NextResponse.json({ appointment: data, message: 'Appointment confirmed' })
}

export async function GET(request) {
  // For admin — list upcoming appointments
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  const sb = createClient()
  let query = sb
    .from('appointments')
    .select('id, type, appointment_date, appointment_time, customer_name, status')
    .eq('status', 'confirmed')
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true })

  if (date) query = query.eq('appointment_date', date)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ appointments: data })
}
