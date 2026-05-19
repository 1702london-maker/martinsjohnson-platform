'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!form.email||!form.name) { toast.error('Name and email required'); return }
    await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email:form.email, source:'contact_form' }) })
    setSent(true)
    toast.success('Message received. We will respond within 1–2 business days.')
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-16">
        <span className="eyebrow mb-4 block">Contact</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1">Get In <em className="italic text-mj-t4">Touch.</em></h1>
        <p className="text-[14px] text-mj-t3 font-light max-w-md mt-4 leading-relaxed">Our concierge team responds to all enquiries within 1–2 business days.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Contact info */}
        <div className="px-6 md:px-14 lg:px-16 py-16 border-b lg:border-b-0 lg:border-r border-mj-b1 bg-mj-bg2">
          <div className="space-y-8 max-w-sm">
            <div>
              <p className="eyebrow mb-3">Location</p>
              <p className="text-[14px] text-mj-t2 font-light">London, United Kingdom</p>
              <p className="text-[13px] text-mj-t4 font-light mt-1">Virtual appointments available worldwide</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Sales & Orders</p>
              <a href="mailto:sales@1702london.com" className="text-[14px] text-mj-t2 hover:text-mj-t1 transition-colors">sales@1702london.com</a>
            </div>
            <div>
              <p className="eyebrow mb-3">Bespoke Enquiries</p>
              <a href="mailto:bespoke@1702london.com" className="text-[14px] text-mj-t2 hover:text-mj-t1 transition-colors">bespoke@1702london.com</a>
            </div>
            <div>
              <p className="eyebrow mb-3">Press & Media</p>
              <a href="mailto:press@martinsjohnson.com" className="text-[14px] text-mj-t2 hover:text-mj-t1 transition-colors">press@martinsjohnson.com</a>
            </div>
            <div>
              <p className="eyebrow mb-3">WhatsApp</p>
              <a href="https://wa.me/447918046999" target="_blank" className="text-[14px] text-mj-t2 hover:text-mj-t1 transition-colors">+44 791 804 6999</a>
            </div>
            <div>
              <p className="eyebrow mb-3">Phone</p>
              <p className="text-[14px] text-mj-t2 font-light">+44 (0) 000 000 0000</p>
              <p className="text-[11px] text-mj-t5 mt-1">Mon–Fri, 9am–6pm GMT</p>
            </div>
            {/* Simple map placeholder */}
            <div className="border border-mj-b1 h-48 bg-mj-card flex items-center justify-center mt-6">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-mj-t2 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-2 h-2 bg-mj-t2 rounded-full"/>
                </div>
                <p className="text-[10px] tracking-widest uppercase text-mj-t4 font-medium">London, UK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 md:px-14 lg:px-16 py-16">
          {sent ? (
            <div className="flex flex-col items-start justify-center h-full">
              <p className="font-display text-[28px] font-light italic text-mj-t1 mb-3">Message Received.</p>
              <p className="text-[14px] text-mj-t4 font-light">We will be in touch within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-6 max-w-lg">
              {[
                {id:'name',    label:'Full Name *',    type:'text',  placeholder:'Your name' },
                {id:'email',   label:'Email Address *',type:'email', placeholder:'your@email.com' },
                {id:'subject', label:'Subject',        type:'text',  placeholder:'How can we help?' },
              ].map(f=>(
                <div key={f.id}>
                  <label className="eyebrow mb-2 block">{f.label}</label>
                  <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                    <input type={f.type} value={form[f.id]} onChange={e=>setForm(p=>({...p,[f.id]:e.target.value}))} placeholder={f.placeholder}
                      className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
                  </div>
                </div>
              ))}
              <div>
                <label className="eyebrow mb-2 block">Message</label>
                <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                  <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} rows={4} placeholder="Tell us how we can help…"
                    className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5 resize-none"/>
                </div>
              </div>
              <button type="submit" className="btn-solid self-start">Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
