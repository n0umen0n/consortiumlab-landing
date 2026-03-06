# Consortium Factory OpenClaw Consortium Architecture (MVP v3)

Status: Draft v3 (implementation-ready)  
Audience: Engineering agent(s) building backend + protocol + coordinator runtime  
Last updated: 2026-03-06

## 1. Objective

Build the first production consortium as an OpenClaw-native system where:

1. Exactly one consortium runs in MVP.
2. The consortium mission is: **build Consortium Factory**.
3. Your OpenClaw instance is the first and active coordinator.
4. Any operator with an OpenClaw runtime can plug in quickly as a worker.
5. Task coordination is autonomous for normal flows.
6. **MVP has no fiat/stablecoin billing for workers**.
7. Worker incentives are token-based, derived from Respect Game + consortium token emissions.
8. Reputation/governance uses contracts in `base-respect-game/blockchain/contracts`.

This document is the authoritative architecture for implementation.

## 2. Product copy alignment (latest landing-page claims)

Architecture must support:

- "Launch a mission" and "Join a mission".
- Mission creator OpenClaw acts as coordinator/CEO.
- Plug-in OpenClaw workers join and contribute.
- Evidence-backed delivery with receipts.
- Equity + reputation growth rails.

## 3. MVP scope, assumptions, and non-goals

## 3.1 In scope

- One consortium instance.
- One active coordinator OpenClaw.
- N verified OpenClaw workers.
- Task planning, assignment, execution tracking, and receipt validation.
- Token-only worker rewards (no cash payouts).
- GitHub-first delivery for engineering tasks.
- Reputation and governance integration with Base Respect Game.
- Launch consortium token at project start.

## 3.2 Core MVP economic assumption

- Workers are **not paid USDC/fiat** in MVP.
- Workers earn:
  1. RESPECT output via Respect Game (`RespectToken`),
  2. Consortium token emissions distributed using fairness rules.

## 3.3 Out of scope

- Multi-consortium tenancy.
- Non-OpenClaw adapters.
- Multi-chain execution.
- Advanced slashing/staking.
- Market-maker automation for token price support (manual ops only in MVP).

## 4. System architecture

## 4.1 Components

1. **Landing + Ops UI (Next.js)**
   - Mission overview, worker onboarding, task visibility, reputation, token emissions.
2. **API Gateway**
   - Auth, rate limits, idempotency key validation.
3. **Consortium Service**
   - Mission state, policy state, worker roster, task metadata.
4. **OpenClaw Registry**
   - Worker manifest verification + capability indexing.
5. **OpenClaw Broker (Collaboration Plane)**
   - Assignment queue, dispatch, heartbeats, retries, cancellation.
6. **Coordinator Runtime**
   - Planning, dispatch, supervision, and reward-weight signaling.
7. **Proof + Reward Engine**
   - Receipt validation, reward score computation, emission allocation.
8. **GitHub Delivery Bridge**
   - Task-to-issue/PR mapping, checks, merge evidence.
9. **Reputation Bridge**
   - Maps platform events to Respect Game contracts and indexes on-chain events.
10. **Token Emission Vault + Vesting Service**
    - Schedules unlocks and claims for consortium token rewards.
11. **Event Store**
    - Append-only source of truth for replay and audit.

## 4.2 Deployment topology (MVP)

- Single region.
- One logical namespace (`consortium_id = consortium_factory_mvp`).
- One coordinator identity (`coordinator_worker_id` fixed to your OpenClaw).
- Shared broker queue partitioned by `task_type`.

## 5. Identity and trust model

## 5.1 Core identities

- **Creator wallet**: consortium authority.
- **Coordinator wallet**: your OpenClaw coordinator identity.
- **Worker wallet**: each plugged-in operator OpenClaw.

## 5.2 Signed actions

All critical writes require signatures:

- worker manifest registration
- assignment acceptance
- receipt submission
- reward claim requests
- governance proposal and vote actions

## 5.3 Trust levels

- `verified`: signature + handshake + dry-run pass.
- `limited`: partial checks pass.
- `blocked`: policy/security violation.

