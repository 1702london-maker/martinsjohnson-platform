'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { CurrencySelector, LanguageSelector } from '@/components/ui/Selectors'

const MJ_COLLECTION = [
  { label:'Bespoke Shoes',      href:'/bespoke/shoes' },
  { label:'Bags',               href:'/shop/bags' },
  { label:'Leather Goods',      href:'/shop/leather-goods' },
  { label:'Bracelets',          href:'/shop/bracelets' },
  { label:'Atelier Exclusives', href:'/shop?filter=exclusive' },
]

const COLLECTION_1702 = [
  { label:'Ready-to-Wear',  href:'/1702' },
  { label:'1702 Shoes',     href:'/1702/shoes' },
  { label:'Watches',        href:'/1702/watches' },
  { label:'Bracelets',      href:'/1702/bracelets' },
  { label:'Accessories',    href:'/1702/accessories' },
  { label:'Capsule Drops',  href:'/1702/drops' },
]

const BESPOKE_DD = [
  { label:'Bespoke Shoes',           href:'/bespoke/shoes' },
  { label:'Bespoke Bags',            href:'/bespoke/bags' },
  { label:'Virtual Consultation',    href:'/book?type=virtual' },
  { label:'Digital Fitting',         href:'/book?type=digital-fitting' },
  { label:'Remote Bespoke Session',  href:'/book?type=remote-bespoke' },
  { label:'Partnership Meeting',     href:'/book?type=partnership' },
]

const NAV = [
  { label:'Shop',         href:'/shop',         megamenu:true },
  { label:'Bespoke',      href:'/bespoke',      dropdown:BESPOKE_DD },
  { label:'Join The Club',href:'/join-the-club' },
  { label:'The Vision',   href:'/the-vision' },
  { label:'Journal',      href:'/journal' },
  { label:'Affiliates',   href:'/affiliates' },
  { label:'Careers',      href:'/careers' },
]

const drop = {
  hidden:  { opacity:0, y:-8, pointerEvents:'none' },
  visible: { opacity:1, y:0,  pointerEvents:'auto' },
}

