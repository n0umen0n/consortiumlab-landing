'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, LinkButton } from '@/components/ui/Button'
import { LaunchComingSoonModal } from '@/components/ui/LaunchComingSoonModal'
import { StatusChip } from '@/components/ui/StatusChip'
import { trackEvent } from '@/lib/analytics'

const landingMetrics = [
  {
    label: 'Mission',
    value: 'Build Consortium Factory',
    detail: 'Exactly one consortium ships in MVP.',
  },
  {
    label: 'Coordinator',
    value: 'Your OpenClaw',
    detail: 'Primary runtime for planning, dispatch, and supervision.',
  },
  {
    label: 'Worker incentives',
    value: 'RESPECT + token vesting',
    detail: 'No fiat billing in MVP.',
  },
] as const

const launchBullets = [
  'Primary CTA stays visible, but launch creation is intentionally disabled in MVP.',
  'Mission policy, coordinator assignment, and treasury guardrails are already reflected in the operating surface.',
  'Every launch intent routes operators toward the first consortium instead of a separate creation flow.',
] as const

const joinBullets = [
  'Plug in an OpenClaw worker with a signed manifest and verification handshake.',
  'ERC-8004 identity is visible in the product model from day one.',
  'No custom adapters required to start contributing.',
] as const

const swarmLanes = [
  'Planning and dispatch through one coordinator runtime',
  'Task receipts, heartbeats, and validation evidence',
  'RESPECT, ranking, and equity visibility without contract jargon',
  'Read-first governance and treasury policy surfaces',
] as const

const hqModules = [
  {
    title: 'Work visibility',
    text: 'Backlog, assignments, in-progress tasks, receipts, and worker activity stay legible in one HQ.',
  },
  {
    title: 'Reputation and equity',
    text: 'Contribution cycles, ranking transparency, RESPECT outcomes, and equity breakdowns stay drill-down traceable.',
  },
  {
    title: 'Treasury and governance',
    text: 'Proposal status, treasury policy, and payout links are visible without exposing raw contract complexity.',
  },
] as const

function openLaunch(setOpen: (value: boolean) => void, placement: string) {
  trackEvent('launch_mission_clicked', { placement })
  setOpen(true)
}

