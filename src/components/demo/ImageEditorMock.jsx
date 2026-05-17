import { TrafficLights, Click } from './DemoAtoms'

export default function ImageEditorMock({ step = 0 }) {
  const newLayerActive = step >= 1
  const brushActive    = step >= 2
  const opacityActive  = step >= 3
  const opacityVal     = step >= 3 ? 50 : 100

  const tools = [
    ['M3 3h6v6H3z M11 3h2v2h-2z','rect-select'],
    ['M3 13L13 3 M9 3h4v4','arrow'],
    ['M2 12c2-1 3-3 4-5 1-3 3-5 6-5l1 4-2 1c-1 1-2 3-3 4-1 2-2 3-4 4z','brush'],
    ['M3 8l5-5 5 5-5 5z','poly'],
    ['M3 13c0-3 2-5 5-5s5 2 5 5','arc'],
    ['M3 3l10 10 M13 3L3 13','crop'],
    ['M2 8a6 6 0 0112 0 6 6 0 01-12 0z','marquee'],
    ['M3 13l4-10 3 7 3-3','pen'],
    ['M2 14l5-5 3 3 3-3','gradient'],
    ['M3 3h10v10H3z','rect'],
    ['M8 2v12 M2 8h12','move'],
    ['M3 3l10 4-4 2 2 4z','lasso'],
  ]

  const toolRows = tools.reduce((acc, btn, i) => {
    if (i % 2 === 0) acc.push([btn]); else acc[acc.length - 1].push(btn)
    return acc
  }, [])

  const layers = [
    { n: '文字 · SUMMER', th: <span className="block w-full h-full flex items-center justify-center text-[8px] text-[#1F1F1E] bg-[#F4EDD9]">T</span> },
    { n: '矩形条',         th: <span className="block w-full h-1/3 bg-[#1F1F1E] mt-3"></span> },
    { n: '圆形 · 深',     th: <span className="block w-3/4 h-3/4 rounded-full bg-[#1F1F1E] m-auto mt-1"></span> },
    { n: '圆形 · 绿',     th: <span className="block w-3/4 h-3/4 rounded-full bg-[#C5E17A] m-auto mt-1"></span> },
    { n: '背景',           th: <span className="block w-full h-full bg-[#F4EDD9]"></span> },
  ]

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1F1F1E] text-[#D9D6CE] select-none font-sans">
      {/* Title bar */}
      <div className="h-7 flex items-center px-3 gap-2 border-b border-black/40 bg-[#262624] text-[11px] text-[#8A877C]">
        <TrafficLights dark />
        <span className="ml-2 tracking-wide">海报.psdx · @ 100% · RGB/8</span>
        <span className="ml-auto">未保存</span>
      </div>
      {/* Menu strip */}
      <div className="h-6 px-3 flex items-center gap-4 border-b border-black/40 bg-[#2A2A28] text-[11px] text-[#A8A599]">
        <span>文件</span><span>编辑</span><span>图像</span><span>图层</span><span>选择</span><span>滤镜</span><span>视图</span><span>窗口</span>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left toolbar */}
        <div className="w-12 border-r border-black/40 bg-[#262624] flex flex-col items-center py-2 gap-0.5">
          {toolRows.map((row, ri) => (
            <div key={ri} className="flex gap-0.5">
              {row.map(([d, k], ci) => {
                const idx = ri * 2 + ci
                return (
                  <button key={k} data-target={idx === 2 ? 'image-1' : undefined}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${idx === 2 && brushActive ? 'bg-[#C5E17A] text-[#1F1F1E]' : 'text-[#A8A599] hover:bg-[#33332F]'}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                  </button>
                )
              })}
            </div>
          ))}
          <div className="mt-auto flex flex-col items-center gap-1.5 pt-2">
            <span className="w-5 h-5 rounded border border-[#A8A599]/40 bg-[#1F1F1E]" style={{ boxShadow: 'inset 0 0 0 4px #C5E17A' }}></span>
            <span className="w-5 h-5 rounded border border-[#A8A599]/40 bg-[#D9D6CE]"></span>
          </div>
        </div>

        {/* Tool options strip */}
        <div className="absolute left-12 right-0 top-[52px] h-6 border-b border-black/40 bg-[#2A2A28] flex items-center px-3 gap-3 text-[10px] text-[#A8A599] z-[1]">
          <span>{brushActive ? '画笔: 柔角 60' : '移动'}</span>
          <span className="w-px h-3 bg-black/40"></span>
          <span>不透明度: <span className="text-[#D9D6CE] font-mono">{opacityVal}%</span></span>
          <span className="w-px h-3 bg-black/40"></span>
          <span>流量: 100%</span>
        </div>

        {/* Canvas area */}
        <div className="flex-1 relative pt-6 bg-[#3A3A37]">
          <div className="absolute inset-x-0 top-6 bottom-0 flex items-center justify-center"
            style={{
              backgroundImage: 'linear-gradient(45deg, #2A2A28 25%, transparent 25%), linear-gradient(-45deg, #2A2A28 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2A2A28 75%), linear-gradient(-45deg, transparent 75%, #2A2A28 75%)',
              backgroundSize: '12px 12px',
              backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0',
            }}>
            <div className="relative w-[58%] aspect-[4/5] bg-[#F4EDD9] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="absolute left-[8%] top-[10%] w-[44%] aspect-square rounded-full bg-[#C5E17A]"></div>
              <div className="absolute right-[6%] top-[26%] w-[40%] aspect-square rounded-full bg-[#1F1F1E] mix-blend-multiply"></div>
              <div className="absolute left-[14%] right-[14%] bottom-[18%] h-[14%] bg-[#1F1F1E]/85"></div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] text-[11px] tracking-[0.5em] text-[#1F1F1E] font-semibold">SUMMER · 2026</div>
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-5 bg-[#262624] border-t border-black/40 flex items-center px-3 text-[10px] text-[#8A877C] gap-3">
            <span>100%</span>
            <span>文档: 4.2M / 12.4M</span>
            <span className="ml-auto font-mono">3000 × 3750 px</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-48 border-l border-black/40 bg-[#262624] flex flex-col text-[11px]">
          <div className="h-7 flex items-center gap-3 px-3 border-b border-black/40 text-[10px] text-[#8A877C]">
            <span className="text-[#D9D6CE]">图层</span><span>通道</span><span>路径</span><span>历史</span>
          </div>
          <div className="px-2 py-2 border-b border-black/40 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <select className="bg-[#1F1F1E] border border-black/50 rounded px-1.5 py-0.5 text-[#D9D6CE]" defaultValue="正常">
                <option>正常</option>
              </select>
              <div className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded ${opacityActive ? 'bg-[#C5E17A]/20 ring-1 ring-[#C5E17A]/60' : ''}`}>
                <span className="text-[#8A877C]">不透明度</span>
                <span className="font-mono text-[#D9D6CE]">{opacityVal}%</span>
              </div>
            </div>
            {/* Opacity slider — drag step grabs the thumb and drops on the 35–65% zone */}
            <div className="relative h-1 bg-[#1F1F1E] rounded">
              <div className="absolute left-0 top-0 bottom-0 bg-[#C5E17A] rounded" style={{ width: `${opacityVal}%`, transition: 'width .8s cubic-bezier(.2,.7,.2,1)' }}></div>
              {/* Drop zone (around 50%) */}
              <div data-target="image-2-drop" className="absolute -top-3 h-7 pointer-events-none" style={{ left: '35%', width: '30%' }}></div>
              {/* Source: the slider thumb (user grabs this and drags) */}
              <div data-target="image-2" className="absolute -top-1 w-3 h-3 rounded-full bg-[#D9D6CE] border border-black/60 cursor-grab" style={{ left: `calc(${opacityVal}% - 6px)`, transition: 'left .8s cubic-bezier(.2,.7,.2,1)' }}></div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            {newLayerActive && (
              <div className="px-2 py-1.5 flex items-center gap-2 bg-[#33332F] border-b border-black/30" style={{ animation: 'slideIn .5s ease-out' }}>
                <span className="text-[#8A877C]">👁</span>
                <span className="w-7 h-7 rounded-sm bg-[#1F1F1E] border border-[#C5E17A]/60"></span>
                <span className="text-[#C5E17A]">图层 6</span>
              </div>
            )}
            {layers.map((l, i) => (
              <div key={i} className={`px-2 py-1.5 flex items-center gap-2 border-b border-black/30 ${i === 3 && !newLayerActive ? 'bg-[#33332F]' : ''}`}>
                <span className="text-[#8A877C]">👁</span>
                <span className="w-7 h-7 rounded-sm bg-[#F4EDD9] border border-black/40 overflow-hidden">{l.th}</span>
                <span className="truncate">{l.n}</span>
              </div>
            ))}
          </div>
          <div className="h-7 px-2 flex items-center gap-1 border-t border-black/40 relative">
            <span className="w-5 h-5 rounded text-[10px] flex items-center justify-center hover:bg-[#33332F] text-[#A8A599]">fx</span>
            <span className="w-5 h-5 rounded text-[12px] flex items-center justify-center hover:bg-[#33332F] text-[#A8A599]">◐</span>
            <span data-target="image-0" className={`relative w-5 h-5 rounded text-[12px] flex items-center justify-center ${newLayerActive ? 'bg-[#C5E17A] text-[#1F1F1E]' : 'text-[#A8A599] hover:bg-[#33332F]'}`}>
              ⊞
              <Click active={newLayerActive} />
            </span>
            <span className="ml-auto text-[#A8A599] text-[12px]">⌫</span>
          </div>
        </div>
      </div>
    </div>
  )
}
