# Consortium Factory MVP Implementation Architecture

This repository now implements the single-consortium MVP from `OPENCLAW_ARCHITECTURE_SPEC.md` and `UI_SPEC.md` with one pragmatic constraint:

- the backend runs inside the Next.js App Router runtime,
- the data layer is file-backed for demo persistence,
- the on-chain layer lives in `contracts/` as a deployable extension workspace around the Respect Game surface.

## Runtime topology

### Frontend

- `/` remains the marketing page with minimal visual change.
- `/org` is the operating HQ for the only live consortium.
- a shared client provider owns the global `Launch Coming Soon` modal and routes every launch CTA into the join flow.

### Backend

The backend is implemented as route handlers under `src/app/api/v1`:

- `GET /api/v1/dashboard`
- `POST /api/v1/workers/register`
- `POST /api/v1/workers/verify`
- `GET /api/v1/workers/:workerId`
- `GET /api/v1/workers/:workerId/training-status`
- `POST /api/v1/agents/accept`
- `POST /api/v1/agents/remove`
- `GET /api/v1/agents/:identityRegistry/:agentId`
- `POST /api/v1/tasks`
- `POST /api/v1/tasks/:taskId/assign`
- `POST /api/v1/tasks/:taskId/heartbeat`
- `POST /api/v1/tasks/:taskId/receipts`
- `POST /api/v1/tasks/:taskId/cancel`
- `GET /api/v1/tasks/:taskId`
- `POST /api/v1/training/tasks`
- `POST /api/v1/training/tasks/:taskId/submit`
- `POST /api/v1/reputation/cycle/close`
- `POST /api/v1/reputation/rankings/submit`
- `POST /api/v1/rewards/epochs/:epochId/finalize`
- `POST /api/v1/rewards/claims`
- `GET /api/v1/rewards/operators/:wallet`

### State and service layer

`src/lib/mvp/state.ts` acts as a compact service boundary for the MVP:

- file-backed persistence in `data/consortium-factory-mvp.json`
- worker onboarding and manifest verification
- consortium membership acceptance/removal
- task routing, heartbeat, and receipt validation
- training task lifecycle
- respect cycle progression
- reward epoch finalization and claims
- append-only activity events for auditability

This collapses the architecture-spec components into one repo-local service layer while keeping the domain boundaries clear enough to split later into:

- API Gateway
- Consortium Service
- OpenClaw Registry
- Broker
- Receipt Validator
- Reputation Bridge
- Emission + Vesting Services
- Event Store

## Frontend information architecture

`/org` is implemented as one data-driven experience with:

- header
- sticky global status rail
- tabs:
  - `Overview`
  - `Work`
  - `Reputation & Equity`
  - `Governance`
  - `Treasury`
- drawers:
  - `Join Mission`
  - `Worker Details`
  - `Contribution Details`
  - `Proposal Details`

The join drawer follows the MVP journey:

1. connect wallet
2. submit OpenClaw endpoint + signed manifest
3. verify + request membership
4. land in `Pending approval` or `Approved and ready`

## On-chain workspace

The `contracts/` workspace contains consortium-specific Solidity modules required by the architecture spec:

- `ConsortiumMembership8004.sol`
- `TreasuryAccessController.sol`
- `ConsortiumTokenVesting.sol`
- `RespectEmissionDistributor.sol`
- adapter-style Respect Game integration contracts/interfaces for the missing upstream base contracts

This keeps the repo self-contained while making the integration path into the upstream Respect Game repository explicit.

## MVP tradeoffs

To keep the MVP shippable inside the current repo:

- persistence is file-backed instead of Postgres
- queueing/broker behavior is modeled synchronously through service functions
- chain reads are represented by seeded snapshot data plus contract code, not live RPC reads
- wallet connection is simulated in the UI rather than using a production wallet SDK

These are deliberate MVP tradeoffs, not the final production shape.
