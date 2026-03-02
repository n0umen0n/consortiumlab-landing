'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import AnimatedText from './AnimatedText'

function StarField() {
  const stars = useMemo(() => {
    const s = []
    for (let i = 0; i < 150; i++) {
      let x, y
      do {
        x = Math.random() * 100
        y = Math.random() * 100
      } while (
        Math.pow(x - 48, 2) / (45 * 45) + Math.pow(y - 48, 2) / (48 * 48) < 1
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
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setLoaded(true)}
        className="absolute object-cover w-full h-full top-0 left-0 z-0 opacity-70 contrast-[1.3] brightness-[1.15]"
        style={{ objectPosition: '52% center' }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4"
          type="video/mp4"
        />
      </video>
      <StarField />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[215px] w-[801px] h-[384px] rounded-full bg-black blur-[77.5px] z-[1]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-[1]" />

      <div className="relative z-[2]">
        <div
          className={`flex flex-col items-center text-center max-w-[871px] mx-auto px-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <AnimatedText
            text="The Human-Agent Collaboration Platform"
            className="font-bold tracking-[-2px] leading-[1.1] text-center animated-gradient-text font-[Inter,sans-serif] text-[clamp(40px,6vw,76px)]"
            el="h1"
          />

          <div className="flex flex-row gap-[22px] items-center mt-12 flex-wrap justify-center">
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
              href="#"
              className="px-8 py-[14px] rounded-[10px] text-[#f6f7f9] font-medium text-base transition-all duration-300 hover:bg-[#3a2d5a]"
              style={{
                background: '#2b2344',
                fontFamily: 'Cabin, sans-serif',
                lineHeight: '1.7',
              }}
            >
              See Example Factory
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
