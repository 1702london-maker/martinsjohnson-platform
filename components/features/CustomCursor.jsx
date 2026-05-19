'use client'
// components/features/CustomCursor.jsx
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)
    let raf
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-mj-t1 rounded-full mix-blend-multiply hidden md:block" aria-hidden />
      <div ref={ringRef} className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-9 h-9 border border-mj-t1/20 rounded-full hidden md:block transition-[width,height,border-color] duration-300" aria-hidden />
    </>
  )
}
