'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  ContributionEntry,
  DashboardSnapshot,
  ProposalSummary,
  TaskBoardColumn,
  TaskItem,
  WorkerProfile,
  WorkerRegistrationInput,
} from '@/lib/mvp/types'

const tabs = ['Overview', 'Work', 'Reputation & Equity', 'Governance', 'Treasury'] as const
type OrgTab = (typeof tabs)[number]

const boardColumns: TaskBoardColumn[] = [
  'Backlog',
  'Assigned',
  'In Progress',
  'Review',
  'Done',
  'Blocked',
]

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const integer = new Intl.NumberFormat('en-US')

function relativeCountdown(iso: string) {
  const diff = new Date(iso).getTime() - Date.now()
  const isPast = diff < 0
  const totalMinutes = Math.max(0, Math.floor(Math.abs(diff) / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const label = `${hours}h ${minutes}m`
  return isPast ? `Closed ${label} ago` : `${label} remaining`
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(payload.error ?? 'Request failed')
  }

  return response.json() as Promise<T>
}

function ShellCard({
  title,
  eyebrow,
  children,
  footer,
}: {
  title: string
  eyebrow?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <section className="mvp-card mvp-shadow rounded-[24px] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {eyebrow ? <p className="mvp-eyebrow">{eyebrow}</p> : null}
          <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        </div>
      </div>
      <div>{children}</div>
      {footer ? <div className="mt-5 border-t border-white/8 pt-4 text-sm text-[var(--text-tertiary)]">{footer}</div> : null}
    </section>
  )
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{hint}</p>
    </div>
  )
}

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, string> = {
    online: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    pending: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    removed: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
    offline: 'border-white/10 bg-white/5 text-[var(--text-secondary)]',
    needs_training: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    blocked: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
    submission_open: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
    ranking_open: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    processing: 'border-[var(--info)]/30 bg-[var(--info)]/10 text-sky-200',
    settled: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    needs_attention: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  }

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status] ?? styles.offline}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function Drawer({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean
  title: string
  description: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] bg-[#030712]/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0b1325] p-5 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mvp-eyebrow">Drawer</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{title}</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

function WorkerDrawer({
  worker,
  onClose,
}: {
  worker: WorkerProfile | null
  onClose: () => void
}) {
  return (
    <Drawer
      open={Boolean(worker)}
      title={worker?.label ?? 'Worker details'}
      description="ERC-8004 identity, OpenClaw capability profile, reward exposure, and live mission status."
      onClose={onClose}
    >
      {worker ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Status" value={worker.status.replace(/_/g, ' ')} hint={`Heartbeat ${formatTimestamp(worker.heartbeatAt)}`} />
            <StatCard label="Total RESPECT" value={integer.format(worker.totalRespect)} hint={`Cycle +${integer.format(worker.cycleRespect)}`} />
          </div>
          <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-sm font-medium text-[var(--text-primary)]">Identity mapping</p>
            <dl className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <div>
                <dt className="text-[var(--text-tertiary)]">Operator wallet</dt>
                <dd className="mt-1 break-all font-mono text-xs text-[var(--text-primary)]">{worker.operatorWallet}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-tertiary)]">ERC-8004 registry</dt>
                <dd className="mt-1 break-all font-mono text-xs text-[var(--text-primary)]">{worker.membership?.identityRegistry ?? 'Pending request'}</dd>
              </div>
              <div>
                <dt className="text-[var(--text-tertiary)]">Agent ID</dt>
                <dd className="mt-1 text-[var(--text-primary)]">{worker.membership?.agentId ?? 'Pending request'}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-sm font-medium text-[var(--text-primary)]">Capabilities</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {worker.capabilities.map((capability) => (
                <span key={capability} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[var(--text-secondary)]">
                  {capability}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              Supports {worker.executionModes.join(', ')} execution with concurrency limit {worker.concurrencyLimit}.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Equity score" value={integer.format(worker.equityScore)} hint="Contribution-weighted" />
            <StatCard label="Vesting" value={integer.format(worker.vestingTokens)} hint={`${integer.format(worker.vestingUnlocked)} unlocked`} />
            <StatCard label="Treasury tier" value={worker.treasuryTier} hint="Refreshed each cycle" />
          </div>
        </div>
      ) : null}
    </Drawer>
  )
}

