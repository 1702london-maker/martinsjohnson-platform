import { createClient } from '@/lib/supabase/server'
import Hero             from '@/components/home/Hero'
import MarqueeBar       from '@/components/features/MarqueeBar'
import ShoeCollection   from '@/components/home/ShoeCollection'
import BagsSection      from '@/components/home/BagsSection'
import TheVision        from '@/components/home/TheVision'
import { BespokeSection, JoinTheClub, WatchesSection, FounderSection, JournalSection, BookCTA } from '@/components/home/sections'
import KnifeOnLeather   from '@/components/home/KnifeOnLeather'

async function getProducts() {
  try {
    const sb = createClient()
    const { data } = await sb.from('products').select('id,name,slug,price,category,image_urls,is_new_arrival').eq('available',true).limit(40)
    return data || []
  } catch { return [] }
}

export default async function HomePage() {
  const products = await getProducts()
  return (
    <>
      <Hero />
      <MarqueeBar />
      <ShoeCollection products={products} />
      <BagsSection    products={products} />
      <TheVision />
      <BespokeSection />
      <JoinTheClub />
      <WatchesSection products={products} />
      <KnifeOnLeather />
      <FounderSection />
      <JournalSection />
      <BookCTA />
    </>
  )
}
