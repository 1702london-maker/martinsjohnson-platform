import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Routes that require auth
const PROTECTED    = ['/account', '/affiliates/dashboard']
// Routes only for guests
const GUEST_ONLY   = ['/login', '/register']

export async function middleware(request) {
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

  // Protected routes → redirect to login
  if (PROTECTED.some(p => pathname.startsWith(p)) && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Guest-only routes → redirect logged-in users to account
  if (GUEST_ONLY.some(p => pathname === p) && session) {
    const url = request.nextUrl.clone()
    url.pathname = '/account'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
