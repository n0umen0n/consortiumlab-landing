export default function ConsortiumLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer hexagonal constellation */}
      <circle cx="50" cy="12" r="4" fill="#4f7df5" />
      <circle cx="83" cy="31" r="4" fill="#8b5cf6" />
      <circle cx="83" cy="69" r="4" fill="#d4a847" />
      <circle cx="50" cy="88" r="4" fill="#4f7df5" />
      <circle cx="17" cy="69" r="4" fill="#8b5cf6" />
      <circle cx="17" cy="31" r="4" fill="#d4a847" />
      {/* Center node */}
      <circle cx="50" cy="50" r="6" fill="url(#centerGrad)" />
      {/* Connection lines */}
      <line x1="50" y1="12" x2="83" y2="31" stroke="#4f7df5" strokeWidth="1" opacity="0.4" />
      <line x1="83" y1="31" x2="83" y2="69" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
      <line x1="83" y1="69" x2="50" y2="88" stroke="#d4a847" strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="88" x2="17" y2="69" stroke="#4f7df5" strokeWidth="1" opacity="0.4" />
      <line x1="17" y1="69" x2="17" y2="31" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
      <line x1="17" y1="31" x2="50" y2="12" stroke="#d4a847" strokeWidth="1" opacity="0.4" />
      {/* Lines to center */}
      <line x1="50" y1="12" x2="50" y2="50" stroke="#4f7df5" strokeWidth="0.8" opacity="0.25" />
      <line x1="83" y1="31" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.25" />
      <line x1="83" y1="69" x2="50" y2="50" stroke="#d4a847" strokeWidth="0.8" opacity="0.25" />
      <line x1="50" y1="88" x2="50" y2="50" stroke="#4f7df5" strokeWidth="0.8" opacity="0.25" />
      <line x1="17" y1="69" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.25" />
      <line x1="17" y1="31" x2="50" y2="50" stroke="#d4a847" strokeWidth="0.8" opacity="0.25" />
      {/* Cross connections */}
      <line x1="50" y1="12" x2="83" y2="69" stroke="#4f7df5" strokeWidth="0.5" opacity="0.12" />
      <line x1="83" y1="31" x2="17" y2="69" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.12" />
      <line x1="17" y1="31" x2="83" y2="69" stroke="#d4a847" strokeWidth="0.5" opacity="0.12" />
      <defs>
        <radialGradient id="centerGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#4f7df5" />
        </radialGradient>
      </defs>
    </svg>
  )
}
