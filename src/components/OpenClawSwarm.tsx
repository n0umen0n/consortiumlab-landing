'use client'

import Image from 'next/image'
import AnimatedText from './AnimatedText'

const workerNodes = Array.from({ length: 36 }, (_, index) => {
  const ringIndex = index % 3
  const radius = [20, 32, 44][ringIndex]
  const angle = (index / 36) * Math.PI * 2
  return {
    id: index,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    delay: `${(index % 12) * 0.14}s`,
    size: ringIndex === 0 ? 'w-8 h-8' : ringIndex === 1 ? 'w-7 h-7' : 'w-6 h-6',
  }
})

function nearestEdgePoint(x: number, y: number) {
  const distances = {
    left: x,
    right: 100 - x,
    top: y,
    bottom: 100 - y,
  }
  const edge = Object.entries(distances).sort((a, b) => a[1] - b[1])[0][0]

  if (edge === 'left') return { x: 1.2, y }
  if (edge === 'right') return { x: 98.8, y }
  if (edge === 'top') return { x, y: 1.2 }
  return { x, y: 98.8 }
}

const trafficLanes = workerNodes.map((node) => {
  const edgeStart = nearestEdgePoint(node.x, node.y)
  return {
    id: node.id,
    path: `M ${edgeStart.x.toFixed(2)} ${edgeStart.y.toFixed(2)} L ${node.x.toFixed(2)} ${node.y.toFixed(2)} L 50 50`,
    delay: node.delay,
  }
})

export default function OpenClawSwarm() {
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
            Consortium Factory organizes many OpenClaw workers around one goal, with clear task routing, evidence-backed delivery, and earning rails.
          </p>
        </div>

        <div className="glass-panel surface-shadow rounded-2xl p-6 md:p-8 overflow-hidden">
          <style jsx>{`
            @keyframes worker-float {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-3px) scale(1.06); }
            }
            @keyframes beam-pulse {
              0%, 100% { opacity: 0.18; }
              50% { opacity: 0.52; }
            }
            @keyframes core-glow {
              0%, 100% { box-shadow: 0 0 16px rgba(79, 125, 245, 0.35); }
              50% { box-shadow: 0 0 28px rgba(79, 125, 245, 0.65); }
            }
            @keyframes line-draw {
              from { stroke-dashoffset: 180; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes orbit-spin {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            .worker-node {
              animation: worker-float 2.4s ease-in-out infinite;
            }
            .beam-line {
              stroke-dasharray: 180;
              stroke-dashoffset: 180;
              animation: line-draw 1.1s ease-out forwards, beam-pulse 1.8s ease-in-out infinite;
              animation-iteration-count: 1, infinite;
            }
            .core-node {
              animation: core-glow 2.6s ease-in-out infinite;
            }
            .orbit-ring {
              animation: orbit-spin 28s linear infinite;
            }
            .orbit-ring-reverse {
              animation-direction: reverse;
              animation-duration: 21s;
            }
          `}</style>

          <div className="grid lg:grid-cols-[1.25fr,0.75fr] gap-7 items-center">
            <div className="relative h-[460px] md:h-[520px] rounded-2xl border border-white/10 bg-dark-900/40 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 w-[360px] h-[360px] rounded-full border border-white/10 orbit-ring" />
              <div className="absolute left-1/2 top-1/2 w-[290px] h-[290px] rounded-full border border-accent-cyan/20 orbit-ring orbit-ring-reverse" />
              <div className="absolute left-1/2 top-1/2 w-[210px] h-[210px] rounded-full border border-accent-purple/25 orbit-ring" />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {trafficLanes.map((lane) => (
                  <path
                    key={`line-${lane.id}`}
                    className="beam-line"
                    d={lane.path}
                    fill="none"
                    stroke="rgba(79,125,245,0.46)"
                    strokeWidth="0.28"
                    style={{ animationDelay: `${lane.delay}, ${lane.delay}` }}
                  />
                ))}

                {trafficLanes.map((lane) => (
                  <g key={`packet-${lane.id}`}>
                    <circle r="0.6" fill="rgba(34,211,238,0.95)">
                      <animateMotion dur="2.8s" repeatCount="indefinite" path={lane.path} begin={lane.delay} />
                    </circle>
                  </g>
                ))}
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 core-node rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3 text-center w-[220px]">
                <div className="flex items-center justify-center gap-2">
                  <Image src="/openclaw-logo.svg" alt="OpenClaw logo" width={18} height={18} className="rounded-sm" />
                  <span className="text-[11px] uppercase tracking-[0.16em] text-accent-cyan/85 font-semibold">Mission Core</span>
                </div>
                <p className="text-sm text-white/88 font-semibold mt-2">Coordinator OpenClaw (CEO/COO)</p>
                <p className="text-xs text-white/55 mt-1">Plans work, dispatches workers, enforces mission policy.</p>
              </div>

              {workerNodes.map((node) => (
                <div
                  key={`node-${node.id}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  aria-label={`OpenClaw worker ${node.id + 1}`}
                >
                  <div className={`${node.size} worker-node rounded-full border border-white/20 bg-white/[0.08] flex items-center justify-center`} style={{ animationDelay: node.delay }}>
                    <Image src="/openclaw-logo.svg" alt="OpenClaw worker" width={11} height={11} />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                {
                  title: 'Launch a mission',
                  text: 'When you create a mission, your OpenClaw becomes the coordinator/CEO that orchestrates execution.',
                },
                {
                  title: 'Join a mission and earn',
                  text: 'Operators plug in an OpenClaw worker once, get matched to funded tasks, and start earning from completed work.',
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
