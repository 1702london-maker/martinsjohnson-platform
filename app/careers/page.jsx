'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ROLES = [
  { dept: 'Sales & Growth',     title: 'Global Sales Director',          loc: 'London / Remote',  type: 'Full-time', desc: 'Lead international sales strategy across luxury markets, wholesale partnerships, and high-net-worth client relationships.' },
  { dept: 'Sales & Growth',     title: 'Luxury Sales Representative',    loc: 'London / Dubai',   type: 'Full-time', desc: 'Build and manage premium client accounts. Bring the Martins Johnson world to discerning buyers across key markets.' },
  { dept: 'Marketing',          title: 'Campaign Coordinator',           loc: 'London',           type: 'Full-time', desc: 'Drive editorial campaigns for both the MJ Collection and the 1702 brand. Luxury aesthetic is non-negotiable.' },
  { dept: 'Marketing',          title: 'Brand Ambassador',               loc: 'Global',           type: 'Freelance', desc: 'Represent the brand across key cities and markets. You embody the Martins Johnson ethos — cultural, elevated, purposeful.' },
  { dept: 'Creative',           title: 'Art Director',                   loc: 'London',           type: 'Full-time', desc: 'Shape the visual language of Martins Johnson across all touchpoints — digital, print, editorial, runway.' },
  { dept: 'Creative',           title: 'Content Creator',                loc: 'Remote',           type: 'Contract',  desc: 'Produce editorial content at the highest level. Campaign photography, film, social — all luxury-first.' },
  { dept: 'Retail & Partners',  title: 'Stockist Partner',               loc: 'International',    type: 'Partner',   desc: 'Own or manage a premium retail environment? Partner with us to carry the MJ collection. Luxury only.' },
  { dept: 'Retail & Partners',  title: 'Retail Partner Manager',         loc: 'London / Lagos',   type: 'Full-time', desc: 'Develop and manage our growing network of luxury stockists across the UK, West Africa, and the Gulf.' },
  { dept: 'Technology',         title: 'Full-Stack Developer',           loc: 'Remote',           type: 'Full-time', desc: 'Build and scale our digital platform. Next.js, Supabase, Stripe. Luxury thinking, engineering execution.' },
  { dept: 'Technology',         title: 'Mobile Developer',               loc: 'Remote',           type: 'Full-time', desc: 'Lead our mobile app from design to launch. React Native. The first luxury leather app of its kind.' },
  { dept: 'Foundation',         title: 'Programme Coordinator (KOL)',    loc: 'UK — Various',     type: 'Full-time', desc: 'Run the Knife on Leather programme across UK cities. Change lives through craft. This is the most important role we have.' },
]

const DEPTS = ['All', ...new Set(ROLES.map(r => r.dept))]

export default function CareersPage() {
  const [dept, setDept] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = dept === 'All' ? ROLES : ROLES.filter(r => r.dept === dept)

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop: 'var(--nav-h)' }}>

      {/* Hero */}
      <div className="bg-mj-dk1 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg,transparent,transparent calc(100%/8 - 1px),rgba(255,255,255,.015) calc(100%/8))' }} />
        <div className="relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8 }}>
            <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold block mb-5">Join the Movement</span>
            <h1 className="font-display text-[clamp(48px,9vw,110px)] font-light text-white/90 leading-[0.9] tracking-tight mb-8">
              Build Something<br /><em className="italic text-white/30">That Lasts.</em>
            </h1>
            <p className="text-[15px] text-white/50 font-light max-w-xl leading-relaxed">
              We are not hiring employees. We are recruiting people who believe in legacy — in craft, culture, and the permanent value of doing things with complete intention.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="border-b border-mj-b1 bg-mj-bg2">
        <div className="px-6 md:px-14 lg:px-20 py-14 grid grid-cols-1 md:grid-cols-3 gap-0 border border-mj-b1 mx-6 md:mx-14 lg:mx-20 my-14">
          {[
            { t:'Luxury Standard',  d:'Everything we produce must be the finest version of itself. That applies to code, campaigns, and conversations.' },
            { t:'Cultural Depth',   d:'We build with African heritage and global ambition. You must understand why that matters.' },
            { t:'Long-Term Thinking',d:'We are not building for exits or growth rounds. We are building for generations.' },
          ].map((v, i) => (
            <div key={v.t} className="px-8 py-8 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0">
              <p className="font-display text-[18px] font-normal text-mj-t1 mb-3">{v.t}</p>
              <p className="text-[13px] text-mj-t4 font-light leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="px-6 md:px-14 lg:px-20 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="eyebrow mb-3 block">Open Positions</span>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-light text-mj-t1">
              Where Will <em className="italic text-mj-t4">You Fit?</em>
            </h2>
          </div>
          <p className="text-[12px] text-mj-t5 hidden md:block">{filtered.length} open roles</p>
        </div>

        {/* Dept filter */}
        <div className="flex gap-1.5 flex-wrap mb-8">
          {DEPTS.map(d => (
            <button key={d} onClick={() => setDept(d)}
              className={`px-4 py-2 border text-[10px] tracking-widest uppercase font-medium transition-all ${dept===d ? 'border-mj-t1 bg-mj-t1 text-mj-white' : 'border-mj-b1 text-mj-t4 hover:border-mj-b2'}`}>
              {d}
            </button>
          ))}
        </div>

        {/* Role list */}
        <div className="flex flex-col gap-0 border border-mj-b1">
          {filtered.map((role, i) => (
            <div key={i}
              onClick={() => setSelected(selected?.title === role.title ? null : role)}
              className="border-b border-mj-b1 last:border-0 cursor-pointer hover:bg-mj-bg2 transition-colors"
            >
              <div className="flex items-center justify-between px-7 py-5">
                <div className="flex items-center gap-6">
                  <span className="text-[9px] tracking-widest uppercase text-mj-t5 font-bold w-28 flex-shrink-0 hidden md:block">{role.dept}</span>
                  <div>
                    <p className="text-[14px] font-medium text-mj-t2">{role.title}</p>
                    <p className="text-[11px] text-mj-t4 font-light mt-0.5">{role.loc} · {role.type}</p>
                  </div>
                </div>
                <span className={`text-mj-t4 transition-transform duration-300 ${selected?.title===role.title?'rotate-45':''}`}>+</span>
              </div>
              {selected?.title === role.title && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} transition={{ duration:.3 }}
                  className="px-7 pb-6 border-t border-mj-b1">
                  <p className="text-[14px] text-mj-t3 font-light leading-relaxed mt-5 mb-6 max-w-2xl">{role.desc}</p>
                  <a href={`mailto:careers@martinsjohnson.com?subject=Application: ${role.title}`}
                    className="btn-solid text-[10px]">Apply for This Role →</a>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* General application */}
        <div className="mt-12 border border-mj-b1 p-10 bg-mj-bg2 text-center">
          <p className="font-display text-[22px] font-light text-mj-t1 mb-3">Don't See Your Role?</p>
          <p className="text-[13px] text-mj-t4 font-light mb-6 max-w-md mx-auto">If you believe in what we are building and have something exceptional to bring, we want to hear from you.</p>
          <a href="mailto:careers@martinsjohnson.com?subject=General Application" className="btn-solid">Send a General Application →</a>
        </div>
      </div>
    </div>
  )
}
