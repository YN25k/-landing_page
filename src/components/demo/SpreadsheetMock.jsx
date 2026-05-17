import { TrafficLights, Click } from './DemoAtoms'

// Accepts a `typedText` prop so the InteractiveDemo can render keystrokes
// in the formula bar in real time during the 'type' step. When undefined,
// falls back to the canned step-driven formula.
export default function SpreadsheetMock({ step = 0, typedText }) {
  const formulaTyping = step >= 2
  const chartBtnActive = step >= 3
  const chartVisible = step >= 3

  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const rows = Array.from({ length: 12 }, (_, i) => i + 1)
  const data = {
    'A1': '季度', 'B1': '销售额', 'C1': '成本', 'D1': '利润',
    'A2': 'Q1', 'B2': '128400', 'C2': '72300', 'D2': '56100',
    'A3': 'Q2', 'B3': '164800', 'C3': '81200', 'D3': '83600',
    'A4': 'Q3', 'B4': '192500', 'C4': '88900', 'D4': '103600',
    'A5': 'Q4', 'B5': '215300', 'C5': '95700', 'D5': '119600',
    'A6': '合计', 'B6': step >= 3 ? '701000' : '',
  }
  const formula = typedText != null
    ? typedText
    : (step >= 3 ? '=SUM(B2:B5)' : (step >= 2 ? '=SUM(B2:B5' : ''))
  const showCaret = typedText != null || (formulaTyping && step < 3)

  return (
    <div className="absolute inset-0 flex flex-col bg-white text-[#1F1F1E] select-none">
      {/* Title bar */}
      <div className="h-7 flex items-center px-3 gap-2 border-b border-[#D8D8D2] bg-[#F4F3EF] text-[11px] text-[#5C5A52]">
        <TrafficLights />
        <span className="ml-2">2026销售报表 — 工作簿1</span>
      </div>

      {/* Toolbar */}
      <div className="h-9 border-b border-[#D8D8D2] bg-gradient-to-b from-[#F8F7F3] to-[#EDECE7] flex items-center px-3 gap-2 text-[11px] text-[#5C5A52]">
        <span className="px-2 py-1 rounded font-bold text-[#1F1F1E]">B</span>
        <span className="px-2 py-1 rounded italic">I</span>
        <span className="px-2 py-1 rounded underline">U</span>
        <span className="w-px h-4 bg-[#D8D8D2]"></span>
        <span className="px-2 py-1 rounded">≡</span>
        <span className="px-2 py-1 rounded">≣</span>
        <span className="w-px h-4 bg-[#D8D8D2]"></span>
        <span className="px-2 py-1 rounded font-mono">∑</span>
        <span className="px-2 py-1 rounded">%</span>
        <span className="w-px h-4 bg-[#D8D8D2]"></span>
        <span data-target="sheet-2" className={`relative px-2 py-1 rounded flex items-center gap-1 ${chartBtnActive ? 'bg-[#C5E17A] text-[#1F1F1E] font-medium' : 'text-[#1F1F1E]'}`}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="6" width="2" height="5" fill="currentColor" />
            <rect x="5" y="3" width="2" height="8" fill="currentColor" />
            <rect x="9" y="5" width="2" height="6" fill="currentColor" />
          </svg>
          图表
          <Click active={chartBtnActive} />
        </span>
        <span className="ml-auto text-[#8A877C] font-mono">Sheet 1</span>
      </div>

      {/* Formula bar — accepts live typing during the 'type' step */}
      <div className="h-7 border-b border-[#D8D8D2] flex items-stretch text-[12px] bg-white">
        <div className="w-14 flex items-center justify-center font-mono text-[#1F1F1E] border-r border-[#D8D8D2] text-[11px]">B6</div>
        <div className="flex items-center px-2 text-[#8A877C] font-mono italic border-r border-[#D8D8D2]">fx</div>
        <div data-target="sheet-1" className="flex-1 flex items-center px-3 font-mono text-[#1F1F1E]">
          {formula}
          {showCaret && <span className="inline-block w-px h-4 bg-[#1F1F1E] ml-px" style={{ animation: 'blink 1s steps(2) infinite' }}></span>}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <div className="grid h-full" style={{ gridTemplateColumns: `30px repeat(${cols.length}, minmax(0,1fr))` }}>
          <div className="border-b border-r border-[#D8D8D2] bg-[#F4F3EF]"></div>
          {cols.map(c => (
            <div key={c} className="border-b border-r border-[#D8D8D2] bg-[#F4F3EF] text-[10px] text-[#5C5A52] flex items-center justify-center font-medium">{c}</div>
          ))}
          {rows.map(r => (
            <div key={r} className="contents">
              <div className="border-b border-r border-[#D8D8D2] bg-[#F4F3EF] text-[10px] text-[#5C5A52] flex items-center justify-center">{r}</div>
              {cols.map(c => {
                const k = `${c}${r}`
                const v = data[k] || ''
                const isSelected = k === 'B6'
                const isHeader = r === 1
                const isLabel = c === 'A'
                const isDataNum = v && !isHeader && !isLabel
                return (
                  <div key={k} data-target={k === 'B6' ? 'sheet-0' : undefined}
                    className={`relative border-b border-r border-[#D8D8D2] px-2 text-[11px] flex items-center
                      ${isHeader ? 'font-semibold bg-[#FAF9F5]' : ''}
                      ${isLabel && !isHeader ? 'font-medium' : ''}
                      ${isDataNum ? 'justify-end font-mono' : ''}
                      ${k === 'B6' && step >= 3 ? 'bg-[#DFF0AE]/40' : ''}
                    `}>
                    {isDataNum ? Number(v).toLocaleString() : v}
                    {isSelected && (
                      <span className="absolute -inset-px ring-2 ring-[#1F8A5B] pointer-events-none z-[1]"></span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Chart overlay */}
        {chartVisible && (
          <div className="absolute right-3 top-3 w-[42%] h-[64%] bg-white border border-[#D8D8D2] rounded shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] p-3" style={{ animation: 'fadeIn .6s ease-out' }}>
            <div className="text-[10px] text-[#5C5A52] mb-1">利润趋势 · 2026</div>
            <svg viewBox="0 0 200 100" className="w-full h-[80%]">
              <line x1="20" y1="90" x2="195" y2="90" stroke="#D8D8D2" strokeWidth="1" />
              <line x1="20" y1="10" x2="20" y2="90" stroke="#D8D8D2" strokeWidth="1" />
              {[{ x: 50, h: 40, l: 'Q1' }, { x: 90, h: 55, l: 'Q2' }, { x: 130, h: 70, l: 'Q3' }, { x: 170, h: 80, l: 'Q4' }].map((b, i) => (
                <g key={i}>
                  <rect x={b.x - 12} y={90 - b.h} width="24" height={b.h} fill="#C5E17A"
                    style={{ transformOrigin: `${b.x}px 90px`, animation: `growBar2 .8s ${i * 0.15}s ease-out backwards` }} />
                  <text x={b.x} y="98" fill="#5C5A52" fontSize="8" textAnchor="middle">{b.l}</text>
                </g>
              ))}
              <polyline points="50,50 90,35 130,20 170,10" fill="none" stroke="#1F8A5B" strokeWidth="1.5" />
              {[{ x: 50, y: 50 }, { x: 90, y: 35 }, { x: 130, y: 20 }, { x: 170, y: 10 }].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#1F8A5B" />
              ))}
            </svg>
          </div>
        )}
      </div>

      {/* Tab strip */}
      <div className="h-6 border-t border-[#D8D8D2] flex items-end bg-[#F4F3EF] text-[11px]">
        <span className="px-3 py-1 bg-white border-t-2 border-[#1F8A5B] -mb-px text-[#1F1F1E] font-medium">销售</span>
        <span className="px-3 py-1 text-[#5C5A52]">成本</span>
        <span className="px-3 py-1 text-[#5C5A52]">+</span>
      </div>
    </div>
  )
}
