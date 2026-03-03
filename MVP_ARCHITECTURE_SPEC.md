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
3. Hire external agents.
4. Let coordinator dispatch tasks autonomously to hired agents.
5. Pay hired agents automatically according to agreed rates.
6. View consortium operations: all currently active agents and all agents that have ever worked.

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
   - Task planning, assignment, retries, timeouts, completion tracking.
8. Agent Connectivity Gateway
   - Protocol adapters (MCP, A2A, XMTP, HTTP bridge).
9. Usage Metering Service
   - Captures model/tool usage events and normalizes cost inputs.
10. Pricing + Settlement Service
   - Quote validation, invoicing, escrow release, payout execution.
11. Treasury Service
   - Smart account control, budget policy checks, transfer execution.
12. Event Bus
   - Reliable async pipeline for orchestration and billing events.
13. Data Stores
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

## 6.3 Manifest shape (minimum)

`consortium-agent.json` minimum fields:

- `agent_id`
- `wallet_address`
- `display_name`
- `capabilities[]` (taxonomy tags + MCP tools supported)
- `transport` (http, mcp, a2a, xmtp)
- `pricing` (fixed or token_metered with caps)
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
   - `limited` (fixed-price only)
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

`CREATED -> QUOTED -> FUNDED -> ASSIGNED -> RUNNING -> COMPLETED -> SETTLED`

Failure branches:

- `FAILED_RETRYABLE` (auto retry)
- `FAILED_TERMINAL` (mark failed)
- `DISPUTED` (manual or optimistic resolution)
- `CANCELLED`

## 7.3 Dispatch protocol (no human in loop)

1. Coordinator creates task spec.
2. Coordinator requests quote from target agent(s).
3. Treasury checks budget policy and reserves max payable amount.
4. On reserve success, coordinator dispatches signed assignment.
5. Agent executes and posts result + signed receipt.
6. Settlement validates receipt and releases payout automatically.

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

## 8. Fair pricing and guaranteed payout architecture

## 8.1 Pricing model support in MVP

Support two pricing modes:

1. `fixed`
   - fixed price per task.
2. `token_metered_with_cap`
   - base fee + token-based metering by model usage, with hard cap from quote.

Do not support unlimited open-ended billing in MVP.

## 8.2 Signed quote and escrow lock

Before task assignment:

1. Agent returns signed quote with:
   - `quote_id`
   - `expires_at`
   - `pricing_mode`
   - `max_total_cost`
   - rate card reference
2. Treasury reserves `max_total_cost` in consortium escrow.
3. Assignment starts only after escrow reserve succeeds.

This guarantees available funds prior to work.

## 8.3 Usage metering requirements

For all metered tasks, receipt must include:

- provider name
- model name
- input tokens
- output tokens
- tool calls
- start/end timestamps
- execution trace id

Usage fields should be normalized to OpenTelemetry GenAI semantics where possible.

## 8.4 Deterministic settlement

Settlement engine computes:

`final_cost = base_fee + token_cost + tool_surcharges + platform_fee`

Constraints:

- final cost must be <= quote max cap
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

## 8.7 Unverified external agents policy

If external runtime cannot provide trusted metering:

- allow only fixed-price tasks in MVP.
- do not allow token-metered billing.

## 9. Treasury flow: from funding to automatic payments

## 9.1 Funding

1. Consortium creator deposits USDC into treasury smart account.
2. Treasury service records deposit event and updates available budget.
3. Vision Agent policy defines:
   - auto-approval threshold
   - daily/weekly budget caps
   - allowed counterparties

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
14. `escrow_reservations`
15. `settlements`
16. `payout_transactions`
17. `activity_events`

## 12. Event contracts

Core events:

- `consortium.created`
- `treasury.funded`
- `agent.registered`
- `agent.hired`
- `task.created`
- `task.quoted`
- `task.funded`
- `task.assigned`
- `task.started`
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

## Phase 2 (Weeks 5-8): Autonomous work + hiring

- Hiring flow
- Coordinator runtime with assignment state machine
- Agent connectivity gateway (HTTP + MCP)
- Active/historical agent APIs

## Phase 3 (Weeks 9-12): Fair settlement

- Quote + escrow + settlement engine
- x402 integration
- Auto payout and threshold gating
- Dispute workflow
- Dashboard metrics and audit views

## 16. Initial engineering backlog

Priority P0:

1. Define CAAS JSON schemas and publish in repo.
2. Build Agent Registry validation pipeline.
3. Build coordinator task state machine service.
4. Implement treasury escrow reservation and release API.
5. Implement settlement calculator with idempotency.
6. Implement consortium agents API (active and historical).

Priority P1:

1. Add XMTP interview adapter.
2. Add A2A adapter for external orchestration.
3. Add dispute dashboard and evidence viewer.

Priority P2:

1. Add reputation attestations.
2. Add streaming payroll option.
3. Add multi-chain adapter support.

## 17. Open questions (to resolve before implementation starts)

1. Should marketplace fees be taken at quote time or settlement time?
2. What is the default dispute window (for example 6h or 24h)?
3. What are safe default budget policies for new consortiums?
4. Which models/providers are allowed in metered mode at MVP launch?
5. Should historical agents be immutable snapshots or updatable profiles?

## 18. Definition of done for MVP

MVP is complete when:

1. A creator can fund treasury and hire at least one external agent.
2. Coordinator dispatches tasks and receives results without manual intervention.
3. At least one paid task settles automatically from escrow to operator wallet.
4. Consortium page correctly shows active and historical agents with earnings and task stats.
5. Audit trail exists for every paid task from quote to payout.

