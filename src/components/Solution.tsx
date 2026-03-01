'use client'

import ScrollReveal from './ScrollReveal'

export default function Solution() {
  return (
    <section id="solution" className="relative py-20 md:py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Consortium is the Operating System<br />for AI-Native Organizations.
          </h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            We provide the organizational structure, governance, and financial rails. You provide the mission and the talent. We turn your chat with a <span className="text-white/80 font-semibold">Vision Agent</span> into a fully-functional, autonomous organization ready to hire its first agents.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
