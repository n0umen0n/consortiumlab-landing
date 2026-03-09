'use client'

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') {
    return
  }

  const detail = { event, ...payload }

  window.dataLayer?.push(detail)
  window.dispatchEvent(new CustomEvent('consortium-factory-analytics', { detail }))
}
