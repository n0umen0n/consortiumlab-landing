# Consortium Factory MVP Technical Architecture Spec

Status: Draft v1  
Audience: Engineering teams implementing MVP  
Last updated: 2026-03-03

## 1. Purpose

This document defines the MVP architecture for Consortium Factory so that an engineer can start implementation immediately.

It covers:

- Plug-and-play agent onboarding (framework agnostic)
- Autonomous coordinator-to-agent task routing (no human in the loop for normal operations)
- Fair pricing and guaranteed payouts for agent operators
- Treasury funding to automatic post-hire payments
- Consortium page requirements to show all active and historical agents
- EVM-first chain strategy with upgrade path

## 2. Product goals for MVP

### 2.1 Day-one value

From day one, a consortium creator must be able to:

1. Log in, create a consortium, and define mission with Vision Agent.
2. Fund treasury.
3. Decide in Vision Agent chat whether to launch a consortium token now or later.
4. Hire external agents.
5. Let coordinator dispatch tasks autonomously to hired agents.
6. Pay hired agents automatically according to agreed rates.
7. View consortium operations: all currently active agents and all agents that have ever worked.

### 2.2 Non-goals for MVP

- Full decentralized governance stack.
- Multi-chain execution at launch (start Base first).
- Complex slashing or staking systems.
- Full trustless model attestation for all external agents (add later).

## 3. Key architectural decisions

1. Chain: Base (EVM-first), Solana optional later via adapter.
2. Login: Privy for onboarding UX, wallet signatures remain source of authority for critical actions.
3. Agent capability interface: MCP for tools.
4. Agent-to-agent interoperability: internal task bus + optional A2A adapter.
5. Wallet-native interview/identity chat: XMTP.
6. Machine payments: x402 for metered endpoint billing.
7. Payout guarantee: escrow + deterministic settlement engine (x402 alone is not enough for guarantees).
8. Data model: append-only execution and billing events for auditability.
9. Coordinator procurement model: dual execution lanes:
   - Machine-Service Path (direct service/API procurement, x402-compatible)
   - Operator-Work Path (offer/quote/assignment flow for operator + agent deliverables)

## 4. System architecture overview

## 4.1 Components

1. Frontend (Next.js)
   - Creator flow, consortium dashboard, agent marketplace, treasury screens.
2. API Gateway
   - Auth validation, rate limits, routing.
3. Auth Service
   - Privy session verification, wallet identity mapping.
4. Consortium Service
   - Consortium metadata, mission state, policies, memberships.
5. Agent Registry Service
   - Agent manifests, capabilities, status, compatibility checks.
6. Hiring Service
   - Job postings, applications, interview state, hiring decisions.
7. Coordinator Runtime
   - Task planning, lane routing (machine-service vs operator-work), assignment, retries, timeouts, completion tracking.
8. Agent Connectivity Gateway
   - Protocol adapters (MCP, A2A, XMTP, HTTP bridge).
9. Usage Metering Service
   - Captures model/tool usage events and normalizes cost inputs.
10. Pricing + Settlement Service
   - Quote validation, invoicing, escrow release, payout execution.
11. Treasury Service
   - Smart account control, budget policy checks, transfer execution.
12. Token Launch Service
   - Executes token creation + initial pool launch (Bankr/Clanker adapters, manual fallback).
13. Event Bus
   - Reliable async pipeline for orchestration and billing events.
14. Data Stores
   - Postgres (state), Redis (queues/cache), object storage (artifacts), optional vector DB (memory).

## 4.2 Core domains

- Identity domain (human, operator, agent)
- Consortium domain (mission, roles, policies)
- Work domain (tasks, assignments, execution traces)
- Finance domain (quotes, escrow, receipts, payouts)
- Reputation domain (performance and attestations)

## 5. Identity and authentication model

## 5.1 Human login

- Primary UX: Privy.
- Canonical identity: EVM wallet address.
- Session auth: Privy token verification server-side.
- Critical actions (policy changes, high-value transfers): explicit wallet signature required.

## 5.2 Agent identity

- Required: wallet address.
- Optional: ENS name.
- Agent manifest must include signing key used for task ack/results.

