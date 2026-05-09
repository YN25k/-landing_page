import InteractiveDemo from './demo/InteractiveDemo'

export default function DemoSection() {
  return (
    <section id="demo" className="relative px-6 py-24 bg-cream-50/60 border-y border-cream-200">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <div className="text-[12px] font-mono tracking-[0.3em] text-ink-400 uppercase mb-3">互动演示</div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-bold text-ink-900 tracking-tight">
            看看指点如何工作
          </h2>
          <p className="mt-5 text-[16px] text-ink-500">切换下方的应用，看指点如何一步步带你完成任务。</p>
        </div>
        <div className="reveal delay-2">
          <InteractiveDemo />
        </div>
      </div>
    </section>
  )
}
