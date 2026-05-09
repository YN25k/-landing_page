import { useState, useEffect, useRef } from 'react'

export default function CursorFollower() {
  const ref = useRef(null)
  const modeRef = useRef('cursor')
  const tgtRef  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onTarget = (e) => { modeRef.current = 'target'; tgtRef.current = { x: e.detail.x, y: e.detail.y } }
    const onCursor = () => { modeRef.current = 'cursor' }
    window.addEventListener('reticle:target', onTarget)
    window.addEventListener('reticle:cursor', onCursor)
    return () => {
      window.removeEventListener('reticle:target', onTarget)
      window.removeEventListener('reticle:cursor', onCursor)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf, mx = window.innerWidth / 2, my = window.innerHeight / 2, x = mx, y = my, started = false
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (!started) { x = mx; y = my; started = true } }
    const tick = () => {
      let tx, ty, k
      if (modeRef.current === 'target') {
        tx = tgtRef.current.x; ty = tgtRef.current.y; k = 0.14
      } else {
        tx = mx + 18; ty = my + 18; k = 0.32
      }
      x += (tx - x) * k
      y += (ty - y) * k
      el.style.transform = `translate3d(${x - 25}px, ${y - 25}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    tick()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  const [touch, setTouch] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(hover: none)')
    const sync = () => setTouch(m.matches)
    sync(); m.addEventListener?.('change', sync)
    return () => m.removeEventListener?.('change', sync)
  }, [])

  if (touch) return null
  return (
    <div ref={ref} className="reticle-wrap" style={{ width: 50, height: 50 }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="reticle-ring r1" style={{ width: 14, height: 14 }}></span>
        <span className="reticle-ring r2" style={{ width: 14, height: 14 }}></span>
        <span className="reticle-ring r3" style={{ width: 14, height: 14 }}></span>
        <span className="block reticle-dot"></span>
      </div>
    </div>
  )
}
