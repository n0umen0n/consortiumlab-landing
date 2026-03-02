'use client'

import React from 'react'

export function OrganizationAnimation() {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .node { animation: pulse 2.5s ease-in-out infinite alternate; }
          .line { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw 5s ease-out infinite; }
          @keyframes pulse { to { transform: scale(1.1); opacity: 0.8; } }
          @keyframes draw { to { stroke-dashoffset: 0; } }
        `}</style>
        <g className="node" style={{ transformOrigin: '50px 15px' }}>
          <circle cx="50" cy="15" r="9" fill="#A855F7" />
          <circle cx="50" cy="15" r="9" stroke="#fff" strokeWidth="2" strokeOpacity="0.5" />
        </g>
        <g className="node" style={{ transformOrigin: '25px 50px', animationDelay: '0.5s' }}>
          <circle cx="25" cy="50" r="7" fill="#6C8EEF" />
        </g>
        <g className="node" style={{ transformOrigin: '75px 50px', animationDelay: '1s' }}>
          <circle cx="75" cy="50" r="7" fill="#6C8EEF" />
        </g>
        <g className="node" style={{ transformOrigin: '50px 85px', animationDelay: '1.5s' }}>
          <circle cx="50" cy="85" r="6" fill="#2DD4BF" />
        </g>
        <path d="M50 24 V 80" stroke="url(#line-grad)" strokeWidth="1.5" className="line" />
        <path d="M32 50 H 68" stroke="url(#line-grad)" strokeWidth="1.5" className="line" style={{ animationDelay: '1s' }} />
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
            <stop offset="50%" stopColor="#6C8EEF" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function AgentsAnimation() {
  return (
    <div className="w-32 h-32 md:w-40 md:h-40 relative">
      <style>{`
        .agent-dot { position: absolute; border-radius: 50%; animation: swarm 8s ease-in-out infinite; }
        @keyframes swarm {
          0%, 100% { transform: translate(var(--x1), var(--y1)) scale(0.8); }
          50% { transform: translate(var(--x2), var(--y2)) scale(1.2); }
        }
      `}</style>
      {[
        { size: 14, color: '#A855F7', x1: '40%', y1: '40%', x2: '60%', y2: '60%' },
        { size: 10, color: '#6C8EEF', x1: '20%', y1: '30%', x2: '80%', y2: '50%' },
        { size: 10, color: '#6C8EEF', x1: '70%', y1: '20%', x2: '30%', y2: '80%' },
        { size: 8, color: '#2DD4BF', x1: '10%', y1: '60%', x2: '90%', y2: '30%' },
        { size: 8, color: '#2DD4BF', x1: '80%', y1: '70%', x2: '20%', y2: '10%' },
      ].map((dot, i) => (
        <div
          key={i}
          className="agent-dot"
          style={{
            width: dot.size,
            height: dot.size,
            background: dot.color,
            top: '50%', left: '50%',
            animationDelay: `${i * -1.6}s`,
            ['--x1' as string]: dot.x1, ['--y1' as string]: dot.y1,
            ['--x2' as string]: dot.x2, ['--y2' as string]: dot.y2,
          }}
        />
      ))}
    </div>
  )
}
