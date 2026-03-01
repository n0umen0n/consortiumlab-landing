export interface OrgRole {
  title: string
  owner: 'Human' | 'Agent'
  status: 'Open' | 'Filled'
  summary: string
}

export interface FactoryOrg {
  slug: string
  name: string
  category: string
  mission: string
  stage: 'Idea' | 'Building' | 'Live'
  createdAt: string
  membersNeeded: number
  roles: OrgRole[]
}

const ideaPool = [
  { name: 'Local AI Permit Copilot', category: 'GovTech', mission: 'Help small cities auto-process permits and service requests with AI workflows.' },
  { name: 'Climate Retrofit Collective', category: 'Climate', mission: 'Coordinate neighborhood-level home energy retrofits with pooled financing.' },
  { name: 'Open Health Triage Desk', category: 'Health', mission: 'Provide multilingual pre-triage guidance and routing to clinics.' },
  { name: 'SMB Cashflow Guardian', category: 'Fintech', mission: 'Forecast and automate cashflow rescue plans for small businesses.' },
  { name: 'Ethical Synthetic Media Lab', category: 'Media', mission: 'Create watermark-first synthetic media tools for creators and newsrooms.' },
  { name: 'Supply Chain Trace Grid', category: 'Logistics', mission: 'Track provenance for food and medicine with verifiable checkpoints.' },
  { name: 'Learning Pods Network', category: 'Education', mission: 'Spin up neighborhood learning pods with AI tutors and peer mentors.' },
  { name: 'Microgrid Operators Guild', category: 'Energy', mission: 'Coordinate microgrid operators for local resilience and market participation.' },
  { name: 'Circular Packaging Exchange', category: 'Commerce', mission: 'Match brands with reusable packaging loops and reverse logistics.' },
  { name: 'Aging-in-Place Companion', category: 'Care', mission: 'Support independent seniors with care coordination and monitoring.' },
  { name: 'B2B Agent Compliance Desk', category: 'Security', mission: 'Automate vendor compliance checks and audit-ready policy evidence.' },
  { name: 'Public Grant Matchmaker', category: 'Civic', mission: 'Find and draft grant applications for mission-driven startups and orgs.' },
]

const roleBlueprint = [
  { title: 'Vision Agent', owner: 'Agent' as const, summary: 'Maintains mission and strategic priorities with operator input.' },
  { title: 'AR Agent', owner: 'Agent' as const, summary: 'Defines and tracks role requirements; interviews are disabled in this build.' },
  { title: 'Treasury Agent', owner: 'Agent' as const, summary: 'Tracks budget envelopes and spending boundaries.' },
  { title: 'Comms Agent', owner: 'Agent' as const, summary: 'Publishes updates and keeps contributor channels active.' },
  { title: 'Operator', owner: 'Human' as const, summary: 'Sets mission constraints, approves high-risk decisions.' },
  { title: 'Product Builder', owner: 'Human' as const, summary: 'Builds first product iteration and validates user needs.' },
]

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function rotate<T>(items: T[], offset: number) {
  const n = items.length
  const normalized = ((offset % n) + n) % n
  return items.slice(normalized).concat(items.slice(0, normalized))
}

function getCurrentHourSeed(now: Date) {
  return Math.floor(now.getTime() / (1000 * 60 * 60))
}

export function generateAutomatedOrgs(now = new Date(), count = 10): FactoryOrg[] {
  const seed = getCurrentHourSeed(now)
  const ideas = rotate(ideaPool, seed).slice(0, count)

  return ideas.map((idea, index) => {
    const stage: FactoryOrg['stage'] = index % 3 === 0 ? 'Live' : index % 2 === 0 ? 'Building' : 'Idea'
    return {
      slug: `${slugify(idea.name)}-${(seed + index).toString(36)}`,
      name: idea.name,
      category: idea.category,
      mission: idea.mission,
      stage,
      createdAt: now.toISOString(),
      membersNeeded: 3 + (index % 4),
      roles: roleBlueprint.map((role, roleIndex) => ({
        ...role,
        status: roleIndex < 2 ? 'Filled' : 'Open',
      })),
    }
  })
}

export function getFactoryOrgBySlug(slug: string, now = new Date()): FactoryOrg | undefined {
  return generateAutomatedOrgs(now).find((org) => org.slug === slug)
}

export function makeCustomOrg(input: { name: string; mission: string; category?: string }): FactoryOrg {
  const now = new Date()
  return {
    slug: `${slugify(input.name)}-custom`,
    name: input.name,
    category: input.category || 'Custom',
    mission: input.mission,
    stage: 'Building',
    createdAt: now.toISOString(),
    membersNeeded: 5,
    roles: roleBlueprint.map((role) => ({ ...role, status: role.title === 'Operator' ? 'Filled' : 'Open' })),
  }
}
