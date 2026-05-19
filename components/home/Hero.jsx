'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const WORDS = ['LEGACY', 'CRAFT', 'VISION', 'CULTURE', 'PURPOSE']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const heroRef = useRef(null)

  // Cycle display word
  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length)
        setWordVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  // Subtle parallax on hero image
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('hero-visual-img')
      if (el) el.style.transform = `translateY(${window.scrollY * 0.08}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative grid grid-cols-1 lg:grid-cols-[55%_45%] overflow-hidden bg-mj-bg3"
      style={{ minHeight: '100vh', paddingTop: 'var(--nav-h)' }}
    >
      {/* ── LEFT: Text content ── */}
      <div className="flex flex-col justify-center px-6 md:px-14 lg:px-20 py-20 relative z-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="flex items-center gap-4 mb-9"
        >
          <div className="w-7 h-px bg-mj-b2" />
          <span className="eyebrow">Luxury · Craft · Legacy</span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-display font-light text-mj-t1 leading-[0.93] tracking-tight mb-8" style={{ fontSize: 'clamp(52px,7.5vw,100px)' }}>
          {['Crafting', null, 'Through Luxury.'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.46 + i * 0.12, duration: 0.9, ease: [0.16,1,0.3,1] }}
              >
                {line === null ? (
                  <em
                    className="italic text-mj-t4 transition-all duration-300"
                    style={{ opacity: wordVisible ? 1 : 0, transform: wordVisible ? 'none' : 'translateY(-8px)' }}
                  >
                    {WORDS[wordIdx]}
                  </em>
                ) : line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16,1,0.3,1] }}
          className="text-[13.5px] text-mj-t4 max-w-[380px] leading-relaxed mb-12 font-light"
        >
          Luxury creative director. Leatherpreneur. Strategist. Philanthropist. Cultural innovator. Where African heritage meets bespoke craft and global influence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16,1,0.3,1] }}
          className="flex items-center gap-7 flex-wrap"
        >
          <Link href="/shop" className="btn-solid">
            <span>Explore Collection</span>
            <span className="text-base">→</span>
          </Link>
          <Link href="/bespoke" className="flex items-center gap-2.5 text-[10px] tracking-[0.18em] uppercase text-mj-t4 hover:text-mj-t1 transition-all duration-300 group font-light">
            <span className="w-6 h-px bg-mj-b2 group-hover:w-9 transition-all duration-300" />
            Bespoke Atelier
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="absolute bottom-10 left-6 md:left-20 flex items-center gap-3"
        >
          <div className="w-9 h-px bg-mj-b2" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
          <span className="text-[9px] tracking-[0.22em] uppercase text-mj-t5">Scroll</span>
        </motion.div>
      </div>

      {/* ── RIGHT: Product image ── */}
      <div className="relative overflow-hidden bg-mj-bg2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.4, ease: [0.16,1,0.3,1] }}
          className="w-full h-full"
        >
          {/* Replace with your hero image — ideally an editorial lifestyle or clean product shot */}
          <img
            id="hero-visual-img"
            src="/images/categories/oxford.jpg"
            alt="Martins Johnson — Signature Collection"
            className="w-full h-full object-cover object-center"
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* Fallback if image missing */}
          <div className="absolute inset-0 flex items-end p-10 pointer-events-none">
            <p className="font-display text-[80px] font-light text-mj-b1/40 leading-none tracking-tight select-none">MJ</p>
          </div>
        </motion.div>
        <div className="absolute bottom-6 right-6 z-10">
          <p className="text-[9px] tracking-[0.18em] uppercase text-mj-t5 font-display italic">Signature Collection · 2025</p>
        </div>
      </div>
    </section>
  )
}
