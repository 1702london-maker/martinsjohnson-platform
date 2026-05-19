'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

const TIERS = [
  { id:'creator',    name:'Creator',    commission:'12%', followers:'5K+',    desc:'Content creators, bloggers and digital voices with an engaged luxury audience.' },
  { id:'influencer', name:'Influencer', commission:'15%', followers:'50K+',   desc:'Established influencers in fashion, lifestyle or luxury with proven campaign performance.' },
  { id:'ambassador', name:'Ambassador', commission:'20%', followers:'200K+',  desc:'Premium brand ambassadors representing Martins Johnson across global markets.' },
  { id:'partner',    name:'Brand Partner',commission:'25%',followers:'Brands', desc:'Luxury retailers, publications and lifestyle brands seeking a formal commercial partnership.' },
]

const BENEFITS = [
  { icon:'◈', title:'Commission on Every Sale',     desc:'Earn on every purchase made through your unique link. Tracked in real-time.' },
  { icon:'◉', title:'Campaign Assets',              desc:'Exclusive photography, video content and campaign materials for your audience.' },
  { icon:'◇', title:'Early Product Access',         desc:'Receive new drops and bespoke pieces before public launch.' },
  { icon:'◎', title:'Custom Affiliate Dashboard',   desc:'Real-time analytics, referral links, payout history and performance data.' },
  { icon:'◈', title:'Co-Creation Opportunities',   desc:'Collaborate directly on limited campaigns, capsule drops and editorial features.' },
  { icon:'◉', title:'Monthly Payouts',             desc:'Payments processed monthly via bank transfer or Stripe. No minimum threshold.' },
]