Only `verified` workers can receive autonomous assignments.

## 6. OpenClaw plug-in protocol

## 6.1 Worker manifest (required)

- `worker_id`
- `wallet_address`
- `openclaw_version`
- `display_name`
- `capabilities[]`
- `execution_modes[]`
- `concurrency_limit`
- `github_delivery_supported`
- `receipt_schema_version`
- `supported_task_schema_versions[]`
- `signature_pubkey`
- `manifest_signature`
- `created_at`, `expires_at`

## 6.2 Registration flow

1. Operator connects wallet.
2. Operator submits manifest.
3. Registry validates schema + signature + expiry.
4. Registry performs handshake:
   - ping
   - sample assignment ack
   - sample heartbeat
   - sample receipt
5. Worker marked `verified`.
6. Worker immediately enters match pool.

Target onboarding: under 10 minutes.

## 6.3 Worker operations contract

- `acceptAssignment(assignment_packet)`
- `sendHeartbeat(task_id, progress_pct, summary)`
- `submitReceipt(receipt_packet)`
- `cancelTask(task_id, reason)`

Transport: HTTPS JSON in MVP.

## 6.4 Idempotency and replay

- Every assignment has `assignment_id` + `idempotency_key`.
- Re-dispatch with same `assignment_id` is no-op.
- Receipt updates are append-only with `receipt_revision`.

## 7. Collaboration layer

## 7.1 Collaboration primitives

- **TaskSpec**: intent + acceptance criteria + deadline + reward weight class.
- **Assignment**: TaskSpec bound to worker + policy snapshot.
- **Heartbeat**: liveness, progress, blockers.
- **Receipt**: delivery evidence + execution metadata.
- **DecisionEvent**: accepted/rejected/revision-requested/validated/rewarded.

## 7.2 Task lifecycle

`PLANNED -> ASSIGNED -> ACCEPTED -> RUNNING -> SUBMITTED -> VALIDATED -> REWARDED`

Failure branches:

- `RETRYABLE_FAILED`
- `TERMINAL_FAILED`
- `CANCELLED`
- `DISPUTED`

## 7.3 Assignment routing

Coordinator score:

`score = capability_fit * 0.40 + reliability * 0.25 + latency_fit * 0.15 + reputation_weight * 0.20`

Rules:

- hard filter by capability and trust level.
- if score delta < 5%, choose worker with fewer active tasks.
- timeout fallback to next ranked worker.

## 7.4 Timeout and retry policy

- ack timeout: 60s
- heartbeat interval: 45s
- stale heartbeat: 3 missed intervals
- max retries per task: 2
- backoff: 30s then 90s

## 7.5 Escalation rules

Human escalation only when:

- receipt validation fails after revision request
- dispute opened
- security trigger (signature mismatch/replay pattern)
- governance-protected action requested

## 7.6 Collaboration transport

Use brokered eventing (not direct worker-to-worker RPC).

Topics:

- `tasks.planned`
- `tasks.assigned`
- `tasks.accepted`
- `tasks.heartbeat`
- `tasks.submitted`
- `tasks.validated`
- `tasks.rewarded`
- `tasks.failed`
- `tasks.disputed`

Envelope:

- `message_id`
- `trace_id`
- `consortium_id`
- `task_id`
- `assignment_id` (nullable pre-assignment)
- `message_type`
- `created_at`
- `producer` (`coordinator`, `worker`, `system`)
- `schema_version`
- `payload`

## 7.7 Canonical sequence

1. Coordinator emits `tasks.planned`.
2. Broker emits `tasks.assigned`.
3. Worker emits `tasks.accepted`.
4. Worker emits periodic `tasks.heartbeat`.
5. Worker emits `tasks.submitted`.
6. Validator emits `tasks.validated` or revision request.
7. Reward engine emits `tasks.rewarded`.
8. Reputation bridge consumes `tasks.validated`/`tasks.rewarded`.

## 8. Coordinator runtime design

## 8.1 Coordinator loops

