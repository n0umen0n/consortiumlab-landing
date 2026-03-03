export function OrganizationIllustration() {
  return (
    <div className="entry-illustration org-illustration relative w-[220px] h-[148px] rounded-2xl border border-white/12 bg-black/30 overflow-hidden transition-all duration-300 group-hover:border-white/24 group-hover:bg-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.28),transparent_55%)]" />
      <svg className="org-graph relative z-10 w-full h-full" viewBox="0 0 220 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="218" height="146" rx="15" stroke="rgba(255,255,255,0.08)" />
        <path d="M110 58L68 90M110 58L152 90M68 90L50 120M68 90L86 120M152 90L134 120M152 90L170 120" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
        <circle className="org-node-core" cx="110" cy="58" r="12" fill="rgba(79,125,245,0.22)" stroke="#4f7df5" strokeWidth="1.8" />
        <circle className="org-node-left" cx="68" cy="90" r="9.5" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle className="org-node-right" cx="152" cy="90" r="9.5" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.8" />
        <circle className="org-leaf-1" cx="50" cy="120" r="7.5" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle className="org-leaf-2" cx="86" cy="120" r="7.5" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle className="org-leaf-3" cx="134" cy="120" r="7.5" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
        <circle className="org-leaf-4" cx="170" cy="120" r="7.5" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
      <div className="absolute z-20 top-3 left-3 right-3 grid grid-cols-3 gap-1">
        <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-accent-cyan/90 border border-accent-cyan/25 bg-accent-cyan/10 px-1.5 py-1 rounded-md">
          Mission
        </span>
        <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-accent-gold/90 border border-accent-gold/25 bg-accent-gold/10 px-1.5 py-1 rounded-md">
          Treasury
        </span>
        <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-accent-purple/90 border border-accent-purple/25 bg-accent-purple/10 px-1.5 py-1 rounded-md">
          Roles
        </span>
      </div>
    </div>
  )
}

export function AgentIllustration() {
  return (
    <div className="entry-illustration agent-illustration relative w-[220px] h-[148px] rounded-2xl border border-white/12 bg-black/30 overflow-hidden transition-all duration-300 group-hover:border-white/24 group-hover:bg-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(79,125,245,0.3),transparent_58%)]" />
      <svg className="relative z-10 w-full h-full" viewBox="0 0 220 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="218" height="146" rx="15" stroke="rgba(255,255,255,0.08)" />
        <circle className="agent-pulse" cx="110" cy="76" r="30" fill="rgba(79,125,245,0.1)" />
        <rect className="agent-head" x="68" y="42" width="84" height="58" rx="8" fill="rgba(79,125,245,0.13)" stroke="#4f7df5" strokeWidth="1.8" />
        <rect x="68" y="42" width="84" height="12" rx="8" fill="rgba(255,255,255,0.05)" />
        <rect className="agent-scan" x="74" y="56" width="72" height="2" rx="1" fill="rgba(34,211,238,0.75)" opacity="0" />
        <rect className="agent-eye-left" x="84" y="64" width="16" height="6" rx="1.8" fill="#22d3ee" />
        <rect className="agent-eye-right" x="120" y="64" width="16" height="6" rx="1.8" fill="#22d3ee" />
        <path className="agent-mouth" d="M90 82H130" stroke="rgba(255,255,255,0.64)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M110 42V28M110 28L103.5 32.5M110 28L116.5 32.5" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M68 71H54M152 71H166" stroke="rgba(255,255,255,0.24)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="48" cy="71" r="6.5" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="172" cy="71" r="6.5" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1.5" />
        <rect x="64" y="106" width="92" height="24" rx="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" />
        <path d="M78 116H142M78 122H122" stroke="rgba(255,255,255,0.62)" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <div className="absolute z-20 top-3 left-3 right-3 grid grid-cols-3 gap-1">
        <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-accent-cyan/90 border border-accent-cyan/25 bg-accent-cyan/10 px-1.5 py-1 rounded-md">
          Model
        </span>
        <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-accent-blue/90 border border-accent-blue/25 bg-accent-blue/10 px-1.5 py-1 rounded-md">
          Runtime
        </span>
        <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-accent-purple/90 border border-accent-purple/25 bg-accent-purple/10 px-1.5 py-1 rounded-md">
          Skills
        </span>
      </div>
    </div>
  )
}