export default function AffiliatesPage() {
  const [form, setForm] = useState({ name:'', email:'', platform:'', handle:'', followers:'', tier:'creator', why:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.email) { toast.error('Name and email required'); return }
    setLoading(true)
    await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: form.email, source: `affiliate_application_${form.tier}` }) })
    await new Promise(r => setTimeout(r, 600))
    setSent(true)
    setLoading(false)
    toast.success('Application received. Our team will be in touch.')
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>

      {/* Hero */}
      <div className="bg-mj-dk1 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent calc(100%/6 - 1px),rgba(255,255,255,.015) calc(100%/6))'}}/>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="relative z-10">
          <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold block mb-5">Creator & Affiliate Programme</span>
          <h1 className="font-display font-light text-white/90 leading-[0.92] tracking-tight mb-8" style={{fontSize:'clamp(52px,9vw,110px)'}}>
            Build With<br /><em className="italic text-white/30">Us.</em>
          </h1>
          <p className="text-[15px] text-white/45 font-light max-w-xl leading-relaxed mb-10">
            Partner with one of the most deliberate luxury brands being built right now. Create, earn, and grow alongside a movement that is redefining what luxury means.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="#apply" className="btn-solid">Apply Now →</a>
            <Link href="/affiliates/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/50 text-[10px] tracking-[0.22em] uppercase font-medium hover:border-white/40 hover:text-white/80 transition-all">Affiliate Login →</Link>
          </div>
        </motion.div>
      </div>

      {/* How it works */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1 bg-mj-bg2">
        <span className="eyebrow mb-4 block">How It Works</span>
        <div className="grid grid-cols-1 md:grid-cols-4 border border-mj-b1">
          {[
            { n:'01', t:'Apply',     d:'Submit your application. We review within 48 hours.' },
            { n:'02', t:'Connect',   d:'Get your unique affiliate link and campaign assets.' },
            { n:'03', t:'Create',    d:'Share authentically with your audience.' },
            { n:'04', t:'Earn',      d:'Commission paid monthly on every confirmed sale.' },
          ].map((s,i)=>(
            <div key={s.n} className="border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 px-8 py-8 hover:bg-mj-bg3 transition-colors">
              <span className="font-display text-[36px] font-light text-mj-b2 block mb-5">{s.n}</span>
              <p className="font-display text-[17px] font-normal text-mj-t1 mb-2">{s.t}</p>
              <p className="text-[12px] text-mj-t4 font-light leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1">
        <span className="eyebrow mb-4 block">Partner Benefits</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-mj-b1">
          {BENEFITS.map((b,i)=>(
            <div key={b.title} className="px-7 py-7 border-b border-r border-mj-b1 last:border-0 hover:bg-mj-bg2 transition-colors">
              <span className="text-[18px] text-mj-t4 block mb-3">{b.icon}</span>
              <p className="text-[13px] font-medium text-mj-t2 mb-1.5">{b.title}</p>
              <p className="text-[11px] text-mj-t4 font-light leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1 bg-mj-bg2">
        <span className="eyebrow mb-4 block">Commission Tiers</span>
        <h2 className="font-display text-[clamp(26px,4vw,48px)] font-light text-mj-t1 mb-12">
          Your Tier, <em className="italic text-mj-t4">Your Earning.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 border border-mj-b1">
          {TIERS.map((tier,i)=>(
            <div key={tier.id} className="border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 p-8 hover:bg-mj-bg3 transition-colors">
              <p className="eyebrow mb-3">{tier.name}</p>
              <p className="font-display text-[42px] font-light text-mj-t1 leading-none mb-1">{tier.commission}</p>
              <p className="text-[10px] tracking-widest uppercase text-mj-t5 mb-5 font-medium">Commission · {tier.followers}</p>
              <p className="text-[12px] text-mj-t4 font-light leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application form */}
      <div id="apply" className="px-6 md:px-14 lg:px-20 py-16">
        <span className="eyebrow mb-4 block">Become an Affiliate</span>
        <h2 className="font-display text-[clamp(26px,4vw,48px)] font-light text-mj-t1 mb-12">
          Apply to the <em className="italic text-mj-t4">Programme.</em>
        </h2>

        {sent ? (
          <div className="max-w-lg border border-mj-b1 p-12 text-center">
            <p className="font-display text-[28px] font-light italic text-mj-t1 mb-3">Application Received.</p>
            <p className="text-[14px] text-mj-t4 font-light">Our team reviews all applications within 48 hours. We will be in touch at the email you provided.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {[
              { id:'name',     label:'Full Name *',          type:'text',  placeholder:'Martins Johnson' },
              { id:'email',    label:'Email Address *',      type:'email', placeholder:'hello@example.com' },
              { id:'platform', label:'Primary Platform',     type:'text',  placeholder:'Instagram, YouTube, TikTok…' },
              { id:'handle',   label:'Handle / Profile URL', type:'text',  placeholder:'@handle or URL' },
              { id:'followers',label:'Audience Size',        type:'text',  placeholder:'e.g. 50,000' },
            ].map(f=>(
              <div key={f.id}>
                <label className="eyebrow mb-2 block">{f.label}</label>
                <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                  <input type={f.type} value={form[f.id]} onChange={e=>setForm(p=>({...p,[f.id]:e.target.value}))}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
                </div>
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="eyebrow mb-2 block">Tier You Are Applying For</label>
              <div className="flex gap-2 flex-wrap">
                {TIERS.map(t=>(
                  <button key={t.id} type="button" onClick={()=>setForm(p=>({...p,tier:t.id}))}
                    className={`px-4 py-2 border text-[10px] tracking-widest uppercase font-medium transition-all ${form.tier===t.id?'border-mj-t1 bg-mj-t1 text-mj-white':'border-mj-b1 text-mj-t4 hover:border-mj-b2'}`}>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="eyebrow mb-2 block">Why do you want to partner with us?</label>
              <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                <textarea value={form.why} onChange={e=>setForm(p=>({...p,why:e.target.value}))} rows={3}
                  placeholder="Tell us about your audience and why this partnership makes sense…"
                  className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5 resize-none"/>
              </div>
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="btn-solid disabled:opacity-50">
                {loading ? 'Submitting…' : 'Submit Application →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
