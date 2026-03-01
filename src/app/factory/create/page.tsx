'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { makeCustomOrg } from '@/lib/factoryData'

export default function FactoryCreatePage() {
  const [name, setName] = useState('')
  const [mission, setMission] = useState('')
  const [category, setCategory] = useState('')

  const preview = useMemo(() => {
    if (!name.trim() || !mission.trim()) return null
    return makeCustomOrg({ name, mission, category })
  }, [name, mission, category])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">Architect View</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Create your organization HQ</h1>
          <p className="mt-3 text-slate-300/80">
            Define your mission, then the app scaffolds the core roles and HQ structure. Recruitment flow is intentionally disabled in this first version.
          </p>

          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm">
              Organization name
              <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 outline-none focus:border-sky-300" placeholder="e.g. Ocean Cleanup Ops" />
            </label>
            <label className="grid gap-2 text-sm">
              Mission
              <textarea value={mission} onChange={(e) => setMission(e.target.value)} className="min-h-28 rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 outline-none focus:border-sky-300" placeholder="What is this org trying to accomplish?" />
            </label>
            <label className="grid gap-2 text-sm">
              Category (optional)
              <input value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 outline-none focus:border-sky-300" placeholder="Climate, Health, Finance..." />
            </label>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
          <h2 className="text-2xl font-semibold">HQ Preview</h2>
          {!preview ? (
            <p className="mt-4 text-slate-300/70">Enter a name + mission to generate your roles and HQ layout.</p>
          ) : (
            <>
              <p className="mt-3 text-slate-300/85"><span className="font-medium text-white">{preview.name}</span> — {preview.mission}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {preview.roles.map((role) => (
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
              <Link href={{ pathname: '/factory/org', query: { mode: 'custom', name: preview.name, mission: preview.mission, category: preview.category } }} className="mt-6 inline-block rounded-xl border border-sky-200/60 bg-sky-300/20 px-6 py-3 font-medium hover:bg-sky-300/30">
                Open generated HQ
              </Link>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
