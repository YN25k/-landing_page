import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import ImageEditorMock from './ImageEditorMock'
import SpreadsheetMock from './SpreadsheetMock'
import VideoEditorMock from './VideoEditorMock'

// Interactive demo — accepts real input: clicks, drags, and keystrokes.
// Step kinds:
//   click → user clicks the [data-target] element to advance
//   drag  → user holds on the [data-target] source and drops on [data-target=dropKey]
//   type  → user types `sequence` on the keyboard (case-insensitive)
const DEMOS = {
  image: {
    label: '图像编辑', chip: '海报设计 · 创意工具',
    Mock: ImageEditorMock,
    steps: [
      { kind: 'click', key: 'image-0',                              caption: '点击「调整图层」',   side: 'left'  },
      { kind: 'click', key: 'image-1',                              caption: '应用渐变映射',       side: 'left'  },
      { kind: 'drag',  key: 'image-2', dropKey: 'image-2-drop',     caption: '拖动不透明度到 50%', side: 'left'  },
    ],
    done: '色调已统一 · 海报更有层次',
  },
  sheet: {
    label: '电子表格', chip: '季度报表 · 数据分析',
    Mock: SpreadsheetMock,
    steps: [
      { kind: 'click', key: 'sheet-0',                              caption: '点击合计单元格',     side: 'right' },
      { kind: 'click', key: 'sheet-1',                              caption: '点击自动求和',       side: 'right' },
      { kind: 'click', key: 'sheet-2',                              caption: '插入柱状图',         side: 'right' },
    ],
    done: '销售汇总和图表已生成',
  },
  video: {
    label: '视频剪辑', chip: '假日 vlog · 多轨剪辑',
    Mock: VideoEditorMock,
    steps: [
      { kind: 'drag',  key: 'video-0', dropKey: 'video-0-drop',     caption: '拖素材到 V2 轨道',   side: 'right' },
      { kind: 'click', key: 'video-1',                              caption: '点击刀片工具',       side: 'right' },
      { kind: 'click', key: 'video-2',                              caption: '生成字幕轨道',       side: 'left'  },
    ],
    done: '画面已叠加 · 字幕轨道已生成',
  },
}

const HINTS = {
  click: '点亮起来的位置 · 跟着指点走',
  drag:  '按住拖动 · 松手放到亮区',
  type:  '用键盘输入 · 一个字符一个字符',
}

