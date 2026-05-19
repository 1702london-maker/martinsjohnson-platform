import Link from 'next/link'

export const metadata = {
  title: 'Bespoke Bags | Martins Johnson',
  description: 'Commission handmade Martins Johnson bags and leather goods through a private virtual consultation.',
}

const DETAILS = [
  ['Forms', 'Briefcase, holdall, tote, clutch, travel piece, or a custom leather object.'],
  ['Materials', 'Full-grain calf, suede, canvas combinations, brass hardware, and premium linings.'],
  ['Personalisation', 'Initials, internal layout, compartments, handle length, edge paint, and hardware finish.'],
  ['Timeline', 'Most bag commissions are scoped after consultation and crafted over 8-12 weeks.'],
]

export default function BespokeBagsPage() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <section className="px-6 py-16 md:px-14 lg:px-20" style={{ background: '#181A1C' }}>
        <p className="eyebrow mb-3" style={{ color: '#8A8A87' }}>Bespoke Bags</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.7rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 0.95, color: '#F3F1EC', marginBottom: '1.25rem' }}>
          Carry pieces with purpose.
        </h1>
        <p style={{ color: '#AEAEAD', maxWidth: '560px', lineHeight: 1.8 }}>
          Design a bag around the way you move: work, travel, ceremony, and daily ritual shaped into one lasting object.
        </p>
        <div className="flex gap-3 flex-wrap mt-8">
          <Link href="/book?type=remote-bespoke" className="btn-solid">Book Bag Consultation</Link>
          <Link href="/bespoke" className="btn-outline">Back to Bespoke</Link>
        </div>
      </section>

      <section className="px-6 py-14 md:px-14 lg:px-20">
        <div className="grid gap-px border border-mj-b1 bg-mj-b1 md:grid-cols-4">
          {DETAILS.map(([title, text]) => (
            <div key={title} className="bg-mj-bg3 p-6">
              <p className="eyebrow mb-3">{title}</p>
              <p style={{ color: '#5A5A58', fontSize: '0.9rem', lineHeight: 1.8 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
