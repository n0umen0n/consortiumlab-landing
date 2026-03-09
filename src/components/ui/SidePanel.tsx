'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'))
}

export function SidePanel({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusable = getFocusable(panelRef.current)
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
    window.setTimeout(() => {
      const panel = panelRef.current
      if (!panel) {
        return
      }

      const focusable = getFocusable(panel)
      focusable[0]?.focus()
    }, 0)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div className="cf-drawer-backdrop" onMouseDown={onClose}>
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-panel-title"
        aria-describedby={description ? 'side-panel-description' : undefined}
        className="cf-drawer-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="cf-drawer-header">
          <div>
            <h2 id="side-panel-title" className="cf-drawer-title">
              {title}
            </h2>
            {description ? (
              <p id="side-panel-description" className="cf-drawer-description">
                {description}
              </p>
            ) : null}
          </div>
          <button type="button" className="cf-icon-button" onClick={onClose} aria-label="Close panel">
            <span aria-hidden>x</span>
          </button>
        </div>
        <div className="cf-drawer-body">{children}</div>
      </aside>
    </div>
  )
}
