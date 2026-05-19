import Link from 'next/link'

export const metadata = {
  title: 'Stockists | Martins Johnson',
  description: 'Find Martins Johnson stockists worldwide.',
}

const STOCKISTS = [
  { city: 'London', country: 'United Kingdom', name: 'Martins Johnson Atelier', address: 'By appointment, Mayfair', flagship: true, href: '/book' },
  { city: 'Lagos', country: 'Nigeria', name: 'The Luxury Edit', address: 'Victoria Island, Lagos', flagship: false, href: null },
  { city: 'Dubai', country: 'UAE', name: 'The Address Collection', address: 'Dubai Mall, Level 2', flagship: false, href: null },
  { city: 'New York', country: 'USA', name: 'Coming Soon', address: 'SoHo, Manhattan — 2025', flagship: false, href: null },
  { city: 'Paris', country: 'France', name: 'Coming Soon', address: 'Le Marais — 2025', flagship: false, href: null },
]

export default function StockistPage() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div style={{ background: '#EBEBEA', borderBottom: '1px solid #D8D6D0' }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3">Where to Find Us</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1, marginBottom: '1rem' }}>
            Stockists
          </h1>
          <p style={{ color: '#5A5A58', maxWidth: '480px', lineHeight: 1.8 }}>
            Martins Johnson pieces are available at select locations worldwide, and by private appointment at our London atelier.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-px">
          {STOCKISTS.map((s, i) => (
            <div key={i} className="flex items-start justify-between py-7 border-b border-mj-bg2 group">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 500 }}>{s.name}</p>
                  {s.flagship && <span className="eyebrow px-2 py-0.5" style={{ background: '#1A1A18', color: '#F3F1EC', fontSize: '0.55rem' }}>Flagship</span>}
                </div>
                <p className="text-sm" style={{ color: '#8A8A87' }}>{s.address}</p>
              </div>
              <div className="text-right">
                <p className="eyebrow mb-1">{s.city}</p>
                <p className="text-xs" style={{ color: '#8A8A87' }}>{s.country}</p>
                {s.href && <Link href={s.href} className="eyebrow mt-2 block border-b border-mj-t1 w-fit ml-auto">Book Visit →</Link>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-mj-bg2 p-10 text-center">
          <p className="eyebrow mb-3">Become a Stockist</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>
            Carry Martins Johnson
          </h2>
          <p style={{ color: '#5A5A58', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            We partner with curated luxury retailers who share our commitment to craft and quality.
          </p>
          <Link href="/contact?type=stockist" className="btn-primary">Get in Touch</Link>
        </div>
      </div>
    </div>
  )
}
