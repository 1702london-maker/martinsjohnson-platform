import { NextResponse } from 'next/server'
import { createClient }  from '@/lib/supabase/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, phone, date, time, type, message, notes } = body

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Name, email, date, and time are required' }, { status: 400 })
    }

    // Save to Supabase
    let saved = false
    try {
      const supabase = createClient()
      const { error } = await supabase.from('appointments').insert({
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        appointment_date: date,
        appointment_time: time,
        type: type || 'general',
        notes: notes || message || null,
        status: 'confirmed',
      })
      if (!error) saved = true
    } catch (_) {}

    // Send confirmation email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Martins Johnson <appointments@martinsjohnson.com>',
            to: email,
            bcc: process.env.APPOINTMENTS_EMAIL || 'studio@martinsjohnson.com',
            subject: `Appointment Request — ${name}`,
            html: `
              <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1A1A18">
                <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8A8A87;margin-bottom:24px">Martins Johnson</p>
                <h1 style="font-size:28px;font-weight:400;margin-bottom:8px;line-height:1.2">Your appointment request has been received.</h1>
                <p style="color:#5A5A58;line-height:1.8;margin-bottom:32px">Thank you, ${name}. We will confirm your appointment within 24 hours.</p>
                <table style="width:100%;border-top:1px solid #E8E6E1;padding-top:24px">
                  <tr><td style="padding:8px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A87;width:140px">Type</td><td style="color:#1A1A18">${type}</td></tr>
                  ${date ? `<tr><td style="padding:8px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A87">Preferred Date</td><td style="color:#1A1A18">${date}</td></tr>` : ''}
                  ${phone ? `<tr><td style="padding:8px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A87">Phone</td><td style="color:#1A1A18">${phone}</td></tr>` : ''}
                  ${time ? `<tr><td style="padding:8px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A87">Time</td><td style="color:#1A1A18">${time} GMT</td></tr>` : ''}
                  ${notes || message ? `<tr><td style="padding:8px 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8A87;vertical-align:top">Notes</td><td style="color:#5A5A58;line-height:1.7">${notes || message}</td></tr>` : ''}
                </table>
                <p style="margin-top:40px;font-size:12px;color:#AEAEAD;line-height:1.7">Martins Johnson · London, United Kingdom<br>studio@martinsjohnson.com</p>
              </div>`,
          }),
        })
      } catch (_) {}
    }

    return NextResponse.json({ success: true, saved })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
