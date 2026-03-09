import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import type {
  ActivityEvent,
  ContributionEntry,
  CreateTaskInput,
  DashboardSnapshot,
  PayoutStatus,
  RankingEntry,
  RewardAllocation,
  RewardEpoch,
  TaskBoardColumn,
  TaskItem,
  TrainingTask,
  TreasuryTier,
  WorkerProfile,
  WorkerRegistrationInput,
} from '@/lib/mvp/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const STATE_FILE = path.join(DATA_DIR, 'consortium-factory-mvp.json')
const CONSORTIUM_ID = 'consortium_factory_mvp'
const NOW = Date.now()

function isoFromNow(hoursFromNow: number) {
  return new Date(NOW + hoursFromNow * 60 * 60 * 1000).toISOString()
}

function eventId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`
}

function buildDefaultState(): DashboardSnapshot {
  const workers: WorkerProfile[] = [
    {
      id: 'worker_orbit',
      address: '0x62B7...A14C',
      label: 'Orbit Forge',
      operatorWallet: '0x62B7F09Aa5f1c34090d2E6054c6A97bdDe12A14C',
      status: 'approved',
      openClawVersion: '1.7.2',
      heartbeatAt: isoFromNow(-0.2),
      endpoint: 'https://orbit.example/openclaw',
      capabilities: ['engineering', 'testing', 'specialized'],
      executionModes: ['autonomous', 'pairing'],
      concurrencyLimit: 4,
      receiptSchemaVersion: '2026-03',
      supportedTaskSchemaVersions: ['v1', 'v1.1'],
      manifestSignature: 'sig_orbit_20260309',
      createdAt: isoFromNow(-240),
      verifiedAt: isoFromNow(-236),
      capabilityClassification: 'ready',
      membership: {
        identityRegistry: 'base:8453:0x8004000000000000000000000000000000000001',
        agentId: '401',
        accepted: true,
        membershipEpoch: 7,
      },
      tasksCompleted: 0,
      tasksRunning: 0,
      totalRespect: 248,
      averageRespect: 62,
      cycleRespect: 44,
      equityScore: 31,
      topSix: false,
      vestingTokens: 18250,
      vestingUnlocked: 2800,
      treasuryTier: 'EXECUTE_LIMITED',
    },
    {
      id: 'worker_canvas',
      address: '0x9D31...7e98',
      label: 'Canvas Relay',
      operatorWallet: '0x9D3185F36B95B62230dB8d57a0f25Db8441d7e98',
      status: 'approved',
      openClawVersion: '1.7.1',
      heartbeatAt: isoFromNow(-1.2),
      endpoint: 'https://canvas.example/openclaw',
      capabilities: ['design', 'product', 'marketing'],
      executionModes: ['autonomous', 'review'],
      concurrencyLimit: 3,
      receiptSchemaVersion: '2026-03',
      supportedTaskSchemaVersions: ['v1'],
      manifestSignature: 'sig_canvas_20260309',
      createdAt: isoFromNow(-216),
      verifiedAt: isoFromNow(-214),
      capabilityClassification: 'ready',
      membership: {
        identityRegistry: 'base:8453:0x8004000000000000000000000000000000000001',
        agentId: '402',
        accepted: true,
        membershipEpoch: 7,
      },
      tasksCompleted: 0,
      tasksRunning: 0,
      totalRespect: 221,
      averageRespect: 55,
      cycleRespect: 36,
      equityScore: 28,
      topSix: false,
      vestingTokens: 16120,
      vestingUnlocked: 2100,
      treasuryTier: 'PROPOSE',
    },
    {
      id: 'worker_quill',
      address: '0x73f2...bb10',
      label: 'Quill Stack',
      operatorWallet: '0x73f2919835Ff62cD85870E6a43828F1d55c6bb10',
      status: 'approved',
      openClawVersion: '1.6.9',
      heartbeatAt: isoFromNow(-0.6),
      endpoint: 'https://quill.example/openclaw',
      capabilities: ['engineering', 'project-management'],
      executionModes: ['autonomous'],
      concurrencyLimit: 5,
      receiptSchemaVersion: '2026-03',
      supportedTaskSchemaVersions: ['v1'],
      manifestSignature: 'sig_quill_20260309',
      createdAt: isoFromNow(-192),
      verifiedAt: isoFromNow(-188),
      capabilityClassification: 'ready',
      membership: {
        identityRegistry: 'base:8453:0x8004000000000000000000000000000000000001',
        agentId: '403',
        accepted: true,
        membershipEpoch: 7,
      },
      tasksCompleted: 0,
      tasksRunning: 0,
      totalRespect: 198,
      averageRespect: 49,
      cycleRespect: 29,
      equityScore: 24,
      topSix: false,
      vestingTokens: 14200,
      vestingUnlocked: 1950,
      treasuryTier: 'PROPOSE',
    },
    {
      id: 'worker_vector',
      address: '0x7B1C...1142',
      label: 'Vector Proof',
      operatorWallet: '0x7B1CA14Ad66be8769e7d92fBB2C4D60084Ab1142',
      status: 'approved',
      openClawVersion: '1.7.2',
      heartbeatAt: isoFromNow(-0.4),
      endpoint: 'https://vector.example/openclaw',
      capabilities: ['testing', 'support', 'specialized'],
      executionModes: ['autonomous', 'validation'],
      concurrencyLimit: 3,
      receiptSchemaVersion: '2026-03',
      supportedTaskSchemaVersions: ['v1', 'v1.1'],
      manifestSignature: 'sig_vector_20260309',
      createdAt: isoFromNow(-172),
      verifiedAt: isoFromNow(-170),
      capabilityClassification: 'ready',
      membership: {
        identityRegistry: 'base:8453:0x8004000000000000000000000000000000000001',
        agentId: '404',
        accepted: true,
        membershipEpoch: 7,
      },
      tasksCompleted: 0,
      tasksRunning: 0,
      totalRespect: 174,
      averageRespect: 43,
      cycleRespect: 24,
      equityScore: 22,
      topSix: false,
      vestingTokens: 12900,
      vestingUnlocked: 1680,
      treasuryTier: 'VIEW',
    },
    {
      id: 'worker_signal',
      address: '0x28c8...0f11',
      label: 'Signal Commons',
      operatorWallet: '0x28c8F69592C4eDf90B0Cd4DdA1525fB72f990f11',
      status: 'pending',
      openClawVersion: '1.7.0',
      heartbeatAt: isoFromNow(-4),
      endpoint: 'https://signal.example/openclaw',
      capabilities: ['marketing', 'support'],
      executionModes: ['review'],
      concurrencyLimit: 2,
      receiptSchemaVersion: '2026-03',
      supportedTaskSchemaVersions: ['v1'],
      manifestSignature: 'sig_signal_20260309',
      createdAt: isoFromNow(-24),
      verifiedAt: isoFromNow(-22),
      capabilityClassification: 'needs_training',
      membership: {
        identityRegistry: 'base:8453:0x8004000000000000000000000000000000000001',
        agentId: '405',
        accepted: false,
        membershipEpoch: 8,
      },
      tasksCompleted: 0,
      tasksRunning: 0,
      totalRespect: 42,
      averageRespect: 14,
      cycleRespect: 9,
      equityScore: 8,
      topSix: false,
      vestingTokens: 1800,
      vestingUnlocked: 100,
      treasuryTier: 'VIEW',
    },
  ]

  const tasks: TaskItem[] = [
    {
      id: 'TASK-241',
      title: 'Ship consortium HQ shell and status rail',
      stream: 'Frontend',
      lane: 'operator_work',
      priority: 'high',
      status: 'RUNNING',
      boardColumn: 'In Progress',
      assigneeWorkerId: 'worker_orbit',
      assigneeLabel: 'Orbit Forge',
      deliverable: 'App shell, tabs, drawers, and sticky cycle banner on `/org`.',
      payoutState: 'locked',
      evidenceStatus: 'verified',
      createdAt: isoFromNow(-18),
      dueAt: isoFromNow(20),
      updatedAt: isoFromNow(-0.7),
      receiptRefs: ['RCT-9001'],
    },
    {
      id: 'TASK-242',
      title: 'Model onboarding manifest verification flow',
      stream: 'Backend',
      lane: 'machine_service',
      priority: 'high',
      status: 'ASSIGNED',
      boardColumn: 'Assigned',
      assigneeWorkerId: 'worker_quill',
      assigneeLabel: 'Quill Stack',
      deliverable: 'Verification handshake, actionable errors, and membership request pipeline.',
      payoutState: 'pending',
      evidenceStatus: 'pending',
      createdAt: isoFromNow(-10),
      dueAt: isoFromNow(30),
      updatedAt: isoFromNow(-1.8),
      receiptRefs: [],
    },
    {
      id: 'TASK-243',
      title: 'Draft Respect and token visibility modules',
      stream: 'Reputation',
      lane: 'operator_work',
      priority: 'medium',
      status: 'PLANNED',
      boardColumn: 'Backlog',
      deliverable: 'Leaderboard, cycle state, allocation view, and traceable reputation drill-down.',
      payoutState: 'pending',
      evidenceStatus: 'pending',
      createdAt: isoFromNow(-8),
      dueAt: isoFromNow(42),
      updatedAt: isoFromNow(-8),
      receiptRefs: [],
    },
    {
      id: 'TASK-238',
      title: 'Publish event-store audit snapshots',
      stream: 'Operations',
      lane: 'machine_service',
      priority: 'medium',
      status: 'VALIDATED',
      boardColumn: 'Done',
      assigneeWorkerId: 'worker_vector',
      assigneeLabel: 'Vector Proof',
      deliverable: 'Append-only audit bundle for worker onboarding, receipts, rankings, and claims.',
      payoutState: 'ready_to_claim',
      evidenceStatus: 'verified',
      createdAt: isoFromNow(-42),
      dueAt: isoFromNow(-6),
      updatedAt: isoFromNow(-2),
      receiptRefs: ['RCT-8998'],
    },
    {
      id: 'TASK-236',
      title: 'Backfill governance and treasury read models',
      stream: 'Treasury',
      lane: 'machine_service',
      priority: 'low',
      status: 'RETRYABLE_FAILED',
      boardColumn: 'Blocked',
      assigneeWorkerId: 'worker_canvas',
      assigneeLabel: 'Canvas Relay',
      deliverable: 'Map treasury policy updates and governance states into dashboard read models.',
      payoutState: 'pending',
      evidenceStatus: 'needs_attention',
      createdAt: isoFromNow(-54),
      dueAt: isoFromNow(12),
      updatedAt: isoFromNow(-3),
      receiptRefs: [],
    },
  ]

  const contributions: ContributionEntry[] = [
    {
      id: 'CONTRIB-71',
      gameNumber: 12,
      workerId: 'worker_orbit',
      workerLabel: 'Orbit Forge',
      summary: 'Shipped the initial `/org` shell, global status rail, and join-flow states.',
      submittedAt: isoFromNow(-4),
      links: ['github://consortium-factory/pulls/241', 'receipt://RCT-9001'],
      respectDelta: 18,
      equityDelta: 6,
    },
    {
      id: 'CONTRIB-72',
      gameNumber: 12,
      workerId: 'worker_quill',
      workerLabel: 'Quill Stack',
      summary: 'Defined the API surface for workers, agents, tasks, training, reputation, and rewards.',
      submittedAt: isoFromNow(-6),
      links: ['github://consortium-factory/issues/242'],
      respectDelta: 12,
      equityDelta: 4,
    },
    {
      id: 'CONTRIB-73',
      gameNumber: 12,
      workerId: 'worker_vector',
      workerLabel: 'Vector Proof',
      summary: 'Validated receipt flows and published audit artifacts for the last reward epoch.',
      submittedAt: isoFromNow(-12),
      links: ['audit://epoch-11'],
      respectDelta: 9,
      equityDelta: 3,
    },
  ]

  const rankings: RankingEntry[] = [
    {
      id: 'RANK-12-A',
      gameNumber: 12,
      groupId: 'builders-alpha',
      rankerWorkerId: 'worker_orbit',
      rankerLabel: 'Orbit Forge',
      rankedWorkers: ['Quill Stack', 'Vector Proof', 'Canvas Relay'],
      submittedAt: isoFromNow(-2.2),
    },
    {
      id: 'RANK-12-B',
      gameNumber: 12,
      groupId: 'builders-alpha',
      rankerWorkerId: 'worker_canvas',
      rankerLabel: 'Canvas Relay',
      rankedWorkers: ['Orbit Forge', 'Quill Stack', 'Vector Proof'],
      submittedAt: isoFromNow(-2.6),
    },
  ]

  const rewardEpochs: RewardEpoch[] = [
    {
      id: 'epoch-11',
      epochId: 11,
      emissionAmount: 54000,
      finalizedAt: isoFromNow(-3),
      allocations: [
        {
          operatorWallet: workers[0].operatorWallet,
          workerLabel: workers[0].label,
          emissionAmount: 17280,
          vestingCliffWeeks: 8,
          vestingDurationWeeks: 40,
          status: 'ready_to_claim',
        },
        {
          operatorWallet: workers[1].operatorWallet,
          workerLabel: workers[1].label,
          emissionAmount: 15120,
          vestingCliffWeeks: 8,
          vestingDurationWeeks: 40,
          status: 'locked',
        },
        {
          operatorWallet: workers[2].operatorWallet,
          workerLabel: workers[2].label,
          emissionAmount: 11340,
          vestingCliffWeeks: 8,
          vestingDurationWeeks: 40,
          status: 'locked',
        },
        {
          operatorWallet: workers[3].operatorWallet,
          workerLabel: workers[3].label,
          emissionAmount: 10260,
          vestingCliffWeeks: 8,
          vestingDurationWeeks: 40,
          status: 'locked',
        },
      ],
    },
  ]

  const state: DashboardSnapshot = {
    consortiumId: CONSORTIUM_ID,
    missionState: {
      missionName: 'Consortium Factory',
      missionStatement:
        'Build the first OpenClaw-native consortium so operators can join with ERC-8004 identities, earn RESPECT, and accrue vested mission equity.',
      coordinator: 'Your OpenClaw',
      coordinatorStatus: 'online',
      stage: 'Contribution Submission',
      nextStageTs: isoFromNow(18),
      sprintLabel: 'Sprint 07 · MVP assembly',
      docsUrl: 'https://docs.openclaw.ai',
      chainLabel: 'Base · ERC-8004 + Respect Game',
      lastSettlementAt: isoFromNow(-3),
    },
    workers,
    tasks,
    receipts: [
      {
        id: 'RCT-9001',
        taskId: 'TASK-241',
        workerId: 'worker_orbit',
        workerLabel: 'Orbit Forge',
        submittedAt: isoFromNow(-1.1),
        evidenceStatus: 'verified',
        payoutStatus: 'locked',
        summary: 'HQ shell merged with working tabs, status rail, and join drawer.',
        links: ['github://consortium-factory/pulls/241'],
      },
      {
        id: 'RCT-8998',
        taskId: 'TASK-238',
        workerId: 'worker_vector',
        workerLabel: 'Vector Proof',
        submittedAt: isoFromNow(-5.3),
        evidenceStatus: 'verified',
        payoutStatus: 'ready_to_claim',
        summary: 'Audit snapshot signed and attached to epoch 11 reward finalization.',
        links: ['audit://epoch-11', 'storage://activity-events-11.json'],
      },
    ],
    activity: [
      {
        id: eventId('evt'),
        type: 'worker.verified',
        actor: 'OpenClaw Registry',
        message: 'Signal Commons passed manifest validation and was queued for coordinator training.',
        timestamp: isoFromNow(-2.8),
        traceId: eventId('trace'),
      },
      {
        id: eventId('evt'),
        type: 'task.submitted',
        actor: 'Orbit Forge',
        message: 'TASK-241 receipt submitted with GitHub delivery evidence.',
        timestamp: isoFromNow(-1.1),
        traceId: eventId('trace'),
      },
      {
        id: eventId('evt'),
        type: 'rewards.finalized',
        actor: 'Emission Service',
        message: 'Epoch 11 finalized with 54,000 FACTORY tokens routed into vesting schedules.',
        timestamp: isoFromNow(-3),
        traceId: eventId('trace'),
      },
      {
        id: eventId('evt'),
        type: 'governance.updated',
        actor: 'Respect Governance',
        message: 'Treasury access thresholds refreshed from rolling average RESPECT.',
        timestamp: isoFromNow(-6),
        traceId: eventId('trace'),
      },
    ],
    contributions,
    rankings,
    reputationCycle: {
      id: 'cycle-12',
      gameNumber: 12,
      stage: 'Contribution Submission',
      submissionsOpen: 4,
      rankingsOpen: 2,
      processingWindowHours: 6,
      startedAt: isoFromNow(-18),
      closesAt: isoFromNow(18),
      lastSettledAt: isoFromNow(-3),
    },
    proposals: [
      {
        id: 'PROP-021',
        type: 'Treasury Access Policy',
        title: 'Increase minimum voting window for treasury-sensitive actions',
        proposer: 'Orbit Forge',
        status: 'Active',
        votesFor: 184,
        votesAgainst: 19,
        executionState: 'Awaiting close',
        createdAt: isoFromNow(-14),
        expiresAt: isoFromNow(34),
        description:
          'Harden governance timings so treasury access policy updates cannot pass in under 48 hours.',
      },
      {
        id: 'PROP-020',
        type: 'Emission Schedule',
        title: 'Approve epoch 11 emission rollover handling',
        proposer: 'Quill Stack',
        status: 'Executed',
        votesFor: 201,
        votesAgainst: 11,
        executionState: 'Executed on Base',
        createdAt: isoFromNow(-44),
        expiresAt: isoFromNow(-20),
        description:
          'Confirm overflow rollover policy for newcomer caps and route excess emissions to epoch 12.',
      },
      {
        id: 'PROP-019',
        type: 'Coordinator Policy',
        title: 'Allow autonomous assignment only for verified agents',
        proposer: 'Vector Proof',
        status: 'Passed',
        votesFor: 176,
        votesAgainst: 14,
        executionState: 'Queued for execution',
        createdAt: isoFromNow(-62),
        expiresAt: isoFromNow(-8),
        description:
          'Codify the verified-only autonomous assignment rule from the MVP architecture spec.',
      },
    ],
    treasury: {
      totalValueUsd: 1842000,
      allocations: [
        { label: 'Liquidity bootstrap', amountUsd: 460500, sharePct: 25 },
        { label: 'Worker emission vault', amountUsd: 552600, sharePct: 30 },
        { label: 'Treasury reserve', amountUsd: 644700, sharePct: 35 },
        { label: 'Founder reserve', amountUsd: 184200, sharePct: 10 },
      ],
      recentPayouts: [
        {
          id: 'PAY-441',
          taskId: 'TASK-238',
          workerLabel: 'Vector Proof',
          amountTokens: 3480,
          amountRespect: 9,
          status: 'ready_to_claim',
          linkedReceiptId: 'RCT-8998',
          paidAt: isoFromNow(-2.9),
        },
        {
          id: 'PAY-437',
          taskId: 'TASK-234',
          workerLabel: 'Canvas Relay',
          amountTokens: 5220,
          amountRespect: 13,
          status: 'claimed',
          linkedReceiptId: 'RCT-8987',
          paidAt: isoFromNow(-28),
        },
      ],
      policySummary: [
        'Autonomous assignment is limited to verified ERC-8004 agents.',
        'Treasury execution tiers refresh after every closed reputation cycle.',
        'Worker emissions vest with an 8-week cliff and 40-week linear release.',
      ],
    },
    rewardEpochs,
    trainingTasks: [
      {
        id: 'TRAIN-108',
        workerId: 'worker_signal',
        workerLabel: 'Signal Commons',
        title: 'Complete delivery-receipt and ranking playbooks',
        status: 'running',
        checklist: [
          'Submit signed receipt against sandbox task',
          'Pass broker heartbeat validation',
          'Rank two sample contributions with RESPECT rationale',
        ],
        createdAt: isoFromNow(-2.6),
      },
    ],
    lastUpdatedAt: new Date(NOW).toISOString(),
  }

  return normalizeState(state)
}

function cloneState<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function taskToRunningCount(status: TaskItem['status']) {
  return status === 'RUNNING' || status === 'ASSIGNED' || status === 'ACCEPTED' ? 1 : 0
}

function taskToCompletedCount(status: TaskItem['status']) {
  return status === 'VALIDATED' || status === 'REWARDED' ? 1 : 0
}

function determineTier(totalRespect: number): TreasuryTier {
  if (totalRespect >= 240) return 'EXECUTE_LIMITED'
  if (totalRespect >= 180) return 'PROPOSE'
  return 'VIEW'
}

function normalizeState(input: DashboardSnapshot) {
  const state = cloneState(input)

  for (const worker of state.workers) {
    worker.tasksRunning = state.tasks.filter(
      (task) => task.assigneeWorkerId === worker.id && taskToRunningCount(task.status) > 0,
    ).length
    worker.tasksCompleted = state.tasks.filter(
      (task) => task.assigneeWorkerId === worker.id && taskToCompletedCount(task.status) > 0,
    ).length
    worker.treasuryTier = determineTier(worker.totalRespect)
  }

  const topWorkers = [...state.workers]
    .sort((a, b) => b.totalRespect - a.totalRespect)
    .slice(0, 6)
    .map((worker) => worker.id)

  state.workers = state.workers.map((worker) => ({
    ...worker,
    topSix: topWorkers.includes(worker.id),
  }))

  state.activity = [...state.activity].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
  state.tasks = [...state.tasks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
  state.receipts = [...state.receipts].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  )
  state.contributions = [...state.contributions].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  )

  return state
}

async function ensureStateFile() {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    await readFile(STATE_FILE, 'utf8')
  } catch {
    await writeFile(STATE_FILE, JSON.stringify(buildDefaultState(), null, 2), 'utf8')
  }
}

async function readState() {
  await ensureStateFile()
  try {
    const raw = await readFile(STATE_FILE, 'utf8')
    return normalizeState(JSON.parse(raw) as DashboardSnapshot)
  } catch {
    const fallback = buildDefaultState()
    await writeState(fallback)
    return fallback
  }
}

async function writeState(state: DashboardSnapshot) {
  const normalized = normalizeState({
    ...state,
    lastUpdatedAt: new Date().toISOString(),
  })
  await writeFile(STATE_FILE, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}

function appendEvent(
  state: DashboardSnapshot,
  type: string,
  actor: string,
  message: string,
  payload?: Record<string, unknown>,
) {
  const event: ActivityEvent = {
    id: eventId('evt'),
    type,
    actor,
    message,
    timestamp: new Date().toISOString(),
    traceId: eventId('trace'),
    payload,
  }
  state.activity.unshift(event)
}

function resolveBoardColumn(status: TaskItem['status']): TaskBoardColumn {
  switch (status) {
    case 'PLANNED':
      return 'Backlog'
    case 'ASSIGNED':
    case 'ACCEPTED':
      return 'Assigned'
    case 'RUNNING':
      return 'In Progress'
    case 'SUBMITTED':
      return 'Review'
    case 'VALIDATED':
    case 'REWARDED':
      return 'Done'
    default:
      return 'Blocked'
  }
}

function getWorkerOrThrow(state: DashboardSnapshot, workerId: string) {
  const worker = state.workers.find((item) => item.id === workerId)
  if (!worker) {
    throw new Error(`Worker ${workerId} not found`)
  }
  return worker
}

function getTaskOrThrow(state: DashboardSnapshot, taskId: string) {
  const task = state.tasks.find((item) => item.id === taskId)
  if (!task) {
    throw new Error(`Task ${taskId} not found`)
  }
  return task
}

export async function getDashboardSnapshot() {
  return readState()
}

export async function getWorkerById(workerId: string) {
  const state = await readState()
  return state.workers.find((worker) => worker.id === workerId) ?? null
}

export async function getTrainingStatus(workerId: string) {
  const state = await readState()
  const worker = state.workers.find((entry) => entry.id === workerId)
  const tasks = state.trainingTasks.filter((task) => task.workerId === workerId)
  if (!worker) return null

  return {
    workerId,
    label: worker.label,
    status: worker.capabilityClassification,
    tasks,
  }
}

export async function getTaskById(taskId: string) {
  const state = await readState()
  return state.tasks.find((task) => task.id === taskId) ?? null
}

export async function getAgentByIdentity(identityRegistry: string, agentId: string) {
  const state = await readState()
  return (
    state.workers.find(
      (worker) =>
        worker.membership?.identityRegistry === identityRegistry &&
        worker.membership.agentId === agentId,
    ) ?? null
  )
}

export async function getRewardsByWallet(wallet: string) {
  const state = await readState()
  const rewardAllocations = state.rewardEpochs.flatMap((epoch) =>
    epoch.allocations.filter(
      (allocation) => allocation.operatorWallet.toLowerCase() === wallet.toLowerCase(),
    ),
  )

  const worker = state.workers.find(
    (entry) => entry.operatorWallet.toLowerCase() === wallet.toLowerCase(),
  )

  return {
    wallet,
    worker,
    allocations: rewardAllocations,
    epochs: state.rewardEpochs.filter((epoch) =>
      epoch.allocations.some(
        (allocation) => allocation.operatorWallet.toLowerCase() === wallet.toLowerCase(),
      ),
    ),
  }
}

export async function registerWorker(input: WorkerRegistrationInput) {
  const state = await readState()
  const worker: WorkerProfile = {
    id: `worker_${crypto.randomUUID().slice(0, 8)}`,
    address: `${input.operatorWallet.slice(0, 6)}...${input.operatorWallet.slice(-4)}`,
    label: input.label,
    operatorWallet: input.operatorWallet,
    status: 'pending',
    openClawVersion: input.openClawVersion,
    heartbeatAt: new Date().toISOString(),
    endpoint: input.endpoint,
    capabilities: input.capabilities,
    executionModes: input.executionModes,
    concurrencyLimit: input.concurrencyLimit,
    receiptSchemaVersion: input.receiptSchemaVersion,
    supportedTaskSchemaVersions: input.supportedTaskSchemaVersions,
    manifestSignature: input.manifestSignature,
    createdAt: new Date().toISOString(),
    capabilityClassification: 'needs_training',
    tasksCompleted: 0,
    tasksRunning: 0,
    totalRespect: 0,
    averageRespect: 0,
    cycleRespect: 0,
    equityScore: 0,
    topSix: false,
    vestingTokens: 0,
    vestingUnlocked: 0,
    treasuryTier: 'VIEW',
  }

  state.workers.push(worker)
  appendEvent(
    state,
    'worker.registered',
    'API Gateway',
    `${worker.label} registered a signed OpenClaw manifest for verification.`,
    { workerId: worker.id },
  )

  const next = await writeState(state)
  return next.workers.find((entry) => entry.id === worker.id) ?? worker
}

export async function verifyWorker(workerId: string) {
  const state = await readState()
  const worker = getWorkerOrThrow(state, workerId)
  const hasValidEndpoint = /^https?:\/\//.test(worker.endpoint)
  const hasValidSignature = worker.manifestSignature.length >= 8
  const hasReadyCapabilities = worker.capabilities.some((capability) =>
    ['engineering', 'design', 'product', 'testing', 'specialized'].includes(capability),
  )

  if (!hasValidEndpoint || !hasValidSignature) {
    worker.status = 'blocked'
    worker.capabilityClassification = 'blocked'
  } else if (hasReadyCapabilities) {
    worker.status = 'pending'
    worker.capabilityClassification = 'ready'
    worker.verifiedAt = new Date().toISOString()
  } else {
    worker.status = 'needs_training'
    worker.capabilityClassification = 'needs_training'
    worker.verifiedAt = new Date().toISOString()
  }

  appendEvent(
    state,
    'worker.verified',
    'OpenClaw Registry',
    `${worker.label} verification completed with outcome ${worker.capabilityClassification}.`,
    { workerId: worker.id, classification: worker.capabilityClassification },
  )

  const next = await writeState(state)
  return next.workers.find((entry) => entry.id === worker.id) ?? worker
}

export async function acceptAgent(
  workerId: string,
  identityRegistry: string,
  agentId: string,
  operatorWallet: string,
) {
  const state = await readState()
  const worker = getWorkerOrThrow(state, workerId)

  worker.membership = {
    identityRegistry,
    agentId,
    accepted: worker.capabilityClassification !== 'blocked',
    membershipEpoch:
      Math.max(1, ...state.workers.map((entry) => entry.membership?.membershipEpoch ?? 0)) + 1,
  }
  worker.operatorWallet = operatorWallet
  worker.status = worker.capabilityClassification === 'ready' ? 'approved' : 'pending'

  appendEvent(
    state,
    'agent.accepted',
    'Consortium Membership',
    `${worker.label} submitted an ERC-8004 membership request for operator ${operatorWallet}.`,
    { workerId, identityRegistry, agentId },
  )

  const next = await writeState(state)
  return next.workers.find((entry) => entry.id === worker.id) ?? worker
}

export async function removeAgent(identityRegistry: string, agentId: string) {
  const state = await readState()
  const worker = state.workers.find(
    (entry) =>
      entry.membership?.identityRegistry === identityRegistry &&
      entry.membership.agentId === agentId,
  )

  if (!worker) {
    throw new Error('Accepted agent not found')
  }

  worker.status = 'removed'
  if (worker.membership) {
    worker.membership.accepted = false
  }

  appendEvent(
    state,
    'agent.removed',
    'Consortium Membership',
    `${worker.label} was removed from the consortium membership set.`,
    { workerId: worker.id },
  )

  const next = await writeState(state)
  return next.workers.find((entry) => entry.id === worker.id) ?? worker
}

export async function createTask(input: CreateTaskInput) {
  const state = await readState()
  const taskId = `TASK-${Math.floor(200 + Math.random() * 700)}`
  const assignee = input.assigneeWorkerId
    ? state.workers.find((worker) => worker.id === input.assigneeWorkerId)
    : null

  const task: TaskItem = {
    id: taskId,
    title: input.title,
    stream: input.stream,
    lane: input.lane,
    priority: input.priority,
    status: assignee ? 'ASSIGNED' : 'PLANNED',
    boardColumn: assignee ? 'Assigned' : 'Backlog',
    assigneeWorkerId: assignee?.id,
    assigneeLabel: assignee?.label,
    deliverable: input.deliverable,
    payoutState: 'pending',
    evidenceStatus: 'pending',
    createdAt: new Date().toISOString(),
    dueAt: input.dueAt,
    updatedAt: new Date().toISOString(),
    receiptRefs: [],
  }

  state.tasks.unshift(task)
  appendEvent(state, 'task.created', 'Coordinator Runtime', `${task.id} created: ${task.title}.`, {
    taskId: task.id,
  })

  const next = await writeState(state)
  return next.tasks.find((entry) => entry.id === task.id) ?? task
}

export async function assignTask(taskId: string, workerId: string) {
  const state = await readState()
  const task = getTaskOrThrow(state, taskId)
  const worker = getWorkerOrThrow(state, workerId)

  task.assigneeWorkerId = worker.id
  task.assigneeLabel = worker.label
  task.status = 'ASSIGNED'
  task.boardColumn = 'Assigned'
  task.updatedAt = new Date().toISOString()

  appendEvent(
    state,
    'task.assigned',
    'OpenClaw Broker',
    `${task.id} routed to ${worker.label} on the ${task.lane} lane.`,
    { taskId, workerId },
  )

  const next = await writeState(state)
  return next.tasks.find((entry) => entry.id === task.id) ?? task
}

export async function recordHeartbeat(taskId: string) {
  const state = await readState()
  const task = getTaskOrThrow(state, taskId)
  if (!task.assigneeWorkerId) {
    throw new Error('Task has no assignee')
  }

  const worker = getWorkerOrThrow(state, task.assigneeWorkerId)
  task.status = 'RUNNING'
  task.boardColumn = 'In Progress'
  task.updatedAt = new Date().toISOString()
  worker.heartbeatAt = new Date().toISOString()
  worker.status = 'online'

  appendEvent(
    state,
    'task.heartbeat',
    worker.label,
    `${task.id} emitted a fresh heartbeat and remains in progress.`,
    { taskId, workerId: worker.id },
  )

  const next = await writeState(state)
  return next.tasks.find((entry) => entry.id === task.id) ?? task
}

export async function submitReceipt(taskId: string, summary: string, links: string[]) {
  const state = await readState()
  const task = getTaskOrThrow(state, taskId)
  if (!task.assigneeWorkerId || !task.assigneeLabel) {
    throw new Error('Task has no active assignee')
  }

  const worker = getWorkerOrThrow(state, task.assigneeWorkerId)
  const receiptId = `RCT-${Math.floor(9000 + Math.random() * 900)}`
  task.status = 'VALIDATED'
  task.boardColumn = 'Done'
  task.evidenceStatus = 'verified'
  task.payoutState = 'ready_to_claim'
  task.updatedAt = new Date().toISOString()
  task.receiptRefs.push(receiptId)

  state.receipts.unshift({
    id: receiptId,
    taskId,
    workerId: worker.id,
    workerLabel: worker.label,
    submittedAt: new Date().toISOString(),
    evidenceStatus: 'verified',
    payoutStatus: 'ready_to_claim',
    summary,
    links,
  })

  worker.cycleRespect += 8
  worker.totalRespect += 8
  worker.equityScore += 3
  worker.vestingTokens += 720

  state.contributions.unshift({
    id: eventId('contrib'),
    gameNumber: state.reputationCycle.gameNumber,
    workerId: worker.id,
    workerLabel: worker.label,
    summary,
    submittedAt: new Date().toISOString(),
    links,
    respectDelta: 8,
    equityDelta: 3,
  })

  state.treasury.recentPayouts.unshift({
    id: eventId('pay'),
    taskId,
    workerLabel: worker.label,
    amountTokens: 720,
    amountRespect: 8,
    status: 'ready_to_claim',
    linkedReceiptId: receiptId,
    paidAt: new Date().toISOString(),
  })

  appendEvent(
    state,
    'task.validated',
    'Receipt Validator',
    `${task.id} receipt validated and moved into reward-claimable state.`,
    { taskId, receiptId },
  )

  const next = await writeState(state)
  return {
    task: next.tasks.find((entry) => entry.id === taskId) ?? task,
    receipt: next.receipts.find((entry) => entry.id === receiptId),
  }
}

export async function cancelTask(taskId: string) {
  const state = await readState()
  const task = getTaskOrThrow(state, taskId)
  task.status = 'CANCELLED'
  task.boardColumn = 'Blocked'
  task.updatedAt = new Date().toISOString()
  task.evidenceStatus = 'needs_attention'

  appendEvent(
    state,
    'task.cancelled',
    'Coordinator Runtime',
    `${task.id} cancelled before completion.`,
    { taskId },
  )

  const next = await writeState(state)
  return next.tasks.find((entry) => entry.id === task.id) ?? task
}

export async function createTrainingTask(workerId: string, title: string, checklist: string[]) {
  const state = await readState()
  const worker = getWorkerOrThrow(state, workerId)
  const trainingTask: TrainingTask = {
    id: `TRAIN-${Math.floor(100 + Math.random() * 900)}`,
    workerId,
    workerLabel: worker.label,
    title,
    status: 'planned',
    checklist,
    createdAt: new Date().toISOString(),
  }

  state.trainingTasks.unshift(trainingTask)
  worker.status = 'needs_training'

  appendEvent(
    state,
    'training.created',
    'Coordinator Runtime',
    `${worker.label} received a training task: ${title}.`,
    { workerId, trainingTaskId: trainingTask.id },
  )

  const next = await writeState(state)
  return next.trainingTasks.find((entry) => entry.id === trainingTask.id) ?? trainingTask
}

export async function submitTrainingTask(trainingTaskId: string) {
  const state = await readState()
  const trainingTask = state.trainingTasks.find((task) => task.id === trainingTaskId)
  if (!trainingTask) {
    throw new Error(`Training task ${trainingTaskId} not found`)
  }

  trainingTask.status = 'passed'
  trainingTask.submittedAt = new Date().toISOString()
  const worker = getWorkerOrThrow(state, trainingTask.workerId)
  worker.capabilityClassification = 'ready'
  worker.status = 'approved'
  worker.verifiedAt = new Date().toISOString()
  if (worker.membership) {
    worker.membership.accepted = true
  }

  appendEvent(
    state,
    'training.passed',
    'Receipt Validator',
    `${worker.label} passed training and is now ready for production-critical work.`,
    { workerId: worker.id, trainingTaskId },
  )

  const next = await writeState(state)
  return next.trainingTasks.find((entry) => entry.id === trainingTaskId) ?? trainingTask
}

export async function submitRanking(rankerWorkerId: string, rankedWorkers: string[]) {
  const state = await readState()
  const ranker = getWorkerOrThrow(state, rankerWorkerId)
  const entry: RankingEntry = {
    id: eventId('rank'),
    gameNumber: state.reputationCycle.gameNumber,
    groupId: 'builders-alpha',
    rankerWorkerId,
    rankerLabel: ranker.label,
    rankedWorkers,
    submittedAt: new Date().toISOString(),
  }

  state.rankings.unshift(entry)
  appendEvent(
    state,
    'ranking.submitted',
    ranker.label,
    `${ranker.label} submitted a ranking for game ${state.reputationCycle.gameNumber}.`,
    { rankerWorkerId, rankedWorkers },
  )

  const next = await writeState(state)
  return next.rankings.find((item) => item.id === entry.id) ?? entry
}

export async function closeReputationCycle() {
  const state = await readState()
  const nextStage =
    state.missionState.stage === 'Contribution Submission'
      ? 'Contribution Ranking'
      : 'Contribution Submission'

  state.missionState.stage = nextStage
  state.missionState.nextStageTs = new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString()
  state.reputationCycle.stage = nextStage
  state.reputationCycle.closesAt = state.missionState.nextStageTs

  if (nextStage === 'Contribution Submission') {
    state.missionState.lastSettlementAt = new Date().toISOString()
    state.reputationCycle.lastSettledAt = state.missionState.lastSettlementAt
    state.reputationCycle.gameNumber += 1
    for (const worker of state.workers) {
      worker.averageRespect = Number(((worker.averageRespect + worker.cycleRespect) / 2).toFixed(2))
      worker.cycleRespect = 0
    }
  }

  appendEvent(
    state,
    'reputation.cycle_closed',
    'Reputation Bridge',
    `Cycle advanced into ${nextStage}.`,
    { nextStage, gameNumber: state.reputationCycle.gameNumber },
  )

  return writeState(state)
}

export async function finalizeRewardEpoch(epochId: number, emissionAmount: number) {
  const state = await readState()
  const eligibleWorkers = [...state.workers]
    .filter((worker) => worker.status === 'approved')
    .sort((a, b) => b.totalRespect - a.totalRespect)

  const totalRespect = eligibleWorkers.reduce((sum, worker) => sum + worker.totalRespect, 0)
  const allocations: RewardAllocation[] = eligibleWorkers.map((worker) => {
    const proportionalAmount =
      totalRespect === 0 ? 0 : Math.round((emissionAmount * worker.totalRespect) / totalRespect)
    const cappedAmount = Math.min(proportionalAmount, Math.round(emissionAmount * 0.35))
    worker.vestingTokens += cappedAmount
    return {
      operatorWallet: worker.operatorWallet,
      workerLabel: worker.label,
      emissionAmount: cappedAmount,
      vestingCliffWeeks: 8,
      vestingDurationWeeks: 40,
      status: 'locked',
    }
  })

  const epoch: RewardEpoch = {
    id: `epoch-${epochId}`,
    epochId,
    emissionAmount,
    finalizedAt: new Date().toISOString(),
    allocations,
  }

  state.rewardEpochs.unshift(epoch)
  appendEvent(
    state,
    'rewards.finalized',
    'Emission Service',
    `Reward epoch ${epochId} finalized with ${emissionAmount} FACTORY emissions.`,
    { epochId, emissionAmount },
  )

  const next = await writeState(state)
  return next.rewardEpochs.find((item) => item.epochId === epochId) ?? epoch
}

export async function claimRewards(wallet: string) {
  const state = await readState()
  const targetWallet = wallet.toLowerCase()
  let claimed = 0

  for (const epoch of state.rewardEpochs) {
    for (const allocation of epoch.allocations) {
      if (
        allocation.operatorWallet.toLowerCase() === targetWallet &&
        allocation.status !== 'claimed'
      ) {
        allocation.status = 'claimed'
        claimed += allocation.emissionAmount
      }
    }
  }

  const worker = state.workers.find(
    (entry) => entry.operatorWallet.toLowerCase() === targetWallet,
  )
  if (worker) {
    worker.vestingUnlocked += claimed
  }

  appendEvent(
    state,
    'rewards.claimed',
    worker?.label ?? 'Rewards Service',
    `${wallet} claimed ${claimed} unlocked FACTORY tokens.`,
    { wallet, claimed },
  )

  const next = await writeState(state)
  return {
    wallet,
    claimed,
    rewards: await getRewardsByWallet(wallet),
    snapshot: next,
  }
}

export function parseStringArray(input: unknown) {
  if (!Array.isArray(input)) return []
  return input
    .map((item) => String(item).trim())
    .filter(Boolean)
}

export function parsePayoutStatus(status: string | undefined): PayoutStatus {
  if (status === 'locked' || status === 'ready_to_claim' || status === 'claimed') {
    return status
  }
  return 'pending'
}

export { resolveBoardColumn }
