import { useEffect } from 'react'
import { setLenis } from '../lib/lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let alive = true
    let lenis
    let rafId

    import('lenis').then(({ default: Lenis }) => {
      if (!alive) return
      lenis = new Lenis({ duration: 1.1 })
      setLenis(lenis)

      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      alive = false
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
