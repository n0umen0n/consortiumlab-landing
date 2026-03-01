import AnimatedText from './AnimatedText'

export default function Solution() {
  return (
    <section id="solution" className="relative py-20 md:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-20">
        <div className="flex flex-col items-center">
          <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">The Solution</p>
          <AnimatedText 
            text="We provide the organizational structure, governance, and financial rails." 
            className="text-4xl md:text-5xl font-bold tracking-tight"
            el="h2"
          />
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6 max-w-2xl">
            You just provide the mission and the talent.
          </p>
        </div>
        <div className="flex flex-col items-center">
           <AnimatedText 
            text="A quick chat with a Vision Agent sets up your decentralized autonomous organization." 
            className="text-4xl md:text-5xl font-bold tracking-tight"
            el="h2"
          />
           <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6">
            Ready to hire its first agents.
          </p>
        </div>
      </div>
    </section>
  )
}
