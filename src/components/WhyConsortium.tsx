'use client'

import ScrollReveal from './ScrollReveal'

const AgentIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    community: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue animate-pulse" />
        <circle cx="8" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple opacity-70" />
        <circle cx="24" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple opacity-70" />
        <path d="M8 22 L16 14 L24 22" stroke="currentColor" strokeWidth="1" className="text-white/20" />
      </svg>
    ),
    social: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M6 16 L14 8 L22 16 L14 24Z" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue animate-spin-slow" />
        <circle cx="26" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple" />
        <line x1="22" y1="12" x2="24" y2="9" stroke="currentColor" strokeWidth="1" className="text-white/20" />
      </svg>
    ),
    content: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" />
        <line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-white/30 animate-pulse" />
        <line x1="10" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" className="text-white/20" />
        <line x1="10" y1="20" x2="17" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-white/15" />
      </svg>
    ),
    dev: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M10 10 L4 16 L10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-blue" />
        <path d="M22 10 L28 16 L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-purple" />
        <line x1="18" y1="6" x2="14" y2="26" stroke="currentColor" strokeWidth="1.5" className="text-white/30 animate-pulse" />
      </svg>
    ),
    qa: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" />
        <path d="M11 16 L14 19 L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 animate-pulse" />
      </svg>
    ),
    analytics: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="18" width="5" height="10" rx="1" fill="currentColor" className="text-accent-blue/50" />
        <rect x="11" y="12" width="5" height="16" rx="1" fill="currentColor" className="text-accent-blue/70 animate-pulse" />
        <rect x="18" y="8" width="5" height="20" rx="1" fill="currentColor" className="text-accent-purple/60" />
        <rect x="25" y="4" width="5" height="24" rx="1" fill="currentColor" className="text-accent-purple/80" />
      </svg>
    ),
    design: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue/60" />
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple/60 animate-pulse" />
        <circle cx="16" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A84C]/60" />
      </svg>
    ),
    bizdev: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M4 24 L10 14 L18 18 L28 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-blue" />
        <circle cx="28" cy="6" r="2" fill="currentColor" className="text-accent-purple animate-pulse" />
        <path d="M24 6 L28 6 L28 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-purple" />
      </svg>
    ),
    treasury: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" />
        <path d="M4 12 L16 4 L28 12" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple" />
        <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A84C] animate-pulse" />
      </svg>
    ),
    proposals: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" />
        <path d="M11 16 L15 20 L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-purple animate-pulse" />
      </svg>
    ),
    contributors: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue" />
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple animate-spin-slow" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A84C]" />
        <line x1="16" y1="26" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A84C]" />
        <line x1="2" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A84C]" />
        <line x1="26" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A84C]" />
      </svg>
    ),
  }
  return icons[type] || null
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
        {/* Launch CTA - before Why */}
        <ScrollReveal>
          <div className="mb-28 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Launch{' '}
              <span className="bg-gradient-to-r from-[#7B8CDE] via-[#B07CC3] via-[#D4A0A0] to-[#C9A84C] bg-clip-text text-transparent">
                consortium
              </span>{' '}
              <span className="text-white">together with your&nbsp;token</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            Why <span className="gradient-text">Consortium</span>?
          </h2>
        </ScrollReveal>

        {/* AI Agents */}
        <ScrollReveal>
          <div className="mt-16 mb-20">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              Hire AI Agents Into Your Org
            </h3>
            <p className="text-white/40 text-lg mb-10 max-w-2xl">
              Every startup needs a team. Consortium gives you one out of the box — AI agents that work around the clock so you can focus on what matters.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((a) => (
                <div
                  key={a.name}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-accent-blue/30 transition-all duration-300"
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
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              Governance System for Your Project
            </h3>
            <p className="text-white/40 text-lg max-w-3xl mb-8">
              Community-owned assets, transparent decision-making, and token-aligned incentives — the proven way to attract contributors and build something that outlasts any single founder.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: 'treasury', title: 'Community-Owned Treasury', desc: 'Shared assets governed by token holders, not a single wallet' },
                { icon: 'proposals', title: 'On-Chain Proposals', desc: 'Contributors propose, vote, and execute — fully transparent' },
                { icon: 'contributors', title: 'Attract Contributors', desc: 'Token incentives align everyone toward the same goal' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-accent-purple/30 transition-all duration-300"
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
