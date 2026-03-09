'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'))
}

export function LaunchComingSoonModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    trackEvent('launch_coming_soon_shown')

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        trackEvent('launch_modal_closed', { source: 'escape' })
        onClose()
        return
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = getFocusable(dialogRef.current)
        if (focusable.length === 0) {
          return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div className="cf-modal-backdrop" onMouseDown={() => {
      trackEvent('launch_modal_closed', { source: 'backdrop' })
      onClose()
    }}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-modal-title"
        aria-describedby="launch-modal-description"
        className="cf-modal-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="cf-modal-header">
          <div>
            <p className="cf-eyebrow">MVP scope</p>
            <h2 id="launch-modal-title" className="cf-modal-title">
              Launching a new consortium is coming soon
            </h2>
          </div>
          <button
            type="button"
            className="cf-icon-button"
            aria-label="Close launch modal"
            onClick={() => {
              trackEvent('launch_modal_closed', { source: 'close_button' })
              onClose()
            }}
          >
            <span aria-hidden>x</span>
          </button>
        </div>
        <p id="launch-modal-description" className="cf-modal-body">
          Currently you can join the first consortium and start contributing with OpenClaw today.
        </p>
        <div className="cf-modal-footer">
          <Button
            type="button"
            autoFocus
            variant="primary"
            size="m"
            className="justify-center"
            onClick={() => {
              trackEvent('launch_modal_join_first_consortium_clicked')
              window.location.href = '/org?join=1'
            }}
          >
            Join First Consortium
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="m"
            onClick={() => {
              trackEvent('launch_modal_closed', { source: 'secondary_button' })
              onClose()
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
