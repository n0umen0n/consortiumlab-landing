# UI Specification: Consortium Factory

Status: Draft v2 (implementation-ready)  
Audience: Frontend agent, product design, PM  
Last updated: 2026-03-04

---

## 0) Scope and intent

This document defines the complete UI for the MVP web app so frontend implementation can start immediately without additional design clarification.

Primary UX goals:
- Make consortium creation feel AI-native (chat-first, but structured).
- Make consortium operations legible at a glance (data-dense, action-oriented dashboards).
- Keep visual identity premium and futuristic ("cloud intelligence"), while still accessible and production-safe.

---

## 1) 2026 design direction (research-informed)

Direction chosen for this product:
1. AI-native interface patterns: streaming responses, explicit "thinking/working" states, and confidence/trace surfaces.
2. Data-dense operational layouts: bento grids, compact tables, integrated task/action panels.
3. Glassmorphism 2.0: restrained blur + crisp borders + strong contrast, not decorative haze.
4. Tokenized design system: strict variable-driven color, spacing, type, motion, and state styling.
5. Accessibility by default: WCAG 2.2 AA, visible focus, keyboard-first interaction, reduced motion support.

---

## 2) Information architecture and routing

## 2.1 Global top-level routes

1. `/consortiums` - all created consortiums (default logged-in home)
2. `/launch` - launch consortium flow (Vision Agent chat)
3. `/consortium/[consortiumId]` - dedicated page per consortium
4. `/operator/[operatorId]` - public operator profile
5. `/creator/me` - private consortium creator profile
6. `/notifications` - inbox + approvals
7. `/docs` - generated documentation center
8. `/tasks/[taskId]` - task detail deep-link
9. `/settings` - account, integrations, preferences

## 2.2 App shell

- Left rail navigation (collapsible to icon-only).
- Top bar with:
  - global search / command palette trigger (`Cmd/Ctrl + K`)
  - environment badge (MVP)
  - wallet/profile menu
- Right side contextual drawer system:
  - Vision Agent drawer (global or consortium-scoped)
  - notifications quick panel

## 2.3 Permission model surfaces (UI)

- Viewer: read-only on most pages.
- Operator: can manage own agents and view own earnings.
- Consortium Creator: full edit access to own consortium pages and private profile.
- Private routes:
  - `/creator/me` must be only visible to authenticated creator who owns that profile.

---

## 3) Design system specification

Use CSS variables for all tokens. No hard-coded colors in components.

## 3.1 Color tokens (light theme: "Cloud")

### Base and text

- `--bg-canvas: #F6F9FF`
- `--bg-subtle: #EEF3FF`
- `--bg-elevated: rgba(255, 255, 255, 0.72)`
- `--bg-solid: #FFFFFF`
- `--text-primary: #0A1022`
- `--text-secondary: #3D4763`
- `--text-tertiary: #68708B`
- `--text-inverse: #F6F8FF`
- `--border-soft: rgba(120, 138, 184, 0.24)`
- `--border-strong: rgba(88, 108, 160, 0.42)`

### Brand and accent

- `--brand-600: #485BFA`
- `--brand-500: #5F72FF` (primary interactive)
- `--brand-400: #8192FF`
- `--accent-cyan: #47D9FF`
- `--accent-mint: #3CE5C0`
- `--accent-violet: #A58BFF`
- `--accent-fuchsia: #E987FF`

### Semantic

- `--success: #19C98A`
- `--warning: #FFB547`
- `--danger: #FF5D7A`
- `--info: #45A8FF`

### Data viz

- `--chart-1: #5F72FF`
- `--chart-2: #47D9FF`
- `--chart-3: #3CE5C0`
- `--chart-4: #A58BFF`
- `--chart-5: #FFB547`
- `--chart-6: #FF7EC2`

## 3.2 Color tokens (dark theme: "Eclipse")

- `--bg-canvas: #070B14`
- `--bg-subtle: #0D1324`
- `--bg-elevated: rgba(17, 24, 42, 0.70)`
- `--bg-solid: #121A30`
- `--text-primary: #EEF3FF`
- `--text-secondary: #B7C1DC`
- `--text-tertiary: #8A95B6`
- `--border-soft: rgba(135, 155, 211, 0.24)`
- `--border-strong: rgba(162, 180, 230, 0.40)`

Brand/semantic hue stays same family; adjust contrast in implementation where needed.

## 3.3 Gradient and glass tokens

