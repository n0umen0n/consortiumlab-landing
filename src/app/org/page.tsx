"use client"

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ───────────────────────── Data ───────────────────────── */

interface Agent {
  name: string
  task: string
  active: boolean
  lastRan?: string
}

interface Contributor {
  name: string
  initials: string
  role: string
  respect: number
  color: string
  agents: Agent[]
}

const contributors: Contributor[] = [
  {
    name: 'Zara Okafor', initials: 'ZO', role: 'Protocol Architect', respect: 1_243, color: 'from-accent-blue to-accent-purple',
    agents: [
      { name: 'Nexus', task: 'Yield optimization across 4 chains', active: true },
      { name: 'Sentinel', task: 'Protocol health monitoring', active: true },
      { name: 'Archivist', task: 'Governance proposal drafting', active: false, lastRan: '2h ago' },
    ],
  },
  {
    name: 'Luca Ferrante', initials: 'LF', role: 'Vault Strategist', respect: 1_087, color: 'from-accent-purple to-accent-gold',
    agents: [
      { name: 'Phantom', task: 'Risk engine & liquidation guard', active: true },
      { name: 'Specter', task: 'Volatility surface modeling', active: false, lastRan: '14m ago' },
    ],
  },
  {
    name: 'Mika Tanaka', initials: 'MT', role: 'Smart Contract Lead', respect: 948, color: 'from-accent-gold to-accent-cyan',
    agents: [
      { name: 'Drift', task: 'Delta-neutral rebalancer', active: true },
    ],
  },
  {
    name: 'Ren Castillo', initials: 'RC', role: 'Community & Governance', respect: 812, color: 'from-accent-cyan to-accent-blue',
    agents: [
      { name: 'Echo', task: 'Forum curation & sentiment analysis', active: false, lastRan: '45m ago' },
      { name: 'Pulse', task: 'Discord community engagement', active: true },
      { name: 'Chronicle', task: 'Weekly digest generation', active: false, lastRan: '3d ago' },
    ],
  },
]

const treasuryTokens = [
  { symbol: 'ETH',   amount: '1,420.5',    usd: '$3,834,150',   pct: 38.2, color: 'text-accent-purple' },
  { symbol: 'USDC',  amount: '2,150,000',   usd: '$2,150,000',   pct: 21.4, color: 'text-emerald-400' },
  { symbol: 'NEON',  amount: '8,500,000',   usd: '$1,785,000',   pct: 17.8, color: 'text-accent-cyan' },
  { symbol: 'ARB',   amount: '1,200,000',   usd: '$1,044,000',   pct: 10.4, color: 'text-accent-blue' },
  { symbol: 'stETH', amount: '285.3',       usd: '$770,175',     pct: 7.7,  color: 'text-accent-gold' },
  { symbol: 'DAI',   amount: '450,000',     usd: '$450,000',     pct: 4.5,  color: 'text-yellow-400' },
]

const totalTreasuryUsd = '$10,033,325'

interface SignalComment {
  author: string
  text: string
  tokenVotes: number
  voters: number
}

interface Signal {
  id: number
  title: string
  summary: string
  author: string
  tokenVotes: number
  voters: number
  tag: string
  tagColor: string
  comments: SignalComment[]
}

