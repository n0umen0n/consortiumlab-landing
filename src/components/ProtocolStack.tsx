'use client'

import React from 'react'
import AnimatedText from './AnimatedText'

function ProtocolIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    identity: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="rgba(168,85,247,0.28)" strokeWidth="1" />
        <circle cx="32" cy="32" r="20" stroke="rgba(168,85,247,0.45)" strokeDasharray="3 5">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="13.5" stroke="rgba(79,125,245,0.45)" strokeDasharray="2 6">
          <animateTransform attributeName="transform" type="rotate" from="360 32 32" to="0 32 32" dur="5.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="7.5" fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.55)">
          <animate attributeName="r" values="7;8.1;7" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <path d="M32 20 L40 24 V30 C40 35 36.7 39.3 32 41 C27.3 39.3 24 35 24 30 V24 L32 20Z" fill="rgba(15,23,42,0.55)" stroke="rgba(201,168,76,0.9)" strokeWidth="1.2" />
        <path d="M29.4 29.5V27.9C29.4 26.5 30.5 25.4 31.9 25.4H32.1C33.5 25.4 34.6 26.5 34.6 27.9V29.5M28.8 29.5H35.2V33.2H28.8V29.5Z" stroke="#E5C86A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="2.4" fill="#C9A84C">
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M32 12 A20 20 0 1 1 31.9 12" />
        </circle>
      </svg>
    ),
    communication: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
         <style>{`
          .msg-dot { animation: msg-travel 3s ease-in-out infinite; }
          @keyframes msg-travel { from { motion-offset: 0%; } to { motion-offset: 100%; } }
        `}</style>
        <circle cx="16" cy="32" r="6" stroke="#6C8EEF" strokeWidth="1.5" fill="#6C8EEF" fillOpacity="0.1" />
        <circle cx="48" cy="32" r="6" stroke="#6C8EEF" strokeWidth="1.5" fill="#6C8EEF" fillOpacity="0.1" />
        <path d="M22 32 C 28 24, 40 24, 42 32" stroke="rgba(255,255,255,0.1)" strokeWidth="1" id="p1" />
        <path d="M42 32 C 40 40, 28 40, 22 32" stroke="rgba(255,255,255,0.1)" strokeWidth="1" id="p2" />
        <circle r="2" fill="#2DD4BF" className="msg-dot">
          <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#p1" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#C9A84C" className="msg-dot" style={{ animationDelay: '1.5s' }}>
           <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#p2" />
          </animateMotion>
        </circle>
      </svg>
    ),
    interface: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`.line { animation: shimmer 2s ease-in-out infinite; } @keyframes shimmer { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
        <path d="M16 16 H 48 V 48 H 16Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M22 24 H 32" stroke="#A855F7" strokeWidth="2" className="line" style={{ animationDelay: '0s' }} />
        <path d="M22 32 H 42" stroke="#6C8EEF" strokeWidth="2" className="line" style={{ animationDelay: '0.2s' }} />
        <path d="M22 40 H 36" stroke="#2DD4BF" strokeWidth="2" className="line" style={{ animationDelay: '0.4s' }} />
      </svg>
    ),
    payment: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`.coin { animation: coin-fall 3s cubic-bezier(0.5, 0, 0.75, 0) infinite; } @keyframes coin-fall { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(32px); opacity: 1; } }`}</style>
        <path d="M16 48 H 48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="24" cy="20" r="4" fill="#C9A84C" className="coin" style={{ animationDelay: '0s' }} />
        <circle cx="32" cy="20" r="4" fill="#C9A84C" className="coin" style={{ animationDelay: '0.5s' }} />
        <circle cx="40" cy="20" r="4" fill="#C9A84C" className="coin" style={{ animationDelay: '1s' }} />
      </svg>
    ),
  }
  return <>{map[type] || null}</>
}


export default function ProtocolStack() {
  const protocols = [
    { icon: 'identity', title: 'Identity', desc: 'On-chain addresses', signal: 'Trust root', glow: 'rgba(139,92,246,0.35)' },
    { icon: 'communication', title: 'Communication', desc: 'XMTP messaging rail', signal: 'Secure wire', glow: 'rgba(79,125,245,0.35)' },
    { icon: 'interface', title: 'Interface', desc: 'MCP interoperability', signal: 'Tool bridge', glow: 'rgba(34,211,238,0.35)' },
    { icon: 'payment', title: 'Payment', desc: 'x402 programmable value', signal: 'Value rail', glow: 'rgba(212,168,71,0.35)' },
  ]

  return (
    <section id="protocol-stack" className="relative py-20 md:py-28 overflow-hidden">
      <style jsx>{`
        @keyframes stackSignalRun {
          0% { left: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes orbPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.86); }
          50% { opacity: 0.55; transform: scale(1.06); }
        }
        .stack-signal {
          position: absolute;
          top: -4px;
          left: 0;
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #22d3ee;
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.8);
          animation: stackSignalRun 4.4s linear infinite;
        }
        .protocol-card {
          position: relative;
          overflow: hidden;
          transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
        }
        .protocol-card:hover {
          transform: translateY(-7px);
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 12px 34px rgba(10, 16, 36, 0.45);
        }
        .protocol-orb {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 999px;
          filter: blur(26px);
          top: -30px;
          right: -26px;
          opacity: 0.25;
          animation: orbPulse 3.8s ease-in-out infinite;
        }
        .protocol-icon-wrap {
          animation: cardFloat 3.3s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 grid-bg opacity-45" />
      <div className="absolute left-[-60px] top-24 w-56 h-56 bg-accent-purple/12 blur-[100px] rounded-full" />
      <div className="absolute right-[-60px] bottom-12 w-56 h-56 bg-accent-cyan/12 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-cyan/75 mb-3">Open protocol stack</p>
          <AnimatedText text="Rails for interoperable collaboration." className="text-3xl md:text-5xl font-bold text-center" el="h3" />
          <p className="text-white/62 mt-5 text-base md:text-lg">
            Plug-in architecture for identity, communication, control interfaces, and payments.
          </p>
        </div>

        <div className="hidden md:block relative max-w-5xl mx-auto mb-10">
          <div className="h-px bg-white/12" />
          <div className="stack-signal" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {protocols.map((item, i) => (
            <article
              key={item.title}
              className="protocol-card glass-panel surface-shadow rounded-xl p-6 text-center flex flex-col items-center"
            >
              <div className="protocol-orb" style={{ background: item.glow, animationDelay: `${i * 0.25}s` }} />
              <div className="relative z-10 mb-3 inline-flex px-2 py-1 rounded-full border border-white/12 bg-white/[0.03] text-[10px] uppercase tracking-[0.12em] text-white/65">
                {item.signal}
              </div>
              <div className="protocol-icon-wrap relative z-10 mb-4" style={{ animationDelay: `${i * 0.18}s` }}><ProtocolIcon type={item.icon} /></div>
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-white/55">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
