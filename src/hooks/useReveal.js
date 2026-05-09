import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' })
    els.forEach(e => {
      const r = e.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) e.classList.add('in')
      else io.observe(e)
    })
    return () => io.disconnect()
  }, [])
}
