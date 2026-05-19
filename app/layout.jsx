import './globals.css'
import { Toaster }    from 'react-hot-toast'
import Navigation     from '@/components/layout/Navigation'
import Footer         from '@/components/layout/Footer'
import CartDrawer     from '@/components/layout/CartDrawer'
import FloatingContacts from '@/components/ui/FloatingContacts'

export const metadata = {
  metadataBase: new URL('https://martinsjohnson.com'),
  title: {
    default:  'Martins Johnson | Luxury Bespoke Footwear & Leather Goods',
    template: '%s | Martins Johnson',
  },
  description: 'Handcrafted bespoke footwear and leather goods. Crafting Legacy Through Luxury. Based in London.',
  keywords: ['bespoke shoes', 'luxury footwear', 'handcrafted shoes', 'London shoemaker', 'leather goods', '1702 London'],
  authors: [{ name: 'Martins Johnson' }],
  openGraph: {
    type:      'website',
    locale:    'en_GB',
    url:       'https://martinsjohnson.com',
    siteName:  'Martins Johnson',
    title:     'Martins Johnson | Luxury Bespoke Footwear',
    description: 'Handcrafted bespoke footwear and leather goods. Crafting Legacy Through Luxury.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Martins Johnson' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Martins Johnson | Luxury Bespoke Footwear',
    description: 'Crafting Legacy Through Luxury.',
    images:      ['/images/og-image.jpg'],
    creator:     '@1702londonbyMJ',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingContacts />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1A1A18',
              color: '#F9F8F6',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              borderRadius: '0',
              padding: '12px 16px',
            },
          }}
        />
      </body>
    </html>
  )
}
