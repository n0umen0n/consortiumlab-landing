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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: '1440px',
          padding: '16px 40px',
          height: '80px',
          fontFamily: 'Manrope, sans-serif',
        }}
      >
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-12 md:gap-20">
          <a href="/" className="flex items-center gap-3 group">
            <ConsortiumLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-[#4f7df5] via-[#8b5cf6] to-[#d4a847] bg-clip-text text-transparent">
                Consortium
              </span>{' '}
              <span className="text-white/90">Factory</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', href: '/' },
              { label: 'What is Consortium?', href: '/#why-consortium' },
              { label: 'Team', href: '/#team' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                style={{ lineHeight: '22px' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://x.com/ConsortiumDAC"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#171717] transition-all duration-200 hover:bg-white/90"
            style={{
              background: 'white',
              border: '1px solid #d4d4d4',
            }}
          >
            Follow Us
          </a>
          <a
            href="/org"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#fafafa] transition-all duration-200 hover:brightness-110"
            style={{
              background: '#7b39fc',
              boxShadow: '0px 4px 16px rgba(123, 57, 252, 0.2)',
            }}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
