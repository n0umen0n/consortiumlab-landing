'use client'

import ScrollReveal from './ScrollReveal'

export default function Vision() {
  return (
    <section id="vision" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-accent-purple text-sm font-semibold uppercase tracking-widest mb-4">The Vision</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
            When AI automates execution,<br />
            <span className="gradient-text">governance becomes everything</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-16 leading-relaxed">
            Without better organizational structures, human and AI coordination remains the bottleneck.
            We&apos;re building systems where effort compounds, legitimacy scales, and organizations 
            stay productive as they grow.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { title: 'Effort Compounds', desc: 'Organizational systems where every contribution builds lasting value, not just momentary output.', color: 'accent-blue' },
            { title: 'Legitimacy Scales', desc: 'Governance that grows stronger — not weaker — as communities expand beyond their founding teams.', color: 'accent-purple' },
            { title: 'Productivity Persists', desc: 'Organizations that remain effective at 10,000 members, not just 10. Structure that doesn\'t break at scale.', color: 'accent-gold' },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="bg-dark-800/50 border border-white/5 rounded-2xl p-8">
                <div className={`w-3 h-3 rounded-full bg-${item.color} mb-4`} />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
