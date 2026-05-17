// Brand mark — outer ring + center dot.
// Per brand guide §02: outer ring stroke = radius × 0.13,
// center dot radius = outer radius × 0.38.
export const Reticle = ({ size = 56, animated = true }) => {
  const ringInset = size * 0.04                // small breathing space inside the box
  const dotInset = size * 0.31                 // → dot diameter = size × 0.38 (≈ spec)
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <span className="absolute rounded-full border-[1.5px]" style={{ inset: ringInset, borderColor: '#A4C552' }}></span>
      <span className="absolute rounded-full bg-lime" style={{ inset: dotInset, boxShadow: '0 0 0 1px rgba(138,173,63,0.4), 0 6px 18px rgba(164,197,82,0.5)' }}></span>
      {animated && (
        <span className="absolute left-1/2 top-1/2 rounded-full" style={{
          width: size * 0.38, height: size * 0.38,
          border: '1.5px solid rgba(197,225,122,0.7)',
          transform: 'translate(-50%,-50%)',
          animation: 'reticle-pulse 2.4s ease-out infinite',
        }}></span>
      )}
    </span>
  )
}

export const Wordmark = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <Reticle size={22} animated={false} />
    <span className="font-semibold text-[19px] tracking-tight text-ink-900">指点</span>
  </span>
)
