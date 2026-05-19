'use client'
export const dynamic = 'force-dynamic'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

const SERVICES = [
  { n:'01', title:'Low MOQ Production',        desc:'Start small. We work with brands that cannot afford high minimum order quantities. Entry-level production runs from as few as 10 pieces — without sacrificing quality.' },
  { n:'02', title:'Leather Sourcing',           desc:'Access the same premium leather suppliers and tanneries we use for Martins Johnson. Box calf, suede, patent, exotic — at rates that make sense for emerging brands.' },
  { n:'03', title:'Brand Strategy & Identity',  desc:'From naming and logo to tone of voice and brand architecture. We help you build a brand that knows what it is before it knows what to sell.' },
  { n:'04', title:'Tech & E-Commerce Setup',    desc:'Powered by Budruum. Shopify, WooCommerce, or custom Next.js builds. Payment integration, inventory management, and digital infrastructure from day one.' },
  { n:'05', title:'Luxury Packaging',           desc:'Premium boxes, tissue paper, dust bags, ribbon. First impressions matter. We help you deliver an unboxing experience that justifies your price point.' },
  { n:'06', title:'Luxury Positioning',         desc:'Most brands fail because they discount too early and too aggressively. We teach you how to hold your price, protect your value, and build genuine luxury positioning.' },
  { n:'07', title:'Supplier Access',            desc:'We open our supplier network to selected partners. Factories, tanneries, hardware suppliers, packaging houses — relationships that took years to build.' },
  { n:'08', title:'Production Consulting',      desc:'Sample development, quality control, production timelines, shipping logistics. We sit inside the process with you — not just as advisors, but as partners.' },
]

