export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-mj-bg" style={{paddingTop:'var(--nav-h)'}}>
      <div className="bg-mj-bg3 border-b border-mj-b1 px-6 md:px-14 lg:px-20 pt-20 pb-16">
        <span className="eyebrow mb-4 block">Shipping & Handling</span>
        <h1 className="font-display text-display-sm font-light text-mj-t1">Crafted to <em className="italic text-mj-t4">Order.</em></h1>
      </div>
      <div className="px-6 md:px-14 lg:px-20 py-16 max-w-3xl">
        <div className="space-y-0 border border-mj-b1">
          {[
            {
              title:'Bespoke Production Timeline',
              content:'All Martins Johnson products are bespoke and handcrafted to order. Standard production takes 3–4 weeks from order confirmation. This timeline reflects the quality of the process — not a delay. Each piece is individually crafted, quality-checked, and finished before dispatch.'
            },
            {
              title:'The Handcrafting Process',
              content:'Each piece passes through multiple stages of skilled production: pattern cutting, leather preparation, construction, finishing, quality assurance, and final inspection. This is not mass production. This is craft — and craft takes the time it takes.'
            },
            {
              title:'Made-to-Order Timeline',
              content:'Standard made-to-order (MTO): 4–6 weeks. Ready-to-wear (hand-finished): 7–10 business days. Bespoke commissions: 8–12 weeks depending on complexity and current queue. You will receive a dispatch confirmation with tracking as soon as your piece ships.'
            },
            {
              title:'UK Delivery',
              content:'Free standard UK delivery on all orders over £150. Express UK delivery (1–2 business days): £15. Orders are dispatched via tracked courier service. A signature is required on delivery.'
            },
            {
              title:'International Delivery',
              content:'International shipping is available to most countries. Rates are calculated at checkout based on destination and weight. Delivery typically takes 5–14 business days internationally. Import duties and taxes are the responsibility of the recipient — we cannot declare a lower value for customs purposes.'
            },
            {
              title:'Luxury Packaging',
              content:'Every Martins Johnson piece is dispatched in premium branded packaging: rigid box, tissue wrap, dust bag, and branded ribbon. The unboxing experience is part of the product.'
            },
          ].map((item,i)=>(
            <div key={item.title} className="border-b border-mj-b1 last:border-0 px-8 py-8 hover:bg-mj-bg2 transition-colors">
              <p className="font-display text-[19px] font-normal text-mj-t1 mb-3">{item.title}</p>
              <p className="text-[14px] text-mj-t4 font-light leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border border-mj-b1 p-8 bg-mj-bg2">
          <p className="eyebrow mb-3">Questions About Your Order?</p>
          <p className="text-[13px] text-mj-t4 font-light mb-5">Our team is available to give you a specific production and delivery estimate for your order.</p>
          <div className="flex gap-3 flex-wrap">
            <a href="mailto:sales@1702london.com" className="btn-solid text-[10px]">Email Us →</a>
            <a href="https://wa.me/447918046999" target="_blank" className="btn-outline text-[10px]">WhatsApp →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
