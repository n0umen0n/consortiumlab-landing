import { getDashboardSnapshot } from '@/lib/mvp/state'
import OrgExperience from '@/components/mvp/OrgExperience'

export const dynamic = 'force-dynamic'

export default async function OrgPage() {
  const initialData = await getDashboardSnapshot()

  return <OrgExperience initialData={initialData} />
}
