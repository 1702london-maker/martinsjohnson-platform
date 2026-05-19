'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

/* ── Config data ── */
const COLOURS = [
  { id: 'midnight',  label: 'Midnight',  hex: '#1C1C1A' },
  { id: 'cognac',    label: 'Cognac',    hex: '#6B4226' },
  { id: 'burgundy',  label: 'Burgundy',  hex: '#5C1A2E' },
  { id: 'navy',      label: 'Navy',      hex: '#1B2D4A' },
  { id: 'forest',    label: 'Forest',    hex: '#28402A' },
  { id: 'slate',     label: 'Slate',     hex: '#6A6A68' },
  { id: 'champagne', label: 'Champagne', hex: '#D4C9B8' },
  { id: 'ivory',     label: 'Ivory',     hex: '#F0EDE8' },
]

const LACE_COLOURS = [
  { id: 'black',    label: 'Black',    hex: '#1C1C1A' },
  { id: 'ivory',    label: 'Ivory',    hex: '#F0EDE8' },
  { id: 'tan',      label: 'Tan',      hex: '#6B4226' },
  { id: 'burgundy', label: 'Burgundy', hex: '#5C1A2E' },
  { id: 'silver',   label: 'Silver',   hex: '#C8C8C8' },
  { id: 'white',    label: 'White',    hex: '#FAFAF8' },
]

const SOLE_OPTIONS = [
  { id: 'leather',  label: 'Leather',  note: 'Standard',    priceAdj: 0 },
  { id: 'dainite',  label: 'Dainite',  note: 'Rubber grip', priceAdj: 80 },
  { id: 'commando', label: 'Commando', note: 'Heavy duty',  priceAdj: 120 },
  { id: 'rubber',   label: 'Rubber',   note: 'Casual',      priceAdj: 40 },
]

const UK_SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12]

const LACED_STYLES = ['oxford', 'derby', 'sneaker'] // show lace colour only for these

