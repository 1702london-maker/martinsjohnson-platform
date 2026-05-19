import Link from 'next/link'

export const metadata = {
  title: 'The MJ Foundation | Martins Johnson',
  description: 'The Martins Johnson Foundation — investing in craft education and emerging artisans.',
}

const PILLARS = [
  { title: 'Craft Education', desc: 'Funding bursaries for young people pursuing traditional shoemaking, leatherwork, and luxury craft apprenticeships across the UK and West Africa.' },
  { title: 'Artisan Support', desc: 'Direct grants to master craftspeople to preserve techniques at risk of being lost. We document, fund, and amplify their work.' },
  { title: 'Community Workshops', desc: 'Free and subsidised leather and shoemaking workshops in London and Lagos — open to anyone who wants to learn with their hands.' },
]

export default function FoundationPage() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div style={{ background: '#181A1C' }} className="py-24 px-6">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="eyebrow mb-4" style={{ color: '#5A5A58' }}>Beyond the Product</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1, color: '#F3F1EC', marginBottom: '1.5rem' }}>
            The MJ Foundation
          </h1>
          <p style={{ color: '#5A5A58', maxWidth: '540px', lineHeight: 1.9, fontSize: '1.05rem' }}>
            Luxury without responsibility is just excess. The MJ Foundation is our commitment to the craft traditions that make what we do possible — and to the next generation of makers who will carry them forward.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {PILLARS.map(p => (
            <div key={p.title} className="border-t-2 border-mj-t1 pt-8">
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem' }}>{p.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#5A5A58' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="eyebrow mb-4">Impact to Date</p>
            <div className="space-y-6">
              {[['£180,000+','Awarded in craft bursaries'],['34','Artisans supported directly'],['12','Workshops delivered'],['6','Apprenticeships funded']].map(([n,l]) => (
                <div key={l} className="flex items-baseline gap-4">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 400, minWidth: '160px' }}>{n}</p>
                  <p className="text-sm" style={{ color: '#8A8A87' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-mj-bg2 p-10">
            <p className="eyebrow mb-4">Our Commitment</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 400, lineHeight: 1.4, color: '#1A1A18' }}>
              "5% of every Martins Johnson purchase goes directly to the Foundation. Not as a marketing exercise — as a condition of doing business."
            </p>
            <p className="eyebrow mt-6" style={{ color: '#8A8A87' }}>— Martins Johnson, Founder</p>
          </div>
        </div>

        <div className="text-center border border-mj-bg2 p-12">
          <p className="eyebrow mb-3">Get Involved</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, marginBottom: '1rem' }}>Support the Foundation</h2>
          <p style={{ color: '#5A5A58', maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.8 }}>Whether as a donor, workshop partner, or corporate sponsor — there is a way to be part of this work.</p>
          <Link href="/contact?type=foundation" className="btn-primary">Get in Touch</Link>
        </div>
      </div>
    </div>
  )
}
