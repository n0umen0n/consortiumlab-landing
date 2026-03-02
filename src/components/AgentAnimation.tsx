// src/components/AgentAnimation.tsx
import React from 'react';

interface AgentAnimationProps {
  className?: string;
}

const AgentAnimation: React.FC<AgentAnimationProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .chip-bg {
            fill: #4f7df5;
            opacity: 0.1;
          }
          .trace {
            stroke: #4f7df5;
            stroke-width: 1.5;
            fill: none;
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw 5s linear infinite;
          }
          .glow-dot {
            fill: #93c5fd;
            r: 2;
            animation: travel 5s linear infinite, glow 2s ease-in-out infinite alternate;
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes travel {
            from { motion-offset: 0%; }
            to { motion-offset: 100%; }
          }
          @keyframes glow {
            from { filter: drop-shadow(0 0 1px #93c5fd); }
            to { filter: drop-shadow(0 0 5px #fff); }
          }
        `}
      </style>
      <rect className="chip-bg" x="30" y="30" width="100" height="100" rx="10" />
      <path
        id="trace-path"
        className="trace"
        d="M 40 40 L 60 40 L 60 60 L 80 60 L 80 80 L 100 80 L 100 100 L 120 100 L 120 120"
      />
      <circle className="glow-dot">
        <animateMotion dur="5s" repeatCount="indefinite">
          <mpath href="#trace-path" />
        </animateMotion>
      </circle>
      <path
        id="trace-path-2"
        className="trace"
        style={{ animationDelay: '1s' }}
        d="M 120 40 L 100 40 L 100 60 L 80 60 L 80 80 L 60 80 L 60 100 L 40 100 L 40 120"
      />
      <circle className="glow-dot" style={{ animationDelay: '1s' }}>
        <animateMotion dur="5s" repeatCount="indefinite">
          <mpath href="#trace-path-2" />
        </animateMotion>
      </circle>
    </svg>
  );
};

export default AgentAnimation;
