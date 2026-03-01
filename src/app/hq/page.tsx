import { Suspense } from 'react'
import HqClient from './HqClient'

export default function HqPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">Loading HQ...</main>}>
      <HqClient />
    </Suspense>
  )
}
