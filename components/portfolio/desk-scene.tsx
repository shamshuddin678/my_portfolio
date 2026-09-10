'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { CanvasTexture, SRGBColorSpace, type Group } from 'three'

const palette = { dark: '#101c24', slate: '#677784', mint: '#75dec4', ivory: '#edf0e9', wood: '#ac9380' }
type Position = [number, number, number]
function Box({ position, size, color = palette.dark, radius = 0.035, rotation = [0, 0, 0] }: { position: Position; size: Position; color?: string; radius?: number; rotation?: Position }) {
  return <RoundedBox args={size} radius={radius} smoothness={3} position={position} rotation={rotation} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.65} /></RoundedBox>
}

function Screen() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024; canvas.height = 640
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = palette.dark; ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = palette.slate; ctx.fillRect(0, 0, 1024, 49)
    ctx.fillStyle = palette.ivory; ctx.font = '18px monospace'; ctx.fillText('EXPLORER     main.py                             —  □  ×', 24, 32)
    ctx.fillStyle = '#172832'; ctx.fillRect(0, 49, 184, 430)
    ctx.font = '17px monospace'; ctx.fillStyle = palette.slate
    ;['WORKSPACE', '⌄ backend', '  api/', '  models/', '  services/', '  main.py', '  config.py', '  README.md'].forEach((line, i) => ctx.fillText(line, 15, 86 + i * 29))
    ctx.fillStyle = palette.mint; ctx.fillRect(0, 215, 3, 27)
    const lines: [string, string][] = [
      ['from fastapi import FastAPI', palette.mint], ['', palette.ivory], ['app = FastAPI()', palette.ivory], ['', palette.ivory], ['@app.get("/")', palette.wood], ['async def hello_world():', palette.mint], ['    return {', palette.ivory], ['        "developer": "Shamshuddin",', palette.wood], ['        "craft": "Python backends",', palette.wood], ['        "status": "ready to build"', palette.wood], ['    }', palette.ivory],
    ]
    ctx.font = '21px monospace'
    lines.forEach(([line, color], i) => { ctx.fillStyle = palette.slate; ctx.fillText(String(i + 1).padStart(2, ' '), 204, 95 + i * 31); ctx.fillStyle = color; ctx.fillText(line, 254, 95 + i * 31) })
    ctx.fillStyle = palette.slate; ctx.fillRect(184, 468, 840, 1)
    ctx.font = '17px monospace'; ctx.fillText('TERMINAL     OUTPUT     DEBUG CONSOLE', 207, 500)
    ctx.fillStyle = palette.mint; ctx.fillText('❯ uvicorn main:app --reload', 207, 543)
    ctx.fillText('  Application startup complete.', 207, 575)
    ctx.fillStyle = palette.mint; ctx.fillRect(0, 611, 1024, 29)
    ctx.fillStyle = palette.dark; ctx.font = '16px monospace'; ctx.fillText('  main*                                         Python 3.12    UTF-8', 14, 632)
    const map = new CanvasTexture(canvas); map.colorSpace = SRGBColorSpace
    return map
  }, [])
  useEffect(() => () => texture.dispose(), [texture])
  return <mesh position={[0, 2.2, -0.507]}><planeGeometry args={[2.68, 1.66]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
}

function Plant() {
  return <group position={[-2.07, 1.05, -0.57]}>
    <mesh position={[0, 0.14, 0]} castShadow><cylinderGeometry args={[0.23, 0.17, 0.29, 24]} /><meshStandardMaterial color={palette.ivory} /></mesh>
    <mesh position={[0, 0.292, 0]}><cylinderGeometry args={[0.205, 0.205, 0.012, 24]} /><meshStandardMaterial color={palette.dark} /></mesh>
    {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[Math.sin(i * 2.4) * 0.13, 0.43 + (i % 3) * 0.09, Math.cos(i * 2.4) * 0.12]} rotation={[Math.sin(i) * 0.7, i, Math.cos(i) * 0.6]} castShadow><sphereGeometry args={[1, 12, 8]} /><meshStandardMaterial color={palette.mint} roughness={0.9} /><group /><primitive object={undefined} attach={undefined} /></mesh>)}
  </group>
}

