'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function AffiliateDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState('overview')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const TABS = ['overview','links','campaigns','assets','payouts','messages']

  useEffect(() => {
    async function load() {
      const { createClient } = await import('@/lib/supabase/client')
      const sb = createClient()
      const { data: { user } } = await sb.auth.getUser()
      if (!user) { router.push('/login?redirect=/affiliates/dashboard'); return }

      const res = await fetch('/api/affiliates/dashboard')
      if (res.ok) {
        const d = await res.json()
        setData(d)
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to load dashboard')
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-mj-bg flex items-center justify-center" style={{paddingTop:'var(--nav-h)'}}>
      <div className="w-6 h-6 border border-mj-b2 border-t-mj-t2 rounded-full animate-spin"/>
    </div>
  )

  const affiliate   = data?.affiliate
  const application = data?.application
  const user        = data?.user
  const clicks      = data?.clicks || []
  const conversions = clicks.filter(c => c.converted)

  // Show pending state if no affiliate record yet
  if (!affiliate) {
    return (
      <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
        <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-10 pb-8">
          <span className="eyebrow mb-2 block">Affiliate Dashboard</span>
          <h1 className="font-display text-[clamp(24px,4vw,40px)] font-light text-mj-t1">
            Application <em className="italic text-mj-t4">Status</em>
          </h1>
        </div>
        <div className="px-6 md:px-14 lg:px-20 py-16">
          <div className="max-w-lg border border-mj-b1 p-12 text-center">
            {application ? (
              <>
                <div className={`inline-block text-[9px] tracking-widest uppercase px-3 py-1.5 font-bold border mb-6 ${
                  application.status === 'approved' ? 'text-green-600 border-green-200 bg-green-50' :
                  application.status === 'rejected' ? 'text-red-500 border-red-200 bg-red-50' :
                  'text-amber-600 border-amber-200 bg-amber-50'
                }`}>{application.status}</div>
                <p className="font-display text-[24px] font-light italic text-mj-t1 mb-3">
                  {application.status === 'pending' ? 'Application Under Review' :
                   application.status === 'approved' ? 'Application Approved' :
                   'Application Not Approved'}
                </p>
                <p className="text-[14px] text-mj-t4 font-light mb-8">
                  {application.status === 'pending'
                    ? 'We review all applications within 48 hours. You\'ll receive an email once a decision has been made.'
                    : application.status === 'approved'
                    ? 'Your account is being set up. You\'ll receive your referral code by email shortly.'
                    : 'Thank you for applying. Unfortunately we are not moving forward at this time. You are welcome to apply again in 3 months.'}
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-[24px] font-light italic text-mj-t1 mb-3">No Application Found</p>
                <p className="text-[14px] text-mj-t4 font-light mb-8">You haven't submitted an affiliate application yet.</p>
              </>
            )}
            <Link href="/affiliates#apply" className="btn-solid">
              {application ? 'Back to Affiliates' : 'Apply Now →'}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Full dashboard for approved affiliates
  const SITE = 'https://martinsjohnson.com'
  const code = affiliate.referral_code

  const LINKS = [
    { name:'Main Shop',       url:`${SITE}/shop?ref=${code}` },
    { name:'Bespoke Shoes',   url:`${SITE}/bespoke/shoes?ref=${code}` },
    { name:'Join The Club',   url:`${SITE}/join-the-club?ref=${code}` },
    { name:'1702 Collection', url:`${SITE}/1702?ref=${code}` },
    { name:'Exotic Leather',  url:`${SITE}/shop?category=exotic&ref=${code}` },
  ]

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-10 pb-8">
        <span className="eyebrow mb-2 block">Affiliate Dashboard</span>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-[clamp(24px,4vw,40px)] font-light text-mj-t1">
            Your <em className="italic text-mj-t4">Performance</em>
          </h1>
          <span className="text-[9px] tracking-widest uppercase border border-mj-b2 px-3 py-1.5 text-mj-t4 font-bold capitalize">
            {affiliate.tier} &middot; {affiliate.commission_rate}%
          </span>
        </div>
        <p className="text-[11px] text-mj-t5 mt-2">Code: <span className="font-mono text-mj-t3">{code}</span> &middot; {user?.email}</p>
      </div>

      <div className="border-b border-mj-b1 px-6 md:px-14 lg:px-20 overflow-x-auto">
        <div className="flex">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`py-4 px-1 mr-8 text-[10px] tracking-widest uppercase font-bold border-b-2 flex-shrink-0 transition-all ${tab===t?'border-mj-t1 text-mj-t1':'border-transparent text-mj-t5 hover:text-mj-t3'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-14 lg:px-20 py-12">

        {tab==='overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-6 border border-mj-b1 mb-10">
              {[
                { label:'Total Clicks',   value: affiliate.clicks?.toLocaleString() || '0' },
                { label:'Conversions',    value: affiliate.conversions || 0 },
                { label:'Commission',     value: `£${(affiliate.commission_balance||0).toFixed(2)}` },
                { label:'Total Earned',   value: `£${(affiliate.total_earned||0).toFixed(2)}` },
                { label:'Payout Status',  value: affiliate.payout_status || 'pending' },
                { label:'Tier',           value: affiliate.tier || 'creator' },
              ].map(s=>(
                <div key={s.label} className="px-5 py-6 border-r border-mj-b1 last:border-0">
                  <p className="text-[9px] tracking-widest uppercase text-mj-t5 mb-1 font-bold">{s.label}</p>
                  <p className="font-display text-[22px] font-light text-mj-t1 capitalize">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="border border-mj-b1 p-8 bg-mj-bg2 mb-8">
              <p className="eyebrow mb-3">Your Referral Link</p>
              <div className="flex items-center gap-4">
                <p className="text-[13px] font-mono text-mj-t3 flex-1 truncate">{SITE}/shop?ref={code}</p>
                <button onClick={()=>{navigator.clipboard.writeText(`${SITE}/shop?ref=${code}`); toast.success('Copied!')}}
                  className="text-[10px] tracking-widest uppercase border border-mj-b2 px-4 py-2 text-mj-t4 hover:text-mj-t1 hover:border-mj-t1 transition-all font-medium flex-shrink-0">
                  Copy Link
                </button>
              </div>
            </div>

            <p className="text-[11px] text-mj-t5">Referral clicks and conversions are tracked in real time. Commissions are calculated after the 14-day return window closes.</p>
          </div>
        )}

        {tab==='links' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Your Referral Links</h2>
            <div className="space-y-3 max-w-2xl">
              {LINKS.map(l=>(
                <div key={l.name} className="border border-mj-b1 p-5 hover:border-mj-b2 transition-colors">
                  <p className="text-[11px] font-medium text-mj-t3 mb-2">{l.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[11px] font-mono text-mj-t4 flex-1 truncate">{l.url}</p>
                    <button onClick={()=>{navigator.clipboard.writeText(l.url); toast.success('Copied!')}}
                      className="text-[9px] tracking-widest uppercase border border-mj-b1 px-3 py-1.5 text-mj-t4 hover:border-mj-b2 hover:text-mj-t2 transition-all font-medium flex-shrink-0">
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='assets' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Campaign Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name:'Brand Guidelines PDF',   size:'2.4MB', type:'PDF' },
                { name:'Campaign Photography',   size:'48MB',  type:'ZIP' },
                { name:'Product Imagery',        size:'32MB',  type:'ZIP' },
                { name:'Logo Pack',              size:'1.2MB', type:'ZIP' },
                { name:'Social Media Templates', size:'8MB',   type:'ZIP' },
                { name:'Founder Portrait Set',   size:'12MB',  type:'ZIP' },
              ].map(a=>(
                <div key={a.name} className="border border-mj-b1 p-5 hover:border-mj-b2 hover:bg-mj-bg2 transition-all cursor-pointer group">
                  <span className="text-[9px] tracking-widest uppercase text-mj-t5 font-bold block mb-2">{a.type} &middot; {a.size}</span>
                  <p className="text-[13px] font-medium text-mj-t2 group-hover:text-mj-t1 transition-colors mb-4">{a.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">Download →</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='payouts' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Payouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mb-10">
              <div className="border border-mj-b1 p-6">
                <p className="eyebrow mb-1">Available Balance</p>
                <p className="font-display text-[32px] font-light text-mj-t1">£{(affiliate.commission_balance||0).toFixed(2)}</p>
              </div>
              <div className="border border-mj-b1 p-6">
                <p className="eyebrow mb-1">Total Earned</p>
                <p className="font-display text-[32px] font-light text-mj-t1">£{(affiliate.total_earned||0).toFixed(2)}</p>
              </div>
            </div>
            <p className="text-[13px] text-mj-t4 font-light">Payouts are processed on the 1st of each month via bank transfer or Stripe. Contact <a href="mailto:affiliates@martinsjohnson.com" className="text-mj-t2 hover:text-mj-t1 transition-colors">affiliates@martinsjohnson.com</a> to set up your payment details.</p>
          </div>
        )}

        {['campaigns','messages'].includes(tab) && (
          <div className="text-center py-20 border border-mj-b1">
            <p className="font-display text-xl font-light italic text-mj-t4 mb-3 capitalize">{tab} coming soon</p>
            <p className="text-[13px] text-mj-t5">Contact your affiliate manager in the meantime.</p>
            <a href="mailto:affiliates@martinsjohnson.com" className="btn-solid mt-6">Contact Affiliate Team →</a>
          </div>
        )}
      </div>
    </div>
  )
}
