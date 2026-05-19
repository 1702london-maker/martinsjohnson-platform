'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ProductModal from '@/components/product/ProductModal'
import { CATEGORY_IMAGES, CATEGORY_PRICES } from '@/lib/utils'

const BAG_CATS = [
  { key: 'bag',         label: 'Bags & Luggage',        price: 1800 },
  { key: 'accessories', label: 'Leather Accessories',   price: 120 },
  { key: 'exotic',      label: 'Exotic Leathers',       price: 2200 },
]

export default function BagsSection({ products = [] }) {
  const [active, setActive] = useState(null)

  function open(catKey, label, price) {
    const match = products.find(p => p.category?.toLowerCase().includes(catKey))
    setActive({
      id:        match?.id    || `cat-${catKey}`,
      name:      match?.name  || label,
      slug:      catKey,
      category:  label,
      style:     catKey,
      price:     match?.price || price,
      image_urls: match?.image_urls?.length ? match.image_urls : [CATEGORY_IMAGES[catKey]],
    })
  }

  return (
    <>
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-mj-bg2 border-t border-mj-b1">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="eyebrow mb-3">Leather Goods</span>
            <h2 className="font-display text-display-sm font-normal text-mj-t1">
              Bags & <em className="italic text-mj-t4">Accessories</em>
            </h2>
          </div>
          <Link href="/bags" className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-light hidden md:flex">
            <span className="w-5 h-px bg-mj-b2" />View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {BAG_CATS.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16,1,0.3,1] }}
              className="group cursor-pointer"
              onClick={() => open(cat.key, cat.label, cat.price)}
            >
              <div
                className="bg-mj-card border border-mj-b1 overflow-hidden mb-3 relative group-hover:border-mj-b2 group-hover:shadow-md transition-all duration-500"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={CATEGORY_IMAGES[cat.key]}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.04]"
                  loading="lazy"
                  onError={e => { e.target.parentElement.style.background = '#E8E6E1'; e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mj-t1/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[9px] tracking-widest uppercase text-white font-bold">Explore →</span>
                </div>
              </div>
              <p className="eyebrow mb-1">{cat.label}</p>
              <p className="text-[11px] text-mj-t4 group-hover:text-mj-t2 transition-colors">from £{cat.price.toLocaleString('en-GB')}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </>
  )
}