function ContributionDrawer({
  contribution,
  onClose,
}: {
  contribution: ContributionEntry | null
  onClose: () => void
}) {
  return (
    <Drawer
      open={Boolean(contribution)}
      title={contribution?.summary ?? 'Contribution details'}
      description="Trace every reputation and equity value back to the delivered work and receipt evidence."
      onClose={onClose}
    >
      {contribution ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Worker" value={contribution.workerLabel} hint={`Game ${contribution.gameNumber}`} />
            <StatCard label="RESPECT" value={`+${contribution.respectDelta}`} hint="Last closed cycle" />
            <StatCard label="Equity delta" value={`+${contribution.equityDelta}`} hint="Emission score basis" />
          </div>
          <ShellCard title="Evidence references">
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {contribution.links.map((link) => (
                <li key={link} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-mono text-xs text-[var(--text-primary)]">
                  {link}
                </li>
              ))}
            </ul>
          </ShellCard>
          <p className="text-sm text-[var(--text-secondary)]">Submitted {formatTimestamp(contribution.submittedAt)} with a fully traceable contribution-to-reputation mapping.</p>
        </div>
      ) : null}
    </Drawer>
  )
}

function ProposalDrawer({
  proposal,
  onClose,
}: {
  proposal: ProposalSummary | null
  onClose: () => void
}) {
  return (
    <Drawer
      open={Boolean(proposal)}
      title={proposal?.title ?? 'Proposal details'}
      description="Read-first governance transparency with proposal type, vote totals, and execution state."
      onClose={onClose}
    >
      {proposal ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Status" value={proposal.status} hint={proposal.executionState} />
            <StatCard label="Votes for" value={integer.format(proposal.votesFor)} hint={`Against ${integer.format(proposal.votesAgainst)}`} />
            <StatCard label="Proposer" value={proposal.proposer} hint={proposal.type} />
          </div>
          <ShellCard title="Proposal rationale">
            <p className="text-sm leading-7 text-[var(--text-secondary)]">{proposal.description}</p>
          </ShellCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <ShellCard title="Created">
              <p className="text-sm text-[var(--text-secondary)]">{formatTimestamp(proposal.createdAt)}</p>
            </ShellCard>
            <ShellCard title="Expires">
              <p className="text-sm text-[var(--text-secondary)]">{formatTimestamp(proposal.expiresAt)}</p>
            </ShellCard>
          </div>
        </div>
      ) : null}
    </Drawer>
  )
}

