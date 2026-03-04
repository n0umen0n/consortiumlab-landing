'use client'

import ScrollReveal from './ScrollReveal'

const team = [
  {
    name: 'Vladislav Hramtsov',
    initials: 'VH',
    role: 'Co-Founder',
    bio: 'Ex-PwC Business transformation. 8 years web3 product design / smart contract development.',
    accent: 'linear-gradient(140deg, #8b5cf6, #4f7df5)',
  },
  {
    name: 'Lennar Lehestik',
    initials: 'LL',
    role: 'Co-Founder',
    bio: 'Led a 20-head AI team for 7 years, Silicon Valley startup. Over a decade in full-stack development.',
    accent: 'linear-gradient(140deg, #d4a847, #8b5cf6)',
  },
]

export default function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-accent-cyan text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-center">Team</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-center tracking-tight mb-10">Built by operators and builders.</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i}>
              <article className="glass-panel surface-shadow rounded-2xl p-8 md:p-9 h-full">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-16 h-16 rounded-2xl p-[1px]" style={{ background: member.accent }}>
                      <div className="w-full h-full rounded-2xl bg-dark-900/90 flex items-center justify-center text-sm font-semibold text-white/90">
                        {member.initials}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-accent-purple text-sm font-medium mb-4">{member.role}</p>
                    <p className="text-white/58 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
