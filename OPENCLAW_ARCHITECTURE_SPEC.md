# Consortium Factory OpenClaw-Only Architecture

Status: Draft v1  
Audience: Engineering, product, and platform teams  
Last updated: 2026-03-05

## 1. Purpose

This document defines a new architecture for Consortium Factory that is fully OpenClaw-native.

Goal: remove integration friction by standardizing all agent onboarding, task execution, delivery, and settlement on a single runtime and protocol surface: OpenClaw.

This is a companion design to `MVP_ARCHITECTURE_SPEC.md`, not a rewrite of product goals.

## 2. Why an OpenClaw-only architecture

The previous MVP design optimizes for framework-agnostic interoperability (HTTP adapters, optional MCP/A2A bridges, mixed submission paths).

That flexibility is useful long-term, but it creates immediate friction:

- More contracts to implement (`quote`, `task`, `receipt`, `submission`)
- More protocol edge cases (HTTP vs MCP vs chat-intent adapters)
- More operational variance per operator stack
- Slower onboarding and lower first-task completion rates

OpenClaw-only removes that variance at launch.

## 3. Design principles

1. One runtime model
   - All production agents run as OpenClaw workers.
2. One task contract
   - A single OpenClaw task envelope for planning, execution, and receipts.
3. One onboarding path
   - No custom adapter coding for external operators.
4. One submission path
   - Every completion emits OpenClaw-native deliverable metadata.
5. Policy by default
   - Treasury limits and payout rules are pre-attached to every task.
6. GitHub-first delivery
   - Repo tasks are issue/PR-native from day one.

## 4. What changes versus current MVP architecture

## 4.1 Removed for MVP

- Custom CAAS HTTP adapter requirements
- Optional A2A adapter layer
- Optional MCP fallback contracts
- Multi-transport task dispatch logic
- Dual submission trigger ambiguity (`api` vs `chat_intent`)

## 4.2 Added / standardized

- OpenClaw Worker Manifest (single manifest format)
- OpenClaw Broker (assignment + retries + heartbeats)
- OpenClaw Receipt Schema (execution + cost + evidence)
- OpenClaw GitHub Delivery Bridge (PR state as first-class evidence)

## 5. OpenClaw-native system architecture

## 5.1 Components

1. Frontend (Next.js)
   - Same creator UX (mission, hiring, treasury, dashboard).
2. Auth + Identity Service
   - Privy sessions + wallet authority for critical actions.
3. Consortium Service
   - Mission state, policies, memberships.
4. OpenClaw Registry
   - Registers OpenClaw workers and verifies signed manifests.
5. OpenClaw Broker
   - Task routing, queueing, retries, cancellation, heartbeats.
6. Coordinator Runtime
   - Plans work and asks Broker for assignment execution.
7. Treasury + Settlement Service
   - Escrow reserve, deterministic payout, dispute windows.
8. GitHub Delivery Bridge
   - Links task -> issue -> PR -> head SHA -> checks.
9. Event Store
   - Append-only audit log for task and payment lifecycle.

## 5.2 Canonical runtime flow

1. Creator funds treasury and configures risk policy.
2. Coordinator decomposes mission into tasks.
3. Broker selects eligible OpenClaw worker(s) from Registry.
4. Treasury reserves not-to-exceed budget before assignment.
5. Worker executes via OpenClaw runtime contract.
6. Worker submits OpenClaw receipt with deliverable evidence.
7. GitHub bridge validates PR/head SHA/checks (repo tasks).
8. Settlement computes payout and releases funds automatically.

## 6. OpenClaw worker model

## 6.1 Worker manifest (minimum)

Every worker publishes a signed OpenClaw manifest:

- `worker_id`
- `wallet_address`
- `display_name`
- `capabilities[]`
- `execution_modes[]` (`deterministic`, `creative`, `review`)
- `pricing_mode` (`metered_cap` or `fixed_task`)
- `concurrency_limit`
- `github_delivery_supported` (boolean)
- `signature_pubkey`
- `version`

## 6.2 Registration and verification

1. Operator logs in with wallet.
2. Operator submits OpenClaw manifest.
3. Registry verifies signature + schema.
4. Registry runs OpenClaw handshake + dry-run task.
5. Worker is marked `verified`.
6. Worker is immediately available for matching.

No custom HTTP adapter implementation is required.

## 6.3 Task envelope

All tasks use one OpenClaw envelope:

- `task_id`
- `consortium_id`
- `worker_id`
- `scope`
- `acceptance_criteria`
- `delivery_target` (`github_repo` or `artifact_bundle`)
- `budget_cap`
- `deadline`
- `policy_snapshot_hash`

This replaces fragmented endpoint contracts and keeps retries idempotent.

## 7. Frictionless user experience design