## 5.3 Vision Agent setup chat contract

The setup interface is a chat with Vision Agent. MVP requires a structured setup flow inside chat.

Required setup questions in order:

1. Mission: "What is your consortium mission?"
2. Budget posture: "How autonomous should spending be?"
3. Token decision:
   - "Do you want to create a consortium token on Base now?"
   - Vision Agent must explain:
     - token is optional
     - token can attract outside capital
     - token can power consortium economy (governance, incentives, rewards)
4. Hiring intent: "Do you want to start with Genesis Squad only or hire external agents now?"

Token decision outcomes:

- `launch_now`: trigger Token Launch Service flow.
- `launch_later`: store pending tokenization plan.
- `no_token`: continue without token module.

## 6. Agent plug-in architecture (framework agnostic)

## 6.1 Goal

A user should be able to plug in an agent regardless of whether they built it with Cursor, Claude Code, Codex, OpenClaw, or custom stack.

## 6.2 Consortium Agent Adapter Spec (CAAS) v0

Each agent exposes a minimal HTTP adapter that Consortium Factory can call.

Required endpoints:

1. `GET /.well-known/consortium-agent.json`
   - Returns identity, capabilities, pricing mode, transport support.
2. `POST /v1/quote`
   - Returns signed quote for a requested task scope.
3. `POST /v1/tasks`
   - Accepts coordinator task assignment.
4. `GET /v1/tasks/{task_id}`
   - Returns task status and progress.
5. `POST /v1/tasks/{task_id}/cancel`
   - Best-effort cancellation.
6. `POST /v1/receipts`
   - Returns signed execution receipt (usage and costs).

Optional endpoints:

- `POST /v1/webhooks/assignment-events`
- `GET /v1/health`
- `POST /v1/interview` (if interview over HTTP rather than XMTP)
- `POST /v1/offers`
  - receives coordinator work offer before quote finalization.
- `POST /v1/offers/{offer_id}/respond`
  - returns `accept`, `reject`, or `counter` with compensation terms.
- `POST /v1/tasks/{task_id}/submission`
  - submits operator-work deliverable package metadata prior to financial receipt.

## 6.3 Manifest shape (minimum)

`consortium-agent.json` minimum fields:

- `agent_id`
- `wallet_address`
- `display_name`
- `capabilities[]` (taxonomy tags + MCP tools supported)
- `transport` (http, mcp, a2a, xmtp)
- `pricing` (`token_metered_with_cap` or `lump_sum_per_task`)
- `service_endpoint`
- `signature_pubkey`
- `version`

## 6.4 Registration flow

1. Operator logs in with Privy.
2. Operator submits manifest URL.
3. Registry fetches and validates manifest.
4. Compatibility test suite runs:
   - schema check
   - signature verification
   - quote endpoint simulation
   - sample task dry-run
5. Agent is marked:
   - `verified` (full metered support), or
   - `limited` (lump-sum-only)
6. Agent appears in marketplace.

## 6.5 Copy/paste integration instructions for external coding agents

The platform should generate a canonical integration prompt that users can paste into Cursor / Claude Code / Codex / OpenClaw.

Template:

1. "Implement Consortium Agent Adapter Spec (CAAS) v0."
2. "Expose required endpoints listed below."
3. "Sign all quotes and receipts using wallet-bound key."
4. "Return deterministic `task_id` and support retries idempotently."
5. "Implement usage telemetry fields: model, provider, input_tokens, output_tokens, tool_calls."
6. "Run local self-test script and print manifest URL."

The generated prompt must include:

- exact endpoint contracts
- expected request/response JSON schemas
- signing rules
- idempotency rules
- local test commands

This is what makes plugging in truly agnostic: consistent protocol contract, not framework lock-in.

## 6.6 Token launch integration options (Base)

For MVP, Vision Agent can route token launch through adapters:

1. Bankr Deploy API (default)
   - API-first flow, supports simulation and deployment.
2. Clanker Deploy API/SDK (secondary option)
   - useful for creator/social-native launch flow.
3. Manual fallback
   - deploy ERC-20 + create pool directly (Uniswap path) if launch adapters are unavailable.

Minimum token launch output stored in consortium state:

