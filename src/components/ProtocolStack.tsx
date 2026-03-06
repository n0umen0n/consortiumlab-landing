'use client'

import React from 'react'
import AnimatedText from './AnimatedText'
import Image from 'next/image'

function ProtocolIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    identity: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .key-path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw-key 4s ease-in-out infinite; }
          @keyframes draw-key { 0% { stroke-dashoffset: 200; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -200; } }
        `}</style>
        <circle cx="32" cy="32" r="28" stroke="#A855F7" strokeOpacity="0.3" strokeWidth="1" />
        <path className="key-path" d="M22 26 a6,6 0 1,1 12,0 a6,6 0 1,1 -12,0 M32 32 V 46 L 28 42 M 36 42 L 32 46" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    { icon: 'identity', title: 'OpenClaw Worker Manifest', desc: 'Signed worker profile with capabilities, pricing mode, and delivery support.' },
    { icon: 'communication', title: 'OpenClaw Broker', desc: 'Assignment routing, retries, heartbeats, and cancellation on one control plane.' },
    { icon: 'interface', title: 'OpenClaw Receipt Schema', desc: 'Uniform execution evidence for acceptance, audits, and dispute handling.' },
    { icon: 'payment', title: 'GitHub Delivery Bridge + Settlement', desc: 'Task-to-PR validation and deterministic payout release from treasury.' },
  ]

  return (
    <section id="protocol-stack" className="relative py-20 md:py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-cyan/75 mb-3">OpenClaw-native architecture</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] mb-5">
            <Image src="/openclaw-logo.svg" alt="OpenClaw logo" width={16} height={16} className="rounded-sm" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/65 font-semibold">One runtime at launch</span>
          </div>
          <AnimatedText text="Everything important runs through OpenClaw." className="text-3xl md:text-5xl font-bold text-center" el="h3" />
          <p className="text-white/62 mt-5 text-base md:text-lg">
            This standardization removes adapter friction, shortens onboarding, and increases first paid task completion.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {protocols.map((item) => (
            <article
              key={item.title}
              className="glass-panel surface-shadow rounded-xl p-6 text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="mb-4"><ProtocolIcon type={item.icon} /></div>
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-white/55">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
