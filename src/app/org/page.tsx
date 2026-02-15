import Navbar from '@/components/Navbar'
import ConsortiumLogo from '@/components/ConsortiumLogo'
import Footer from '@/components/Footer'

const tokenHolders = [
  { address: '0x7a3F...8b2E', tokens: '625,000', pct: 25.0 },
  { address: '0x1cD4...3f9A', tokens: '500,000', pct: 20.0 },
  { address: '0xeB72...a1C5', tokens: '375,000', pct: 15.0 },
  { address: '0x3dA8...7e6F', tokens: '250,000', pct: 10.0 },
  { address: '0x9fE1...c4B3', tokens: '187,500', pct: 7.5 },
  { address: '0x5bC6...d2A8', tokens: '125,000', pct: 5.0 },
]

const contributors = [
  { name: 'Alex Rivera', initials: 'AR', role: 'Protocol Architect', respect: 847, color: 'from-accent-blue to-accent-purple', agents: ['Atlas — Business Mentor'] },
  { name: 'Sam Chen', initials: 'SC', role: 'Governance Lead', respect: 723, color: 'from-accent-purple to-accent-gold', agents: ['Sentinel — Treasury Guard'] },
  { name: 'Jordan Lee', initials: 'JL', role: 'Smart Contract Dev', respect: 691, color: 'from-accent-gold to-accent-cyan', agents: ['Pulse — Market Analyst'] },
  { name: 'Maya Patel', initials: 'MP', role: 'Community Strategist', respect: 584, color: 'from-accent-cyan to-accent-blue', agents: ['Echo — Community Manager'] },
  { name: 'Kai Nakamura', initials: 'KN', role: 'Tokenomics Researcher', respect: 512, color: 'from-accent-blue to-accent-gold', agents: [] },
]

const treasury = [
  { label: 'Operations', amount: '750,000', pct: 30 },
  { label: 'Development Fund', amount: '625,000', pct: 25 },
  { label: 'Community Grants', amount: '500,000', pct: 20 },
  { label: 'Reserves', amount: '375,000', pct: 15 },
  { label: 'AI Agent Budget', amount: '250,000', pct: 10 },
]

export default function OrgPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <Navbar />

      {/* Org Header: Name → Logo → Description */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-purple/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Consortium Lab</span>
          </h1>
          <div className="flex justify-center mb-6">
            <ConsortiumLogo className="w-16 h-16" />
          </div>
          <p className="max-w-2xl mx-auto text-white/50 leading-relaxed text-base">
            A next-generation governance collective pioneering tools and frameworks
            that let communities, DAOs, and AI agents coordinate transparently. We build open-source
            protocols for token-weighted decision-making, respect-based contribution tracking,
            and autonomous treasury management.
          </p>
        </div>
      </section>

      {/* Contributors Table — sorted by highest respect, with agents */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading icon="★" label="Contributors" />
          <div className="rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-4 px-6 py-3 border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
              <span className="w-10"></span>
              <span>Contributor</span>
              <span className="text-right">Respect</span>
              <span>AI Agents</span>
            </div>
            {contributors
              .sort((a, b) => b.respect - a.respect)
              .map((c, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr_auto_1fr] gap-4 px-6 py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xs font-bold text-white/90 shrink-0`}>
                    {c.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white/90">{c.name}</div>
                    <div className="text-xs text-white/40">{c.role}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-accent-gold">{c.respect}</span>
                  </div>
                  <div>
                    {c.agents.length > 0 ? (
                      c.agents.map((agent, j) => (
                        <span key={j} className="inline-flex items-center gap-1.5 text-xs text-accent-cyan/80 bg-accent-cyan/5 border border-accent-cyan/10 rounded-full px-2.5 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {agent}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Treasury */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading icon="⬡" label="Treasury" />
          <div className="rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur p-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
              <div>
                <div className="text-sm text-white/30 uppercase tracking-wider mb-1">Total Balance</div>
                <div className="text-4xl md:text-5xl font-bold tabular-nums">
                  <span className="gradient-text">2,500,000</span>
                  <span className="text-lg text-white/40 ml-2">CLAB</span>
                </div>
              </div>
              <div className="text-white/30 text-sm pb-2">≈ $125,000 USD</div>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-0.5">
              <div className="bg-accent-blue rounded-l-full" style={{ width: '30%' }} />
              <div className="bg-accent-purple" style={{ width: '25%' }} />
              <div className="bg-accent-gold" style={{ width: '20%' }} />
              <div className="bg-accent-cyan" style={{ width: '15%' }} />
              <div className="bg-white/20 rounded-r-full" style={{ width: '10%' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {treasury.map((t, i) => {
                const colors = ['text-accent-blue', 'text-accent-purple', 'text-accent-gold', 'text-accent-cyan', 'text-white/40']
                return (
                  <div key={i}>
                    <div className="text-xs text-white/30 mb-1">{t.label}</div>
                    <div className={`text-sm font-mono ${colors[i]}`}>{t.amount}</div>
                    <div className="text-xs text-white/20">{t.pct}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Token Holders — bottom */}
      <section className="py-16 pb-28 relative">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading icon="◆" label="Token Holders" />
          <div className="rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
              <span>Address</span>
              <span className="text-right">CLAB</span>
              <span className="text-right w-16">Share</span>
            </div>
            {tokenHolders.map((h, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <span className="font-mono text-sm text-white/70">{h.address}</span>
                <span className="text-sm text-white/90 text-right tabular-nums">{h.tokens}</span>
                <span className="text-sm text-right w-16">
                  <span className="text-accent-blue">{h.pct}%</span>
                </span>
              </div>
            ))}
            <div className="px-6 py-3 text-xs text-white/25">
              Showing top 6 of 142 holders · 82.5% displayed
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-accent-purple/60 text-sm">{icon}</span>
      <h2 className="text-2xl font-bold text-white/90">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  )
}
