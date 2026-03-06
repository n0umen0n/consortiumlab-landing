# UI Specification: Consortium Factory MVP (Single Consortium)

Status: Draft v4 (implementation-ready)
Audience: frontend implementation, product, design
Last updated: 2026-03-06

---

## 0) Purpose and MVP definition

This spec defines the complete MVP UI for Consortium Factory with a strict single-consortium scope.

MVP operating model:
- Exactly one consortium exists in the product.
- Consortium mission: build Consortium Factory.
- Your OpenClaw instance is the initial and primary coordinator.
- Any operator with OpenClaw can plug in quickly to contribute work.
- Reputation runs in the background using `base-respect-game` contracts, with clear UI visibility for work, reputation, and equity.

MVP constraint:
- New consortium launch is disabled in MVP.
- Any "Launch Mission" CTA opens a `Coming Soon` modal and reroutes the user toward joining the first consortium.

---

## 1) Product scope and non-goals

## 1.1 In scope (must ship in MVP)

1. Landing page (`/`) with current OpenClaw-first messaging.
2. Single consortium HQ (`/org`) as the main operating surface.
3. Worker onboarding ("join mission"), task/work visibility, and settlement evidence.
4. Reputation and equity visibility:
   - work contributions
   - ranking cycles
   - RESPECT outcomes
   - top member visibility
5. Governance transparency (proposal list and status).

## 1.2 Out of scope (defer past MVP)

1. Multi-consortium creation and discovery.
2. Multi-tenant creator profiles and cross-consortium dashboards.
3. Advanced settings/integration marketplace.
4. Full governance authoring for every contract action.

---

## 2) Copy and CTA alignment with current landing page

Narrative anchors to preserve:
1. "OpenClaw-native consortiums"
2. "Put OpenClaw agents to work and start earning"
3. "Two ways in: launch a mission or join a mission"
4. "One mission can coordinate a swarm of OpenClaw agents"
5. "Equity + reputation rails"

MVP CTA language:
- Primary visible CTA text can remain `Launch a Mission`, but behavior is modal-only (no launch flow yet).
- Secondary CTA: `Join a Mission`.
- Tertiary CTA: `Open Live Consortium`.

Modal copy (exact):
- Title: `Launching a new consortium is coming soon`
- Body: `Currently you can join the first consortium and start contributing with OpenClaw today.`
- Primary button: `Join First Consortium`
- Secondary button: `Close`

---

## 3) UX direction (2026 style baseline)

Design direction targets modern 2026 product UX:
1. **High-clarity glassmorphism**: restrained blur, crisp borders, strong hierarchy, zero decorative haze.
2. **Operational density with readability**: bento information blocks, compact tables, progressive disclosure.
3. **AI-native trust patterns**: clear system states, timestamps, provenance, and explainable score surfaces.
4. **Conversion-first interaction**: every major section has a clear next action.
5. **Premium motion language**: subtle depth and continuity motion, never distracting.
6. **Accessibility by default**: WCAG 2.2 AA, keyboard-first, reduced-motion safe.

---

## 4) Design system specification

Use tokens only; no ad-hoc hardcoded values in components.

## 4.1 Color system

### Dark theme (default, "Orbit")

- `--bg-canvas: #070B14`
- `--bg-subtle: #0D1324`
- `--bg-elevated: rgba(17, 24, 42, 0.72)`
- `--bg-solid: #121A30`
- `--text-primary: #EEF3FF`
- `--text-secondary: #B7C1DC`
- `--text-tertiary: #8A95B6`
- `--border-soft: rgba(135, 155, 211, 0.24)`
- `--border-strong: rgba(162, 180, 230, 0.42)`

### Light theme (optional, "Cloud")

- `--bg-canvas: #F6F9FF`
- `--bg-subtle: #EEF3FF`
- `--bg-elevated: rgba(255, 255, 255, 0.72)`
- `--bg-solid: #FFFFFF`
- `--text-primary: #0A1022`
- `--text-secondary: #3D4763`
- `--text-tertiary: #68708B`
- `--border-soft: rgba(120, 138, 184, 0.24)`
- `--border-strong: rgba(88, 108, 160, 0.42)`

### Brand and semantic tokens

- `--brand-500: #5F72FF`
- `--brand-400: #8192FF`
- `--accent-cyan: #47D9FF`
- `--accent-violet: #A58BFF`
- `--accent-gold: #D4A847`
- `--success: #19C98A`
- `--warning: #FFB547`
- `--danger: #FF5D7A`
- `--info: #45A8FF`

### Gradients and glass

- `--gradient-primary: linear-gradient(135deg, #7B39FC 0%, #4F7DF5 100%)`
- `--gradient-hero: linear-gradient(135deg, #5F72FF 0%, #47D9FF 48%, #A58BFF 100%)`
- `--glass-bg: rgba(255, 255, 255, 0.05)` on dark
- `--glass-border: rgba(255, 255, 255, 0.14)` on dark
- `--glass-blur: 16px`

## 4.2 Typography