- `--gradient-hero: linear-gradient(135deg, #5F72FF 0%, #47D9FF 48%, #A58BFF 100%)`
- `--gradient-aurora: radial-gradient(1200px 500px at 20% -10%, rgba(71, 217, 255, 0.32), transparent 60%), radial-gradient(900px 420px at 80% -10%, rgba(165, 139, 255, 0.28), transparent 62%)`
- `--glass-bg: rgba(255, 255, 255, 0.62)` (light), `rgba(17, 24, 42, 0.62)` (dark)
- `--glass-border: rgba(255, 255, 255, 0.58)` (light), `rgba(167, 186, 236, 0.30)` (dark)
- `--glass-blur: 18px`

## 3.4 Typography

- Primary UI font: `Inter Variable, Inter, system-ui, sans-serif`
- Display headings: `Sora Variable, Inter, system-ui, sans-serif`
- Mono/terminal/logs: `JetBrains Mono, ui-monospace, monospace`

Type scale:
- Display XL: 56/60, 700
- Display L: 40/46, 700
- H1: 32/38, 650
- H2: 24/30, 650
- H3: 20/26, 600
- Body L: 18/28, 450
- Body: 16/24, 450
- Body S: 14/20, 500
- Caption: 12/16, 500

## 3.5 Spacing and layout tokens

- Spacing scale: 4, 8, 12, 16, 24, 32, 40, 56, 72
- Grid: 12 columns desktop, 8 tablet, 4 mobile
- Max content width: 1440px
- Standard page paddings:
  - desktop: 32px
  - tablet: 24px
  - mobile: 16px

## 3.6 Shape, borders, shadows

- Radii:
  - `--radius-sm: 10px`
  - `--radius-md: 14px`
  - `--radius-lg: 20px`
  - `--radius-xl: 28px`
  - `--radius-pill: 999px`
- Borders: default 1px; emphasized 1.5px for focused elements.
- Shadows:
  - `--shadow-sm: 0 2px 8px rgba(14, 22, 45, 0.08)`
  - `--shadow-md: 0 10px 28px rgba(14, 22, 45, 0.14)`
  - `--shadow-lg: 0 20px 56px rgba(14, 22, 45, 0.18)`

## 3.7 Motion tokens

- Durations:
  - fast: 120ms
  - normal: 220ms
  - deliberate: 360ms
- Easing:
  - default: `cubic-bezier(0.2, 0.8, 0.2, 1)`
  - exit: `cubic-bezier(0.4, 0, 1, 1)`
- Motion patterns:
  - hover lift: translateY(-1px) + subtle shadow
  - panel enter: opacity + 8px translate
  - no parallax loops by default
- Respect `prefers-reduced-motion: reduce` across all animated elements.

---

## 4) Component library specification

## 4.1 Buttons

Variants:
- Primary: filled brand gradient, white text
- Secondary: glass background + border
- Ghost: text only + hover tint
- Destructive: danger background

Sizes:
- L (48px height), M (40px), S (32px)

States required:
- default, hover, active, focus-visible, disabled, loading

## 4.2 Inputs and forms

- Input height: 44px default.
- Label always visible above field (no placeholder-only labels).
- Helper and error text below field.
- Invalid state uses danger border + 3:1 contrast compliant focus ring.

## 4.3 Cards and panels

- Use glass card as default for operational modules.
- Card anatomy:
  - header (title, metadata, actions)
  - content
  - footer (optional)
- Standard padding: 20px desktop, 16px mobile.

## 4.4 Tables

- Dense row height: 44px
- Comfortable row height: 52px
- Sticky table headers for long lists.
- Row quick actions on hover and keyboard focus.

## 4.5 Status chips

Required statuses:
- `active`, `idle`, `running`, `blocked`, `completed`, `failed`, `needed`, `archived`

Each chip uses color + icon + text (not color-only signaling).

## 4.6 Log console

- Monospace body, 13px.
- Optional color accents per severity.
- Must support filters: source agent, date range, severity, task id.
- Copy line, open linked task, and export actions.

## 4.7 Chat surfaces (Vision Agent)

- Message bubble max width: 78%.
- Assistant messages can stream token-by-token.
- Explicit assistant states:
  - idle
  - thinking
  - drafting plan
  - awaiting confirmation
  - dispatched to coordinator
- Composer supports text, attachments, and slash intents (for example `/update-mission`, `/add-social`, `/create-marketing-doc`).

---

## 5) Page-level specs

## 5.1 Page: All created consortiums (`/consortiums`)

Purpose: browse, filter, and launch new consortiums.

### Layout

- Top hero row:
  - title: "Consortiums"
  - subtitle: short operational summary
  - primary CTA: `Launch Consortium`
  - secondary CTA: `Import Existing`
- Filter row:
  - search by name/symbol
  - status filter
  - chain filter
  - treasury range
  - active agents range
- View toggle:
  - `Card view` (default for discovery)
  - `Table view` (power users)

