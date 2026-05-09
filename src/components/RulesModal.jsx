import { useEffect } from 'react'
import { Reticle } from './Reticle'

const rules = [
  { t: '参与资格', d: '任何指点用户均可申请，不限地域与年龄。' },
  { t: '内容要求', d: '真实使用体验，原创内容，不少于 30 秒视频或 200 字图文。' },
  { t: '奖励机制', d: '根据内容质量与推荐转化发放奖金，具体金额将在正式上线后公布。' },
  { t: '审核周期', d: '提交内容后 3–5 个工作日内审核完成，结果通过邮件通知。' },
  { t: '注意事项', d: '禁止虚假宣传，禁止刷量行为；违规者将取消参与资格。' },
]

export default function RulesModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-ink-900/40 modal-back" onClick={onClose}></div>
      <div className="relative modal-card max-w-lg w-full bg-cream-50 border border-cream-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <Reticle size={18} animated={false} />
            <h3 className="text-[16px] font-semibold text-ink-900">指点助力 — 活动规则</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-cream-200 flex items-center justify-center text-ink-500">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-4">
          {rules.map((r, i) => (
            <div key={r.t} className="flex gap-4">
              <div className="font-mono text-[12px] text-ink-400 pt-1 w-8">0{i + 1}</div>
              <div className="flex-1">
                <h4 className="text-[14px] font-semibold text-ink-900 mb-1">{r.t}</h4>
                <p className="text-[13px] leading-[1.7] text-ink-500">{r.d}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 p-4 rounded-xl bg-lime-soft/60 border border-lime/40 text-[12px] text-ink-700 leading-[1.7]">
            最终解释权归指点团队所有。如有疑问，请通过候补名单邮件回复联系我们。
          </div>
        </div>
        <div className="px-6 py-4 border-t border-cream-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 rounded-full bg-ink-900 text-cream-50 text-[14px] font-medium hover:bg-ink-700 transition-colors">
            我已了解
          </button>
        </div>
      </div>
    </div>
  )
}
