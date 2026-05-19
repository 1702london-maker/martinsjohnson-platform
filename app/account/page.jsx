'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatPrice } from '@/lib/utils'
import { useGlobalStore, useWishlistStore } from '@/lib/store'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const STATUS_STYLE = {
  pending:    'text-amber-600 bg-amber-50 border border-amber-100',
  confirmed:  'text-blue-600 bg-blue-50 border border-blue-100',
  processing: 'text-purple-600 bg-purple-50 border border-purple-100',
  shipped:    'text-green-600 bg-green-50 border border-green-100',
  delivered:  'text-mj-t3 bg-mj-bg2 border border-mj-b1',
  cancelled:  'text-red-500 bg-red-50 border border-red-100',
}

function Dashboard({ user, orders, sub }) {
  const { formatPrice } = useGlobalStore()
  const wishlist = useWishlistStore(s => s.items)
  const [tab, setTab] = useState('overview')

  const TABS = ['overview','orders','wishlist','subscription','appointments','settings']

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>

      {/* Dashboard Header */}
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-12 lg:px-20 pt-12 pb-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow mb-2 block">Member Dashboard</span>
            <h1 className="font-display text-[clamp(24px,4vw,40px)] font-light text-mj-t1">
              Welcome, <em className="italic text-mj-t4">{user?.user_metadata?.full_name?.split(' ')[0] || 'Member'}</em>
            </h1>
            <p className="text-[12px] text-mj-t5 mt-1">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            {sub && <span className="text-[9px] tracking-widest uppercase border border-mj-b2 px-3 py-1.5 text-mj-t4 font-bold capitalize">{sub.tier} Member</span>}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-mj-b1 px-6 md:px-12 lg:px-20 overflow-x-auto">
        <div className="flex">
          {TABS.map(t => (
            <button key={t} onClick={()=>setTab(t)}
              className={`py-4 px-1 mr-8 text-[10px] tracking-widest uppercase font-bold border-b-2 flex-shrink-0 transition-all whitespace-nowrap ${tab===t?'border-mj-t1 text-mj-t1':'border-transparent text-mj-t5 hover:text-mj-t3'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 py-12">

        {/* OVERVIEW */}
        {tab==='overview' && (
          <div>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-mj-b1 mb-10">
              {[
                { label:'Total Orders',      value: orders.length },
                { label:'Total Spent',       value: formatPrice(orders.reduce((s,o)=>s+o.total,0)) },
                { label:'Wishlist Items',    value: wishlist.length },
                { label:'Membership',        value: sub ? sub.tier.charAt(0).toUpperCase()+sub.tier.slice(1) : 'None' },
              ].map((s,i) => (
                <div key={s.label} className="px-6 py-6 border-r border-mj-b1 last:border-0">
                  <p className="text-[9px] tracking-widest uppercase text-mj-t5 mb-1 font-bold">{s.label}</p>
                  <p className="font-display text-[24px] font-light text-mj-t1">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
              {[
                { label:'Book Appointment', href:'/book',           icon:'◈' },
                { label:'Shop Now',         href:'/shop',           icon:'◉' },
                { label:'My Bespoke',       href:'/bespoke',        icon:'◇' },
                { label:'Join The Club',    href:'/join-the-club',  icon:'◎' },
              ].map(a => (
                <Link key={a.label} href={a.href}
                  className="border border-mj-b1 p-5 hover:border-mj-b2 hover:bg-mj-bg2 transition-all group">
                  <span className="text-[20px] text-mj-t4 block mb-3">{a.icon}</span>
                  <p className="text-[11px] font-medium text-mj-t3 group-hover:text-mj-t1 transition-colors">{a.label}</p>
                </Link>
              ))}
            </div>

            {/* Recent orders preview */}
            {orders.length > 0 && (
              <div>
                <div className="flex justify-between mb-5">
                  <h2 className="font-display text-[20px] font-light text-mj-t1">Recent Orders</h2>
                  <button onClick={()=>setTab('orders')} className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">View All →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {orders.slice(0,3).map(o => (
                    <div key={o.id} className="border border-mj-b1 px-6 py-4 flex items-center justify-between hover:bg-mj-bg2 transition-colors">
                      <div>
                        <p className="text-[13px] font-medium text-mj-t2">{o.order_number}</p>
                        <p className="text-[11px] text-mj-t4">{formatDate(o.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[9px] tracking-widest uppercase px-2.5 py-1 font-bold rounded-sm ${STATUS_STYLE[o.status]||STATUS_STYLE.confirmed}`}>{o.status}</span>
                        <p className="font-display text-[16px] font-light text-mj-t1">{formatPrice(o.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Private store access if member */}
            {sub && (
              <div className="mt-10 border border-mj-b1 bg-mj-bg2 p-8">
                <p className="text-[9px] tracking-widest uppercase text-mj-t4 mb-3 font-bold">Private Member Store</p>
                <p className="font-display text-[22px] font-light text-mj-t1 mb-3">
                  Your <em className="italic text-mj-t4">Exclusive Access</em>
                </p>
                <p className="text-[13px] text-mj-t4 font-light mb-6">Products never available in the public shop. Private colourways, numbered drops, hidden releases.</p>
                <Link href="/shop?access=member" className="btn-solid text-[10px]">Access Private Store →</Link>
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}
        {tab==='orders' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Order History</h2>
            {orders.length===0 ? (
              <div className="text-center py-20 border border-mj-b1">
                <p className="font-display text-xl font-light italic text-mj-t4 mb-3">No orders yet</p>
                <Link href="/shop" className="btn-solid mt-4">Start Shopping</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {orders.map(o => (
                  <div key={o.id} className="border border-mj-b1 p-6 hover:border-mj-b2 transition-colors">
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-[14px] font-medium text-mj-t2">{o.order_number}</p>
                        <p className="text-[11px] text-mj-t4 mt-0.5">{formatDate(o.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[9px] tracking-widest uppercase px-2.5 py-1 font-bold ${STATUS_STYLE[o.status]||STATUS_STYLE.confirmed}`}>{o.status}</span>
                        <p className="font-display text-[18px] font-light text-mj-t1">{formatPrice(o.total)}</p>
                      </div>
                    </div>
                    {o.items?.map((item,i) => (
                      <p key={i} className="text-[12px] text-mj-t4 font-light">{item.name}{item.variant?` · ${item.variant}`:''}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WISHLIST */}
        {tab==='wishlist' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Wishlist</h2>
            {wishlist.length===0 ? (
              <div className="text-center py-20 border border-mj-b1">
                <p className="font-display text-xl font-light italic text-mj-t4 mb-3">Your wishlist is empty</p>
                <Link href="/shop" className="btn-solid mt-4">Discover the Collection</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {wishlist.map(item => (
                  <Link key={item.id} href={`/products/${item.slug}`}
                    className="border border-mj-b1 group hover:border-mj-b2 transition-all">
                    <div className="bg-mj-card aspect-square border-b border-mj-b1 overflow-hidden">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700"/>}
                    </div>
                    <div className="p-4">
                      <p className="text-[12px] font-medium text-mj-t2 group-hover:text-mj-t1 transition-colors">{item.name}</p>
                      <p className="text-[11px] text-mj-t4 mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBSCRIPTION */}
        {tab==='subscription' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Membership</h2>
            {sub ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-mj-b1 p-8">
                  <p className="eyebrow mb-3 capitalize">{sub.tier} Member</p>
                  <p className="font-display text-[28px] font-light text-mj-t1 mb-6">Active Subscription</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-[13px]"><span className="text-mj-t4">Status</span><span className="text-green-600 font-medium">Active</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-mj-t4">Tier</span><span className="text-mj-t2 capitalize font-medium">{sub.tier}</span></div>
                    {sub.current_period_end && <div className="flex justify-between text-[13px]"><span className="text-mj-t4">Next Billing</span><span className="text-mj-t2">{formatDate(sub.current_period_end)}</span></div>}
                  </div>
                  <a href="https://billing.stripe.com/p/login/test" target="_blank" className="btn-outline text-[10px]">Manage Billing →</a>
                </div>
                <div className="border border-mj-b1 bg-mj-bg2 p-8">
                  <p className="text-[10px] tracking-widest uppercase text-mj-t4 mb-4 font-bold">This Month's Selections</p>
                  <p className="font-display text-[18px] font-light text-mj-t1 mb-3 italic">Your curation is being prepared.</p>
                  <p className="text-[13px] text-mj-t4 font-light">Monthly selections are dispatched in the first week of each month. You'll receive a tracking notification.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 border border-mj-b1">
                <p className="font-display text-xl font-light italic text-mj-t4 mb-3">Not yet a member</p>
                <Link href="/join-the-club" className="btn-solid mt-4">Join The Club</Link>
              </div>
            )}
          </div>
        )}

        {/* APPOINTMENTS */}
        {tab==='appointments' && (
          <div>
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-display text-[24px] font-light text-mj-t1">Appointments</h2>
              <Link href="/book" className="btn-solid text-[10px]">Book New Appointment →</Link>
            </div>
            <div className="text-center py-20 border border-mj-b1">
              <p className="font-display text-xl font-light italic text-mj-t4 mb-3">No upcoming appointments</p>
              <p className="text-[13px] text-mj-t5 mb-6">Book a private consultation, fitting, or atelier visit.</p>
              <Link href="/book" className="btn-solid">Book an Appointment</Link>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab==='settings' && (
          <div className="max-w-sm">
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Account Details</h2>
            <div className="space-y-6">
              <div><p className="eyebrow mb-1">Name</p><p className="text-[14px] text-mj-t2">{user?.user_metadata?.full_name||'—'}</p></div>
              <div><p className="eyebrow mb-1">Email</p><p className="text-[14px] text-mj-t2">{user?.email}</p></div>
              <div><p className="eyebrow mb-1">Member since</p><p className="text-[14px] text-mj-t2">{formatDate(user?.created_at)}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AccountPage() {
  const router = useRouter()
  const [user,    setUser]    = useState(null)
  const [orders,  setOrders]  = useState([])
  const [sub,     setSub]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { createClient } = await import('@/lib/supabase/client')
      const sb = createClient()
      const { data } = await sb.auth.getUser()
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      const [ordersRes, subRes] = await Promise.all([
        sb.from('orders').select('*').eq('user_id',data.user.id).order('created_at',{ascending:false}).limit(20),
        sb.from('club_subscriptions').select('*').eq('user_id',data.user.id).eq('status','active').single()
      ])
      setOrders(ordersRes.data||[])
      setSub(subRes.data||null)
      setLoading(false)
    }
    load()
  }, [])

  async function signOut() {
    const { createClient } = await import('@/lib/supabase/client')
    const sb = createClient()
    await sb.auth.signOut()
    toast.success('Signed out')
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen bg-mj-bg flex items-center justify-center" style={{paddingTop:'var(--nav-h)'}}>
      <div className="w-6 h-6 border border-mj-b2 border-t-mj-t2 rounded-full animate-spin"/>
    </div>
  )

  return <Dashboard user={user} orders={orders} sub={sub}/>
}