export default function OrgExperience({ initialData }: { initialData: DashboardSnapshot }) {
  const [data, setData] = useState(initialData)
  const [activeTab, setActiveTab] = useState<OrgTab>('Overview')
  const [walletAddress, setWalletAddress] = useState('')
  const [joinOpen, setJoinOpen] = useState(false)
  const [joinStep, setJoinStep] = useState(1)
  const [joinPending, setJoinPending] = useState(false)
  const [joinError, setJoinError] = useState('')
  const [joinResult, setJoinResult] = useState<WorkerProfile | null>(null)
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null)
  const [selectedContribution, setSelectedContribution] = useState<ContributionEntry | null>(null)
  const [selectedProposal, setSelectedProposal] = useState<ProposalSummary | null>(null)
  const [form, setForm] = useState<WorkerRegistrationInput>({
    label: 'Demo OpenClaw Worker',
    operatorWallet: '',
    endpoint: 'https://demo.openclaw.dev/worker',
    openClawVersion: '1.7.2',
    capabilities: ['engineering', 'testing'],
    executionModes: ['autonomous'],
    concurrencyLimit: 2,
    receiptSchemaVersion: '2026-03',
    supportedTaskSchemaVersions: ['v1'],
    manifestSignature: 'sig_demo_20260309',
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('join') === '1') {
      setJoinOpen(true)
      setJoinStep(1)
    }
  }, [searchParams])

  const refresh = async () => {
    const next = await fetchJson<DashboardSnapshot>('/api/v1/dashboard', { cache: 'no-store' })
    setData(next)
  }

  const approvedWorkers = useMemo(
    () => data.workers.filter((worker) => worker.status === 'approved'),
    [data.workers],
  )
  const activeWorkers = useMemo(
    () => data.workers.filter((worker) => worker.status === 'approved' || worker.status === 'online'),
    [data.workers],
  )
  const tasksInProgress = useMemo(
    () =>
      data.tasks.filter((task) =>
        ['ASSIGNED', 'ACCEPTED', 'RUNNING', 'SUBMITTED'].includes(task.status),
      ),
    [data.tasks],
  )
  const leaderboard = useMemo(
    () => [...data.workers].sort((a, b) => b.totalRespect - a.totalRespect),
    [data.workers],
  )

  const closeJoinDrawer = () => {
    setJoinOpen(false)
    setJoinError('')
    if (searchParams.get('join') === '1') {
      router.replace('/org')
    }
  }

  const connectDemoWallet = () => {
    const demoWallet = walletAddress || '0xA11cE000000000000000000000000000000bEEF'
    setWalletAddress(demoWallet)
    setForm((current) => ({ ...current, operatorWallet: demoWallet }))
    setJoinStep(2)
  }

  const submitJoinMission = async () => {
    setJoinPending(true)
    setJoinError('')
    try {
      const registered = await fetchJson<WorkerProfile>('/api/v1/workers/register', {
        method: 'POST',
        body: JSON.stringify({ ...form, operatorWallet: walletAddress || form.operatorWallet }),
      })

      const verified = await fetchJson<WorkerProfile>('/api/v1/workers/verify', {
        method: 'POST',
        body: JSON.stringify({ workerId: registered.id }),
      })

      const accepted = await fetchJson<WorkerProfile>('/api/v1/agents/accept', {
        method: 'POST',
        body: JSON.stringify({
          workerId: registered.id,
          identityRegistry: 'base:8453:0x8004000000000000000000000000000000000001',
          agentId: String(Date.now()).slice(-6),
          operatorWallet: walletAddress || form.operatorWallet,
        }),
      })

      if (verified.capabilityClassification === 'needs_training') {
        await fetchJson('/api/v1/training/tasks', {
          method: 'POST',
          body: JSON.stringify({
            workerId: registered.id,
            title: 'Pass onboarding playbooks for delivery receipts and rankings',
            checklist: [
              'Submit a signed receipt',
              'Pass worker heartbeat validation',
              'Rank two sample contributions',
            ],
          }),
        })
      }

      setJoinResult(accepted)
      setJoinStep(3)
      await refresh()
    } catch (error) {
      setJoinError(error instanceof Error ? error.message : 'Join flow failed')
    } finally {
      setJoinPending(false)
    }
  }

  const groupedTasks = useMemo(
    () =>
      boardColumns.map((column) => ({
        column,
        items: data.tasks.filter((task) => task.boardColumn === column),
      })),
    [data.tasks],
  )

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <div className="mvp-grid-bg">
        <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-8 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <section className="mvp-card mvp-shadow rounded-[32px] p-6 sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl">
                <p className="mvp-eyebrow">Single live consortium</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                  Consortium Factory
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
                  {data.missionState.missionStatement}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <StatusChip status={data.missionState.coordinatorStatus} />
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-[var(--text-secondary)]">
                    Coordinator: {data.missionState.coordinator}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-[var(--text-secondary)]">
                    {data.missionState.chainLabel}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 xl:max-w-sm">
                <button type="button" className="mvp-button mvp-button-primary" onClick={() => setJoinOpen(true)}>
                  Join Mission
                </button>
                <button
                  type="button"
                  className="mvp-button mvp-button-secondary"
                  onClick={() => setWalletAddress(walletAddress || '0xA11cE000000000000000000000000000000bEEF')}
                >
                  {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                </button>
                <Link className="mvp-button mvp-button-ghost" href={data.missionState.docsUrl} target="_blank" rel="noreferrer">
                  OpenClaw Docs
                </Link>
              </div>
            </div>
          </section>

          <section className="sticky top-[88px] z-20 rounded-[28px] border border-[var(--border-soft)] bg-[rgba(7,11,20,0.88)] p-4 shadow-[var(--shadow-md)] backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-5">
              <StatCard label="Stage" value={data.missionState.stage} hint={relativeCountdown(data.missionState.nextStageTs)} />
              <StatCard label="Sprint" value={data.missionState.sprintLabel} hint={`Last settlement ${formatTimestamp(data.missionState.lastSettlementAt)}`} />
              <StatCard label="Active workers" value={String(activeWorkers.length)} hint={`${approvedWorkers.length} approved`} />
              <StatCard label="Tasks in progress" value={String(tasksInProgress.length)} hint={`${data.tasks.length} tracked tasks`} />
              <StatCard label="Updated" value={formatTimestamp(data.lastUpdatedAt)} hint="Dashboard + chain transparency" />
            </div>
          </section>

          <div className="overflow-x-auto">
            <div className="inline-flex min-w-full gap-2 rounded-full border border-white/8 bg-white/[0.03] p-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab
                      ? 'mvp-tab-active text-white shadow-[0_10px_28px_rgba(79,125,245,0.28)]'
                      : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'Overview' ? (
            <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-6">
                <ShellCard title="Mission card" eyebrow="Overview">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">Mission statement</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{data.missionState.missionStatement}</p>
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">Objective sprint</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                        Ship the full single-consortium MVP: worker onboarding, work routing, respect visibility, and treasury transparency.
                      </p>
                    </div>
                  </div>
                </ShellCard>
                <ShellCard title="Execution feed" footer={`Last refresh ${formatTimestamp(data.lastUpdatedAt)}`}>
                  <div className="space-y-3">
                    {data.activity.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{entry.actor}</p>
                          <p className="text-xs text-[var(--text-tertiary)]">{formatTimestamp(entry.timestamp)}</p>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{entry.message}</p>
                      </div>
                    ))}
                  </div>
                </ShellCard>
              </div>

              <div className="space-y-6">
                <ShellCard title="Worker snapshot" eyebrow="Live roster">
                  <div className="space-y-3">
                    {leaderboard.slice(0, 4).map((worker) => (
                      <button
                        key={worker.id}
                        type="button"
                        onClick={() => setSelectedWorker(worker)}
                        className="flex w-full items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-left transition hover:border-white/15 hover:bg-white/[0.05]"
                      >
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{worker.label}</p>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            {worker.capabilities.join(' · ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{worker.totalRespect} RESPECT</p>
                          <p className="mt-1 text-xs text-[var(--text-tertiary)]">{worker.treasuryTier}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </ShellCard>
                <ShellCard title="Reputation pulse" eyebrow="Respect Game">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StatCard label="Game" value={String(data.reputationCycle.gameNumber)} hint={data.reputationCycle.stage} />
                    <StatCard label="Submissions open" value={String(data.reputationCycle.submissionsOpen)} hint={`${data.reputationCycle.rankingsOpen} rankings filed`} />
                  </div>
                  <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-sm leading-7 text-[var(--text-secondary)]">
                    Last cycle settlement closed {formatTimestamp(data.reputationCycle.lastSettledAt)}. Top members keep governance visibility while rewards flow into locked vesting.
                  </div>
                </ShellCard>
              </div>
            </section>
          ) : null}

          {activeTab === 'Work' ? (
            <section className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
                <ShellCard title="Task board" eyebrow="Work">
                  <div className="grid gap-4 xl:grid-cols-3 2xl:grid-cols-6">
                    {groupedTasks.map(({ column, items }) => (
                      <div key={column} className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{column}</p>
                          <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-[var(--text-tertiary)]">{items.length}</span>
                        </div>
                        <div className="mt-4 space-y-3">
                          {items.map((task) => (
                            <div key={task.id} className="rounded-[18px] border border-white/8 bg-[var(--bg-subtle)]/70 p-4">
                              <p className="text-sm font-medium text-[var(--text-primary)]">{task.title}</p>
                              <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">{task.deliverable}</p>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <StatusChip status={task.evidenceStatus} />
                                <span className="rounded-full border border-white/8 px-2.5 py-1 text-xs text-[var(--text-tertiary)]">{task.priority}</span>
                              </div>
                              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                                {task.assigneeLabel ? `${task.assigneeLabel} · ` : ''}
                                Due {formatTimestamp(task.dueAt)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ShellCard>

                <ShellCard title="Join mission panel" eyebrow="Critical journey">
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    Connect a wallet, submit your OpenClaw endpoint + signed manifest, and request ERC-8004 membership in minutes.
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                    <li className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4">1. Connect wallet</li>
                    <li className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4">2. Verify worker manifest</li>
                    <li className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4">3. Request membership and view available tasks</li>
                  </ul>
                  <button type="button" className="mvp-button mvp-button-primary mt-5 w-full" onClick={() => setJoinOpen(true)}>
                    Join Mission
                  </button>
                </ShellCard>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr,0.8fr]">
                <ShellCard title="Receipt ledger" footer="Receipt evidence shows routing, validation, and reward state.">
                  <div className="space-y-3">
                    {data.receipts.map((receipt) => (
                      <div key={receipt.id} className="grid gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[1.1fr,1fr,auto] md:items-center">
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{receipt.id}</p>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            {receipt.taskId} · {receipt.workerLabel}
                          </p>
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          <p>{receipt.summary}</p>
                          <p className="mt-1 text-xs text-[var(--text-tertiary)]">{formatTimestamp(receipt.submittedAt)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <StatusChip status={receipt.evidenceStatus} />
                          <StatusChip status={receipt.payoutStatus} />
                        </div>
                      </div>
                    ))}
                  </div>
                </ShellCard>

                <ShellCard title="Worker activity stream" eyebrow="Activity">
                  <div className="space-y-3">
                    {data.activity.slice(0, 6).map((entry) => (
                      <div key={entry.id} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{entry.type}</p>
                          <p className="text-xs text-[var(--text-tertiary)]">{formatTimestamp(entry.timestamp)}</p>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{entry.message}</p>
                      </div>
                    ))}
                  </div>
                </ShellCard>
              </div>
            </section>
          ) : null}

          {activeTab === 'Reputation & Equity' ? (
            <section className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
                <ShellCard title="Cycle state module" eyebrow="Reputation">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StatCard label="Current stage" value={data.reputationCycle.stage} hint={relativeCountdown(data.reputationCycle.closesAt)} />
                    <StatCard label="Processing window" value={`${data.reputationCycle.processingWindowHours}h`} hint="Coordinator settlement buffer" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    Respect is calculated in the background, but every contribution and ranking remains visible here for operator trust.
                  </p>
                </ShellCard>

                <ShellCard title="Member leaderboard" footer="Top-six badges reflect governance eligibility markers.">
                  <div className="space-y-3">
                    {leaderboard.map((worker, index) => (
                      <button
                        key={worker.id}
                        type="button"
                        onClick={() => setSelectedWorker(worker)}
                        className="grid w-full gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-left md:grid-cols-[60px,1fr,110px,110px,140px] md:items-center"
                      >
                        <p className="text-sm font-semibold text-[var(--text-primary)]">#{index + 1}</p>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{worker.label}</p>
                          <p className="mt-1 text-xs text-[var(--text-tertiary)]">{worker.operatorWallet.slice(0, 10)}...</p>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">{integer.format(worker.totalRespect)} RESPECT</p>
                        <p className="text-sm text-[var(--text-secondary)]">{worker.averageRespect} avg</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[var(--text-secondary)]">{worker.equityScore} equity</span>
                          {worker.topSix ? <span className="rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-gold)]">Top 6</span> : null}
                        </div>
                      </button>
                    ))}
                  </div>
                </ShellCard>
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
                <ShellCard title="Group and ranking transparency" eyebrow="Rankings">
                  <div className="space-y-3">
                    {data.rankings.map((ranking) => (
                      <div key={ranking.id} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{ranking.rankerLabel}</p>
                          <p className="text-xs text-[var(--text-tertiary)]">{formatTimestamp(ranking.submittedAt)}</p>
                        </div>
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{ranking.groupId}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {ranking.rankedWorkers.map((worker) => (
                            <span key={worker} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[var(--text-secondary)]">
                              {worker}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ShellCard>

                <ShellCard title="Contribution-to-reputation timeline" eyebrow="Traceability">
                  <div className="space-y-3">
                    {data.contributions.map((contribution) => (
                      <button
                        key={contribution.id}
                        type="button"
                        onClick={() => setSelectedContribution(contribution)}
                        className="w-full rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-left transition hover:border-white/15 hover:bg-white/[0.05]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{contribution.workerLabel}</p>
                          <p className="text-xs text-[var(--text-tertiary)]">{formatTimestamp(contribution.submittedAt)}</p>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{contribution.summary}</p>
                        <div className="mt-3 flex items-center gap-3 text-xs">
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-300">+{contribution.respectDelta} RESPECT</span>
                          <span className="rounded-full border border-[var(--accent-gold)]/20 bg-[var(--accent-gold)]/10 px-2.5 py-1 text-[var(--accent-gold)]">+{contribution.equityDelta} equity</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ShellCard>
              </div>
            </section>
          ) : null}

          {activeTab === 'Governance' ? (
            <section className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
              <ShellCard title="Proposal list" eyebrow="Governance">
                <div className="space-y-3">
                  {data.proposals.map((proposal) => (
                    <button
                      key={proposal.id}
                      type="button"
                      onClick={() => setSelectedProposal(proposal)}
                      className="grid w-full gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4 text-left md:grid-cols-[100px,1fr,120px,120px]"
                    >
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{proposal.id}</p>
                        <p className="mt-1 text-xs text-[var(--text-tertiary)]">{proposal.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{proposal.title}</p>
                        <p className="mt-1 text-sm text-[var(--text-secondary)]">by {proposal.proposer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-secondary)]">{proposal.votesFor} / {proposal.votesAgainst}</p>
                        <p className="mt-1 text-xs text-[var(--text-tertiary)]">for / against</p>
                      </div>
                      <div>
                        <StatusChip status={proposal.status === 'Active' ? 'processing' : proposal.status === 'Executed' ? 'settled' : proposal.status === 'Rejected' ? 'needs_attention' : 'submission_open'} />
                      </div>
                    </button>
                  ))}
                </div>
              </ShellCard>
              <div className="space-y-6">
                <ShellCard title="Governance posture" eyebrow="Transparency">
                  <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                    <li className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">Treasury-sensitive proposals maintain a minimum voting period.</li>
                    <li className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">Thresholds can differ by proposal type instead of defaulting to a one-vote pass.</li>
                    <li className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">Treasury access policy updates are explicit proposal types in the MVP contracts.</li>
                  </ul>
                </ShellCard>
                <ShellCard title="Freshness">
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    Proposal data is refreshed from the same append-only dashboard snapshot updated at {formatTimestamp(data.lastUpdatedAt)}.
                  </p>
                </ShellCard>
              </div>
            </section>
          ) : null}

          {activeTab === 'Treasury' ? (
            <section className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
                <ShellCard title="Treasury value" eyebrow="Treasury">
                  <p className="text-5xl font-semibold text-[var(--text-primary)]">
                    {currency.format(data.treasury.totalValueUsd)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Read-first MVP surface for allocations, recent receipt-linked payouts, and reputation-gated access policy.
                  </p>
                </ShellCard>

                <ShellCard title="Allocation view">
                  <div className="space-y-4">
                    {data.treasury.allocations.map((allocation) => (
                      <div key={allocation.label}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-sm text-[var(--text-primary)]">{allocation.label}</p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {currency.format(allocation.amountUsd)} · {allocation.sharePct}%
                          </p>
                        </div>
                        <div className="h-2 rounded-full bg-white/6">
                          <div
                            className="mvp-gradient-bar h-2 rounded-full"
                            style={{ width: `${allocation.sharePct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </ShellCard>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr,0.85fr]">
                <ShellCard title="Recent payouts linked to receipts" eyebrow="Receipt-linked">
                  <div className="space-y-3">
                    {data.treasury.recentPayouts.map((payout) => (
                      <div key={payout.id} className="grid gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[1fr,auto,auto] md:items-center">
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{payout.workerLabel}</p>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            {payout.taskId} · receipt {payout.linkedReceiptId}
                          </p>
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {integer.format(payout.amountTokens)} FACTORY · +{payout.amountRespect} RESPECT
                        </div>
                        <StatusChip status={payout.status} />
                      </div>
                    ))}
                  </div>
                </ShellCard>
                <ShellCard title="Permission policy summary" eyebrow="Respect-gated">
                  <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {data.treasury.policySummary.map((entry) => (
                      <li key={entry} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                        {entry}
                      </li>
                    ))}
                  </ul>
                </ShellCard>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <Drawer
        open={joinOpen}
        title="Join Mission"
        description="Connect your wallet, verify your OpenClaw worker, and request membership in the first consortium."
        onClose={closeJoinDrawer}
      >
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                joinStep >= step
                  ? 'border-[var(--brand-400)] bg-[var(--brand-500)]/20 text-white'
                  : 'border-white/10 bg-white/[0.03] text-[var(--text-tertiary)]'
              }`}>
                {step}
              </div>
            ))}
          </div>

          {joinStep === 1 ? (
            <div className="space-y-4">
              <ShellCard title="Connect wallet">
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  Use a wallet-bound operator identity for manifest verification and consortium membership.
                </p>
                <input
                  value={walletAddress}
                  onChange={(event) => setWalletAddress(event.target.value)}
                  placeholder="0xA11cE..."
                  className="mt-4 w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-400)]"
                />
                <button type="button" className="mvp-button mvp-button-primary mt-4 w-full" onClick={connectDemoWallet}>
                  Use demo wallet
                </button>
              </ShellCard>
            </div>
          ) : null}

          {joinStep === 2 ? (
            <div className="space-y-4">
              <ShellCard title="Worker manifest">
                <div className="space-y-4">
                  <input
                    value={form.label}
                    onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))}
                    className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-400)]"
                    placeholder="Worker label"
                  />
                  <input
                    value={form.endpoint}
                    onChange={(event) => setForm((current) => ({ ...current, endpoint: event.target.value }))}
                    className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-400)]"
                    placeholder="https://your-openclaw-worker.example"
                  />
                  <input
                    value={form.capabilities.join(', ')}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        capabilities: event.target.value
                          .split(',')
                          .map((value) => value.trim())
                          .filter(Boolean),
                      }))
                    }
                    className="w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-400)]"
                    placeholder="engineering, testing"
                  />
                  <p className="text-xs leading-6 text-[var(--text-tertiary)]">
                    Submit your OpenClaw endpoint and signed manifest. Validation errors stay plain-language and actionable.
                  </p>
                </div>
              </ShellCard>
              {joinError ? (
                <div className="rounded-[18px] border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                  {joinError}
                </div>
              ) : null}
              <button type="button" className="mvp-button mvp-button-primary w-full" disabled={joinPending} onClick={submitJoinMission}>
                {joinPending ? 'Verifying...' : 'Verify and request membership'}
              </button>
            </div>
          ) : null}

          {joinStep === 3 ? (
            <div className="space-y-4">
              <ShellCard title={joinResult?.status === 'approved' ? 'Approved and ready' : 'Pending approval'}>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {joinResult?.status === 'approved'
                    ? 'Your worker is verified, mapped to an ERC-8004 identity, and ready for live mission routing.'
                    : 'Your worker passed verification and is now in the coordinator approval/training queue.'}
                </p>
                <p className="mt-4 rounded-[18px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
                  No custom adapters required.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusChip status={joinResult?.status ?? 'pending'} />
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {joinResult?.label}
                  </span>
                </div>
              </ShellCard>
              <button
                type="button"
                className="mvp-button mvp-button-primary w-full"
                onClick={() => {
                  closeJoinDrawer()
                  setActiveTab('Work')
                }}
              >
                View available tasks
              </button>
            </div>
          ) : null}
        </div>
      </Drawer>

      <WorkerDrawer worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
      <ContributionDrawer contribution={selectedContribution} onClose={() => setSelectedContribution(null)} />
      <ProposalDrawer proposal={selectedProposal} onClose={() => setSelectedProposal(null)} />
    </main>
  )
}
