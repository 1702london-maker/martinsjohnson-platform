import Link from 'next/link'
import NewsletterSignup from '@/components/ui/NewsletterSignup'

export default function Footer() {
  return (
    <footer style={{ background:'#14161A' }} className="border-t border-[#2C3038]">

      {/* Pre-footer CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#2C3038]">
        {[
          { label:'Join The Club',    sub:'Monthly drops. Exclusive access.', cta:'Become a Member', href:'/join-the-club' },
          { label:'Book Appointment', sub:'Virtual consultation. Your terms.',  cta:'Reserve Your Time', href:'/book' },
          { label:'Member Portal',    sub:'Your account. Your world.',          cta:'Access Dashboard', href:'/account' },
        ].map((item,i) => (
          <div key={item.label} className="px-10 py-12 border-b md:border-b-0 md:border-r border-[#2C3038] last:border-0">
            <p className="text-[9px] tracking-[0.24em] uppercase text-[#6A7280] mb-2 font-bold">{item.label}</p>
            <p className="font-display text-[18px] font-light text-[#D8D8D4] mb-4 leading-snug">{item.sub}</p>
            <Link href={item.href} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#3A4048] text-[#8D9399] text-[9px] tracking-[0.18em] uppercase font-bold hover:border-[#D8D8D4] hover:text-[#D8D8D4] transition-all">
              {item.cta} →
            </Link>
          </div>
        ))}
      </div>

      {/* Leatherpreneur section */}
      <div className="border-b border-[#2C3038]">
        <div className="px-6 md:px-14 lg:px-20 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#6A7280] mb-3 font-bold">The Leatherpreneur</p>
            <h3 className="font-display text-[clamp(20px,2.5vw,30px)] font-light text-[#D8D8D4] mb-4 leading-tight">
              The Book That Defines <em className="italic text-[#5A6070]">A Movement.</em>
            </h3>
            <p className="text-[13px] text-[#6A7280] font-light leading-relaxed max-w-xl mb-6">
              From the streets to the ateliers of the world. A founder's blueprint for building a luxury brand from nothing, with everything.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/leatherpreneur" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#3A4048] text-[#8D9399] text-[9px] tracking-[0.18em] uppercase font-bold hover:border-[#D8D8D4] hover:text-[#D8D8D4] transition-all">Explore the Book →</Link>
              <Link href="/leatherpreneur#purchase" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D8D8D4]/10 border border-[#3A4048] text-[#D8D8D4] text-[9px] tracking-[0.18em] uppercase font-bold hover:bg-[#D8D8D4]/20 transition-all">Purchase →</Link>
            </div>
          </div>
          <div className="border border-[#2C3038] p-6 bg-[#1C1F24]">
            <p className="text-[9px] tracking-[0.2em] uppercase text-[#6A7280] mb-4 font-bold">Featured Chapters</p>
            {['The Vision Before the Brand','Leather as Legacy','Building Global in a Local World','The Price of Craft'].map((ch,i) => (
              <div key={ch} className="flex items-start gap-3 mb-3 last:mb-0">
                <span className="font-display text-[11px] text-[#3A4048] flex-shrink-0 mt-0.5">0{i+1}</span>
                <p className="text-[12px] text-[#6A7280] font-light leading-snug">{ch}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main 5-column footer */}
      <div className="px-6 md:px-14 lg:px-20 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <img src="/images/logo.png" alt="1702 London" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85, marginBottom: '0.75rem' }} />
            <p className="text-[12px] text-[#6A7280] font-display italic leading-relaxed mb-6 max-w-[200px]">"Crafting legacy through luxury — one story, one stitch, one vision."</p>
            <div className="flex gap-4 flex-wrap mb-4">
              {[['IG','https://instagram.com/martinsjohnsonofficial'],['FB','https://facebook.com/martinsjonsonofficial'],['TW','https://twitter.com/1702londonbyMJ'],['WA','https://wa.me/447918046999']].map(([n,h])=>(
                <a key={n} href={h} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.14em] uppercase text-[#8D9399] hover:text-[#D8D8D4] transition-colors font-bold">{n}</a>
              ))}
            </div>
            <p className="text-[9px] tracking-widest uppercase text-[#4A5060] font-bold">London · Lagos · Dubai</p>
          </div>

          {/* Brand */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#D8D8D4] mb-4 font-bold">Brand</p>
            <ul className="space-y-3">
              {[['Shop','/shop'],['Bespoke','/bespoke'],['Build Your Brand','/build-your-brand'],['Stockist','/stockist'],['1702 Collection','/1702']].map(([l,h])=>(
                <li key={h}><Link href={h} className="text-[12px] font-bold text-[#7A8088] hover:text-[#D8D8D4] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Publicity */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#D8D8D4] mb-4 font-bold">Publicity</p>
            <ul className="space-y-3">
              {[['Press','/press'],['Journal','/journal'],['Our Campaign','/knife-on-leather'],['Social Responsibility','/foundation'],['Affiliates','/affiliates']].map(([l,h])=>(
                <li key={h}><Link href={h} className="text-[12px] font-bold text-[#7A8088] hover:text-[#D8D8D4] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#D8D8D4] mb-4 font-bold">About</p>
            <ul className="space-y-3">
              {[['FAQ','/faq'],['Contact Us','/contact'],['Shipping','/shipping'],['Track Order','/track'],['Returns','/returns'],['Careers','/careers']].map(([l,h])=>(
                <li key={h}><Link href={h} className="text-[12px] font-bold text-[#7A8088] hover:text-[#D8D8D4] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[14px] font-display font-bold text-[#D8D8D4] mb-1">Stay Connected</p>
            <p className="text-[11px] text-[#6A7280] mb-4 leading-relaxed">New arrivals, private drops and atelier stories.</p>
            <NewsletterSignup source="footer" variant="dark" compact />
            <p className="text-[9px] text-[#3A4048] font-medium">No spam · Unsubscribe anytime</p>
          </div>
        </div>

        <div className="border-t border-[#2C3038] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#4A5060] font-bold tracking-wide">© 2025 Martins Johnson. All rights reserved. London, United Kingdom.</p>
          <p className="text-[9px] text-[#4A5060] font-bold">Visa · Mastercard · Amex · Apple Pay · Stripe</p>
        </div>
      </div>
    </footer>
  )
}
