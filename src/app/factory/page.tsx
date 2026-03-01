'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { generateAutomatedOrgs, type FactoryOrg } from '@/lib/factoryData'

export default function FactoryHomePage() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  const orgs = useMemo<FactoryOrg[]>(() => generateAutomatedOrgs(now, 10), [now])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(196,181,253,0.15),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">Consortium Factory — Prototype</p>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">The cloud of organizations</h1>
            <p className="mt-4 max-w-3xl text-slate-200/80">
              Explore active org HQs or create your own. This first version focuses on UI and seeded content only — recruitment + backend systems come next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/factory/create" className="rounded-xl border border-sky-200/60 bg-sky-300/20 px-6 py-3 font-medium hover:bg-sky-300/30">
                Create New Consortium
              </Link>
              <a href="#org-list" className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-medium hover:bg-white/20">
                Explore Universe
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-300/70">Automation: every hour the app rotates in 10 newly generated organizations relevant to current trends.</p>
          </div>
        </div>
      </section>

      <section id="org-list" className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Current organizations ({orgs.length})</h2>
            <span className="text-xs text-slate-400">Refreshed seed: {now.toLocaleString()}</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {orgs.map((org) => (
              <article key={org.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{org.category}</span>
                  <span className="text-xs text-emerald-300">{org.stage}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{org.name}</h3>
                <p className="mt-3 min-h-20 text-sm text-slate-300/85">{org.mission}</p>
                <p className="mt-4 text-sm text-slate-400">Open roles: {org.roles.filter((role) => role.status === 'Open').length}</p>
                <Link href={`/factory/org?slug=${org.slug}`} className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
                  Open HQ
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
