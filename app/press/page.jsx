import Link from 'next/link'

export const metadata = {
  title: 'Press | Martins Johnson',
  description: 'Press coverage, media assets, and contact information for Martins Johnson.',
}

const COVERAGE = [
  { pub: 'Vogue', title: 'The New London Luxury: Martins Johnson and the Art of Bespoke', date: 'April 2025', type: 'Feature' },
  { pub: 'GQ UK', title: '10 British Shoemakers Worth Knowing in 2025', date: 'March 2025', type: 'List' },
  { pub: 'Financial Times', title: 'The Quiet Luxury Brands Redefining British Craft', date: 'February 2025', type: 'Profile' },
  { pub: 'Esquire', title: 'Why Bespoke is Having Its Biggest Moment Since Saville Row\'s Golden Era', date: 'January 2025', type: 'Feature' },
  { pub: 'Business of Fashion', title: 'Martins Johnson: Building a Luxury Brand From First Principles', date: 'December 2024', type: 'Interview' },
  { pub: 'The Guardian', title: 'The Shoemakers Keeping British Craft Alive', date: 'November 2024', type: 'Feature' },
]

export default function PressPage() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div style={{ background: '#EBEBEA', borderBottom: '1px solid #D8D6D0' }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-end flex-wrap gap-6">
          <div>
            <p className="eyebrow mb-3">In the Press</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1 }}>
              Press & Media
            </h1>
          </div>
          <Link href="/contact?type=press" className="btn-outline">Press Enquiries →</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Coverage */}
        <div className="mb-16">
          <p className="eyebrow mb-8">Recent Coverage</p>
          <div className="space-y-px">
            {COVERAGE.map((c, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center py-6 border-b border-mj-bg2 group hover:bg-mj-bg2 px-4 -mx-4 transition-colors">
                <div className="col-span-2">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600 }}>{c.pub}</p>
                </div>
                <div className="col-span-7">
                  <p style={{ fontSize: '0.95rem', color: '#1A1A18' }}>{c.title}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className="eyebrow">{c.date}</p>
                </div>
                <div className="col-span-1 text-right">
                  <span className="eyebrow px-2 py-0.5" style={{ background: '#EBEBEA', fontSize: '0.55rem' }}>{c.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assets + contact */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-mj-bg2 p-8">
            <p className="eyebrow mb-4">Media Kit</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>Download Assets</h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A87', lineHeight: 1.8 }}>High-resolution logos, product photography, and brand guidelines available to accredited press on request.</p>
            <Link href="/contact?type=press" className="btn-primary">Request Media Kit</Link>
          </div>
          <div className="border border-mj-bg2 p-8">
            <p className="eyebrow mb-4">Press Contact</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>Get in Touch</h2>
            <p className="text-sm mb-2" style={{ color: '#8A8A87' }}>For interview requests, product loans, and editorial enquiries:</p>
            <p className="text-sm font-medium mb-6" style={{ color: '#1A1A18' }}>press@martinsjohnson.com</p>
            <p className="text-sm" style={{ color: '#8A8A87' }}>We respond to all press enquiries within 48 hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
