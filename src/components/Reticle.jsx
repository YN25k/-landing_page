export const Reticle = ({ size = 56, animated = true }) => (
  <span className="relative inline-block" style={{ width: size, height: size }}>
    <span className="absolute inset-0 rounded-full border" style={{ borderColor: 'rgba(197,225,122,0.35)' }}></span>
    <span className="absolute rounded-full border" style={{ inset: size * 0.18, borderColor: 'rgba(164,197,82,0.55)' }}></span>
    <span className="absolute rounded-full bg-lime" style={{ inset: size * 0.36, boxShadow: '0 0 0 1px rgba(138,173,63,0.4), 0 6px 18px rgba(164,197,82,0.5)' }}></span>
    {animated && (
      <span className="absolute left-1/2 top-1/2 rounded-full" style={{
        width: size * 0.4, height: size * 0.4,
        border: '1.5px solid rgba(197,225,122,0.7)',
        transform: 'translate(-50%,-50%)',
        animation: 'reticle-pulse 2.4s ease-out infinite',
      }}></span>
    )}
  </span>
)

export const Wordmark = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <Reticle size={22} animated={false} />
    <span className="font-semibold text-[19px] tracking-tight text-ink-900">指点</span>
  </span>
)
