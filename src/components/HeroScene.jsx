import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import WireframeShape from './WireframeShape'

function ParticleField({ pointerRef }) {
  const { size } = useThree()
  const pointsRef = useRef()
  const lineRef = useRef()

  const { positions, colors, velocities, count, maxLineVerts } = useMemo(() => {
    const area = size.width * size.height
    const count = Math.min(120, Math.max(36, Math.floor(area / 11000)))
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 2)
    const orange = new THREE.Color('#e05c1a')
    const sky = new THREE.Color('#4a9ab5')
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * size.width
      positions[i * 3 + 1] = (Math.random() - 0.5) * size.height
      positions[i * 3 + 2] = 0
      velocities[i * 2] = (Math.random() - 0.5) * 10
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 10
      const c = Math.random() > 0.65 ? orange : sky
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors, velocities, count, maxLineVerts: count * 6 * 3 }
  }, [size.width, size.height])

  const linePositions = useMemo(() => new Float32Array(maxLineVerts), [maxLineVerts])

  useFrame((_, delta) => {
    const pts = pointsRef.current
    const lines = lineRef.current
    if (!pts || !lines) return

    const pos = pts.geometry.attributes.position.array
    const halfW = size.width / 2
    const halfH = size.height / 2
    const pointer = pointerRef.current
    const mouseX = pointer.x * size.width
    const mouseY = -pointer.y * size.height
    const dt = Math.min(delta, 0.05)

    for (let i = 0; i < count; i++) {
      let x = pos[i * 3]
      let y = pos[i * 3 + 1]
      const dx = x - mouseX
      const dy = y - mouseY
      const distSq = dx * dx + dy * dy
      if (distSq < 14400) {
        const dist = Math.sqrt(distSq) || 1
        const f = (1 - dist / 120) * 40
        x += (dx / dist) * f * dt
        y += (dy / dist) * f * dt
      }
      x += velocities[i * 2] * dt
      y += velocities[i * 2 + 1] * dt
      if (x > halfW) x = -halfW
      if (x < -halfW) x = halfW
      if (y > halfH) y = -halfH
      if (y < -halfH) y = halfH
      pos[i * 3] = x
      pos[i * 3 + 1] = y
    }
    pts.geometry.attributes.position.needsUpdate = true

    const linePos = lines.geometry.attributes.position.array
    let vi = 0
    const maxDistSq = 110 * 110
    outer:
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dSq = dx * dx + dy * dy
        if (dSq < maxDistSq) {
          if (vi + 6 > linePos.length) break outer
          linePos[vi++] = pos[i * 3]
          linePos[vi++] = pos[i * 3 + 1]
          linePos[vi++] = 0
          linePos[vi++] = pos[j * 3]
          linePos[vi++] = pos[j * 3 + 1]
          linePos[vi++] = 0
        }
      }
    }
    lines.geometry.setDrawRange(0, vi / 3)
    lines.geometry.attributes.position.needsUpdate = true
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={3.2} vertexColors transparent opacity={0.85} sizeAttenuation={false} />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b9b9b2" transparent opacity={0.22} />
      </lineSegments>
    </>
  )
}

export default function HeroScene({ pointerRef }) {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 100], near: 0.1, far: 1000 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <WireframeShape pointerRef={pointerRef} />
      <ParticleField pointerRef={pointerRef} />
    </Canvas>
  )
}
