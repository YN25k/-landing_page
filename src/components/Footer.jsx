import { Wordmark } from './Reticle'

export default function Footer() {
  return (
    <footer className="px-6 pt-14 pb-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-cream-200">
        <Wordmark />
        <nav className="flex flex-wrap gap-6 text-[13px] text-ink-500">
          <a href="#features" className="hover:text-ink-900">功能</a>
          <a href="#demo"     className="hover:text-ink-900">演示</a>
          <a href="#waitlist" className="hover:text-ink-900">候补名单</a>
          <a href="#ugc"      className="hover:text-ink-900">指点助力</a>
        </nav>
        <p className="text-[12px] text-ink-400">© 2026 指点. 用心打造。</p>
      </div>
    </footer>
  )
}
