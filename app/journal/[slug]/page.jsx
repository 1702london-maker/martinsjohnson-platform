import Link from 'next/link'
import { notFound } from 'next/navigation'

const ARTICLES = {
  'on-the-art-of-lasting-things': {
    category: 'Craft', title: 'On the Art of Lasting Things', date: 'May 2025', readTime: '8 min',
    body: `In a world of disposable everything, we make a case for objects built to outlive their owners.

There is a particular kind of satisfaction in owning something that has been made to last. Not just to last a season, or a few years, but to last a lifetime — and then to be passed on.

We have largely forgotten what this feels like. The economics of modern manufacturing have made permanence inaccessible for most objects, and aspirational for those that retain it. We pay a premium, now, for the things that were once simply standard: hand-stitched shoes, full-grain leather, solid brass hardware.

But the question is not really about price. It is about intention. When a shoemaker builds a shoe on a last that will be used to repair it, he is making a decision about the future. He is saying: this shoe will come back. He is accounting for the person who will own it in ten years.

That kind of thinking is rare. And it changes everything about how an object feels in your hand.`
  },
  'the-blake-stitch-method': {
    category: 'Technique', title: 'The Blake Stitch Method', date: 'Apr 2025', readTime: '5 min',
    body: `Why we choose a single thread over the Goodyear welt.

The Goodyear welt is the dominant construction in men's dress shoes. It is sturdy, serviceable, and forgiving of mass production. It is also, in our view, not the right choice for the kind of shoe we make.

The Blake stitch — a single thread that passes through the insole, welt, and outsole in one continuous seam — produces a shoe that is closer to the foot, more flexible, and more elegant in profile. The result is a shoe that feels made, not assembled.

The trade-off is skill. Blake stitching requires a craftsperson who knows what they are doing. There is no tolerance for error when a single seam holds everything together. That, in a way, is exactly the point.`
  },
}

export async function generateMetadata({ params }) {
  const article = ARTICLES[params.slug]
  if (!article) return {}
  return { title: `${article.title} | MJ Journal`, description: article.body.slice(0, 160) }
}

export default function ArticlePage({ params }) {
  const article = ARTICLES[params.slug]
  if (!article) notFound()

  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/journal" className="eyebrow hover:opacity-60 transition-opacity mb-8 block">← The Journal</Link>
        <p className="eyebrow mb-4" style={{ color: '#C8956B' }}>{article.category}</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {article.title}
        </h1>
        <div className="flex gap-4 mb-12 pb-8 border-b border-mj-bg2">
          <p className="eyebrow">{article.date}</p>
          <span style={{ color: '#D8D6D0' }}>·</span>
          <p className="eyebrow">{article.readTime} read</p>
        </div>
        <div className="prose" style={{ color: '#3A3A38', lineHeight: 2, fontSize: '1.05rem' }}>
          {article.body.split('\n\n').map((para, i) => (
            para.trim() && <p key={i} style={{ marginBottom: '1.5rem', fontFamily: i === 0 ? 'inherit' : 'inherit' }}>{para}</p>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-mj-bg2 flex justify-between items-center">
          <Link href="/journal" className="eyebrow hover:opacity-60">← More Articles</Link>
          <Link href="/book" className="btn-primary py-2.5 px-6 text-xs">Book Appointment</Link>
        </div>
      </div>
    </div>
  )
}
