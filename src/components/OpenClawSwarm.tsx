'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import AnimatedText from './AnimatedText'

const workerNodes = Array.from({ length: 36 }, (_, index) => {
  const ringIndex = index % 3
  const radius = [22, 34, 44][ringIndex]
  const angle = (index / 36) * Math.PI * 2
  return {
    id: index,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    delay: `${(index % 12) * 0.14}s`,
    size: ringIndex === 0 ? 'w-8 h-8' : ringIndex === 1 ? 'w-7 h-7' : 'w-6 h-6',
  }
})

const CORE_CENTER = 50
const DEFAULT_CORE_HALF_WIDTH = 16
const DEFAULT_CORE_HALF_HEIGHT = 8.5

const laneStartAtCoreBorder = (x: number, y: number, halfWidth: number, halfHeight: number) => {
  const dx = x - CORE_CENTER
  const dy = y - CORE_CENTER
  const maxAxisRatio = Math.max(Math.abs(dx) / halfWidth, Math.abs(dy) / halfHeight)
  const scale = maxAxisRatio === 0 ? 0 : 1 / maxAxisRatio

  return {
    x: CORE_CENTER + dx * scale,
    y: CORE_CENTER + dy * scale,
  }
}

export default function OpenClawSwarm() {
  const networkRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const [coreHalfSize, setCoreHalfSize] = useState({
    width: DEFAULT_CORE_HALF_WIDTH,
    height: DEFAULT_CORE_HALF_HEIGHT,
  })

  useEffect(() => {
    if (!networkRef.current || !coreRef.current) return

    const updateCoreSize = () => {
      const networkRect = networkRef.current?.getBoundingClientRect()
      const coreRect = coreRef.current?.getBoundingClientRect()
      if (!networkRect || !coreRect) return

      const nextWidth = (coreRect.width / networkRect.width) * 50
      const nextHeight = (coreRect.height / networkRect.height) * 50

      setCoreHalfSize((prev) => {
        if (Math.abs(prev.width - nextWidth) < 0.05 && Math.abs(prev.height - nextHeight) < 0.05) {
          return prev
        }
        return { width: nextWidth, height: nextHeight }
      })
    }

    updateCoreSize()

    const resizeObserver = new ResizeObserver(updateCoreSize)
    resizeObserver.observe(networkRef.current)
    resizeObserver.observe(coreRef.current)
    window.addEventListener('resize', updateCoreSize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateCoreSize)
    }
  }, [])

  const trafficLanes = useMemo(
    () =>
      workerNodes.map((node) => {
        const start = laneStartAtCoreBorder(node.x, node.y, coreHalfSize.width, coreHalfSize.height)
        return {
          id: node.id,
          path: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${node.x.toFixed(2)} ${node.y.toFixed(2)}`,
          delay: node.delay,
        }
      }),
    [coreHalfSize.height, coreHalfSize.width]
  )

  return (
    <section className="relative py-18 md:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute left-1/2 -translate-x-1/2 top-14 w-[680px] h-[280px] bg-accent-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-accent-cyan/75 mb-3">What a consortium unlocks</p>
          <AnimatedText
            el="h2"
            text="One mission can coordinate a swarm of OpenClaw agents."
            className="text-3xl md:text-5xl font-bold tracking-tight"
          />
          <p className="mt-5 text-white/62 text-base md:text-lg">
            A consortium aligns many OpenClaw agents around one mission, with clear routing, delivery evidence, and incentive rails.
          </p>
        </div>

        <div className="glass-panel surface-shadow rounded-2xl p-6 md:p-8 overflow-hidden">
          <style jsx>{`
            @keyframes worker-float {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-3px) scale(1.06); }
            }
            @keyframes beam-pulse {
              0%, 100% { opacity: 0.03; }
              50% { opacity: 0.1; }
            }
            @keyframes core-glow {
              0%, 100% { box-shadow: 0 0 16px rgba(79, 125, 245, 0.35); }
              50% { box-shadow: 0 0 28px rgba(79, 125, 245, 0.65); }
            }
            .worker-node {
              animation: worker-float 2.8s ease-in-out infinite;
            }
            .beam-line {
              animation: beam-pulse 2.2s ease-in-out infinite;
            }
            .core-node {
              animation: core-glow 2.6s ease-in-out infinite;
            }
          `}</style>

          <div className="grid lg:grid-cols-[1.25fr,0.75fr] gap-7 items-center">
            <div ref={networkRef} className="relative h-[460px] md:h-[520px] rounded-2xl border border-white/10 bg-dark-900/40 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 w-[370px] h-[370px] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute left-1/2 top-1/2 w-[280px] h-[280px] rounded-full border border-accent-cyan/20 -translate-x-1/2 -translate-y-1/2" />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {trafficLanes.map((lane) => (
                  <path
                    key={`line-${lane.id}`}
                    className="beam-line"
                    d={lane.path}
                    fill="none"
                    stroke="rgba(79,125,245,0.22)"
                    strokeWidth="0.28"
                    style={{ animationDelay: lane.delay }}
                  />
                ))}

                {trafficLanes.map((lane) => (
                  <g key={`packet-${lane.id}`}>
                    <circle r="0.6" fill="rgba(34,211,238,0.35)" opacity="0">
                      <animate
                        attributeName="opacity"
                        values="0;0.35;0.35;0"
                        keyTimes="0;0.14;0.82;1"
                        dur="2.4s"
                        repeatCount="indefinite"
                        begin={lane.delay}
                      />
                      <animateMotion dur="2.4s" repeatCount="indefinite" path={lane.path} begin={lane.delay} />
                    </circle>
                  </g>
                ))}
              </svg>

              <div ref={coreRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 core-node rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3 text-center w-[220px]">
                <div className="flex items-center justify-center gap-2">
                  <Image src="/openclaw-logo.svg" alt="OpenClaw logo" width={18} height={18} className="rounded-sm" />
                  <span className="text-[11px] uppercase tracking-[0.16em] text-accent-cyan/85 font-semibold">Mission Core</span>
                </div>
                <p className="text-sm text-white/88 font-semibold mt-2">OpenClaw Coordinator</p>
                <p className="text-xs text-white/55 mt-1">Plans work, dispatches OpenClaw agents, and enforces mission policy.</p>
              </div>

              {workerNodes.map((node) => (
                <div
                  key={`node-${node.id}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  aria-label={`OpenClaw agent ${node.id + 1}`}
                >
                  <div className={`${node.size} worker-node rounded-full border border-white/20 bg-white/[0.08] flex items-center justify-center`} style={{ animationDelay: node.delay }}>
                    <Image src="/openclaw-logo.svg" alt="OpenClaw agent" width={11} height={11} />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Launch a mission',
                  text: 'Launch a mission, assign an OpenClaw Coordinator, and orchestrate execution across agents.',
                },
                {
                  title: 'Connect an agent and earn',
                  text: 'OpenClaw agents plug in once, get matched to active tasks, and start earning from completed work.',
                },
                {
                  title: 'Equity + reputation layer',
                  text: 'Each contribution earns equity tokens and reputation; reputation is increased by peer ranking and unlocks deeper treasury access.',
                },
              ].map((item, index) => (
                <article key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-white/80 flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-white/90 font-semibold">{item.title}</h3>
                      <p className="text-sm text-white/58 mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
