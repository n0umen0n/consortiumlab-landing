# Consortium Factory OpenClaw Consortium Architecture (MVP v2)

Status: Draft v2 (implementation-ready)  
Audience: Engineering agent(s) building backend + protocol + coordinator runtime  
Last updated: 2026-03-06

## 1. Objective

Build the first production consortium as an OpenClaw-native system where:

1. Exactly one consortium runs in MVP.
2. The consortium mission is: **build Consortium Factory**.
3. Your OpenClaw instance is the first and active coordinator.
4. Any operator with an OpenClaw runtime can plug in quickly as a worker.
5. Task coordination is autonomous for normal flows (human-in-loop only for exceptions).
6. Reputation/governance uses the contracts in `base-respect-game/blockchain/contracts`.

This document is the authoritative architecture for implementation.

## 2. Product copy alignment (latest landing-page claims)

The architecture must support the current product promises:

- "Launch a mission" and "Join a mission" entry paths.
- Mission creator OpenClaw acts as coordinator/CEO.
- Plug-in OpenClaw workers can join and earn.
- Evidence-backed delivery using receipts.
- Equity + reputation growth layer.

## 3. MVP scope and non-goals

## 3.1 In scope

- One consortium instance.
- One active coordinator OpenClaw.
- N plug-in OpenClaw workers.
- Task planning, assignment, execution tracking, receipt submission, settlement.
- GitHub-first delivery for engineering tasks.
- Reputation and governance integration with Base Respect Game contracts.

## 3.2 Out of scope for MVP

- Multi-consortium tenancy.
- Non-OpenClaw adapters.
- Multi-chain support.
- Fully trustless on-chain task routing.
- Advanced staking/slashing.

## 4. System architecture

## 4.1 Components

1. **Landing + Ops UI (Next.js)**
   - Mission overview, worker onboarding, task visibility, reputation views.
2. **API Gateway**
   - Auth, rate limiting, idempotency key validation.
3. **Consortium Service**
   - Consortium config, mission policy, worker roster, task metadata.
4. **OpenClaw Registry**
   - Worker manifest verification and capability indexing.
5. **OpenClaw Broker (Collaboration Plane)**
   - Assignment queue, dispatch, heartbeats, retries, cancellation.
6. **Coordinator Runtime**
   - Runs your OpenClaw coordinator logic and planning loops.
7. **Receipt + Settlement Service**
   - Receipt validation, payout computation, payout execution.
8. **GitHub Delivery Bridge**
   - Task-to-issue/PR mapping, checks, merge evidence.
9. **Reputation Bridge**
   - Maps platform events to Respect Game contract calls and indexes on-chain events.
10. **Event Store**
    - Append-only source of truth for audit/replay.

## 4.2 Deployment topology (MVP)

- Single region deployment.
- One logical consortium namespace (`consortium_id = consortium_factory_mvp`).
- One coordinator identity (`coordinator_worker_id` fixed to your OpenClaw).
- Shared broker queue, partitioned by `task_type`.

## 5. Identity and trust model

## 5.1 Core identities

- **Creator wallet**: consortium owner authority.
- **Coordinator wallet**: your OpenClaw coordinator identity.
- **Worker wallet**: each plugged-in operator OpenClaw.

All critical writes require wallet-bound signatures:

- worker registration manifest signature
- assignment acceptance signature
- receipt signature
- payout approval signature (for exceptional/manual paths)

## 5.2 Trust levels

- `verified`: passed handshake + signed manifest + dry run.
- `limited`: manifest valid but limited capability or partial checks.
- `blocked`: policy or abuse violation.

Only `verified` workers can receive autonomous assignments in MVP.

## 6. OpenClaw plug-in protocol (any OpenClaw can join)

## 6.1 Worker manifest (required)

Each worker must publish a signed manifest:

- `worker_id`
- `wallet_address`
- `openclaw_version`
- `display_name`
- `capabilities[]` (taxonomy tags, ex: `frontend.react`, `docs.architecture`)
- `execution_modes[]` (`deterministic`, `creative`, `review`)
- `pricing_mode` (`metered_cap` or `fixed_task`)
- `concurrency_limit`
- `max_task_budget_usdc`
- `github_delivery_supported` (bool)
- `receipt_schema_version`
- `signature_pubkey`
- `manifest_signature`
- `created_at`, `expires_at`

## 6.2 Registration flow

1. Operator connects wallet.
2. Operator submits manifest.
3. Registry verifies schema + signature + expiry.
4. Registry runs OpenClaw handshake:
   - ping
   - sample task assignment
   - sample receipt verification
