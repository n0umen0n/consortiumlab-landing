'use client'

export default function ConsortiumLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="blockGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f7df5" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="blockGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d4a847" />
        </linearGradient>
        <linearGradient id="blockGrad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4a847" />
          <stop offset="100%" stopColor="#4f7df5" />
        </linearGradient>
      </defs>

      <style>{`
        @keyframes block-rise-1 {
          0%, 10% { transform: translateY(40px); opacity: 0; }
          30%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes block-rise-2 {
          0%, 25% { transform: translateY(40px); opacity: 0; }
          50%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes block-rise-3 {
          0%, 40% { transform: translateY(40px); opacity: 0; }
          65%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes block-rise-4 {
          0%, 55% { transform: translateY(40px); opacity: 0; }
          80%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes block-rise-5 {
          0%, 65% { transform: translateY(40px); opacity: 0; }
          90%, 100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        .b1 { animation: block-rise-1 2.5s ease-out both; }
        .b2 { animation: block-rise-2 2.5s ease-out both; }
        .b3 { animation: block-rise-3 2.5s ease-out both; }
        .b4 { animation: block-rise-4 2.5s ease-out both; }
        .b5 { animation: block-rise-5 2.5s ease-out both; }
        .glow { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* Glow behind */}
      <rect x="20" y="20" width="60" height="60" rx="12" fill="#8b5cf6" opacity="0.1" className="glow" />

      {/* Bottom row — 3 blocks */}
      <rect className="b1" x="8" y="62" width="24" height="24" rx="4" fill="url(#blockGrad1)" opacity="0.9" />
      <rect className="b2" x="38" y="62" width="24" height="24" rx="4" fill="url(#blockGrad2)" opacity="0.9" />
      <rect className="b3" x="68" y="62" width="24" height="24" rx="4" fill="url(#blockGrad3)" opacity="0.9" />

      {/* Middle row — 2 blocks */}
      <rect className="b4" x="23" y="34" width="24" height="24" rx="4" fill="url(#blockGrad2)" opacity="0.85" />
      <rect className="b4" x="53" y="34" width="24" height="24" rx="4" fill="url(#blockGrad1)" opacity="0.85" />

      {/* Top — 1 block (keystone) */}
      <rect className="b5" x="38" y="6" width="24" height="24" rx="4" fill="url(#blockGrad3)" opacity="0.95" />

      {/* Subtle connecting lines */}
      <line className="b4" x1="32" y1="62" x2="35" y2="58" stroke="white" strokeWidth="0.5" opacity="0.15" />
      <line className="b4" x1="62" y1="62" x2="65" y2="58" stroke="white" strokeWidth="0.5" opacity="0.15" />
      <line className="b5" x1="47" y1="34" x2="50" y2="30" stroke="white" strokeWidth="0.5" opacity="0.15" />
    </svg>
  )
}
