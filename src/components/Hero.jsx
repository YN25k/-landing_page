export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 px-6">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 -top-32 -translate-x-1/2 w-[80vw] max-w-[1100px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(197,225,122,0.35), rgba(197,225,122,0) 70%)', filter: 'blur(20px)' }}></div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cream-300 bg-cream-50/70 text-[12px] tracking-wide text-ink-700">
          <span className="live-dot"></span>
          即将上线 · 限量内测中
        </div>

        <h1 className="reveal delay-1 mt-6 text-[clamp(40px,7vw,84px)] leading-[1.04] font-bold text-ink-900 tracking-tight" style={{ textWrap: 'balance' }}>
          指点{' '}
          <br />
          告诉你该<span className="relative inline-block">
            <span className="relative z-10">点哪里</span>
            <span aria-hidden="true" className="absolute left-0 right-0 bottom-1 h-[0.35em] bg-lime/70 rounded-sm -z-0"></span>
          </span>的 AI
        </h1>

        <p className="reveal delay-2 mt-7 max-w-2xl mx-auto text-[18px] md:text-[19px] leading-[1.7] text-ink-500" style={{ textWrap: 'pretty' }}>
          不用再描述问题，不用再翻教程。指点直接看到你的屏幕，<br className="hidden md:block" />
          一步一步指引你点击正确的位置，语音同步讲解每一步操作。
        </p>

        {/* Video */}
        <div className="reveal delay-3 mt-12 relative">
          <div className="relative mx-auto rounded-2xl overflow-hidden border border-cream-200 hero-glow" style={{ maxWidth: '1080px', aspectRatio: '16/9' }}>
            <video
              className="w-full h-full object-cover"
              src="/指点演示.mp4"
              controls
              playsInline
            />
          </div>
        </div>

        <div className="reveal delay-4 mt-10 flex flex-col items-center gap-3">
          <a href="#waitlist" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink-900 text-cream-50 text-[15px] font-medium hover:bg-ink-700 transition-colors">
            加入候补名单
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <p className="text-[12px] text-ink-400">免费加入 · 不发垃圾信息 · 即将发布</p>
        </div>
      </div>
    </section>
  )
}
