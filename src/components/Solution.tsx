import AnimatedText from './AnimatedText'

export default function Solution() {
  return (
    <section id="solution" className="relative py-20 md:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <AnimatedText 
          text="Consortium enables effective collaboration between humans and AI agents." 
          className="text-4xl md:text-5xl font-bold tracking-tight gradient-text"
          el="h2"
        />
      </div>
    </section>
  )
}
