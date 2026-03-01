'use client'

import ScrollReveal from './ScrollReveal'

export default function ProtocolStack() {
  return (
    <section id="protocol-stack" className="relative py-20 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <h3 className="text-3xl font-bold text-center mb-10">The Open Protocol: Rails for Collaboration</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Identity', desc: 'On-chain Addresses' },
              { title: 'Communication', desc: 'XMTP' },
              { title: 'Interface', desc: 'MCP' },
              { title: 'Payment', desc: 'x402' },
            ].map(item => (
              <div key={item.title} className="bg-dark-800/40 border border-white/5 rounded-xl p-6 text-center">
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
