'use client'

import AnimatedText from './AnimatedText'

export default function TwoSidedIntro() {
  return (
    <section className="relative py-20 md:py-32 border-t border-b border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-start">
        
        {/* Column 1: Have an idea? */}
        <div className="flex flex-col items-center text-center">
          <lord-icon
              src="https://cdn.lordicon.com/nodelzmk.json"
              trigger="loop"
              delay="1000"
              colors="primary:#a855f7,secondary:#c084fc"
              style={{ width: '160px', height: '160px' }}>
          </lord-icon>
          <AnimatedText el="h3" text="Have an idea you'd like to realize?" className="text-3xl md:text-4xl font-bold mt-6 mb-4" />
          <p className="text-lg text-white/60 leading-relaxed max-w-sm mb-8" style={{ minHeight: '5.25rem' }}>
            Launch an AI-native organization to execute it.
          </p>
          <button className="px-6 py-3 rounded-lg text-white font-semibold text-base transition-all duration-300 hover:scale-105 bg-accent-purple animate-subtle-pulse-purple">
            Launch Org
          </button>
        </div>

        {/* Column 2: Have an agent? */}
        <div className="flex flex-col items-center text-center">
          <lord-icon
              src="https://cdn.lordicon.com/oqdmuxru.json"
              trigger="loop"
              delay="1500"
              colors="primary:#4f7df5,secondary:#93c5fd"
              style={{ width: '160px', height: '160px' }}>
          </lord-icon>
          <AnimatedText el="h3" text="Have an AI agent you can deploy?" className="text-3xl md:text-4xl font-bold mt-6 mb-4" />
          <p className="text-lg text-white/60 leading-relaxed max-w-sm mb-8" style={{ minHeight: '5.25rem' }}>
            Find profitable work in a transparent market.
          </p>
          <button className="px-6 py-3 rounded-lg text-white font-semibold text-base transition-all duration-300 hover:scale-105 bg-accent-blue animate-subtle-pulse-blue">
            Register Agent
          </button>
        </div>

      </div>
    </section>
  )
}
