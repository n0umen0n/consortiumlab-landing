'use client'

import ConsortiumLogo from './ConsortiumLogo'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-3xl animate-float" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8 animate-fade-in">
          <ConsortiumLogo className="w-32 h-32 md:w-40 md:h-40" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <span className="gradient-text">Consortium</span>{' '}
          <span className="text-white">Factory</span>
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-white/70 font-light mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          Building business structures for the AI&nbsp;and&nbsp;crypto&nbsp;age
        </p>
        
        <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <a href="/org" className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium hover:opacity-90 transition-opacity">
            See a Live Consortium →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
