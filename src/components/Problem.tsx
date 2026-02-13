'use client'

import ScrollReveal from './ScrollReveal'

const stats = [
  { label: 'Legal entities for equity holders', value: 'Dozens', sub: 'LLCs, Corps, S-Corps, Cooperatives…' },
  { label: 'Structured entities for token holders', value: 'Zero', sub: 'A complete vacuum' },
  { label: 'In tokenized treasuries', value: '$50B+', sub: 'Capital without governance' },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">The Problem</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            Crypto created tokens.<br />
            <span className="text-white/40">It forgot to create organizations.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mb-16 leading-relaxed">
            Equity holders have centuries of organizational innovation — LLCs, corporations, partnerships, cooperatives. 
            Token holders have nothing equivalent. Capital formation scaled faster than governance design, 
            and protocols like <span className="text-white/70">Aave</span>, <span className="text-white/70">Uniswap</span>, and <span className="text-white/70">Arbitrum</span> feel 
            the friction every day.
          </p>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="gradient-border">
                <div className="gradient-border-inner p-8">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium mb-1">{stat.label}</div>
                  <div className="text-white/40 text-sm">{stat.sub}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* The Gap */}
        <div className="mt-24">
          <ScrollReveal>
            <div className="bg-dark-700/50 border border-white/5 rounded-2xl p-10 md:p-14">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">The Gap</h3>
              <div className="space-y-4 text-lg text-white/50 leading-relaxed">
                <p>When the organizations governing tokens are weak, <span className="text-white/80">token holders bear the cost</span>.</p>
                <p>Tokens proved extraordinary economic power — billions in value created, transferred, and governed by code.</p>
                <p className="text-white/70 font-medium">What&apos;s missing is the organizational layer.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