const signals: Signal[] = [
  {
    id: 1,
    title: 'Deploy cross-chain vault on Base',
    summary: 'Expand NeonVault strategies to Base L2 to capture growing TVL and reduce gas costs for smaller depositors.',
    author: 'Zara Okafor',
    tokenVotes: 2_340_000,
    voters: 187,
    tag: 'Strategy',
    tagColor: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
    comments: [
      { author: 'Luca F.', text: 'Base fees are 10x cheaper — this would unlock sub-$500 deposits profitably.', tokenVotes: 890_000, voters: 62 },
      { author: 'Mika T.', text: 'Auditing the bridge adapter will take ~3 weeks. Worth it.', tokenVotes: 410_000, voters: 38 },
      { author: 'Ren C.', text: 'Community sentiment is very positive — 84% approval in the temp check.', tokenVotes: 245_000, voters: 41 },
    ],
  },
  {
    id: 2,
    title: 'Increase NEON staking rewards to 12% APY',
    summary: 'Boost staking incentives for the next quarter to attract long-term holders and reduce circulating supply.',
    author: 'Aisha Mensah',
    tokenVotes: 1_870_000,
    voters: 154,
    tag: 'Tokenomics',
    tagColor: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    comments: [
      { author: 'Zara O.', text: 'Sustainable only if we cap it at 90 days. Perpetual 12% would drain reserves.', tokenVotes: 720_000, voters: 55 },
      { author: 'Aisha M.', text: 'Agreed — proposing a tiered decay: 12% → 9% → 6% over three quarters.', tokenVotes: 530_000, voters: 48 },
    ],
  },
  {
    id: 3,
    title: 'Integrate AI rebalancing agent for delta-neutral vaults',
    summary: 'Let the Drift agent autonomously rebalance hedged positions using real-time volatility feeds.',
    author: 'Mika Tanaka',
    tokenVotes: 1_560_000,
    voters: 132,
    tag: 'Engineering',
    tagColor: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    comments: [
      { author: 'Luca F.', text: 'Backtested across 6 months of ETH data — 23% improvement in capital efficiency.', tokenVotes: 680_000, voters: 47 },
      { author: 'Ren C.', text: 'Need a kill-switch governance vote mechanism if the agent deviates >5%.', tokenVotes: 390_000, voters: 52 },
      { author: 'Mika T.', text: 'Kill-switch is already in the spec. 3-of-5 multisig can pause within one block.', tokenVotes: 310_000, voters: 29 },
    ],
  },
  {
    id: 4,
    title: 'Launch grants program for ecosystem tooling',
    summary: 'Allocate 200,000 NEON from treasury to fund dashboards, analytics, and integration tooling built by the community.',
    author: 'Ren Castillo',
    tokenVotes: 1_120_000,
    voters: 98,
    tag: 'Community',
    tagColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    comments: [
      { author: 'Aisha M.', text: 'Should require milestone-based disbursement — not lump sum.', tokenVotes: 410_000, voters: 34 },
    ],
  },
]

const tokenHolders = [
  { address: '0x7a3F...8b2E', tokens: '1,250,000', pct: 14.7 },
  { address: '0x1cD4...3f9A', tokens: '980,000', pct: 11.5 },
  { address: '0xeB72...a1C5', tokens: '875,000', pct: 10.3 },
  { address: '0x3dA8...7e6F', tokens: '620,000', pct: 7.3 },
  { address: '0x9fE1...c4B3', tokens: '540,000', pct: 6.4 },
  { address: '0x5bC6...d2A8', tokens: '410,000', pct: 4.8 },
]

/* ───────────────────────── Helpers ───────────────────────── */

function formatVotes(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return n.toString()
}

/* ───────────────────────── Components ───────────────────────── */

function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-accent-purple/60 text-sm">{icon}</span>
      <h2 className="text-2xl font-bold text-white/90">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  )
}

