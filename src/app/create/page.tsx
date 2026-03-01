'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { SUGGESTED_ROLES, buildCustomOrganization, saveCustomOrganization } from '@/lib/org-store'

export default function CreatePage() {
  const router = useRouter()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const name = String(formData.get('name') || '').trim()
    const mission = String(formData.get('mission') || '').trim()
    const idea = String(formData.get('idea') || '').trim()
    const selectedRoles = SUGGESTED_ROLES.filter((role) => formData.get(role.title) === 'on')

    if (!name || !mission || !idea || selectedRoles.length === 0) {
      return
    }

    const org = buildCustomOrganization({ name, mission, idea, roles: selectedRoles })
    saveCustomOrganization(org)
    router.push(`/hq?id=${org.id}`)
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr,1.1fr]">
        <section className="rounded-3xl border border-white/15 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Consortium Creator</p>
          <h1 className="mt-3 text-3xl font-semibold">Set up your HQ in one flow</h1>
          <p className="mt-3 text-slate-300">Start from a mission, choose needed roles, and instantly launch a prototype HQ. Recruitment flow is intentionally omitted in this phase.</p>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/[0.04] p-6">
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Organization name</span>
              <input name="name" required className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 outline-none ring-cyan-300/50 focus:ring" placeholder="Example: Frontier Robotics Guild" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Mission</span>
              <textarea name="mission" required rows={3} className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 outline-none ring-cyan-300/50 focus:ring" placeholder="What is this organization trying to build?" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Current opportunity / idea</span>
              <textarea name="idea" required rows={2} className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 outline-none ring-cyan-300/50 focus:ring" placeholder="Describe the current opportunity others can join." />
            </label>

            <div>
              <p className="mb-2 text-sm text-slate-300">Roles needed now</p>
              <div className="space-y-2">
                {SUGGESTED_ROLES.map((role) => (
                  <label key={role.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <input type="checkbox" name={role.title} defaultChecked={role.urgency === 'high'} className="mt-1" />
                    <span>
                      <span className="block font-medium">{role.title}</span>
                      <span className="text-sm text-slate-400">{role.focus}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="rounded-full border border-cyan-300/60 bg-cyan-300/10 px-6 py-3 font-medium text-cyan-100 transition hover:bg-cyan-300/20">Deploy Consortium HQ</button>
          </form>
        </section>
      </div>
    </main>
  )
}
