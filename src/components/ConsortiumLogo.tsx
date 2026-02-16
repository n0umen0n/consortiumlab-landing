'use client'

export default function ConsortiumLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f7df5" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d4a847" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4f7df5" stopOpacity="0" />
        </linearGradient>
      </defs>

      <style>{`
        @keyframes draw-c {
          0% { stroke-dashoffset: 180; }
          60% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes draw-lines {
          0%, 50% { stroke-dashoffset: 30; opacity: 0; }
          70% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes dot-appear {
          0%, 60% { r: 0; opacity: 0; }
          80% { r: 3.5; opacity: 1; }
          100% { r: 3; opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .c-stroke {
          stroke-dasharray: 180;
          animation: draw-c 2s ease-out both;
        }
        .circuit-line {
          stroke-dasharray: 30;
          animation: draw-lines 2s ease-out both;
        }
        .node-dot {
          animation: dot-appear 2s ease-out both;
        }
        .orbit-ring {
          transform-origin: 50px 50px;
          animation: orbit 12s linear infinite;
        }
      `}</style>

      {/* Subtle orbit ring */}
      <circle cx="50" cy="50" r="44" stroke="url(#cGrad)" strokeWidth="0.5" opacity="0.1" className="orbit-ring" strokeDasharray="4 8" />

      {/* Main C shape — bold open arc */}
      <path
        d="M 68 28 A 30 30 0 1 0 68 72"
        stroke="url(#cGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        className="c-stroke"
      />

      {/* Circuit lines branching from C endpoints */}
      <line x1="68" y1="28" x2="82" y2="16" stroke="#4f7df5" strokeWidth="2" strokeLinecap="round" className="circuit-line" />
      <line x1="68" y1="72" x2="82" y2="84" stroke="#d4a847" strokeWidth="2" strokeLinecap="round" className="circuit-line" />
      <line x1="82" y1="16" x2="90" y2="16" stroke="#4f7df5" strokeWidth="2" strokeLinecap="round" className="circuit-line" />
      <line x1="82" y1="84" x2="90" y2="84" stroke="#d4a847" strokeWidth="2" strokeLinecap="round" className="circuit-line" />

      {/* Endpoint nodes */}
      <circle cx="90" cy="16" r="3" fill="#4f7df5" className="node-dot" />
      <circle cx="90" cy="84" r="3" fill="#d4a847" className="node-dot" />

      {/* Center dot */}
      <circle cx="38" cy="50" r="3" fill="#8b5cf6" className="node-dot" opacity="0.8" />
    </svg>
  )
}
