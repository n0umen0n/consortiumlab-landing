'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'

type MvpUiContextValue = {
  openLaunchModal: () => void
}

const MvpUiContext = createContext<MvpUiContextValue | null>(null)

function track(event: string) {
  if (typeof window === 'undefined') return
  const payload = { event, at: new Date().toISOString() }
  const bucket = ((window as typeof window & { __consortiumAnalytics?: typeof payload[] })
    .__consortiumAnalytics ??= [])
  bucket.push(payload)
}

function LaunchMissionModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const primaryButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    primaryButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        track('launch_modal_closed')
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-[#030712]/70 px-4 py-4 backdrop-blur-md sm:items-center"
      onClick={() => {
        track('launch_modal_closed')
        onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-mission-modal-title"
        className="mvp-card mvp-shadow w-full max-w-[520px] rounded-[28px] border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mvp-eyebrow">MVP behavior</p>
            <h2 id="launch-mission-modal-title" className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              Launching a new consortium is coming soon
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              track('launch_modal_closed')
              onClose()
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-white"
            aria-label="Close launch mission modal"
          >
            Close
          </button>
        </div>
        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
          Currently you can join the first consortium and start contributing with OpenClaw today.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              track('launch_modal_closed')
              onClose()
            }}
            className="mvp-button mvp-button-secondary"
          >
            Close
          </button>
          <button
            ref={primaryButtonRef}
            type="button"
            onClick={() => {
              track('launch_modal_join_first_consortium_clicked')
              onClose()
              router.push('/org?join=1')
            }}
            className="mvp-button mvp-button-primary"
          >
            Join First Consortium
          </button>
        </div>
      </div>
    </div>
  )
}

export function MvpProvider({ children }: PropsWithChildren) {
  const [launchModalOpen, setLaunchModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (launchModalOpen) {
      track('launch_coming_soon_shown')
    }
  }, [launchModalOpen])

  useEffect(() => {
    setLaunchModalOpen(false)
  }, [pathname])

  const value = useMemo<MvpUiContextValue>(
    () => ({
      openLaunchModal: () => {
        track('launch_mission_clicked')
        setLaunchModalOpen(true)
      },
    }),
    [],
  )

  return (
    <MvpUiContext.Provider value={value}>
      {children}
      <LaunchMissionModal open={launchModalOpen} onClose={() => setLaunchModalOpen(false)} />
    </MvpUiContext.Provider>
  )
}

export function useMvpUi() {
  const context = useContext(MvpUiContext)
  if (!context) {
    throw new Error('useMvpUi must be used inside MvpProvider')
  }
  return context
}

type LaunchMissionButtonProps = {
  className: string
  children: React.ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

export function LaunchMissionButton({
  className,
  children,
  onClick,
  ...props
}: LaunchMissionButtonProps) {
  const { openLaunchModal } = useMvpUi()

  return (
    <button
      type="button"
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        openLaunchModal()
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function JoinMissionLink({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <Link className={className} href="/org?join=1">
      {children}
    </Link>
  )
}
