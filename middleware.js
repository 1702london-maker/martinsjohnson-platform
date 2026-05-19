import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const PROTECTED = ['/account', '/account/orders', '/account/wishlist', '/account/subscriptions']

export async function middleware(request) {
  // Skip if Supabase env vars not set (local dev without .env.local)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name)              { return request.cookies.get(name)?.value },
        set(name, value, opts) { request.cookies.set({ name, value, ...opts }); response.cookies.set({ name, value, ...opts }) },
        remove(name, opts)     { request.cookies.set({ name, value:'', ...opts }); response.cookies.set({ name, value:'', ...opts }) },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const pathname = request.nextUrl.pathname

  if (PROTECTED.some(p => pathname.startsWith(p)) && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if ((pathname === '/login' || pathname === '/register') && session) {
    const url = request.nextUrl.clone()
    url.pathname = '/account'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
