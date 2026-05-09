const FeatureIcon = ({ kind }) => {
  if (kind === 'eye') return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full bg-lime-soft/60"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-7 rounded-full border-[1.5px] border-ink-900 bg-cream-50"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-ink-900"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-[150%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-lime-deep"></div>
      <div className="absolute left-1/2 top-1/2 translate-x-[80%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-lime-deep"></div>
    </div>
  )
  if (kind === 'hand') return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full bg-lime-soft/60"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-[1.5px] border-ink-900"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-[1.5px] border-ink-900"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-lime"></div>
      <div className="absolute right-3 bottom-3 text-ink-900 text-xl">↗</div>
    </div>
  )
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full bg-lime-soft/60"></div>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 right-3 h-px bg-ink-900/80"></div>
      {[0, 1, 2].map(i => (
        <div key={i} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink-900" style={{ left: `${20 + i * 22}%` }}></div>
      ))}
      <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-lime border border-lime-deep" style={{ left: '64%' }}></div>
    </div>
  )
}

const features = [
  {
    k: 'eye', t: '直接交互，无需描述',
    d: '指点直接读取你的屏幕，自动识别界面元素。不用打字描述你的问题，不用截图发给 AI—它已经看到了一切',
  },
  {
    k: 'hand', t: '告别枯燥学习，边做边学',
    d: '告别 20 分钟的教程视频，告别收藏了永远不会再看的文档。指点在你的实际应用中一步步引导，让你在操作中建立肌肉记忆',
  },
  {
    k: 'memo', t: '一步一指，过目不忘',
    d: '每一次点击都有语音讲解，每一步操作都有视觉引导。用过一次就记住，下次不需要再问',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="reveal max-w-2xl">
          <div className="text-[12px] font-mono tracking-[0.3em] text-ink-400 uppercase mb-3">核心功能</div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-bold text-ink-900 tracking-tight">
            为什么选择指点
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={f.t} className={`reveal delay-${i + 1} lift bg-cream-50 border border-cream-200 rounded-2xl p-7 flex flex-col`}>
              <FeatureIcon kind={f.k} />
              <h3 className="mt-7 text-[22px] font-semibold text-ink-900 tracking-tight">{f.t}</h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-ink-500" style={{ textWrap: 'pretty' }}>{f.d}</p>
              <div className="mt-6 pt-5 border-t border-cream-200 flex items-center gap-2 text-[12px] text-ink-400 font-mono">
                <span className="w-1 h-1 rounded-full bg-lime-deep"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
