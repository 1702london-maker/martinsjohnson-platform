export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Journal — Martins Johnson' }

async function getPosts() {
  try {
    const sb = createClient()
    const { data } = await sb.from('journal_posts').select('id,title,slug,excerpt,cover_image,category,author,published_at').eq('published',true).order('published_at',{ ascending:false }).limit(20)
    return data || []
  } catch { return [] }
}

// Fallback articles for when DB is empty
const FALLBACK = [
  { slug:'african-craftsmanship', category:'Culture', title:'Why African Craftsmanship Is the Future of Luxury — And Why It Always Was', excerpt:'The story of handcraft in Africa is not a trend. It is a legacy older than any European fashion house.', author:'Martins Johnson', published_at:'2025-06-01', cover_image:null, bg:'bg-mj-card2' },
  { slug:'knife-on-leather', category:'Campaign', title:'The First Cut: On Knife on Leather and the Power of Creative Precision', excerpt:'Taking the tool of destruction and making it an instrument of creation. How one campaign changed lives.', author:'Editorial', published_at:'2025-05-12', cover_image:null, bg:'bg-mj-card' },
  { slug:'bespoke-commission', category:'Atelier', title:'What It Truly Means to Commission a Bespoke Shoe', excerpt:'From first consultation to final delivery — the 8-week journey of making something that belongs to you completely.', author:'Martins Johnson', published_at:'2025-04-20', cover_image:null, bg:'bg-mj-bg2' },
  { slug:'luxury-defined', category:'Philosophy', title:'Redefining Luxury for a New Generation', excerpt:'Luxury is not a price tag. It is a story, a standard, and a statement about who you are.', author:'Martins Johnson', published_at:'2025-03-08', cover_image:null, bg:'bg-mj-card2' },
  { slug:'1702-watches', category:'Collections', title:'The 1702London Watch: Where Time Becomes Heritage', excerpt:'Our first timepiece is more than a watch. It is a movement — in every sense.', author:'Editorial', published_at:'2025-02-14', cover_image:null, bg:'bg-mj-card' },
  { slug:'leather-care', category:'Guide', title:'How to Care for Your Martins Johnson Leather', excerpt:'The leather will age. How it ages is up to you. A complete guide to conditioning, cleaning, and protecting your investment.', author:'Atelier Team', published_at:'2025-01-30', cover_image:null, bg:'bg-mj-bg2' },
]

export default async function JournalPage() {
  const posts = (await getPosts()).length > 0 ? await getPosts() : FALLBACK

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-12 border-b border-mj-b1">
        <span className="eyebrow mb-3 block">Ideas Worth Reading</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1">The <em className="italic text-mj-t4">Journal</em></h1>
      </div>

      <div className="px-6 md:px-12 lg:px-20 py-12">
        {/* Featured first post */}
        <Link href={`/journal/${posts[0].slug}`} className="group block border border-mj-b1 hover:border-mj-b2 transition-all duration-300 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className={`min-h-[280px] ${posts[0].bg || 'bg-mj-card'} overflow-hidden`}>
              {posts[0].cover_image && <img src={posts[0].cover_image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-lux" />}
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="eyebrow mb-3">{posts[0].category} · Featured</span>
              <h2 className="font-display text-[clamp(20px,2.5vw,30px)] font-normal text-mj-t1 leading-snug mb-4 group-hover:text-mj-t2 transition-colors">{posts[0].title}</h2>
              {posts[0].excerpt && <p className="text-[13px] text-mj-t4 font-light leading-relaxed mb-6">{posts[0].excerpt}</p>}
              <p className="text-[10px] text-mj-t5">{posts[0].author} · {posts[0].published_at ? formatDate(posts[0].published_at) : ''}</p>
            </div>
          </div>
        </Link>

        {/* Remaining grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-mj-b1">
          {posts.slice(1).map((post, i) => (
            <Link key={post.slug} href={`/journal/${post.slug}`}
              className="group block p-7 border-b md:border-b-0 md:border-r border-mj-b1 last:border-0 hover:bg-mj-bg2 transition-colors">
              <div className={`h-36 mb-5 overflow-hidden ${post.bg || 'bg-mj-card'}`}>
                {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1000ms] ease-lux" />}
              </div>
              <span className="eyebrow mb-2 block">{post.category}</span>
              <h3 className="font-display text-[16px] font-normal text-mj-t3 group-hover:text-mj-t1 transition-colors leading-snug mb-3">{post.title}</h3>
              <p className="text-[10px] text-mj-t5">{post.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
