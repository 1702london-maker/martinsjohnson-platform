'use client'
import { useState, useRef, useEffect } from 'react'
import { useGlobalStore, CURRENCIES, LANGUAGES } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

const dd = {
  hidden:  { opacity: 0, y: -6, scale: .98, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0,  scale: 1,   pointerEvents: 'auto' },
}

function Dropdown({ open, children, align = 'right' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={dd} initial="hidden" animate="visible" exit="hidden"
          transition={{ duration: 0.2, ease: [0.16,1,0.3,1] }}
          className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} bg-mj-bg3 border border-mj-b1 shadow-sm min-w-[160px] z-[200]`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function CurrencySelector({ dark = false }) {
  const { currency, setCurrency } = useGlobalStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const click = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', click)
    return () => document.removeEventListener('mousedown', click)
  }, [])

  const textCls = dark
    ? 'text-mj-dkt2 hover:text-mj-dkt1'
    : 'text-mj-t4 hover:text-mj-t1'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 text-[10px] tracking-[0.14em] uppercase font-medium transition-colors ${textCls}`}
      >
        {currency.symbol} {currency.code}
        <svg width="7" height="5" fill="none" viewBox="0 0 8 5" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      <Dropdown open={open}>
        {CURRENCIES.map(c => (
          <button key={c.code} onClick={() => { setCurrency(c); setOpen(false) }}
            className={`flex items-center justify-between w-full px-4 py-2.5 text-[11px] font-light border-b border-mj-b1 last:border-0 transition-colors hover:bg-mj-bg2 ${currency.code === c.code ? 'text-mj-t1 font-medium' : 'text-mj-t3'}`}>
            <span>{c.symbol} {c.code}</span>
            <span className="text-mj-t5 text-[10px]">{c.name.split(' ')[0]}</span>
          </button>
        ))}
      </Dropdown>
    </div>
  )
}

export function LanguageSelector({ dark = false }) {
  const { language, setLanguage } = useGlobalStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const click = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', click)
    return () => document.removeEventListener('mousedown', click)
  }, [])

  const textCls = dark
    ? 'text-mj-dkt2 hover:text-mj-dkt1'
    : 'text-mj-t4 hover:text-mj-t1'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 text-[10px] tracking-[0.14em] uppercase font-medium transition-colors ${textCls}`}
      >
        {language.code.toUpperCase()}
        <svg width="7" height="5" fill="none" viewBox="0 0 8 5" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      <Dropdown open={open} align="right">
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => { setLanguage(l); setOpen(false) }}
            className={`flex items-center justify-between w-full px-4 py-2.5 text-[11px] font-light border-b border-mj-b1 last:border-0 transition-colors hover:bg-mj-bg2 ${language.code === l.code ? 'text-mj-t1 font-medium' : 'text-mj-t3'}`}
            dir={l.dir}
          >
            <span>{l.label}</span>
            {l.dir === 'rtl' && <span className="text-[8px] text-mj-t5 tracking-wider uppercase">RTL</span>}
          </button>
        ))}
      </Dropdown>
    </div>
  )
}