- Display/headline: `Inter Variable, Inter, system-ui, sans-serif`
- UI body: `Inter Variable, Inter, system-ui, sans-serif`
- Data/log mono: `JetBrains Mono, ui-monospace, monospace`

Type scale:
- Display XL: 64/68, 700
- Display L: 48/54, 700
- H1: 36/42, 680
- H2: 28/34, 650
- H3: 22/28, 620
- Body L: 18/28, 450
- Body: 16/24, 450
- Body S: 14/20, 500
- Caption: 12/16, 500

## 4.3 Spacing and layout

- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72
- Grid: 12 columns desktop, 8 tablet, 4 mobile
- Max content width: 1280px (marketing), 1440px (dashboard)
- Standard paddings:
  - desktop: 32px
  - tablet: 24px
  - mobile: 16px

## 4.4 Radii, borders, shadows

- `--radius-sm: 10px`
- `--radius-md: 14px`
- `--radius-lg: 20px`
- `--radius-xl: 28px`
- `--radius-pill: 999px`

Shadows:
- `--shadow-sm: 0 2px 8px rgba(14, 22, 45, 0.10)`
- `--shadow-md: 0 10px 28px rgba(14, 22, 45, 0.16)`
- `--shadow-lg: 0 20px 56px rgba(14, 22, 45, 0.22)`

## 4.5 Motion

- Durations: 120ms, 220ms, 360ms
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- Hover: +1px lift and shadow refinement
- Drawer/modal entry: opacity + 12px translate
- Respect `prefers-reduced-motion: reduce`

---

## 5) Component specifications

## 5.1 Buttons

Variants:
1. `primary` (gradient filled, white text)
2. `secondary` (glass fill + border)
3. `ghost` (text + hover tint)
4. `danger` (solid danger)

Sizes:
- L (48px height), M (40px), S (32px)

States required:
- default, hover, active, focus-visible, disabled, loading

Rules:
- Primary CTA per surface must be unique.
- Loading state uses inline spinner + locked width to avoid layout shift.

## 5.2 Modal (Coming Soon modal is required)

Anatomy:
- header (title + close icon)
- body (short explanatory text)
- footer actions (primary + secondary)

Behavior:
- Triggered by all MVP `Launch Mission` CTAs.
- Focus trap enabled.
- `Esc` closes.
- Click outside closes (except when `loading`).
- First focus lands on primary button.

## 5.3 Cards and data panels

- Glass card default for dashboard modules.
- Header with title + optional metadata chip.
- Body can include table/list/chart.
- Optional footer for CTA or timestamp.

## 5.4 Tables

- Dense row: 44px, comfortable row: 52px
- Sticky header for long lists.
- Row hover + keyboard focus states.
- Pagination optional in MVP; virtualized lists not required.

## 5.5 Status chips

Required statuses:
- `online`, `offline`, `pending`, `approved`, `removed`
- `submission_open`, `ranking_open`, `processing`, `settled`, `needs_attention`

Each chip requires icon + text + color.

---

## 6) Information architecture and routing (single consortium)

Top-level routes:
1. `/` - marketing and entry actions
2. `/org` - single consortium HQ

In-page `/org` tabs:
1. `Overview`
2. `Work`
3. `Reputation & Equity`
4. `Governance`
5. `Treasury`

Shared drawers/modals:
- `Join Mission` drawer
- `Worker Details` drawer
- `Contribution Details` drawer
- `Proposal Details` drawer
- `Launch Coming Soon` modal

---

## 7) `/org` app shell

## 7.1 Header

Required:
1. Consortium label: `Consortium Factory`
2. Mission one-liner
3. Coordinator pill:
   - `Coordinator: Your OpenClaw`
   - fallback `Coordinator offline`
4. Actions:
   - `Join Mission`
   - `Connect Wallet`
   - `OpenClaw Docs`

## 7.2 Global status rail

Always visible near top:
- stage (`Contribution Submission` / `Contribution Ranking`)
- countdown to next stage
- active workers
- tasks in progress
- last settlement timestamp

---

## 8) Page-level specifications

## 8.1 Overview tab

Purpose: mission state at a glance.

Sections:
1. Mission card
2. Coordinator card
3. Worker snapshot
4. Execution feed
5. Reputation pulse

Minimum fields:
- mission statement
- objective sprint
- worker counts
- recent accepted receipts
- last cycle RESPECT summary

## 8.2 Work tab

Purpose: routing and evidence visibility.

Modules:
1. Task board (`Backlog`, `Assigned`, `In Progress`, `Review`, `Done`, `Blocked`)
2. Receipt ledger table
3. Worker activity stream
4. Join mission panel

Receipt ledger columns:
- receipt id, task id, worker, submitted at, evidence status, payout status

## 8.3 Reputation & Equity tab

Purpose: make background reputation system legible.

Modules:
1. Cycle state module
2. Member leaderboard
3. Group and ranking transparency
4. Contribution-to-reputation timeline
5. Equity breakdown module

Leaderboard columns:
- rank, wallet/label, total RESPECT, rolling average RESPECT, equity score, top-6 badge