export default function ProductModal({ product, onClose }) {
  const addItem = useCartStore(s => s.addItem)

  const [colour,    setColour]    = useState(COLOURS[0])
  const [laceCol,   setLaceCol]   = useState(LACE_COLOURS[0])
  const [size,      setSize]      = useState(8)
  const [sole,      setSole]      = useState(SOLE_OPTIONS[0])
  const [initials,  setInitials]  = useState(['', '', ''])
  const [imgIdx,    setImgIdx]    = useState(0)
  const [adding,    setAdding]    = useState(false)

  const styleKey   = product?.style || product?.category
  const isLaced    = styleKey && LACED_STYLES.includes(styleKey)
  const initialsStr = initials.join('').trim()
  const totalPrice  = (product?.price || 0) + sole.priceAdj + (initialsStr.length > 0 ? 75 : 0)

  const images = product?.image_urls?.length > 0
    ? product.image_urls
    : [null]

  function updateInitial(idx, val) {
    const v = val.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 1)
    setInitials(prev => { const n = [...prev]; n[idx] = v; return n })
  }

  async function handleAdd() {
    setAdding(true)
    await new Promise(r => setTimeout(r, 300))
    addItem({
      id:       `${product.id}-${colour.id}-${size}-${sole.id}`,
      productId: product.id,
      name:     product.name,
      category: product.category,
      price:    totalPrice,
      image:    images[0],
      variant:  `${colour.label} · UK ${size} · ${sole.label} sole${initialsStr ? ` · "${initialsStr}"` : ''}`,
      colour:   colour.id,
      size,
      sole:     sole.id,
      laceColour: isLaced ? laceCol.id : null,
      initials:  initialsStr,
      qty: 1,
    })
    toast.success(`${product.name} added to bag`)
    setAdding(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-mj-t1/50 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16,1,0.3,1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[680px] bg-mj-bg3 z-[70] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-mj-bg3 border-b border-mj-b1 px-8 py-4 flex justify-between items-center z-10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Configure Your Pair</span>
              <button onClick={onClose} className="flex items-center gap-2 text-mj-t4 hover:text-mj-t1 transition-colors text-[10px] tracking-widest uppercase font-medium">
                Close
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* ── IMAGE COLUMN ── */}
              <div>
                {/* Main image */}
                <div className="bg-mj-white border border-mj-b1 overflow-hidden mb-3 flex items-center justify-center" style={{ aspectRatio:'3/4' }}>
                  {images[imgIdx] ? (
                    <img
                      src={images[imgIdx]}
                      alt={product.name}
                      className="w-full h-full object-contain p-6"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-mj-t5">
                      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                      </svg>
                      <p className="text-[10px] tracking-wider uppercase text-center">Product image<br/>uploaded via Supabase Storage</p>
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-14 h-16 bg-mj-white border overflow-hidden flex-shrink-0 transition-all ${
                        imgIdx === i ? 'border-mj-t2' : 'border-mj-b1 hover:border-mj-b2'
                      }`}
                    >
                      {img && <img src={img} alt="" className="w-full h-full object-contain p-1"/>}
                    </button>
                  ))}
                  {/* Add image slot */}
                  <div className="w-14 h-16 bg-mj-bg2 border border-mj-b1 border-dashed flex items-center justify-center text-mj-t5 text-lg flex-shrink-0">+</div>
                </div>
              </div>

              {/* ── CONFIG COLUMN ── */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="eyebrow mb-1">{product.category}</p>
                  <h2 className="font-display text-2xl font-normal text-mj-t1 leading-tight mb-1">{product.name}</h2>
                  <p className="font-display text-[22px] font-light text-mj-t2">
                    £{totalPrice.toLocaleString('en-GB')}
                    <span className="text-[12px] text-mj-t4 ml-2 font-sans font-light">from</span>
                  </p>
                </div>

                <div className="h-px bg-mj-b1" />

                {/* COLOUR */}
                <div>
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Colour</span>
                    <span className="text-[11px] text-mj-t3 font-light">{colour.label}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {COLOURS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setColour(c)}
                        title={c.label}
                        className={`w-[22px] h-[22px] rounded-full transition-all flex-shrink-0 ${
                          colour.id === c.id
                            ? 'ring-2 ring-offset-2 ring-mj-t1 ring-offset-mj-bg3 scale-110'
                            : 'ring-1 ring-mj-b2 hover:scale-105'
                        }`}
                        style={{ background: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* SIZE */}
                <div>
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">UK Size</span>
                    <button className="text-[10px] text-mj-t4 underline underline-offset-2">Size guide</button>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {UK_SIZES.map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-2 text-[11px] border transition-all duration-200 font-medium ${
                          size === s
                            ? 'border-mj-t1 bg-mj-t1 text-mj-white'
                            : 'border-mj-b1 text-mj-t3 hover:border-mj-t3'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LACE COLOUR — only for laced styles */}
                {isLaced && (
                  <div>
                    <div className="flex justify-between mb-2.5">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Lace Colour</span>
                      <span className="text-[11px] text-mj-t3 font-light">{laceCol.label}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {LACE_COLOURS.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setLaceCol(c)}
                          title={c.label}
                          className={`w-[22px] h-[22px] rounded-full transition-all flex-shrink-0 border ${
                            laceCol.id === c.id
                              ? 'ring-2 ring-offset-2 ring-mj-t1 ring-offset-mj-bg3 scale-110 border-mj-b2'
                              : 'ring-1 ring-mj-b2 hover:scale-105 border-transparent'
                          }`}
                          style={{ background: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="h-px bg-mj-b1" />

                {/* SOLE */}
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium block mb-2.5">Sole</span>
                  <div className="flex flex-wrap gap-2">
                    {SOLE_OPTIONS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSole(s)}
                        className={`px-3 py-2 border text-[10px] transition-all duration-200 font-medium ${
                          sole.id === s.id
                            ? 'border-mj-t1 bg-mj-t1 text-mj-white'
                            : 'border-mj-b1 text-mj-t3 hover:border-mj-t3'
                        }`}
                      >
                        {s.label}
                        {s.priceAdj > 0 && (
                          <span className={`ml-1 text-[9px] ${sole.id === s.id ? 'text-mj-white/70' : 'text-mj-t5'}`}>
                            +£{s.priceAdj}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-mj-b1" />

                {/* INITIALS */}
                <div>
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">
                      Initials
                    </span>
                    <span className="text-[10px] text-mj-t5 font-light">
                      {initialsStr.length > 0 ? '+£75 · hand-embossed' : 'Optional · max 3 · +£75'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[0,1,2].map(i => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={initials[i]}
                        onChange={e => updateInitial(i, e.target.value)}
                        placeholder={['M','J','L'][i]}
                        className="flex-1 h-12 text-center font-display text-xl font-normal text-mj-t1 bg-mj-white border border-mj-b1 focus:border-mj-t1 outline-none transition-colors uppercase tracking-widest placeholder:text-mj-t5"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-mj-t5 mt-2 font-light">
                    Gold foil embossing inside the lining · 8–10 week lead time
                  </p>
                </div>

                {/* ADD TO BAG */}
                <button
                  onClick={handleAdd}
                  disabled={adding}
                  className="w-full py-4 bg-mj-t1 text-mj-white text-[10px] tracking-[0.22em] uppercase font-bold hover:bg-mj-t2 transition-colors disabled:opacity-60 mt-2"
                >
                  {adding ? 'Adding…' : `Add to Bag — £${totalPrice.toLocaleString('en-GB')}`}
                </button>

                <p className="text-[10px] text-mj-t5 text-center font-light">
                  Free UK delivery · 14-day returns · Handcrafted to order
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
