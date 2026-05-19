import Link from 'next/link'
import NewsletterSignup from '@/components/ui/NewsletterSignup'

export const metadata = {
  title: 'Journal | Martins Johnson',
  description: 'Stories, craft notes, and perspectives from the world of Martins Johnson.',
}

const FEATURED = {
  slug: 'on-the-art-of-lasting-things',
  category: 'Craft',
  title: 'On the Art of Lasting Things',
  excerpt: 'In a world of disposable everything, we make a case for objects built to outlive their owners — and why the most luxurious thing you can own is something that grows more beautiful with time.',
  date: 'May 2025',
  readTime: '8 min',
}

const ARTICLES = [
  { slug: 'the-blake-stitch-method', category: 'Technique', title: 'The Blake Stitch Method', excerpt: 'Why we choose a single thread over the Goodyear welt — and what that means for the shoe on your foot.', date: 'Apr 2025', readTime: '5 min' },
  { slug: 'full-grain-vs-top-grain', category: 'Materials', title: 'Full-Grain vs Top-Grain Leather', excerpt: 'The difference between the two most common leather designations — and why one ages into treasure while the other merely ages.', date: 'Mar 2025', readTime: '6 min' },
  { slug: 'bespoke-process-explained', category: 'Bespoke', title: 'The Bespoke Process, Explained', excerpt: 'From first measurement to final polish — a step-by-step account of what happens between your appointment and the moment your shoes arrive.', date: 'Feb 2025', readTime: '10 min' },
  { slug: 'london-shoemaking-history', category: 'Heritage', title: 'London\'s Shoemaking Heritage', excerpt: 'St James\'s Street. Jermyn Street. The quarter mile that defined global shoemaking for three centuries — and what survives today.', date: 'Jan 2025', readTime: '12 min' },
  { slug: 'caring-for-leather', category: 'Care', title: 'How to Care for Leather', excerpt: 'The rituals, products, and habits that separate a pair of shoes that lasts five years from one that lasts fifty.', date: 'Dec 2024', readTime: '7 min' },
  { slug: 'the-1702-story', category: 'Brand', title: 'The Story Behind 1702', excerpt: 'Why we named our second line after a year in history — and what that number means to the brand.', date: 'Nov 2024', readTime: '4 min' },
]

export default function JournalPage() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: '#EBEBEA', borderBottom: '1px solid #D8D6D0' }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow mb-3">Writing & Perspective</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1 }}>
              The Journal
            </h1>
          </div>
          <p style={{ color: '#8A8A87', maxWidth: '380px', lineHeight: 1.8, fontSize: '0.9rem' }}>
            Stories on craft, materials, heritage, and the philosophy of lasting things.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Featured */}
        <Link href={`/journal/${FEATURED.slug}`} className="group block mb-16">
          <div className="grid md:grid-cols-2 gap-0 border border-mj-bg2 hover:border-mj-t1 transition-colors">
            <div className="aspect-[4/3] bg-mj-bg2 flex items-center justify-center" style={{ background: '#181A1C' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'rgba(255,255,255,0.04)', fontWeight: 300, letterSpacing: '-0.04em' }}>Craft</p>
            </div>
            <div className="p-10 flex flex-col justify-between">
              <div>
                <p className="eyebrow mb-4" style={{ color: '#C8956B' }}>{FEATURED.category} · Featured</p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '1.25rem' }}>
                  {FEATURED.title}
                </h2>
                <p style={{ color: '#5A5A58', lineHeight: 1.8, fontSize: '0.95rem' }}>{FEATURED.excerpt}</p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-mj-bg2">
                <p className="eyebrow">{FEATURED.date}</p>
                <span style={{ color: '#D8D6D0' }}>·</span>
                <p className="eyebrow">{FEATURED.readTime} read</p>
                <span className="eyebrow ml-auto group-hover:underline">Read →</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Category pills */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {['All', 'Craft', 'Materials', 'Bespoke', 'Heritage', 'Care', 'Brand'].map(c => (
            <button key={c} className="px-4 py-1.5 text-xs border border-mj-bg2 hover:border-mj-t1 transition-colors eyebrow">
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Article grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map(a => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
              <div className="aspect-[3/2] bg-mj-bg2 mb-5 overflow-hidden flex items-center justify-center" style={{ background: '#EBEBEA' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: 'rgba(26,26,24,0.06)', fontWeight: 300 }}>MJ</p>
              </div>
              <p className="eyebrow mb-2" style={{ color: '#C8956B' }}>{a.category}</p>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '0.6rem' }}>{a.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A8A87' }}>{a.excerpt}</p>
              <div className="flex items-center gap-3">
                <p className="eyebrow">{a.date}</p>
                <span style={{ color: '#D8D6D0' }}>·</span>
                <p className="eyebrow">{a.readTime}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="mt-20 border border-mj-bg2 p-10 md:p-14 text-center">
          <p className="eyebrow mb-3">Stay Informed</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400, marginBottom: '1rem' }}>
            The Journal, Delivered
          </h2>
          <p style={{ color: '#5A5A58', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            New essays and craft notes sent monthly. No noise, no promotions — just considered writing.
          </p>
          <NewsletterSignup source="journal" />
        </div>
      </div>
    </div>
  )
}
