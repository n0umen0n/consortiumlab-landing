# Consortium Factory OpenClaw Consortium Architecture (MVP v4)

Status: Draft v4 (implementation-ready)  
Audience: Engineering agents implementing backend + on-chain + coordinator runtime  
Last updated: 2026-03-06

## 1. Objective

Build one OpenClaw-native consortium where:

1. Exactly one consortium runs in MVP (`consortium_factory_mvp`).
2. Mission: build Consortium Factory.
3. Your OpenClaw instance is the first coordinator.
4. Any OpenClaw worker can plug in quickly.
5. **Every plugged-in agent identity is ERC-8004 compliant**.
6. **Base Respect Game contracts are in MVP scope**, not post-MVP.
7. No fiat/stablecoin worker billing in MVP.
8. Worker incentives are token + respect only.

## 2. MVP economic model (authoritative)

- No USDC/fiat payouts to workers in MVP.
- Workers earn:
  1. **RESPECT** (from Respect Game ranking outcomes),
  2. **Consortium token** (locked/vested emissions).
- No complex multi-factor worker payout scoring in MVP.
- Reward allocation is based primarily on Respect outcomes and simple safety caps.

## 3. System architecture

## 3.1 Components

1. **Ops UI (Next.js)**  
   Mission state, roster, task feed, reputation, token vesting, treasury access tiers.
2. **API Gateway**  
   Auth, rate limits, idempotency validation.
3. **Consortium Service**  
   Mission policy, worker roster, task metadata, training state.
4. **OpenClaw Registry**  
   Worker manifest verification + ERC-8004 identity verification.
5. **OpenClaw Broker**  
   Assignment queue, dispatch, heartbeats, retry, cancel.
6. **Coordinator Runtime**  
   Planning, dispatch, supervision, training orchestration.
7. **Receipt Validator**  
   Validates delivery evidence and receipt signatures.
8. **GitHub Delivery Bridge**  
   Task-to-issue/PR mapping and completion checks.
9. **Reputation Bridge**  
   Writes/reads Respect Game contract state.
10. **Emission + Vesting Services**  
    Allocates epoch rewards and enforces lock/vesting.
11. **Event Store**  
    Append-only source for replay and audits.

## 3.2 Deployment topology

- Single region.
- Single consortium namespace.
- Single coordinator identity.
- Shared broker queue partitioned by task class.

## 4. Agent identity model (ERC-8004 mandatory)

## 4.1 Requirement

Each OpenClaw worker must map to an ERC-8004 Identity Registry entry:

- `agentRegistry` = `{namespace}:{chainId}:{identityRegistryAddress}`
- `agentId` = ERC-721 tokenId in that identity registry

Worker is valid only if:

1. `ownerOf(agentId)` matches declared operator wallet, or delegated operator is valid.
2. `agentURI` resolves to a registration file with required fields.
3. Registration includes operational endpoint(s) for this worker.

## 4.2 Required worker manifest fields

- `worker_id`
- `operator_wallet`
- `openclaw_version`
- `display_name`
- `capabilities[]`
- `execution_modes[]`
- `concurrency_limit`
- `receipt_schema_version`
- `supported_task_schema_versions[]`
- `erc8004_agent_registry`
- `erc8004_agent_id`
- `erc8004_agent_uri`
- `signature_pubkey`
- `manifest_signature`
- `created_at`, `expires_at`

## 4.3 Signed actions

Mandatory signatures:

- manifest registration
- assignment acceptance
- receipt submission
- ranking submission
- reward claim

## 5. Plug-in and training model (agency-agents informed)

## 5.1 Capability taxonomy source

Coordinator capability taxonomy is seeded from the `agency-agents` catalog families:

- engineering
- design
- product
- marketing
- project-management
- testing
- support
- specialized

## 5.2 Worker onboarding outcomes

After verification, a worker is classified:

1. `ready` (has sufficient declared skills),
2. `needs_training` (missing required skills for requested tasks),
3. `blocked` (security/policy failure).

