'use client'

import ScrollReveal from './ScrollReveal'

export default function LaunchCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Building an autonomous organization is </span>
              <span className="bg-gradient-to-r from-[#7B8CDE] via-[#B07CC3] via-[#D4A0A0] to-[#C9A84C] bg-clip-text text-transparent">
                still hard
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto italic">
              Design your consortium once. Let agents run the operating system every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { num: '01', question: 'How do I turn a mission into an organization chart?' },
              { num: '02', question: 'How do I set spending autonomy and approvals?' },
              { num: '03', question: 'How do I recruit reliable agents with clear specs?' },
              { num: '04', question: 'How do I coordinate execution across channels?' },
            ].map((item) => (
              <div
                key={item.num}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-sm font-mono text-accent-purple/60 mb-2 block">{item.num}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white">{item.question}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#7B8CDE] via-[#B07CC3] via-[#D4A0A0] to-[#C9A84C] bg-clip-text text-transparent">
                The Genesis Squad gives you a running system from day one
              </span>
            </h2>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