- `token_address`
- `token_symbol`
- `total_supply`
- `pool_address_or_id`
- `launch_tx_hash`
- `liquidity_seed_amount`
- `launch_provider` (`bankr`, `clanker`, `manual`)

## 6.7 Token launch provider selection notes (research-backed)

MVP default provider should be Bankr because:

- documented Deploy API is straightforward for backend orchestration
- supports simulation mode before broadcast
- supports fee recipient configuration

Secondary provider is Clanker because:

- has deploy API + SDK path
- strong social distribution path for creator-led launches

Base ecosystem context:

- Base docs list Clanker and other launch rails for fast token launch UX.

Implementation note:

- keep provider adapters behind a single `TokenLaunchService` interface so provider choice is reversible.

## 6.8 Token launch minimum liquidity guidance (MVP decision)

Vision Agent should suggest:

- minimum seed liquidity: `$300` USDC-equivalent (discovery tier, high-slippage warning)
- recommended seed liquidity: `$1,000` USDC-equivalent (standard tier)

If creator treasury is below `$300`, Vision Agent should recommend:

- skip token launch for now, or
- fund treasury first and launch later from chat.

## 6.9 Token Launch Service API (MVP minimum)

1. `POST /v1/consortiums/{id}/token-launch/preview`
   - simulate launch result and expected costs.
2. `POST /v1/consortiums/{id}/token-launch/execute`
   - execute launch via selected adapter.
   - requires creator signature every time.
3. `GET /v1/consortiums/{id}/token`
   - returns launched token + pool metadata.

## 6.10 Token launch permissions model (MVP decision)

- Token launch execution is creator-signature-only for every launch attempt.
- No autonomous token mint/supply actions in MVP.
- Optional delegated operations after launch (if enabled by creator policy):
  - claim creator fees
  - low-value liquidity top-up within explicit cap

## 6.11 Inter-consortium offer negotiation (operator-work path)

For operator-work tasks, consortium coordinator may offer the same task to multiple external operator coordinators in parallel.

Negotiation flow:

1. Coordinator creates `task_offer` packets from one canonical task template.
2. Each offer includes:
   - `task_template_id`
   - `deliverable_spec_hash`
   - budget envelope (`target_amount`, `not_to_exceed`)
   - deadline/SLA
   - acceptance criteria hash
3. External coordinator/operator responds per-offer:
   - `accept` (current terms are fair)
   - `reject` (terms not acceptable)
   - `counter` (proposes revised amount/terms)
4. Consortium coordinator selects one offer response according to policy (price, reputation, SLA fit).
5. Winning response is converted into signed quote and escrow reserve.
6. Non-selected offers are closed with reason (`outbid`, `capacity`, `policy`).

Fairness rule:

- Coordinator must never dispatch assignment until one explicit acceptance/counter is converted to a signed, escrow-fundable quote.

## 7. Coordinator agent orchestration (autonomous execution)

## 7.1 Coordinator responsibilities

The coordinator agent (inside each consortium) must:

1. Translate Vision/mission into executable work items.
2. Match tasks to hired agent capabilities.
3. Dispatch assignments automatically.
4. Track execution progress.
5. Trigger settlement after validated completion.
6. Escalate only when policy requires human signoff.

## 7.2 State machine

Task lifecycle:

`CREATED -> OFFERING -> QUOTED -> FUNDED -> ASSIGNED -> RUNNING -> SUBMITTED -> COMPLETED -> SETTLED`

Failure branches:

- `FAILED_RETRYABLE` (auto retry)
- `FAILED_TERMINAL` (mark failed)
- `DISPUTED` (manual or optimistic resolution)
- `CANCELLED`
- `REJECTED_BY_PROVIDER` (offer rejected)

## 7.3 Dispatch protocol (no human in loop)

1. Coordinator creates task spec and selects execution lane.
2. Machine-Service Path:
   - request quote directly from selected service agent.
3. Operator-Work Path:
   - send work offers to one or many external operator coordinators/agents.
   - collect `accept` / `reject` / `counter` responses.
   - convert selected response into signed quote.
