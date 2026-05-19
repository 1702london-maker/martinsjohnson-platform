'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q:"I am unsure about my size and do not live near your retail partners. What do you recommend?",
    a:"If you know your size in other luxury footwear brands, please visit our size guide page. We have put together sizing references with help from our customers. If still uncertain, we recommend ordering sample shoes to compare sizes at home. You can also email sales@1702london.com with your usual size and last in other brands — and any brands that don't fit well — so we can better understand your foot shape. Ready-to-wear shoes are returnable within 14 days with no visible wear marks on the upper or soles."
  },
  {
    q:"Can I customise a shoe in a different colour, material, or sole?",
    a:"Yes. We can customise any current style — changing the upper material (box calf, pebble grain, suede), the sole (Vibram, JR soles), and the colour (solid colours or patinas). All custom shoes are made-to-order (MTO) and include a £150 MTO fee (exotic skins excluded). We require a 70% deposit to place an MTO order. The balance is collected before delivery. Email sales@1702london.com and our team will create a custom SKU for you."
  },
  {
    q:"How do I place a bespoke or semi-bespoke order?",
    a:"For bespoke orders, we work directly with you to take measurements and design your shoe from scratch. Contact our bespoke team via WhatsApp or email bespoke@1702london.com. For semi-bespoke (our MJ Heritage Collection), please email bespoke@1702london.com. Depending on current demand and queue, we will advise on availability."
  },
  {
    q:"Made-to-order takes 4–6 weeks. Is there any way to receive them faster?",
    a:"4–6 weeks is our standard turnaround. We deliver on a first come, first served basis and will not accept additional payments to prioritise one order over another. We do everything possible to dispatch earlier when conditions allow."
  },
  {
    q:"Can you declare a lower value on my order for customs purposes?",
    a:"No. UK law requires accurate invoicing and accounting compliance. We cannot declare a lower value under any circumstances."
  },
  {
    q:"Is a group made-to-order possible?",
    a:"Absolutely. We can arrange a group MTO for any model where at least 3 people are ready to place an order. The £150 MTO fee is waived per pair. Email bespoke@1702london.com to organise a group commission."
  },
  {
    q:"How do I maintain my patina shoes?",
    a:"We have put together a care guide with video resources created in partnership with C.G. Vingsand Shoeshine. Please email sales@1702london.com if you need specific guidance on your pair."
  },
  {
    q:"Can you resole my shoes?",
    a:"Yes. Email sales@1702london.com for pricing and turnaround information on resoling services."
  },
  {
    q:"Why do ready-made shoes take 7–10 business days if they are already made?",
    a:"Each pair is individually hand-finished after your order is placed. This allows us to accommodate custom requests on the patina or sole finishing. Every pair also receives a handmade glaseage (mirror shine finishing) applied just before dispatch, as a glaseage can crack if stored for extended periods before wearing."
  },
  {
    q:"How can I support the brand beyond purchasing?",
    a:"Post reviews, share on social media, and tag us on Instagram, Facebook, TikTok, Snapchat, or Twitter. Word of mouth from customers who love the product is the most valuable support we can receive."
  },
  {
    q:"Are bespoke items returnable?",
    a:"No. Bespoke and personalised items — including any with initials or custom specifications — are non-returnable and non-exchangeable except in the case of a genuine manufacturing defect."
  },
  {
    q:"How do I join the affiliate or influencer programme?",
    a:"Visit our Affiliates page and complete the application form. Our team reviews all applications within 48 hours."
  },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-mj-b1 last:border-0">
      <button onClick={()=>setOpen(o=>!o)} className="flex items-center justify-between w-full px-7 py-5 text-left hover:bg-mj-bg2 transition-colors group">
        <p className="text-[14px] font-medium text-mj-t2 group-hover:text-mj-t1 transition-colors pr-8 leading-snug">{q}</p>
        <span className={`text-mj-t4 flex-shrink-0 transition-transform duration-300 text-xl leading-none ${open?'rotate-45':''}`}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}}>
            <p className="px-7 pb-6 text-[14px] text-mj-t4 font-light leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-16">
        <span className="eyebrow mb-4 block">Frequently Asked Questions</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1">Everything You <em className="italic text-mj-t4">Need to Know.</em></h1>
      </div>
      <div className="px-6 md:px-14 lg:px-20 py-12 max-w-4xl">
        <div className="border border-mj-b1">
          {FAQS.map((faq,i)=><FAQ key={i} q={faq.q} a={faq.a}/>)}
        </div>
        <div className="mt-10 border border-mj-b1 p-8 bg-mj-bg2 text-center">
          <p className="font-display text-[20px] font-light text-mj-t1 mb-2">Still Have Questions?</p>
          <p className="text-[13px] text-mj-t4 font-light mb-5">Our team is available via email, WhatsApp, and virtual appointment.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="mailto:sales@1702london.com" className="btn-solid text-[10px]">Email Us →</a>
            <a href="https://wa.me/447918046999" target="_blank" className="btn-outline text-[10px]">WhatsApp →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