5. Registry marks worker `verified`.
6. Worker appears in match pool immediately.

Target onboarding time: under 10 minutes.

## 6.3 Handshake contract

Required worker operations:

- `acceptAssignment(assignment_packet)`
- `sendHeartbeat(task_id, progress_pct, summary)`
- `submitReceipt(receipt_packet)`
- `cancelTask(task_id, reason)`

Transport: HTTPS JSON for MVP (WebSocket streaming optional for live updates).

## 6.4 Idempotency and replay

- Every assignment has `assignment_id` and `idempotency_key`.
- Repeated dispatch with same `assignment_id` must be no-op.
- Receipt updates are append-only and versioned (`receipt_revision`).

## 7. Collaboration layer (how coordinator and workers pass work)

## 7.1 Collaboration primitives

- **TaskSpec**: intent + acceptance criteria + budget + deadlines.
- **Assignment**: TaskSpec bound to specific worker and policy snapshot.
- **Heartbeat**: liveness + progress + blockers.
- **Receipt**: execution evidence + resource usage + deliverable links.
- **DecisionEvent**: accepted/rejected/revision-requested/settled.

## 7.2 Task lifecycle state machine

`PLANNED -> BUDGET_RESERVED -> ASSIGNED -> ACCEPTED -> RUNNING -> SUBMITTED -> VALIDATED -> SETTLED`

Failure branches:

- `RETRYABLE_FAILED`
- `TERMINAL_FAILED`
- `CANCELLED`
- `DISPUTED`

## 7.3 Assignment routing policy

Coordinator computes candidate score:

`score = capability_fit * 0.35 + reliability * 0.25 + cost_fit * 0.20 + latency_fit * 0.10 + reputation_weight * 0.10`

Rules:

- hard filter by capability tags and budget cap.
- prefer workers with fewer active assignments if score delta < 5%.
- fallback to next ranked worker on timeout.

## 7.4 Timeout and retry policy

- assignment ack timeout: 60s
- heartbeat interval: 45s
- stale heartbeat threshold: 3 missed intervals
- max automatic retries per task: 2
- retry strategy: exponential backoff (30s, 90s)

## 7.5 Conflict and escalation

Human escalation only when:

- receipt validation fails after one revision request
- payout above policy threshold
- dispute opened by creator or worker
- security policy trigger (signature mismatch, suspicious replay)

## 7.6 Collaboration transport and topics

Use a brokered collaboration model (not direct worker-to-worker RPC) so coordinator policy remains authoritative.

Topic set (Redis Streams, NATS, or equivalent):

- `tasks.planned`
- `tasks.budget_reserved`
- `tasks.assigned`
- `tasks.accepted`
- `tasks.heartbeat`
- `tasks.submitted`
- `tasks.validated`
- `tasks.settled`
- `tasks.failed`
- `tasks.disputed`

Envelope (all collaboration messages):

- `message_id` (uuid)
- `trace_id`
- `consortium_id`
- `task_id`
- `assignment_id` (nullable for pre-assignment events)
- `message_type`
- `created_at`
- `producer` (`coordinator`, `worker`, `system`)
- `schema_version`
- `payload` (typed object)

## 7.7 Canonical sequence (task to payout)

1. Coordinator emits `tasks.planned` with TaskSpec.
2. Settlement service reserves budget and emits `tasks.budget_reserved`.
3. Broker dispatches assignment, emits `tasks.assigned`.
4. Worker acknowledges assignment (`tasks.accepted`).
5. Worker sends periodic heartbeats (`tasks.heartbeat`).
6. Worker submits receipt (`tasks.submitted`).
7. Validator emits `tasks.validated` or revision request.
8. Settlement executes payout and emits `tasks.settled`.
9. Reputation bridge consumes `tasks.validated`/`tasks.settled` for cycle inputs.

## 7.8 Work packet versioning strategy

- `task_schema_version` and `receipt_schema_version` are mandatory.
- Breaking changes use new versioned endpoints (`/v2/...`) and dual-write period.
- Coordinator and worker must advertise supported versions in manifest.
- Registry rejects workers that do not support current minimum versions.

## 8. Coordinator runtime design

## 8.1 Coordinator loops

1. **Planning loop (30-120s)**
   - break mission goals into TaskSpecs.
2. **Dispatch loop (10-30s)**
   - match tasks to verified workers and assign.
3. **Supervision loop (15-45s)**
   - evaluate heartbeats, detect stalls, trigger retries.
4. **Settlement loop (30-60s)**
   - validate receipts, release payouts, emit accounting events.
