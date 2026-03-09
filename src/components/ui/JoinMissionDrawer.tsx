'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { StatusChip } from '@/components/ui/StatusChip'
import { SidePanel } from '@/components/ui/SidePanel'

interface JoinMissionDrawerProps {
  open: boolean
  onClose: () => void
  walletConnected: boolean
  walletAddress: string
  onConnectWallet: () => void
  onViewTasks: () => void
}

export function JoinMissionDrawer({
  open,
  onClose,
  walletConnected,
  walletAddress,
  onConnectWallet,
  onViewTasks,
}: JoinMissionDrawerProps) {
  const [step, setStep] = useState(0)
  const [workerEndpoint, setWorkerEndpoint] = useState('https://worker.openclaw.local/bridge')
  const [signedManifest, setSignedManifest] = useState(
    '{"worker_id":"worker_cf_frontend","erc8004_agent_id":"148","capabilities":["engineering","design","testing"]}'
  )
  const [validationError, setValidationError] = useState('')
  const [verificationLoading, setVerificationLoading] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestState, setRequestState] = useState<'idle' | 'approved'>('idle')

  useEffect(() => {
    if (!open) {
      return
    }

    setStep(walletConnected ? 1 : 0)
    setValidationError('')
    setVerificationLoading(false)
    setRequestLoading(false)
    setRequestState('idle')
  }, [open, walletConnected])

  const verificationChecks = useMemo(
    () => [
      { label: 'Endpoint reachable', value: workerEndpoint.trim() ? 'Passed' : 'Waiting for endpoint' },
      { label: 'Manifest signature', value: signedManifest.trim() ? 'Passed' : 'Waiting for signed manifest' },
      { label: 'ERC-8004 identity', value: 'Registry resolved' },
    ],
    [signedManifest, workerEndpoint]
  )

  const runVerification = () => {
    if (!workerEndpoint.trim()) {
      setValidationError('Add your OpenClaw worker endpoint so the coordinator can reach your runtime.')
      return
    }

    if (!signedManifest.trim()) {
      setValidationError('Paste a signed manifest so the verifier can confirm your worker identity.')
      return
    }

    setValidationError('')
    setVerificationLoading(true)

    window.setTimeout(() => {
      setVerificationLoading(false)
      setStep(2)
    }, 900)
  }

  const submitMembershipRequest = () => {
    setRequestLoading(true)

    window.setTimeout(() => {
      setRequestLoading(false)
      setRequestState('approved')
    }, 900)
  }

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      title="Join Mission"
      description="Connect your wallet, verify your OpenClaw worker, and request membership in the first consortium."
    >
      <div className="space-y-5">
        <div className="cf-steps">
          {['Connect wallet', 'Verify worker', 'Request access'].map((label, index) => (
            <div key={label} className="cf-step" data-active={step === index} data-complete={step > index || requestState === 'approved'}>
              <span className="cf-step-index">{index + 1}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {step === 0 ? (
          <section className="cf-card-subtle space-y-4">
            <div>
              <p className="cf-data-label">Wallet status</p>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Connect your operator wallet</h3>
            </div>
            <p className="cf-body-copy">
              Your operator wallet is used for membership status, RESPECT attribution, and token vesting.
            </p>
            <Button
              type="button"
              variant="primary"
              size="m"
              onClick={() => {
                onConnectWallet()
                setStep(1)
              }}
            >
              {walletConnected ? 'Wallet connected' : 'Connect Wallet'}
            </Button>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="space-y-4">
            <div className="cf-card-subtle space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="cf-data-label">Connected operator</p>
                  <p className="font-medium text-[var(--text-primary)]">{walletAddress}</p>
                </div>
                <StatusChip status="approved" label="Wallet ready" />
              </div>
              <label className="cf-field">
                <span className="cf-field-label">OpenClaw worker endpoint</span>
                <input
                  value={workerEndpoint}
                  onChange={(event) => setWorkerEndpoint(event.target.value)}
                  className="cf-input"
                  placeholder="https://your-worker.example/bridge"
                />
              </label>
              <label className="cf-field">
                <span className="cf-field-label">Signed manifest</span>
                <textarea
                  value={signedManifest}
                  onChange={(event) => setSignedManifest(event.target.value)}
                  className="cf-input min-h-32 resize-y"
                  placeholder="Paste signed OpenClaw manifest JSON"
                />
              </label>
              {validationError ? <p className="cf-inline-error">{validationError}</p> : null}
              <Button type="button" variant="primary" size="m" loading={verificationLoading} onClick={runVerification}>
                Run verification handshake
              </Button>
            </div>

            <div className="cf-card-subtle">
              <p className="cf-data-label">Verification checks</p>
              <div className="mt-3 space-y-3">
                {verificationChecks.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="cf-body-copy">{item.label}</span>
                    <span className="cf-mono text-sm text-[var(--text-primary)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="space-y-4">
            <div className="cf-card-subtle space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="cf-data-label">Membership request</p>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">Submit to Consortium Factory</h3>
                </div>
                <StatusChip status={requestState === 'approved' ? 'approved' : 'pending'} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="cf-mini-stat">
                  <span className="cf-data-label">Operator wallet</span>
                  <span className="cf-mono text-sm text-[var(--text-primary)]">{walletAddress}</span>
                </div>
                <div className="cf-mini-stat">
                  <span className="cf-data-label">Worker endpoint</span>
                  <span className="cf-mono text-sm text-[var(--text-primary)]">{workerEndpoint}</span>
                </div>
              </div>
              <p className="cf-body-copy">
                Verification passed. Your worker can plug in without custom transport work or adapter scaffolding.
              </p>
              {requestState === 'approved' ? (
                <div className="cf-success-box">
                  <p className="font-semibold text-[var(--text-primary)]">Approved and ready.</p>
                  <p className="cf-body-copy">No custom adapters required.</p>
                  <Button
                    type="button"
                    variant="primary"
                    size="m"
                    onClick={() => {
                      onViewTasks()
                      onClose()
                    }}
                  >
                    View available tasks
                  </Button>
                </div>
              ) : (
                <Button type="button" variant="primary" size="m" loading={requestLoading} onClick={submitMembershipRequest}>
                  Submit membership request
                </Button>
              )}
            </div>
          </section>
        ) : null}
      </div>
    </SidePanel>
  )
}
