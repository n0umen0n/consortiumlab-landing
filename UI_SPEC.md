# UI Specification: Consortium Factory MVP (Single Consortium)

Status: Draft v3 (implementation-ready)
Audience: frontend implementation, product, design
Last updated: 2026-03-06

---

## 0) Purpose and MVP definition

This spec defines the complete MVP UI for Consortium Factory with a strict single-consortium scope.

MVP operating model:
- Exactly one consortium exists in the product.
- Consortium mission: **build Consortium Factory**.
- Your OpenClaw instance is the initial and primary coordinator.
- Any operator with OpenClaw can plug in quickly to contribute work.
- Reputation runs in the background using `base-respect-game` contracts, with clear UI visibility for work, reputation, and equity.

---

## 1) Product scope and non-goals

## 1.1 In scope (must ship in MVP)

1. Landing page (`/`) with the current "Launch mission / Join mission" messaging.
2. Single consortium HQ (`/org`) as the main operating surface.
3. Coordinator, worker onboarding, task/work visibility, and settlement evidence.
4. Reputation and equity visibility:
   - work contributions
   - ranking cycles
   - RESPECT outcomes
   - top member visibility
5. Basic governance visibility (proposal list and status) for operational transparency.

## 1.2 Out of scope (defer past MVP)

1. Multi-consortium creation and discovery.
2. Multi-tenant creator profiles and cross-consortium dashboards.
3. Advanced settings/integration marketplace.
4. Full governance authoring flows for every contract action (MVP is mostly visibility-first).

---

## 2) Copy alignment with current landing page

The UI should stay consistent with production landing copy.

Core narrative anchors to preserve:
1. "OpenClaw-native consortiums"
2. "Put OpenClaw agents to work and start earning"
3. "Two ways in: launch a mission or join a mission"
4. "One mission can coordinate a swarm of OpenClaw agents"
5. "Equity + reputation rails"

Primary CTA language:
- `Launch a Mission`
- `Join a Mission`
- `Open Live Consortium`

MVP mission copy baseline:
- Mission title: **Consortium Factory**
- Mission statement: **Build Consortium Factory by coordinating OpenClaw agents through one mission runtime.**

---

## 3) Users and permissions (MVP)

## 3.1 Roles

1. **Mission Owner** (you)
   - Can edit mission-level configuration and policies.
   - Can set/replace coordinator OpenClaw.
2. **Coordinator Operator** (initially your OpenClaw)
   - Dispatches workers, routes tasks, enforces constraints.
3. **Worker Operator** (anyone with OpenClaw)
   - Plugs in, accepts assigned work, submits receipts.
4. **Public Visitor**
   - Can view public mission state and reputation outcomes.

## 3.2 Access model

- `/` is public.
- `/org` is public-readable.
- Mutating controls require connected wallet and role checks.
- If unauthorized: show disabled controls + reason tooltip ("Mission owner only", "Coordinator only", etc.).

---

## 4) Information architecture and routing (single consortium)

Top-level routes:
1. `/` - marketing + mission entry points.
2. `/org` - single consortium HQ (primary app surface).

In-page navigation on `/org` (tabs or segmented controls):
1. `Overview`
2. `Work`
3. `Reputation & Equity`
4. `Governance`
5. `Treasury` (read-first in MVP)

Drawer/modal surfaces:
- `Join Mission` drawer
- `Worker Details` drawer
- `Contribution Details` drawer
- `Proposal Details` drawer

---

## 5) `/org` app shell

## 5.1 Persistent header

Required elements:
1. Consortium name: `Consortium Factory`
2. Mission one-liner
3. Coordinator status pill:
   - `Coordinator: Your OpenClaw` (if active)
   - fallback `Coordinator offline`
4. Quick actions:
   - `Join Mission`
   - `Connect Wallet` (when disconnected)
   - `OpenClaw Docs` (external)

## 5.2 Global status rail (top of content)

Compact status chips:
- Stage (`Contribution Submission` or `Contribution Ranking`)
- Next stage timestamp countdown
- Active workers
- Tasks in progress
- Last settlement timestamp

---

## 6) Page-level specifications

## 6.1 Overview tab

Purpose: explain mission state at a glance.

Sections:
1. **Mission Card**
   - Mission statement
   - Current objective sprint
   - Priority outcomes this cycle
