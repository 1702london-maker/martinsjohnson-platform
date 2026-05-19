'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useGlobalStore } from '@/lib/store'
import toast from 'react-hot-toast'

const TIERS = [
  {
    id:'founder', name:'Founder', price:49,
    tagline:'The gateway to the world.',
    priceId: process.env.NEXT_PUBLIC_STRIPE_FOUNDER_PRICE,
    perks: [
      'Monthly leather accessory drop',
      'Bracelet or card holder each month',
      'Early access to new collections',
      'Members-only editorial content',
      'Birthday leather gift',
      'Welcome kit — luxury unboxing',
      'Access to member dashboard',
    ],
  },
  {
    id:'atelier', name:'Atelier', price:149, featured:true,
    tagline:'For those who demand more.',
    priceId: process.env.NEXT_PUBLIC_STRIPE_ATELIER_PRICE,
    perks: [
      'Everything in Founder',
      'Curated small leather goods box',
      'Premium watch strap or bracelet',
      'Private colourways — members only',
      '10% off all bespoke orders',
      'Private event invitations',
      'Bespoke priority booking',
      '1702London exclusive early access',
      'Dedicated style advisor',
      'Monthly founder message',
    ],
  },
  {
    id:'maison', name:'Maison', price:395,
    tagline:'The pinnacle of the ecosystem.',
    priceId: process.env.NEXT_PUBLIC_STRIPE_MAISON_PRICE,
    perks: [
      'Everything in Atelier',
      'Annual bespoke commission',
      'First access to all limited editions',
      'Hidden releases — Maison members only',
      'Luxury gifting service',
      'Knife on Leather VIP partnership',
      'Concierge service',
      'Global event invitations',
      'Personalised capsule curation',
    ],
  },
]

const BENEFITS = [
  { icon:'◈', title:'Curated Monthly Products',  desc:'Each tier delivers a curated selection of leather goods, each month. No two boxes alike.' },
  { icon:'◉', title:'Members-Only Drops',        desc:'Products that never appear in the public shop. Private colourways, numbered pieces, hidden releases.' },
  { icon:'◇', title:'Early Access Everything',   desc:'New collections, campaigns, collabs — members see it first. Always.' },
  { icon:'◎', title:'Founder Messages',          desc:'Direct communication from Martins Johnson. Thoughts, decisions, direction. Unfiltered.' },
  { icon:'◈', title:'Event Invitations',         desc:'Private dinners, launch events, craft sessions, campaign previews. Members are our guests.' },
  { icon:'◉', title:'Bespoke Priority',          desc:'Atelier and Maison members receive priority scheduling for all bespoke commissions.' },
]

export default function JoinTheClubPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(null)
  const { formatPrice } = useGlobalStore()

  async function subscribe(tier) {
    if (!email || !email.includes('@')) { toast.error('Please enter a valid email'); return }
    if (!tier.priceId) { toast.error('This membership tier is not configured yet.'); return }
    setLoading(tier.id)
    try {
      const res = await fetch('/api/stripe/subscribe', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ priceId:tier.priceId, customerEmail:email, tier:tier.id }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      if (url) window.location.href = url
    } catch { toast.error('Something went wrong. Please try again.') }
    finally { setLoading(null) }
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>

      {/* Hero */}
      <div className="bg-mj-dk1 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent calc(100%/6 - 1px),rgba(255,255,255,.018) calc(100%/6))' }}/>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="relative z-10">
          <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold block mb-5">Luxury Membership</span>
          <h1 className="font-display font-light text-white/90 leading-[0.92] tracking-tight mb-8"
            style={{ fontSize:'clamp(52px,9vw,110px)' }}>
            Join<br /><em className="italic text-white/35">The Club.</em>
          </h1>
          <p className="text-[15px] text-white/45 font-light max-w-xl leading-relaxed">
            A curated world of monthly leather drops, members-only access, and unparalleled luxury. This is not a subscription. It is a lifestyle.
          </p>
        </motion.div>
      </div>

      {/* Email capture */}
      <div className="px-6 md:px-14 lg:px-20 py-8 border-b border-mj-b1 bg-mj-bg2">
        <div className="flex items-end gap-4 max-w-sm">
          <div className="flex-1">
            <span className="eyebrow mb-2 block">Your email to continue</span>
            <div className="border-b border-mj-b2 focus-within:border-mj-t1 transition-colors">
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent text-mj-t2 text-[14px] py-2.5 outline-none font-light placeholder-mj-t5"/>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1">
        <span className="eyebrow mb-4 block">Member Benefits</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-mj-b1">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className="px-7 py-7 border-b border-r border-mj-b1 last:border-0 hover:bg-mj-bg2 transition-colors">
              <span className="text-[18px] text-mj-t4 block mb-3">{b.icon}</span>
              <p className="text-[13px] font-medium text-mj-t2 mb-1.5">{b.title}</p>
              <p className="text-[11px] text-mj-t4 font-light leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="px-6 md:px-14 lg:px-20 py-16">
        <span className="eyebrow mb-4 block">Choose Your Tier</span>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.id}
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*.1, duration:.7}}
              className={`px-8 py-12 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 relative ${tier.featured?'bg-mj-white':''}`}>
              {tier.featured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-mj-t1"/>}
              {tier.featured && <span className="absolute top-4 right-4 text-[8px] tracking-widest uppercase text-mj-t4 border border-mj-b1 px-2 py-1 font-bold">Most Popular</span>}
              <p className="text-[10px] tracking-[0.24em] uppercase text-mj-t4 mb-1 font-bold">{tier.name}</p>
              <p className="font-display italic text-mj-t5 text-[12px] mb-5">{tier.tagline}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-display text-[38px] font-light text-mj-t1">{formatPrice(tier.price)}</span>
                <span className="text-[11px] text-mj-t5">/month</span>
              </div>
              <ul className="space-y-2.5 mb-10">
                {tier.perks.map(p => (
                  <li key={p} className="flex items-start gap-2.5">
                    <div className="w-3 h-3 border border-mj-b2 rounded-full flex-shrink-0 mt-1 flex items-center justify-center"><div className="w-1 h-1 bg-mj-t4 rounded-full"/></div>
                    <span className="text-[12px] font-light text-mj-t3 leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
              <button onClick={()=>subscribe(tier)} disabled={loading===tier.id}
                className={`w-full py-4 text-[10px] tracking-widest uppercase font-bold transition-all disabled:opacity-50 ${tier.featured?'bg-mj-t1 text-mj-white hover:bg-mj-t2':'border border-mj-b2 text-mj-t3 hover:border-mj-t2 hover:text-mj-t1'}`}>
                {loading===tier.id ? 'Redirecting…' : `Join ${tier.name}`}
              </button>
            </motion.div>
          ))}
        </div>
        <p className="text-[11px] text-mj-t5 text-center mt-6">Cancel anytime · Billed monthly via Stripe · 14-day refund guarantee</p>
      </div>
    </div>
  )
}