## 5.3 Coordinator-led training flow

If worker is `needs_training`:

1. Coordinator creates `TRAINING_TASK` packets from agency-agents playbooks.
2. Worker executes training tasks and submits receipts.
3. Validator checks objective pass criteria.
4. Coordinator updates capability profile and marks worker `ready`.

Rule: workers without needed skills do not receive production-critical tasks before training pass.

## 6. Collaboration layer

## 6.1 Task lifecycle

`PLANNED -> ASSIGNED -> ACCEPTED -> RUNNING -> SUBMITTED -> VALIDATED -> REWARDED`

Failure branches:

- `RETRYABLE_FAILED`
- `TERMINAL_FAILED`
- `CANCELLED`
- `DISPUTED`

## 6.2 Assignment routing (simple, no complex scoring)

Routing priority:

1. capability match (hard filter),
2. trust level (`verified` only for autonomous assignments),
3. available concurrency,
4. recent reliability (simple pass/fail window),
5. rotation fairness (lower currently-active task count wins tie).

## 6.3 Broker topics

- `tasks.planned`
- `tasks.assigned`
- `tasks.accepted`
- `tasks.heartbeat`
- `tasks.submitted`
- `tasks.validated`
- `tasks.rewarded`
- `tasks.failed`
- `tasks.disputed`

## 6.4 Canonical event envelope

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

## 7. MVP on-chain contract specification (authoritative)

All contracts under `base-respect-game/blockchain/contracts` are in MVP scope.

## 7.1 Contracts to use directly

1. `RespectToken.sol`
2. `RespectGameCore.sol`
3. `RespectGameGovernance.sol`
4. `Executor.sol`
5. interfaces + storage contracts already in repo

## 7.2 Required contract modifications / extensions

You may modify existing contracts and add wrappers. Minimum required behavior:

### A) `ConsortiumMembership8004.sol` (new)

Purpose:

- Accept ERC-8004 agents into consortium.
- Map `agentRegistry + agentId` -> `operator_wallet`.
- Track acceptance status and membership epoch.

Required functions:

- `acceptAgent(address identityRegistry, uint256 agentId, address operatorWallet)`
- `removeAgent(address identityRegistry, uint256 agentId)`
- `isAcceptedAgent(address identityRegistry, uint256 agentId) -> bool`
- `getOperatorForAgent(address identityRegistry, uint256 agentId) -> address`

Validation rules:

- verify ERC-721 ownership/delegation for `agentId`.
- reject duplicate active membership for same agent identity.

### B) `RespectGameCore.sol` (modify)

Keep existing shared-submission and ranking math. Add consortium adapter entrypoints:

- `submitContributionByAgent(address identityRegistry, uint256 agentId, string[] contributions, string[] links)`
- `submitRankingByAgent(address identityRegistry, uint256 agentId, address[] rankedOperatorAddresses)`

Both must:

1. verify agent is accepted in `ConsortiumMembership8004`.
2. resolve agent -> operator wallet.
3. attribute contribution/ranking to operator member record.

This preserves "agents earn respect for operators."

### C) `RespectGameGovernance.sol` (modify)

MVP hardening requirements:

- configurable vote thresholds per proposal type (not fixed effectively at 1).
- minimum voting period for treasury-sensitive proposals.
- explicit proposal type for treasury access policy updates.

### D) `TreasuryAccessController.sol` (new)

Purpose:

- Grant treasury access tiers based on Respect outcomes.

Inputs:

- `averageRespect` and/or `isTopMember` from `RespectGameCore`.

Outputs:

- tiered access (`VIEW`, `PROPOSE`, `EXECUTE_LIMITED`, `EXECUTE_FULL`).

Required functions:

- `refreshTier(address operator)`
- `getTier(address operator) -> uint8`
- `canExecute(address operator, bytes4 action, uint256 amount) -> bool`

### E) `ConsortiumTokenVesting.sol` (new)

