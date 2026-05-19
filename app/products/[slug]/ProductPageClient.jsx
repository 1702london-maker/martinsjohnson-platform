'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { LACED_STYLES, formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

const COLOURS = [
  { id:'midnight', label:'Midnight', hex:'#1C1C1A' },
  { id:'cognac',   label:'Cognac',   hex:'#6B4226' },
  { id:'burgundy', label:'Burgundy', hex:'#5C1A2E' },
  { id:'navy',     label:'Navy',     hex:'#1B2D4A' },
  { id:'forest',   label:'Forest',   hex:'#28402A' },
  { id:'slate',    label:'Slate',    hex:'#6A6A68' },
  { id:'champagne',label:'Champagne',hex:'#D4C9B8' },
  { id:'ivory',    label:'Ivory',    hex:'#F0EDE8' },
]
const LACE_COLOURS = [
  { id:'black', label:'Black', hex:'#1C1C1A' },
  { id:'ivory', label:'Ivory', hex:'#F0EDE8' },
  { id:'tan',   label:'Tan',   hex:'#6B4226' },
  { id:'burg',  label:'Burgundy',hex:'#5C1A2E' },
]
const SOLE_OPTIONS = [
  { id:'leather',  label:'Leather',  note:'Standard',    priceAdj:0 },
  { id:'dainite',  label:'Dainite',  note:'Rubber grip', priceAdj:80 },
  { id:'commando', label:'Commando', note:'Heavy duty',  priceAdj:120 },
  { id:'rubber',   label:'Rubber',   note:'Casual',      priceAdj:40 },
]
const UK_SIZES = [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,12]

