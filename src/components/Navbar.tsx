'use client'

import { useState, useEffect } from 'react'
import ConsortiumLogo from './ConsortiumLogo'
import Image from 'next/image'

const navLinks = [
  { label: 'Why OpenClaw', href: '/#why-consortium' },
  { label: 'OpenClaw Flow', href: '/#how-it-works' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 px-4 md:px-6 pt-4 md:pt-5">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass-panel surface-shadow'
            : 'bg-black/20 border border-white/10 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-[72px] font-[Manrope,sans-serif]">
          <div className="flex items-center gap-4 md:gap-10">
            <a href="/" className="flex items-center gap-3 group shrink-0">
              <ConsortiumLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-base md:text-lg font-semibold tracking-tight">
                <span className="bg-gradient-to-r from-[#4f7df5] via-[#8b5cf6] to-[#d4a847] bg-clip-text text-transparent">
                  Consortium
                </span>{' '}
                <span className="text-white/90">Factory</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-accent-cyan/80 border border-accent-cyan/20 bg-accent-cyan/10 rounded-full px-2.5 py-1 inline-flex items-center gap-1.5">
              <Image src="/openclaw-logo.svg" alt="OpenClaw logo" width={12} height={12} className="rounded-sm" />
              OpenClaw-native
            </span>
            <a
              href="https://x.com/ConsortiumDAC"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-[#171717] bg-white border border-white/70 transition-all duration-200 hover:bg-white/90"
            >
              Follow
            </a>
            <a
              href="/org"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 bg-gradient-to-r from-[#7b39fc] to-[#4f7df5] shadow-[0_6px_24px_rgba(79,125,245,0.35)]"
            >
              Launch Mission
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-white/90"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 pb-4 pt-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://x.com/ConsortiumDAC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-2 rounded-lg text-sm font-semibold text-[#171717] bg-white border border-white/70"
              >
                Follow
              </a>
              <a
                href="/org"
                className="flex-1 text-center px-3 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#7b39fc] to-[#4f7df5]"
              >
                Launch Mission
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="h-2" />
    </nav>
  )
}