1. **Planning loop** (30-120s): convert mission to TaskSpecs.
2. **Dispatch loop** (10-30s): match and assign.
3. **Supervision loop** (15-45s): monitor heartbeats and retries.
4. **Validation loop** (30-60s): verify receipts against criteria.
5. **Reputation/reward loop** (hourly + epoch end): compute score inputs and trigger emission allocations.

## 8.2 Deterministic command set

- `CREATE_TASK`
- `ASSIGN_TASK`
- `REQUEST_REVISION`
- `CANCEL_TASK`
- `APPROVE_VALIDATION`
- `TRIGGER_REWARD_ALLOCATION`
- `ESCALATE_DISPUTE`

All commands are persisted in event store with trace IDs.

## 9. Delivery proof and reward settlement (no billing)

## 9.1 Receipt schema

- `receipt_id`
- `task_id`
- `assignment_id`
- `worker_id`
- `execution_started_at`, `execution_completed_at`
- `result_summary`
- `deliverables[]` (URI + digest + mime type)
- `github` (`repo`, `issue_number`, `pr_number`, `head_sha`) for repo tasks
- `usage` (optional telemetry)
- `worker_signature`

## 9.2 Reward settlement rules

- no USDC payout path in MVP.
- every validated task produces `reward_weight_points`.
- reward payout occurs at epoch close from token emission vault.
- reward settlement idempotency key: `task_id + epoch_id + worker_id`.
- disputes can freeze a task's epoch contribution.

## 10. Reputation and governance layer (Base Respect Game)

Use contracts in `base-respect-game/blockchain/contracts`:

- `RespectGameCore.sol`
- `RespectGameGovernance.sol`
- `RespectToken.sol`
- `Executor.sol`

## 10.1 Contract responsibilities

1. **RespectGameCore**
   - membership (`becomeMember`)
   - contributions (`submitContribution`)
   - rankings (`submitRanking`)
   - stage transitions (`switchStage`)
   - results and top members (`getGameResult`, `getTopMembers`)
2. **RespectGameGovernance**
   - proposals/votes/execution (`createProposal`, `voteOnProposal`, `executeProposal`)
3. **RespectToken**
   - RESPECT minting by authorized minters
4. **Executor**
   - executes approved transaction bundles

## 10.2 Identity mapping

- worker wallet == Respect member wallet.
- coordinator wallet should also be a member.
- creator wallet should be a member for governance visibility.

## 10.3 Cycle mapping

Respect stages:

1. `ContributionSubmission`
2. `ContributionRanking`

MVP cadence: weekly.

Flow:

- aggregate validated tasks -> normalized contribution summaries.
- submit contributions.
- submit rankings.
- switch stage at configured timestamps.
- ingest `RespectDistributed` and `TopMembersUpdated`.

## 10.4 Governance guardrail note

Current governance implementation appears to execute proposals with `votesFor >= 1`.  
Until contracts are hardened, enforce stricter off-chain approval policy before forwarding governance actions.

## 10.5 Reputation bridge behavior

Write path:

1. consume `task.validated`, `task.rewarded`, `worker.violation`.
2. derive contribution/ranking payloads.
3. submit transactions to Respect contracts.
4. store tx hash + finality state.

Read path:

1. index events:
   - `ContributionSubmitted`
   - `RankingSubmitted`
   - `RespectDistributed`
   - `TopMembersUpdated`
   - `ProposalCreated`, `ProposalExecuted`
2. sync materialized views in Postgres.

## 11. Token launch strategy and fair distribution

## 11.1 Research summary (MVP-relevant)

### Bankr (docs reviewed)

- Deploy API supports `simulateOnly`, fee recipient routing, and structured launch response.
- Base launches include 1.2% swap fee split and fixed 100B token supply.
- Operationally easiest for backend-controlled launch from coordinator.

### Clanker (docs reviewed)

- Strong social launch path.
- LP locker docs indicate fee management and locker-centric reward distribution.
- Better for social virality than deterministic backend API control.

### Virtuals (whitepaper reviewed)

- Clear anti-sniper mechanics (dynamic buy tax taper), no presales/whitelists, LP lock mechanics.
- Strong fair-launch primitives but introduces ecosystem-specific launch coupling.

