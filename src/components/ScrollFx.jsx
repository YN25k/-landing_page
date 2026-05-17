// Scroll-bound brand atmosphere:
//   1. Right-gutter "scroll thread" with a traveling lime reticle dot and per-section ticks
//   2. Section ignite (soft lime bloom) as each section enters view
//   3. Hero <h1> character cascade on load
//
// Per brand guide §13 — one light source. Everything keeps the lime palette,
// no extra colors, no decorative flourishes.

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'top',      label: '介绍' },
  { id: 'features', label: '功能' },
  { id: 'demo',     label: '演示' },
  { id: 'waitlist', label: '候补' },
  { id: 'ugc',      label: '助力' },
]

// Split the hero <h1> into per-character spans for the Apple-style cascade.
// CJK-safe: spans are inline (not inline-block) so line-breaking is preserved.
const cascadeHeroTitle = () => {
  const h1 = document.querySelector('#top h1')
  if (!h1 || h1.dataset.cascaded) return
  h1.dataset.cascaded = '1'
  h1.classList.remove('reveal', 'delay-1')
  h1.classList.add('char-cascade')

  const idx = { i: 0 }
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      if (!text) return
      const frag = document.createDocumentFragment()
      for (const ch of text) {
        if (ch === ' ' || ch === '\u00A0') { frag.appendChild(document.createTextNode(ch)); continue }
        const s = document.createElement('span')
        s.className = 'ch'
        s.textContent = ch
        s.style.animationDelay = `${idx.i * 32 + 220}ms`
        idx.i++
        frag.appendChild(s)
      }
      node.parentNode.replaceChild(frag, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip decorative children (e.g. the lime underline span on "点哪里")
      if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return
      [...node.childNodes].forEach(walk)
    }
  }
  [...h1.childNodes].forEach(walk)
}

export default function ScrollFx() {
  const [progress, setProgress] = useState(0)
  const [lit, setLit] = useState({})
  const [ticks, setTicks] = useState([])

  useEffect(() => {
    const cascadeTimer = setTimeout(cascadeHeroTitle, 120)

    // Ignite sections via IntersectionObserver
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting && en.intersectionRatio >= 0.15) {
          en.target.classList.add('ignite-lit')
          setLit(prev => prev[en.target.id] ? prev : { ...prev, [en.target.id]: true })
        }
      })
    }, { threshold: [0, 0.15, 0.5] })
    SECTIONS.forEach(({ id }) => {
      const sec = document.getElementById(id)
      if (sec) io.observe(sec)
    })

    // Compute tick positions for the gutter thread
    const computeTicks = () => {
      const denom = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const next = SECTIONS.map((s, i) => {
        const sec = document.getElementById(s.id)
        if (!sec) return null
        const center = sec.offsetTop + sec.offsetHeight * 0.45
        const pct = Math.max(0, Math.min(1, (center - window.innerHeight * 0.45) / denom))
        return { id: s.id, label: `0${i + 1} · ${s.label}`, pct }
      }).filter(Boolean)
      setTicks(next)
    }
    computeTicks()

    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const denom = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        setProgress(Math.max(0, Math.min(1, window.scrollY / denom)))
      })
    }
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    const onResize = () => { computeTicks(); onScroll() }
    window.addEventListener('resize', onResize)
    const settle1 = setTimeout(computeTicks, 400)
    const settle2 = setTimeout(computeTicks, 1200)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      io.disconnect()
      clearTimeout(cascadeTimer)
      clearTimeout(settle1)
      clearTimeout(settle2)
    }
  }, [])

  return (
    <div className="scroll-thread" aria-hidden="true">
      <div className="scroll-thread-fill" style={{ height: `${progress * 100}%` }}></div>
      {ticks.map(t => (
        <div key={t.id} className="scroll-thread-tick"
          data-lit={lit[t.id] ? 'true' : 'false'}
          style={{ top: `${t.pct * 100}%` }}>
          <span className="lbl">{t.label}</span>
        </div>
      ))}
      <div className="scroll-thread-dot" style={{ top: `${progress * 100}%` }}>
        <span className="dot"></span>
        <span className="ring"></span>
      </div>
    </div>
  )
}
