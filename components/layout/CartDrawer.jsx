'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const router   = useRouter()

  async function handleCheckout() {
    setOpen(false)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, successUrl: `${window.location.origin}/order-confirmation` }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      toast.error('Unable to open checkout. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-mj-t1/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-mj-bg3 border-l border-mj-b1 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-mj-b1">
              <div>
                <p className="font-display text-[17px] font-normal text-mj-t1">Your Bag</p>
                <p className="text-[11px] text-mj-t5 mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-mj-t4 hover:text-mj-t1 transition-colors p-1">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                  <p className="font-display text-xl font-light text-mj-t4 italic">Your bag is empty</p>
                  <p className="text-[12px] text-mj-t5">Add something extraordinary.</p>
                  <button onClick={() => setOpen(false)}>
                    <Link href="/shop" className="btn-outline mt-4">Explore the Collection</Link>
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 pb-5 border-b border-mj-b1 last:border-0">
                    {/* Image */}
                    <div className="w-[72px] h-[90px] bg-mj-card flex-shrink-0 overflow-hidden border border-mj-b1">
                      {item.image
                        ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5"/>
                        : <div className="w-full h-full flex items-center justify-center text-mj-b2 text-xs">MJ</div>
                      }
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-normal text-mj-t2 truncate">{item.name}</p>
                      {item.variant && <p className="text-[11px] text-mj-t5 mt-0.5 leading-relaxed">{item.variant}</p>}
                      <div className="flex items-center justify-between mt-3">
                        {/* Qty */}
                        <div className="flex items-center gap-2.5 border border-mj-b1">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-mj-t4 hover:text-mj-t1 transition-colors text-sm">−</button>
                          <span className="text-[12px] text-mj-t2 font-medium w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-mj-t4 hover:text-mj-t1 transition-colors text-sm">+</button>
                        </div>
                        <p className="text-[13px] font-medium text-mj-t1">
                          £{(item.price * item.qty).toLocaleString('en-GB')}
                        </p>
                      </div>
                    </div>
                    {/* Remove */}
                    <button onClick={() => removeItem(item.id)} className="self-start text-mj-t5 hover:text-mj-t3 transition-colors mt-0.5">
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-7 py-6 border-t border-mj-b1 space-y-4">
                <div className="flex justify-between">
                  <span className="text-[10px] tracking-widest uppercase text-mj-t4 font-medium">Subtotal</span>
                  <span className="text-[15px] font-display font-normal text-mj-t1">
                    £{subtotal.toLocaleString('en-GB')}
                  </span>
                </div>
                <p className="text-[11px] text-mj-t5 font-light">Shipping and taxes calculated at checkout.</p>
                <button onClick={handleCheckout} className="btn-solid w-full justify-center">
                  Proceed to Checkout
                </button>
                <button onClick={() => setOpen(false)} className="w-full text-center border border-mj-b1 py-3 text-[10px] tracking-widest uppercase text-mj-t4 hover:border-mj-b2 hover:text-mj-t2 transition-all font-medium">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