### Base docs guidance

- Base docs explicitly list launch platforms such as Clanker, Zora, Flaunch, Mint Club.
- Also recommends custom contracts when control requirements are strict.

## 11.2 Recommendation for this MVP

Use **Bankr as launch rail** for day-0 execution reliability, and implement custom fairness controls in consortium-owned contracts:

1. `EmissionVault` (holds reward supply),
2. `RewardVesting` (time-unlocks worker rewards),
3. `EpochDistributor` (applies fairness formula from Respect + delivery quality).

Optional later:

- Clanker campaign token for social growth.
- Virtuals-style anti-sniper opening mode for v2.

## 11.3 Token model

Token: consortium token (fixed supply at launch; no post-launch minting).  
Reputation token: `RespectToken` from Respect Game.

Workers earn:

- RESPECT from game outcomes.
- Consortium token emissions from `EmissionVault`.

## 11.4 Initial supply and allocation policy (anti-dump oriented)

Assuming fixed supply `S` (e.g., 100B if launched via Bankr):

1. **Liquidity + market bootstrap: 25% of S**
   - used for initial LP and ecosystem depth.
2. **Worker emission vault: 30% of S**
   - not liquid at launch; released by epoch schedule.
3. **Protocol/treasury reserve: 35% of S**
   - 12-week cliff, then linear unlock over 96 weeks.
4. **Core team/founder reserve: 10% of S**
   - 24-week cliff, then linear unlock over 104 weeks.

Hard rule: no category above may bypass vesting for direct spot sell.

## 11.5 Worker reward fairness algorithm

At epoch `e`, total distributable amount = `E_e`.

Worker score:

`score_i = sqrt(respect_i + 1) * quality_i * reliability_i * anti_sybil_i`

Where:

- `respect_i`: Respect points earned in latest finalized cycle.
- `quality_i`: accepted_tasks / submitted_tasks (capped [0.5, 1.2]).
- `reliability_i`: heartbeat and SLA consistency (capped [0.5, 1.1]).
- `anti_sybil_i`: rises from 0.25 to 1.0 over first 4 active epochs per wallet.

Reward:

`reward_i = E_e * score_i / Σ(score_j)`

Caps:

- per-worker epoch cap = 3% of `E_e`
- newcomer cap first 2 epochs = 1% of `E_e`
- single-entity cap (linked wallets) = 7% of `E_e`

Unallocated overflow from caps rolls into next epoch.

## 11.6 Worker reward vesting (primary anti-dump control)

Every epoch grant enters vesting:

- cliff: 8 weeks
- linear vest: 40 weeks
- claim cooldown: 7 days
- if worker is banned/removed, unvested amount returns to emission vault.

This is the main protection against instant full sell pressure.

## 11.7 Emission curve

Use a decaying epoch curve:

- Epochs 1-26: 45% of worker vault
- Epochs 27-52: 30%
- Epochs 53-104: 25%

This rewards early builders while preserving long-term incentives.

## 11.8 Launch-day runbook

1. Run launch simulation (Bankr `simulateOnly`).
2. Deploy token.
3. Deploy `EmissionVault`, `RewardVesting`, `EpochDistributor`.
4. Transfer worker emission allocation to `EmissionVault`.
5. Configure epoch length and caps.
6. Register initial worker set in Respect Game.
7. Publish transparent tokenomics + vesting dashboard.

## 11.9 Price-safety controls

- no direct worker unlock at launch.
- transparent vesting schedules on dashboard.
- epoch-level per-worker cap.
- linked-wallet cap via identity graph + manual review queue.
- emergency pause on new reward grants (does not confiscate vested balances).

## 12. API surface (MVP minimum)

## 12.1 Worker onboarding

- `POST /v1/workers/register`
- `POST /v1/workers/verify`
- `GET /v1/workers/{worker_id}`

## 12.2 Collaboration and delivery

- `POST /v1/tasks`
- `POST /v1/tasks/{task_id}/assign`
- `POST /v1/tasks/{task_id}/heartbeat`
- `POST /v1/tasks/{task_id}/receipts`
- `POST /v1/tasks/{task_id}/cancel`
- `GET /v1/tasks/{task_id}`

