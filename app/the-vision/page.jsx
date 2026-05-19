'use client'
export const dynamic = 'force-dynamic'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const PILLARS = [
  {
    n: '01',
    title: 'Luxury Is a Language',
    body: 'Before it is a product, luxury is a statement of intent. It says: I understand craft, I value time, I invest in excellence. At Martins Johnson, luxury is not aspirational — it is the baseline. We build from excellence upward, never from compromise upward.',
    pull: '"Luxury is the by-product of mastery. Not the goal of it."',
  },
  {
    n: '02',
    title: 'African Heritage, Global Stage',
    body: 'The story of African craftsmanship is not a footnote in the history of global luxury — it is the foundation. We are reclaiming that narrative. Every piece carries the weight of a continent\'s ingenuity, precision, and beauty — expressed through the vocabulary of international luxury.',
    pull: '"We are not adding African culture to luxury. We are showing the world that African culture always was luxury."',
  },
  {
    n: '03',
    title: 'Legacy Over Trend',
    body: 'Trends are seasonal. Legacy is permanent. We are not building for the current moment. We are building for the generation that will inherit what we create. Every decision — from the leather we source to the people we employ — is made with that inheritance in mind.',
    pull: '"Build as if what you leave behind is more important than what you hold right now."',
  },
  {
    n: '04',
    title: 'Social Impact Is Non-Negotiable',
    body: 'The Knife on Leather campaign is not a corporate social responsibility programme. It is our original purpose made visible. From the beginning, this brand was built on the belief that a knife can heal rather than harm, and that craft can redirect a life entirely.',
    pull: '"837 young people. 70% off the streets. That is not a statistic. That is the real luxury of what we do."',
  },
]

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.16,1,0.3,1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function TheVisionPage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop: 'var(--nav-h)' }}>

      {/* Hero — typographic, no image */}
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <span className="eyebrow mb-6 block">The Vision</span>
          <h1
            className="font-display font-light text-mj-t1 leading-[0.92] tracking-tight mb-8"
            style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
          >
            Legacy.<br />
            <em className="italic text-mj-t4">Not Trend.</em>
          </h1>
          <p className="text-[16px] text-mj-t3 font-light max-w-2xl leading-relaxed">
            A philosophical manifesto for what we are building — and why. Not a mission statement. Not a brand positioning document. A declaration of permanent intent.
          </p>
        </motion.div>
      </div>

      {/* Opening statement */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1 max-w-5xl">
        <FadeIn>
          <p className="font-display text-[clamp(20px,2.8vw,34px)] font-light text-mj-t2 leading-relaxed">
            We live in an era that confuses speed with progress, visibility with value, and popularity with legacy. Martins Johnson exists as a direct counter-argument to all of that — a measured, deliberate, permanent statement about what excellence means when it comes from the right place, built in the right way, for the right reasons.
          </p>
        </FadeIn>
      </div>

      {/* The four pillars — each full bleed */}
      {PILLARS.map((p, i) => (
        <div key={p.n}
          className={`border-b border-mj-b1 ${i % 2 === 0 ? 'bg-mj-bg' : 'bg-mj-bg2'}`}
        >
          <div className="px-6 md:px-14 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16 items-start">
            <FadeIn className="lg:sticky lg:top-24">
              <span
                className="font-display font-semibold text-mj-b2 leading-none block"
                style={{ fontSize: 'clamp(60px,10vw,110px)' }}
              >
                {p.n}
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-[clamp(26px,3.5vw,48px)] font-normal text-mj-t1 mb-8 leading-tight">
                  {p.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-[15px] text-mj-t3 font-light leading-relaxed mb-10 max-w-2xl">
                  {p.body}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <blockquote className="border-l border-mj-b2 pl-6">
                  <p className="font-display text-[clamp(15px,2vw,22px)] italic font-light text-mj-t4 leading-relaxed">
                    {p.pull}
                  </p>
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </div>
      ))}

      {/* Global reach */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1 bg-mj-bg3">
        <FadeIn>
          <span className="eyebrow mb-5 block">Global Presence</span>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-mj-t1 mb-12 leading-tight">
            One Brand. <em className="italic text-mj-t4">Every Continent.</em>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-mj-b1">
          {[
            { city: 'London',     role: 'Global Headquarters' },
            { city: 'Lagos',      role: 'West African Hub' },
            { city: 'Dubai',      role: 'Middle East Market' },
            { city: 'New York',   role: 'North America' },
          ].map((l, i) => (
            <FadeIn key={l.city} delay={i * 0.08}
              className="px-8 py-10 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0">
              <p className="font-display text-[26px] font-light text-mj-t1 mb-1">{l.city}</p>
              <p className="text-[10px] tracking-widest uppercase text-mj-t5 font-medium">{l.role}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Closing — invitation */}
      <div className="bg-mj-dk1 px-6 md:px-14 lg:px-20 py-24 text-center">
        <FadeIn>
          <p className="font-display text-[clamp(28px,5vw,64px)] font-light text-mj-dkt1 leading-tight mb-8">
            This Is Not the Beginning.<br />
            <em className="italic text-mj-dkt2">We Have Always Been Here.</em>
          </p>
          <p className="text-[14px] text-mj-dkt2 font-light max-w-xl mx-auto mb-12 leading-relaxed">
            What you are witnessing is not a brand launch. It is a recognition. A formal acknowledgement that African luxury — African craft, African vision, African excellence — has always deserved this global platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/bespoke" className="btn-solid">Commission a Piece</Link>
            <Link href="/knife-on-leather"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-mj-dk3 text-mj-dkt2 text-[10px] tracking-[0.22em] uppercase font-medium hover:border-mj-dkt1 hover:text-mj-dkt1 transition-all">
              Our Campaign →
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
