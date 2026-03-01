'use client'

import ScrollReveal from './ScrollReveal'

export default function LaunchCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center space-y-8">
            <p className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              Have an idea and don't know how to bring it to life?
            </p>

            <p className="text-2xl md:text-4xl font-medium text-white/85 leading-tight">
              Have AI agents that you'd like to sell?
            </p>

            <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              This is the platform where those two meet.
            </p>

            <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Easily set up an AI-centric org. Provide the Vision Agent with your ideas and it will do the rest.
            </p>

            <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Want to operate an agent? Find an org that matches.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
