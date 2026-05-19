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
  'african-craftsmanship': {
    category: 'Culture', title: 'Why African Craftsmanship Is the Future of Luxury', date: 'June 2025', readTime: '12 min',
    body: `Luxury has always borrowed from culture. The future belongs to brands that acknowledge that source with clarity, respect, and discipline.

African craftsmanship carries a vocabulary of pattern, material intelligence, storytelling, and ceremony that global luxury is only beginning to understand. The opportunity is not to imitate heritage, but to build with it.

For Martins Johnson, that means treating craft as both memory and strategy. Every leather object can hold a trace of where it came from and a signal of where it is going.`
  },
  'knife-on-leather': {
    category: 'Campaign', title: 'The First Cut: On Knife on Leather and the Power of Creative Precision', date: 'May 2025', readTime: '8 min',
    body: `The first cut is a commitment. Once the blade touches leather, intention becomes visible.

Knife on Leather began as a creative image and became a philosophy: move with precision, remove what is unnecessary, and respect the material enough to make every decision count.

That is how we think about products, campaigns, partnerships, and community work. Nothing careless. Nothing disposable.`
  },
  'bespoke-commission': {
    category: 'Atelier', title: 'What It Truly Means to Commission a Bespoke Shoe', date: 'Apr 2025', readTime: '6 min',
    body: `A bespoke commission is not just a purchase. It is a conversation translated into leather.

The process begins with fit and function, then moves into proportion, colour, material, sole, initials, and finish. The final object should feel inevitable, as if it could only have belonged to the person who commissioned it.

That is the quiet power of bespoke: it does not shout. It fits.`
  },
  'full-grain-vs-top-grain': {
    category: 'Materials', title: 'Full-Grain vs Top-Grain Leather', date: 'Mar 2025', readTime: '6 min',
    body: `Full-grain leather keeps the strongest and most expressive part of the hide. It carries natural markings, depth, and the ability to develop a patina.

Top-grain leather is corrected for uniformity. It can be beautiful, but it is often less alive over time.

The choice depends on the object, but our bias is simple: when permanence matters, keep the grain honest.`
  },
  'bespoke-process-explained': {
    category: 'Bespoke', title: 'The Bespoke Process, Explained', date: 'Feb 2025', readTime: '10 min',
    body: `The process starts with consultation: use, fit, taste, and the small frustrations a current wardrobe does not solve.

From there we define the object, confirm measurements, review materials, price the commission, and begin production. The client receives updates as the piece moves from pattern to cutting, stitching, finishing, and delivery.

Good process removes uncertainty. Great process makes anticipation part of the experience.`
  },
  'london-shoemaking-history': {
    category: 'Heritage', title: "London's Shoemaking Heritage", date: 'Jan 2025', readTime: '12 min',
    body: `London shoemaking has always been about restraint, proportion, and confidence.

The tradition is not frozen in the past. It is a technical inheritance: lasts, finishing, repairability, and the discipline to make shoes that look better when they have lived.

Martins Johnson builds from that lineage while widening the cultural lens around who gets to define luxury now.`
  },
  'caring-for-leather': {
    category: 'Care', title: 'How to Care for Leather', date: 'Dec 2024', readTime: '7 min',
    body: `Leather rewards rhythm. Brush away dust, let pieces rest, condition sparingly, and never rush drying with direct heat.

Shoes need trees. Bags need shape support. Belts need room to breathe. The rules are simple because the material is honest.

Care is not maintenance alone. It is participation in the life of the object.`
  },
  'the-1702-story': {
    category: 'Brand', title: 'The Story Behind 1702', date: 'Nov 2024', readTime: '4 min',
    body: `1702 is the ready-to-wear expression of the Martins Johnson world.

Where bespoke is intimate and singular, 1702 is sharper, faster, and built for cultural movement. It carries the same respect for materials, but speaks in drops, capsules, and everyday statements.

It is the bridge between atelier craft and the street-level energy that keeps a brand alive.`
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) return {}
  return { title: `${article.title} | MJ Journal`, description: article.body.slice(0, 160) }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = ARTICLES[slug]
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
