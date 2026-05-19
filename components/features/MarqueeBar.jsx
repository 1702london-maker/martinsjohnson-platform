'use client'
// components/features/MarqueeBar.jsx

const ITEMS = [
  'Handcrafted Leather Goods',
  '·',
  'Bespoke Shoes London',
  '·',
  'Knife On Leather',
  '·',
  'Join The Club',
  '·',
  '1702 Watches',
  '·',
  'Crafting Legacy Through Luxury',
  '·',
  'Free UK Delivery Over £150',
  '·',
]

export default function MarqueeBar() {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-mj-t1 overflow-hidden py-3 border-t border-mj-b1">
      <div
        className="flex w-max animate-marquee"
        aria-hidden="true"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`px-10 text-[10px] tracking-[0.22em] uppercase whitespace-nowrap font-bold ${
              item === '·'
                ? 'text-mj-white/20'
                : 'text-mj-white/55'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
