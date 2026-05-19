'use client'
import { useWishlistStore, useGlobalStore } from '@/lib/store'
import WishlistButton from '@/components/ui/WishlistButton'
import Link from 'next/link'

export default function WishlistPage() {
  const { items } = useWishlistStore()
  const { formatPrice } = useGlobalStore()

  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div style={{ background: '#EBEBEA', borderBottom: '1px solid #D5D3CE' }} className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">Saved Pieces</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              Your Wishlist {items.length > 0 && <span style={{ color: '#8A8A87', fontSize: '0.6em' }}>({items.length})</span>}
            </h1>
          </div>
          {items.length > 0 && (
            <Link href="/shop" className="eyebrow border-b border-mj-t1 hover:opacity-60 transition-opacity">Continue Shopping →</Link>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#8A8A87', marginBottom: '1rem' }}>Nothing saved yet</p>
            <p className="text-sm mb-8" style={{ color: '#AEAEAD' }}>Browse the collection and save pieces you love</p>
            <Link href="/shop" className="btn-solid">Browse Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(product => (
              <div key={product.id} className="group relative">
                <WishlistButton product={product} className="absolute top-3 right-3 z-10 text-mj-t1" />
                <Link href={`/products/${product.slug || product.id}`} className="block">
                  <div className="aspect-square bg-mj-bg2 mb-4 overflow-hidden flex items-center justify-center">
                    {product.image || product.images?.[0] ? (
                      <img src={product.image || product.images[0]} alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <span className="eyebrow" style={{ color: '#C8C6C0' }}>MJ</span>
                    )}
                  </div>
                  <p className="eyebrow mb-1">{product.category}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.25rem' }}>{product.name}</h3>
                  <p style={{ color: '#5A5A58', fontSize: '0.85rem' }}>{formatPrice(product.price)}</p>
                </Link>
                <button
                  onClick={() => {/* add to bag from wishlist */}}
                  className="mt-3 w-full btn-outline py-2.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