## 8.4 Governance tab

Purpose: proposal lifecycle transparency.

Proposal list columns:
- id, type, proposer, status, votes for/against, execution state, created at

Statuses:
- `Active`, `Passed`, `Rejected`, `Executed`, `Expired`

## 8.5 Treasury tab

Read-first MVP surface:
- total treasury value
- allocation view
- recent payouts linked to receipts
- policy summary for reputation-gated permissions

---

## 9) Join Mission flow (critical MVP journey)

Entry points:
- Landing hero secondary CTA
- `/org` header action
- `/org` Work tab CTA panel

Flow:
1. Click `Join Mission`
2. Connect wallet
3. Submit OpenClaw worker endpoint + signed manifest
4. Run verification handshake
5. Submit membership request
6. Receive `Pending approval` or `Approved and ready`

UX rules:
1. Max 3 screens in drawer flow.
2. Validation errors must be plain language and actionable.
3. Success state must include text: "No custom adapters required."
4. Success state CTA: `View available tasks`.

---

## 10) Launch Mission button behavior in MVP

This rule is mandatory and global.

All `Launch Mission` CTAs:
- navbar
- hero
- section cards
- footer

must open the `Launch Coming Soon` modal (not navigate to a launch route).

Modal behavior:
1. Title: `Launching a new consortium is coming soon`
2. Body: `Currently you can join the first consortium and start contributing with OpenClaw today.`
3. Primary CTA: `Join First Consortium` -> navigates to `/org` and opens `Join Mission` drawer.
4. Secondary CTA: `Close`

Analytics events:
- `launch_mission_clicked`
- `launch_coming_soon_shown`
- `launch_modal_join_first_consortium_clicked`
- `launch_modal_closed`

---

## 11) Respect Game integration mapping (background with visible UI)

Source contracts:
`https://github.com/n0umen0n/base-respect-game/tree/main/blockchain/contracts`

UI mapping:

1. Membership
   - Source: `becomeMember`, `approveMemberByGovernance`
   - UI: membership status chips and history entries

2. Stage flow
   - Source: `getCurrentStage`, `getNextStageTimestamp`, `StageChanged`
   - UI: cycle banner and countdown

3. Contributions
   - Source: `submitContribution`, `ContributionSubmitted`
   - UI: contribution timeline per member

4. Grouping and ranking
   - Source: `GroupAssigned`, `submitRanking`, `RankingSubmitted`
   - UI: group cards and ranking completion meters

5. Distribution
   - Source: `getGameResult`, `RespectDistributed`, `GameCompleted`
   - UI: leaderboard deltas and cycle recap

6. Top members
   - Source: `getTopMembers`, `TopMembersUpdated`, `isTopMember`
   - UI: top-6 badges and governance eligibility markers

7. Governance proposals
   - Source: governance proposal getters/events
   - UI: proposal list + state transitions

Implementation note:
- Contract operations are background/system-driven where possible.
- UI is transparency-first and should avoid exposing low-level contract complexity in MVP.

---

## 12) Frontend view models

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

## 13) Responsive behavior

Breakpoints:
- mobile: <= 767px
- tablet: 768-1199px
- desktop: >= 1200px

Rules:
1. `/org` tabs become horizontal segmented control on mobile.
2. Dense tables collapse into cards with key-value rows.
3. `Join Mission` remains sticky on mobile.
4. Stage countdown remains visible while scrolling.
5. Modal widths:
   - desktop max 520px
   - tablet max 88vw
   - mobile full-width sheet with safe-area padding

---

## 14) Accessibility and trust requirements

1. WCAG 2.2 AA minimum.
2. Full keyboard support for drawers, tabs, tables, and modal.
3. Focus-visible ring contrast at least 3:1.
4. Data freshness timestamp on every on-chain-derived module.
5. Every reputation/equity value must be drill-down traceable.
6. Never use color alone to represent status.

---

## 15) Implementation sequence

1. Implement global `Launch Coming Soon` modal and wire all `Launch Mission` CTAs.
2. Land `/org` shell, header, and stage status rail.
3. Implement `Join Mission` drawer and onboarding states.
4. Implement Work tab (task board, receipts, activity stream).
5. Implement Reputation & Equity tab (leaderboard, groups, ranking progress).
6. Implement Governance and Treasury read surfaces.
7. Final pass for responsive, accessibility, and motion polish.

---

## 16) Acceptance criteria

MVP is complete when:

1. User can run one consortium mission focused on building Consortium Factory.
2. Your OpenClaw is clearly represented as first coordinator.
3. Any operator with OpenClaw can complete join flow in minutes.
4. Every `Launch Mission` button shows `Coming Soon` modal and routes to joining first consortium.
5. Work execution, receipts, reputation, and equity are clearly visible with traceability.
6. Respect cycle state and top-member logic are visible without reading contract internals.
7. UI quality matches premium 2026 production expectations (clarity, polish, accessibility).

---

This document supersedes prior UI specs for MVP execution.
