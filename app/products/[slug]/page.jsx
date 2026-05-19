export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import { CATEGORY_IMAGES } from '@/lib/utils'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)
  return {
    title:       product ? `${product.name} — Martins Johnson` : 'Product — Martins Johnson',
    description: product?.description || 'Luxury bespoke leather goods.',
  }
}

async function getProduct(slug) {
  try {
    const sb = await createClient()
    const { data } = await sb.from('products').select('*').eq('slug',slug).eq('available',true).single()
    return data
  } catch { return null }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  let product = await getProduct(slug)

  // If not in Supabase, build a placeholder from the slug so the page still renders
  if (!product) {
    const key = slug.split('-')[0]
    if (!CATEGORY_IMAGES[key]) notFound()
    product = {
      id: `placeholder-${key}`,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      slug,
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
