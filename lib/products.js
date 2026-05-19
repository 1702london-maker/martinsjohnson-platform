const BADGE_TAGS = new Set(['new', 'signature', 'bestseller', 'featured', 'limited', 'sold out'])

export function normaliseProductCard(product) {
  const tags = Array.isArray(product.tags) ? product.tags : []
  const badge = product.metadata?.badge
    || (product.is_new_arrival ? 'New' : null)
    || tags.find(tag => BADGE_TAGS.has(String(tag).toLowerCase()))
    || null
  const subtype = tags.find(tag => !BADGE_TAGS.has(String(tag).toLowerCase()))

  return {
    ...product,
    rawCategory: product.category,
    category: subtype || product.category,
    images: product.image_urls || [],
    tag: badge,
  }
}

export function productMatchesFilter(product, filter) {
  if (!filter || filter === 'All') return true
  const key = String(filter).toLowerCase().replace(/\s+/g, '-')
  const tags = Array.isArray(product.tags) ? product.tags : []

  return [
    product.category,
    product.rawCategory,
    ...tags,
  ].some(value => String(value || '').toLowerCase().replace(/\s+/g, '-') === key)
}
