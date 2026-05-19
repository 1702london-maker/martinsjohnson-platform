'use client'
import Link from 'next/link'
import { useGlobalStore } from '@/lib/store'

const T = {
  en: { eyebrow: 'London · Est. 2024', h1: 'Crafting Legacy', h2: 'Through Luxury', body: 'Handcrafted bespoke footwear and leather goods for the discerning individual. Every piece, a statement of permanence.', cta1: 'Explore Collection', cta2: 'Book Appointment' },
  fr: { eyebrow: 'Londres · Fondé 2024', h1: 'Forger un Héritage',h h2: 'Par le Luxe', body: 'Chaussures artisanales sur mesure et maroquinerie pour l'individu exigeant. Chaque pièce, une déclaration de permanence.', cta1: 'Explorer la Collection', cta2: 'Prendre Rendez-vous' },
  de: { eyebrow: 'London · Gegr. 2024', h1: 'Ein Erbe Schaffen', h2: 'Durch Luxus', body: 'Handgefertigte Maßschuhe und Lederwaren für anspruchsvolle Persönlichkeiten. Jedes Stück ein Statement der Beständigkeit.', cta1: 'Kollektion Entdecken', cta2: 'Termin Buchen' },
  es: { eyebrow: 'Londres · Fundado 2024', h1: 'Creando Legado', h2: 'A Través del Lujo', body: 'Calzado artesanal a medida y marroquinería para el individuo exigente. Cada pieza, una declaración de permanencia.', cta1: 'Explorar Colección', cta2: 'Reservar Cita' },
  ar: { eyebrow: 'لندن · تأسس 2024', h1: 'صياغة الإرث', h2: 'من خلال الفخامة', body: 'أحذية مصنوعة يدويًا وأدوات جلدية للأفراد المميزين. كل قطعة، تعبير عن الديمومة.', cta1: 'استكشف المجموعة', cta2: 'احجز موعداً' },
}

export default function Hero() {
  const { language } = useGlobalStore()
  const t = T[language?.code] || T.en

  return (
    <section className="relative min-h-screen flex items-end" style={{ background: '#EBEBEA', paddingTop: '4rem' }}>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(8rem, 20vw, 22rem)',
          fontWeight: 300,
          color: 'rgba(26,26,24,0.04)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          LEGACY
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">{t.eyebrow}</p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#1A1A18',
            marginBottom: '2rem',
          }}>
            {t.h1}<br /><em>{t.h2}</em>
          </h1>
          <p style={{ color: '#5A5A58', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '440px', marginBottom: '3rem' }}>
            {t.body}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-solid">{t.cta1}</Link>
            <Link href="/book" className="btn-outline">{t.cta2}</Link>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-mj-t1/10 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { num: '100%', label: 'Handcrafted' },
            { num: 'Bespoke', label: 'Every Pair' },
            { num: 'London', label: 'Made & Born' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 500 }}>{s.num}</p>
              <p className="eyebrow mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
