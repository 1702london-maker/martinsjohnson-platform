import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  // Fallback to 'en' for unsupported locales
  const supportedLocales = ['en', 'fr', 'ar', 'de', 'es']
  const safeLocale = supportedLocales.includes(locale) ? locale : 'en'

  return {
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  }
})
