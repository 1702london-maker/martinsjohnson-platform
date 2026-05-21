import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const supported = ['en', 'fr', 'ar', 'de', 'es']
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  const safeLocale = supported.includes(locale) ? locale : 'en'
  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  }
})
