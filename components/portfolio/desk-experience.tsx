'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, MousePointer2, Pause, Play, RotateCcw } from 'lucide-react'

function DeskFallback() {
  return <div className="desk-fallback" role="img" aria-label="Developer workstation with Python code on a monitor"><div className="fallback-monitor"><span className="font-mono">~/workspace/main.py</span><pre>{'def build_something():\n    idea = curiosity()\n    return create(idea)\n\n>>> ready to build_'}</pre></div><div className="fallback-stand" /><div className="fallback-desk" /></div>
}
const DeskScene = dynamic(() => import('./desk-scene'), { ssr: false, loading: () => <DeskFallback /> })

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <DeskFallback /> : this.props.children }
}

export function DeskExperience() {
  const container = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(true)
  const [visible, setVisible] = useState(true)
  const [angle, setAngle] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    if (container.current) observer.observe(container.current)
    return () => { media.removeEventListener('change', update); observer.disconnect() }
  }, [])
  const motion = !paused && !reduced && visible
  return <div className="desk-experience" ref={container}>
    <div className="workspace-label font-mono"><span className="status-dot" /> WORKSPACE / PERSONAL</div>
    <div className="scene-canvas" aria-label="Interactive 3D developer desk. Drag to rotate, or use the rotation buttons below.">
      <SceneBoundary><DeskScene motion={motion} visible={visible} angle={angle} resetKey={resetKey} fallback={<DeskFallback />} /></SceneBoundary>
    </div>
    <div className="scene-toolbar"><span className="drag-hint"><MousePointer2 size={14} /> Drag to explore</span><div className="scene-controls"><button type="button" aria-label="Rotate desk left" onClick={() => setAngle(value => Math.max(-0.55, value - 0.18))}><ChevronLeft size={15} /></button><button type="button" aria-label="Rotate desk right" onClick={() => setAngle(value => Math.min(0.55, value + 0.18))}><ChevronRight size={15} /></button><button type="button" aria-label="Reset desk view" onClick={() => { setAngle(0); setResetKey(value => value + 1) }}><RotateCcw size={14} /></button><button type="button" aria-label={paused || reduced ? 'Enable desk motion' : 'Pause desk motion'} aria-pressed={motion} onClick={() => { if (reduced) { setReduced(false); setPaused(false) } else setPaused(value => !value) }}>{paused || reduced ? <Play size={14} /> : <Pause size={14} />}</button></div></div>
  </div>
}
