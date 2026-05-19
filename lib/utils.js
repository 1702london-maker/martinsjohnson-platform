import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind class merger
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Currency formatter
export function formatPrice(amount, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Slug generator
export function slugify(str) {
  return str.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '')
}

// Truncate text
export function truncate(str, length = 100) {
  if (!str || str.length <= length) return str
  return str.slice(0, length).trim() + '…'
}

// Category image map — sources from /public/images/categories/
// Drop your images here: public/images/categories/{key}.jpg
export const CATEGORY_IMAGES = {
  oxford:      '/images/categories/oxford.jpg',
  loafer:      '/images/categories/loafer.jpg',
  boot:        '/images/categories/boot.jpg',
  derby:       '/images/categories/derby.jpg',
  monkstrap:   '/images/categories/monkstrap.jpg',
  sneaker:     '/images/categories/sneaker.jpg',
  slipper:     '/images/categories/slipper.jpg',
  highheel:    '/images/categories/highheel.jpg',
  bag:         '/images/categories/bag.jpg',
  accessories: '/images/categories/accessories.jpg',
  exotic:      '/images/categories/exotic.jpg',
  bespoke:     '/images/categories/bespoke.jpg',
}

// Category label map
export const CATEGORY_LABELS = {
  oxford:      'Oxford & Brogue',
  loafer:      'Loafers',
  boot:        'Boots',
  derby:       'Derby',
  monkstrap:   'Monkstrap',
  sneaker:     'Sneakers',
  slipper:     'Slippers & Mules',
  highheel:    'High Heels',
  bag:         'Bags & Luggage',
  accessories: 'Leather Accessories',
  exotic:      'Exotic Leathers',
  bespoke:     'Bespoke',
}

// Starting prices
export const CATEGORY_PRICES = {
  oxford:      1200,
  loafer:      850,
  boot:        1350,
  derby:       980,
  monkstrap:   1050,
  sneaker:     750,
  slipper:     480,
  highheel:    920,
  bag:         1800,
  accessories: 120,
  exotic:      2200,
  bespoke:     1500,
}

// Laced shoe styles — show lace colour selector
export const LACED_STYLES = ['oxford', 'derby', 'sneaker']

// Date formatter
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(dateStr))
}

// Order number generator
export function generateOrderNumber() {
  return 'MJ-' + Math.random().toString(36).slice(2, 10).toUpperCase()
}

// Debounce
export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
