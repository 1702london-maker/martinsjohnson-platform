'use client'
import { useWishlistStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

export default function WishlistButton({ product, className = '', size = 18 }) {
  const { toggle, has } = useWishlistStore()
  const saved = has(product.id)

  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(product) }}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.svg
          key={saved ? 'filled' : 'empty'}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          exit={{    scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.15 }}
          width={size} height={size} viewBox="0 0 24 24"
          fill={saved ? '#1A1A18' : 'none'}
          stroke={saved ? '#1A1A18' : 'currentColor'}
          strokeWidth="1.5"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
