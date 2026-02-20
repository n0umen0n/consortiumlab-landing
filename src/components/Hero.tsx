'use client'

import { useRef, useEffect, useState } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setLoaded(true)}
        className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-60"
        style={{
          left: '-10%',
          top: '-10%',
          objectPosition: 'center bottom',
          zIndex: 0,
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4"
          type="video/mp4"
        />
      </video>

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" style={{ zIndex: 1 }} />

      {/* All content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Content */}
        <div
          className={`flex flex-col items-center text-center max-w-[871px] mx-auto px-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ marginTop: 'clamp(180px, 25vh, 260px)' }}
        >
          {/* Badge */}
          <div className="mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
            <span className="text-sm font-[Manrope] text-white/70 tracking-wide">
              🚀 The future of business building
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-[10px] items-center">
            <h1
              className="text-white font-medium tracking-[-2px] leading-[1.1]"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(40px, 6vw, 76px)' }}
            >
              Build your business.
            </h1>
            <h1
              className="text-white tracking-[-2px] leading-[1.1] italic"
              style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(40px, 6vw, 76px)' }}
            >
              AI does the rest.
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="mt-6 text-[#f6f7f9]/90 max-w-[613px] leading-[26px]"
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px' }}
          >
            A full AI-powered organization out of the box — agents for community, content, dev, and growth, 
            plus built-in governance to attract and reward contributors.
          </p>

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

        {/* Dashboard preview card */}
        <div
          className={`mx-auto mt-20 mb-10 px-4 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ maxWidth: '1163px', width: '90%' }}
        >
          <div
            className="p-[22.5px] rounded-[24px] border border-white/[0.08]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {/* Mock dashboard */}
            <div className="rounded-lg bg-dark-800/80 border border-white/[0.06] overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-white/30 font-mono">consortium-factory.app</span>
              </div>
              {/* Dashboard content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Active Agents', value: '8', trend: '+2 this week' },
                    { label: 'Tasks Completed', value: '1,247', trend: '+89 today' },
                    { label: 'Contributors', value: '34', trend: '↑ 12%' },
                    { label: 'Treasury', value: '$482K', trend: '+$18K' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                      <p className="text-white/40 text-xs font-[Manrope]">{stat.label}</p>
                      <p className="text-white text-2xl font-bold mt-1 font-[Inter]">{stat.value}</p>
                      <p className="text-emerald-400/70 text-xs mt-1">{stat.trend}</p>
                    </div>
                  ))}
                </div>
                {/* Activity bars */}
                <div className="flex items-end gap-1 h-20">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-[#7b39fc]/60 to-[#7b39fc]/20"
                      style={{
                        height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 30}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-white/20 text-xs mt-2 font-[Manrope]">Agent activity — last 30 days</p>
              </div>
            </div>
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
