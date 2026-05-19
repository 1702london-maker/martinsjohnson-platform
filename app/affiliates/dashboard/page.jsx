'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const MOCK_STATS = { clicks:1247, conversions:38, revenue:4820, commission:579, pending:214, paid:365 }
const MOCK_REFS = [
  { id:'MJ-A8X2K', clicks:342, conv:12, earned:144, status:'paid' },
  { id:'MJ-B4P9L', clicks:218, conv:8,  earned:96,  status:'paid' },
  { id:'MJ-C7Q1M', clicks:687, conv:18, earned:216, status:'pending' },
]

export default function AffiliateDashboard() {
  const [tab, setTab] = useState('overview')
  const TABS = ['overview','links','campaigns','assets','payouts','messages']

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
      <div className="bg-mj-bg2 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-10 pb-8">
        <span className="eyebrow mb-2 block">Affiliate Dashboard</span>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-[clamp(24px,4vw,40px)] font-light text-mj-t1">
            Your <em className="italic text-mj-t4">Performance</em>
          </h1>
          <span className="text-[9px] tracking-widest uppercase border border-mj-b2 px-3 py-1.5 text-mj-t4 font-bold">Influencer Tier · 15%</span>
        </div>
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
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 border border-mj-b1 mb-10">
              {[
                { label:'Total Clicks',   value: MOCK_STATS.clicks.toLocaleString() },
                { label:'Conversions',    value: MOCK_STATS.conversions },
                { label:'Revenue',        value: `£${MOCK_STATS.revenue.toLocaleString()}` },
                { label:'Commission',     value: `£${MOCK_STATS.commission}` },
                { label:'Pending',        value: `£${MOCK_STATS.pending}` },
                { label:'Total Paid',     value: `£${MOCK_STATS.paid}` },
              ].map((s,i)=>(
                <div key={s.label} className="px-5 py-6 border-r border-mj-b1 last:border-0">
                  <p className="text-[9px] tracking-widest uppercase text-mj-t5 mb-1 font-bold">{s.label}</p>
                  <p className="font-display text-[22px] font-light text-mj-t1">{s.value}</p>
                </div>
              ))}
            </div>
            {/* Recent performance */}
            <h3 className="font-display text-[20px] font-light text-mj-t1 mb-5">Referral Links</h3>
            <div className="border border-mj-b1">
              {MOCK_REFS.map(ref=>(
                <div key={ref.id} className="flex items-center justify-between px-6 py-4 border-b border-mj-b1 last:border-0 hover:bg-mj-bg2 transition-colors">
                  <div>
                    <p className="text-[12px] font-mono text-mj-t2 font-medium">{ref.id}</p>
                    <p className="text-[10px] text-mj-t5">{ref.clicks} clicks · {ref.conv} conversions</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <p className="font-display text-[16px] font-light text-mj-t1">£{ref.earned}</p>
                    <span className={`text-[9px] tracking-widest uppercase px-2 py-1 font-bold border ${ref.status==='paid'?'text-green-600 border-green-200 bg-green-50':'text-amber-600 border-amber-200 bg-amber-50'}`}>{ref.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='links' && (
          <div>
            <h2 className="font-display text-[24px] font-light text-mj-t1 mb-8">Your Referral Links</h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { name:'Main Shop',        url:'https://martinsjohnson.com/shop?ref=YOUR_CODE' },
                { name:'Bespoke Shoes',    url:'https://martinsjohnson.com/bespoke/shoes?ref=YOUR_CODE' },
                { name:'Join The Club',    url:'https://martinsjohnson.com/join-the-club?ref=YOUR_CODE' },
                { name:'1702 Collection',  url:'https://martinsjohnson.com/1702?ref=YOUR_CODE' },
              ].map(l=>(
                <div key={l.name} className="border border-mj-b1 p-5 hover:border-mj-b2 transition-colors">
                  <p className="text-[11px] font-medium text-mj-t3 mb-2">{l.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[11px] font-mono text-mj-t4 flex-1 truncate">{l.url}</p>
                    <button onClick={()=>{navigator.clipboard.writeText(l.url);toast?.('Copied')}}
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
                  <span className="text-[9px] tracking-widest uppercase text-mj-t5 font-bold block mb-2">{a.type} · {a.size}</span>
                  <p className="text-[13px] font-medium text-mj-t2 group-hover:text-mj-t1 transition-colors mb-4">{a.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">Download →</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {['campaigns','payouts','messages'].includes(tab) && (
          <div className="text-center py-20 border border-mj-b1">
            <p className="font-display text-xl font-light italic text-mj-t4 mb-3 capitalize">{tab} coming soon</p>
            <p className="text-[13px] text-mj-t5">This feature is being built. Contact your affiliate manager in the meantime.</p>
            <a href="mailto:affiliates@martinsjohnson.com" className="btn-solid mt-6">Contact Affiliate Team →</a>
          </div>
        )}
      </div>
    </div>
  )
}