5. **Reputation loop (hourly + cycle-end)**
   - aggregate contributions and push to Respect Game bridge.

## 8.2 Coordinator command contract

Coordinator emits only deterministic commands to broker:

- `CREATE_TASK`
- `ASSIGN_TASK`
- `REQUEST_REVISION`
- `CANCEL_TASK`
- `APPROVE_SETTLEMENT`
- `ESCALATE_DISPUTE`

All coordinator actions are written to event store with trace IDs.

## 9. Delivery and settlement layer

## 9.1 Receipt schema (required fields)

- `receipt_id`
- `task_id`
- `worker_id`
- `assignment_id`
- `execution_started_at`, `execution_completed_at`
- `deliverables[]` (URI + digest + mime type)
- `github` block (`repo`, `issue_number`, `pr_number`, `head_sha`) for repo tasks
- `usage` block (`model`, `input_tokens`, `output_tokens`, `tool_calls`) for metered mode
- `requested_payout_usdc`
- `worker_signature`

## 9.2 Settlement policy

- reserve budget before assignment.
- payout only from validated receipt.
- idempotent settlement key: `task_id + receipt_id`.
- default dispute window: 24h.

## 10. Reputation and governance layer (Base Respect Game integration)

Use these contracts from `base-respect-game/blockchain/contracts`:

- `RespectGameCore.sol`
- `RespectGameGovernance.sol`
- `RespectToken.sol`
- `Executor.sol`
- interfaces under `contracts/interfaces/*`

## 10.1 Contract responsibilities mapping

1. **RespectGameCore**
   - membership (`becomeMember`)
   - contribution submission (`submitContribution`)
   - peer ranking (`submitRanking`)
   - stage transitions (`switchStage`)
   - game results and top members (`getGameResult`, `getTopMembers`)
2. **RespectGameGovernance**
   - treasury/member governance proposals (`createProposal`, `voteOnProposal`, `executeProposal`)
3. **RespectToken**
   - mints RESPECT to members according to game outcomes
4. **Executor**
   - executes approved transaction bundles from governance

## 10.2 Platform-to-contract identity mapping

- worker wallet == Respect member wallet.
- coordinator wallet can also be a member.
- consortium creator wallet should join as member for governance visibility.

## 10.3 Reputation cycle mapping

Respect Game has two stages:

1. `ContributionSubmission`
2. `ContributionRanking`

MVP mapping:

- cycle cadence: weekly.
- during week: bridge aggregates accepted task receipts per worker.
- cycle close:
  - push grouped contribution summaries via `submitContribution` (or require direct worker submission through guided flow).
  - orchestrate ranking groups and ranking submission.
  - call `switchStage` transitions according to stage timestamps.
- on game completion: ingest `RespectDistributed` and `TopMembersUpdated`.

## 10.4 Governance usage in consortium

Use Respect governance for high-impact actions:

- remove abusive member (`removeMember` path via governance proposal).
- execute treasury transactions requiring social consensus.
- approve new members if policy requires governance path.

Important implementation note:

- Current governance implementation appears to execute with `votesFor >= 1`.
- Until contracts are upgraded, enforce stricter off-chain policy in backend before forwarding governance transactions.

## 10.5 Reputation Bridge service behavior

Write path:

1. consume platform events (`task.validated`, `task.settled`, `worker.violation`).
2. derive contribution payloads and ranking candidate sets.
3. submit contract transactions through signer service.
4. persist tx hash + confirmation status.

Read path:

1. index on-chain events:
   - `ContributionSubmitted`
   - `RankingSubmitted`
   - `RespectDistributed`
   - `TopMembersUpdated`
   - `ProposalCreated`, `ProposalExecuted`
2. sync materialized reputation views in Postgres.

## 11. API surface (MVP minimum)

## 11.1 Worker onboarding

- `POST /v1/workers/register`
- `POST /v1/workers/verify`
- `GET /v1/workers/{worker_id}`

## 11.2 Collaboration and execution

- `POST /v1/tasks`
- `POST /v1/tasks/{task_id}/assign`
- `POST /v1/tasks/{task_id}/heartbeat`
- `POST /v1/tasks/{task_id}/receipts`
- `POST /v1/tasks/{task_id}/cancel`
- `GET /v1/tasks/{task_id}`

## 11.3 Settlement

- `POST /v1/settlements/{task_id}/validate`
- `POST /v1/settlements/{task_id}/execute`
- `POST /v1/settlements/{task_id}/dispute`

## 11.4 Reputation bridge

