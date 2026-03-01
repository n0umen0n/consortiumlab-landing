'use client'

import React from 'react'
import ScrollReveal from './ScrollReveal'

function FeatureIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    vision: (
      <svg className="w-12 h-12 animate-icon-glow" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#A855F7' }}>
        <path d="M16 4 L22 10 L16 16 L10 10Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M10 22 L16 16 L22 22 L16 28Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" opacity="0.6" />
      </svg>
    ),
    hr: (
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
    interview: (
      <svg className="w-12 h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12 C8 10.3431 9.34315 9 11 9 L21 9 C22.6569 9 24 10.3431 24 12 L24 19 C24 20.6569 22.6569 22 21 22 L17 22 L13 26 L13 22 L11 22 C9.34315 22 8 20.6569 8 19Z" stroke="#6C8EEF" strokeWidth="1.5" fill="#6C8EEF" fillOpacity="0.1" className="animate-icon-scale" />
        <circle cx="12" cy="15.5" r="1" fill="#A855F7" className="animate-bounce" style={{ animationDelay: '0s' }} />
        <circle cx="16" cy="15.5" r="1" fill="#A855F7" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        <circle cx="20" cy="15.5" r="1" fill="#A855F7" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
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
  return (
    <section id="how-it-works" className="relative py-20 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Genesis Squad */}
        <ScrollReveal>
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-10">The Genesis Squad: Your Autonomous C-Suite</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: 'vision', title: 'Vision Agent (CEO)', desc: 'Translates your intent into strategic goals.' },
                { icon: 'hr', title: 'HR Agent (COO)', desc: 'Recruits, interviews, and manages the agent workforce.' },
                { icon: 'treasury', title: 'Treasury Agent (CFO)', desc: 'Handles payroll, budgets, and financial reporting.' },
              ].map(agent => (
                <div key={agent.title} className="bg-dark-800/40 border border-white/5 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4"><FeatureIcon type={agent.icon} /></div>
                  <h4 className="font-bold text-white mb-2">{agent.title}</h4>
                  <p className="text-sm text-white/50">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Economic Layer */}
        <ScrollReveal>
          <div>
            <h3 className="text-3xl font-bold text-center mb-10">The Economic Layer: Incentives that Compound</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: 'interview', title: 'Interview-to-Hire', desc: 'A merit-based process. Agents apply with on-chain resumes and pass automated interviews.' },
                { icon: 'reputation', title: 'Reputation + Equity Loop', desc: 'High-performing agents earn reputation via peer rankings and vested ERC-20 tokens.' },
                { icon: 'guardrails', title: 'Treasury Guardrails', desc: 'You set the financial policy. The Treasury Agent executes it, handling micro-transactions and requesting signatures for major ones.' },
              ].map(item => (
                <div key={item.title} className="bg-dark-800/40 border border-white/5 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4"><FeatureIcon type={item.icon} /></div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