### Consortium card fields (required)

- Consortium name + avatar/logo
- 1-line mission
- token symbol (if launched)
- treasury total
- active agents count
- needed agents count
- last activity timestamp
- badges: tokenized, needs operators, high growth

### Interactions

- Click card -> `/consortium/[consortiumId]`
- `Launch Consortium` -> `/launch`
- Sorting: newest, most active, highest treasury

### Empty state

- Message: "No consortiums yet."
- CTA: `Launch your first consortium`
- show short 3-step explainer

---

## 5.2 Page: Launch consortium with Vision Agent (`/launch`)

Purpose: convert intent into deployed consortium setup through guided chat.

### Desktop layout

- Split: 40% chat / 60% live draft canvas

### Left panel: Vision Agent chat

Required flow (one-question-at-a-time, progressive disclosure):
1. Mission
2. Vision
3. Short-term strategy (next 90 days)
4. Long-term strategy (12-24 months)
5. Initial treasury plan
6. Agent role needs
7. Token decision now/later/no token
8. Social/profile links to include on consortium page
9. Optional documentation requests (UI spec, marketing strategy, GTM doc)

UX requirements:
- streaming response rendering
- editable prior answers
- quick reply chips for common intents
- conversation timeline persists draft state

### Right panel: Live consortium draft

Sections:
- Identity block (name, slug, logo)
- Strategy block (mission, vision, short/long strategy)
- Roles block:
  - recommended agents
  - operators needed
  - confidence indicator
- Treasury + token block
- Social links block
- Generated docs queue

Footer actions:
- `Save Draft`
- `Create Consortium` (enabled only when required fields complete)
- `Send role plan to Coordinator`

### Coordinator handoff visualization

When user requests docs/tasks through Vision Agent, show pipeline:
`Request captured -> Role synthesis -> Agent matching -> Task creation -> In execution`

Each stage shows status, owner, timestamp, and expand for details.

---

## 5.3 Page: Consortium detail (`/consortium/[consortiumId]`)

Purpose: full HQ for one consortium.

### Global structure

- Header row:
  - consortium identity
  - mission 1-liner
  - primary metrics: treasury total, token price, market cap, active agents
  - actions: `Open Vision Agent`, `Add Funds`, `Create Signal`
- Secondary tabs:
  - Overview
  - Agents
  - Treasury
  - Signals
  - Token
  - Tasks
  - Logs
  - Summaries
  - Docs

### Overview tab (default)

Bento layout with these required modules:

1. Strategy module
   - Vision
   - Mission
   - Short-term strategy
   - Long-term strategy
   - `Edit via Vision Agent` action

2. Active agents module
   - table columns:
     - agent name
     - role
     - operator
     - status
     - current task
     - last run
     - 7d earnings

3. Historical agents module
   - table columns:
     - agent
     - operator
     - started
     - ended
     - tasks completed
     - total earned

4. Operators module
   - list of operators currently tied to active agents
   - click -> operator profile

5. Needed agents module
   - role needed
   - priority
   - reason
   - proposed compensation
   - CTA: `Send request to Vision Agent`

6. Daily summary module
   - AI-generated daily operational recap
   - timestamp + source references

7. Weekly summary module
   - trend-level recap and recommendations

### Treasury tab

Required elements:
- total treasury value
- 24h inflow/outflow
- asset allocation chart
- asset table columns:
  - asset
  - balance
  - USD value
  - % allocation
  - 24h change

### Signals tab

Required elements:
- active signal list (open/accepted/rejected)
- creator/operator for each signal
- countdown to close
- impacted module tags (treasury, tasks, strategy)

### Token tab

Required elements:
- token symbol
- token price
- market cap
- circulating supply
- 24h volume
- holder distribution chart
- token holder list columns:
  - rank
  - holder address/label
  - balance
  - percentage ownership
  - 24h delta (if available)

### Tasks tab

Required elements:
- Kanban board columns:
  - backlog
  - ready
  - in progress
  - review
  - done
  - blocked
- each task card:
  - title
  - assigned agent
  - operator
  - priority
  - cost cap
  - due date
- click card -> `/tasks/[taskId]`

### Logs tab

Required elements:
- live log stream
- filters by agent, severity, task, time
- export logs action
- quick jump to linked task/signal

### Docs tab

Required elements:
- generated docs list (UI doc, marketing doc, strategy docs)
- status per doc (draft/review/final)
- authoring agent
- last update
- open in side panel

### Always-on Vision Agent access

Must be available on every consortium tab:
- floating CTA button at bottom-right: `Vision Agent`
- opens right drawer with consortium context preloaded
- quick intents:
  - update mission
  - update vision
  - update strategy
  - add socials
  - request UI document
  - request marketing strategy document
  - propose new agent roles/tasks

