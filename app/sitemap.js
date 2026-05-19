export default function sitemap() {
  const base = 'https://martinsjohnson.com'
  const now  = new Date()

  const staticRoutes = [
    '/', '/shop', '/shop/men', '/shop/women', '/shop/bags', '/shop/belts',
    '/shop/bracelets', '/shop/leather-goods', '/bespoke', '/bespoke/shoes',
    '/1702', '/1702/watches', '/1702/drops', '/1702/shoes', '/1702/bracelets',
    '/1702/accessories', '/join-the-club', '/the-vision', '/journal',
    '/knife-on-leather', '/leatherpreneur', '/build-your-brand', '/affiliates',
    '/book', '/contact', '/faq', '/careers', '/stockist', '/press', '/foundation',
    '/returns', '/shipping',
  ].map(route => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.startsWith('/shop') ? 0.9 : 0.7,
  }))

  return staticRoutes
}
