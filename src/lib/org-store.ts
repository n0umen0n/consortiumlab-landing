export type OrganizationRole = {
  title: string
  focus: string
  urgency: 'high' | 'medium'
}

export type Organization = {
  id: string
  name: string
  mission: string
  idea: string
  createdAt: string
  source: 'generated' | 'custom'
  roles: OrganizationRole[]
}

type IdeaTemplate = {
  name: string
  idea: string
  mission: string
  roles: OrganizationRole[]
}

const IDEA_POOL: IdeaTemplate[] = [
  { name: 'ClimateGrid', idea: 'Coordinate neighborhood-level battery sharing for grid resilience.', mission: 'Build autonomous microgrid communities that keep cities online during outages.', roles: [ { title: 'Energy Dispatch Agent', focus: 'Balances local battery load in real time', urgency: 'high' }, { title: 'Partnerships Operator', focus: 'Onboards municipalities and utilities', urgency: 'high' }, { title: 'Regulatory Analyst', focus: 'Tracks permitting and compliance updates', urgency: 'medium' } ] },
  { name: 'MedChain Relay', idea: 'Automate medical supply routing during regional shortages.', mission: 'Reduce emergency supply delays with predictive logistics for clinics.', roles: [ { title: 'Routing Intelligence Agent', focus: 'Optimizes delivery paths and timing', urgency: 'high' }, { title: 'Hospital Success Lead', focus: 'Maintains relationships with hospitals', urgency: 'high' }, { title: 'Data Integrity Steward', focus: 'Verifies inventory and usage records', urgency: 'medium' } ] },
  { name: 'CivicSignal', idea: 'Summarize city policy proposals for residents in plain language.', mission: 'Increase civic participation through AI-assisted policy explainers.', roles: [ { title: 'Policy Research Agent', focus: 'Reads and summarizes policy drafts', urgency: 'high' }, { title: 'Community Editor', focus: 'Ensures local relevance and neutrality', urgency: 'medium' }, { title: 'Distribution Lead', focus: 'Publishes updates to social channels', urgency: 'medium' } ] },
  { name: 'HydraFarm OS', idea: 'Coordinate indoor farms for urban food supply reliability.', mission: 'Create a resilient network of hyperlocal food production hubs.', roles: [ { title: 'Crop Planning Agent', focus: 'Forecasts demand and harvest cycles', urgency: 'high' }, { title: 'IoT Systems Engineer', focus: 'Maintains sensor-driven cultivation controls', urgency: 'high' }, { title: 'Retail Partnerships Manager', focus: 'Secures local distribution channels', urgency: 'medium' } ] },
  { name: 'OpenTutor League', idea: 'Build adaptive education assistants for underserved learners.', mission: 'Provide personalized tutoring agents accessible in any language.', roles: [ { title: 'Learning Science Lead', focus: 'Designs evidence-based curriculum loops', urgency: 'high' }, { title: 'Multilingual Content Agent', focus: 'Creates localized lesson variants', urgency: 'high' }, { title: 'Mentor Community Manager', focus: 'Coordinates human tutor backstops', urgency: 'medium' } ] },
  { name: 'PatchLink Health', idea: 'Continuous remote monitoring for chronic care patients.', mission: 'Enable preventative care with trusted at-home health data.', roles: [ { title: 'Clinical Ops Agent', focus: 'Flags intervention thresholds', urgency: 'high' }, { title: 'Device Reliability Engineer', focus: 'Keeps wearables and data streams stable', urgency: 'high' }, { title: 'Care Navigator', focus: 'Supports patient onboarding and retention', urgency: 'medium' } ] },
  { name: 'TrustLedger Newsroom', idea: 'Track origin and edits of AI-assisted journalism.', mission: 'Restore trust in media through transparent source tracing.', roles: [ { title: 'Source Verification Agent', focus: 'Validates claims and citations', urgency: 'high' }, { title: 'Editorial Ethics Lead', focus: 'Reviews fairness and bias risks', urgency: 'medium' }, { title: 'Audience Growth Strategist', focus: 'Drives subscription and community', urgency: 'medium' } ] },
  { name: 'AquaGuard Alliance', idea: 'Monitor water quality with low-cost distributed sensors.', mission: 'Give communities early warning for contamination events.', roles: [ { title: 'Hydrology Data Agent', focus: 'Analyzes sensor and weather signals', urgency: 'high' }, { title: 'Field Deployment Coordinator', focus: 'Expands sensor network coverage', urgency: 'high' }, { title: 'Public Transparency Lead', focus: 'Publishes understandable reports', urgency: 'medium' } ] },
  { name: 'ReUse Fabric', idea: 'Turn textile waste streams into reusable material marketplaces.', mission: 'Reduce landfill impact with circular supply chains.', roles: [ { title: 'Supply Mapping Agent', focus: 'Maps textile waste inventory in real time', urgency: 'high' }, { title: 'Manufacturing Partnerships Lead', focus: 'Onboards reuse manufacturers', urgency: 'high' }, { title: 'Lifecycle Analyst', focus: 'Tracks carbon and waste reduction metrics', urgency: 'medium' } ] },
  { name: 'ShelterSync', idea: 'Coordinate temporary housing and support services during displacement crises.', mission: 'Shorten time to shelter and services for vulnerable families.', roles: [ { title: 'Placement Optimization Agent', focus: 'Matches families to available capacity', urgency: 'high' }, { title: 'Casework Integrations Engineer', focus: 'Connects NGOs and city systems', urgency: 'high' }, { title: 'Volunteer Operations Lead', focus: 'Coordinates rapid response volunteers', urgency: 'medium' } ] },
  { name: 'QuantumParts Hub', idea: 'Aggregate and route niche semiconductor component inventory.', mission: 'Prevent production downtime by matching scarce component supply globally.', roles: [ { title: 'Procurement Intelligence Agent', focus: 'Predicts shortages and secures alternatives', urgency: 'high' }, { title: 'Vendor Relationship Lead', focus: 'Maintains strategic supplier channels', urgency: 'high' }, { title: 'Quality Assurance Specialist', focus: 'Verifies part provenance and quality', urgency: 'medium' } ] },
  { name: 'Habitat Sentinel', idea: 'Coordinate biodiversity restoration projects with satellite + local data.', mission: 'Scale habitat restoration using autonomous monitoring and grants.', roles: [ { title: 'Restoration Science Agent', focus: 'Prioritizes high-impact restoration zones', urgency: 'high' }, { title: 'Grant Ops Manager', focus: 'Coordinates project funding and reporting', urgency: 'medium' }, { title: 'Community Steward Lead', focus: 'Organizes local volunteers and training', urgency: 'medium' } ] },
]

