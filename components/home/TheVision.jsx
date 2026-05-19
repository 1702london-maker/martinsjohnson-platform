'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PILLARS = [
  {
    num:   '01',
    title: 'Luxury Craftsmanship',
    desc:  'Every piece made to the highest standard — no compromise on material, technique, or finish. Handcrafted for those who understand the difference.',
  },
  {
    num:   '02',
    title: 'Cultural Legacy',
    desc:  'Rooted in African heritage, expressed through global luxury. A brand that honours where it comes from and redefines where it is going.',
  },
  {
    num:   '03',
    title: 'Global Influence',
    desc:  'From London to Lagos. A creative ecosystem that connects craftsmanship, culture, and commerce at the highest level worldwide.',
  },
  {
    num:   '04',
    title: 'Social Impact',
    desc:  'Through the Knife on Leather campaign and the Foundation — proving that luxury can be a platform for profound, lasting change.',
  },
]

export default function TheVision() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="vision" ref={ref} className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg2 border-t border-mj-b1">
      <div className="mb-14">
        <span className="eyebrow mb-3">The Vision</span>
        <h2 className="font-display text-display-sm font-normal text-mj-t1">
          Four <em className="italic text-mj-t4">Pillars</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-mj-b1">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="px-9 py-10 border-b lg:border-b-0 lg:border-r border-mj-b1 last:border-0 hover:bg-mj-bg3 transition-colors duration-400 group"
          >
            {/* BIG NUMBER — large, bold, bright */}
            <span
              className="block font-display font-semibold text-mj-t1 leading-none mb-8 tracking-tight group-hover:text-mj-t2 transition-colors"
              style={{ fontSize: 'clamp(72px, 9vw, 110px)' }}
            >
              {p.num}
            </span>
            <p className="font-display text-[20px] font-medium text-mj-t1 mb-3 leading-snug">
              {p.title}
            </p>
            <p className="text-[13px] text-mj-t4 leading-relaxed font-light">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
