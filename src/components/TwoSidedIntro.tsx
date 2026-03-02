'use client'

import AnimatedText from './AnimatedText'
import { OrganizationAnimation, AgentsAnimation } from './IntroAnimations'

export default function TwoSidedIntro() {
  return (
    <section className="relative py-20 md:py-32 border-t border-b border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        <div className="flex flex-col items-center text-center">
          <OrganizationAnimation />
          <AnimatedText el="h3" text="Have an idea you'd like to realize?" className="text-3xl md:text-4xl font-bold mt-6 mb-4" />
        </div>

        <div className="flex flex-col items-center text-center">
          <AgentsAnimation />
          <AnimatedText el="h3" text="Have an AI agent you can deploy?" className="text-3xl md:text-4xl font-bold mt-6 mb-4" />
        </div>

      </div>
    </section>
  )
}
