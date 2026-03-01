'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Organization, generateHourlyOrganizations, getCustomOrganizations } from '@/lib/org-store'

export default function HomePage() {
  const [generatedOrgs, setGeneratedOrgs] = useState<Organization[]>([])
  const [customOrgs, setCustomOrgs] = useState<Organization[]>([])

  useEffect(() => {
    const update = () => {
      setGeneratedOrgs(generateHourlyOrganizations(new Date()))
      setCustomOrgs(getCustomOrganizations())
    }

    update()
    const intervalId = window.setInterval(update, 60 * 60 * 1000)
    window.addEventListener('focus', update)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', update)
    }
  }, [])

  const organizations = useMemo(() => [...customOrgs, ...generatedOrgs], [customOrgs, generatedOrgs])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <header className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Consortium Factory</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">The cloud HQ for mission-driven organizations.</h1>
          <p className="mt-4 max-w-3xl text-slate-300">Launch your own organization or join one already operating in the network.</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/create" className="rounded-full border border-cyan-300/60 bg-cyan-300/10 px-6 py-3 font-medium text-cyan-100 transition hover:bg-cyan-300/20">Create New Consortium</Link>
            <a href="#explore" className="rounded-full border border-white/25 bg-white/5 px-6 py-3 font-medium transition hover:bg-white/10">Explore Universe</a>
          </div>
          <p className="mt-4 text-xs text-slate-400">Automation active in UI: every hour this page refreshes 10 generated organizations with current-time business ideas.</p>
        </header>

        <section id="explore" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Organization Universe</h2>
            <p className="text-sm text-slate-400">{organizations.length} total HQs available</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {organizations.map((org) => (
              <article key={org.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{org.name}</h3>
                  <span className="rounded-full border border-white/15 px-2 py-1 text-xs text-slate-300">{org.source === 'generated' ? 'Auto-generated' : 'Custom'}</span>
                </div>
                <p className="line-clamp-2 text-sm text-slate-300">{org.idea}</p>
                <p className="mt-3 text-xs text-slate-400">Roles needed: {org.roles.map((role) => role.title).join(', ')}</p>
                <Link href={`/hq?id=${org.id}`} className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/10">Enter HQ</Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
