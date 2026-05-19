'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CATEGORY_IMAGES, CATEGORY_PRICES } from '@/lib/utils'
import ProductModal from '@/components/product/ProductModal'

// Re-export from sections
export { WatchesSection as default } from '@/components/home/sections'
