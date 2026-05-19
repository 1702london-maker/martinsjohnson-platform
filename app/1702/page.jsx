'use client'
export const dynamic = 'force-dynamic'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useGlobalStore } from '@/lib/store'

const COLLECTIONS = [
  { slug:'midnight',   name:'Midnight Capsule',       season:'AW 2025',   items:12, desc:'All-black. All-intentional. A complete wardrobe for the man who requires no explanation.' },
  { slug:'cognac',     name:'Cognac Series',           season:'SS 2025',   items:8,  desc:'Warm tones. Burnished finish. The colour of confidence before it becomes arrogance.' },
  { slug:'1702-alpha', name:'1702 Alpha Drop',         season:'Limited',   items:5,  desc:'Our first numbered series. 100 pieces. Each signed. The beginning of something collectors will talk about.' },
]

const WATCHES = [
  { name:'1702 Timepiece I',    ref:'TI-001', desc:'Swiss movement. Hand-stitched leather strap. Brushed titanium case. 38mm.' },
  { name:'1702 Timepiece II',   ref:'TI-002', desc:'The evening edition. Rose gold accents. Cognac croc-embossed strap.' },
  { name:'1702 Chronograph I',  ref:'CH-001', desc:'Sport luxe. Function without compromise. For the man who moves fast but travels slow.' },
]

const BRACELETS = [
  { name:'Box Calf Wrap',        price:280 },
  { name:'Python Braid I',       price:480 },
  { name:'Crocodile Cuff',       price:620 },
  { name:'Suede Double Wrap',    price:195 },
]

export default function Brand1702Page() {
  const { formatPrice } = useGlobalStore()

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop: 'var(--nav-h)' }}>

      {/* Hero — sharper, younger, fashion-editorial */}
      <div className="bg-mj-dk1 border-b border-mj-b1 relative overflow-hidden" style={{ minHeight:'75vh' }}>
        <div className="absolute inset-0" style={{ backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent calc(100%/5 - 1px),rgba(255,255,255,.02) calc(100%/5))' }}/>
        <div className="relative z-10 px-6 md:px-14 lg:px-20 pt-20 pb-24 flex flex-col justify-end h-full" style={{ minHeight:'75vh' }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.9 }}>
            <span className="text-[9px] tracking-[0.32em] uppercase text-white/25 font-bold block mb-6">1702 by Martins Johnson</span>
            <h1 className="font-display font-light text-white/90 leading-[0.88] tracking-tight mb-8"
              style={{ fontSize:'clamp(60px,12vw,150px)' }}>
              1702
            </h1>
            <p className="text-[14px] text-white/40 font-light max-w-xl leading-relaxed mb-10">
              The ready-to-wear arm of Martins Johnson. Sharp. Cultural. Fashion-forward. Built for the generation that wears heritage like armour.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/shop?brand=1702" className="btn-solid">Shop 1702 →</Link>
              <Link href="/1702/drops"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/50 text-[10px] tracking-[0.22em] uppercase font-medium hover:border-white/40 hover:text-white/80 transition-all">
                View Drops →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Collections */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="eyebrow mb-3 block">Collections</span>
            <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-mj-t1">
              Current <em className="italic text-mj-t4">Releases</em>
            </h2>
          </div>
          <Link href="/shop?brand=1702" className="btn-ghost text-[10px] hidden md:flex">
            <span className="w-5 h-px bg-mj-b2" />All Collections
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {COLLECTIONS.map((col, i) => (
            <div key={col.slug}
              className="border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 group hover:bg-mj-bg2 transition-colors cursor-pointer">
              <div className="h-56 bg-mj-card overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-mj-card2 to-mj-card transition-transform duration-700 group-hover:scale-[1.03]"/>
              </div>
              <div className="p-7">
                <div className="flex justify-between items-start mb-3">
                  <p className="eyebrow">{col.season}</p>
                  <span className="text-[9px] text-mj-t5">{col.items} pieces</span>
                </div>
                <p className="font-display text-[20px] font-normal text-mj-t1 mb-3 group-hover:text-mj-t2 transition-colors">{col.name}</p>
                <p className="text-[12px] text-mj-t4 font-light leading-relaxed mb-5">{col.desc}</p>
                <Link href={`/shop?collection=${col.slug}`} className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">
                  View Collection →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watches */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="eyebrow mb-3 block">Timepieces</span>
            <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-mj-t1">
              1702 <em className="italic text-mj-t4">Watches</em>
            </h2>
          </div>
          <Link href="/1702/watches" className="btn-ghost text-[10px] hidden md:flex">
            <span className="w-5 h-px bg-mj-b2" />All Watches
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {WATCHES.map((watch, i) => (
            <div key={watch.ref} className="bg-mj-white border border-mj-b1 group hover:border-mj-b2 hover:shadow-sm transition-all duration-500 cursor-pointer">
              <div className="h-52 bg-mj-card flex items-center justify-center border-b border-mj-b1">
                <svg width="44" height="44" fill="none" stroke="#C2C0BB" strokeWidth="0.75" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="7"/>
                  <polyline points="12 9 12 12 13.5 13.5"/>
                  <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
                </svg>
              </div>
              <div className="p-6">
                <p className="text-[9px] tracking-widest uppercase text-mj-t5 mb-1 font-medium">Ref. {watch.ref}</p>
                <p className="font-display text-[18px] font-normal text-mj-t1 mb-3">{watch.name}</p>
                <p className="text-[12px] text-mj-t4 font-light leading-relaxed">{watch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bracelets */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="eyebrow mb-3 block">Leather Bracelets</span>
            <h2 className="font-display text-[clamp(26px,3.5vw,48px)] font-light text-mj-t1">
              Wrist <em className="italic text-mj-t4">Statements</em>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
          {BRACELETS.map((b, i) => (
            <div key={b.name} className="bg-mj-white border border-mj-b1 p-6 group hover:border-mj-b2 hover:shadow-sm transition-all cursor-pointer">
              <div className="h-32 bg-mj-card border-b border-mj-b1 mb-4 flex items-center justify-center">
                <svg width="32" height="32" fill="none" stroke="#D5D3CE" strokeWidth="1" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
              <p className="text-[12px] font-medium text-mj-t2 group-hover:text-mj-t1 transition-colors mb-1">{b.name}</p>
              <p className="text-[11px] text-mj-t4">{formatPrice(b.price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign CTA */}
      <div className="bg-mj-dk2 px-6 md:px-14 lg:px-20 py-20 text-center border-b border-mj-dk3">
        <p className="font-display text-[clamp(26px,5vw,64px)] font-light text-mj-dkt1 leading-tight mb-6">
          Ready to Wear<br /><em className="italic text-mj-dkt2">The Culture.</em>
        </p>
        <p className="text-[14px] text-mj-dkt2 font-light max-w-md mx-auto mb-10 leading-relaxed">
          Join the 1702 mailing list for early access to drops, exclusive colourways, and seasonal campaign releases.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/shop?brand=1702" className="btn-solid">Shop 1702</Link>
          <Link href="/join-the-club"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-mj-dk3 text-mj-dkt2 text-[10px] tracking-[0.22em] uppercase font-medium hover:border-mj-dkt1 hover:text-mj-dkt1 transition-all">
            Join The Club →
          </Link>
        </div>
      </div>
    </div>
  )
}
