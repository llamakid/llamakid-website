import React, { useEffect, useRef, useState } from 'react'

export default function HeroBackground() {
  const [Scene, setScene] = useState(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let alive = true
    import('./HeroScene').then((mod) => {
      if (alive) setScene(() => mod.default)
    })

    const onMove = (e) => {
      pointerRef.current.x = e.clientX / window.innerWidth - 0.5
      pointerRef.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onMove)

    return () => {
      alive = false
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  if (!Scene) return null

  return (
    <div className="hero-bg" aria-hidden="true">
      <Scene pointerRef={pointerRef} />
    </div>
  )
}