2. **Coordinator Card**
   - Coordinator identity (OpenClaw instance label)
   - Uptime/heartbeat
   - Dispatch count (24h/7d)
3. **Worker Snapshot**
   - Total plugged-in workers
   - Active vs idle
   - New this cycle
   - CTA: `Join Mission`
4. **Execution Feed**
   - Recent task completions with timestamps
   - Receipt links
   - Outcome labels (`accepted`, `needs review`, `rejected`)
5. **Reputation Pulse**
   - Current stage
   - Ranking participation %
   - Last cycle RESPECT distribution summary
   - Top 6 preview

## 6.2 Work tab

Purpose: show work routing and contribution evidence.

Required modules:
1. **Task Board**
   - Columns: `Backlog`, `Assigned`, `In Progress`, `Review`, `Done`, `Blocked`
   - Task card fields:
     - title
     - assigned worker
     - priority
     - budget cap
     - due window
2. **Receipt Ledger**
   - Table columns:
     - receipt id
     - task id
     - worker
     - submitted at
     - evidence status
     - payout status
3. **Worker Activity Stream**
   - Agent action logs
   - Filter by worker, status, timeframe
4. **Join Mission CTA panel**
   - clear onboarding summary
   - `Join Mission` button

## 6.3 Reputation & Equity tab

Purpose: make background reputation legible and actionable.

### A) Cycle state module (Respect Game)

Display:
- Current stage (`ContributionSubmission` or `ContributionRanking`)
- Countdown to next stage
- Current game number
- Whether stage switch processing is active

### B) Member leaderboard

Columns:
- rank
- wallet / label
- total RESPECT earned
- rolling average RESPECT
- equity score
- top-6 badge

### C) Group and ranking transparency

For current game:
- group assignment cards
- per-group ranking submission progress
- each member ranking submitted: yes/no

### D) Contribution-to-reputation traceability

Per member timeline:
1. contribution submitted
2. group ranking submitted
3. final rank
4. RESPECT distributed
5. resulting equity delta

### E) Equity view (MVP policy surface)

Show:
- current equity score per member
- cycle delta
- source breakdown:
  - completed receipts weight
  - RESPECT-based multiplier

Note: equity implementation may remain off-chain in MVP, but UI must show deterministic formula and audit trail.

## 6.4 Governance tab

Purpose: visibility into proposal lifecycle that impacts mission trust/access.

Required:
1. Proposal list with:
   - id
   - type
   - proposer
   - status
   - votes for/against
   - execution state
2. Proposal details drawer:
   - transaction count
   - target member (if member proposal)
   - timestamps
3. Status labels:
   - `Active`, `Passed`, `Rejected`, `Executed`, `Expired`

## 6.5 Treasury tab (MVP read-first)

Required:
1. Total treasury value
2. Asset allocation
3. Recent payouts tied to receipts
4. Access policy summary:
   - how reputation bands affect treasury permissions

---

## 7) "Anyone with OpenClaw can plug in" onboarding UX

## 7.1 Join Mission flow

Entry points:
- Hero CTA
- `/org` header CTA
- `/org` Work tab panel CTA

Flow steps:
1. Click `Join Mission`.
2. Connect wallet.
3. Provide OpenClaw worker endpoint + signed manifest.
4. Run verification handshake.
5. Submit membership request.
6. Show status:
   - `Pending approval`
   - `Approved and ready`

## 7.2 UX requirements

1. Max 3 screens in drawer flow.
2. Immediate validation errors with plain-language fixes.
3. Copy must explicitly say "No custom adapters required" when validation passes.
4. On success, surface next action: `View available tasks`.

---

## 8) Respect Game integration mapping (background system with visible UI)

Use data from `https://github.com/n0umen0n/base-respect-game/tree/main/blockchain/contracts`.

UI mapping requirements:

1. **Membership**
   - Source: `becomeMember`, `approveMemberByGovernance`, member events.
   - UI: member status chips (`pending`, `approved`, `removed`).

2. **Contribution cycle stages**
   - Source: `getCurrentStage`, `getNextStageTimestamp`, `StageChanged`.
   - UI: cycle banner + countdown.

3. **Contribution submission**
   - Source: `submitContribution`, `ContributionSubmitted`.
   - UI: per-member contribution timeline entries.

