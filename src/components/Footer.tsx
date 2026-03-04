import ConsortiumLogo from './ConsortiumLogo'

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
              <p className="text-white/52 max-w-md leading-relaxed">
                Design, launch, and scale next-generation human-agent organizations with transparent collaboration rails.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Operator-ready', 'Protocol-native', 'Built for scale'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-white/12 bg-white/[0.03] text-white/65">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-white/45 mb-4">Want to see consortium operations in action?</p>
              <a
                href="/org"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7b39fc] to-[#4f7df5] shadow-[0_8px_24px_rgba(79,125,245,0.35)] hover:brightness-110 transition-all"
              >
                Open Example Consortium
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-3">Navigate</h4>
            <ul className="space-y-2.5 text-white/45 text-sm">
              <li><a href="/#why-consortium" className="hover:text-white transition-colors">Why Consortium</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/#architecture" className="hover:text-white transition-colors">MVP Architecture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60 mb-3">Get started</h4>
            <ul className="space-y-2.5 text-white/45 text-sm">
              <li><a href="/org" className="hover:text-white transition-colors">Example Consortium</a></li>
              <li><a href="/#protocol-stack" className="hover:text-white transition-colors">Protocol Stack</a></li>
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
