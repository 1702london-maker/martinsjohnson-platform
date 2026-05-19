'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function TrackPage() {
  const [orderNum, setOrderNum] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function track(e) {
    e.preventDefault()
    if (!orderNum||!email) { toast.error('Order number and email required'); return }
    setLoading(true)
    await new Promise(r=>setTimeout(r,800))
    // In production this would query the orders table
    setResult({ status:'processing', message:'Your order is being handcrafted. Expected dispatch in 2–3 weeks.', orderNum: orderNum.toUpperCase() })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-16">
        <span className="eyebrow mb-4 block">Order Tracking</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1">Track Your <em className="italic text-mj-t4">Order.</em></h1>
      </div>
      <div className="px-6 md:px-14 lg:px-20 py-16 max-w-lg">
        {!result ? (
          <form onSubmit={track} className="flex flex-col gap-6">
            <div>
              <label className="eyebrow mb-2 block">Order Number</label>
              <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                <input value={orderNum} onChange={e=>setOrderNum(e.target.value)} placeholder="MJ-XXXXXXXX"
                  className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-mono placeholder-mj-t5"/>
              </div>
            </div>
            <div>
              <label className="eyebrow mb-2 block">Email Address</label>
              <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="The email used to place the order"
                  className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-solid self-start disabled:opacity-50">
              {loading ? 'Checking…' : 'Track Order →'}
            </button>
          </form>
        ) : (
          <div className="border border-mj-b1 p-8">
            <p className="eyebrow mb-3">{result.orderNum}</p>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[9px] tracking-widest uppercase px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-200 font-bold">{result.status}</span>
            </div>
            <p className="text-[14px] text-mj-t3 font-light leading-relaxed mb-6">{result.message}</p>
            <button onClick={()=>setResult(null)} className="text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 transition-colors font-medium">← Track Another Order</button>
          </div>
        )}
        <div className="mt-8 border-t border-mj-b1 pt-8">
          <p className="text-[13px] text-mj-t4 font-light">Need detailed tracking information? <a href="mailto:sales@1702london.com" className="text-mj-t2 hover:text-mj-t1 transition-colors">Email our team</a> with your order number.</p>
        </div>
      </div>
    </div>
  )
}
