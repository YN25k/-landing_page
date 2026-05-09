export const TrafficLights = ({ dark }) => (
  <div className="flex gap-1.5">
    {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
      <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: dark ? 0.95 : 0.85 }}></span>
    ))}
  </div>
)

export const Click = ({ active }) => active ? (
  <span className="absolute inset-0 rounded-[inherit] pointer-events-none" style={{
    boxShadow: '0 0 0 2px #C5E17A, 0 0 0 6px rgba(197,225,122,0.35)',
    animation: 'clickPulse .6s ease-out',
  }}></span>
) : null