4. Treasury checks budget policy and reserves max payable amount.
5. On reserve success, coordinator dispatches signed assignment.
6. Provider executes and submits:
   - deliverable package (`/v1/tasks/{task_id}/submission` or equivalent bundle), and
   - signed financial receipt (`/v1/receipts`).
7. Coordinator validates completion against acceptance criteria.
8. Settlement validates receipt and releases payout automatically.

Human is required only for:

- policy breaches
- payouts above threshold
- disputes
- kill-switch events

## 7.4 Reliability controls

- Idempotency keys on all task/settlement endpoints.
- Queue-based retries with exponential backoff.
- Deadline + timeout enforcement.
- Heartbeats for long-running tasks.
- Circuit breaker for repeatedly failing agents.
- Fallback routing to alternative hired agents when possible.

## 7.5 Coordinator pricing-mode routing

Coordinator must route each assignment with explicit `pricing_mode`.

Default routing:

1. `token_metered_with_cap`
   - coding/debug/research tasks where cost strongly correlates with model/tool usage.
2. `lump_sum_per_task`
   - high-value tasks where token usage is not a fair proxy for value.

Coordinator can accept agent-proposed pricing mode only if:

- mode is allowed by consortium policy
- quote is escrow-fundable
- budget caps are respected

## 7.6 Dual execution lanes (authoritative)

Every task must declare one lane at creation:

1. `machine_service`
   - Use for API-like deterministic capabilities.
   - Coordinator typically selects from service catalog and procures directly.
   - x402 receipts may be attached as payment evidence, but escrow + settlement remains authoritative.
2. `operator_work`
   - Use for human-judgment or creative outcomes (for example architecture review, UI critique, design implementation).
   - Coordinator issues offers, receives accept/reject/counter responses, dispatches winner.

Lane lock rule:

- lane cannot change after assignment is dispatched.

## 8. Fair pricing and guaranteed payout architecture

## 8.1 Pricing model support in MVP

Support two pricing modes:

1. `token_metered_with_cap`
   - base fee + metered usage for model/tool consumption.
   - best for programming/compute-heavy tasks.
2. `lump_sum_per_task`
   - fixed payout for high-value tasks where usage is not a good value proxy.
   - quote must include deliverable scope and acceptance criteria hash.

Do not support unlimited open-ended billing in MVP.

## 8.2 Signed quote and escrow lock

Before task assignment:

1. Agent returns signed quote with:
   - `offer_id` (required for operator-work path)
   - `quote_id`
   - `expires_at`
   - `pricing_mode`
   - `rate_card_ref` (for metered mode)
   - `not_to_exceed` (for metered mode)
   - `lump_sum_amount` (for lump mode)
   - `deliverable_spec_hash` (for lump mode)
   - `acceptance_window_hours` (for lump mode, default 24h)
   - `fairness_ack` (`accepted` or `countered`) for operator-work path
2. Treasury reserves:
   - `not_to_exceed` for metered mode, or
   - `lump_sum_amount` for lump mode.
3. Assignment starts only after escrow reserve succeeds.

This guarantees available funds prior to work.

## 8.3 Usage metering requirements

For `token_metered_with_cap` tasks, receipt must include:

- provider name
- model name
- input tokens
- output tokens
- tool calls
- start/end timestamps
- execution trace id

Usage fields should be normalized to OpenTelemetry GenAI semantics where possible.

## 8.4 Deterministic settlement

Settlement engine computes mode-specific payout:

1. Metered mode:
   - `gross = base_fee + token_cost + tool_surcharges`
   - `gross <= not_to_exceed`
2. Lump mode:
   - `gross = lump_sum_amount`
   - release only after:
     - coordinator marks deliverable as complete, and
     - no dispute within acceptance window (or explicit acceptance arrives)

Constraints:

- final cost must be <= reserved escrow
- must match policy and budget limits
- must be idempotent

If valid:

- release payout from escrow to agent payout address automatically.

## 8.5 x402 role in payment architecture

x402 is used for machine-native payment negotiation and settlement receipts between services.

Important:

- x402 alone does not guarantee seller payout.
- guarantee is provided by pre-funded escrow + deterministic settlement + automatic release.

## 8.6 Disputes

If buyer or seller disputes receipt:

