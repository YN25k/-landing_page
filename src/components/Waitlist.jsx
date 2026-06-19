export default function Waitlist() {
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

        <a
          href="https://v.wjx.cn/vm/ek12V3V.aspx#"
          className="reveal delay-3 inline-flex mt-10 min-w-56 items-center justify-center rounded-xl bg-ink-900 px-8 py-3.5 text-[15px] font-medium text-cream-50 transition-colors hover:bg-ink-700 focus:outline-none focus:ring-4 focus:ring-lime/35"
        >
          立即申请体验
        </a>
      </div>
    </section>
  )
}
