'use client'

export default function Team() {
  return (
    <section id="architecture" className="relative py-24 md:py-32 overflow-hidden">
      <style jsx>{`
        @keyframes flow-dash {
          from { stroke-dashoffset: 30; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes halo-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.16); }
        }
        .mvp-link {
          stroke-dasharray: 6 6;
          animation: flow-dash 2.6s linear infinite;
        }
        .mvp-node {
          animation: node-pulse 2.6s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        .mvp-halo {
          animation: halo-pulse 2.6s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
      `}</style>

      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-accent-purple/10 rounded-full blur-[120px]" />
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-accent-cyan/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-accent-cyan text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-center">MVP architecture</p>
        <h2 className="text-3xl md:text-5xl font-bold text-center tracking-tight mb-4">From mission to machine execution.</h2>
        <p className="text-white/60 text-center max-w-3xl mx-auto mb-12">
          The landing MVP combines intent capture, autonomous coordination, and protocol-native execution rails into one composable operating system.
        </p>

        <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-7 lg:gap-9 items-stretch">
          <article className="glass-panel surface-shadow rounded-2xl p-6 md:p-7">
            <h3 className="text-xl font-semibold mb-5">Core architecture layers</h3>
            <div className="space-y-3.5">
              {[
                {
                  layer: 'Layer 1 · Intent',
                  title: 'Human mission + Vision Agent',
                  desc: 'Operators define goals, constraints, and spending policy; Vision Agent continuously translates intent.',
                  accent: 'rgba(79,125,245,0.7)',
                },
                {
                  layer: 'Layer 2 · Coordination',
                  title: 'Genesis Squad (CEO / COO / CFO / Comms)',
                  desc: 'AR Agent recruits, Treasury Agent enforces budgets, Comms Agent handles external channels.',
                  accent: 'rgba(139,92,246,0.7)',
                },
                {
                  layer: 'Layer 3 · Protocol Execution',
                  title: 'ENS + XMTP + MCP + x402',
                  desc: 'Identity, agent-to-agent messaging, tool interoperability, and paid HTTP execution.',
                  accent: 'rgba(34,211,238,0.7)',
                },
              ].map((item) => (
                <div key={item.layer} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 relative overflow-hidden">
                  <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: item.accent }} />
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 mb-1">{item.layer}</p>
                  <h4 className="text-base font-semibold text-white/92 mb-1">{item.title}</h4>
                  <p className="text-sm text-white/58 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel surface-shadow rounded-2xl p-6 md:p-7 overflow-hidden">
            <h3 className="text-xl font-semibold mb-5">Live system map</h3>
            <div className="rounded-xl border border-white/10 bg-black/25 p-3">
              <svg className="w-full h-auto" viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="500" height="300" rx="18" stroke="rgba(255,255,255,0.08)" />

                <path className="mvp-link" d="M90 70H190M250 70H360M420 70V142M250 106V142M90 170H190M250 170H360M420 170V242M250 206V242" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />

                <circle className="mvp-halo" cx="90" cy="70" r="20" fill="rgba(79,125,245,0.2)" />
                <circle className="mvp-node" cx="90" cy="70" r="10" fill="#4f7df5" />
                <text x="58" y="98" fill="rgba(255,255,255,0.75)" fontSize="12">Mission</text>

                <circle className="mvp-halo" cx="250" cy="70" r="20" fill="rgba(139,92,246,0.22)" />
                <circle className="mvp-node" cx="250" cy="70" r="10" fill="#8b5cf6" />
                <text x="214" y="98" fill="rgba(255,255,255,0.75)" fontSize="12">Vision Agent</text>

                <circle className="mvp-halo" cx="420" cy="70" r="20" fill="rgba(34,211,238,0.22)" />
                <circle className="mvp-node" cx="420" cy="70" r="10" fill="#22d3ee" />
                <text x="390" y="98" fill="rgba(255,255,255,0.75)" fontSize="12">AR Agent</text>

                <circle className="mvp-halo" cx="250" cy="170" r="20" fill="rgba(79,125,245,0.2)" />
                <circle className="mvp-node" cx="250" cy="170" r="10" fill="#4f7df5" />
                <text x="208" y="198" fill="rgba(255,255,255,0.75)" fontSize="12">Treasury Agent</text>

                <circle className="mvp-halo" cx="420" cy="170" r="20" fill="rgba(139,92,246,0.22)" />
                <circle className="mvp-node" cx="420" cy="170" r="10" fill="#8b5cf6" />
                <text x="387" y="198" fill="rgba(255,255,255,0.75)" fontSize="12">Comms Agent</text>

                <rect x="52" y="242" width="86" height="36" rx="9" fill="rgba(79,125,245,0.14)" stroke="rgba(79,125,245,0.55)" />
                <text x="79" y="264" fill="rgba(255,255,255,0.86)" fontSize="13">ENS</text>
                <rect x="162" y="242" width="86" height="36" rx="9" fill="rgba(139,92,246,0.14)" stroke="rgba(139,92,246,0.55)" />
                <text x="184" y="264" fill="rgba(255,255,255,0.86)" fontSize="13">XMTP</text>
                <rect x="272" y="242" width="86" height="36" rx="9" fill="rgba(34,211,238,0.14)" stroke="rgba(34,211,238,0.55)" />
                <text x="298" y="264" fill="rgba(255,255,255,0.86)" fontSize="13">MCP</text>
                <rect x="382" y="242" width="86" height="36" rx="9" fill="rgba(212,168,71,0.14)" stroke="rgba(212,168,71,0.55)" />
                <text x="406" y="264" fill="rgba(255,255,255,0.86)" fontSize="13">x402</text>
              </svg>
            </div>
            <p className="text-xs text-white/48 mt-4 leading-relaxed">
              Derived from the MVP architecture flow: mission intake, Vision Agent orchestration, Genesis Squad coordination, and protocol-native execution rails.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