function SignalCard({ signal }: { signal: Signal }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-white/5 bg-dark-800/60 backdrop-blur overflow-hidden transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-6 py-5 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${signal.tagColor}`}>
                {signal.tag}
              </span>
              <span className="text-xs text-white/30">by {signal.author}</span>
            </div>
            <h3 className="text-[15px] font-semibold text-white/90 mb-1">{signal.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{signal.summary}</p>
          </div>
          <div className="shrink-0 text-right pl-4">
            <div className="text-lg font-bold tabular-nums text-accent-cyan">{formatVotes(signal.tokenVotes)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">NEON voted</div>
            <div className="text-xs text-white/40 mt-1">{signal.voters} voters</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple"
              style={{ width: `${Math.min((signal.tokenVotes / 2_500_000) * 100, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-white/25 shrink-0">
            {signal.comments.length} comment{signal.comments.length !== 1 ? 's' : ''}
            <span className="ml-2">{expanded ? '▲' : '▼'}</span>
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-6 py-4 space-y-3 bg-dark-900/30">
          {signal.comments
            .sort((a, b) => b.tokenVotes - a.tokenVotes)
            .map((c, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="shrink-0 mt-0.5 w-1 h-1 rounded-full bg-accent-purple/40" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-white/70">{c.author}</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-accent-cyan/70 font-mono">{formatVotes(c.tokenVotes)} NEON</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/25">{c.voters} voters</span>
                  </div>
                  <p className="text-sm text-white/50 mt-0.5 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── Page ───────────────────────── */

export default function OrgPage() {
  const [showHolders, setShowHolders] = useState(false)

  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <Navbar />

      {/* Org Header */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">NeonVault</span>
          </h1>
          <p className="text-sm text-accent-cyan/60 uppercase tracking-[0.3em] mb-6 font-medium">CONSORTIUM</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-4">
            <div className="rounded-2xl border border-accent-cyan/10 bg-accent-cyan/[0.03] backdrop-blur px-6 py-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent-cyan text-lg">◎</span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent-cyan">Mission</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Maximize yield for our community by building and operating automated vaults across chains — every strategy transparent, every parameter governed by token holders.
              </p>
            </div>
            <div className="rounded-2xl border border-accent-purple/10 bg-accent-purple/[0.03] backdrop-blur px-6 py-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent-purple text-lg">✦</span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent-purple">Vision</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                A future where decentralized collectives autonomously manage institutional-grade
                capital — transparently, permissionlessly, and at scale — making sophisticated
                DeFi strategies accessible to every token holder on every chain.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-5 mt-8">
            {[
              { name: 'X', href: 'https://x.com/neonvault', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              )},
              { name: 'YouTube', href: 'https://youtube.com/@neonvault', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              )},
              { name: 'Discord', href: 'https://discord.gg/neonvault', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              )},
              { name: 'Telegram', href: 'https://t.me/neonvault', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              )},
              { name: 'GitHub', href: 'https://github.com/neonvault', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              )},
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/80 transition-colors duration-200"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-16 relative">
        <style jsx>{`
          @keyframes agent-pulse {
            0%, 100% { box-shadow: 0 0 8px 0 rgba(52, 211, 153, 0.3), inset 0 0 8px 0 rgba(52, 211, 153, 0.05); }
            50% { box-shadow: 0 0 20px 4px rgba(52, 211, 153, 0.5), inset 0 0 12px 0 rgba(52, 211, 153, 0.1); }
          }
          @keyframes border-spin {
            from { --angle: 0deg; }
            to { --angle: 360deg; }
          }
          @keyframes dot-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes agent-pulse-amber {
            0%, 100% { box-shadow: 0 0 8px 0 rgba(245, 158, 11, 0.3), inset 0 0 8px 0 rgba(245, 158, 11, 0.05); }
            50% { box-shadow: 0 0 20px 4px rgba(245, 158, 11, 0.5), inset 0 0 12px 0 rgba(245, 158, 11, 0.1); }
          }
          @keyframes dot-blink-amber {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          .agent-active {
            animation: agent-pulse 2.5s ease-in-out infinite;
            border-color: rgba(52, 211, 153, 0.3);
          }
          .agent-idle {
            animation: agent-pulse-amber 2.5s ease-in-out infinite;
            border-color: rgba(245, 158, 11, 0.3);
          }
          .dot-active {
            animation: dot-blink 1.5s ease-in-out infinite;
          }
          .dot-idle {
            animation: dot-blink-amber 1.5s ease-in-out infinite;
          }
        `}</style>
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading icon="★" label="Contributors" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contributors
              .sort((a, b) => b.respect - a.respect)
              .map((c, i) => {
                const activeCount = c.agents.filter(a => a.active).length
                return (
                  <div key={i} className="rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur p-6 hover:bg-dark-800/70 transition-all">
                    {/* Contributor header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-sm font-bold text-white/90 shrink-0`}>
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[15px] text-white/90">{c.name}</div>
                        <div className="text-xs text-white/40">{c.role}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono text-sm text-accent-gold">{c.respect}</div>
                        <div className="text-[10px] text-white/25 uppercase tracking-wider">respect</div>
                      </div>
                    </div>

                    {/* Agents */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase tracking-wider text-white/25">Agents</span>
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[10px] text-emerald-400/70">{activeCount} active</span>
                      </div>
                      {c.agents.map((agent, j) => (
                        <div
                          key={j}
                          className={`rounded-xl border px-4 py-3 transition-all ${
                            agent.active
                              ? 'agent-active bg-emerald-400/[0.03] border-emerald-400/20'
                              : 'agent-idle bg-amber-500/[0.03] border-amber-500/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <div className={`w-2 h-2 rounded-full ${agent.active ? 'bg-emerald-400 dot-active' : 'bg-amber-400 dot-idle'}`} />
                              {agent.active && (
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400/40 animate-ping" />
                              )}
                              {!agent.active && (
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400/40 animate-ping" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${agent.active ? 'text-white/90' : 'text-white/85'}`}>
                                  {agent.name}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  agent.active
                                    ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {agent.active ? 'RUNNING' : 'IDLE'}
                                </span>
                              </div>
                              <div className={`text-xs mt-0.5 ${agent.active ? 'text-white/50' : 'text-white/45'}`}>
                                {agent.task}
                              </div>
                              {!agent.active && agent.lastRan && (
                                <div className="text-[10px] text-amber-400/60 mt-0.5">Last ran {agent.lastRan}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>

      {/* Treasury — Multi-Token */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading icon="⬡" label="Treasury" />
          <div className="rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur p-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
              <div>
                <div className="text-sm text-white/30 uppercase tracking-wider mb-1">Total Value</div>
                <div className="text-4xl md:text-5xl font-bold tabular-nums">
                  <span className="gradient-text">{totalTreasuryUsd}</span>
                </div>
              </div>
              <div className="text-white/30 text-sm pb-2">across 6 tokens · 4 chains</div>
            </div>

            {/* Bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-8 gap-0.5">
              {treasuryTokens.map((t, i) => {
                const barColors = ['bg-accent-purple', 'bg-emerald-400', 'bg-accent-cyan', 'bg-accent-blue', 'bg-accent-gold', 'bg-yellow-400']
                const isFirst = i === 0
                const isLast = i === treasuryTokens.length - 1
                return (
                  <div
                    key={i}
                    className={`${barColors[i]} ${isFirst ? 'rounded-l-full' : ''} ${isLast ? 'rounded-r-full' : ''}`}
                    style={{ width: `${t.pct}%` }}
                  />
                )
              })}
            </div>

            {/* Token Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
              {treasuryTokens.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`text-lg font-bold ${t.color} mt-0.5 w-12 shrink-0`}>{t.symbol}</div>
                  <div>
                    <div className="text-sm font-mono text-white/80">{t.amount}</div>
                    <div className="text-xs text-white/30">{t.usd} · {t.pct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signals */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading icon="◇" label="Signals" />
          <p className="text-sm text-white/30 -mt-4 mb-6">
            Community feedback ranked by token-weighted votes. Expand a signal to see discussion.
          </p>
          <div className="space-y-3">
            {signals.map((s) => (
              <SignalCard key={s.id} signal={s} />
            ))}
          </div>

          {/* Voter Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total NEON Voted', value: '6.9M', sub: 'across all signals' },
              { label: 'Unique Voters', value: '571', sub: 'token holders' },
              { label: 'Total Signals', value: '4', sub: 'open for voting' },
              { label: 'Avg Participation', value: '143', sub: 'voters per signal' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-dark-800/30 px-5 py-4">
                <div className="text-xs text-white/30 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-bold tabular-nums text-white/90">{stat.value}</div>
                <div className="text-[10px] text-white/20">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collapsible Token Holders */}
      <section className="py-8 pb-28 relative">
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => setShowHolders(!showHolders)}
            className="flex items-center gap-3 mb-6 group"
          >
            <span className="text-accent-purple/60 text-sm">◆</span>
            <h2 className="text-lg font-semibold text-white/50 group-hover:text-white/70 transition-colors">
              Token Holders
            </h2>
            <span className="text-xs text-white/25">{showHolders ? '▲ hide' : '▼ show'}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
          </button>

          {showHolders && (
            <div className="rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
                <span>Address</span>
                <span className="text-right">NEON</span>
                <span className="text-right w-16">Share</span>
              </div>
              {tokenHolders.map((h, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <span className="font-mono text-sm text-white/70">{h.address}</span>
                  <span className="text-sm text-white/90 text-right tabular-nums">{h.tokens}</span>
                  <span className="text-sm text-right w-16">
                    <span className="text-accent-cyan">{h.pct}%</span>
                  </span>
                </div>
              ))}
              <div className="px-6 py-3 text-xs text-white/25">
                Showing top 6 of 571 holders · 55.0% displayed
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
