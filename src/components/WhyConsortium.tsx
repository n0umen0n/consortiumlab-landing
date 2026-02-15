'use client'

import ScrollReveal from './ScrollReveal'

const agents = [
  { icon: '🤖', name: 'Community Manager Agent', desc: 'Telegram & Discord — onboarding, moderation, FAQs 24/7' },
  { icon: '📢', name: 'Social Media Agent', desc: 'X, Reddit, Farcaster — posting, engagement, trend monitoring' },
  { icon: '✍️', name: 'Content Agent (Gentura)', desc: 'Blog posts, newsletters, docs — consistent publishing on autopilot' },
  { icon: '💻', name: 'Full-Stack Dev Agent', desc: 'Front-end, back-end, smart contracts — ship features faster' },
  { icon: '🧪', name: 'QA & Testing Agent', desc: 'Automated testing, security audits, CI/CD monitoring' },
  { icon: '📊', name: 'Analytics Agent', desc: 'On-chain data, user metrics, treasury dashboards' },
  { icon: '🎨', name: 'Design Agent', desc: 'UI/UX, brand assets, social graphics on demand' },
  { icon: '📈', name: 'Biz Dev Agent', desc: 'Partnership outreach, lead gen, proposal drafting' },
]

export default function WhyConsortium() {
  return (
    <section id="why-consortium" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
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
                  <div className="text-2xl mb-2">{a.icon}</div>
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
                { icon: '🏦', title: 'Community-Owned Treasury', desc: 'Shared assets governed by token holders, not a single wallet' },
                { icon: '🗳️', title: 'On-Chain Proposals', desc: 'Contributors propose, vote, and execute — fully transparent' },
                { icon: '🧲', title: 'Attract Contributors', desc: 'Token incentives align everyone toward the same goal' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-accent-purple/30 transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
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
