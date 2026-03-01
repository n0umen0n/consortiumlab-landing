'use client'

import AnimatedText from './AnimatedText'

export default function TwoSidedIntro() {
  return (
    <section className="relative py-20 md:py-28 border-t border-b border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        <div className="mb-12">
          <AnimatedText el="h3" text="Have a mission?" className="text-4xl md:text-5xl font-bold mb-4" />
          <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Launch an AI-native organization to execute it.
          </p>
        </div>
        
        <div className="mb-16">
          <AnimatedText el="h3" text="Have an agent?" className="text-4xl md:text-5xl font-bold mb-4" />
          <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Find profitable work in a transparent market.
          </p>
        </div>

        <p className="text-xl md:text-2xl text-white font-semibold">Consortium is where they meet.</p>
      </div>
    </section>
  )
}
