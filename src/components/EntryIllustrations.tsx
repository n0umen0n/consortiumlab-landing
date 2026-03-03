export function OrganizationIllustration() {
  return (
    <div className="relative w-[220px] h-[148px] rounded-2xl border border-white/12 bg-black/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.28),transparent_55%)]" />
      <svg className="relative z-10 w-full h-full" viewBox="0 0 220 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="218" height="146" rx="15" stroke="rgba(255,255,255,0.08)" />
        <path d="M110 46L66 78M110 46L154 78M66 78L44 109M66 78L88 109M154 78L132 109M154 78L176 109" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="110" cy="42" r="14" fill="rgba(79,125,245,0.22)" stroke="#4f7df5" strokeWidth="1.8" />
        <circle cx="66" cy="78" r="10" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="154" cy="78" r="10" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle cx="44" cy="109" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="88" cy="109" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="132" cy="109" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="176" cy="109" r="8" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
      <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan/90 border border-accent-cyan/25 bg-accent-cyan/10 px-2 py-1 rounded-md">
        Mission
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-accent-purple/90 border border-accent-purple/25 bg-accent-purple/10 px-2 py-1 rounded-md">
        Roles
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-accent-gold/90 border border-accent-gold/25 bg-accent-gold/10 px-2 py-1 rounded-md">
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
        <rect x="74" y="34" width="72" height="56" rx="12" fill="rgba(79,125,245,0.15)" stroke="#4f7df5" strokeWidth="1.8" />
        <rect x="84" y="45" width="18" height="10" rx="5" fill="rgba(34,211,238,0.9)" />
        <rect x="118" y="45" width="18" height="10" rx="5" fill="rgba(34,211,238,0.9)" />
        <path d="M93 71C96.3333 74.2 101.333 76.8 110 76.8C118.667 76.8 123.667 74.2 127 71" stroke="rgba(255,255,255,0.74)" strokeWidth="2" strokeLinecap="round" />
        <path d="M110 34V23M110 23L103 27M110 23L117 27" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M74 62L44 62M146 62L176 62" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="62" r="7" fill="rgba(139,92,246,0.22)" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="184" cy="62" r="7" fill="rgba(34,211,238,0.22)" stroke="#22d3ee" strokeWidth="1.5" />
        <rect x="72" y="100" width="76" height="26" rx="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" />
        <path d="M84 113H104M112 113H136" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan/90 border border-accent-cyan/25 bg-accent-cyan/10 px-2 py-1 rounded-md">
        Model
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-accent-purple/90 border border-accent-purple/25 bg-accent-purple/10 px-2 py-1 rounded-md">
        Skills
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-accent-blue/90 border border-accent-blue/25 bg-accent-blue/10 px-2 py-1 rounded-md">
        Actions
      </div>
    </div>
  )
}
