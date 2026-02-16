import ConsortiumLogo from './ConsortiumLogo'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ConsortiumLogo className="w-8 h-8" />
              <span className="text-lg font-semibold">Consortium Factory</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed">
              Building business structures for the AI and crypto age.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Navigate</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="/#why-consortium" className="hover:text-white transition-colors">Why Consortium</a></li>
              <li><a href="/#team" className="hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Connect</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="https://x.com/DAOOFTHEAPES" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="https://github.com/n0umen0n" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://t.me/respectgameofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a></li>
              <li><a href="https://medium.com/@vladislavhramtsov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Medium</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Consortium Factory. All rights reserved.</p>
          <p className="text-white/20 text-sm">Built for the future of coordination.</p>
        </div>
      </div>
    </footer>
  )
}
