import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OrgView from './OrgView'

export default function FactoryOrgPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Suspense fallback={<section className="mx-auto max-w-5xl px-6 pt-28 pb-20 text-slate-300">Loading HQ...</section>}>
        <OrgView />
      </Suspense>
      <Footer />
    </main>
  )
}