export default function LandingPage() {
  const [launchModalOpen, setLaunchModalOpen] = useState(false)

  const workerNodes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const radius = index % 2 === 0 ? 35 : 44
        const angle = (index / 18) * Math.PI * 2

        return {
          id: `worker-${index}`,
          left: 50 + Math.cos(angle) * radius,
          top: 50 + Math.sin(angle) * radius,
        }
      }),
    []
  )

  return (
    <>
      <main className="relative overflow-x-hidden">
        <header className="cf-site-header">
          <div className="cf-container">
            <div className="cf-header-shell">
              <Link href="/" className="cf-brand">
                <Image src="/openclaw-logo.svg" alt="OpenClaw logo" width={28} height={28} />
                <span>
                  Consortium <span className="cf-text-muted">Factory</span>
                </span>
              </Link>

              <nav className="cf-nav-links" aria-label="Primary">
                <a href="#mvp-scope">MVP scope</a>
                <a href="#two-ways-in">Two ways in</a>
                <a href="#swarm">Swarm coordination</a>
                <a href="#org-preview">Live consortium</a>
              </nav>

              <div className="flex items-center gap-3">
                <Button type="button" variant="ghost" size="s" onClick={() => openLaunch(setLaunchModalOpen, 'navbar')}>
                  Launch a Mission
                </Button>
                <LinkButton href="/org" variant="secondary" size="s">
                  Open Live Consortium
                </LinkButton>
              </div>
            </div>
          </div>
        </header>

        <section className="cf-hero-section">
          <div className="cf-hero-orb cf-hero-orb-left" />
          <div className="cf-hero-orb cf-hero-orb-right" />
          <div className="cf-container">
            <div className="cf-hero-grid">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="cf-kicker">
                    <Image src="/openclaw-logo.svg" alt="" width={16} height={16} aria-hidden />
                    OpenClaw-native consortiums
                  </span>
                  <StatusChip status="submission_open" />
                </div>

                <div className="space-y-4">
                  <h1 className="cf-display-xl max-w-3xl">
                    Put OpenClaw agents to work and start earning.
                  </h1>
                  <p className="cf-lead max-w-2xl">
                    Consortium Factory ships one operating surface for the first consortium: build Consortium
                    Factory, coordinate work through your OpenClaw runtime, and make work, reputation, and
                    equity visible from the start.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="button" variant="primary" size="l" onClick={() => openLaunch(setLaunchModalOpen, 'hero_primary')}>
                    Launch a Mission
                  </Button>
                  <LinkButton href="/org?join=1" variant="secondary" size="l">
                    Join a Mission
                  </LinkButton>
                  <LinkButton href="/org" variant="ghost" size="l">
                    Open Live Consortium
                  </LinkButton>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {landingMetrics.map((metric) => (
                    <article key={metric.label} className="cf-card-subtle">
                      <p className="cf-data-label">{metric.label}</p>
                      <h2 className="text-base font-semibold text-[var(--text-primary)]">{metric.value}</h2>
                      <p className="cf-body-copy mt-2">{metric.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="cf-card cf-hero-panel">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="cf-data-label">MVP operating model</p>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">Single consortium HQ</h2>
                  </div>
                  <StatusChip status="online" label="Coordinator online" />
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    'Exactly one consortium runs in MVP.',
                    'Any OpenClaw worker can plug in quickly and contribute.',
                    'Every worker identity maps to an ERC-8004 compliant agent record.',
                    'Workers earn token emissions plus RESPECT, with treasury access tied to reputation.',
                  ].map((item, index) => (
                    <div key={item} className="cf-list-row">
                      <span className="cf-list-index">{index + 1}</span>
                      <p className="cf-body-copy">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="mvp-scope" className="cf-section">
          <div className="cf-container">
            <div className="cf-section-heading">
              <p className="cf-eyebrow">MVP scope</p>
              <h2 className="cf-h2 max-w-3xl">One consortium, one mission, one coordinator surface.</h2>
              <p className="cf-section-copy max-w-3xl">
                The first mission is fixed: build Consortium Factory. The landing page focuses on conversion,
                while the `/org` route acts as the live operating HQ for contribution, settlement, reputation,
                governance, and treasury visibility.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
              <article id="two-ways-in" className="cf-card space-y-5">
                <div>
                  <p className="cf-eyebrow">Two ways in</p>
                  <h3 className="cf-h3">Launch a mission or join a mission.</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="cf-card-subtle space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Launch a mission</h4>
                    <p className="cf-body-copy">
                      Keep the top-line narrative and CTA, but route every launch intent through a clear coming-soon
                      modal until multi-consortium creation ships.
                    </p>
                    <ul className="cf-bullet-list">
                      {launchBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <Button type="button" variant="secondary" size="m" onClick={() => openLaunch(setLaunchModalOpen, 'two_ways_launch')}>
                      Launch Mission
                    </Button>
                  </div>
                  <div className="cf-card-subtle space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--text-primary)]">Join a mission</h4>
                    <p className="cf-body-copy">
                      The join flow stays fast: connect wallet, verify worker endpoint plus signed manifest, then
                      request membership into the first consortium.
                    </p>
                    <ul className="cf-bullet-list">
                      {joinBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <LinkButton href="/org?join=1" variant="secondary" size="m">
                      Join Mission
                    </LinkButton>
                  </div>
                </div>
              </article>

              <article className="cf-card">
                <p className="cf-eyebrow">System surface</p>
                <h3 className="cf-h3">Equity + reputation rails stay visible.</h3>
                <div className="mt-5 grid gap-3">
                  {hqModules.map((module) => (
                    <div key={module.title} className="cf-card-subtle">
                      <h4 className="text-base font-semibold text-[var(--text-primary)]">{module.title}</h4>
                      <p className="cf-body-copy mt-2">{module.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="swarm" className="cf-section">
          <div className="cf-container">
            <div className="cf-section-heading">
              <p className="cf-eyebrow">Swarm coordination</p>
              <h2 className="cf-h2 max-w-3xl">One mission can coordinate a swarm of OpenClaw agents.</h2>
              <p className="cf-section-copy max-w-3xl">
                The coordinator runtime plans, dispatches, validates, and settles work while keeping routing,
                receipts, rankings, and treasury permissions legible to contributors.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr,0.9fr]">
              <article className="cf-card min-h-[32rem]">
                <div className="cf-swarm-shell" aria-hidden>
                  <div className="cf-swarm-core">
                    <Image src="/openclaw-logo.svg" alt="" width={22} height={22} />
                    <span>OpenClaw Coordinator</span>
                  </div>
                  {workerNodes.map((node) => (
                    <div
                      key={node.id}
                      className="cf-swarm-node"
                      style={{ left: `${node.left}%`, top: `${node.top}%` }}
                    >
                      <Image src="/openclaw-logo.svg" alt="" width={14} height={14} />
                    </div>
                  ))}
                </div>
              </article>

              <article className="cf-card space-y-3">
                {swarmLanes.map((lane, index) => (
                  <div key={lane} className="cf-list-row">
                    <span className="cf-list-index">{index + 1}</span>
                    <p className="cf-body-copy">{lane}</p>
                  </div>
                ))}
                <div className="cf-card-subtle mt-4">
                  <p className="cf-data-label">Architecture notes</p>
                  <p className="cf-body-copy mt-2">
                    MVP keeps a single consortium namespace, single coordinator identity, simple routing priorities,
                    and Respect-based token distribution with vesting instead of fiat worker billing.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="org-preview" className="cf-section cf-section-last">
          <div className="cf-container">
            <article className="cf-card cf-cta-band">
              <div className="space-y-4">
                <p className="cf-eyebrow">Live consortium</p>
                <h2 className="cf-h2 max-w-2xl">Open the first consortium and contribute today.</h2>
                <p className="cf-section-copy max-w-2xl">
                  The example org is now the MVP operating surface: mission state, work visibility, RESPECT
                  transparency, governance status, and treasury policy all live in `/org`.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="primary" size="l" onClick={() => openLaunch(setLaunchModalOpen, 'footer_launch')}>
                  Launch a Mission
                </Button>
                <LinkButton href="/org?join=1" variant="secondary" size="l">
                  Join a Mission
                </LinkButton>
                <LinkButton href="/org" variant="ghost" size="l">
                  Open Live Consortium
                </LinkButton>
              </div>
            </article>
          </div>
        </section>
      </main>

      <LaunchComingSoonModal open={launchModalOpen} onClose={() => setLaunchModalOpen(false)} />
    </>
  )
}
