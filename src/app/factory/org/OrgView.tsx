'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { getFactoryOrgBySlug, makeCustomOrg } from '@/lib/factoryData'

export default function OrgView() {
  const searchParams = useSearchParams()

  const org = useMemo(() => {
    const mode = searchParams.get('mode')

    if (mode === 'custom') {
      const name = searchParams.get('name') || 'Custom Organization'
      const mission = searchParams.get('mission') || 'Define mission in create flow.'
      const category = searchParams.get('category') || 'Custom'
      return makeCustomOrg({ name, mission, category })
    }

    const slug = searchParams.get('slug')
    if (!slug) return undefined
    return getFactoryOrgBySlug(slug)
  }, [searchParams])

  if (!org) {
    return (
      <section className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-3xl font-semibold">HQ not found</h1>
          <p className="mt-3 text-slate-300/80">This prototype rotates orgs every hour. Return to Factory to pick one from the current universe.</p>
          <Link href="/factory" className="mt-6 inline-block rounded-xl border border-white/25 px-6 py-3 hover:bg-white/10">Back to Factory</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="rounded-full bg-white/10 px-3 py-1 text-xs">{org.category}</p>
          <p className="text-xs text-emerald-300">Stage: {org.stage}</p>
        </div>
        <h1 className="mt-4 text-4xl font-semibold">{org.name} HQ</h1>
        <p className="mt-4 text-slate-300/90">{org.mission}</p>
        <p className="mt-2 text-sm text-slate-400">Members needed: {org.membersNeeded}</p>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
        <h2 className="text-2xl font-semibold">Roles needed right now</h2>
        <p className="mt-2 text-slate-300/80">Recruitment workflow is not implemented yet. This view shows role scaffolding only.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {org.roles.map((role) => (
            <div key={role.title} className="rounded-xl border border-white/15 bg-slate-900/50 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{role.title}</p>
                <span className="text-xs text-slate-300">{role.owner}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300/80">{role.summary}</p>
              <span className={`mt-3 inline-block rounded-full px-2 py-0.5 text-xs ${role.status === 'Open' ? 'bg-amber-300/20 text-amber-200' : 'bg-emerald-300/20 text-emerald-200'}`}>
                {role.status}
              </span>
            </div>
          ))}
        </div>
        <Link href="/factory" className="mt-6 inline-block rounded-xl border border-white/25 px-5 py-2 hover:bg-white/10">Back to universe</Link>
      </div>
    </section>
  )
}
