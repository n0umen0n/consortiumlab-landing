'use client'

import ScrollReveal from './ScrollReveal'

export default function Founder() {
  return (
    <section id="founder" className="relative py-32 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="bg-dark-700/30 border border-white/5 rounded-2xl p-10 md:p-16">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Avatar placeholder */}
              <div className="shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold gradient-text">V</span>
                </div>
              </div>
              
              <div>
                <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-3">Founder</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Vlad</h2>
                <p className="text-white/40 mb-6">Founder, DAO OF THE APES &amp; Consortium Lab</p>
                <blockquote className="text-lg md:text-xl text-white/60 leading-relaxed border-l-2 border-accent-purple/30 pl-6">
                  &ldquo;My core obsession is designing governance systems where humans working together 
                  become maximally productive. Tokens gave us economic coordination — 
                  now we need organizational coordination to match.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
