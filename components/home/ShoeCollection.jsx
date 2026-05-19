'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductModal from '@/components/product/ProductModal'
import { CATEGORY_IMAGES, CATEGORY_LABELS, CATEGORY_PRICES } from '@/lib/utils'

const CATEGORIES = [
  { key: 'oxford',    hasLaces: true  },
  { key: 'loafer',    hasLaces: false },
  { key: 'boot',      hasLaces: false },
  { key: 'derby',     hasLaces: true  },
  { key: 'monkstrap', hasLaces: false },
  { key: 'sneaker',   hasLaces: true  },
  { key: 'slipper',   hasLaces: false },
  { key: 'highheel',  hasLaces: false },
]

export default function ShoeCollection({ products = [] }) {
  const [activeProduct, setActiveProduct] = useState(null)
  const [activeFilter,  setActiveFilter]  = useState('all')
  const railRef = useRef(null)
  const scroll = dir => railRef.current?.scrollBy({ left: dir * 210, behavior: 'smooth' })

  function openProduct(catKey) {
    const match = products.find(p => p.category?.toLowerCase().includes(catKey))
    setActiveProduct({
      id:         match?.id         || `cat-${catKey}`,
      name:       match?.name       || CATEGORY_LABELS[catKey],
      slug:       match?.slug       || catKey,
      category:   CATEGORY_LABELS[catKey],
      style:      catKey,
      price:      match?.price      || CATEGORY_PRICES[catKey],
      image_urls: match?.image_urls?.length ? match.image_urls : [CATEGORY_IMAGES[catKey]],
    })
  }

  return (
    <>
      <section id="shoes" className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg3 border-t border-mj-b1">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="eyebrow mb-3">Footwear</span>
            <h2 className="font-display text-display-sm font-normal text-mj-t1">
              The Shoe <em className="italic text-mj-t4">Collection</em>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1.5">
              <button onClick={() => scroll(-1)} className="w-9 h-9 border border-mj-b2 text-mj-t4 flex items-center justify-center hover:border-mj-t2 hover:text-mj-t1 transition-all text-sm">←</button>
              <button onClick={() => scroll(1)}  className="w-9 h-9 border border-mj-b2 text-mj-t4 flex items-center justify-center hover:border-mj-t2 hover:text-mj-t1 transition-all text-sm">→</button>
            </div>
            <Link href="/shoes" className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-light">
              <span className="w-5 h-px bg-mj-b2" />View all
            </Link>
          </div>
        </div>

        <div ref={railRef} className="flex gap-0.5 overflow-x-auto pb-2" style={{ scrollbarWidth:'none' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.key}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-60px' }}
              transition={{ delay: i*0.07, duration:0.6, ease:[0.16,1,0.3,1] }}
              className="flex-shrink-0 w-[196px] cursor-pointer group"
              onClick={() => openProduct(cat.key)}
            >
              <div className="bg-mj-card border border-mj-b1 overflow-hidden mb-2.5 relative group-hover:border-mj-b2 group-hover:shadow-md transition-all duration-500" style={{ aspectRatio:'3/4' }}>
                <img
                  src={CATEGORY_IMAGES[cat.key]}
                  alt={CATEGORY_LABELS[cat.key]}
                  className="w-full h-full object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.05]"
                  loading="lazy"
                  onError={e => { e.target.parentElement.style.background='#E8E6E1'; e.target.style.display='none' }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mj-t1/60 to-transparent py-4 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-lux">
                  <span className="text-[9px] tracking-widest uppercase text-white font-bold">Configure →</span>
                </div>
                <span className="absolute top-2.5 right-2.5 bg-mj-t1 text-white text-[8px] tracking-wider uppercase px-2 py-0.5 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  £{CATEGORY_PRICES[cat.key].toLocaleString('en-GB')}+
                </span>
              </div>
              <p className="text-[9px] tracking-[0.18em] uppercase text-mj-t5 mb-0.5 font-medium">{CATEGORY_LABELS[cat.key]}</p>
              <p className="text-[11px] text-mj-t4 group-hover:text-mj-t2 transition-colors">from £{CATEGORY_PRICES[cat.key].toLocaleString('en-GB')}</p>
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-[196px] bg-mj-bg2 border border-mj-b1 flex items-center justify-center text-center p-6 cursor-pointer hover:border-mj-b2 hover:bg-mj-card transition-all duration-400 group"
            style={{ aspectRatio:'3/4' }} onClick={() => window.location.href='/bespoke'}>
            <div>
              <span className="eyebrow mb-3 block">Bespoke</span>
              <p className="font-display text-[16px] font-normal italic text-mj-t3 leading-relaxed mb-4">Commission<br/>your pair.</p>
              <p className="text-[9px] tracking-widest uppercase text-mj-t5 group-hover:text-mj-t2 transition-colors font-bold">→</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap mt-5">
          {['All','Oxford','Loafers','Boots','Derby','Monkstrap','Sneakers','Slippers','High Heels'].map((f, i) => (
            <button key={f} onClick={() => setActiveFilter(i===0?'all':f.toLowerCase())}
              className={`px-3.5 py-1.5 border text-[10px] tracking-[0.1em] uppercase transition-all font-medium ${
                (i===0&&activeFilter==='all')||activeFilter===f.toLowerCase()
                  ? 'border-mj-t2 text-mj-t1' : 'border-mj-b1 text-mj-t4 hover:border-mj-b2'
              }`}>{f}
            </button>
          ))}
        </div>
      </section>
      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  )
}
