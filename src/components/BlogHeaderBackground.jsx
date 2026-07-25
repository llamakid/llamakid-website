import React, { useEffect, useState } from 'react'

export default function BlogHeaderBackground() {
  const [Scene, setScene] = useState(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let alive = true
    import('./BlogHeaderScene').then((mod) => {
      if (alive) setScene(() => mod.default)
    })

    return () => {
      alive = false
    }
  }, [])

  if (!Scene) return null

  return (
    <div className="blog-header-bg" aria-hidden="true">
      <Scene />
    </div>
  )
}
