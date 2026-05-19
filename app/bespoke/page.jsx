import Link from 'next/link'
import { CATEGORY_IMAGES } from '@/lib/utils'

export const metadata = { title: 'Bespoke Atelier — Martins Johnson' }

export default function BespokePage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        <div className="px-6 md:px-14 lg:px-20 py-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-mj-b1">
          <span className="eyebrow mb-5 block">The Atelier</span>
          <h1 className="font-display text-display-md font-light text-mj-t1 mb-6 leading-tight">
            Your Vision.<br /><em className="italic text-mj-t4">Our Craft.</em>
          </h1>
          <p className="text-[15px] text-mj-t3 font-light leading-relaxed max-w-md mb-10">
            Every bespoke piece is a collaboration between your imagination and our craftsmanship. From the leather selection to the last stitch — configured entirely for you.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/bespoke/shoes" className="btn-solid">Bespoke Shoes</Link>
            <Link href="/bespoke/bags"  className="btn-outline">Bespoke Bags</Link>
            <Link href="/book?type=bespoke-shoes" className="btn-outline">Book a Consultation</Link>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-[40vh] lg:min-h-0">
          <img src="/images/categories/bespoke.jpg" alt="Bespoke Atelier" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Process */}
      <div className="px-6 md:px-12 lg:px-20 py-20 border-t border-mj-b1">
        <div className="mb-14">
          <span className="eyebrow mb-3 block">The Process</span>
          <h2 className="font-display text-display-sm font-normal text-mj-t1">Four <em className="italic text-mj-t4">Steps</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-mj-b1">
          {[
            { n:'01', t:'Choose Your Style',    d:'Oxford, Derby, Chelsea boot, Loafer — or come with a completely original design.' },
            { n:'02', t:'Select Your Leather',  d:'Box calf, full-grain suede, patent leather, exotic skins. Over 60 options.' },
            { n:'03', t:'Personalise',           d:'Initials (up to 3 chars, gold embossed), lining colour, hardware, sole type.' },
            { n:'04', t:'Crafted and Delivered', d:'8–10 weeks. Delivered in a signature Martins Johnson box with care kit.' },
          ].map(s => (
            <div key={s.n} className="p-8 border-b sm:border-b-0 sm:border-r border-mj-b1 last:border-0 hover:bg-mj-bg2 transition-colors">
              <span className="font-display text-[11px] text-mj-t5 mb-5 block">{s.n}</span>
              <p className="text-[15px] font-medium text-mj-t2 mb-2.5">{s.t}</p>
              <p className="text-[13px] text-mj-t4 font-light leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-mj-b1">
        <Link href="/bespoke/shoes" className="group relative overflow-hidden min-h-[320px] border-r border-mj-b1">
          <img src="/images/categories/oxford.jpg" alt="Bespoke Shoes" className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-lux" />
          <div className="absolute inset-0 bg-mj-t1/40 group-hover:bg-mj-t1/50 transition-colors" />
          <div className="absolute bottom-8 left-8">
            <p className="eyebrow text-white/60 mb-2">Commission</p>
            <p className="font-display text-[28px] font-light text-white">Bespoke Shoes →</p>
          </div>
        </Link>
        <Link href="/bespoke/bags" className="group relative overflow-hidden min-h-[320px]">
          <img src="/images/categories/bag.jpg" alt="Bespoke Bags" className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-lux" />
          <div className="absolute inset-0 bg-mj-t1/40 group-hover:bg-mj-t1/50 transition-colors" />
          <div className="absolute bottom-8 left-8">
            <p className="eyebrow text-white/60 mb-2">Commission</p>
            <p className="font-display text-[28px] font-light text-white">Bespoke Bags →</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