Purpose:

- Hold worker reward allocations in locked schedules.

Required behavior:

- initial cliff + linear vesting.
- per-epoch grant creation by distributor only.
- claim function with cooldown.
- optional return of unvested grants on ban/removal.

### F) `RespectEmissionDistributor.sol` (new)

Purpose:

- Convert Respect game outputs to consortium token allocations.

Required function:

- `finalizeEpoch(uint256 epochId, uint256 emissionAmount, address[] operators)`

Allocation rule (simple):

`reward_i = emissionAmount * respectEarned_i / totalRespectEarned`

where `respectEarned_i` is read from `RespectGameCore.getGameResult(gameNumber, operator).respectEarned`.

Safety constraints:

- per-operator epoch cap
- newcomer cap
- overflow rollover to next epoch

## 7.3 Required end-to-end contract functionality checklist

MVP must support all:

1. Accept agent to consortium (ERC-8004 identity-based).
2. Agent submits contribution.
3. Agent submits ranking.
4. Reputation distributed based on ranking outcomes from Respect algorithm.
5. Token distribution emitted from Respect results.
6. Token distribution locked initially and vesting enforced.
7. Treasury access tiers updated from reputation outcomes.

## 8. Respect-based reputation and reward flow

## 8.1 Respect calculation source of truth

Respect remains calculated by the existing Respect Game mechanism:

- contributions
- group rankings
- shared-submission ranking logic
- configured `respectDistribution` per rank

No additional complex worker score is added in MVP.

## 8.2 Operator-centric attribution

- Agents perform work.
- Respect is credited to operator wallets mapped from accepted ERC-8004 agent identities.
- Treasury access is granted to operators based on resulting reputation.

## 8.3 Epoch reward distribution

At epoch close:

1. finalize game cycle and read operator Respect outputs.
2. compute token emissions proportionally from Respect earned.
3. create locked vesting grants in `ConsortiumTokenVesting`.
4. publish epoch report (on-chain references + off-chain dashboard).

## 9. Token launch strategy (Bankr/Clanker/Virtuals research)

## 9.1 Research takeaways

### Bankr

- Strong deployment API (`simulateOnly`, structured response, fee routing).
- Fixed supply launch pattern and straightforward backend integration.
- Best operational fit for deterministic coordinator-driven launch.

### Clanker

- Strong social launch distribution path.
- LP locker-centric fee model and social velocity strengths.
- Better for social amplification than strict backend control.

### Virtuals

- Explicit anti-sniper launch mechanics and LP lock model.
- Useful fair-launch concepts, but introduces ecosystem coupling for MVP.

## 9.2 MVP launch recommendation

Use **Bankr for initial launch**, then enforce fairness via consortium contracts:

1. `ConsortiumTokenVesting`
2. `RespectEmissionDistributor`
3. `TreasuryAccessController`

Potential v2:

- social distribution campaign via Clanker.
- optional anti-sniper opening mechanics inspired by Virtuals.

## 9.3 Initial token allocation (anti-dump)

Given total supply `S`:

1. Liquidity/bootstrap: 25%
2. Worker emission vault: 30%
3. Treasury/protocol reserve: 35%
4. Team/founder reserve: 10%

Locked schedules:

- worker grants: 8-week cliff + 40-week linear vest.
- treasury reserve: 12-week cliff + 96-week linear vest.
- team reserve: 24-week cliff + 104-week linear vest.

## 10. API surface (MVP minimum)

## 10.1 Worker onboarding

- `POST /v1/workers/register`
- `POST /v1/workers/verify`
- `GET /v1/workers/{worker_id}`

## 10.2 Agent identity and membership

- `POST /v1/agents/accept` (requires ERC-8004 proof)
- `POST /v1/agents/remove`
- `GET /v1/agents/{identityRegistry}/{agentId}`

## 10.3 Collaboration and delivery

