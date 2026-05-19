'use client'
export const dynamic = 'force-dynamic'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

function FadeIn({ children, delay=0, className='' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div ref={ref} initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{delay,duration:.9,ease:[0.16,1,0.3,1]}} className={className}>
      {children}
    </motion.div>
  )
}

export default function OurCampaignPage() {
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  async function subscribe(e) {
    e.preventDefault()
    await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, source:'kol_page' }) })
    setSent(true)
    toast.success("You're on the campaign list.")
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>

      {/* Opening */}
      <div className="bg-mj-dk1 relative overflow-hidden border-b border-mj-b1" style={{minHeight:'85vh'}}>
        <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent calc(100%/8 - 1px),rgba(255,255,255,.012) calc(100%/8))'}}/>
        <div className="relative z-10 px-6 md:px-14 lg:px-20 pt-24 pb-20 flex flex-col justify-end" style={{minHeight:'85vh'}}>
          <FadeIn>
            <span className="text-[9px] tracking-[0.32em] uppercase text-white/25 font-bold block mb-8">Knife on Leather · Social Impact Campaign</span>
            <h1 className="font-display font-light text-white/90 leading-[0.88] tracking-tight mb-8" style={{fontSize:'clamp(52px,10vw,120px)'}}>
              A Knife<br />Can Build<br /><em className="italic text-white/35">A Life.</em>
            </h1>
            <p className="text-[16px] text-white/50 font-light max-w-2xl leading-relaxed">
              In the UK, a knife has taken too many lives. We chose to use it differently. Knife on Leather is the story of what happens when you redirect a weapon into a tool — and a tool into a future.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* UK Knife Crime Stats */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-20">
        <FadeIn>
          <span className="eyebrow mb-5 block">The Reality</span>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-mj-t1 mb-10 leading-tight">
            The UK Knife Crime <em className="italic text-mj-t4">Crisis.</em>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-mj-b1 mb-10">
          {[
            { n:'50,489', l:'Knife Offences 2023', src:'ONS' },
            { n:'244',    l:'Knife Homicides',     src:'ONS' },
            { n:'46%',    l:'Offenders Under 25',  src:'Home Office' },
            { n:'50%',    l:'Victims Under 25',    src:'Home Office' },
          ].map((s,i)=>(
            <div key={s.l} className="px-7 py-8 border-r border-mj-b1 last:border-0">
              <p className="font-display text-[clamp(26px,4vw,40px)] font-semibold text-mj-t1 leading-none mb-2">{s.n}</p>
              <p className="text-[10px] tracking-widest uppercase text-mj-t4 font-bold mb-1">{s.l}</p>
              <p className="text-[9px] text-mj-t5 italic">{s.src}</p>
            </div>
          ))}
        </div>
        <FadeIn delay={.2}>
          <p className="text-[15px] text-mj-t3 font-light leading-relaxed max-w-3xl">
            Behind every statistic is a young person who made a decision in a moment of fear, anger, or desperation. Behind that decision is often a community without enough options, enough mentors, or enough hope. That is what we are here to change.
          </p>
        </FadeIn>
      </div>

      {/* What we do */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1">
        <FadeIn>
          <span className="eyebrow mb-5 block">What We Do</span>
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-light text-mj-t1 mb-6 leading-tight">
            Turning Weapons <em className="italic text-mj-t4">Into Tools.</em>
          </h2>
          <p className="text-[15px] text-mj-t3 font-light leading-relaxed max-w-3xl mb-12">
            We take gang-involved young people off the streets and give them a skill, a purpose, and a future. We teach the art of leather craft — using the same knife that has taken lives as a precision tool for creation.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-mj-b1">
          {[
            { icon:'◈', title:'Leather Craft Education',    desc:'8-week intensive programmes. Real skills. Real certificates. Real industry pathways.' },
            { icon:'◉', title:'Mentorship',                 desc:'1-to-1 mentoring with industry professionals. Long-term relationships built to last.' },
            { icon:'◇', title:'Technology Pathways',        desc:'Coding, digital skills, design. A future in tech for those who never thought it possible.' },
            { icon:'◎', title:'Art & Creative Development', desc:'Photography, film, design, music. Culture as a career pathway.' },
            { icon:'◈', title:'Entrepreneurship Training',  desc:'How to start a business. How to manage money. How to build something that is yours.' },
            { icon:'◉', title:'Community Transformation',   desc:'Working with families, schools, and local organisations to change the conditions that create knife crime.' },
          ].map(item=>(
            <div key={item.title} className="border-b border-r border-mj-b1 last:border-0 px-8 py-8 hover:bg-mj-bg2 transition-colors">
              <span className="text-[20px] text-mj-t4 block mb-4">{item.icon}</span>
              <p className="font-display text-[17px] font-normal text-mj-t1 mb-3">{item.title}</p>
              <p className="text-[12px] text-mj-t4 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact */}
      <div className="bg-mj-dk1 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 mb-16">
          {[
            { n:'837',  l:'Young People Reached' },
            { n:'70%',  l:'Stayed Off the Streets' },
            { n:'14+',  l:'UK Cities' },
            { n:'6',    l:'Years Running' },
          ].map((s,i)=>(
            <FadeIn key={s.l} delay={i*.08}>
              <div className="px-8 py-10 border-r border-white/10 last:border-0">
                <p className="font-display font-semibold text-white/90 leading-none mb-3" style={{fontSize:'clamp(40px,7vw,80px)'}}>{s.n}</p>
                <p className="text-[10px] tracking-widest uppercase text-white/40 font-bold">{s.l}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={.4}>
          <blockquote className="border-l border-white/20 pl-8 max-w-3xl">
            <p className="font-display text-[clamp(18px,2.5vw,30px)] font-light text-white/70 leading-relaxed italic">
              "837 young people. 70% off the streets. That is not a statistic. That is 837 stories that ended differently."
            </p>
            <cite className="text-[10px] tracking-widest uppercase text-white/30 font-bold not-italic mt-5 block">— Martins Johnson</cite>
          </blockquote>
        </FadeIn>
      </div>

      {/* The organisations */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1 bg-mj-bg2">
        <FadeIn>
          <span className="eyebrow mb-5 block">The Ecosystem</span>
          <h2 className="font-display text-[clamp(26px,4vw,48px)] font-light text-mj-t1 mb-12 leading-tight">
            The Organisations <em className="italic text-mj-t4">Behind the Work.</em>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {[
            { name:'Martins Johnson', role:'The Brand', desc:'The commercial engine. Every purchase made through Martins Johnson directly supports this programme.' },
            { name:'Budruum Limited', role:'Technology & Operations', desc:'The operational partner powering digital infrastructure, community management, and programme logistics.' },
            { name:'Martins Johnson Foundation', role:'Foundation · Nigeria & UK', desc:'The charitable arm. Youth mentoring, education, creative development — building long-term pathways out of poverty and violence.' },
          ].map(org=>(
            <div key={org.name} className="border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 p-10 hover:bg-mj-bg3 transition-colors">
              <p className="eyebrow mb-2">{org.role}</p>
              <p className="font-display text-[22px] font-normal text-mj-t1 mb-4">{org.name}</p>
              <p className="text-[13px] text-mj-t4 font-light leading-relaxed">{org.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pathways */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1">
        <FadeIn>
          <span className="eyebrow mb-4 block">Career Pathways We Create</span>
          <h2 className="font-display text-[clamp(24px,3.5vw,44px)] font-light text-mj-t1 mb-5">There Are More Productive Uses <em className="italic text-mj-t4">For a Knife.</em></h2>
          <p className="text-[14px] text-mj-t3 font-light max-w-2xl leading-relaxed mb-10">We introduce young people to industries and pathways they had never considered. Not charity — opportunity.</p>
        </FadeIn>
        <div className="flex flex-wrap gap-2">
          {['Leather Craft','Art','Photography','Videography','Graphic Design','Music Production','Coding','Web Development','Entrepreneurship','Fashion Design','Cultural Journalism','Brand Management','Retail & Commerce','Luxury Goods','Craftsmanship','Architecture','Film'].map(p=>(
            <span key={p} className="px-4 py-2 border border-mj-b1 text-[11px] font-medium text-mj-t3 hover:border-mj-b2 hover:text-mj-t1 transition-all">{p}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-mj-dk2 border-b border-mj-dk3 px-6 md:px-14 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="font-display text-[clamp(26px,4vw,52px)] font-light text-mj-dkt1 leading-tight mb-6">Support the <em className="italic text-mj-dkt2">Campaign.</em></p>
            <p className="text-[14px] text-mj-dkt2 font-light leading-relaxed mb-10 max-w-md">Every purchase, every membership, every bespoke commission funds this programme. You do not have to donate. Just buy something beautiful.</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/shop" className="btn-solid">Shop the Collection →</Link>
              <Link href="/join-the-club" className="inline-flex items-center gap-2 px-7 py-3.5 border border-mj-dk3 text-mj-dkt2 text-[10px] tracking-[0.22em] uppercase font-medium hover:border-mj-dkt1 hover:text-mj-dkt1 transition-all">Join The Club →</Link>
            </div>
          </FadeIn>
          <FadeIn delay={.2}>
            <div className="border border-mj-dk3 p-8">
              <span className="text-[9px] tracking-[0.22em] uppercase text-mj-dkt2 font-bold block mb-3">Campaign Newsletter</span>
              {sent ? (
                <p className="font-display text-[18px] font-light italic text-mj-dkt1">You're on the list.</p>
              ) : (
                <form onSubmit={subscribe}>
                  <p className="text-[13px] text-mj-dkt2 font-light mb-5 leading-relaxed">Updates on programme progress, participant stories, and how to get involved.</p>
                  <div className="flex border-b border-mj-dk3 focus-within:border-mj-dkt2 transition-colors mb-4">
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email"
                      className="flex-1 bg-transparent text-mj-dkt1 text-[13px] py-2.5 outline-none font-light placeholder-mj-dk3"/>
                    <button type="submit" className="text-[10px] tracking-widest uppercase text-mj-dkt2 hover:text-mj-dkt1 pl-4 py-2.5 font-bold transition-colors">Subscribe</button>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
