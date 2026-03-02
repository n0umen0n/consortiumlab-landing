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
        {/* Top Node */}
        <circle cx="50" cy="20" r="10" className="org-node" style={{ animationDelay: '0s' }} fill="#A855F7" />
        
        {/* Middle Nodes */}
        <circle cx="25" cy="50" r="8" className="org-node" style={{ animationDelay: '0.5s' }} fill="#6C8EEF" />
        <circle cx="75" cy="50" r="8" className="org-node" style={{ animationDelay: '1s' }} fill="#6C8EEF" />
        
        {/* Bottom Nodes */}
        <circle cx="25" cy="80" r="6" className="org-node" style={{ animationDelay: '1.5s' }} fill="#2DD4BF" />
        <circle cx="75" cy="80" r="6" className="org-node" style={{ animationDelay: '2s' }} fill="#2DD4BF" />

        {/* Connections */}
        <path d="M50 30 V 45 H 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '0s' }} />
        <path d="M50 30 V 45 H 75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '0.5s' }} />
        <path d="M25 58 V 74" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '1s' }} />
        <path d="M75 58 V 74" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="org-line" style={{ animationDelay: '1.5s' }} />
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
        <circle cx="50" cy="50" r="8" fill="#A855F7" className="agent-dot" style={{ '--dx': '10px', '--dy': '-15px', animationDelay: '0s' } as React.CSSProperties} />
        <circle cx="30" cy="30" r="6" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '-12px', '--dy': '18px', animationDelay: '-1s' } as React.CSSProperties} />
        <circle cx="70" cy="30" r="6" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '15px', '--dy': '10px', animationDelay: '-2s' } as React.CSSProperties} />
        <circle cx="30" cy="70" r="6" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '-18px', '--dy': '-12px', animationDelay: '-3s' } as React.CSSProperties} />
        <circle cx="70" cy="70" r="6" fill="#6C8EEF" className="agent-dot" style={{ '--dx': '12px', '--dy': '-15px', animationDelay: '-4s' } as React.CSSProperties} />
        <circle cx="50" cy="20" r="5" fill="#2DD4BF" className="agent-dot" style={{ '--dx': '0px', '--dy': '25px', animationDelay: '-5s' } as React.CSSProperties} />
        <circle cx="80" cy="50" r="5" fill="#2DD4BF" className="agent-dot" style={{ '--dx': '-25px', '--dy': '0px', animationDelay: '-6s' } as React.CSSProperties} />
      </svg>
    </div>
  )
}
