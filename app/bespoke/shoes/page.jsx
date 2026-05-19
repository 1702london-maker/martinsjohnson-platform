import Link from 'next/link'

export const metadata = {
  title: 'Bespoke Shoes | Martins Johnson',
  description: 'Commission handmade Martins Johnson footwear through a private virtual consultation.',
}

const DETAILS = [
  ['Styles', 'Oxford, Derby, Loafer, Chelsea, Sneaker, Slipper, or a custom last.'],
  ['Materials', 'Box calf, suede, patent, grained leather, and select exotic skins.'],
  ['Personalisation', 'Initials, lining colour, sole finish, lace colour, and hardware details.'],
  ['Timeline', 'A typical commission is crafted over 8-10 weeks after confirmation.'],
]

export default function BespokeShoesPage() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <section className="px-6 py-16 md:px-14 lg:px-20" style={{ background: '#181A1C' }}>
        <p className="eyebrow mb-3" style={{ color: '#8A8A87' }}>Bespoke Footwear</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.7rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 0.95, color: '#F3F1EC', marginBottom: '1.25rem' }}>
          Shoes made around you.
        </h1>
        <p style={{ color: '#AEAEAD', maxWidth: '560px', lineHeight: 1.8 }}>
          Begin with a private consultation, then shape the last, leather, details, and finishing into a pair that belongs to one person only.
        </p>
        <div className="flex gap-3 flex-wrap mt-8">
          <Link href="/book?type=remote-bespoke" className="btn-solid">Book Shoe Consultation</Link>
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
