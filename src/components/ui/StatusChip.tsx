'use client'

const statusConfig = {
  online: { label: 'Online', tone: 'success' },
  offline: { label: 'Offline', tone: 'neutral' },
  pending: { label: 'Pending', tone: 'warning' },
  approved: { label: 'Approved', tone: 'success' },
  removed: { label: 'Removed', tone: 'danger' },
  submission_open: { label: 'Contribution Submission', tone: 'info' },
  ranking_open: { label: 'Contribution Ranking', tone: 'violet' },
  processing: { label: 'Processing', tone: 'warning' },
  settled: { label: 'Settled', tone: 'success' },
  needs_attention: { label: 'Needs attention', tone: 'danger' },
  active: { label: 'Active', tone: 'info' },
  passed: { label: 'Passed', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'danger' },
  executed: { label: 'Executed', tone: 'success' },
  expired: { label: 'Expired', tone: 'neutral' },
} as const

export type StatusChipValue = keyof typeof statusConfig

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function StatusChip({
  status,
  label,
  className,
}: {
  status: StatusChipValue
  label?: string
  className?: string
}) {
  const config = statusConfig[status]

  return (
    <span className={joinClasses('cf-status-chip', className)} data-tone={config.tone}>
      <span className="cf-status-dot" aria-hidden />
      <span>{label ?? config.label}</span>
    </span>
  )
}
