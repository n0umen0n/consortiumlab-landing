'use client'

import ScrollReveal from './ScrollReveal'

export default function LaunchCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Building business is </span>
              <span className="bg-gradient-to-r from-[#7B8CDE] via-[#B07CC3] via-[#D4A0A0] to-[#C9A84C] bg-clip-text text-transparent">
                fucking hard
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto italic">
              &ldquo;Starting a company is like staring into the abyss and eating glass.&rdquo; — Elon Musk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { num: '01', question: 'How should I start?', desc: 'Structure, legal, tokenomics — we help you figure out the foundation.' },
              { num: '02', question: 'Should I pay tax?', desc: 'Jurisdictions, compliance, crypto-native structures that actually work.' },
              { num: '03', question: 'How do I get funding?', desc: 'Token launches, grants, treasury design — capital without giving up control.' },
              { num: '04', question: 'How do I find people willing to help?', desc: 'Governance systems that align incentives and attract contributors.' },
            ].map((item) => (
              <div
                key={item.num}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-sm font-mono text-accent-purple/60 mb-2 block">{item.num}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