function Workstation({ motion, angle }: { motion: boolean; angle: number }) {
  const group = useRef<Group>(null)
  useFrame(({ clock }) => { if (group.current) group.current.rotation.y = angle + (motion ? Math.sin(clock.elapsedTime * 0.25) * 0.045 : 0) })
  return <group ref={group} position={[0, -0.5, 0]}>
    <Box position={[0, 0.92, 0]} size={[5.3, 0.19, 2.55]} color={palette.wood} radius={0.07} />
    <Box position={[0, 0.815, 0]} size={[5.1, 0.035, 2.4]} color={palette.dark} radius={0.01} />
    {[-2.12, 2.12].map(x => <group key={x}><Box position={[x, 0.1, -0.83]} size={[0.15, 1.45, 0.15]} /><Box position={[x, 0.1, 0.84]} size={[0.15, 1.45, 0.15]} /><Box position={[x, -0.61, 0]} size={[0.22, 0.12, 2.1]} /></group>)}
    <Box position={[0, 1.057, 0.48]} size={[2.7, 0.03, 1.12]} color={palette.slate} radius={0.07} />
    <Box position={[0, 1.06, -0.52]} size={[0.8, 0.065, 0.5]} color={palette.slate} />
    <Box position={[0, 1.4, -0.7]} size={[0.16, 0.67, 0.16]} color={palette.slate} />
    <Box position={[0, 2.2, -0.64]} size={[2.91, 1.88, 0.25]} radius={0.075} />
    <Screen />
    <mesh position={[0, 1.314, -0.506]}><sphereGeometry args={[0.018, 8, 8]} /><meshBasicMaterial color={palette.mint} /></mesh>
    <Box position={[-0.27, 1.12, 0.45]} size={[1.73, 0.08, 0.57]} color={palette.ivory} radius={0.035} />
    {Array.from({ length: 4 }, (_, row) => Array.from({ length: 13 }, (_, col) => <Box key={`${row}-${col}`} position={[-1.027 + col * 0.126, 1.17, 0.235 + row * 0.126]} size={[0.105, 0.035, 0.1]} color={row === 0 || col === 0 ? palette.mint : palette.slate} radius={0.014} />))}
    <Box position={[-0.27, 1.19, 0.7]} size={[0.63, 0.035, 0.075]} color={palette.ivory} radius={0.012} />
    <Box position={[0.94, 1.14, 0.45]} size={[0.26, 0.14, 0.42]} color={palette.ivory} radius={0.09} />
    <Box position={[0.94, 1.214, 0.4]} size={[0.023, 0.01, 0.11]} color={palette.mint} radius={0.005} />
    <group position={[2.01, 1.62, -0.29]}><Box position={[0, 0, 0]} size={[0.68, 1.18, 1.12]} radius={0.05} /><Box position={[0, 0.03, 0.566]} size={[0.52, 0.97, 0.012]} color={palette.slate} radius={0.02} />{[-0.2, 0.23].map(y => <group key={y} position={[0, y, 0.584]}><mesh><torusGeometry args={[0.166, 0.018, 8, 28]} /><meshStandardMaterial color={palette.mint} emissive={palette.mint} emissiveIntensity={0.55} /></mesh><mesh><circleGeometry args={[0.13, 24]} /><meshStandardMaterial color={palette.dark} /></mesh><mesh><circleGeometry args={[0.036, 16]} /><meshStandardMaterial color={palette.slate} /></mesh></group>)}<Box position={[0, 0.48, 0.59]} size={[0.16, 0.025, 0.01]} color={palette.mint} radius={0.003} /></group>
    <group position={[-1.89, 1.04, -0.62]}><mesh position={[0, 0.14, 0]} castShadow><cylinderGeometry args={[0.235, 0.17, 0.29, 24]} /><meshStandardMaterial color={palette.ivory} /></mesh>{Array.from({ length: 9 }, (_, i) => <mesh key={i} position={[Math.sin(i * 2.4) * 0.12, 0.38 + (i % 3) * 0.085, Math.cos(i * 2.4) * 0.12]} rotation={[Math.sin(i) * 0.7, i, Math.cos(i) * 0.6]} scale={[0.065, 0.23, 0.045]} castShadow><sphereGeometry args={[1, 12, 8]} /><meshStandardMaterial color={palette.mint} roughness={0.9} /></mesh>)}</group>
    <group position={[-1.93, 1.2, 0.65]}><mesh castShadow><cylinderGeometry args={[0.16, 0.14, 0.32, 24]} /><meshStandardMaterial color={palette.ivory} roughness={0.4} /></mesh><mesh position={[0, 0.162, 0]}><cylinderGeometry args={[0.135, 0.135, 0.007, 24]} /><meshStandardMaterial color={palette.dark} /></mesh><mesh position={[-0.16, 0, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.09, 0.027, 8, 20]} /><meshStandardMaterial color={palette.ivory} /></mesh></group>
    <group position={[1.35, 1.04, -0.93]}><mesh><cylinderGeometry args={[0.23, 0.23, 0.07, 24]} /><meshStandardMaterial color={palette.slate} /></mesh><Box position={[0, 0.66, 0]} size={[0.035, 1.3, 0.035]} color={palette.slate} radius={0.01} /><Box position={[-0.17, 1.32, 0]} size={[0.38, 0.04, 0.04]} color={palette.slate} radius={0.01} /><mesh position={[-0.36, 1.3, 0]} rotation={[0, 0, 0.3]}><coneGeometry args={[0.19, 0.25, 24, 1, true]} /><meshStandardMaterial color={palette.ivory} side={2} /></mesh><pointLight position={[-0.37, 1.14, 0]} color={palette.ivory} intensity={2} distance={3} /></group>
    <Box position={[1.83, 1.08, 0.81]} size={[0.58, 0.055, 0.38]} color={palette.mint} rotation={[0, -0.18, 0]} radius={0.012} />
    <Box position={[1.82, 1.115, 0.81]} size={[0.56, 0.02, 0.35]} color={palette.ivory} rotation={[0, -0.18, 0]} radius={0.005} />
  </group>
}

export default function DeskScene({ motion, visible, angle, resetKey, fallback }: { motion: boolean; visible: boolean; angle: number; resetKey: number; fallback: ReactNode }) {
  return <Canvas shadows dpr={[1, 1.5]} frameloop={visible ? 'always' : 'never'} camera={{ position: [7.5, 5.8, 9.7], fov: 35 }} fallback={fallback} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.25} />
    <directionalLight position={[-3, 7, 5]} intensity={3.5} color={palette.ivory} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-bias={-0.001} />
    <directionalLight position={[4, 3, -3]} intensity={3} color={palette.mint} />
    <Workstation motion={motion} angle={angle} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow><planeGeometry args={[200, 200]} /><shadowMaterial opacity={0.2} /></mesh>
    <OrbitControls key={resetKey} target={[0, 0.65, 0]} enableZoom={false} enablePan={false} minPolarAngle={0.8} maxPolarAngle={1.3} minAzimuthAngle={-0.55} maxAzimuthAngle={1.1} enableDamping />
  </Canvas>
}
