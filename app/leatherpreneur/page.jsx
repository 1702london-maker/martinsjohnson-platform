'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CHAPTERS = [
  { n:'01', title:'The Vision Before the Brand',    preview:'Before there is a product, there is an idea. Before the idea, there is a wound — something that happened to you that you refused to let define you. This chapter begins there.' },
  { n:'02', title:'Leather as Legacy',               preview:'Why leather? Because leather endures. Because leather improves with time. Because leather requires patience, skill, and deliberate intention. This is the metaphor for everything.' },
  { n:'03', title:'Building Global in a Local World', preview:'You do not need London to validate Lagos. You do not need New York to legitimise Accra. You need a vision clear enough that the world has no choice but to come to you.' },
  { n:'04', title:'The Price of Craft',              preview:'Craft is not expensive. Mediocrity is. The price you pay for craft is time, humility, and the willingness to start again. This chapter is about what craft actually costs.' },
  { n:'05', title:'Knife on Leather',                preview:'The campaign that changed everything. How the idea of turning a weapon into a tool became the most important work we have ever done — and why it will outlast the brand itself.' },
  { n:'06', title:'The Luxury Trap',                preview:'The greatest danger in building a luxury brand is believing your own mythology too early. This chapter is a warning. A survival guide. A mirror.' },
]

