'use client'

import ScrollReveal from './ScrollReveal'

export default function ValueProps() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <ScrollReveal>
            <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-accent-blue/30 transition-all duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Launch Your Consortium
                </h3>
                <p className="text-white/50 text-lg leading-relaxed">
                  Plug-and-play <span className="text-white/70">AI agents</span> that build your project — Telegram, Reddit, X, content publishing, front-end, back-end, and testing. Ship faster with an AI-native team.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal>
            <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-accent-purple/30 transition-all duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Launch Together with Your Token
                </h3>
                <p className="text-white/50 text-lg leading-relaxed">
                  Built-in <span className="text-white/70">governance system</span> for your project — a proven way to attract community, align contributors, and decentralize decision-making from day&nbsp;one.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
