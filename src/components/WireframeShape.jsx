import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function WireframeShape({
  pointerRef,
  offsetX = 0.3,
  offsetY = 0.12,
  scaleRatio = 0.55,
  skyOpacity = 0.16,
  orangeOpacity = 0.09,
}) {
  const groupRef = useRef()
  const { size } = useThree()
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), [])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return
    const p = pointerRef?.current || { x: 0, y: 0 }
    g.rotation.y += delta * 0.09 + p.x * 0.01
    g.rotation.x += delta * 0.05 + p.y * 0.01
  })

  const posX = size.width * offsetX
  const posY = size.height * offsetY
  const scale = Math.min(size.width, size.height) * scaleRatio

  return (
    <group ref={groupRef} position={[posX, posY, 0]} scale={scale}>
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#4a9ab5" transparent opacity={skyOpacity} />
      </lineSegments>
      <lineSegments rotation={[0.2, 0.3, 0]} scale={1.03}>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#e05c1a" transparent opacity={orangeOpacity} />
      </lineSegments>
    </group>
  )
}
