import Link from 'next/link'
import ClearCartOnMount from '@/components/cart/ClearCartOnMount'

export const metadata = {
  title: 'Order Confirmed | Martins Johnson',
  robots: { index: false, follow: false },
}

export default async function OrderSuccessPage({ searchParams }) {
  const params = await searchParams
  const sessionId = params?.session_id
  const reference = sessionId ? sessionId.slice(-8).toUpperCase() : null

  return (
    <main className="min-h-screen bg-mj-bg flex items-center" style={{ paddingTop: 'var(--nav-h)' }}>
      <ClearCartOnMount />
      <section className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Order Confirmed</p>
          <h1 className="font-display text-[clamp(40px,7vw,78px)] leading-none font-light text-mj-t1 mb-6">
            Thank you for your order.
          </h1>
          <p className="text-[15px] leading-8 text-mj-t4 font-light max-w-xl mb-8">
            Your payment was received. A confirmation email will arrive shortly, and the studio will prepare your order details for fulfilment.
          </p>
          {reference && (
            <div className="border-y border-mj-b1 py-5 mb-8">
              <p className="eyebrow mb-1">Checkout Reference</p>
              <p className="font-display text-[24px] text-mj-t1 tracking-wide">{reference}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Link href="/account" className="btn-solid text-[10px]">View Account</Link>
            <Link href="/shop" className="btn-outline text-[10px]">Continue Shopping</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
