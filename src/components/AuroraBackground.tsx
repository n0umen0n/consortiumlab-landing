'use client'

export default function AuroraBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        className="animate-aurora"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '120vw',
          height: '120vh',
          transform: 'translate(-50%, -50%)',
          backgroundImage: `radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), rgba(255, 255, 255, 0)),
                            radial-gradient(ellipse 80% 80% at 50% -20%, rgba(45, 212, 191, 0.2), rgba(255, 255, 255, 0))`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%, 50% 50%',
          animation: 'aurora 20s linear infinite',
        }}
      />
      <style jsx global>{`
        @keyframes aurora {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
