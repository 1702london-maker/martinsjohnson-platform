export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-16">
        <span className="eyebrow mb-4 block">Returns & Exchanges</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1">Our Returns <em className="italic text-mj-t4">Policy.</em></h1>
      </div>
      <div className="px-6 md:px-14 lg:px-20 py-16 max-w-3xl">
        <div className="border border-mj-b1 bg-amber-50/50 border-amber-200 p-8 mb-8">
          <p className="text-[10px] tracking-widest uppercase text-amber-700 font-bold mb-2">Important</p>
          <p className="text-[14px] text-amber-800 font-light leading-relaxed">The majority of our products are bespoke and made to your personal specification. Please read this policy carefully before placing your order.</p>
        </div>
        <div className="space-y-0 border border-mj-b1">
          {[
            {
              title:'Bespoke & Personalised Items — Non-Returnable',
              content:'All bespoke commissions, made-to-order shoes, and products with personal initials or custom specifications are non-returnable and non-exchangeable. These items are made specifically for you — they cannot be resold or fulfilled to another customer. We invest significant time and skill into each piece. Please ensure you are confident in your specifications before confirming your order.',
              accent:true
            },
            {
              title:'Ready-to-Wear Returns',
              content:'Ready-to-wear items may be returned within 14 days of receipt, provided there are no visible wear marks on the upper or soles and the item is returned in its original packaging. Items that show signs of wear will not be accepted.'
            },
            {
              title:'Manufacturing Defects',
              content:'In the rare event of a genuine manufacturing defect, we will repair, replace, or refund the item at our discretion regardless of whether it is bespoke or ready-to-wear. Defects must be reported within 7 days of receipt with photographic evidence sent to sales@1702london.com.'
            },
            {
              title:'How to Initiate a Return',
              content:'Email sales@1702london.com with your order number, the item you wish to return, and the reason. Our team will assess your request and, if eligible, provide return instructions within 2 business days. Do not return items without prior authorisation.'
            },
            {
              title:'Exchanges',
              content:'Size exchanges on ready-to-wear items are available within 14 days, subject to stock availability. If your size is unavailable, a refund will be offered. Exchanges on bespoke or personalised items are not possible.'
            },
            {
              title:'Refund Processing',
              content:'Approved refunds are processed within 5–10 business days of receiving the returned item. Refunds are issued to the original payment method. Shipping costs are non-refundable unless the item was faulty.'
            },
          ].map((item,i)=>(
            <div key={item.title} className={`border-b border-mj-b1 last:border-0 px-8 py-8 hover:bg-mj-bg2 transition-colors ${item.accent?'bg-mj-bg2':''}`}>
              <p className="font-display text-[19px] font-normal text-mj-t1 mb-3">{item.title}</p>
              <p className="text-[14px] text-mj-t4 font-light leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border border-mj-b1 p-8 text-center">
          <p className="font-display text-[20px] font-light text-mj-t1 mb-2">Questions About a Return?</p>
          <p className="text-[13px] text-mj-t4 font-light mb-5">Our team will help you navigate the process.</p>
          <a href="mailto:sales@1702london.com" className="btn-solid">Contact Us →</a>
        </div>
      </div>
    </div>
  )
}