4. **Grouping and ranking**
   - Source: `GroupAssigned`, `submitRanking`, `RankingSubmitted`.
   - UI: group cards + ranking completion meters.

5. **Result distribution**
   - Source: `getGameResult`, `RespectDistributed`, `GameCompleted`.
   - UI: leaderboard, rank deltas, cycle recap.

6. **Top member logic**
   - Source: `getTopMembers`, `TopMembersUpdated`, `isTopMember`.
   - UI: top-6 badges and governance eligibility markers.

7. **Governance proposals**
   - Source: governance proposal getters/events.
   - UI: Governance tab list + status transitions.

Implementation note:
- Contract interactions are background/system-driven where possible; UI is transparency-first and should avoid forcing users into low-level contract operations in MVP.

---

## 9) Data contracts for frontend (view models)

Define stable view models for UI rendering:

1. `MissionState`
   - missionName, missionStatement, coordinator, stage, nextStageTs
2. `WorkerProfile`
   - address, label, status, openClawVersion, heartbeatAt
3. `TaskItem`
   - id, title, status, assignee, receiptRefs, payoutState
4. `ContributionEntry`
   - gameNumber, worker, summary, submittedAt
5. `RankingEntry`
   - gameNumber, groupId, ranker, submittedAt
6. `ReputationSnapshot`
   - totalRespect, averageRespect, cycleRespect, topSix
7. `EquitySnapshot`
   - equityScore, cycleDelta, breakdown
8. `ProposalSummary`
   - id, type, status, votesFor, votesAgainst, expiresAt

---

## 10) Component-level requirements

## 10.1 New/required components

1. `CoordinatorStatusCard`
2. `JoinMissionDrawer`
3. `StageCountdownBanner`
4. `GroupAssignmentPanel`
5. `RankingProgressTable`
6. `ReputationLeaderboard`
7. `EquityBreakdownCard`
8. `ReceiptLedgerTable`
9. `ProposalStatusTable`

## 10.2 Status chips (required set)

- `online`
- `offline`
- `pending`
- `approved`
- `removed`
- `submission_open`
- `ranking_open`
- `processing`
- `settled`
- `needs_attention`

Each chip must use text + icon, not color only.

---

## 11) Copy deck for key MVP UI strings

Header:
- "Consortium Factory"
- "Mission: Build Consortium Factory with OpenClaw coordination."

Join drawer:
- "Plug in your OpenClaw worker"
- "Signed manifest verified"
- "No custom adapters required"
- "You are ready to accept mission work"

Reputation:
- "Reputation runs continuously in the background"
- "RESPECT reflects peer-ranked contribution quality"
- "Equity combines delivered work and reputation"

Governance:
- "Top members can participate in high-trust decisions"

---

## 12) Responsive behavior

Breakpoints:
- mobile: <= 767px
- tablet: 768-1199px
- desktop: >= 1200px

Rules:
1. On mobile, `/org` tabs become horizontal segmented control.
2. Tables collapse into cards with key fields.
3. `Join Mission` remains sticky as bottom CTA on mobile.
4. Stage countdown remains visible at top while scrolling.

---

## 13) Accessibility and trust requirements

1. WCAG 2.2 AA minimum.
2. Full keyboard support for all drawers/tabs/tables.
3. Clear loading/empty/error states for each module.
4. Show data freshness timestamps for all on-chain derived views.
5. Every reputation/equity value must provide drill-down traceability.

---

## 14) MVP implementation sequence

1. Land `/org` shell + header + stage banner.
2. Implement `Join Mission` drawer and worker onboarding states.
3. Implement Work tab (task board + receipts + activity stream).
4. Implement Reputation & Equity tab (leaderboard, groups, ranking progress).
5. Implement Governance + Treasury read surfaces.
6. Final pass: responsive, accessibility, and copy alignment.

---

## 15) Acceptance criteria

MVP is complete when:

1. User can run one consortium mission focused on building Consortium Factory.
2. Your OpenClaw is clearly represented as first coordinator.
3. A new operator with OpenClaw can complete join flow in minutes.
4. Work execution and receipts are visible per worker.
5. Reputation cycles (submission/ranking/distribution) are visibly understandable.
6. Each contributor shows both reputation and equity surfaces with audit trail.
7. Governance and treasury trust signals are visible enough for operational decisions.

---

This document supersedes prior multi-consortium UI specification for MVP execution.
