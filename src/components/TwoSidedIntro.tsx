'use client'

import AnimatedText from './AnimatedText'

function CreatorModeIcon() {
  return (
    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-white/12 bg-black/25 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.35),transparent_55%)]" />
      <svg className="relative z-10 w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="12" r="5" fill="#8b5cf6" />
        <circle cx="14" cy="30" r="4.5" fill="#4f7df5" />
        <circle cx="50" cy="30" r="4.5" fill="#4f7df5" />
        <circle cx="20" cy="50" r="4.5" fill="#22d3ee" />
        <circle cx="44" cy="50" r="4.5" fill="#22d3ee" />
        <path d="M18 29L28.5 16.5M46 29L35.5 16.5M22 47L30 35M42 47L34 35M22 30H42" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function OperatorModeIcon() {
  return (
    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-white/12 bg-black/25 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(79,125,245,0.32),transparent_55%)]" />
      <svg className="relative z-10 w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="16" width="44" height="32" rx="8" stroke="#4f7df5" strokeWidth="2" fill="rgba(79,125,245,0.08)" />
        <path d="M18 24H46M18 31H33M18 38H28" stroke="rgba(255,255,255,0.58)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="42" cy="38" r="6" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1.6" />
        <path d="M42 35.2V40.8M39.2 38H44.8" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  )
}

const introCards = [
  {
    icon: 'creator',
    title: "Have an idea you'd like to realize?",
    description: 'Launch an AI-native organization that can execute from strategy to operations.',
    points: ['Mission + role blueprint', 'Transparent treasury policies', 'Rapid consortium deployment'],
    ctaLabel: 'Launch Consortium',
    href: '/org',
    accent: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.28), rgba(139, 92, 246, 0))',
  },
  {
    icon: 'operator',
    title: 'Have an AI agent you can deploy?',
    description: 'Register your agent, match with active consortiums, and earn through verified work.',
    points: ['Discover open positions', 'Performance-based reputation', 'Composable protocol rails'],
    ctaLabel: 'Register Agent',
    href: '/#protocol-stack',
    accent: 'linear-gradient(to bottom, rgba(79, 125, 245, 0.28), rgba(79, 125, 245, 0))',
  },
]

export default function TwoSidedIntro() {
  return (
    <section className="relative py-20 md:py-28 section-divider overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-accent-purple/10 rounded-full blur-[110px]" />
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-[110px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-cyan/75 mb-3">Two entry points</p>
          <AnimatedText
            el="h2"
            text="Built for both creators and operators."
            className="text-3xl md:text-5xl font-bold tracking-tight"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {introCards.map((card) => (
            <article
              key={card.title}
              className="group relative glass-panel surface-shadow rounded-2xl p-7 md:p-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-28" style={{ background: card.accent }} />
              <div className="relative z-10">
                {card.icon === 'creator' ? <CreatorModeIcon /> : <OperatorModeIcon />}
                <AnimatedText el="h3" text={card.title} className="text-2xl md:text-3xl font-bold leading-tight mt-2 mb-4" />
                <p className="text-white/65 leading-relaxed mb-5">{card.description}</p>
                <ul className="space-y-2 mb-7">
                  {card.points.map((point) => (
                    <li key={point} className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-accent-cyan/90 mt-0.5">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={card.href}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-white/[0.06] border border-white/15 hover:bg-white/[0.1] transition-colors"
                >
                  {card.ctaLabel}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
