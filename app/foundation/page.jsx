'use client'
export const dynamic = 'force-dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-dk1 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{backgroundImage:'repeating-linear-gradient(90deg,transparent,transparent calc(100%/6 - 1px),rgba(255,255,255,.015) calc(100%/6))'}}/>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="relative z-10">
          <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-bold block mb-5">Social Responsibility</span>
          <h1 className="font-display font-light text-white/90 leading-[0.92] tracking-tight mb-8" style={{fontSize:'clamp(52px,9vw,110px)'}}>
            Luxury With<br /><em className="italic text-white/35">Purpose.</em>
          </h1>
          <p className="text-[15px] text-white/50 font-light max-w-xl leading-relaxed">The Martins Johnson Foundation operates across Nigeria and the United Kingdom — building pathways for young people through education, culture, craft, and technology.</p>
        </motion.div>
      </div>

      {/* Foundation overview */}
      <div className="px-6 md:px-14 lg:px-20 py-20 border-b border-mj-b1 bg-mj-bg2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="eyebrow mb-5 block">The Martins Johnson Foundation</span>
            <h2 className="font-display text-[clamp(26px,4vw,48px)] font-light text-mj-t1 mb-6 leading-tight">
              Building Futures.<br /><em className="italic text-mj-t4">Across Borders.</em>
            </h2>
            <p className="text-[15px] text-mj-t3 font-light leading-relaxed mb-6">
              The Foundation was established to ensure that the commercial success of Martins Johnson creates measurable, lasting impact in the communities that inspired it. Operating across Nigeria and the United Kingdom, we focus on the young people who need the most support — and the least sympathy.
            </p>
            <p className="text-[15px] text-mj-t3 font-light leading-relaxed mb-8">
              We do not offer charity. We offer opportunity, skill, and the infrastructure for young people to build something permanent.
            </p>
            <div className="grid grid-cols-2 border border-mj-b1">
              {[['UK Programmes','Knife on Leather, Craft Education, Tech Pathways'],['Nigeria Programmes','Youth Mentoring, Education Support, Creative Development']].map(([t,d])=>(
                <div key={t} className="px-5 py-5 border-r border-mj-b1 last:border-0">
                  <p className="text-[10px] tracking-widest uppercase text-mj-t4 font-bold mb-2">{t}</p>
                  <p className="text-[11px] text-mj-t4 font-light leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              {title:'Youth Mentoring',       desc:'Structured 1-to-1 and group mentoring connecting young people with professionals across industry, arts, and entrepreneurship.'},
              {title:'Education Support',     desc:'School-level intervention programmes providing academic support, career guidance, and scholarship access.'},
              {title:'Creative Development',  desc:'Arts, craft, photography, film and design programmes that build creative identity and commercial skills simultaneously.'},
              {title:'Technology Access',     desc:'Coding bootcamps, digital literacy training, and hardware access programmes in underserved communities.'},
              {title:'Entrepreneurship',      desc:'Business fundamentals, financial literacy, and incubation support for young founders aged 16–30.'},
            ].map(item=>(
              <div key={item.title} className="border border-mj-b1 p-6 hover:bg-mj-bg3 transition-colors">
                <p className="font-display text-[16px] font-normal text-mj-t1 mb-2">{item.title}</p>
                <p className="text-[12px] text-mj-t4 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported by */}
      <div className="px-6 md:px-14 lg:px-20 py-16 border-b border-mj-b1">
        <span className="eyebrow mb-5 block">Supported By</span>
        <p className="text-[15px] text-mj-t3 font-light max-w-2xl leading-relaxed mb-10">
          The Foundation is largely supported through the commercial operations of 1702London, Budruum Limited, and selected partners who share the vision of luxury as a platform for social change.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {[
            {name:'1702London',        role:'Commercial Partner',   desc:'Ready-to-wear revenue funds programmes directly.'},
            {name:'Budruum Limited',   role:'Technology Partner',   desc:'Technology, operations and programme infrastructure.'},
            {name:'Selected Partners', role:'Corporate Partners',   desc:'Luxury brands and individuals who believe in this mission.'},
          ].map(org=>(
            <div key={org.name} className="border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 p-8 hover:bg-mj-bg2 transition-colors">
              <p className="eyebrow mb-2">{org.role}</p>
              <p className="font-display text-[20px] font-normal text-mj-t1 mb-3">{org.name}</p>
              <p className="text-[12px] text-mj-t4 font-light">{org.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-14 lg:px-20 py-16 text-center bg-mj-bg2">
        <p className="font-display text-[clamp(24px,4vw,52px)] font-light text-mj-t1 mb-5">Every Purchase. <em className="italic text-mj-t4">Every Impact.</em></p>
        <p className="text-[14px] text-mj-t4 font-light max-w-md mx-auto mb-10">When you buy from Martins Johnson, you are funding this work. Not indirectly. Directly.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/shop" className="btn-solid">Shop the Collection →</Link>
          <Link href="/knife-on-leather" className="btn-outline">Our Campaign →</Link>
        </div>
      </div>
    </div>
  )
}
