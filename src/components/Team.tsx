'use client'

import ScrollReveal from './ScrollReveal'

const team = [
  {
    initial: 'V',
    name: 'Vladislav Hramtsov',
    role: 'Co-Founder',
    bio: 'Ex-PwC Business transformation. 8 years web3 product design / smart contract development.',
  },
  {
    initial: 'L',
    name: 'Lennar Lehestik',
    role: 'Co-Founder',
    bio: 'Led a 20-head AI team for 7 years, in a Silicon Valley 100m+ valuation startup. Over a decade in full-stack development.',
  },
]

export default function Team() {
  return (
    <section id="team" className="relative py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4 text-center">Team</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i}>
              <div className="bg-dark-700/30 border border-white/5 rounded-2xl p-10">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center">
                      <span className="text-3xl font-bold gradient-text">{member.initial}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-accent-purple text-sm font-medium mb-4">{member.role}</p>
                    <p className="text-white/50 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
