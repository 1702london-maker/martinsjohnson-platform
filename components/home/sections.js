// ═══════════════════════════════════════
// components/home/BespokeSection.jsx
// ═══════════════════════════════════════
'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CATEGORY_IMAGES } from '@/lib/utils'

export function BespokeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    { n: '01', t: 'Choose Style',    d: 'Oxford, Derby, Chelsea, Loafer or custom last' },
    { n: '02', t: 'Select Leather',  d: 'Box calf, suede, patent or exotic skins' },
    { n: '03', t: 'Personalise',     d: 'Initials · lining · hardware finish' },
    { n: '04', t: 'Crafted for You', d: '8–10 weeks · signature delivery box' },
  ]

  return (
    <section id="bespoke" ref={ref} className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg3 border-t border-mj-b1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.span className="eyebrow mb-3 block" initial={{ opacity:0, y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.7 }}>The Atelier</motion.span>
          <motion.h2 className="font-display text-display-sm font-normal text-mj-t1 mb-5 leading-tight" initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.1, duration:.8 }}>
            Your Vision.<br /><em className="italic text-mj-t4">Our Craft.</em>
          </motion.h2>
          <motion.p className="text-[14px] text-mj-t3 leading-relaxed mb-8 max-w-[400px] font-light" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.2, duration:.7 }}>
            Commission a truly bespoke piece — every last, every leather, every stitch configured to your exact specification. Crafted by hand over 8–10 weeks.
          </motion.p>
          <motion.div className="flex gap-3 flex-wrap mb-10" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.3, duration:.6 }}>
            <Link href="/bespoke/shoes" className="btn-solid text-[10px]">Bespoke Shoes</Link>
            <Link href="/bespoke/bags"  className="btn-outline text-[10px]">Bespoke Bags</Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-px bg-mj-b1">
            {steps.map((s, i) => (
              <motion.div key={s.n} className="bg-mj-bg3 p-5 hover:bg-mj-bg2 transition-colors" initial={{ opacity:0, y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.1+i*.08, duration:.6 }}>
                <span className="font-display text-[11px] text-mj-t5 mb-3 block font-light">{s.n}</span>
                <p className="text-[13px] font-medium text-mj-t2 mb-1">{s.t}</p>
                <p className="text-[11px] text-mj-t4 leading-relaxed font-light">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="bg-mj-white border border-mj-b1 overflow-hidden" style={{ aspectRatio:'4/5' }} initial={{ opacity:0, scale:.98 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:.2, duration:1 }}>
          <img src={CATEGORY_IMAGES.bespoke} alt="Bespoke Atelier" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1200ms] ease-lux"
            onError={e => { e.target.parentElement.style.background='#E8E6E1'; e.target.style.display='none' }} />
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// components/home/JoinTheClub.jsx
// ═══════════════════════════════════════
import Link2 from 'next/link'

const TIERS = [
  { id:'founder', name:'Founder', price:49, perks:['Monthly leather accessory drop','Bracelet or card holder monthly','Early collection access','Members-only editorial','Birthday leather gift'], cta:'Join Founder', featured:false },
  { id:'atelier', name:'Atelier', price:149, perks:['Everything in Founder','Curated leather goods box','Premium watch strap or bracelet','10% off all bespoke orders','Private event invitations','1702London exclusive drops'], cta:'Join Atelier', featured:true },
  { id:'maison',  name:'Maison',  price:395, perks:['Everything in Atelier','Annual bespoke commission','First access to limited editions','Knife on Leather VIP','Concierge service'], cta:'Join Maison', featured:false },
]

export function JoinTheClub() {
  return (
    <section id="club" className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg2 border-t border-mj-b1">
      <div className="mb-12">
        <span className="eyebrow mb-3">Membership</span>
        <h2 className="font-display text-display-sm font-normal text-mj-t1">Join <em className="italic text-mj-t4">The Club</em></h2>
        <p className="text-[14px] text-mj-t3 max-w-lg mt-3 font-light leading-relaxed">Monthly leather drops, exclusive access and unparalleled luxury. Three tiers — one world.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-mj-b1">
        {TIERS.map((tier, i) => (
          <div key={tier.id} className={`px-8 py-10 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 relative ${tier.featured ? 'bg-mj-white' : 'bg-mj-bg2'}`}>
            {tier.featured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-mj-t1" />}
            {tier.featured && <span className="absolute top-4 right-4 text-[8px] tracking-widest uppercase text-mj-t4 border border-mj-b1 px-2 py-1 font-bold">Popular</span>}
            <p className="text-[10px] tracking-[0.22em] uppercase text-mj-t4 mb-2 font-bold">{tier.name}</p>
            <p className="font-display text-[38px] font-light text-mj-t1 mb-6">£{tier.price}<span className="text-[11px] text-mj-t5 ml-1">/mo</span></p>
            <ul className="space-y-2.5 mb-8">
              {tier.perks.map(p => (
                <li key={p} className="flex items-start gap-2.5">
                  <div className="w-3 h-3 border border-mj-b2 rounded-full flex-shrink-0 mt-1 flex items-center justify-center"><div className="w-1 h-1 bg-mj-t4 rounded-full" /></div>
                  <span className="text-[12px] font-light text-mj-t3 leading-snug">{p}</span>
                </li>
              ))}
            </ul>
            <Link2 href={`/join-the-club?tier=${tier.id}`} className={`block w-full py-3.5 text-center text-[10px] tracking-widest uppercase font-bold transition-all ${tier.featured ? 'bg-mj-t1 text-mj-white hover:bg-mj-t2' : 'border border-mj-b2 text-mj-t3 hover:border-mj-t2 hover:text-mj-t1'}`}>
              {tier.cta}
            </Link2>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-mj-t5 text-center mt-5">Cancel anytime · Billed monthly via Stripe · Secure checkout</p>
    </section>
  )
}

// ═══════════════════════════════════════
// components/home/WatchesSection.jsx
// ═══════════════════════════════════════
export function WatchesSection({ products = [] }) {
  const items = [
    { name:'1702London Timepiece I',   cat:'Watch',    price:2800, img:null },
    { name:'Python Strap Bracelet',    cat:'Bracelet', price:480,  img:null },
    { name:'Croc Watch Strap',         cat:'Strap',    price:380,  img:null },
    { name:'Box Calf Woven Bracelet',  cat:'Bracelet', price:290,  img:null },
  ]
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg3 border-t border-mj-b1">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="eyebrow mb-3">Timepieces & Bracelets</span>
          <h2 className="font-display text-display-sm font-normal text-mj-t1">Wrist <em className="italic text-mj-t4">Essentials</em></h2>
        </div>
        <Link2 href="/watches" className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-light hidden md:flex">
          <span className="w-5 h-px bg-mj-b2" />View all
        </Link2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.08, duration:.6 }} className="group cursor-pointer">
            <div className="bg-mj-card border border-mj-b1 overflow-hidden mb-3 aspect-square flex items-center justify-center group-hover:border-mj-b2 transition-all duration-500">
              {item.img ? <img src={item.img} alt={item.name} className="w-full h-full object-contain p-4" /> : (
                <svg width="36" height="36" fill="none" stroke="#C2C0BB" strokeWidth="0.75" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="7"/>
                  <polyline points="12 9 12 12 13.5 13.5"/>
                  <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
                </svg>
              )}
            </div>
            <p className="eyebrow mb-1">{item.cat}</p>
            <p className="text-[12px] font-normal text-mj-t3 group-hover:text-mj-t1 transition-colors leading-snug">{item.name}</p>
            <p className="text-[11px] text-mj-t4 mt-0.5">£{item.price.toLocaleString('en-GB')}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// components/home/FounderSection.jsx
// ═══════════════════════════════════════
export function FounderSection() {
  return (
    <section id="founder" className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg2 border-t border-mj-b1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="bg-mj-white border border-mj-b1 overflow-hidden flex items-center justify-center" style={{ aspectRatio:'4/5' }}>
          <p className="font-display text-[clamp(80px,18vw,180px)] font-light text-mj-card leading-none select-none tracking-tighter">MJ</p>
        </div>
        <div>
          <span className="eyebrow mb-4 block">The Founder</span>
          <h2 className="font-display text-display-sm font-normal text-mj-t1 mb-6 leading-tight">
            One Vision.<br /><em className="italic text-mj-t4">Infinite Impact.</em>
          </h2>
          <blockquote className="border-l-2 border-mj-b2 pl-6 mb-6">
            <p className="font-display text-[clamp(16px,2vw,22px)] italic font-light text-mj-t3 leading-relaxed">
              "True luxury is never about the price. It is about the story, the craft, and the legacy you leave behind."
            </p>
          </blockquote>
          <p className="text-[14px] text-mj-t3 leading-relaxed mb-8 font-light">
            Martins Johnson — luxury creative director, leatherpreneur, strategist, philanthropist and cultural innovator. Building brands, campaigns and communities that endure at the intersection of African heritage and global luxury.
          </p>
          <Link2 href="/#vision" className="btn-outline">The Full Vision →</Link2>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// components/home/JournalSection.jsx
// ═══════════════════════════════════════
export function JournalSection() {
  const articles = [
    { slug:'african-craftsmanship', cat:'Culture', title:'Why African Craftsmanship Is the Future of Luxury', date:'June 2025', read:'12 min', bg:'bg-mj-card2' },
    { slug:'knife-on-leather',      cat:'Campaign', title:'The First Cut: On Knife on Leather and the Power of Creative Precision', date:'May 2025', read:'8 min', bg:'bg-mj-card' },
    { slug:'bespoke-commission',    cat:'Atelier', title:'What It Truly Means to Commission a Bespoke Shoe', date:'Apr 2025', read:'6 min', bg:'bg-mj-bg2' },
  ]
  return (
    <section id="journal" className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg3 border-t border-mj-b1">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="eyebrow mb-3">The Journal</span>
          <h2 className="font-display text-display-sm font-normal text-mj-t1">Ideas Worth <em className="italic text-mj-t4">Reading</em></h2>
        </div>
        <Link2 href="/journal" className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-light hidden md:flex">
          <span className="w-5 h-px bg-mj-b2" />All articles
        </Link2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
        {articles.map((a, i) => (
          <Link2 key={a.slug} href={`/journal/${a.slug}`} className={`block p-7 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 group hover:bg-mj-bg2 transition-colors duration-300`}>
            <div className={`${a.bg} h-40 mb-5 transition-transform duration-700 group-hover:scale-[1.02] overflow-hidden`} />
            <p className="eyebrow mb-2">{a.cat}</p>
            <h3 className="font-display text-[17px] font-normal text-mj-t3 group-hover:text-mj-t1 transition-colors leading-snug mb-3">{a.title}</h3>
            <p className="text-[10px] text-mj-t5">{a.date} · {a.read} read</p>
          </Link2>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════
// components/home/BookCTA.jsx
// ═══════════════════════════════════════
export function BookCTA() {
  return (
    <section id="bookcta" className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg2 border-t border-mj-b1 text-center">
      <span className="eyebrow mb-5 block">Private Consultation</span>
      <h2 className="font-display text-display-sm font-normal text-mj-t1 mb-4">
        Reserve Your <em className="italic text-mj-t4">Atelier Visit</em>
      </h2>
      <p className="text-[14px] text-mj-t3 max-w-md mx-auto mb-10 font-light leading-relaxed">
        A personal consultation with the Martins Johnson team. Shoes, bags, leather goods — designed entirely around you.
      </p>
      <Link2 href="/book" className="btn-solid">Book an Appointment →</Link2>
    </section>
  )
}
