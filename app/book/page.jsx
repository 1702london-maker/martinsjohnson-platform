'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, addDays, isSunday, isSaturday } from 'date-fns'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const TYPES = [
  { id:'virtual',         label:'Virtual Consultation',      desc:'One-to-one video call with our team. Discuss bespoke shoes, bags, or leather goods.' },
  { id:'digital-fitting', label:'Digital Fitting Session',   desc:'A guided remote session to capture your measurements and preferences precisely.' },
  { id:'remote-bespoke',  label:'Remote Bespoke Session',    desc:'Full bespoke design session via video. Review leathers, styles, and personalisation.' },
  { id:'styling',         label:'Online Styling Consultation', desc:'Curated styling advice tailored to you — virtually, from anywhere in the world.' },
  { id:'partnership',     label:'Partnership Meeting',        desc:'Discuss wholesale, stockist, or brand collaboration opportunities.' },
  { id:'general',         label:'General Enquiry',            desc:'Any other consultation with the Martins Johnson team.' },
]

const TIMES = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']

function getWeekdays(n=30) {
  const days=[]; let d=new Date(); d.setDate(d.getDate()+1)
  while(days.length<n){if(!isSaturday(d)&&!isSunday(d))days.push(new Date(d));d.setDate(d.getDate()+1)}
  return days
}