export default function Navigation() {
  const [scrolled,   setScrolled]   = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount   = useCartStore(s => s.items.reduce((n,i)=>n+i.qty,0))
  const setCartOpen = useCartStore(s => s.setOpen)
  const timer = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const enter = k  => { clearTimeout(timer.current); setActiveMenu(k) }
  const leave = () => { timer.current = setTimeout(() => setActiveMenu(null), 180) }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?'bg-mj-bg3/96 backdrop-blur-xl border-b border-mj-b1':'bg-transparent'}`} style={{height:'80px'}}>
        <div className="flex items-center h-full px-6 md:px-10 lg:px-14">

          <Link href="/" className="flex-shrink-0 select-none mr-10" aria-label="1702 London Home">
            <img src="/images/logo.png" alt="1702 London" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {NAV.map(link => (
              <div key={link.label} className="relative"
                onMouseEnter={() => (link.dropdown||link.megamenu) ? enter(link.label) : null}
                onMouseLeave={() => (link.dropdown||link.megamenu) ? leave() : null}
              >
                <Link href={link.href}
                  className={`flex items-center gap-1 text-[11px] tracking-[0.14em] uppercase font-normal transition-colors py-2 whitespace-nowrap ${activeMenu===link.label?'text-mj-t1':'text-mj-t4 hover:text-mj-t1'}`}>
                  {link.label}
                  {(link.dropdown||link.megamenu) && (
                    <svg width="7" height="5" fill="none" viewBox="0 0 8 5" className={`transition-transform duration-200 ${activeMenu===link.label?'rotate-180':''}`}>
                      <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  )}
                </Link>

                {/* SHOP mega menu */}
                {link.megamenu && (
                  <AnimatePresence>
                    {activeMenu===link.label && (
                      <motion.div variants={drop} initial="hidden" animate="visible" exit="hidden"
                        transition={{duration:.2,ease:[0.16,1,0.3,1]}}
                        onMouseEnter={() => enter(link.label)} onMouseLeave={leave}
                        className="absolute top-full left-0 mt-1 bg-mj-bg3 border border-mj-b1 shadow-sm z-50 w-[480px]">
                        <div className="grid grid-cols-2">
                          <div className="border-r border-mj-b1 p-5">
                            <p className="text-[9px] tracking-[0.24em] uppercase text-mj-t5 font-bold mb-4">Martins Johnson</p>
                            {MJ_COLLECTION.map(i=>(
                              <Link key={i.href} href={i.href} className="block py-2 text-[12px] font-light text-mj-t3 hover:text-mj-t1 hover:pl-1 transition-all border-b border-mj-b1/50 last:border-0">{i.label}</Link>
                            ))}
                          </div>
                          <div className="p-5">
                            <p className="text-[9px] tracking-[0.24em] uppercase text-mj-t5 font-bold mb-4">The 1702 Collection</p>
                            {COLLECTION_1702.map(i=>(
                              <Link key={i.href} href={i.href} className="block py-2 text-[12px] font-light text-mj-t3 hover:text-mj-t1 hover:pl-1 transition-all border-b border-mj-b1/50 last:border-0">{i.label}</Link>
                            ))}
                          </div>
                        </div>
                        <div className="border-t border-mj-b1 px-5 py-3 flex justify-between">
                          <Link href="/shop" className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">View All →</Link>
                          <Link href="/bespoke" className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">Commission Bespoke →</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Standard dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeMenu===link.label && (
                      <motion.div variants={drop} initial="hidden" animate="visible" exit="hidden"
                        transition={{duration:.2,ease:[0.16,1,0.3,1]}}
                        onMouseEnter={() => enter(link.label)} onMouseLeave={leave}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-mj-bg3 border border-mj-b1 shadow-sm min-w-[240px] z-50">
                        {link.dropdown.map(item=>(
                          <Link key={item.href} href={item.href}
                            className="block px-5 py-3 text-[12px] font-light text-mj-t3 hover:text-mj-t1 hover:bg-mj-bg2 border-b border-mj-b1 last:border-0 transition-all">
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-4 lg:gap-5">
            <div className="hidden lg:flex items-center gap-4 border-r border-mj-b1 pr-4 mr-1">
              <LanguageSelector /><CurrencySelector />
            </div>
            <Link href="/book" className="hidden lg:block px-5 py-2.5 border border-mj-b2 text-[10px] tracking-[0.14em] uppercase text-mj-t3 hover:border-mj-t2 hover:text-mj-t1 transition-all font-normal whitespace-nowrap">
              Book Appointment
            </Link>
            <Link href="/wishlist" className="hidden md:flex relative text-mj-t4 hover:text-mj-t1 transition-colors" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </Link>
            <Link href="/login" className="hidden md:flex text-mj-t4 hover:text-mj-t1 transition-colors" aria-label="Account">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
            <button onClick={()=>setCartOpen(true)} className="relative text-mj-t4 hover:text-mj-t1 transition-colors flex" aria-label="Bag">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/></svg>
              {cartCount>0 && <span className="absolute -top-2 -right-2 w-[15px] h-[15px] bg-mj-t1 text-mj-white text-[8px] font-bold rounded-full flex items-center justify-center">{cartCount>9?'9+':cartCount}</span>}
            </button>
            <button onClick={()=>setMobileOpen(true)} className="flex xl:hidden flex-col gap-[5px] p-1 text-mj-t3" aria-label="Menu">
              <span className="block w-[22px] h-px bg-current"/><span className="block w-[15px] h-px bg-current"/><span className="block w-[22px] h-px bg-current"/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-mj-t1/40 backdrop-blur-sm z-[60]" onClick={()=>setMobileOpen(false)}/>
            <motion.nav initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.45,ease:[0.16,1,0.3,1]}}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-mj-bg3 z-[70] flex flex-col overflow-y-auto">
              <div className="flex justify-between items-center px-8 py-6 border-b border-mj-b1">
                <span className="font-display text-sm tracking-[0.28em] uppercase text-mj-t1">Menu</span>
                <button onClick={()=>setMobileOpen(false)} className="text-mj-t4 hover:text-mj-t1">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className="flex items-center gap-5 px-8 py-4 border-b border-mj-b1">
                <LanguageSelector /><CurrencySelector />
              </div>
              <div className="flex-1 flex flex-col px-8 py-6 gap-1">
                {[['Shop All','/shop'],['1702 Collection','/1702'],['Bespoke Shoes','/bespoke/shoes'],['Bags & Leather','/shop/bags'],['Join The Club','/join-the-club'],['The Vision','/the-vision'],['Knife on Leather','/knife-on-leather'],['The Leatherpreneur','/leatherpreneur'],['Journal','/journal'],['Affiliates','/affiliates'],['Careers','/careers'],['Build Your Brand','/build-your-brand'],['Book Appointment','/book']].map(([label,href])=>(
                  <Link key={href} href={href} onClick={()=>setMobileOpen(false)}
                    className="font-display text-[26px] font-light text-mj-t3 hover:text-mj-t1 transition-colors py-1.5">{label}</Link>
                ))}
              </div>
              <div className="px-8 py-6 border-t border-mj-b1 flex gap-5">
                <Link href="/login" onClick={()=>setMobileOpen(false)} className="text-[10px] tracking-widest uppercase text-mj-t4 font-medium">Account</Link>
                <Link href="/account" onClick={()=>setMobileOpen(false)} className="text-[10px] tracking-widest uppercase text-mj-t4 font-medium">Dashboard</Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
