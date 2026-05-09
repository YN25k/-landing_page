import { useState, useEffect } from 'react'
import { Wordmark } from './Reticle'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? 'backdrop-blur-md bg-cream-100/75 border-b border-cream-200' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top"><Wordmark /></a>
        <nav className="hidden md:flex items-center gap-8 text-[14px] text-ink-700">
          <a href="#features" className="hover:text-ink-900 transition-colors">功能</a>
          <a href="#demo"     className="hover:text-ink-900 transition-colors">演示</a>
          <a href="#waitlist" className="hover:text-ink-900 transition-colors">加入候补</a>
          <a href="#ugc"      className="hover:text-ink-900 transition-colors">指点助力</a>
        </nav>
        <a href="#waitlist" className="text-[13px] font-medium px-4 py-2 rounded-full bg-ink-900 text-cream-50 hover:bg-ink-700 transition-colors">
          加入候补名单
        </a>
      </div>
    </header>
  )
}
