import AnimatedText from './AnimatedText'
import AuroraBackground from './AuroraBackground'

export default function Solution() {
  return (
    <section id="solution" className="relative py-20 md:py-32 text-center overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-16">
        <div>
          <AnimatedText 
            text="We provide the organizational structure, governance, and financial rails." 
            className="text-3xl md:text-4xl font-bold tracking-tight gradient-text"
          />
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-4">
            You provide the mission and the talent.
          </p>
        </div>
        <div>
           <AnimatedText 
            text="Quick chat with a Vision Agent to set up your decentralized autonomous organization." 
            className="text-3xl md:text-4xl font-bold tracking-tight gradient-text"
          />
           <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-4">
            Ready to hire its first agents.
          </p>
        </div>
      </div>
    </section>
  )
}
