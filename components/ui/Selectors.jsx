'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
          transition={{ duration: 0.18 }}
          className={`absolute top-full ${align === 'left' ? 'left-0' : 'right-0'} mt-1 min-w-[130px] bg-mj-bg2 border border-mj-b1 z-[300] py-1`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function CurrencySelector() {
  const { currency, setCurrency } = useGlobalStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  const cur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-mj-t4 hover:text-mj-t1 transition-colors py-1 px-2"
      >
        <span>{cur.symbol}</span>
        <span>{cur.code}</span>
        <svg className={`w-2.5 h-2.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 12 12">
          <path d="m2 4 4 4 4-4"/>
        </svg>
      </button>
      <Dropdown open={open}>
        {CURRENCIES.map(c => (
          <button
            key={c.code}
            onClick={() => { setCurrency(c.code); setOpen(false) }}
            className={`w-full text-left px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-colors ${currency === c.code ? 'text-mj-gold' : 'text-mj-t4 hover:text-mj-t1'}`}
          >
            {c.symbol} {c.code}
          </button>
        ))}
      </Dropdown>
    </div>
  )
}

export function LanguageSelector() {
  const { language, setLanguage } = useGlobalStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  const selectLanguage = (lang) => {
    setLanguage(lang.code)
    setOpen(false)
    // Set cookie so server re-renders with new locale
    document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000; SameSite=Lax`
    setLoading(true)
    router.refresh()
    setTimeout(() => setLoading(false), 800)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase text-mj-t3 hover:text-mj-t1 transition-colors py-1.5 px-2.5 border border-transparent hover:border-mj-b1"
      >
        <span className="text-[16px] leading-none">{current.flag}</span>
        <span className="font-medium">{current.label}</span>
        {loading ? (
          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        ) : (
          <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 12 12">
            <path d="m2 4 4 4 4-4"/>
          </svg>
        )}
      </button>
      <Dropdown open={open} align="right">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => selectLanguage(lang)}
            className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 transition-colors ${language === lang.code ? 'text-mj-gold bg-mj-bg3' : 'text-mj-t4 hover:text-mj-t1 hover:bg-mj-bg3'}`}
          >
            <span className="text-[15px] leading-none">{lang.flag}</span>
            <span className="text-[11px] tracking-[0.1em] uppercase font-medium">{lang.label}</span>
            {language === lang.code && (
              <svg className="w-3 h-3 ml-auto text-mj-gold" fill="currentColor" viewBox="0 0 12 12">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        ))}
      </Dropdown>
    </div>
  )
}
