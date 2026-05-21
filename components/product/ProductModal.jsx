'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import toast from 'react-hot-toast'

const COLOURS = [
  { id: 'midnight',  label: 'Midnight',  hex: '#1C1C1A' },
  { id: 'cognac',    label: 'Cognac',    hex: '#6B4226' },
  { id: 'burgundy',  label: 'Burgundy',  hex: '#5C1A2E' },
  { id: 'navy',      label: 'Navy',      hex: '#1B2D4A' },
  { id: 'forest',    label: 'Forest',    hex: '#28402A' },
  { id: 'slate',     label: 'Slate',     hex: '#6A6A68' },
  { id: 'champagne', label: 'Champagne', hex: '#D4C9B8' },
  { id: 'ivory',     label: 'Ivory',     hex: '#F0EDE8' },
  { id: 'tan',       label: 'Tan',       hex: '#B8742A' },
  { id: 'chocolate', label: 'Chocolate', hex: '#3D1C02' },
]

const LACE_COLOURS = [
  { id: 'black',    label: 'Black',    hex: '#1C1C1A' },
  { id: 'ivory',    label: 'Ivory',    hex: '#F0EDE8' },
  { id: 'tan',      label: 'Tan',      hex: '#6B4226' },
  { id: 'burgundy', label: 'Burgundy', hex: '#5C1A2E' },
  { id: 'navy',     label: 'Navy',     hex: '#1B2D4A' },
  { id: 'silver',   label: 'Silver',   hex: '#C8C8C8' },
  { id: 'white',    label: 'White',    hex: '#FAFAF8' },
  { id: 'none',     label: 'None',     hex: null },
]

const SOLE_OPTIONS = [
  { id: 'leather', label: 'Leather',              note: 'Classic',   priceAdj: 0  },
  { id: 'half',    label: 'Half Leather & Rubber', note: 'Versatile', priceAdj: 40 },
  { id: 'rubber',  label: 'Rubber',               note: 'Casual',    priceAdj: 40 },
]

const UK_SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12]

