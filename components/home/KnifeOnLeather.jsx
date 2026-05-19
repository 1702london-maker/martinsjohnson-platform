'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function KnifeOnLeather() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  async function subscribe(e) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'knife_on_leather' }),
    })
    toast.success('You\'re on the campaign list.')
  }

  return (
    <section id="kol" ref={ref} className="border-t border-mj-b1">
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '88vh' }}>

        {/* ── LEFT: Image + typographic overlay ── */}
        <div className="relative overflow-hidden bg-mj-dk1" style={{ minHeight: '50vw' }}>
          {/* Campaign image — replace src via Supabase Storage */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/knife-on-leather.jpg)',
              filter: 'brightness(0.4) contrast(1.1)',
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-mj-dk1/50" />
          {/* Subtle grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg,transparent,transparent calc(100%/6 - 1px),rgba(255,255,255,.018) calc(100%/6 - 1px),rgba(255,255,255,.018) calc(100%/6))'
          }} />
          {/* Big typographic lockup */}
          <div className="absolute bottom-10 left-10 right-10 z-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
              className="font-display font-semibold leading-none tracking-tighter select-none"
              style={{
                fontSize: 'clamp(60px, 11vw, 130px)',
                color: 'rgba(255,255,255,0.09)',
              }}
            >
              Knife
              <em className="block font-light italic" style={{ fontSize: '0.38em', color: 'rgba(255,255,255,0.14)' }}>on</em>
              Leather
            </motion.p>
          </div>
          {/* Overlay label */}
          <div className="absolute top-10 left-10 z-10">
            <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold">Social Impact · United Kingdom</span>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="bg-mj-dk2 flex flex-col justify-center px-10 md:px-16 py-16 lg:py-20">

          {/* Campaign label — sits directly under section identifier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-6 h-px bg-mj-dk3" />
            <span className="text-[9px] tracking-[0.28em] uppercase text-mj-dkt2 font-bold">Campaign</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="font-display font-semibold leading-tight text-mj-dkt1 mb-5"
            style={{ fontSize: 'clamp(32px,4.5vw,58px)' }}
          >
            Turning <em className="italic font-light text-mj-dkt2">Weapons</em><br />
            Into Tools.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="text-[14px] leading-relaxed text-mj-dkt2 mb-5 font-normal"
          >
            Taking gang-involved young people off the streets of the UK — giving them a skill, a purpose, and a future. We teach the art of leather craft using the very tool once used as a weapon. The knife becomes an instrument of creation, not destruction.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="font-display italic text-mj-dkt2/60 text-[15px] mb-7 font-light leading-relaxed"
          >
            "Where the blade becomes a tool, and a tool becomes a life worth living."
          </motion.p>

          {/* Stats — 837 + 70% — bold and large */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="grid grid-cols-2 border border-mj-dk3 mb-7"
          >
            <div className="px-6 py-5 border-r border-mj-dk3">
              <p className="font-display text-[40px] font-semibold text-mj-dkt1 leading-none">837</p>
              <p className="text-[9px] tracking-[0.18em] uppercase text-mj-dkt2 mt-2 font-bold">Young People</p>
            </div>
            <div className="px-6 py-5">
              <p className="font-display text-[40px] font-semibold text-mj-dkt1 leading-none">70%</p>
              <p className="text-[9px] tracking-[0.18em] uppercase text-mj-dkt2 mt-2 font-bold">Stayed off Streets</p>
            </div>
          </motion.div>

          {/* Newsletter — integrated in this section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.72, duration: 0.6 }}
            className="mb-7"
          >
            <p className="text-[9px] tracking-[0.22em] uppercase text-mj-dkt2 mb-2.5 font-bold">Join the Campaign — Stay Informed</p>
            {sent ? (
              <p className="text-[13px] font-display italic text-mj-dkt1/60">You're on the list. Thank you.</p>
            ) : (
              <form onSubmit={subscribe} className="flex border-b border-mj-dk3 focus-within:border-mj-dkt2 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-mj-dkt1 text-[13px] py-2.5 outline-none placeholder-mj-dk3/50 font-light"
                />
                <button type="submit" className="text-[10px] tracking-[0.16em] uppercase text-mj-dkt2 hover:text-mj-dkt1 pl-4 py-2.5 transition-colors font-bold">
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.82, duration: 0.6 }}
          >
            <Link
              href="/knife-on-leather"
              className="inline-flex items-center gap-2 px-6 py-3 border border-mj-dk3 text-mj-dkt2 text-[10px] tracking-[0.18em] uppercase font-bold hover:border-mj-dkt1 hover:text-mj-dkt1 transition-all duration-300"
            >
              Learn More About the Campaign →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
