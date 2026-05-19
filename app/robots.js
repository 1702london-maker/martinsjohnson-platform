export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/account/', '/account'] },
    ],
    sitemap: 'https://martinsjohnson.com/sitemap.xml',
  }
}
