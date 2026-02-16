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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-dark-900/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <ConsortiumLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-lg font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-[#4f7df5] via-[#8b5cf6] to-[#d4a847] bg-clip-text text-transparent">Consortium</span>
            {' '}
            <span className="text-white/90">Factory</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 text-sm">
          <a href="/#why-consortium" className="px-4 py-2 rounded-full text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200">
            What is Consortium?
          </a>
          <a href="/#team" className="px-4 py-2 rounded-full text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200">
            Team
          </a>
        </div>

        <a href="#contact" className="hidden md:block text-sm px-5 py-2 rounded-full bg-gradient-to-r from-[#4f7df5]/10 via-[#8b5cf6]/10 to-[#d4a847]/10 border border-[#8b5cf6]/20 text-white/80 hover:border-[#8b5cf6]/40 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300">
          Get in Touch
        </a>
      </div>
    </nav>
  )
}