export default function BuildYourBrandPage() {
  const [form, setForm] = useState({ name:'', email:'', brand:'', stage:'', idea:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!form.email || !form.name) { toast.error('Name and email required'); return }
    setLoading(true)
    await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email:form.email, source:'build_your_brand' }) })
    await new Promise(r=>setTimeout(r,600))
    setSent(true)
    setLoading(false)
    toast.success('Application received. We will be in touch.')
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>

      {/* Hero */}
      <div className="border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-24 bg-mj-bg3">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
          <span className="eyebrow mb-6 block">Build Your Brand</span>
          <h1 className="font-display font-light text-mj-t1 leading-[0.92] tracking-tight mb-8" style={{fontSize:'clamp(52px,9vw,110px)'}}>
            Your Dream.<br /><em className="italic text-mj-t4">Our Blueprint.</em>
          </h1>
          <p className="text-[16px] text-mj-t3 font-light max-w-2xl leading-relaxed mb-10">
            Martins Johnson and Budruum help emerging brands go from idea to market with the infrastructure, production access, and strategic guidance that was previously only available to established players. We believe every dream deserves a chance — at an affordable entry point.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#apply" className="btn-solid">Start the Conversation →</a>
            <Link href="/contact" className="btn-outline">Book a Discovery Call</Link>
          </div>
        </motion.div>
      </div>

      {/* Who this is for */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-16">
        <span className="eyebrow mb-5 block">Who This Is For</span>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {[
            { title:'First-Time Founders',    desc:'You have a vision but don\'t know where to begin. We help you start with structure, not chaos.' },
            { title:'Emerging Designers',     desc:'You have the creative. We have the production, sourcing, and logistics to bring it to life at the right quality.' },
            { title:'Brand Builders',         desc:'You are building something with long-term intent. You need infrastructure and strategy, not just suppliers.' },
          ].map(c=>(
            <div key={c.title} className="border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 p-9 hover:bg-mj-bg3 transition-colors">
              <p className="font-display text-[20px] font-normal text-mj-t1 mb-3">{c.title}</p>
              <p className="text-[13px] text-mj-t4 font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1">
        <span className="eyebrow mb-5 block">What We Offer</span>
        <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-mj-t1 mb-14 leading-tight">
          The Full <em className="italic text-mj-t4">Ecosystem.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-mj-b1">
          {SERVICES.map((s,i)=>(
            <div key={s.n} className="border-b border-r border-mj-b1 last:border-0 px-9 py-9 hover:bg-mj-bg2 transition-colors group">
              <div className="flex items-start gap-6">
                <span className="font-display text-[32px] font-light text-mj-b2 flex-shrink-0 leading-none mt-1">{s.n}</span>
                <div>
                  <p className="font-display text-[19px] font-normal text-mj-t1 mb-3 group-hover:text-mj-t2 transition-colors">{s.title}</p>
                  <p className="text-[13px] text-mj-t4 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-mj-dk1 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-20">
        <div className="max-w-4xl">
          <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold block mb-8">Our Philosophy</span>
          <p className="font-display text-[clamp(20px,3vw,38px)] font-light text-white/80 leading-relaxed mb-8">
            "We do not believe that access to luxury infrastructure should be reserved for those who already have money. The next great luxury brand may be in someone's bedroom right now — waiting for the right door to open."
          </p>
          <cite className="text-[10px] tracking-widest uppercase text-white/30 font-bold not-italic">— Martins Johnson</cite>
        </div>
      </div>

      {/* Budruum mention */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1 bg-mj-bg2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow mb-4 block">Powered by Budruum</span>
            <h2 className="font-display text-[clamp(24px,3.5vw,44px)] font-light text-mj-t1 mb-5 leading-tight">
              Technology at the<br /><em className="italic text-mj-t4">Core of Every Brand.</em>
            </h2>
            <p className="text-[14px] text-mj-t3 font-light leading-relaxed mb-6">
              Budruum Limited is the technology partner behind this programme. From e-commerce platforms to inventory systems, from booking infrastructure to mobile apps — Budruum builds the digital backbone that allows your brand to operate at a professional level from day one.
            </p>
            <p className="text-[14px] text-mj-t3 font-light leading-relaxed">
              No expensive agencies. No bloated retainers. Just clean, functional, scalable technology at an accessible price point.
            </p>
          </div>
          <div className="border border-mj-b1 p-8">
            <p className="eyebrow mb-4">What Budruum Builds</p>
            {['E-commerce stores','Booking systems','Inventory management','Mobile apps','Brand websites','Payment integration','Custom dashboards','CRM systems'].map(item=>(
              <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="w-3 h-3 border border-mj-b2 rounded-full flex-shrink-0 flex items-center justify-center"><div className="w-1 h-1 bg-mj-t4 rounded-full"/></div>
                <p className="text-[13px] font-light text-mj-t3">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application */}
      <div id="apply" className="px-6 md:px-14 lg:px-20 py-20">
        <span className="eyebrow mb-4 block">Start the Conversation</span>
        <h2 className="font-display text-[clamp(26px,4vw,48px)] font-light text-mj-t1 mb-12 leading-tight">
          Tell Us About<br /><em className="italic text-mj-t4">Your Vision.</em>
        </h2>
        {sent ? (
          <div className="max-w-lg border border-mj-b1 p-12 text-center">
            <p className="font-display text-[28px] font-light italic text-mj-t1 mb-3">We've Received Your Vision.</p>
            <p className="text-[14px] text-mj-t4 font-light">Our team will be in touch within 3 business days to schedule a discovery conversation.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {[
              { id:'name',  label:'Your Name *',         placeholder:'Martins Johnson' },
              { id:'email', label:'Email Address *',      placeholder:'hello@yourbrand.com' },
              { id:'brand', label:'Brand Name',           placeholder:'If you have one yet' },
              { id:'stage', label:'Current Stage',        placeholder:'Idea / In development / Launching' },
            ].map(f=>(
              <div key={f.id}>
                <label className="eyebrow mb-2 block">{f.label}</label>
                <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                  <input value={form[f.id]} onChange={e=>setForm(p=>({...p,[f.id]:e.target.value}))} placeholder={f.placeholder}
                    className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
                </div>
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="eyebrow mb-2 block">Tell us about your idea</label>
              <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                <textarea value={form.idea} onChange={e=>setForm(p=>({...p,idea:e.target.value}))} rows={4} placeholder="What are you building? Who is it for? Why does the world need it?"
                  className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5 resize-none"/>
              </div>
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="btn-solid disabled:opacity-50">
                {loading ? 'Sending…' : 'Send Your Vision →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
