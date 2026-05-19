'use client'
import { useCartStore, useGlobalStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clearCart } = useCartStore()
  const { formatPrice } = useGlobalStore()
  const [loading, setLoading] = useState(false)

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            name: i.name,
            price: i.price,
            qty: i.qty,
            image: i.image || null,
            metadata: { colour: i.colour, size: i.size, sole: i.sole, initials: i.initials },
          })),
          successUrl: `${window.location.origin}/account?order=success`,
          cancelUrl: `${window.location.origin}/shop`,
        }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      if (url) { clearCart(); window.location.href = url }
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[81] w-full max-w-md flex flex-col"
            style={{ background: '#F9F8F6' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-mj-bg2">
              <div>
                <p className="eyebrow">Your Bag</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-2xl leading-none text-mj-t4 hover:text-mj-t1 p-2">×</button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#8A8A87' }}>Your bag is empty</p>
                  <button onClick={() => setOpen(false)} className="eyebrow border-b border-mj-t1">Continue Shopping →</button>
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-mj-bg2">
                      <div className="w-20 h-20 flex-shrink-0 bg-mj-bg2 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="eyebrow" style={{ color: '#C8C6C0', fontSize: '0.5rem' }}>MJ</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 500, marginBottom: '0.2rem' }}>{item.name}</p>
                        <div className="text-xs mb-3" style={{ color: '#8A8A87', lineHeight: 1.6 }}>
                          {item.colour && <span>{item.colour}</span>}
                          {item.size && <span> · UK {item.size}</span>}
                          {item.sole && <span> · {item.sole}</span>}
                          {item.initials?.filter(Boolean).length > 0 && <span> · {item.initials.filter(Boolean).join('')}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-mj-bg2 px-3 py-1">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="text-sm w-4 text-center hover:opacity-60">−</button>
                            <span className="text-sm w-3 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="text-sm w-4 text-center hover:opacity-60">+</button>
                          </div>
                          <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-mj-t4 hover:text-mj-t1 text-lg self-start leading-none mt-0.5">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-mj-bg2">
                <div className="flex justify-between items-center mb-2">
                  <p className="eyebrow">Subtotal</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>{formatPrice(subtotal)}</p>
                </div>
                <p className="text-xs mb-5" style={{ color: '#8A8A87' }}>Shipping and duty calculated at checkout</p>
                <button onClick={handleCheckout} disabled={loading}
                  className="btn-primary w-full py-4 text-center disabled:opacity-60 flex justify-center items-center gap-2">
                  {loading ? 'Redirecting to Checkout…' : `Checkout — ${formatPrice(subtotal)}`}
                </button>
                <button onClick={() => setOpen(false)} className="w-full text-center eyebrow mt-3 hover:opacity-60 transition-opacity">
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