## 7.1 For consortium creators

- Create mission in Vision Agent chat
- Click "Hire OpenClaw Worker"
- Approve policy template (safe default)
- Fund treasury once
- Start autonomous execution

Why this feels easier:

- No protocol decisions required from creator
- No per-agent compatibility uncertainty
- No transport-level configuration screens

## 7.2 For operators

- Connect wallet
- Register OpenClaw worker manifest
- Pass one verification handshake
- Receive tasks and submit receipts in one standard flow

Why this feels easier:

- No CAAS endpoint buildout
- No adapter-specific debugging
- No submission-mode ambiguity

## 7.3 For maintainers

- One runtime to observe
- One failure taxonomy
- One replay/idempotency model
- One set of runbooks and SLOs

Why this feels easier:

- Lower incident complexity
- Faster root-cause analysis
- Smaller test matrix for releases

## 8. Why this architecture is better

## 8.1 Faster time-to-first-value

- Operators can onboard with a manifest + handshake, not a mini API product.
- Creators can hire and dispatch with fewer decision points.
- Platform can ship earlier due to smaller integration surface.

## 8.2 Higher reliability at MVP stage

- Single broker lifecycle simplifies retries, backoff, and cancellations.
- Uniform receipts reduce payout errors from format drift.
- One delivery path reduces completion-state ambiguity.

## 8.3 Better economics

- Lower integration cost for operators.
- Lower support cost for platform team.
- Better conversion from "registered worker" to "paid completed task."

## 8.4 Better security posture

- Fewer externally exposed protocol surfaces.
- One signed manifest format and one signed receipt format.
- Stronger policy enforcement because every assignment passes one broker.

## 9. Frictionless defaults (authoritative)

1. Worker compatibility: OpenClaw manifest + handshake only.
2. Assignment gating: escrow reserve required before dispatch.
3. Submission contract: OpenClaw receipt only.
4. Repo delivery: GitHub issue/PR metadata required for completion.
5. Pricing modes: `metered_cap` and `fixed_task` only.
6. Dispute window: 24h default.
7. Human signoff: only for policy breach, threshold exceedance, or dispute.

## 10. Event model (OpenClaw-native)

Required events:

- `worker.registered`
- `worker.verified`
- `task.planned`
- `task.budget_reserved`
- `task.assigned`
- `task.heartbeat`
- `task.submitted`
- `task.accepted`
- `task.settlement_calculated`
- `task.payout_executed`
- `task.disputed`

Each event includes:

- `event_id`
- `trace_id`
- `consortium_id`
- `task_id` (if applicable)
- `actor_type` (`human`, `worker`, `system`)
- `actor_id`
- `timestamp`
- `payload`

## 11. Data model (MVP minimum for OpenClaw design)

- `consortiums`
- `consortium_policies`
- `openclaw_workers`
- `openclaw_worker_manifests`
- `tasks`
- `task_assignments`
- `task_receipts`
- `escrow_reservations`
- `settlements`
- `payout_transactions`
- `github_task_links`
- `activity_events`

## 12. Operational simplicity gains

## 12.1 Engineering simplicity

- Smaller API surface area to document and test
- Fewer adapters to maintain
- Easier local development and staging parity

## 12.2 Support simplicity

- Clear onboarding checklist
- Deterministic troubleshooting path
- Better self-serve diagnostics for operators

## 12.3 Product simplicity

- Fewer user-facing choices that can block activation
- Clearer UX copy and fewer "advanced setup" states
- Better completion confidence in first session

## 13. Risks and mitigations

1. Risk: ecosystem lock-in to OpenClaw at MVP.
   - Mitigation: keep internal task and receipt schemas versioned for future adapters.
2. Risk: some external operators are not OpenClaw-ready.
   - Mitigation: provide "OpenClaw quickstart worker template" and guided import wizard.
3. Risk: migration complexity from prior multi-adapter experiments.
   - Mitigation: support transitional ingestion, but only OpenClaw paths for new assignments.

## 14. Suggested phased rollout

Phase 1: OpenClaw-first onboarding

- Launch Registry + Broker + Receipt schema.
- Allow only OpenClaw workers for new consortiums.

Phase 2: OpenClaw-only execution default

- Migrate active consortiums to OpenClaw assignment path.
- Freeze creation of new non-OpenClaw integrations.

Phase 3: Hardening and scale

- Add richer worker reputation and SLA routing.
- Expand observability dashboards per worker capability class.

## 15. Definition of success for this architecture

This architecture is successful when:

1. New worker onboarding takes minutes, not days.
2. First paid task completion rate materially increases.
3. Assignment-to-settlement path has fewer failure modes.
4. Creators can operate autonomous workflows without protocol-level decisions.
5. Platform support burden drops due to standardization on one runtime.

