'use client'

export default function ConsortiumLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4f7df5" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d4a847" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes trace {
          0% { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .trace-1 { stroke-dasharray: 1; animation: trace 1.5s ease-out 0.2s both; }
        .trace-2 { stroke-dasharray: 1; animation: trace 1.5s ease-out 0.5s both; }
        .trace-3 { stroke-dasharray: 1; animation: trace 1.5s ease-out 0.8s both; }
        .fade-1 { animation: fade-in 0.6s ease-out 1.2s both; }
        .fade-2 { animation: fade-in 0.6s ease-out 1.5s both; }
        .fade-3 { animation: fade-in 0.6s ease-out 1.8s both; }
        .breathe { animation: breathe 4s ease-in-out infinite; }
      `}</style>

      {/* Diamond frame — 3 nested diamonds traced in sequence */}
      <path
        d="M50 5 L90 50 L50 95 L10 50 Z"
        stroke="url(#lg1)"
        strokeWidth="2"
        pathLength="1"
        className="trace-1"
        strokeLinejoin="round"
      />
      <path
        d="M50 18 L78 50 L50 82 L22 50 Z"
        stroke="url(#lg1)"
        strokeWidth="1.5"
        pathLength="1"
        className="trace-2"
        opacity="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M50 31 L66 50 L50 69 L34 50 Z"
        stroke="url(#lg1)"
        strokeWidth="1.2"
        pathLength="1"
        className="trace-3"
        opacity="0.4"
        strokeLinejoin="round"
      />

      {/* Corner accent nodes — appear after trace */}
      <circle cx="50" cy="5" r="2.5" fill="#4f7df5" className="fade-1" filter="url(#glow)" />
      <circle cx="90" cy="50" r="2.5" fill="#8b5cf6" className="fade-2" filter="url(#glow)" />
      <circle cx="50" cy="95" r="2.5" fill="#d4a847" className="fade-1" filter="url(#glow)" />
      <circle cx="10" cy="50" r="2.5" fill="#8b5cf6" className="fade-2" filter="url(#glow)" />

      {/* Center core — breathes */}
      <circle cx="50" cy="50" r="5" fill="url(#lg1)" className="fade-3 breathe" filter="url(#glow)" />

      {/* Cross lines from center to mid-diamond corners */}
      <line x1="50" y1="50" x2="50" y2="18" stroke="#4f7df5" strokeWidth="0.6" opacity="0.3" className="fade-3" />
      <line x1="50" y1="50" x2="78" y2="50" stroke="#8b5cf6" strokeWidth="0.6" opacity="0.3" className="fade-3" />
      <line x1="50" y1="50" x2="50" y2="82" stroke="#d4a847" strokeWidth="0.6" opacity="0.3" className="fade-3" />
      <line x1="50" y1="50" x2="22" y2="50" stroke="#8b5cf6" strokeWidth="0.6" opacity="0.3" className="fade-3" />
    </svg>
  )
}