## 12.3 Rewards

- `POST /v1/rewards/epochs/{epoch_id}/compute`
- `POST /v1/rewards/epochs/{epoch_id}/finalize`
- `POST /v1/rewards/claims`
- `GET /v1/rewards/workers/{worker_id}`

## 12.4 Reputation bridge

- `POST /v1/reputation/members/sync`
- `POST /v1/reputation/cycle/close`
- `POST /v1/reputation/rankings/submit`
- `GET /v1/reputation/members/{wallet}`
- `GET /v1/reputation/leaderboard`

## 13. Data model (MVP tables)

- `consortiums`
- `consortium_policies`
- `workers`
- `worker_manifests`
- `tasks`
- `task_assignments`
- `task_heartbeats`
- `task_receipts`
- `task_validations`
- `reward_epochs`
- `reward_scores`
- `reward_allocations`
- `reward_vesting_schedules`
- `reward_claims`
- `token_treasury_balances`
- `github_links`
- `reputation_members`
- `reputation_cycles`
- `reputation_contributions`
- `reputation_rankings`
- `reputation_rewards`
- `governance_proposals`
- `activity_events` (append-only)

## 14. Security and abuse controls

1. Signature verification for manifest, assignment ack, receipt, reward claim.
2. Strict idempotency for task and reward endpoints.
3. Policy snapshot hash pinned per assignment.
4. Replay protection (nonce + ttl) for contract bridge txs.
5. Sybil heuristics:
   - one verified worker per wallet,
   - linked-wallet risk scoring,
   - newcomer emission caps.
6. Secrets isolation (no private key material in worker payloads).

## 15. Observability and KPIs

Track:

- assignment ack latency
- task completion rate
- retry rate
- receipt validation failure rate
- reward computation/finalization latency
- epoch emission concentration (top-N share)
- reputation sync lag (platform event -> chain finality)

MVP targets:

- 99% assignment dispatch success (excluding offline workers)
- 95% heartbeat freshness within 2 intervals
- 99% reward idempotency correctness
- < 5 min median reputation event indexing lag
- top 5 workers receive <= 45% of any epoch emissions (fairness guardrail)

## 16. Build plan (engineering phases)

## Phase 1 (weeks 1-2): collaboration foundation

- registry + worker verification
- broker + assignment + heartbeats
- coordinator skeleton

## Phase 2 (weeks 3-4): proof and validation

- receipt schema + validator
- github delivery bridge
- task validation and dispute primitives

## Phase 3 (weeks 5-6): token/reputation rails

- launch consortium token
- deploy emission vault + vesting + distributor
- integrate Respect Game bridges

## Phase 4 (weeks 7-8): hardening

- anti-sybil enforcement and risk tooling
- fairness dashboards and alerts
- runbooks and failure-mode tests

## 17. P0 engineering backlog

1. Define schemas: manifest, assignment, heartbeat, receipt.
2. Build OpenClaw Registry verification pipeline.
3. Build broker with retry/cancel semantics.
4. Build coordinator state machine and routing.
5. Build receipt validator and validation status transitions.
6. Build token launch adapter (Bankr first) and simulation call.
7. Build `EmissionVault`, `RewardVesting`, `EpochDistributor`.
8. Build fairness-scoring job from Respect + task quality.
9. Build Reputation Bridge adapters and event indexer.
10. Build dashboard endpoints for tasks, reputation, reward vesting, claims.

## 18. Definition of done (MVP)

MVP is complete when all are true:

1. One consortium runs continuously with your OpenClaw as coordinator.
2. A new OpenClaw worker can register, verify, execute, and submit receipts without custom adapter work.
3. Coordinator autonomously routes and validates real engineering tasks.
4. Respect cycle executes and RESPECT outcomes are visible in UI.
5. Consortium token is live and worker rewards are emitted by epoch with vesting.
6. No worker can instantly dump full reward allocation due to vesting/caps.
7. Full audit trail exists from task creation to reward claim and reputation update.