function BookForm() {
  const params = useSearchParams()
  const router = useRouter()
  const defaultType = params.get('type') || null

  const [step, setStep]   = useState(defaultType ? 2 : 1)
  const [type, setType]   = useState(defaultType)
  const [date, setDate]   = useState(null)
  const [time, setTime]   = useState(null)
  const [form, setForm]   = useState({ name:'', email:'', phone:'', notes:'' })
  const [loading, setLoading] = useState(false)

  const days = getWeekdays(30)

  async function submit() {
    if (!form.name||!form.email) { toast.error('Name and email required'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/appointments', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ type, date:format(date,'yyyy-MM-dd'), time, name:form.name, email:form.email, phone:form.phone, notes:form.notes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Appointment confirmed. Check your email for details.')
      router.push('/')
    } catch(e) { toast.error(e.message||'Something went wrong') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-mj-bg" style={{ paddingTop:'var(--nav-h)' }}>
      {/* Hero */}
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-14">
        <span className="eyebrow mb-4 block">Private Consultation</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1 mb-3">
          Book an <em className="italic text-mj-t4">Appointment.</em>
        </h1>
        <p className="text-[14px] text-mj-t4 font-light max-w-md leading-relaxed">
          All consultations are conducted virtually — via video call, from anywhere in the world.
        </p>
      </div>

      {/* Steps */}
      <div className="flex border-b border-mj-b1">
        {['Consultation Type','Date & Time','Your Details'].map((s,i)=>(
          <div key={s} className={`flex-1 py-4 text-center text-[10px] tracking-widest uppercase font-bold border-r border-mj-b1 last:border-0 transition-colors ${step===i+1?'text-mj-t1 border-b-2 border-b-mj-t1':'text-mj-t5'}`}>{s}</div>
        ))}
      </div>

      <div className="px-6 md:px-14 lg:px-20 py-14 max-w-3xl">

        {/* STEP 1 */}
        {step===1 && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <p className="font-display text-[22px] font-light text-mj-t1 mb-8">What type of virtual appointment?</p>
            <div className="flex flex-col gap-2">
              {TYPES.map(t=>(
                <button key={t.id} onClick={()=>{setType(t.id);setStep(2)}}
                  className="flex items-center justify-between p-5 border border-mj-b1 text-left hover:border-mj-t2 hover:bg-mj-bg2 transition-all group">
                  <div>
                    <p className="text-[14px] font-medium text-mj-t2 group-hover:text-mj-t1">{t.label}</p>
                    <p className="text-[12px] text-mj-t4 font-light mt-0.5">{t.desc}</p>
                  </div>
                  <span className="text-mj-t5 group-hover:text-mj-t2 text-lg">→</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step===2 && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <button onClick={()=>setStep(1)} className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 mb-8 font-medium">← Back</button>
            <p className="font-display text-[22px] font-light text-mj-t1 mb-8">Select a date and time</p>
            <p className="eyebrow mb-4">Available Dates</p>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5 mb-10">
              {days.map(d=>(
                <button key={d.toISOString()} onClick={()=>setDate(d)}
                  className={`py-3 text-center border transition-all ${date&&format(date,'yyyy-MM-dd')===format(d,'yyyy-MM-dd')?'border-mj-t1 bg-mj-t1 text-mj-white':'border-mj-b1 hover:border-mj-b2 text-mj-t3'}`}>
                  <p className="text-[9px] tracking-wider uppercase text-inherit">{format(d,'EEE')}</p>
                  <p className="text-[14px] font-medium">{format(d,'d')}</p>
                  <p className="text-[9px] opacity-60">{format(d,'MMM')}</p>
                </button>
              ))}
            </div>
            {date && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.4}}>
                <p className="eyebrow mb-4">Available Times — {format(date,'EEEE d MMMM')} (GMT)</p>
                <div className="grid grid-cols-4 gap-2 mb-10">
                  {TIMES.map(t=>(
                    <button key={t} onClick={()=>setTime(t)}
                      className={`py-3 border text-[12px] font-medium transition-all ${time===t?'border-mj-t1 bg-mj-t1 text-mj-white':'border-mj-b1 hover:border-mj-b2 text-mj-t3'}`}>{t}</button>
                  ))}
                </div>
              </motion.div>
            )}
            {date&&time && <button onClick={()=>setStep(3)} className="btn-solid">Continue →</button>}
          </motion.div>
        )}

        {/* STEP 3 */}
        {step===3 && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <button onClick={()=>setStep(2)} className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-mj-t4 hover:text-mj-t1 mb-8 font-medium">← Back</button>
            <p className="font-display text-[22px] font-light text-mj-t1 mb-2">Your Details</p>
            <p className="text-[13px] text-mj-t4 mb-8 font-light">{TYPES.find(t=>t.id===type)?.label} · {date&&format(date,'EEEE d MMMM')} · {time} GMT</p>
            <div className="flex flex-col gap-5 max-w-md">
              {[
                {id:'name',  label:'Full Name *',       type:'text',  placeholder:'Martins Johnson' },
                {id:'email', label:'Email Address *',   type:'email', placeholder:'hello@example.com' },
                {id:'phone', label:'Phone (optional)',  type:'tel',   placeholder:'+44 7700 000000' },
              ].map(f=>(
                <div key={f.id}>
                  <label className="eyebrow mb-2 block">{f.label}</label>
                  <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                    <input type={f.type} value={form[f.id]} onChange={e=>setForm(p=>({...p,[f.id]:e.target.value}))} placeholder={f.placeholder}
                      className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5"/>
                  </div>
                </div>
              ))}
              <div>
                <label className="eyebrow mb-2 block">Notes</label>
                <div className="border-b border-mj-b1 focus-within:border-mj-t1 transition-colors">
                  <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={3} placeholder="Any references, questions, or specific requests…"
                    className="w-full bg-transparent text-mj-t2 text-[14px] py-3 outline-none font-light placeholder-mj-t5 resize-none"/>
                </div>
              </div>
              <button onClick={submit} disabled={loading} className="btn-solid disabled:opacity-50">
                {loading?'Booking…':'Confirm Virtual Appointment'}
              </button>
              <p className="text-[11px] text-mj-t5">Video link sent via email · No deposit required · Free to book</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-mj-bg flex items-center justify-center"><div className="w-5 h-5 border border-mj-b2 border-t-mj-t2 rounded-full animate-spin"/></div>}>
      <BookForm />
    </Suspense>
  )
}