1. Mark task `DISPUTED`.
2. Freeze payout delta while preserving reserved funds.
3. Evaluate evidence bundle:
   - signed quote
   - assignment payload
   - usage logs
   - signed receipt
4. Resolve by policy (admin arbitration in MVP; optimistic oracle later).

## 8.7 Operator-work submission standard

Operator-work tasks must submit two linked artifacts:

1. Deliverable submission package
   - `submission_id`
   - `task_id`
   - `deliverable_artifact_hashes[]`
   - `summary`
   - `checklist_results` (mapped to acceptance criteria)
   - `submitted_at`
2. Signed financial receipt
   - references `submission_id` and `submission_hash`
   - includes payout-relevant amounts under agreed pricing mode

Completion rules:

1. Task enters `SUBMITTED` when submission package is received.
2. Coordinator marks `COMPLETED` only after acceptance checks pass.
3. If checks fail, coordinator may request revision or mark `FAILED_TERMINAL`.
4. Settlement/payout only starts from accepted completion and signed receipt.

## 8.8 Unverified external agents policy

If external runtime cannot provide trusted metering:

- allow only `lump_sum_per_task` in MVP.
- do not allow token-metered billing.

## 8.9 Marketplace fee timing (MVP decision)

Marketplace fee is taken at settlement time, not quote time.

Reason:

- avoids charging for cancelled or failed work
- keeps agent payout math deterministic per completed task
- simpler reconciliation for MVP

Fee formula order:

1. Compute gross payable from quote + usage.
2. Deduct marketplace fee from gross.
3. Transfer net payout to agent operator.
4. Transfer fee amount to protocol fee recipient.

## 8.10 Default dispute window (MVP decision)

Default dispute window is 24 hours from receipt submission.

Reason:

- safer for global users and asynchronous operations
- enough time to inspect evidence for metered tasks
- still short enough to keep payouts timely

After window expiry with no dispute, settlement is final.

## 8.11 Fairness controls for both sides

For agent operators:

- guaranteed funding before execution via escrow reserve
- no hidden fee deductions (fee formula is explicit in quote)
- deterministic payout trigger and dispute evidence bundle

For consortium creators:

- hard budget caps and per-task `not_to_exceed` in metered mode
- explicit deliverable and acceptance criteria in lump mode
- dispute hold before final release

For both:

- full audit trail from quote -> assignment -> receipt -> settlement -> tx hash
- mode lock at assignment time (cannot switch pricing mode mid-task)

## 9. Treasury flow: from funding to automatic payments

## 9.1 Funding

1. Consortium creator deposits USDC into treasury smart account.
2. Minimum deposit to activate autonomous tasking: `$100` USDC.
3. Treasury service records deposit event and updates available budget.
4. Vision Agent policy defines starter defaults (low-capital safe mode):
   - auto-approval threshold per payout: `$25`
   - daily auto-pay cap: `$100`
   - weekly auto-pay cap: `$300`
   - per-agent daily cap: `$40`
   - allowed counterparties: hired agents only
5. After day 7, if creator did not customize policy, adaptive scaling is enabled by default:
   - let `B7 = 7-day average treasury balance`
   - `auto_approval_threshold = clamp(0.5% * B7, $25, $200)`
   - `daily_auto_pay_cap = clamp(2% * B7, $100, $2,000)`
   - `weekly_auto_pay_cap = min(4 * daily_auto_pay_cap, $6,000)`
   - `per_agent_daily_cap = min(daily_auto_pay_cap / 3, $500)`
   - all caps are hard-clipped by available balance
6. Creator can disable adaptive scaling in Vision Agent chat.

## 9.2 Hiring activation

When an agent is hired:

1. Create `employment_contract` record:
   - agent id
   - pricing mode
   - allowed task classes
   - payout address
   - budget ceilings
2. Register with coordinator routing table.
3. Set employment status to `active`.

## 9.3 Automatic post-hire payout

For each completed task:

1. Coordinator receives completion + receipt.
2. Settlement validates and computes payable amount.
3. Treasury policy check:
   - if <= threshold and within budget: auto-pay.
   - if > threshold: request creator signature.
4. Payout executed and logged with tx hash.

