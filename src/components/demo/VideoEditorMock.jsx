import { TrafficLights, Click } from './DemoAtoms'

export default function VideoEditorMock({ step = 0 }) {
  const razorActive = step >= 2
  const subtitlesActive = step >= 3
  const newClipOnTimeline = step >= 1
  const cutPerformed = step >= 2

  const binClips = [
    { label: 'IMG_8821', tone: 'linear-gradient(135deg,#C5E17A,#7AAA3F)' },
    { label: 'IMG_8822', tone: 'linear-gradient(135deg,#FBBF77,#E76F51)' },
    { label: 'IMG_8823', tone: 'linear-gradient(135deg,#7DD3FC,#3B82F6)' },
    { label: 'IMG_8824', tone: 'linear-gradient(135deg,#E5DFCD,#A89F89)' },
    { label: 'IMG_8825', tone: 'linear-gradient(135deg,#86EFAC,#10B981)' },
    { label: 'IMG_8826', tone: 'linear-gradient(135deg,#FDA4AF,#F472B6)' },
  ]

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1B1B1A] text-[#D9D6CE] select-none font-sans">
      {/* Title bar */}
      <div className="h-7 flex items-center px-3 gap-2 border-b border-black/60 bg-[#222220] text-[11px] text-[#8A877C]">
        <TrafficLights dark />
        <span className="ml-2">DaVinci Resolve · Edit · 假日vlog</span>
        <span className="ml-auto font-mono">25 fps · 1080p</span>
      </div>

      {/* Top: bin | source | program */}
      <div className="flex-1 flex min-h-0">
        {/* Bin */}
        <div className="w-44 border-r border-black/60 bg-[#222220] flex flex-col text-[11px]">
          <div className="h-6 px-2 flex items-center gap-3 border-b border-black/60 text-[10px] text-[#8A877C]">
            <span className="text-[#D9D6CE]">媒体池</span><span>效果</span><span>检查器</span>
          </div>
          <div className="p-2 grid grid-cols-2 gap-1.5 overflow-hidden">
            {binClips.map((c, i) => (
              <div key={i} data-target={i === 0 ? 'video-0' : undefined}
                className={`relative aspect-video rounded overflow-hidden ${i === 0 && step <= 1 ? 'ring-1 ring-[#C5E17A] cursor-grab' : ''}`}
                style={{ background: c.tone }}>
                <div className="absolute bottom-0 left-1 right-1 text-[8px] font-mono text-white/80 truncate">{c.label}</div>
                <div className="absolute top-0.5 right-0.5 text-[8px] text-white/70 font-mono">0:0{i + 3}</div>
              </div>
            ))}
          </div>
          <div className="mt-auto h-6 border-t border-black/60 px-2 flex items-center text-[10px] text-[#8A877C]">
            <span>6 项</span>
          </div>
        </div>

        {/* Source monitor */}
        <div className="flex-1 border-r border-black/60 flex flex-col">
          <div className="h-6 px-3 flex items-center border-b border-black/60 bg-[#222220] text-[10px] text-[#D9D6CE]">源查看器</div>
          <div className="flex-1 relative bg-black flex items-center justify-center p-2">
            <div className="relative w-full h-full max-w-full max-h-full rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#C5E17A,#7AAA3F)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.4), transparent 55%)' }}></div>
              <div className="absolute bottom-2 left-2 text-white/90 text-[10px] font-mono">IMG_8821 · 0:00 / 0:08</div>
            </div>
          </div>
          <div className="h-6 border-t border-black/60 bg-[#222220] flex items-center justify-center gap-2 text-[#A8A599]">
            <span>⏮</span><span>◀◀</span>
            <span className="w-5 h-5 rounded-full bg-[#33332F] flex items-center justify-center text-[10px]">▶</span>
            <span>▶▶</span><span>⏭</span>
          </div>
        </div>

        {/* Program monitor */}
        <div className="flex-1 flex flex-col">
          <div className="h-6 px-3 flex items-center gap-3 border-b border-black/60 bg-[#222220] text-[10px] text-[#8A877C]">
            <span className="text-[#D9D6CE]">时间线查看器</span>
            <span className="ml-auto font-mono">00:00:14:08</span>
          </div>
          <div className="flex-1 relative bg-black flex items-center justify-center p-2">
            <div className="relative w-full h-full rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#FBBF77,#E76F51)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 40%, rgba(255,255,255,.45), transparent 55%)' }}></div>
              <div className="absolute bottom-2 left-2 text-white/95 text-[10px] font-mono">假日vlog · 第02镜</div>
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>REC
              </div>
              {newClipOnTimeline && (
                <div className="absolute left-3 top-3 w-[38%] h-[38%] rounded-sm overflow-hidden border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)]" style={{ background: 'linear-gradient(135deg,#C5E17A,#7AAA3F)', animation: 'scaleIn .45s ease-out' }}>
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.45), transparent 55%)' }}></div>
                  <div className="absolute bottom-1 left-1 rounded bg-black/45 px-1 text-[8px] font-mono text-white/90">V2 · IMG_8821</div>
                </div>
              )}
              {cutPerformed && (
                <div className="absolute inset-y-3 left-1/2 w-px bg-[#C5E17A]" style={{ boxShadow: '0 0 12px #C5E17A', animation: 'cutFlash .9s ease-out' }}></div>
              )}
              {subtitlesActive && (
                <div className="absolute left-1/2 bottom-4 -translate-x-1/2 rounded bg-black/72 px-3 py-1.5 text-center text-[12px] font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]" style={{ animation: 'slideIn .4s ease-out' }}>
                  今天的海边光线刚刚好
                </div>
              )}
            </div>
          </div>
          <div className="h-6 border-t border-black/60 bg-[#222220] flex items-center justify-center gap-2 text-[#A8A599]">
            <span>{'{'}</span><span>◀◀</span>
            <span className="w-5 h-5 rounded-full bg-[#33332F] flex items-center justify-center text-[10px]">▶</span>
            <span>▶▶</span><span>{'}'}</span>
          </div>
        </div>
      </div>

      {/* Tools row */}
      <div className="h-7 border-t border-black/60 bg-[#222220] flex items-center px-2 gap-1 text-[11px]">
        <span className="px-2 py-0.5 rounded text-[#A8A599]">↖</span>
        <span className="px-2 py-0.5 rounded text-[#A8A599]">↔</span>
          <span data-target="video-1" className={`relative px-2 py-0.5 rounded flex items-center gap-1 ${razorActive ? 'bg-[#C5E17A] text-[#1F1F1E] font-medium' : 'text-[#A8A599]'}`}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <circle cx="3.5" cy="7" r="2" /><path d="M5.5 7h7" /><path d="M10 5l2.5 2L10 9" />
          </svg>
          刀片
          <Click active={razorActive} />
        </span>
        <span className="px-2 py-0.5 rounded text-[#A8A599]">✏</span>
        <span className="px-2 py-0.5 rounded text-[#A8A599]">⤬</span>
        <span className="px-2 py-0.5 rounded text-[#A8A599]">✋</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="font-mono text-[#8A877C] text-[10px]">00:00:14:08</span>
          <span data-target="video-2" className={`relative px-3 py-1 rounded text-[11px] font-medium ${subtitlesActive ? 'bg-[#C5E17A] text-[#1F1F1E]' : 'bg-[#33332F] text-[#D9D6CE]'}`}>
            字幕
            <Click active={subtitlesActive} />
          </span>
        </span>
      </div>

      {/* Timeline */}
      <div className="h-40 border-t border-black/60 bg-[#1B1B1A] flex flex-col">
        <div className="h-5 border-b border-black/60 bg-[#1F1F1E] flex items-center pl-20 pr-2 gap-3 text-[#8A877C] font-mono text-[10px] tape">
          {['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30'].map(t => <span key={t}>{t}</span>)}
        </div>
        <div className="flex-1 relative">
          {/* Track headers */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-[#222220] border-r border-black/60 flex flex-col text-[10px] text-[#8A877C]">
            <div className="h-6 border-b border-black/40 px-2 flex items-center justify-between"><span>字幕 1</span><span className="text-[#5C5A52]">M S</span></div>
            <div className="h-7 border-b border-black/40 px-2 flex items-center justify-between"><span>V2</span><span className="text-[#5C5A52]">M S</span></div>
            <div className="h-7 border-b border-black/40 px-2 flex items-center justify-between"><span>V1</span><span className="text-[#5C5A52]">M S</span></div>
            <div className="h-6 border-b border-black/40 px-2 flex items-center justify-between"><span>A1</span><span className="text-[#5C5A52]">M S</span></div>
          </div>
          {/* Tracks */}
          <div className="absolute left-20 right-0 top-0 bottom-0">
            {/* Subtitle track */}
            <div className="h-6 border-b border-black/40 relative bg-[#1F1F1E]">
              {subtitlesActive && (
                <>
                  <div className="absolute top-1 bottom-1 left-[22%] w-[16%] rounded-sm bg-[#A78BFA] text-[8px] font-mono text-white/95 px-1 overflow-hidden" style={{ animation: 'slideIn .4s ease-out' }}>今天的海边</div>
                  <div className="absolute top-1 bottom-1 left-[39%] w-[20%] rounded-sm bg-[#A78BFA] text-[8px] font-mono text-white/95 px-1 overflow-hidden" style={{ animation: 'slideIn .5s ease-out' }}>光线刚刚好</div>
                </>
              )}
            </div>
            {/* V2 — drop zone for the drag step */}
            <div data-target="video-0-drop" className="h-7 border-b border-black/40 relative bg-[#1F1F1E]">
              {newClipOnTimeline && (
                <div className="absolute top-1 bottom-1 left-[14%] w-[18%] rounded-sm overflow-hidden ring-1 ring-[#C5E17A]/70" style={{ background: 'linear-gradient(135deg,#C5E17A,#7AAA3F)', animation: 'slideIn .5s ease-out' }}>
                  <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">IMG_8821 · 叠加</span>
                </div>
              )}
            </div>
            {/* V1 */}
            <div className="h-7 border-b border-black/40 relative bg-[#1F1F1E]">
              <div className="absolute top-1 bottom-1 left-[2%] w-[18%] rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#C5E17A,#7AAA3F)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 8px)' }}></div>
                <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">IMG_8821</span>
              </div>
              {!cutPerformed ? (
                <div className="absolute top-1 bottom-1 left-[20%] w-[26%] rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#FBBF77,#E76F51)' }}>
                  <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 8px)' }}></div>
                  <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">IMG_8822</span>
                </div>
              ) : (
                <>
                  <div className="absolute top-1 bottom-1 left-[20%] w-[14%] rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#FBBF77,#E76F51)' }}>
                    <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">IMG_8822a</span>
                  </div>
                  <div className="absolute top-1 bottom-1 left-[34.4%] w-[11.6%] rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#FBBF77,#E76F51)', animation: 'fadeIn .4s ease-out' }}>
                    <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">b</span>
                  </div>
                </>
              )}
              <div className="absolute top-1 bottom-1 left-[46%] w-[16%] rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#86EFAC,#10B981)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 8px)' }}></div>
                <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">IMG_8825</span>
              </div>
              <div className="absolute top-1 bottom-1 left-[62%] w-[20%] rounded-sm overflow-hidden" style={{ background: 'linear-gradient(135deg,#FDA4AF,#F472B6)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 8px)' }}></div>
                <span className="absolute left-1 top-0.5 text-[8px] font-mono text-white/90">IMG_8826</span>
              </div>
            </div>
            {/* A1 */}
            <div className="h-6 border-b border-black/40 relative bg-[#1F1F1E]">
              <div className="absolute top-1 bottom-1 left-[2%] right-[18%] rounded-sm bg-[#3A4A33]">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 16" preserveAspectRatio="none">
                  <path d="M0 8 L4 5 L8 11 L12 4 L16 12 L20 6 L24 10 L28 4 L32 13 L36 6 L40 9 L44 5 L48 11 L52 7 L56 12 L60 5 L64 10 L68 4 L72 13 L76 7 L80 9 L84 5 L88 11 L92 6 L96 10 L100 4 L104 12 L108 6 L112 9 L116 5 L120 11 L124 7 L128 10 L132 4 L136 13 L140 6 L144 9 L148 5 L152 11 L156 7 L160 12 L164 5 L168 10 L172 4 L176 13 L180 7 L184 9 L188 5 L192 11 L196 6 L200 8" fill="none" stroke="#7AAA3F" strokeWidth="1" />
                </svg>
              </div>
            </div>
            {/* Playhead */}
            <div className="absolute top-0 bottom-0 left-[34%] w-px bg-rose-400/90 z-[2]"></div>
            <div className="absolute top-0 left-[34%] -translate-x-1/2 w-3 h-3 bg-rose-400 z-[2]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
              {cutPerformed && (
                <div className="absolute top-1 h-6 left-[34%] w-px bg-[#C5E17A] z-[3]" style={{ boxShadow: '0 0 8px #C5E17A', animation: 'cutFlash .8s ease-out' }}></div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
