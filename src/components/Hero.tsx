'use client'

import { useRef, useEffect, useState, useMemo } from 'react'

function StarField() {
  const stars = useMemo(() => {
    const s = []
    for (let i = 0; i < 150; i++) {
      let x, y
      // Keep generating until outside the planet zone (center ~50%, ~50%, radius ~25%)
      do {
        x = Math.random() * 100
        y = Math.random() * 100
      } while (
        Math.pow(x - 50, 2) / (38 * 38) + Math.pow(y - 48, 2) / (36 * 36) < 1
      )
      s.push({
        x,
        y,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.6,
      })
    }
    return s
  }, [])

  return (
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: 'white',
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255,255,255,0.8), 0 0 ${star.size * 6}px ${star.size * 2}px rgba(255,255,255,0.3)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setLoaded(true)}
        className="absolute object-cover"
        style={{
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          objectPosition: '52% center',
          zIndex: 0,
          opacity: 0.7,
          filter: 'contrast(1.3) brightness(1.15)',
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4"
          type="video/mp4"
        />
      </video>

      {/* Star field overlay */}
      <StarField />

      {/* Blurred pill overlay */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: '215px',
          width: '801px',
          height: '384px',
          borderRadius: '9999px',
          background: '#000',
          filter: 'blur(77.5px)',
          zIndex: 1,
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" style={{ zIndex: 1 }} />

      {/* All content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Content */}
        <div
          className={`flex flex-col items-center text-center max-w-[871px] mx-auto px-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Heading */}
          <div className="flex flex-col gap-[10px] items-center">
            <h1
              className="text-white font-bold tracking-[-2px] leading-[1.1]"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(40px, 6vw, 76px)' }}
            >
              <span className="gradient-text">Consortium</span> Factory
            </h1>
            <p
              className="text-white/70 font-light tracking-[-0.5px] leading-[1.3]"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(20px, 3vw, 32px)' }}
            >
              Building business structures for the AI&nbsp;&&nbsp;crypto&nbsp;age
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-[22px] items-center mt-10 flex-wrap justify-center">
            <a
              href="/org"
              className="px-8 py-[14px] rounded-[10px] text-white font-medium text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(123,57,252,0.3)]"
              style={{
                background: '#7b39fc',
                fontFamily: 'Cabin, sans-serif',
                lineHeight: '1.7',
              }}
            >
              See Example Consortium
            </a>
            <a
              href="#why-consortium"
              className="px-8 py-[14px] rounded-[10px] text-[#f6f7f9] font-medium text-base transition-all duration-300 hover:bg-[#3a2d5a]"
              style={{
                background: '#2b2344',
                fontFamily: 'Cabin, sans-serif',
                lineHeight: '1.7',
              }}
            >
              Learn More ↓
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ zIndex: 2 }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