export default function ProductModal({ product, onClose }) {
  const addItem = useCartStore(s => s.addItem)

  const [colour,   setColour]   = useState(COLOURS[0])
  const [laceCol,  setLaceCol]  = useState(LACE_COLOURS[0])
  const [size,     setSize]     = useState(8)
  const [sole,     setSole]     = useState(SOLE_OPTIONS[0])
  const [initials, setInitials] = useState(['', '', ''])
  const [imgIdx,   setImgIdx]   = useState(0)
  const [adding,   setAdding]   = useState(false)

  const initialsStr = initials.join('').trim()
  const totalPrice  = (product?.price || 0) + sole.priceAdj + (initialsStr.length > 0 ? 75 : 0)
  const images      = product?.image_urls?.length > 0 ? product.image_urls : [null]

  useEffect(() => {
    setColour(COLOURS[0])
    setLaceCol(LACE_COLOURS[0])
    setSize(8)
    setSole(SOLE_OPTIONS[0])
    setInitials(['', '', ''])
    setImgIdx(0)
  }, [product?.id])

  function updateInitial(idx, val) {
    const v = val.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 1)
    setInitials(prev => { const n = [...prev]; n[idx] = v; return n })
  }

  async function handleAdd() {
    setAdding(true)
    await new Promise(r => setTimeout(r, 300))
    addItem({
      id:         product.id + '-' + colour.id + '-' + size + '-' + sole.id,
      productId:  product.id,
      name:       product.name,
      category:   product.category,
      price:      totalPrice,
      image:      images[0],
      variant:    colour.label + ' · UK ' + size + ' · ' + sole.label + (laceCol.id !== 'none' ? ' · ' + laceCol.label + ' laces' : '') + (initialsStr ? ' · "' + initialsStr + '"' : ''),
      colour:     colour.id,
      size,
      sole:       sole.id,
      laceColour: laceCol.id,
      initials:   initialsStr,
      qty:        1,
    })
    toast.success(product.name + ' added to bag')
    setAdding(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[680px] bg-mj-bg3 z-[70] overflow-y-auto"
          >
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
              <div className="space-y-3">
                <div className="relative aspect-square bg-mj-bg2 overflow-hidden">
                  {images[imgIdx] ? (
                    <Image key={imgIdx} src={images[imgIdx]} alt={product.name} fill className="object-cover" sizes="(max-width:768px) 100vw,340px" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                      <svg width="40" height="40" fill="none" stroke="#6A6A68" strokeWidth="1" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      </svg>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t5">Image coming soon</span>
                    </div>
                  )}
                </div>
                {images.length > 1 && images[0] !== null && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((url, i) => (
                      <button key={i} onClick={() => setImgIdx(i)} style={{ flexShrink:0, width:64, height:64, position:'relative', outline: i===imgIdx ? '2px solid #B9985A' : '1px solid transparent', outlineOffset:1 }}>
                        {url && <Image src={url} alt={'view '+(i+1)} fill className="object-cover" sizes="64px" />}
                      </button>
                    ))}
                  </div>
                )}
                <div className="pt-2 border-t border-mj-b1">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-mj-t4 mb-1">{product.category}</p>
                  <h2 className="text-xl font-display tracking-widest text-mj-t1 mb-1">{product.name}</h2>
                  <p className="text-sm text-mj-gold font-medium">
                    {'£' + totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    {sole.priceAdj > 0 && <span className="text-mj-t4 text-xs ml-2">{'+£'+sole.priceAdj+' sole'}</span>}
                    {initialsStr && <span className="text-mj-t4 text-xs ml-2">+£75 initials</span>}
                  </p>
                  {product.description && (
                    <p className="text-xs text-mj-t4 leading-relaxed mt-2 line-clamp-3">{product.description}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Leather Colour</span>
                    <span className="text-[11px] text-mj-t2 font-medium tracking-wide">{colour.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {COLOURS.map(c => (
                      <button key={c.id} onClick={() => setColour(c)} title={c.label}
                        style={{ backgroundColor:c.hex, width:28, height:28, borderRadius:'50%', border: colour.id===c.id ? '3px solid #B9985A' : '2px solid rgba(255,255,255,0.15)', outline: colour.id===c.id ? '2px solid #B9985A' : 'none', outlineOffset:3, cursor:'pointer', flexShrink:0 }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Lace Colour</span>
                    <span className="text-[11px] text-mj-t2 font-medium tracking-wide">{laceCol.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {LACE_COLOURS.map(c => (
                      <button key={c.id} onClick={() => setLaceCol(c)} title={c.label}
                        style={{
                          width:28, height:28, borderRadius:'50%', cursor:'pointer', flexShrink:0,
                          backgroundColor: c.hex || 'transparent',
                          border: laceCol.id===c.id ? '3px solid #B9985A' : '2px solid rgba(255,255,255,0.15)',
                          outline: laceCol.id===c.id ? '2px solid #B9985A' : 'none',
                          outlineOffset:3,
                          position: 'relative',
                          display: 'flex', alignItems:'center', justifyContent:'center',
                        }}
                      >
                        {c.id === 'none' && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={laceCol.id==='none' ? '#B9985A' : '#6A6A68'} strokeWidth="1.5">
                            <line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-mj-t5 mt-2">Select None if this style does not require laces.</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">UK Size</span>
                    <span className="text-[11px] text-mj-t2 font-medium tracking-wide">{'UK ' + size}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {UK_SIZES.map(s => (
                      <button key={s} onClick={() => setSize(s)} className="text-[10px] py-1.5 tracking-wide transition-colors"
                        style={{ border: size===s ? '1px solid #B9985A' : '1px solid rgba(255,255,255,0.1)', color: size===s ? '#B9985A' : 'inherit', background: size===s ? 'rgba(185,152,90,0.08)' : 'transparent' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Sole</span>
                  </div>
                  <div className="space-y-2">
                    {SOLE_OPTIONS.map(s => (
                      <button key={s.id} onClick={() => setSole(s)} className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors"
                        style={{ border: sole.id===s.id ? '1px solid #B9985A' : '1px solid rgba(255,255,255,0.08)', background: sole.id===s.id ? 'rgba(185,152,90,0.08)' : 'transparent' }}>
                        <div>
                          <span className="text-[11px] tracking-wide text-mj-t1 block">{s.label}</span>
                          <span className="text-[10px] text-mj-t4">{s.note}</span>
                        </div>
                        <span className="text-[11px] text-mj-t4">{s.priceAdj > 0 ? '+£'+s.priceAdj : 'Included'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-mj-t4 font-medium">Initials <span className="normal-case text-mj-t5">(optional · +£75)</span></span>
                  </div>
                  <div className="flex gap-2">
                    {initials.map((v, i) => (
                      <input key={i} value={v} onChange={e => updateInitial(i, e.target.value)} maxLength={1} placeholder={['F','M','L'][i]} className="w-10 h-10 text-center text-sm uppercase bg-transparent border border-mj-b1 text-mj-t1 focus:border-mj-gold outline-none transition-colors" />
                    ))}
                    <span className="text-[10px] text-mj-t5 self-center ml-1">First · Mid · Last</span>
                  </div>
                </div>

                <button onClick={handleAdd} disabled={adding} className="w-full py-4 text-[11px] tracking-[0.25em] uppercase font-medium transition-all disabled:opacity-50"
                  style={{ background:'#B9985A', color:'#121212' }}>
                  {adding ? 'Adding…' : 'Add to Bag — £' + totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                </button>

                <p className="text-[10px] text-mj-t5 text-center leading-relaxed">
                  All shoes are handcrafted to order. Dispatch 4–6 weeks.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}