const CUSTOM_ORGS_KEY = 'consortium-factory-custom-orgs'

function hourStamp(date = new Date()): string {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).toISOString()
}

function hashSeed(value: string): number {
  return Array.from(value).reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function generateHourlyOrganizations(date = new Date()): Organization[] {
  const stamp = hourStamp(date)
  const seed = hashSeed(stamp)

  return Array.from({ length: 10 }, (_, index) => {
    const idea = IDEA_POOL[(seed + index) % IDEA_POOL.length]
    return {
      id: `gen-${stamp}-${index}`,
      name: `${idea.name} ${String((seed + index) % 97).padStart(2, '0')}`,
      idea: idea.idea,
      mission: idea.mission,
      createdAt: new Date(date.getTime() + index * 1000).toISOString(),
      source: 'generated',
      roles: idea.roles,
    }
  })
}

export function getCustomOrganizations(): Organization[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const value = window.localStorage.getItem(CUSTOM_ORGS_KEY)
    if (!value) {
      return []
    }

    return JSON.parse(value) as Organization[]
  } catch {
    return []
  }
}

export function saveCustomOrganization(org: Organization): void {
  if (typeof window === 'undefined') {
    return
  }

  const existing = getCustomOrganizations()
  window.localStorage.setItem(CUSTOM_ORGS_KEY, JSON.stringify([org, ...existing]))
}

export function buildCustomOrganization(input: {
  name: string
  mission: string
  idea: string
  roles: OrganizationRole[]
}): Organization {
  return {
    id: `org-${Date.now()}-${Math.floor(Math.random() * 10_000)}`,
    name: input.name,
    mission: input.mission,
    idea: input.idea,
    roles: input.roles,
    createdAt: new Date().toISOString(),
    source: 'custom',
  }
}

export const SUGGESTED_ROLES: OrganizationRole[] = [
  { title: 'Vision Agent', focus: 'Translates mission into strategic directives', urgency: 'high' },
  { title: 'AR Agent', focus: 'Recruits and manages specialized operators', urgency: 'high' },
  { title: 'Treasury Agent', focus: 'Protects runway and enforces budget policy', urgency: 'high' },
  { title: 'Comms Agent', focus: 'Handles external comms and community updates', urgency: 'medium' },
  { title: 'Research Agent', focus: 'Surfaces market signals and opportunity gaps', urgency: 'medium' },
]
