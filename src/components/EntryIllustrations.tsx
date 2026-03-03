export function OrganizationIllustration() {
  return (
    <div className="relative w-[220px] h-[148px] rounded-2xl border border-white/12 bg-black/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.28),transparent_55%)]" />
      <svg className="relative z-10 w-full h-full" viewBox="0 0 220 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="218" height="146" rx="15" stroke="rgba(255,255,255,0.08)" />
        <path d="M110 46L66 80M110 46L154 80M66 80L50 113M66 80L90 113M154 80L130 113M154 80L170 113" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="110" cy="46" r="13" fill="rgba(79,125,245,0.22)" stroke="#4f7df5" strokeWidth="1.8" />
        <circle cx="66" cy="80" r="10" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="154" cy="80" r="10" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="50" cy="113" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="90" cy="113" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="130" cy="113" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="170" cy="113" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
      <div className="absolute z-20 top-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan/90 border border-accent-cyan/25 bg-accent-cyan/10 px-2 py-1 rounded-md">
        Mission
      </div>
      <div className="absolute z-20 top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-accent-purple/90 border border-accent-purple/25 bg-accent-purple/10 px-2 py-1 rounded-md">
        Roles
      </div>
      <div className="absolute z-20 top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wide text-accent-gold/90 border border-accent-gold/25 bg-accent-gold/10 px-2 py-1 rounded-md">
        Treasury
      </div>
    </div>
  )
}

export function AgentIllustration() {
  return (
    <div className="relative w-[220px] h-[148px] rounded-2xl border border-white/12 bg-black/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(79,125,245,0.3),transparent_58%)]" />
      <svg className="relative z-10 w-full h-full" viewBox="0 0 220 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="218" height="146" rx="15" stroke="rgba(255,255,255,0.08)" />
        <rect x="70" y="30" width="80" height="60" rx="9" fill="rgba(79,125,245,0.13)" stroke="#4f7df5" strokeWidth="1.8" />
        <rect x="84" y="44" width="14" height="9" rx="2.5" fill="#22d3ee" />
        <rect x="122" y="44" width="14" height="9" rx="2.5" fill="#22d3ee" />
        <path d="M92 68H128" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M110 30V18M110 18L103 22M110 18L117 22" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M70 60H52M150 60H168" stroke="rgba(255,255,255,0.26)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="46" cy="60" r="6.5" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="174" cy="60" r="6.5" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1.5" />
        <rect x="68" y="98" width="84" height="27" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" />
        <path d="M80 111H140M80 117H120" stroke="rgba(255,255,255,0.62)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M100 93V98M120 93V98" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <div className="absolute z-20 top-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan/90 border border-accent-cyan/25 bg-accent-cyan/10 px-2 py-1 rounded-md">
        Model
      </div>
      <div className="absolute z-20 top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-accent-purple/90 border border-accent-purple/25 bg-accent-purple/10 px-2 py-1 rounded-md">
        Skills
      </div>
      <div className="absolute z-20 bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-accent-blue/90 border border-accent-blue/25 bg-accent-blue/10 px-2 py-1 rounded-md">
        Runtime
      </div>
    </div>
  )
}
