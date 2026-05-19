import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const CURRENCIES = [
  { code: 'GBP', symbol: '£',   name: 'British Pound',  rate: 1     },
  { code: 'USD', symbol: '$',   name: 'US Dollar',      rate: 1.27  },
  { code: 'EUR', symbol: '€',   name: 'Euro',           rate: 1.17  },
  { code: 'NGN', symbol: '₦',   name: 'Nigerian Naira', rate: 2050  },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham',     rate: 4.67  },
  { code: 'SAR', symbol: '﷼',   name: 'Saudi Riyal',    rate: 4.76  },
]

export const LANGUAGES = [
  { code: 'en', label: 'English',  dir: 'ltr', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch',  dir: 'ltr', flag: '🇩🇪' },
  { code: 'es', label: 'Español',  dir: 'ltr', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية',  dir: 'rtl', flag: '🇸🇦' },
]

export const useGlobalStore = create(
  persist(
    (set, get) => ({
      currency: CURRENCIES[0],
      language: LANGUAGES[0],
      setCurrency: currency => set({ currency }),
      setLanguage: language => {
        set({ language })
        if (typeof document !== 'undefined') {
          document.documentElement.dir  = language.dir
          document.documentElement.lang = language.code
        }
      },
      formatPrice: (gbp) => {
        const { currency } = get()
        const v = Math.round(gbp * currency.rate)
        return `${currency.symbol}${v.toLocaleString()}`
      },
    }),
    { name: 'mj-global' }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], open: false,
      setOpen: open => set({ open }),
      addItem: product => {
        const key = `${product.productId}-${product.colour}-${product.size}-${product.sole}`
        const ex  = get().items.find(i => i.id === key)
        if (ex) set(s => ({ items: s.items.map(i => i.id===key ? {...i,qty:i.qty+1} : i), open:true }))
        else    set(s => ({ items: [...s.items, {...product,id:key,qty:product.qty||1}], open:true }))
      },
      removeItem: id  => set(s => ({ items: s.items.filter(i=>i.id!==id) })),
      updateQty: (id,qty) => {
        if (qty<=0) set(s => ({ items: s.items.filter(i=>i.id!==id) }))
        else        set(s => ({ items: s.items.map(i=>i.id===id?{...i,qty}:i) }))
      },
      clearCart: () => set({ items: [] }),
      get itemCount() { return get().items.reduce((n,i)=>n+i.qty,0) },
      get subtotal()  { return get().items.reduce((s,i)=>s+i.price*i.qty,0) },
    }),
    { name: 'mj-cart', partialize: s=>({ items:s.items }) }
  )
)


export const useBespokeStore = create(set => ({
  form: { type:null,style:null,leather:null,colour:null,size:null,hardware:null,lining:null,initials:'',notes:'',referenceImages:[] },
  step: 1,
  setField: (k,v) => set(s=>({ form:{...s.form,[k]:v} })),
  setStep:  step  => set({ step }),
  reset:    ()    => set({ step:1, form:{type:null,style:null,leather:null,colour:null,size:null,hardware:null,lining:null,initials:'',notes:'',referenceImages:[]} }),
}))

// ─── Wishlist Store ──────────────────────────────────────────
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find(i => i.id === product.id)
        if (exists) set(s => ({ items: s.items.filter(i => i.id !== product.id) }))
        else         set(s => ({ items: [...s.items, product] }))
      },
      has: (id) => get().items.some(i => i.id === id),
      count: () => get().items.length,
    }),
    { name: 'mj-wishlist' }
  )
)
