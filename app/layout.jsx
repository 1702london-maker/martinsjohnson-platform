import './globals.css'
import Navigation from '@/components/layout/Navigation'
import CartDrawer from '@/components/layout/CartDrawer'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/features/SmoothScroll'
import CustomCursor from '@/components/features/CustomCursor'
import MarqueeBar from '@/components/features/MarqueeBar'
import FloatingContacts from '@/components/ui/FloatingContacts'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: { default:'Martins Johnson — Crafting Legacy Through Luxury', template:'%s | Martins Johnson' },
  description:'Luxury leather goods, bespoke shoes, and cultural innovation. Handcrafted to order. London.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-mj-bg text-mj-t2 font-sans antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <CartDrawer />
          <FloatingContacts />
          <Toaster position="bottom-right" toastOptions={{ style:{ background:'#F9F8F6',color:'#1A1A18',border:'1px solid #D5D3CE',fontSize:'13px',fontFamily:'DM Sans, sans-serif',fontWeight:'400',borderRadius:'0' } }}/>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