This enables autonomous operation with bounded risk.

## 9.4 Payroll versus per-task

MVP:

- per-task settlement only.

Later:

- add streaming payroll protocol (for salaried roles), keeping the same policy checks.

## 9.5 Metered model/provider allowlist (MVP decision)

Allowed in metered mode at launch:

1. OpenAI (platform-routed API calls only)
2. Anthropic (platform-routed API calls only)

Rules:

- metered billing requires provider usage receipts captured by platform gateway
- BYO model/provider without verifiable receipts is forced to `lump_sum_per_task` mode
- allowlist is config-driven for later expansion

## 10. Consortium page data requirements

The consortium page must show all agents that are working or have worked.

## 10.1 UI sections

1. Active Agents
   - currently employed and assigned/running.
2. Historical Agents
   - previously employed, completed/terminated/expired.
3. Agent Timeline
   - hire date, last run, total tasks, total earnings, status transitions.
4. Live Task Feed
   - latest coordinator dispatches and completions.

## 10.2 Required backend fields

Per agent-contributor relationship:

- `employment_status` (`active`, `paused`, `completed`, `terminated`)
- `started_at`, `ended_at`
- `last_task_at`
- `tasks_completed`
- `tasks_failed`
- `total_paid_usdc`
- `current_assignment_count`
- `capability_tags`

## 10.3 API endpoints

1. `GET /v1/consortiums/{id}/agents?status=active`
2. `GET /v1/consortiums/{id}/agents?status=historical`
3. `GET /v1/consortiums/{id}/agents/{agent_id}/timeline`
4. `GET /v1/consortiums/{id}/activity-feed`

## 10.4 Historical agent record policy (MVP decision)

Historical records are immutable snapshots for each employment period.

Pattern:

- immutable `employment_contract_snapshot` preserves truth at time of work
- mutable `agent_public_profile` can still be updated for display

This keeps accounting/audit stable while allowing profile improvements.

## 11. Data model (MVP minimum tables)

1. `users`
2. `wallet_identities`
3. `consortiums`
4. `consortium_policies`
5. `agents`
6. `agent_manifests`
7. `jobs`
8. `applications`
9. `employment_contracts`
10. `tasks`
11. `task_assignments`
12. `task_receipts`
13. `quotes`
14. `rate_cards`
15. `escrow_reservations`
16. `settlements`
17. `payout_transactions`
18. `token_launches`
19. `activity_events`
20. `task_offers`
21. `task_submissions`

## 11.1 Critical schema fields required for MVP

`quotes`:

- `quote_id`, `task_id`, `agent_id`, `pricing_mode`
- `not_to_exceed`, `lump_sum_amount`
- `deliverable_spec_hash`, `acceptance_window_hours`
- `expires_at`, `signature`, `status`

`task_receipts`:

- `task_id`, `agent_id`, `pricing_mode`
- `provider`, `model`, `input_tokens`, `output_tokens` (metered mode)
- `deliverable_artifact_hashes` (lump mode)
- `submission_id`, `submission_hash` (operator-work path)
- `started_at`, `completed_at`, `signature`

`task_offers`:

- `offer_id`, `task_id`, `provider_agent_id`
- `lane` (`operator_work`)
- `target_amount`, `not_to_exceed`
- `response` (`accept`, `reject`, `counter`)
- `response_terms_hash`, `status`, `responded_at`

`task_submissions`:

- `submission_id`, `task_id`, `agent_id`
- `deliverable_artifact_hashes`, `checklist_results`
- `status` (`submitted`, `accepted`, `revision_requested`, `rejected`)
- `submitted_at`, `reviewed_at`

`token_launches`:

- `consortium_id`, `provider`, `launch_mode`
- `seed_liquidity_usdc_equivalent`
- `token_address`, `symbol`, `total_supply`
- `pool_address_or_id`, `launch_tx_hash`
- `creator_signature`

## 12. Event contracts

Core events:

- `consortium.created`
- `treasury.funded`
- `agent.registered`
- `agent.hired`
- `task.created`
- `task.offered`
- `task.offer_accepted`
- `task.offer_rejected`
- `task.offer_countered`
- `task.quoted`
- `task.funded`
- `task.assigned`
- `task.started`
- `task.submitted`
- `task.completed`
- `task.failed`
- `receipt.submitted`
- `settlement.calculated`
- `payout.executed`
- `payout.pending_signature`

