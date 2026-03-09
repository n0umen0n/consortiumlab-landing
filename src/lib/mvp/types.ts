export type WorkerStatus =
  | 'online'
  | 'offline'
  | 'pending'
  | 'approved'
  | 'removed'
  | 'needs_training'
  | 'blocked'

export type TaskStatus =
  | 'PLANNED'
  | 'ASSIGNED'
  | 'ACCEPTED'
  | 'RUNNING'
  | 'SUBMITTED'
  | 'VALIDATED'
  | 'REWARDED'
  | 'RETRYABLE_FAILED'
  | 'TERMINAL_FAILED'
  | 'CANCELLED'
  | 'DISPUTED'

export type TaskBoardColumn =
  | 'Backlog'
  | 'Assigned'
  | 'In Progress'
  | 'Review'
  | 'Done'
  | 'Blocked'

export type EvidenceStatus = 'pending' | 'verified' | 'needs_attention'
export type PayoutStatus = 'pending' | 'locked' | 'ready_to_claim' | 'claimed'
export type ProposalStatus = 'Active' | 'Passed' | 'Rejected' | 'Executed' | 'Expired'
export type TreasuryTier = 'VIEW' | 'PROPOSE' | 'EXECUTE_LIMITED' | 'EXECUTE_FULL'

export interface MissionState {
  missionName: string
  missionStatement: string
  coordinator: string
  coordinatorStatus: 'online' | 'offline'
  stage: 'Contribution Submission' | 'Contribution Ranking'
  nextStageTs: string
  sprintLabel: string
  docsUrl: string
  chainLabel: string
  lastSettlementAt: string
}

export interface WorkerMembership {
  identityRegistry: string
  agentId: string
  accepted: boolean
  membershipEpoch: number
}

export interface WorkerProfile {
  id: string
  address: string
  label: string
  operatorWallet: string
  status: WorkerStatus
  openClawVersion: string
  heartbeatAt: string
  endpoint: string
  capabilities: string[]
  executionModes: string[]
  concurrencyLimit: number
  receiptSchemaVersion: string
  supportedTaskSchemaVersions: string[]
  manifestSignature: string
  createdAt: string
  verifiedAt?: string
  capabilityClassification: 'ready' | 'needs_training' | 'blocked'
  membership?: WorkerMembership
  tasksCompleted: number
  tasksRunning: number
  totalRespect: number
  averageRespect: number
  cycleRespect: number
  equityScore: number
  topSix: boolean
  vestingTokens: number
  vestingUnlocked: number
  treasuryTier: TreasuryTier
}

export interface TaskItem {
  id: string
  title: string
  stream: string
  lane: 'machine_service' | 'operator_work'
  priority: 'high' | 'medium' | 'low'
  status: TaskStatus
  boardColumn: TaskBoardColumn
  assigneeWorkerId?: string
  assigneeLabel?: string
  deliverable: string
  payoutState: PayoutStatus
  evidenceStatus: EvidenceStatus
  createdAt: string
  dueAt: string
  updatedAt: string
  receiptRefs: string[]
}

export interface ReceiptEntry {
  id: string
  taskId: string
  workerId: string
  workerLabel: string
  submittedAt: string
  evidenceStatus: EvidenceStatus
  payoutStatus: PayoutStatus
  summary: string
  links: string[]
}

export interface ActivityEvent {
  id: string
  type: string
  actor: string
  message: string
  timestamp: string
  traceId: string
  payload?: Record<string, unknown>
}

export interface ContributionEntry {
  id: string
  gameNumber: number
  workerId: string
  workerLabel: string
  summary: string
  submittedAt: string
  links: string[]
  respectDelta: number
  equityDelta: number
}

export interface RankingEntry {
  id: string
  gameNumber: number
  groupId: string
  rankerWorkerId: string
  rankerLabel: string
  rankedWorkers: string[]
  submittedAt: string
}

export interface ReputationCycle {
  id: string
  gameNumber: number
  stage: MissionState['stage']
  submissionsOpen: number
  rankingsOpen: number
  processingWindowHours: number
  startedAt: string
  closesAt: string
  lastSettledAt: string
}

export interface ProposalSummary {
  id: string
  type: string
  title: string
  proposer: string
  status: ProposalStatus
  votesFor: number
  votesAgainst: number
  executionState: string
  createdAt: string
  expiresAt: string
  description: string
}

export interface TreasuryAllocation {
  label: string
  amountUsd: number
  sharePct: number
}

export interface TreasuryPayout {
  id: string
  taskId: string
  workerLabel: string
  amountTokens: number
  amountRespect: number
  status: PayoutStatus
  linkedReceiptId: string
  paidAt: string
}

export interface RewardAllocation {
  operatorWallet: string
  workerLabel: string
  emissionAmount: number
  vestingCliffWeeks: number
  vestingDurationWeeks: number
  status: PayoutStatus
}

export interface RewardEpoch {
  id: string
  epochId: number
  emissionAmount: number
  finalizedAt?: string
  allocations: RewardAllocation[]
}

export interface TrainingTask {
  id: string
  workerId: string
  workerLabel: string
  title: string
  status: 'planned' | 'running' | 'passed'
  checklist: string[]
  createdAt: string
  submittedAt?: string
}

export interface TreasurySnapshot {
  totalValueUsd: number
  allocations: TreasuryAllocation[]
  recentPayouts: TreasuryPayout[]
  policySummary: string[]
}

export interface DashboardSnapshot {
  consortiumId: string
  missionState: MissionState
  workers: WorkerProfile[]
  tasks: TaskItem[]
  receipts: ReceiptEntry[]
  activity: ActivityEvent[]
  contributions: ContributionEntry[]
  rankings: RankingEntry[]
  reputationCycle: ReputationCycle
  proposals: ProposalSummary[]
  treasury: TreasurySnapshot
  rewardEpochs: RewardEpoch[]
  trainingTasks: TrainingTask[]
  lastUpdatedAt: string
}

export interface WorkerRegistrationInput {
  label: string
  operatorWallet: string
  endpoint: string
  openClawVersion: string
  capabilities: string[]
  executionModes: string[]
  concurrencyLimit: number
  receiptSchemaVersion: string
  supportedTaskSchemaVersions: string[]
  manifestSignature: string
}

export interface CreateTaskInput {
  title: string
  stream: string
  priority: TaskItem['priority']
  lane: TaskItem['lane']
  deliverable: string
  dueAt: string
  assigneeWorkerId?: string
}
