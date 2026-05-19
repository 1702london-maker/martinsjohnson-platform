import { Suspense } from 'react'
import Link from 'next/link'
import WishlistButton from '@/components/ui/WishlistButton'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Belts | Martins Johnson',
  description: 'Full-grain leather belts with solid brass buckles. The detail that defines the outfit.',
}

const FILTERS = ['All', '30mm', '35mm', '40mm', 'Reversible']

async function getProducts(category) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('id, name, slug, price, category, images, tag')
      .eq('gender_tag', 'belts')
      .eq('active', true)
      .order('created_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export default async function Page({ searchParams }) {
  const products = await getProducts('belts')
  const filter = searchParams?.filter || 'All'
  const filtered = filter === 'All' ? products : products.filter(p => p.category?.toLowerCase() === filter.toLowerCase())

  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: '#EBEBEA', borderBottom: '1px solid #D8D6D0' }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">The Details</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1, marginBottom: '1rem' }}>
            Belts
          </h1>
          <p style={{ color: '#5A5A58', maxWidth: '480px', lineHeight: 1.8 }}>
            Full-grain leather belts with solid brass buckles. The detail that defines the outfit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Filter bar */}
        <div className="flex gap-2 flex-wrap mb-10">
          {FILTERS.map(f => (
            <Link key={f} href={`?filter=${f}`}
              className="px-4 py-1.5 text-xs font-medium border transition-all"
              style={{
                borderColor: filter === f ? '#1A1A18' : '#D8D6D0',
                background: filter === f ? '#1A1A18' : 'transparent',
                color: filter === f ? '#F3F1EC' : '#8A8A87',
                letterSpacing: '0.1em',
              }}>
              {f.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="eyebrow mb-4">Coming Soon</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400 }}>
              This collection is being curated
            </h2>
            <p style={{ color: '#8A8A87', marginTop: '1rem' }}>New pieces added regularly. <Link href="/book" className="underline">Book a private appointment</Link> to view what's available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square mb-4 overflow-hidden bg-mj-bg2">
                  {product.tag && (
                    <span className="absolute top-3 left-3 z-10 eyebrow px-2 py-1"
                      style={{ background: '#1A1A18', color: '#F3F1EC', fontSize: '0.6rem' }}>
                      {product.tag}
                    </span>
                  )}
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="eyebrow" style={{ color: '#C8C6C0' }}>No Image</span>
                    </div>
                  )}
                </div>
                <p className="eyebrow mb-1">{product.category}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.25rem' }}>{product.name}</h3>
                <p style={{ color: '#5A5A58', fontSize: '0.85rem' }}>£{product.price?.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
