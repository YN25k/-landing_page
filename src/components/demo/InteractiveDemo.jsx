import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import ImageEditorMock from './ImageEditorMock'
import SpreadsheetMock from './SpreadsheetMock'
import VideoEditorMock from './VideoEditorMock'

const DEMOS = {
  image: {
    label: '图像编辑', chip: '海报设计 · 创意工具',
    Mock: ImageEditorMock,
    steps: [
      { key: 'image-0', caption: '点击「新建图层」', side: 'left' },
      { key: 'image-1', caption: '选择画笔工具',     side: 'right' },
      { key: 'image-2', caption: '把不透明度调到 50%', side: 'left' },
    ],
    done: '海报有了新图层 · 干得漂亮',
  },
  sheet: {
    label: '电子表格', chip: '季度报表 · 数据分析',
    Mock: SpreadsheetMock,
    steps: [
      { key: 'sheet-0', caption: '选中 B6 单元格',    side: 'right' },
      { key: 'sheet-1', caption: '在公式栏输入 =SUM', side: 'right' },
      { key: 'sheet-2', caption: '点击「图表」',      side: 'right' },
    ],
    done: '利润趋势已生成 · 看到 Q4 的拐点了吗？',
  },
  video: {
    label: '视频剪辑', chip: '假日 vlog · 多轨剪辑',
    Mock: VideoEditorMock,
    steps: [
      { key: 'video-0', caption: '把素材拖到时间线', side: 'right' },
      { key: 'video-1', caption: '切换为剃刀工具',   side: 'right' },
      { key: 'video-2', caption: '点击「导出」',      side: 'left' },
    ],
    done: '一刀剪好 · 准备发布',
  },
}

