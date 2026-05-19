import Link from 'next/link'

export const metadata = {
  title: 'Membership Confirmed | Martins Johnson',
  robots: { index: false, follow: false },
}

export default async function ClubSuccessPage({ searchParams }) {
  const params = await searchParams
  const sessionId = params?.session_id
  const reference = sessionId ? sessionId.slice(-8).toUpperCase() : null

  return (
    <main className="min-h-screen bg-mj-bg flex items-center" style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Membership Confirmed</p>
          <h1 className="font-display text-[clamp(40px,7vw,78px)] leading-none font-light text-mj-t1 mb-6">
            Welcome to the club.
          </h1>
          <p className="text-[15px] leading-8 text-mj-t4 font-light max-w-xl mb-8">
            Your membership checkout was completed. Your private access will be attached to the email used at checkout once Stripe confirms the subscription.
          </p>
          {reference && (
            <div className="border-y border-mj-b1 py-5 mb-8">
              <p className="eyebrow mb-1">Checkout Reference</p>
              <p className="font-display text-[24px] text-mj-t1 tracking-wide">{reference}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Link href="/account" className="btn-solid text-[10px]">View Account</Link>
            <Link href="/shop?access=member" className="btn-outline text-[10px]">Private Store</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
