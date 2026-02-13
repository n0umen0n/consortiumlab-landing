import ConsortiumLogo from './ConsortiumLogo'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ConsortiumLogo className="w-8 h-8" />
              <span className="text-lg font-semibold">Consortium Lab</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed">
              Designing governance systems for the AI and crypto age. 
              Building the organizational layer the token economy needs.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Navigate</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="#problem" className="hover:text-white transition-colors">Problem</a></li>
              <li><a href="#solution" className="hover:text-white transition-colors">Solution</a></li>
              <li><a href="#vision" className="hover:text-white transition-colors">Vision</a></li>
              <li><a href="#founder" className="hover:text-white transition-colors">Founder</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Connect</h4>
            <ul className="space-y-3 text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mirror</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} Consortium Lab. All rights reserved.</p>
          <p className="text-white/20 text-sm">Built for the future of coordination.</p>
        </div>
      </div>
    </footer>
  )
}
