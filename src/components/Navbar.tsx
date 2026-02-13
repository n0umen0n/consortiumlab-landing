'use client'

import { useState, useEffect } from 'react'
import ConsortiumLogo from './ConsortiumLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <ConsortiumLogo className="w-8 h-8 transition-transform group-hover:scale-110" />
          <span className="text-lg font-semibold tracking-tight">Consortium Lab</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#problem" className="hover:text-white transition-colors">Problem</a>
          <a href="#solution" className="hover:text-white transition-colors">Solution</a>
          <a href="#vision" className="hover:text-white transition-colors">Vision</a>
          <a href="#founder" className="hover:text-white transition-colors">Founder</a>
        </div>
        <a href="#contact" className="hidden md:block text-sm px-5 py-2 rounded-full border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10 transition-all">
          Get in Touch
        </a>
      </div>
    </nav>
  )
}
