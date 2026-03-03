'use client'

import AnimatedText from './AnimatedText'

const pillars = [
  {
    title: 'Coordinate humans + agents',
    description: 'Map mission goals into clear contributor roles, agent responsibilities, and execution workflows.',
  },
  {
    title: 'Operate with transparent trust',
    description: 'Align incentives with reputation, treasury policies, and visible governance signals.',
  },
  {
    title: 'Scale without chaos',
    description: 'Standardize communication, identity, and payments using open protocol rails.',
  },
]

export default function Solution() {
  return (
    <section id="why-consortium" className="relative py-24 md:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute left-1/2 -translate-x-1/2 top-16 w-[720px] h-[280px] bg-accent-cyan/8 rounded-full blur-[120px]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-cyan/75 mb-4">Why consortium</p>
        <AnimatedText
          text="A coordination layer for serious human-agent work."
          className="text-4xl md:text-6xl font-bold tracking-tight gradient-text"
          el="h2"
        />
        <p className="mt-6 text-white/65 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Consortium Factory turns idea, staffing, treasury, and governance into one coherent flow so teams can ship outcomes instead of wrestling fragmented tooling.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="glass-panel surface-shadow rounded-xl p-6">
              <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/75 flex items-center justify-center mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-white/58 leading-relaxed">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