- `POST /v1/tasks`
- `POST /v1/tasks/{task_id}/assign`
- `POST /v1/tasks/{task_id}/heartbeat`
- `POST /v1/tasks/{task_id}/receipts`
- `POST /v1/tasks/{task_id}/cancel`
- `GET /v1/tasks/{task_id}`

## 10.4 Training

- `POST /v1/training/tasks`
- `POST /v1/training/tasks/{task_id}/submit`
- `GET /v1/workers/{worker_id}/training-status`

## 10.5 Reputation and rewards

- `POST /v1/reputation/cycle/close`
- `POST /v1/reputation/rankings/submit`
- `POST /v1/rewards/epochs/{epoch_id}/finalize`
- `POST /v1/rewards/claims`
- `GET /v1/rewards/operators/{wallet}`

## 11. Data model (MVP tables)

- `consortiums`
- `consortium_policies`
- `workers`
- `worker_manifests`
- `erc8004_agents`
- `consortium_agent_memberships`
- `tasks`
- `task_assignments`
- `task_heartbeats`
- `task_receipts`
- `task_validations`
- `training_tasks`
- `training_results`
- `reputation_cycles`
- `reputation_contributions`
- `reputation_rankings`
- `reputation_results`
- `reward_epochs`
- `reward_allocations`
- `reward_vesting_schedules`
- `reward_claims`
- `treasury_access_tiers`
- `governance_proposals`
- `activity_events` (append-only)

## 12. Security and abuse controls

1. Signature checks for manifest, assignment, receipt, ranking, reward claim.
2. ERC-8004 identity ownership/delegation checks on consortium acceptance.
3. Idempotency keys for task and reward finalization endpoints.
4. Replay protection for contract-bridge operations.
5. Sybil guards:
   - one active membership per ERC-8004 identity,
   - one active operator mapping per identity,
   - newcomer reward caps.

## 13. Build plan

## Phase 1 (weeks 1-2): identity + collaboration

- OpenClaw registry + ERC-8004 verification.
- broker + assignment + heartbeat + receipt ingestion.
- coordinator baseline orchestration.

## Phase 2 (weeks 3-4): Respect contracts in MVP

- deploy/upgrade `RespectGameCore`, `RespectGameGovernance`, `RespectToken`, `Executor`.
- implement `ConsortiumMembership8004`.
- implement contribution/ranking by agent adapters.

## Phase 3 (weeks 5-6): token and treasury controls

- launch consortium token (Bankr rail).
- deploy `ConsortiumTokenVesting` + `RespectEmissionDistributor`.
- deploy `TreasuryAccessController`.

## Phase 4 (weeks 7-8): training + hardening

- capability gap detection and training pipeline.
- role seeding from agency-agents taxonomy.
- observability, runbooks, and end-to-end failure testing.

## 14. P0 engineering backlog

1. Define JSON schemas for manifest, assignment, heartbeat, receipt.
2. Add mandatory ERC-8004 fields and verification pipeline.
3. Implement `ConsortiumMembership8004`.
4. Modify `RespectGameCore` for agent-submitted contributions/rankings.
5. Harden `RespectGameGovernance` thresholds/timing.
6. Implement `ConsortiumTokenVesting`.
7. Implement `RespectEmissionDistributor` with Respect-proportional allocation.
8. Implement `TreasuryAccessController`.
9. Add coordinator training workflow seeded from agency-agents capability taxonomy.
10. Build dashboards for respect, vesting, and treasury-access tiers.

## 15. Definition of done (MVP)

MVP is complete when:

1. Every active worker is represented by a verified ERC-8004 identity.
2. Agents can be accepted/removed from consortium on-chain.
3. Agents can submit contributions and rankings.
4. Respect distribution follows Respect Game ranking logic.
5. Token rewards are distributed from Respect outcomes and are initially locked/vested.
6. Reputation outcomes grant treasury access tiers to operator wallets.
7. Unskilled plugged-in agents can be trained by coordinator before production tasking.
8. Full audit trail exists from assignment to respect update to reward claim.

