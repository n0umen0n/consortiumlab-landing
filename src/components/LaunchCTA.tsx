'use client'

import ScrollReveal from './ScrollReveal'

export default function LaunchCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Launch </span>
              <span className="bg-gradient-to-r from-[#7B8CDE] via-[#B07CC3] via-[#D4A0A0] to-[#C9A84C] bg-clip-text text-transparent">
                consortium
              </span>
              <br />
              <span className="text-white">together with your token</span>
            </h2>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
