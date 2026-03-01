'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { generateHourlyOrganizations, getCustomOrganizations } from '@/lib/org-store'

export default function HqClient() {
  const searchParams = useSearchParams()

  const org = useMemo(() => {
    const id = searchParams.get('id')
    const organizations = [...getCustomOrganizations(), ...generateHourlyOrganizations(new Date())]
    return organizations.find((item) => item.id === id)
  }, [searchParams])

  if (!org) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
        <section className="max-w-lg rounded-3xl border border-white/15 bg-white/[0.05] p-8 text-center">
          <h1 className="text-2xl font-semibold">HQ not found</h1>
          <p className="mt-3 text-slate-300">This org may have expired from hourly generation. Try selecting another one from the homepage.</p>
          <Link href="/" className="mt-5 inline-block rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Back to homepage</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Link href="/" className="w-fit rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">← Back to homepage</Link>

        <header className="rounded-3xl border border-white/15 bg-white/[0.05] p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-4xl font-semibold">{org.name} HQ</h1>
            <span className="rounded-full border border-white/15 px-3 py-1 text-sm text-slate-300">{org.source === 'generated' ? 'Generated idea' : 'Your consortium'}</span>
          </div>
          <p className="mt-4 max-w-4xl text-slate-300">{org.mission}</p>
          <p className="mt-3 text-sm text-cyan-200">Current opportunity: {org.idea}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {org.roles.map((role) => (
            <article key={role.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{role.title}</h2>
                <span className={`rounded-full px-2 py-1 text-xs ${role.urgency === 'high' ? 'bg-rose-400/20 text-rose-200' : 'bg-amber-300/20 text-amber-100'}`}>{role.urgency} urgency</span>
              </div>
              <p className="text-sm text-slate-300">{role.focus}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold">Live feed (placeholder)</h3>
          <p className="mt-2 text-sm text-slate-300">Recruitment/interview mechanics are intentionally not built yet. This area is reserved for future agent execution logs.</p>
        </section>
      </div>
    </main>
  )
}