export default function InteractiveDemo() {
  const [tab, setTab] = useState('image')
  const [stepIdx, setStepIdx] = useState(0)
  const [missCount, setMissCount] = useState(0)
  const [target, setTarget] = useState(null)
  const stageRef = useRef(null)

  const cfg = DEMOS[tab]
  const total = cfg.steps.length
  const finished = stepIdx >= total
  const step = !finished ? cfg.steps[stepIdx] : null

  useEffect(() => { setStepIdx(0); setMissCount(0) }, [tab])

  useLayoutEffect(() => {
    if (!step || !stageRef.current) { setTarget(null); return }
    const find = () => {
      const stage = stageRef.current
      if (!stage) return
      const el = stage.querySelector(`[data-target="${step.key}"]`)
      if (!el) { setTarget(null); return }
      const sr = stage.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setTarget({
        x: ((r.left + r.width / 2 - sr.left) / sr.width) * 100,
        y: ((r.top + r.height / 2 - sr.top) / sr.height) * 100,
        w: (r.width / sr.width) * 100,
        h: (r.height / sr.height) * 100,
      })
    }
    find()
    const t = setTimeout(find, 60)
    window.addEventListener('resize', find)
    return () => { clearTimeout(t); window.removeEventListener('resize', find) }
  }, [step, tab, stepIdx])

  const insideRef = useRef(false)
  const sendTarget = () => {
    if (!insideRef.current || !stageRef.current || !step) return
    const el = stageRef.current.querySelector(`[data-target="${step.key}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    window.dispatchEvent(new CustomEvent('reticle:target', { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }))
  }
  useEffect(() => {
    if (insideRef.current) {
      const t = setTimeout(sendTarget, 80)
      return () => clearTimeout(t)
    }
  }, [step, target])
  useEffect(() => {
    const onScroll = () => sendTarget()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [step])
  useEffect(() => {
    if (finished) window.dispatchEvent(new CustomEvent('reticle:cursor'))
  }, [finished])
  useEffect(() => () => window.dispatchEvent(new CustomEvent('reticle:cursor')), [])

  const onEnter = () => { insideRef.current = true; if (!finished) sendTarget() }
  const onLeave = () => { insideRef.current = false; window.dispatchEvent(new CustomEvent('reticle:cursor')) }

  const onStageClick = (e) => {
    if (finished || !step) return
    const stage = stageRef.current
    const el = stage.querySelector(`[data-target="${step.key}"]`)
    if (!el) { setMissCount(c => c + 1); return }
    const r = el.getBoundingClientRect()
    const pad = 6
    const inside = e.clientX >= r.left - pad && e.clientX <= r.right + pad
                && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad
    if (inside) setStepIdx(i => i + 1)
    else setMissCount(c => c + 1)
  }

  const reset = () => { setStepIdx(0); setMissCount(0) }

  const capStyle = target && step ? (step.side === 'right'
    ? { left: `calc(${target.x + target.w / 2}% + 14px)`, top: `${target.y}%` }
    : { right: `calc(${100 - target.x + target.w / 2}% + 14px)`, top: `${target.y}%` }) : null

  const { Mock } = cfg

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-1 mb-5">
        <div className="inline-flex bg-cream-50 border border-cream-200 rounded-full p-1">
          {Object.entries(DEMOS).map(([k, v]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${tab === k ? 'bg-ink-900 text-cream-50' : 'text-ink-500 hover:text-ink-900'}`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status row */}
      <div className="max-w-[1080px] mx-auto flex items-center justify-between mb-3 px-1">
        <div className="text-[12px] text-ink-500 font-mono">{cfg.chip}</div>
        <div className="flex items-center gap-3 text-[12px]">
          <div className="flex items-center gap-1.5">
            {cfg.steps.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i < stepIdx ? 'bg-lime-deep' : 'bg-cream-300'}`}></span>
            ))}
          </div>
          <span className="text-ink-400 font-mono">{finished ? `${total}/${total}` : `${stepIdx}/${total}`}</span>
          {(stepIdx > 0 || finished) && (
            <button onClick={reset} className="text-ink-500 hover:text-ink-900 underline-offset-2 hover:underline">重新开始</button>
          )}
        </div>
      </div>

      {/* Stage */}
      <div ref={stageRef} onClick={onStageClick}
        onMouseEnter={onEnter} onMouseLeave={onLeave}
        className={`relative mx-auto rounded-2xl border border-cream-200 bg-cream-50 overflow-hidden hero-glow cursor-pointer ${missCount ? 'shake' : ''}`}
        style={{ aspectRatio: '16/10', maxWidth: '1080px' }}
        key={`${tab}-shake-${missCount}`}>

        <div key={tab} className="absolute inset-0" style={{ animation: 'fadeIn .4s ease-out' }}>
          <Mock step={finished ? total : stepIdx} />
        </div>

        {target && step && (
          <span className="demo-tgt-box pointer-events-none absolute" style={{
            left:   `calc(${target.x - target.w / 2}% - 4px)`,
            top:    `calc(${target.y - target.h / 2}% - 4px)`,
            width:  `calc(${target.w}% + 8px)`,
            height: `calc(${target.h}% + 8px)`,
          }}></span>
        )}

        {step && capStyle && (
          <span className={`demo-caption ${step.side === 'left' ? '!pl-3 !pr-4' : ''}`} style={capStyle}>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-end gap-[2px] mr-1">
                <span className="wave"></span><span className="wave"></span><span className="wave"></span><span className="wave"></span>
              </span>
              {step.caption}
            </span>
          </span>
        )}

        {missCount > 0 && !finished && (
          <div key={missCount} className="absolute left-1/2 bottom-6 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-ink-900/90 text-cream-50 text-[12px]" style={{ animation: 'fadeOut 1.4s ease-out forwards' }}>
            点亮起来的位置 · 跟着指点走
          </div>
        )}

        {finished && (
          <div className="absolute left-4 right-4 bottom-4 z-20 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-ink-900/95 text-cream-50 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]" style={{ animation: 'slideIn .4s ease-out' }}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-lime flex items-center justify-center flex-none">
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><path d="M4 11.5l4.5 4.5L18 6.5" stroke="#1F1F1D" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <div className="text-[14px] font-semibold leading-tight">完成</div>
                <div className="text-[12px] text-cream-50/70 leading-tight mt-0.5">{cfg.done}</div>
              </div>
            </div>
            <button onClick={reset} className="px-4 py-1.5 rounded-full bg-cream-50 text-ink-900 text-[12px] font-medium hover:bg-cream-100 transition-colors flex-none">再来一次</button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cream-200 z-10">
          <div className="h-full bg-lime-deep transition-[width] duration-500" style={{ width: `${(finished ? total : stepIdx) / total * 100}%` }}></div>
        </div>
      </div>

      <p className="text-center mt-4 text-[12px] text-ink-400">点亮的位置就是指点指引你的方向 — 跟着点点看</p>
    </div>
  )
}