export default function LeatherPreneurPage() {
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  async function notify(e) {
    e.preventDefault()
    await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, source:'leatherpreneur_page' }) })
    setSent(true)
    toast.success('We\'ll notify you on release.')
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop: 'var(--nav-h)' }}>

      {/* Hero — editorial book cover treatment */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[90vh]">
        <div className="bg-mj-dk1 relative overflow-hidden flex flex-col justify-end p-12 md:p-20 min-h-[50vh] lg:min-h-0">
          <div className="absolute inset-0" style={{ backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent calc(100%/6 - 1px),rgba(255,255,255,.015) calc(100%/6))' }}/>
          <div className="relative z-10">
            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }}>
              <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold block mb-8">The Leatherpreneur</span>
              <p className="font-display text-[clamp(52px,10vw,120px)] font-light text-white/90 leading-[0.88] tracking-tight mb-8">
                The<br />Leather-<br /><em className="italic text-white/40">preneur.</em>
              </p>
              <p className="text-[13px] text-white/40 font-light">Martins Johnson</p>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 bg-mj-bg3 border-l border-mj-b1">
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:.3, duration:.8 }}>
            <span className="eyebrow mb-5 block">A Founder's Manifesto</span>
            <h1 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal text-mj-t1 leading-tight mb-6">
              The Blueprint for Building Luxury from the Ground Up.
            </h1>
            <p className="text-[14px] text-mj-t3 font-light leading-relaxed mb-8 max-w-md">
              Part memoir, part manifesto, part business bible. The Leatherpreneur documents the philosophy, the failures, the decisions, and the vision behind one of the most deliberate luxury brand journeys of our time.
            </p>
            <div className="border border-mj-b1 p-5 mb-8">
              <p className="text-[10px] tracking-widest uppercase text-mj-t5 mb-3 font-bold">Available Now</p>
              <p className="font-display text-[32px] font-light text-mj-t1">£28 <span className="text-[13px] text-mj-t4 font-sans">hardback</span></p>
              <p className="text-[12px] text-mj-t4 font-light mt-1">Free UK delivery · Signed copies available</p>
            </div>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="#purchase" className="btn-solid">Purchase the Book →</a>
              <button onClick={() => document.getElementById('preview').scrollIntoView({ behavior:'smooth' })}
                className="btn-outline">Read Chapter Previews</button>
            </div>
            <p className="text-[11px] text-mj-t5 font-light">Also available as ebook · Audiobook coming 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Pull quote */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-16">
        <blockquote className="max-w-4xl">
          <p className="font-display text-[clamp(20px,3vw,38px)] font-light text-mj-t2 leading-relaxed italic">
            "This book is not about leather. It is about what happens when you refuse to accept the version of the world that other people have decided is final."
          </p>
          <cite className="text-[10px] tracking-widest uppercase text-mj-t5 font-bold not-italic mt-6 block">— Martins Johnson</cite>
        </blockquote>
      </div>

      {/* Chapter previews */}
      <div id="preview" className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1">
        <span className="eyebrow mb-4 block">Inside the Book</span>
        <h2 className="font-display text-[clamp(26px,4vw,48px)] font-light text-mj-t1 mb-14">
          Chapter <em className="italic text-mj-t4">Previews</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-mj-b1">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.n} className="border-b border-r border-mj-b1 p-8 last:border-0 hover:bg-mj-bg2 transition-colors group">
              <span className="font-display text-[40px] font-light text-mj-b2 leading-none block mb-6">{ch.n}</span>
              <p className="font-display text-[18px] font-normal text-mj-t1 mb-4 leading-snug group-hover:text-mj-t2 transition-colors">{ch.title}</p>
              <p className="text-[12px] text-mj-t4 font-light leading-relaxed line-clamp-4">{ch.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interviews / Founder insights */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-20">
        <span className="eyebrow mb-4 block">Founder Insights</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-mj-b1">
          {[
            { q:'Why leather?',                    a:'Because it is the most honest material in the world. It shows where it has been. It remembers every hand that has worked it. That kind of memory — that kind of integrity — is what I wanted in a brand.' },
            { q:'What is the book really about?',  a:'It is about refusing permission. The idea that you need someone to authorise your excellence is the most expensive lie in business. The book is about dismantling that lie permanently.' },
          ].map((item, i) => (
            <div key={i} className="border-b lg:border-b-0 lg:border-r border-mj-b1 last:border-0 p-10">
              <p className="text-[10px] tracking-widest uppercase text-mj-t5 mb-4 font-bold">From the Founder</p>
              <p className="font-display text-[18px] font-normal text-mj-t1 mb-5 italic">{item.q}</p>
              <p className="text-[14px] text-mj-t3 font-light leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase */}
      <div id="purchase" className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {[
            { title:'Standard Edition',  price:'£28',  items:['Hardback copy','Free UK delivery','Exclusive bookmark','Digital companion access'] },
            { title:'Signed Edition',    price:'£48',  items:['Signed by Martins Johnson','Premium packaging','Certificate of authenticity','Priority dispatch'], featured:true },
            { title:'Collector\'s Set',  price:'£120', items:['Signed hardback','Leather bookmark (MJ branded)','Campaign print','Exclusive member access','The Leatherpreneur community'] },
          ].map(tier => (
            <div key={tier.title}
              className={`p-10 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 relative ${tier.featured?'bg-mj-bg2':''}`}>
              {tier.featured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-mj-t1"/>}
              <p className="text-[10px] tracking-widest uppercase text-mj-t4 mb-2 font-bold">{tier.title}</p>
              <p className="font-display text-[36px] font-light text-mj-t1 mb-6">{tier.price}</p>
              <ul className="space-y-2.5 mb-8">
                {tier.items.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="w-3 h-3 border border-mj-b2 rounded-full flex-shrink-0 mt-1 flex items-center justify-center"><div className="w-1 h-1 bg-mj-t4 rounded-full"/></div>
                    <span className="text-[12px] font-light text-mj-t3">{item}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 text-[10px] tracking-widest uppercase font-bold transition-all ${tier.featured?'bg-mj-t1 text-mj-white hover:bg-mj-t2':'border border-mj-b2 text-mj-t3 hover:border-mj-t2 hover:text-mj-t1'}`}>
                Purchase {tier.featured ? '— Most Popular' : ''}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notify on restock */}
      <div className="px-6 md:px-14 lg:px-20 py-16 text-center bg-mj-bg2">
        {sent ? (
          <p className="font-display text-[22px] font-light italic text-mj-t3">You'll hear from us.</p>
        ) : (
          <>
            <p className="font-display text-[22px] font-light text-mj-t1 mb-2">Stay Updated</p>
            <p className="text-[13px] text-mj-t4 mb-7 font-light">Get notified about new editions, events, and founder insights.</p>
            <form onSubmit={notify} className="flex gap-3 max-w-sm mx-auto">
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email"
                className="flex-1 border-b border-mj-b2 focus:border-mj-t1 bg-transparent text-mj-t2 text-[13px] py-3 outline-none font-light placeholder-mj-t5 transition-colors"/>
              <button type="submit" className="btn-solid flex-shrink-0">Notify Me</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