export default function ProductPageClient({ product }) {
  const addItem = useCartStore(s => s.addItem)
  const [imgIdx, setImgIdx]   = useState(0)
  const [colour, setColour]   = useState(COLOURS[0])
  const [lace,   setLace]     = useState(LACE_COLOURS[0])
  const [size,   setSize]     = useState(null)
  const [sole,   setSole]     = useState(SOLE_OPTIONS[0])
  const [inits,  setInits]    = useState(['','',''])
  const [adding, setAdding]   = useState(false)

  const isLaced    = LACED_STYLES.includes(product.style || product.category)
  const initialsStr = inits.join('').trim()
  const total = (product.price||0) + sole.priceAdj + (initialsStr.length>0?75:0)
  const images = product.image_urls?.length ? product.image_urls : ['/images/categories/oxford.jpg']

  function updateInit(i, v) {
    const n = [...inits]; n[i] = v.toUpperCase().replace(/[^A-Z]/g,'').slice(0,1); setInits(n)
  }

  async function addToBag() {
    if (!size) { toast.error('Please select a size'); return }
    setAdding(true)
    await new Promise(r=>setTimeout(r,300))
    addItem({
      id: `${product.id}-${colour.id}-${size}-${sole.id}`,
      productId: product.id,
      name:  product.name,
      category: product.category,
      price: total,
      image: images[0],
      variant: `${colour.label} · UK ${size} · ${sole.label} sole${initialsStr?` · "${initialsStr}"`: ''}`,
      colour: colour.id, size, sole: sole.id,
      laceColour: isLaced ? lace.id : null,
      initials: initialsStr,
      qty: 1,
    })
    toast.success(`${product.name} added to your bag`)
    setAdding(false)
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 py-4 border-b border-mj-b1 flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t5">
        <Link href="/" className="hover:text-mj-t2 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-mj-t2 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-mj-t2">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Images */}
        <div className="px-6 md:px-12 lg:px-14 py-10 border-b lg:border-b-0 lg:border-r border-mj-b1">
          <div className="bg-mj-white border border-mj-b1 overflow-hidden mb-4" style={{ aspectRatio:'4/5' }}>
            <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-contain p-8 transition-transform duration-700 hover:scale-[1.02]" />
          </div>
          <div className="flex gap-2">
            {images.map((img,i) => (
              <button key={i} onClick={()=>setImgIdx(i)}
                className={`w-16 h-20 border overflow-hidden flex-shrink-0 transition-all ${imgIdx===i?'border-mj-t2':'border-mj-b1 hover:border-mj-b2'}`}>
                <img src={img} alt="" className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Config */}
        <div className="px-6 md:px-12 lg:px-14 py-10 flex flex-col gap-6 overflow-y-auto">
          <div>
            <span className="eyebrow mb-2 block">{product.category}</span>
            <h1 className="font-display text-[clamp(24px,3vw,36px)] font-normal text-mj-t1 mb-2 leading-tight">{product.name}</h1>
            <p className="font-display text-[24px] font-light text-mj-t2">{formatPrice(total)}</p>
          </div>

          {product.description && <p className="text-[13px] text-mj-t4 font-light leading-relaxed">{product.description}</p>}

          <div className="h-px bg-mj-b1" />

          {/* Colour */}
          <div>
            <div className="flex justify-between mb-3"><span className="eyebrow">Colour</span><span className="text-[11px] text-mj-t3">{colour.label}</span></div>
            <div className="flex gap-2 flex-wrap">
              {COLOURS.map(c=>(
                <button key={c.id} onClick={()=>setColour(c)} title={c.label}
                  className={`w-6 h-6 rounded-full flex-shrink-0 transition-all ${colour.id===c.id?'ring-2 ring-offset-2 ring-mj-t1 ring-offset-mj-bg3 scale-110':'ring-1 ring-mj-b2 hover:scale-105'}`}
                  style={{ background:c.hex }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex justify-between mb-3"><span className="eyebrow">UK Size</span><button className="text-[10px] text-mj-t4 underline">Size guide</button></div>
            <div className="grid grid-cols-7 gap-1">
              {UK_SIZES.map(s=>(
                <button key={s} onClick={()=>setSize(s)}
                  className={`py-2.5 text-[11px] border font-medium transition-all ${size===s?'border-mj-t1 bg-mj-t1 text-mj-white':'border-mj-b1 text-mj-t3 hover:border-mj-t3'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Lace — laced styles only */}
          {isLaced && (
            <div>
              <div className="flex justify-between mb-3"><span className="eyebrow">Lace Colour</span><span className="text-[11px] text-mj-t3">{lace.label}</span></div>
              <div className="flex gap-2">
                {LACE_COLOURS.map(c=>(
                  <button key={c.id} onClick={()=>setLace(c)} title={c.label}
                    className={`w-6 h-6 rounded-full border flex-shrink-0 transition-all ${lace.id===c.id?'ring-2 ring-offset-2 ring-mj-t1 scale-110':'ring-1 ring-mj-b2 hover:scale-105'}`}
                    style={{ background:c.hex }} />
                ))}
              </div>
            </div>
          )}

          <div className="h-px bg-mj-b1" />

          {/* Sole */}
          <div>
            <span className="eyebrow mb-3 block">Sole</span>
            <div className="flex flex-wrap gap-2">
              {SOLE_OPTIONS.map(s=>(
                <button key={s.id} onClick={()=>setSole(s)}
                  className={`px-3.5 py-2 border text-[10px] font-medium transition-all ${sole.id===s.id?'border-mj-t1 bg-mj-t1 text-mj-white':'border-mj-b1 text-mj-t3 hover:border-mj-t3'}`}>
                  {s.label}{s.priceAdj>0?` +£${s.priceAdj}`:''}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-mj-b1" />

          {/* Initials */}
          <div>
            <div className="flex justify-between mb-3"><span className="eyebrow">Initials</span><span className="text-[10px] text-mj-t5">{initialsStr.length>0?'+£75 · gold embossed':'Optional · max 3 · +£75'}</span></div>
            <div className="flex gap-2">
              {[0,1,2].map(i=>(
                <input key={i} type="text" maxLength={1} value={inits[i]} onChange={e=>updateInit(i,e.target.value)}
                  placeholder={['M','J','L'][i]}
                  className="flex-1 h-12 text-center font-display text-xl text-mj-t1 bg-mj-white border border-mj-b1 focus:border-mj-t1 outline-none tracking-widest uppercase transition-colors placeholder-mj-t5" />
              ))}
            </div>
          </div>

          {/* Add to bag */}
          <button onClick={addToBag} disabled={adding}
            className="btn-solid w-full justify-center py-4 disabled:opacity-50">
            {adding ? 'Adding…' : `Add to Bag — ${formatPrice(total)}`}
          </button>

          <p className="text-[10px] text-mj-t5 text-center">Free UK delivery · 14-day returns · Handcrafted to order</p>
        </div>
      </div>
    </div>
  )
}
