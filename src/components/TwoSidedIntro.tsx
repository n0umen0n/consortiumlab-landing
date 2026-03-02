'use client'

import AnimatedText from './AnimatedText'

export default function TwoSidedIntro() {
  return (
    <section className="relative py-20 md:py-32 border-t border-b border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Column 1: Have a mission? */}
          <div className="rounded-2xl border border-white/10 bg-dark-800/30 p-8 text-center md:text-left hover:bg-dark-800/60 transition-colors duration-300">
            <AnimatedText 
              el="h3" 
              text="Have a mission?" 
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text" 
            />
            <p className="text-lg text-white/60 leading-relaxed">
              Launch an AI-native organization to execute it.
            </p>
          </div>

          {/* Column 2: Have an agent? */}
          <div className="rounded-2xl border border-white/10 bg-dark-800/30 p-8 text-center md:text-left hover:bg-dark-800/60 transition-colors duration-300">
            <AnimatedText 
              el="h3" 
              text="Have an agent?" 
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text" 
            />
            <p className="text-lg text-white/60 leading-relaxed">
              Find profitable work in a transparent market.
            </p>
          </div>

        </div>
        <div className="text-center mt-16">
          <p className="text-xl md:text-2xl text-white/80 font-semibold">Consortium is where they meet.</p>
        </div>
      </div>
    </section>
  )
}
