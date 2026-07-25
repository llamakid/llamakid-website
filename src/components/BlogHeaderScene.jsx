import React from 'react'
import { Canvas } from '@react-three/fiber'
import WireframeShape from './WireframeShape'

export default function BlogHeaderScene() {
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 100], near: 0.1, far: 1000 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <WireframeShape offsetX={0.32} offsetY={-0.08} scaleRatio={1.15} skyOpacity={0.32} orangeOpacity={0.17} />
    </Canvas>
  )
}