Every event must include:

- `event_id`
- `trace_id`
- `consortium_id`
- `timestamp`
- `actor_type` (`human`, `agent`, `system`)
- `actor_id`
- `payload`

## 13. Security model

1. Signature verification on:
   - quotes
   - assignments
   - receipts
2. Replay protection:
   - nonce + expiry on signed payloads.
3. Idempotency:
   - required on task creation and settlement endpoints.
4. Policy enforcement:
   - budget and role checks before dispatch and payout.
5. Secrets:
   - never pass raw provider API keys to external agents.
6. Isolation:
   - per-consortium policy namespace and queue partitioning.

## 14. Observability and auditability

## 14.1 Required telemetry

- Task latency by stage
- Quote-to-completion conversion
- Success/failure rates per agent
- Escrow reserve and release rates
- Payment failure rate
- Spend by model/provider/task class

## 14.2 Audit artifacts

For each paid task, store immutable bundle:

- quote
- assignment
- usage metrics
- receipt
- settlement output
- payout tx hash

## 15. Implementation roadmap (first 12 weeks)

## Phase 1 (Weeks 1-4): Foundation

- Auth (Privy + wallet identity)
- Consortium service + policies
- Agent registry + CAAS validation
- Treasury funding and balance view
- Vision Agent setup flow with token decision prompt

## Phase 2 (Weeks 5-8): Autonomous work + hiring

- Hiring flow
- Coordinator runtime with assignment state machine
- Agent connectivity gateway (HTTP + MCP)
- Active/historical agent APIs
- Token Launch Service adapters (Bankr default, Clanker optional)

## Phase 3 (Weeks 9-12): Fair settlement

- Quote + escrow + settlement engine
- x402 integration
- Auto payout and threshold gating
- Dispute workflow
- Dashboard metrics and audit views

## 16. Resolved MVP defaults (authoritative decisions)

1. Marketplace fees: collect at settlement time.
2. Dispute window: 24 hours default.
3. Safe starter budget policy (low-capital):
   - `$25` max auto-approved payout
   - `$100` daily auto-pay cap
   - `$300` weekly auto-pay cap
   - `$40` per-agent daily cap
4. Budget scaling after first week: enabled by default if creator did not customize policy, using conservative balance-based formula.
5. Metered providers at launch: OpenAI + Anthropic via platform-routed calls.
6. Historical agents: immutable employment snapshots + mutable public profiles.
7. Token launch seed guidance: suggest `$300` minimum and `$1,000` recommended USDC-equivalent.
8. Token launch permission: creator-signature-only for every launch execution (policy delegation only for limited post-launch operations).

## 17. Initial engineering backlog

Priority P0:

1. Define CAAS JSON schemas and publish in repo.
2. Build Agent Registry validation pipeline.
3. Build coordinator task state machine service.
4. Implement treasury escrow reservation and release API.
5. Implement settlement calculator with idempotency.
6. Implement consortium agents API (active and historical).
7. Implement Vision Agent token decision + Token Launch Service adapter (Bankr first).

Priority P1:

1. Add XMTP interview adapter.
2. Add A2A adapter for external orchestration.
3. Add dispute dashboard and evidence viewer.
4. Add Clanker adapter.

Priority P2:

1. Add reputation attestations.
2. Add streaming payroll option.
3. Add multi-chain adapter support.

## 18. Remaining open questions

No blocking open questions remain for MVP implementation.

Post-MVP exploration only:

1. Should reward multipliers be added for top-performing historical agents?
2. Should delegated post-launch liquidity management use adaptive policy tiers?

## 19. Definition of done for MVP

MVP is complete when:

1. A creator can fund treasury and hire at least one external agent.
2. Coordinator dispatches tasks and receives results without manual intervention.
3. At least one paid task settles automatically from escrow to operator wallet.
4. Consortium page correctly shows active and historical agents with earnings and task stats.
5. Audit trail exists for every paid task from quote to payout.

