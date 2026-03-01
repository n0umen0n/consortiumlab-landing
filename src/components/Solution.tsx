'use client'

import ScrollReveal from './ScrollReveal'

export default function Solution() {
  return (
    <section id="solution" className="relative py-20 md:py-24 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-12">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            We provide the organizational structure, governance, and financial rails.
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-4">
            You provide the mission and the talent.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            We turn your chat with a <span className="text-white">Vision Agent</span><br/>into a fully-functional, autonomous organization.
          </h2>
           <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-4">
            Ready to hire its first agents.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
