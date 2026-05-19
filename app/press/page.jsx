'use client'
export const dynamic = 'force-dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'

const FEATURES = [
  { pub:'Forbes Africa',       title:'The Man Stitching Luxury Into Legacy',         date:'March 2025', type:'Feature' },
  { pub:'GQ UK',               title:'10 British Brands Redefining Modern Luxury',   date:'Jan 2025',   type:'List Feature' },
  { pub:'Vogue Business',      title:'African Heritage in the Atelier',              date:'Nov 2024',   type:'Interview' },
  { pub:'BBC Africa Business', title:'Knife on Leather: A Conversation with Martins Johnson', date:'Sept 2024', type:'Documentary Feature' },
  { pub:'The Sunday Times',    title:'The Leatherpreneur: Building Luxury From Scratch', date:'Aug 2024', type:'Profile' },
  { pub:'Esquire UK',          title:'The New Language of British Luxury',           date:'June 2024',  type:'Feature' },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-16">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
          <span className="eyebrow mb-4 block">Media & Press</span>
          <h1 className="font-display text-display-sm font-light text-mj-t1 mb-5">In the <em className="italic text-mj-t4">Press.</em></h1>
          <p className="text-[14px] text-mj-t3 font-light max-w-xl leading-relaxed">For press enquiries, interview requests and media partnerships, contact our communications team.</p>
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1">
        <span className="eyebrow mb-8 block">Media Features</span>
        <div className="flex flex-col border border-mj-b1">
          {FEATURES.map((f,i) => (
            <div key={i} className="flex items-center justify-between px-7 py-5 border-b border-mj-b1 last:border-0 hover:bg-mj-bg2 transition-colors group cursor-pointer">
              <div className="flex items-center gap-8">
                <span className="text-[9px] tracking-widest uppercase text-mj-t5 font-bold w-24 flex-shrink-0 hidden md:block">{f.type}</span>
                <div>
                  <p className="text-[14px] font-medium text-mj-t2 group-hover:text-mj-t1 transition-colors">{f.title}</p>
                  <p className="text-[11px] text-mj-t4 mt-0.5 font-light">{f.pub}</p>
                </div>
              </div>
              <p className="text-[11px] text-mj-t5 flex-shrink-0 hidden md:block">{f.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Press Kit */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 py-16">
        <span className="eyebrow mb-5 block">Press Kit</span>
        <h2 className="font-display text-[clamp(24px,3.5vw,44px)] font-light text-mj-t1 mb-10">Download <em className="italic text-mj-t4">Media Assets.</em></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {name:'Brand Press Kit',      size:'12MB', desc:'Brand guidelines, photography, founder bio, brand story.'},
            {name:'Knife on Leather Kit', size:'8MB',  desc:'Campaign photography, statistics, programme overview, quotes.'},
            {name:'Founder Media Pack',   size:'6MB',  desc:'Martins Johnson photography, biography, press quotes, headshots.'},
          ].map(kit => (
            <div key={kit.name} className="border border-mj-b1 p-7 hover:border-mj-b2 hover:bg-mj-bg3 transition-all cursor-pointer group">
              <p className="text-[9px] tracking-widest uppercase text-mj-t5 mb-2 font-bold">PDF + Images · {kit.size}</p>
              <p className="font-display text-[18px] font-normal text-mj-t1 mb-3">{kit.name}</p>
              <p className="text-[12px] text-mj-t4 font-light mb-5">{kit.desc}</p>
              <p className="text-[10px] tracking-widest uppercase text-mj-t4 group-hover:text-mj-t1 transition-colors font-medium">Download →</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="px-6 md:px-14 lg:px-20 py-16">
        <div className="max-w-lg">
          <span className="eyebrow mb-4 block">Press Enquiries</span>
          <h2 className="font-display text-[clamp(24px,3.5vw,40px)] font-light text-mj-t1 mb-5">Get In <em className="italic text-mj-t4">Touch.</em></h2>
          <p className="text-[14px] text-mj-t3 font-light leading-relaxed mb-7">For interviews, features, campaign collaborations and media partnerships.</p>
          <div className="space-y-3">
            <div className="border-b border-mj-b1 pb-3"><p className="eyebrow mb-1">Press & Media</p><a href="mailto:press@martinsjohnson.com" className="text-[14px] text-mj-t2 hover:text-mj-t1 transition-colors">press@martinsjohnson.com</a></div>
            <div className="border-b border-mj-b1 pb-3"><p className="eyebrow mb-1">Partnerships</p><a href="mailto:partnerships@martinsjohnson.com" className="text-[14px] text-mj-t2 hover:text-mj-t1 transition-colors">partnerships@martinsjohnson.com</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
