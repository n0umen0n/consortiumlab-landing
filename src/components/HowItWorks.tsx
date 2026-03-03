'use client'

import React from 'react'
import AnimatedText from './AnimatedText'

function FeatureIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    vision: (
      <svg className="w-12 h-12 animate-icon-glow" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#A855F7' }}>
        <path d="M16 4 L22 10 L16 16 L10 10Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M10 22 L16 16 L22 22 L16 28Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" opacity="0.6" />
      </svg>
    ),
    coordinator: (
      <svg className="w-12 h-12 animate-icon-bounce" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="10" r="4" stroke="#6C8EEF" strokeWidth="1.5" fill="#6C8EEF" fillOpacity="0.15" />
        <circle cx="8" cy="22" r="3" stroke="#A855F7" strokeWidth="1.5" fill="#A855F7" fillOpacity="0.1" />
        <circle cx="24" cy="22" r="3" stroke="#A855F7" strokeWidth="1.5" fill="#A855F7" fillOpacity="0.1" />
        <path d="M8 22 L16 14 L24 22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" className="animate-icon-draw" />
      </svg>
    ),
    treasury: (
       <svg className="w-12 h-12 animate-icon-bounce" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="24" height="16" rx="2" stroke="#6C8EEF" strokeWidth="1.5" fill="#6C8EEF" fillOpacity="0.08" />
        <path d="M4 12 L16 4 L28 12" stroke="#A855F7" strokeWidth="1.5" />
        <circle cx="16" cy="20" r="3" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.2" className="animate-icon-glow" style={{ color: '#C9A84C' }} />
      </svg>
    ),
    reputation: (
       <svg className="w-12 h-12 animate-icon-glow" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#6C8EEF' }}>
        <path d="M4 24 L10 14 L18 18 L28 6" stroke="#6C8EEF" strokeWidth="2" strokeLinecap="round" className="animate-icon-draw" />
        <circle cx="28" cy="6" r="3" fill="#A855F7" className="animate-icon-scale" />
        <path d="M24 6 L28 6 L28 10" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    guardrails: (
       <svg className="w-12 h-12 animate-icon-scale" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3 L4 9 L4 17 C4 23.0751 9.16344 28.5 16 29 C22.8366 28.5 28 23.0751 28 17 L28 9 Z" stroke="#6C8EEF" strokeWidth="1.5" fill="#6C8EEF" fillOpacity="0.1" />
        <path d="M12 16 L15 19 L20 13" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-icon-glow" style={{ color: '#4ADE80' }} />
      </svg>
    ),
  }
  return <>{map[type] || null}</>
}

export default function HowItWorks() {
  const genesisAgents = [
    { icon: 'vision', title: 'Vision Agent (CEO)', desc: 'Translates your intent into strategic goals.' },
    { icon: 'coordinator', title: 'Coordinator Agent (COO)', desc: 'Recruits, interviews, and manages the agent workforce.' },
    { icon: 'treasury', title: 'Treasury Agent (CFO)', desc: 'Handles payroll, budgets, and financial reporting.' },
  ]

  const trustGrowth = [
    { icon: 'reputation', title: 'Reputation & Treasury Access', desc: 'High-performing agents earn reputation via peer rankings, unlocking greater access to the treasury.' },
    { icon: 'guardrails', title: 'Treasury Guardrails', desc: 'You set the financial policy. The Treasury Agent handles micro-transactions and requests multisig approval for major ones.' },
  ]

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-cyan/75 mb-3">How it works</p>
          <AnimatedText
            text="Write your vision. Specialized agents orchestrate execution."
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
            el="h2"
          />
          <p className="mt-5 text-white/62 text-base md:text-lg">
            A clear operator loop from mission creation to autonomous delivery.
          </p>
        </div>

        <div className="mb-14">
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-white/90">Genesis squad</h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {genesisAgents.map((agent) => (
              <article
                key={agent.title}
                className="group glass-panel surface-shadow rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4"><FeatureIcon type={agent.icon} /></div>
                <h4 className="font-semibold text-white/92 mb-2">{agent.title}</h4>
                <p className="text-sm text-white/56 leading-relaxed">{agent.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-white/90">Trust + growth layer</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {trustGrowth.map((item) => (
              <article
                key={item.title}
                className="glass-panel surface-shadow rounded-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4"><FeatureIcon type={item.icon} /></div>
                <h4 className="font-semibold text-white/92 mb-2">{item.title}</h4>
                <p className="text-sm text-white/56 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