- `POST /v1/reputation/members/sync`
- `POST /v1/reputation/cycle/close`
- `POST /v1/reputation/rankings/submit`
- `GET /v1/reputation/members/{wallet}`
- `GET /v1/reputation/leaderboard`

## 11.5 Canonical payloads (minimum contract)

### Task create payload

- `task_id`
- `title`
- `description`
- `task_type`
- `capability_tags[]`
- `acceptance_criteria[]`
- `budget_mode` (`metered_cap` | `fixed_task`)
- `budget_amount_usdc`
- `deadline_at`
- `delivery_target` (`github_pr` | `artifact_bundle`)
- `policy_snapshot_hash`

### Assignment payload

- `assignment_id`
- `task_id`
- `worker_id`
- `idempotency_key`
- `assigned_at`
- `ack_deadline_at`
- `priority`
- `retry_count`
- `execution_constraints` (timebox, tool constraints, branch naming)

### Heartbeat payload

- `task_id`
- `assignment_id`
- `worker_id`
- `progress_pct`
- `status_message`
- `eta_seconds`
- `blockers[]`
- `sent_at`

### Receipt payload

- `receipt_id`
- `task_id`
- `assignment_id`
- `worker_id`
- `result_summary`
- `deliverables[]`
- `usage`
- `requested_payout_usdc`
- `submitted_at`
- `signature`

## 12. Data model (MVP tables)

- `consortiums`
- `consortium_policies`
- `workers`
- `worker_manifests`
- `tasks`
- `task_assignments`
- `task_heartbeats`
- `task_receipts`
- `settlements`
- `payout_transactions`
- `github_links`
- `reputation_members`
- `reputation_cycles`
- `reputation_contributions`
- `reputation_rankings`
- `reputation_rewards`
- `governance_proposals`
- `activity_events` (append-only)

## 13. Security controls

1. Signature verification on manifest, assignment ack, and receipt.
2. Strict idempotency keys on assignment/settlement endpoints.
3. Policy snapshot hash pinned on each assignment.
4. Replay protection (nonce + ttl) for contract-bridge operations.
5. Rate limits and abuse heuristics for worker endpoints.
6. Secrets isolation (no raw private keys in worker-facing payloads).

## 14. Observability and SLOs

Required telemetry:

- assignment ack latency
- task completion rate
- retry rate
- settlement failure rate
- payout latency
- worker onboarding funnel conversion
- reputation sync lag (platform event -> on-chain finalized)

MVP SLO targets:

- 99% assignment dispatch success (excluding worker offline)
- 95% task heartbeat freshness within 2 intervals
- 99% settlement idempotency correctness
- < 5 min median reputation event indexing lag

## 15. Build plan (engineering phases)

## Phase 1: Collaboration foundation (weeks 1-2)

- implement worker manifest schema and registry verification.
- implement broker queues + assignment API + heartbeats.
- ship coordinator skeleton with planning/dispatch/supervision loops.

## Phase 2: Delivery and money rails (weeks 3-4)

- implement receipt schema and validator.
- implement settlement service with budget reservation + payout execution.
- integrate GitHub delivery bridge.

## Phase 3: Respect game integration (weeks 5-6)

- deploy/integrate Respect contracts on Base environment.
- build reputation bridge write/read paths.
- build cycle close + ranking orchestration jobs.

## Phase 4: Hardening (weeks 7-8)

- add dispute workflows and governance proposal tooling.
- add dashboards, alerts, replay tools, incident runbooks.
- complete end-to-end load and failure-mode tests.

## 16. P0 engineering backlog (agent-executable)

1. Define JSON schemas for manifest, assignment, heartbeat, receipt.
2. Build OpenClaw Registry service with signature + dry-run verification.
3. Build Broker with queue partitions and retry/cancel semantics.
4. Build coordinator state machine and routing policy.
5. Build receipt validator + settlement executor with idempotency.
6. Build GitHub task link + PR validation module.
7. Build reputation bridge adapters for RespectGameCore/Governance/Token.
8. Build event indexer for on-chain Respect events.
9. Build mission dashboard endpoints for tasks, payouts, and reputation.

## 17. Definition of done (MVP)

MVP is complete when all are true:

1. One consortium can run continuously with your OpenClaw as coordinator.
2. A new OpenClaw worker can register, verify, receive task, and submit receipt without custom adapter code.
3. Coordinator autonomously routes and settles at least one real engineering task end-to-end.
4. Reputation cycle executes and RESPECT distribution is visible in product UI.
5. Governance proposal flow can execute at least one controlled treasury/member action.
6. Full audit trail exists from task creation to payout and reputation update.

