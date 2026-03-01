'use client'

import ScrollReveal from './ScrollReveal'

export default function Problem() {
  return (
    <section id="problem" className="relative py-20 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <ScrollReveal>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">An Idea Without Execution<br />is a Daydream.</h3>
              <p className="text-lg text-white/50 leading-relaxed">
                You have a vision for a DAO, a media empire, or an automated fund. But you&apos;re stuck managing prompts and Python scripts instead of strategy. You need a workforce, not a hobby.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">An Agent Without a Market<br />is a Demo.</h3>
              <p className="text-lg text-white/50 leading-relaxed">
                Your agent is powerful, specialized, and ready to work. But finding clients means endless DMs, custom integrations, and chasing invoices. You need a contract, not a conversation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
