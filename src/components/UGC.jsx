import { useState } from 'react'

export default function UGC({ onOpenRules }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', social: '', school: '' })
  const [submitted, setSubmitted] = useState(false)
  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const onSubmit = (e) => { e.preventDefault(); if (!form.name || !form.email) return; setSubmitted(true) }

  return (
    <section id="ugc" className="relative px-6 py-24 bg-cream-50/60 border-y border-cream-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.05fr_1.2fr] gap-12 items-start">
        {/* Left: pitch */}
        <div>
          <div className="reveal text-[12px] font-mono tracking-[0.3em] text-ink-400 uppercase mb-3">指点助力</div>
          <h2 className="reveal delay-1 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-ink-900 tracking-tight">
            成为创作者
          </h2>
          <p className="reveal delay-2 mt-5 text-[16px] leading-[1.8] text-ink-500" style={{ textWrap: 'pretty' }}>
            分享你的指点使用体验与推荐，帮助更多人发现指点，获得丰厚奖金回报。
          </p>
          <p className="reveal delay-2 mt-4 text-[15px] leading-[1.8] text-ink-500" style={{ textWrap: 'pretty' }}>
            指点助力是我们的创作者计划。用视频、图文或社交媒体分享你使用指点的真实体验，根据推荐效果获得现金奖励。无论你是专业创作者还是普通用户，都可以参与。
          </p>

          <div className="reveal delay-3 mt-8 grid grid-cols-3 gap-3">
            {[{ k: '内测名额', v: '500+' }, { k: '平均审核', v: '3 天' }, { k: '平台支持', v: '多端' }].map(s => (
              <div key={s.k} className="bg-cream-100 rounded-xl px-4 py-3 border border-cream-200">
                <div className="text-[18px] font-semibold text-ink-900">{s.v}</div>
                <div className="text-[11px] text-ink-400 mt-0.5 tracking-wide">{s.k}</div>
              </div>
            ))}
          </div>

          <button onClick={onOpenRules} className="reveal delay-3 mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-ink-900 underline-offset-4 hover:underline">
            查看活动规则与奖励详情
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* Right: form */}
        <div className="reveal delay-2">
          {!submitted ? (
            <form onSubmit={onSubmit} className="bg-cream-50 border border-cream-200 rounded-2xl p-7 grid grid-cols-2 gap-4">
              <label className="block col-span-1">
                <span className="block text-[13px] font-medium text-ink-700 mb-1.5">姓名</span>
                <input value={form.name} onChange={update('name')} className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px]" placeholder="你的姓名" />
              </label>
              <label className="block col-span-1">
                <span className="block text-[13px] font-medium text-ink-700 mb-1.5">手机号码</span>
                <input value={form.phone} onChange={update('phone')} type="tel" className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px]" placeholder="138 0000 0000" />
              </label>
              <label className="block col-span-2">
                <span className="block text-[13px] font-medium text-ink-700 mb-1.5">邮箱</span>
                <input value={form.email} onChange={update('email')} type="email" className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px]" placeholder="you@example.com" />
              </label>
              <label className="block col-span-2">
                <span className="block text-[13px] font-medium text-ink-700 mb-1.5">社交媒体账号</span>
                <input value={form.social} onChange={update('social')} className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px]" placeholder="抖音 / 小红书 / B站" />
              </label>
              <label className="block col-span-2">
                <span className="flex items-center justify-between text-[13px] font-medium text-ink-700 mb-1.5">
                  <span>学校 / 机构</span><span className="text-ink-400 font-normal">选填</span>
                </span>
                <input value={form.school} onChange={update('school')} className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px]" placeholder="例如：清华大学、字节跳动" />
              </label>
              <button type="submit" className="col-span-2 mt-1 py-3.5 rounded-xl bg-lime text-ink-900 font-semibold hover:bg-lime-deep transition-colors">
                申请加入指点助力
              </button>
            </form>
          ) : (
            <div className="bg-cream-50 border border-cream-200 rounded-2xl p-12 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-lime flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11.5l4.5 4.5L18 6.5" stroke="#1F1F1D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 className="text-[20px] font-semibold text-ink-900">申请已提交！</h3>
              <p className="mt-2 text-[14px] text-ink-500">我们会在 3 个工作日内联系你。</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
