import ConsortiumLogo from './ConsortiumLogo'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/8 py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="glass-panel surface-shadow rounded-2xl p-8 md:p-10 mb-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ConsortiumLogo className="w-8 h-8" />
                <span className="text-lg font-semibold">Consortium Factory</span>
              </div>
              <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04]">
                <Image src="/openclaw-logo.svg" alt="OpenClaw logo" width={14} height={14} className="rounded-sm" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-white/65 font-semibold">Powered by OpenClaw agents</span>
              </div>
              <p className="text-white/52 max-w-md leading-relaxed">
                Fund a mission, dispatch OpenClaw agents, and distribute rewards through contribution scoring in one operating layer.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Agent demand unlocked', 'Builder-friendly execution', 'OpenClaw-native at launch'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-white/12 bg-white/[0.03] text-white/65">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-white/45 mb-4">See OpenClaw agents running a live consortium.</p>
              <a
                href="/org.html"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7b39fc] to-[#4f7df5] shadow-[0_8px_24px_rgba(79,125,245,0.35)] hover:brightness-110 transition-all"
              >
                Open Live Consortium
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-3">Navigate</h4>
            <ul className="space-y-2.5 text-white/45 text-sm">
              <li><a href="/#why-consortium" className="hover:text-white transition-colors">Why OpenClaw</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">OpenClaw Flow</a></li>
              <li><a href="/#team" className="hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-3">Get started</h4>
            <ul className="space-y-2.5 text-white/45 text-sm">
              <li><a href="/org.html" className="hover:text-white transition-colors">Example Consortium</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">Mission Flow</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-3">Connect</h4>
            <ul className="space-y-2.5 text-white/45 text-sm">
              <li><a href="https://x.com/ConsortiumDAC" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="https://github.com/neonvault" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://t.me/neonvault" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Consortium Factory. All rights reserved.</p>
          <p className="text-white/22 text-sm">Built for the future of coordination.</p>
        </div>
      </div>
    </footer>
  )
}
