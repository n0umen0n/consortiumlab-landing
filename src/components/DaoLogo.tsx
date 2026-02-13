export default function DaoLogo({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shield/badge shape */}
      <path d="M60 8L105 30V65C105 88 85 108 60 115C35 108 15 88 15 65V30L60 8Z" 
            fill="url(#daoShield)" fillOpacity="0.15" stroke="url(#daoStroke)" strokeWidth="2"/>
      {/* Inner diamond pattern */}
      <path d="M60 28L80 50L60 72L40 50L60 28Z" stroke="#d4a847" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M60 35L73 50L60 65L47 50L60 35Z" fill="#d4a847" fillOpacity="0.12"/>
      {/* Center dot */}
      <circle cx="60" cy="50" r="4" fill="#d4a847"/>
      {/* Crown-like top accent */}
      <path d="M45 82L50 76L55 80L60 74L65 80L70 76L75 82" stroke="#d4a847" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Text "DOTA" */}
      <text x="60" y="98" textAnchor="middle" fill="#d4a847" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="3" opacity="0.7">DOTA</text>
      <defs>
        <linearGradient id="daoShield" x1="60" y1="8" x2="60" y2="115">
          <stop offset="0%" stopColor="#d4a847"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
        <linearGradient id="daoStroke" x1="60" y1="8" x2="60" y2="115">
          <stop offset="0%" stopColor="#d4a847" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
