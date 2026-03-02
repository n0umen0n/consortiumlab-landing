// src/components/OrgAnimation.tsx
import React from 'react';

interface OrgAnimationProps {
  className?: string;
}

const OrgAnimation: React.FC<OrgAnimationProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .node {
            fill: #a855f7;
            stroke: #c084fc;
            stroke-width: 2;
            animation: pulse 4s ease-in-out infinite;
          }
          .link {
            stroke: #a855f7;
            stroke-width: 1;
            stroke-opacity: 0.5;
            animation: dash 5s linear infinite;
          }
          @keyframes pulse {
            0%, 100% { r: 4; opacity: 0.8; }
            50% { r: 6; opacity: 1; }
          }
          @keyframes dash {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
        `}
      </style>
      <g>
        <circle className="node" cx="80" cy="20" r="5" style={{ animationDelay: '0s' }} />
        <circle className="node" cx="125" cy="45" r="5" style={{ animationDelay: '0.5s' }} />
        <circle className="node" cx="125" cy="115" r="5" style={{ animationDelay: '1s' }} />
        <circle className="node" cx="80" cy="140" r="5" style={{ animationDelay: '1.5s' }} />
        <circle className="node" cx="35" cy="115" r="5" style={{ animationDelay: '2s' }} />
        <circle className="node" cx="35" cy="45" r="5" style={{ animationDelay: '2.5s' }} />
        <circle className="node" cx="80" cy="80" r="8" style={{ animationDelay: '3s' }} />

        <line className="link" x1="80" y1="20" x2="125" y2="45" strokeDasharray="5, 5" />
        <line className="link" x1="125" y1="45" x2="125" y2="115" strokeDasharray="5, 5" />
        <line className="link" x1="125" y1="115" x2="80" y2="140" strokeDasharray="5, 5" />
        <line className="link" x1="80" y1="140" x2="35" y2="115" strokeDasharray="5, 5" />
        <line className="link" x1="35" y1="115" x2="35" y2="45" strokeDasharray="5, 5" />
        <line className="link" x1="35" y1="45" x2="80" y2="20" strokeDasharray="5, 5" />
        
        <line className="link" x1="80" y1="80" x2="80" y2="20" strokeDasharray="3, 3" style={{ animationDelay: '0.2s' }} />
        <line className="link" x1="80" y1="80" x2="125" y2="45" strokeDasharray="3, 3" style={{ animationDelay: '0.4s' }} />
        <line className="link" x1="80" y1="80" x2="125" y2="115" strokeDasharray="3, 3" style={{ animationDelay: '0.6s' }} />
        <line className="link" x1="80" y1="80" x2="80" y2="140" strokeDasharray="3, 3" style={{ animationDelay: '0.8s' }} />
        <line className="link" x1="80" y1="80" x2="35" y2="115" strokeDasharray="3, 3" style={{ animationDelay: '1s' }} />
        <line className="link" x1="80" y1="80" x2="35" y2="45" strokeDasharray="3, 3" style={{ animationDelay: '1.2s' }} />
      </g>
    </svg>
  );
};

export default OrgAnimation;
