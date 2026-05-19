export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import { CATEGORY_IMAGES } from '@/lib/utils'

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug)
  return {
    title:       product ? `${product.name} — Martins Johnson` : 'Product — Martins Johnson',
    description: product?.description || 'Luxury bespoke leather goods.',
  }
}

async function getProduct(slug) {
  try {
    const sb = createClient()
    const { data } = await sb.from('products').select('*').eq('slug',slug).eq('available',true).single()
    return data
  } catch { return null }
}

export default async function ProductPage({ params }) {
  let product = await getProduct(params.slug)

  // If not in Supabase, build a placeholder from the slug so the page still renders
  if (!product) {
    const key = params.slug.split('-')[0]
    if (!CATEGORY_IMAGES[key]) notFound()
    product = {
      id: `placeholder-${key}`,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      slug: params.slug,
      category: key,
      style: key,
      price: 0,
      description: '',
      image_urls: [CATEGORY_IMAGES[key]],
      available: true,
      isPlaceholder: true,
    }
  }

  return <ProductPageClient product={product} />
}
