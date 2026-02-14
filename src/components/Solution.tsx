'use client'

import ScrollReveal from './ScrollReveal'
import DaoLogo from './DaoLogo'

const pillars = [
  {
    icon: '◆',
    title: 'Meritocratic Governance',
    desc: 'Decision-makers chosen based on merit. Powered by the <a href="https://medium.com/@vladislavhramtsov/respect-game-meritocratic-governance-in-practice-e50a8f42288e" target="_blank" rel="noopener noreferrer" class="text-accent-gold hover:text-accent-gold/80 transition-colors">Respect Game</a> — a system that surfaces the people who earn trust through contribution.',
  },
  {
    icon: '◈',
    title: 'AI-Centric',
    desc: 'Hire agents via your Consortium. Execution at machine speed, oversight by humans.',
  },
  {
    icon: '◇',
    title: 'Fully On-Chain',
    desc: 'Treasury and assets managed on-chain. Transparent by design, resilient by nature — the organization cannot be shut down.',
  },
  {
    icon: '◎',
    title: 'Token Holder Signaling',
    desc: 'A constant signal layer delivering valuable information from token holders to human decision-makers and AI agents.',
  },
]

export default function Solution() {
  return (
    <section id="solution" className="relative py-32 md:py-40">
      {/* Accent glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-accent-gold text-sm font-semibold uppercase tracking-widest mb-4">The Solution</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            A new primitive:<br />
            <span className="gradient-text">the Consortium</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mb-16 leading-relaxed">
            Consortium Lab builds new organizational structures for the token economy.
            We&apos;re defining a new primitive — the <em className="text-white/70 not-italic font-medium">consortium</em> — a structured coordination entity purpose-built for the AI and crypto age.
          </p>
        </ScrollReveal>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} delay={i}>
              <div className="bg-dark-700/30 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors h-full">
                <div className="text-3xl mb-4 text-accent-gold">{p.icon}</div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/50 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* DAO OF THE APES callout */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-dark-700/80 to-dark-800/80 border border-accent-gold/10 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <DaoLogo className="w-24 h-24 md:w-32 md:h-32 shrink-0" />
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                DAO OF THE APES
              </h3>
              <p className="text-white/50 text-lg leading-relaxed mb-4">
                Our live experimental environment. A real community, real governance, real stakes — 
                testing consortium structures before they&apos;re ready for the world.
              </p>
              <a href="https://respectgame.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent-gold text-sm font-medium hover:text-accent-gold/80 transition-colors">
                <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                Live Experiment →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
