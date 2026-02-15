'use client'

import React from 'react'
import ScrollReveal from './ScrollReveal'

function AgentIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    community: (
      <svg className="w-8 h-8 animate-pulse" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="10" r="4" stroke="#6C8EEF" strokeWidth="1.5" />
        <circle cx="8" cy="22" r="3" stroke="#A855F7" strokeWidth="1.5" opacity="0.7" />
        <circle cx="24" cy="22" r="3" stroke="#A855F7" strokeWidth="1.5" opacity="0.7" />
        <path d="M8 22 L16 14 L24 22" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </svg>
    ),
    social: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 16 L14 8 L22 16 L14 24Z" stroke="#6C8EEF" strokeWidth="1.5" className="animate-spin-slow origin-center" />
        <circle cx="26" cy="8" r="3" stroke="#A855F7" strokeWidth="1.5" />
        <line x1="22" y1="12" x2="24" y2="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </svg>
    ),
    content: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="#6C8EEF" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="22" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="animate-pulse" />
        <line x1="10" y1="15" x2="19" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="10" y1="20" x2="17" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      </svg>
    ),
    dev: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 L4 16 L10 22" stroke="#6C8EEF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 10 L28 16 L22 22" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="6" x2="14" y2="26" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="animate-pulse" />
      </svg>
    ),
    qa: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" stroke="#6C8EEF" strokeWidth="1.5" />
        <path d="M11 16 L14 19 L21 12" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
      </svg>
    ),
    analytics: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="18" width="5" height="10" rx="1" fill="#6C8EEF" opacity="0.5" />
        <rect x="11" y="12" width="5" height="16" rx="1" fill="#6C8EEF" opacity="0.7" className="animate-pulse" />
        <rect x="18" y="8" width="5" height="20" rx="1" fill="#A855F7" opacity="0.6" />
        <rect x="25" y="4" width="5" height="24" rx="1" fill="#A855F7" opacity="0.8" />
      </svg>
    ),
    design: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="14" r="6" stroke="#6C8EEF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="20" cy="14" r="6" stroke="#A855F7" strokeWidth="1.5" opacity="0.6" className="animate-pulse" />
        <circle cx="16" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
    bizdev: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 24 L10 14 L18 18 L28 6" stroke="#6C8EEF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="6" r="2" fill="#A855F7" className="animate-pulse" />
        <path d="M24 6 L28 6 L28 10" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    treasury: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="24" height="16" rx="2" stroke="#6C8EEF" strokeWidth="1.5" />
        <path d="M4 12 L16 4 L28 12" stroke="#A855F7" strokeWidth="1.5" />
        <circle cx="16" cy="20" r="3" stroke="#C9A84C" strokeWidth="1.5" className="animate-pulse" />
      </svg>
    ),
    proposals: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="#6C8EEF" strokeWidth="1.5" />
        <path d="M11 16 L15 20 L22 12" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
      </svg>
    ),
    contributors: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" stroke="#6C8EEF" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="4" stroke="#A855F7" strokeWidth="1.5" className="animate-spin-slow origin-center" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="16" y1="26" x2="16" y2="30" stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="2" y1="16" x2="6" y2="16" stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="26" y1="16" x2="30" y2="16" stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
    ),
  }
  return <>{map[type] || null}</>
}

const agents = [
  { icon: 'community', name: 'Community Manager Agent', desc: 'Telegram & Discord — onboarding, moderation, FAQs 24/7' },
  { icon: 'social', name: 'Social Media Agent', desc: 'X, Reddit, Farcaster — posting, engagement, trend monitoring' },
  { icon: 'content', name: 'Content Agent (Gentura)', desc: 'Blog posts, newsletters, docs — consistent publishing on autopilot' },
  { icon: 'dev', name: 'Full-Stack Dev Agent', desc: 'Front-end, back-end, smart contracts — ship features faster' },
  { icon: 'qa', name: 'QA & Testing Agent', desc: 'Automated testing, security audits, CI/CD monitoring' },
  { icon: 'analytics', name: 'Analytics Agent', desc: 'On-chain data, user metrics, treasury dashboards' },
  { icon: 'design', name: 'Design Agent', desc: 'UI/UX, brand assets, social graphics on demand' },
  { icon: 'bizdev', name: 'Biz Dev Agent', desc: 'Partnership outreach, lead gen, proposal drafting' },
]

export default function WhyConsortium() {
  return (
    <section id="why-consortium" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            <span className="gradient-text">Consortium</span> is a modern organization out of the box optimize for maximum productivity
          </h2>
        </ScrollReveal>

        {/* AI Agents */}
        <ScrollReveal>
          <div className="mt-16 mb-20">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-4xl md:text-5xl font-bold gradient-text">1</span>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                AI Agents ready to bring your idea into reality
              </h3>
            </div>
            <p className="text-white/40 text-lg mb-10 max-w-2xl pl-12 md:pl-16">
              Consortium comes with set of AI agents
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((a) => (
                <div
                  key={a.name}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-[#6C8EEF]/30 transition-all duration-300"
                >
                  <div className="mb-3"><AgentIcon type={a.icon} /></div>
                  <h4 className="text-white font-medium mb-1 text-sm">{a.name}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Governance */}
        <ScrollReveal>
          <div>
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-4xl md:text-5xl font-bold gradient-text">2</span>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                Attract contributors through fair incentive system
              </h3>
            </div>
            <p className="text-white/40 text-lg max-w-3xl mb-8 pl-12 md:pl-16">
              Collectively owned assets, transparent decisions, and token-aligned incentives — built to attract talent and outlast any single founder.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: 'treasury', title: 'Community-Owned Treasury', desc: 'Shared assets governed most active contributors.' },
                { icon: 'proposals', title: 'On-Chain Proposals', desc: 'Contributors propose, vote, and execute — fully transparent' },
                { icon: 'contributors', title: 'Attract Contributors', desc: 'Token incentives align everyone toward the same goal' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#A855F7]/30 transition-all duration-300"
                >
                  <div className="mb-3"><AgentIcon type={item.icon} /></div>
                  <h4 className="text-white font-medium mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