When user sends an instruction:
1. Vision Agent clarifies intent.
2. Vision Agent outputs structured action plan.
3. Coordinator receives plan and creates needed roles/tasks.
4. Progress appears in coordinator pipeline widget and Tasks tab.

---

## 5.4 Page: Operator profile (`/operator/[operatorId]`)

Purpose: portfolio and performance of an operator and their agents.

### Required sections

1. Header
   - operator identity (name/ENS/wallet short)
   - reputation
   - total earnings
   - active agents count

2. Agent roster
   - each card shows:
     - agent name
     - current consortium or free status
     - created date
     - total tasks completed
     - lifetime earnings

3. Work history timeline
   - consortium name
   - role
   - started at
   - ended at
   - output summary
   - earnings in that period

4. Earnings analytics
   - daily/weekly/monthly charts
   - source consortium breakdown

---

## 5.5 Page: Consortium creator private profile (`/creator/me`)

Purpose: private control center for creator profile and preferences.

Access control:
- only owner can view and edit.

Required sections:
1. Personal profile
   - display name
   - bio
   - location/timezone
   - avatar
2. Public links/socials
   - X
   - LinkedIn
   - website
   - other custom links
3. Operating preferences
   - risk posture
   - automation level
   - budget guardrails
   - notification preferences
4. Security
   - connected wallets
   - session activity
   - signature approval preferences

---

## 5.6 Additional views required (missing and now included)

1. Notifications and approvals (`/notifications`)
   - approvals needed for payouts or policy changes
   - mentions from Vision/Coordinator
   - agent failure alerts

2. Documents center (`/docs`)
   - cross-consortium list of generated docs
   - filters by consortium/type/status

3. Task detail (`/tasks/[taskId]`)
   - full task spec
   - assignment history
   - receipts/cost
   - linked logs and deliverables

4. Settings/integrations (`/settings`)
   - app theme and density
   - default chat behavior
   - connected tools/services

5. Audit explorer (inside logs or dedicated route later)
   - immutable timeline for quote -> task -> receipt -> payout

---

## 6) Conversational UX rules for Vision Agent

1. Always show what state the assistant is in (idle, thinking, awaiting confirmation, dispatched).
2. Ask one critical question at a time, but allow user to edit previous answers.
3. For impactful actions (changing mission/strategy, creating multiple tasks), require explicit confirm.
4. Show "what happens next" after each accepted action.
5. Provide traceability:
   - source module affected
   - coordinator job id
   - created role/task references
6. Fail gracefully:
   - if coordinator unavailable, queue request and show retry state.

---

## 7) Responsive behavior

Breakpoints:
- mobile: <= 767px
- tablet: 768-1199px
- desktop: >= 1200px

Rules:
- On mobile, consortium detail tabs become segmented control + stacked sections.
- Vision Agent on mobile is full-screen sheet (not side drawer).
- Data tables collapse into card lists with key-value rows.
- Keep critical CTA sticky at bottom where appropriate.

---

## 8) Accessibility requirements (must ship)

1. Conform to WCAG 2.2 AA.
2. Keyboard navigation complete for all actions.
3. Focus indicators:
   - visible on all interactive elements
   - minimum 3:1 contrast against adjacent colors
4. Color contrast:
   - body text minimum 4.5:1
   - large text minimum 3:1
5. Do not rely on color alone for status.
6. Screen reader labels for chat controls, task status, and metric deltas.
7. Support reduced motion and avoid autoplay loops in reduced mode.

---

## 9) Empty/loading/error states

Every page/module must define:
- loading skeleton state
- empty state with clear CTA
- retryable error state with concise explanation

Critical examples:
- no active agents
- no token launched yet
- no treasury assets
- no summaries yet
- no documents generated yet

---

## 10) Frontend implementation checklist

1. Build token file first (`colors`, `typography`, `spacing`, `motion`, `radii`, `elevation`).
2. Build reusable primitives second (`Button`, `Card`, `Table`, `Tabs`, `Drawer`, `ChatComposer`, `StatusChip`).
3. Implement routes in this order:
   - `/consortiums`
   - `/launch`
   - `/consortium/[id]` (Overview, Agents, Tasks, Logs first)
   - `/operator/[id]`
   - `/creator/me`
   - `/notifications`, `/docs`, `/tasks/[taskId]`, `/settings`
4. Ensure Vision Agent drawer is globally available and consortium-context aware.
5. Validate accessibility and keyboard behavior before visual polish.

---

This specification supersedes prior conceptual UI notes and is the authoritative UI blueprint for MVP implementation.
