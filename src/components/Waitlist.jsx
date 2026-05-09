import { useState } from 'react'

export default function Waitlist() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!phone && !email) return
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="relative px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="reveal text-[12px] font-mono tracking-[0.3em] text-ink-400 uppercase mb-3">候补名单</div>
        <h2 className="reveal delay-1 text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-bold text-ink-900 tracking-tight">
          抢先体验指点
        </h2>
        <p className="reveal delay-2 mt-5 text-[16px] leading-[1.75] text-ink-500" style={{ textWrap: 'pretty' }}>
          指点即将上线<br />留下信息，第一时间获得上线通知与专属优惠
        </p>

        {!submitted ? (
          <form onSubmit={onSubmit} className="reveal delay-3 mt-10 mx-auto max-w-md text-left bg-cream-50 border border-cream-200 rounded-2xl p-7 space-y-4">
            <label className="block">
              <span className="block text-[13px] font-medium text-ink-700 mb-1.5">手机号码</span>
              <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="138 0000 0000"
                className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px] placeholder:text-ink-400" />
            </label>
            <label className="block">
              <span className="block text-[13px] font-medium text-ink-700 mb-1.5">邮箱地址</span>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com"
                className="field w-full px-4 py-3 rounded-xl bg-cream-100 border border-cream-200 text-[15px] placeholder:text-ink-400" />
            </label>
            <button type="submit" className="w-full mt-2 py-3.5 rounded-xl bg-ink-900 text-cream-50 font-medium hover:bg-ink-700 transition-colors">
              加入候补名单
            </button>
            <p className="text-center text-[12px] text-ink-400 pt-1">免费加入 · 信息保密 · 不发垃圾信息</p>
          </form>
        ) : (
          <div className="mt-10 mx-auto max-w-md bg-cream-50 border border-cream-200 rounded-2xl p-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-lime flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11.5l4.5 4.5L18 6.5" stroke="#1F1F1D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="text-[20px] font-semibold text-ink-900">你已加入候补名单！</h3>
            <p className="mt-2 text-[14px] text-ink-500">我们会尽快联系你。</p>
          </div>
        )}
      </div>
    </section>
  )
}