export default function InteractiveDemo() {
  const [tab, setTab] = useState('image')
  const [stepIdx, setStepIdx] = useState(0)
  const [missCount, setMissCount] = useState(0)
  const [target, setTarget] = useState(null)   // source rect, in stage %
  const [drop, setDrop] = useState(null)       // drop rect (drag steps), in stage %
  const [typed, setTyped] = useState('')        // accumulated keystrokes
  const [dragging, setDragging] = useState(null) // { x, y } in stage % while dragging
  const stageRef = useRef(null)

  const cfg = DEMOS[tab]
  const total = cfg.steps.length
  const finished = stepIdx >= total
  const step = !finished ? cfg.steps[stepIdx] : null
  const kind = step?.kind || 'click'

  useEffect(() => { setStepIdx(0); setMissCount(0); setTyped(''); setDragging(null) }, [tab])
  useEffect(() => { setTyped(''); setDragging(null) }, [stepIdx])

  // Locate source + drop rects.
  const locate = useCallback(() => {
    const stage = stageRef.current
    if (!stage || !step) { setTarget(null); setDrop(null); return }
    const sr = stage.getBoundingClientRect()
    const toPct = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        x: ((r.left + r.width / 2 - sr.left) / sr.width) * 100,
        y: ((r.top + r.height / 2 - sr.top) / sr.height) * 100,
        w: (r.width / sr.width) * 100,
        h: (r.height / sr.height) * 100,
      }
    }
    setTarget(toPct(stage.querySelector(`[data-target="${step.key}"]`)))
    setDrop(step.dropKey ? toPct(stage.querySelector(`[data-target="${step.dropKey}"]`)) : null)
  }, [step])

  useLayoutEffect(() => {
    locate()
    const t1 = setTimeout(locate, 60)
    const t2 = setTimeout(locate, 700) // after css transitions in mocks
    const onResize = () => locate()
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener('resize', onResize) }
  }, [locate, tab, stepIdx])

  // Brand cursor reticle — lock onto source while idle; release while dragging.
  const insideRef = useRef(false)
  const sendTarget = () => {
    if (!insideRef.current || !stageRef.current || !step || dragging) return
    const el = stageRef.current.querySelector(`[data-target="${step.key}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    window.dispatchEvent(new CustomEvent('reticle:target', { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }))
  }
  useEffect(() => {
    if (insideRef.current && !dragging) {
      const t = setTimeout(sendTarget, 80)
      return () => clearTimeout(t)
    }
    if (dragging) window.dispatchEvent(new CustomEvent('reticle:cursor'))
  }, [step, target, dragging])
  useEffect(() => {
    const onScroll = () => sendTarget()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [step])
  useEffect(() => { if (finished) window.dispatchEvent(new CustomEvent('reticle:cursor')) }, [finished])
  useEffect(() => () => window.dispatchEvent(new CustomEvent('reticle:cursor')), [])

  const onEnter = () => { insideRef.current = true; if (!finished) sendTarget() }
  const onLeave = () => { insideRef.current = false; window.dispatchEvent(new CustomEvent('reticle:cursor')) }

  // ----- Keyboard input for type-steps -----
  useEffect(() => {
    if (!step || step.kind !== 'type') return
    const seq = step.sequence
    const handler = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const ch = e.key
      if (ch === 'Backspace') { setTyped(t => t.slice(0, -1)); e.preventDefault(); return }
      if (ch.length !== 1) return
      const want = seq[typed.length]
      if (!want) return
      if (ch.toLowerCase() === want.toLowerCase()) {
        const next = typed + want
        setTyped(next)
        if (next === seq) setTimeout(() => setStepIdx(i => i + 1), 240)
        e.preventDefault()
      } else {
        setMissCount(c => c + 1)
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, typed])

  // ----- Drag input for drag-steps -----
  const onMouseDown = (e) => {
    if (!step || step.kind !== 'drag' || finished) return
    const stage = stageRef.current
    const tgtEl = stage.querySelector(`[data-target="${step.key}"]`)
    if (!tgtEl) return
    const r = tgtEl.getBoundingClientRect()
    const pad = 10
    const inside = e.clientX >= r.left - pad && e.clientX <= r.right + pad
                && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad
    if (!inside) return
    e.preventDefault()
    const sr = stage.getBoundingClientRect()
    setDragging({
      x: ((e.clientX - sr.left) / sr.width) * 100,
      y: ((e.clientY - sr.top) / sr.height) * 100,
    })
  }
  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => {
      const stage = stageRef.current
      if (!stage) return
      const sr = stage.getBoundingClientRect()
      setDragging({
        x: ((e.clientX - sr.left) / sr.width) * 100,
        y: ((e.clientY - sr.top) / sr.height) * 100,
      })
    }
    const onUp = (e) => {
      const stage = stageRef.current
      if (!stage || !step) { setDragging(null); return }
      const dropEl = step.dropKey ? stage.querySelector(`[data-target="${step.dropKey}"]`) : null
      let landed = false
      if (dropEl) {
        const r = dropEl.getBoundingClientRect()
        const pad = 12
        landed = e.clientX >= r.left - pad && e.clientX <= r.right + pad
              && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad
      }
      setDragging(null)
      if (landed) setStepIdx(i => i + 1)
      else setMissCount(c => c + 1)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging, step])

  // ----- Click input -----
  const onStageClick = (e) => {
    if (finished || !step) return
    if (step.kind !== 'click') return // drag uses mousedown; type uses keyboard
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

  const reset = () => { setStepIdx(0); setMissCount(0); setTyped(''); setDragging(null) }

  // Caption position relative to the target
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
      <div ref={stageRef} onClick={onStageClick} onMouseDown={onMouseDown}
        onMouseEnter={onEnter} onMouseLeave={onLeave}
        className={`relative mx-auto rounded-2xl border border-cream-200 bg-cream-50 overflow-hidden hero-glow ${dragging ? 'cursor-grabbing' : (kind === 'type' ? 'cursor-text' : 'cursor-pointer')} ${missCount ? 'shake' : ''}`}
        style={{ aspectRatio: '16/10', maxWidth: '1080px' }}
        key={`${tab}-shake-${missCount}`}>

        <div key={tab} className="absolute inset-0" style={{ animation: 'fadeIn .4s ease-out' }}>
          <Mock step={finished ? total : stepIdx} typedText={kind === 'type' ? typed : undefined} />
        </div>

        {/* Target highlight ring around the actual element */}
        {target && step && (
          <span className="demo-tgt-box pointer-events-none absolute" style={{
            left:   `calc(${target.x - target.w / 2}% - 4px)`,
            top:    `calc(${target.y - target.h / 2}% - 4px)`,
            width:  `calc(${target.w}% + 8px)`,
            height: `calc(${target.h}% + 8px)`,
          }}></span>
        )}

        {/* Drop zone highlight for drag-steps */}
        {drop && step && step.kind === 'drag' && (
          <span className="pointer-events-none absolute rounded-md" style={{
            left:   `calc(${drop.x - drop.w / 2}% - 6px)`,
            top:    `calc(${drop.y - drop.h / 2}% - 6px)`,
            width:  `calc(${drop.w}% + 12px)`,
            height: `calc(${drop.h}% + 12px)`,
            border: '1.5px dashed rgba(197,225,122,0.85)',
            background: 'rgba(197,225,122,0.10)',
            boxShadow: dragging ? '0 0 0 3px rgba(197,225,122,0.25), 0 0 24px rgba(197,225,122,0.45) inset' : 'none',
            transition: 'box-shadow 200ms ease',
            zIndex: 5,
          }}></span>
        )}

        {/* Drag ghost */}
        {dragging && (
          <span className="pointer-events-none absolute z-30" style={{
            left: `${dragging.x}%`, top: `${dragging.y}%`, transform: 'translate(-50%, -50%)',
          }}>
            <span className="block w-3.5 h-3.5 rounded-full bg-[#C5E17A]" style={{ boxShadow: '0 0 0 3px rgba(197,225,122,0.35), 0 8px 22px rgba(164,197,82,0.6)' }}></span>
          </span>
        )}

        {/* Caption */}
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

        {/* Input-hint chip — top center */}
        {step && !finished && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-900/80 backdrop-blur-sm text-cream-50 text-[11px] font-medium border border-cream-50/10 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime"></span>
              {kind === 'click' && <span>点击</span>}
              {kind === 'drag'  && <span>拖动</span>}
              {kind === 'type'  && (
                <span className="flex items-center gap-1.5">
                  <span>输入</span>
                  <span className="font-mono text-[10px] tracking-wider">
                    {step.sequence.split('').map((c, i) => (
                      <span key={i} className={i < typed.length ? 'text-lime' : 'text-cream-50/55'}>{c}</span>
                    ))}
                  </span>
                </span>
              )}
            </span>
          </div>
        )}

        {/* Misclick toast — kind-specific hint */}
        {missCount > 0 && !finished && (
          <div key={missCount} className="absolute left-1/2 bottom-6 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-ink-900/90 text-cream-50 text-[12px]" style={{ animation: 'fadeOut 1.4s ease-out forwards' }}>
            {HINTS[kind] || HINTS.click}
          </div>
        )}

        {/* Completed toast */}
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

      <p className="text-center mt-4 text-[12px] text-ink-400">点亮的位置就是指点指引你的方向 — 点击、拖动、键盘都能用</p>
    </div>
  )
}
