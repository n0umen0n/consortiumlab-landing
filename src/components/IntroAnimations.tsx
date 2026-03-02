'use client'

import React from 'react'

export function OrganizationAnimation() {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .org-node { animation: org-pulse 3s ease-in-out infinite; }
          .org-line { stroke-dasharray: 100; stroke-dashoffset: 100; animation: org-draw 4s ease-out infinite; }
          @keyframes org-pulse { 0%, 100% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }
          @keyframes org-draw { to { stroke-dashoffset: 0; } }
        `}</style>
        <circle cx="50" cy="15" r="8" className="org-node" style={{ animationDelay: '0s' }} fill="#A855F7" />
        <circle cx="20" cy="45" r="6" className="org-node" style={{ animationDelay: '0.5s' }} fill="#6C8EEF" />
        <circle cx="80" cy="45" r="6" className="org-node" style={{ animationDelay: '1s' }} fill="#6C8EEF" />
        <circle cx="35" cy="80" r="5" className="org-node" style={{ animationDelay: '1.5s' }} fill="#2DD4BF" />
        <circle cx="65" cy="80" r="5" className="org-node" style={{ animationDelay: '2s' }} fill="#2DD4BF" />
        <path d="M50 23 V 35 L 23 43" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '0s' }} />
        <path d="M50 23 V 35 L 77 43" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '0.5s' }} />
        <path d="M20 51 V 70 L 33 78" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '1s' }} />
        <path d="M80 51 V 70 L 67 78" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '1.5s' }} />
      </svg>
    </div>
  )
}

export function AgentsAnimation() {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32">
       <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
         <style>{`
          .agent-dot { animation: agent-float 6s ease-in-out infinite; }
          @keyframes agent-float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
         `}</style>
        <circle cx="50" cy="50" r="5" fill="#A855F7" className="agent-dot" style={{ '--dx': '10px', '--dy': '-15px', animationDelay: '0s' } as React.CSSProperties} />
        <circle cx="30" cy="30" r="4" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '-12px', '--dy': '18px', animationDelay: '-1s' } as React.CSSProperties} />
        <circle cx="70" cy="30" r="4" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '15px', '--dy': '10px', animationDelay: '-2s' } as React.CSSProperties} />
        <circle cx="30" cy="70" r="4" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '-18px', '--dy': '-12px', animationDelay: '-3s' } as React.CSSProperties} />
        <circle cx="70" cy="70" r="4" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '12px', '--dy': '-15px', animationDelay: '-4s' } as React.CSSProperties} />
        <circle cx="50" cy="20" r="3" fill="#2DD4BF" className="agent-dot" style={{ '--dx': '0px', '--dy': '25px', animationDelay: '-5s' } as React.CSSProperties} />
      </svg>
    </div>
  )
}
