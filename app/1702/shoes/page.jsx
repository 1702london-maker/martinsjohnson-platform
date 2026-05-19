import Link from 'next/link'

export const metadata = {
  title: '1702 Shoes | Martins Johnson',
}

const ITEMS = [{'name': 'The Regent High-Top', 'sub': 'Hand-stitched canvas + leather', 'price': 695, 'tag': 'New'}, {'name': 'The Chelsea Slip', 'sub': 'Elastic gore · full grain', 'price': 745, 'tag': null}, {'name': 'The Runway Derby', 'sub': 'Elongated last · contrast welt', 'price': 825, 'tag': 'Limited'}]

export default function Page() {
  const bg = false ? '#181A1C' : '#EBEBEA'
  const textCol = false ? '#F3F1EC' : '#1A1A18'
  const mutedCol = false ? '#5A5A58' : '#8A8A87'

  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div style={{ background: bg }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow mb-3" style={{ color: mutedCol }}>1702 Collection</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1, color: textCol, marginBottom: '1rem' }}>
            1702 Shoes
          </h1>
          <p style={{ color: mutedCol, maxWidth: '480px', lineHeight: 1.8 }}>
            The 1702 shoe line — bolder, more directional. For those who lead rather than follow.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => (
            <div key={i} className="group border border-mj-bg2 p-8 hover:border-mj-t1 transition-colors bg-mj-bg3">
              <div className="aspect-square bg-mj-bg2 mb-6 flex items-center justify-center">
                <span className="eyebrow" style={{ color: '#C8C6C0' }}>Image</span>
              </div>
              {item.tag && <p className="eyebrow mb-2" style={{ fontSize: '0.6rem', color: '#8A8A87' }}>{item.tag}</p>}
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.35rem' }}>{item.name}</h2>
              <p className="text-xs mb-5" style={{ color: '#8A8A87' }}>{item.sub}</p>
              <div className="flex justify-between items-center">
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>£{item.price.toLocaleString()}</p>
                <Link href="/book" className="eyebrow border-b border-mj-t1 hover:opacity-60 transition-opacity">Enquire →</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/book" className="btn-primary">Book Private Appointment</Link>
        </div>
      </div>
    </div>
  )
}
