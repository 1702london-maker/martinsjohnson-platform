'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductModal from '@/components/product/ProductModal'

const CATEGORIES = [
  { key: 'all',        label: 'All' },
  { key: 'oxford',     label: 'Oxford & Brogue' },
  { key: 'loafer',     label: 'Loafers' },
  { key: 'boot',       label: 'Boots' },
  { key: 'derby',      label: 'Derby' },
  { key: 'monkstrap',  label: 'Monkstrap' },
  { key: 'sneaker',    label: 'Sneakers' },
  { key: 'slipper',    label: 'Slippers' },
  { key: 'highheel',   label: 'High Heels' },
  { key: 'bag',        label: 'Bags' },
  { key: 'belt',       label: 'Belts' },
  { key: 'bracelet',   label: 'Bracelets' },
  { key: 'watch',      label: 'Watches' },
]

export default function ShopPage() {
  const [products, setProducts]    = useState([])
  const [loading,  setLoading]     = useState(true)
  const [category, setCategory]    = useState('all')
  const [selected, setSelected]    = useState(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '40' })
    if (category !== 'all') params.set('category', category)
    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category, gender])

  return (
    <div className="min-h-screen bg-mj-bg nav-offset">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-10 border-b border-mj-b1">
        <span className="eyebrow mb-3">Collection</span>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-display-sm font-normal text-mj-t1">
            Shop <em className="italic text-mj-t4">All</em>
          </h1>
          <p className="text-[12px] text-mj-t4 font-light">{products.length} pieces</p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 md:px-12 lg:px-20 py-5 border-b border-mj-b1 flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    className={`px-4 py-2 text-[10px] tracking-[0.14em] uppercase flex-shrink-0 font-medium border transition-all ${
              gender === g ? 'border-mj-t1 bg-mj-t1 text-mj-white' : 'border-mj-b1 text-mj-t4 hover:border-mj-b2'
            }`}>
            {g === 'all' ? 'All' : g.charAt(0).toUpperCase() + g.slice(1)}
          </button>
        ))}
        <div className="w-px bg-mj-b1 flex-shrink-0" />
        {/* Category */}
        {CATEGORIES.map(c => (
          <button key={c.key} onClick={() => setCategory(c.key)}
            className={`px-4 py-2 text-[10px] tracking-[0.12em] uppercase flex-shrink-0 font-medium border transition-all ${
              category === c.key ? 'border-mj-t1 bg-mj-t1 text-mj-white' : 'border-mj-b1 text-mj-t4 hover:border-mj-b2'
            }`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton" style={{ aspectRatio:'3/4' }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl font-light text-mj-t4 italic mb-3">No products found</p>
            <p className="text-[13px] text-mj-t5">Add your first product via Supabase dashboard</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="cursor-pointer group"
                onClick={() => setSelected(product)}
              >
                <div className="bg-mj-white border border-mj-b1 overflow-hidden mb-3 relative group-hover:border-mj-b2 group-hover:shadow-sm transition-all duration-500" style={{ aspectRatio:'3/4' }}>
                  {product.image_urls?.[0] ? (
                    <img src={product.image_urls[0]} alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-[1.04]" loading="lazy"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-mj-t5">
                      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                      </svg>
                    </div>
                  )}
                  {product.is_new_arrival && (
                    <span className="absolute top-2 left-2 bg-mj-t1 text-mj-white text-[8px] tracking-wider uppercase px-2 py-0.5 font-bold">New</span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-mj-t1/85 py-2.5 px-3 flex justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] tracking-wider uppercase text-mj-white font-bold">Configure</span>
                    <span className="text-mj-white/70">→</span>
                  </div>
                </div>
                <p className="eyebrow mb-1">{product.category}</p>
                <p className="text-[13px] font-normal text-mj-t3 group-hover:text-mj-t1 transition-colors mb-0.5">{product.name}</p>
                <p className="text-[12px] text-mj-t4">£{product.price?.toLocaleString('en-GB')}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
