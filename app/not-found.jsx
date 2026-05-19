import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center px-6">
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(6rem, 20vw, 14rem)', fontWeight: 300, color: 'rgba(26,26,24,0.05)', lineHeight: 1, marginBottom: '-2rem' }}>404</p>
        <p className="eyebrow mb-4">Page Not Found</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, marginBottom: '1rem' }}>
          This page has moved on
        </h1>
        <p style={{ color: '#8A8A87', maxWidth: '360px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          Like a discontinued style, what you're looking for no longer lives here.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-solid">Return Home</Link>
          <Link href="/shop" className="btn-outline">Browse the Shop</Link>
        </div>
      </div>
    </div>
  )
}
